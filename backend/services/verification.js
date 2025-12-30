import VerificationRequest from '../models/VerificationRequest.js';
import * as commissionService from './commission.js';
import { logger } from '../utils/logger.js';

import LandProperty from '../models/LandProperty.js';

export const requestVerification = async (payload) => {
  // Normalize payload fields (frontend sends buyer as buyerId etc.)
  const doc = {
    propertyId: payload.propertyId || payload.property,
    buyerId: payload.buyerId || payload.buyer,
    agentId: payload.agentId || payload.agent,
    verificationFee: payload.verificationFee || payload.verificationFee || 0,
    termsAccepted: payload.termsAccepted === undefined ? true : payload.termsAccepted
  };

  // Derive agent from property if not supplied
  if (!doc.agentId && doc.propertyId) {
    const prop = await LandProperty.findById(doc.propertyId);
    if (prop && prop.agentId) {
      doc.agentId = prop.agentId;
    }
  }

  return await VerificationRequest.create(doc);
};

export const approveVerification = async (id, adminNote) => {
  const verification = await VerificationRequest.findById(id);
  if (!verification) throw new Error('Verification request not found');

  verification.adminNote = adminNote;
  verification.adminApproved = true;
  verification.approvedAt = new Date();

  // If paid and already claimed, finalize and distribute commissions
  if (verification.paymentStatus === 'paid' && verification.claimedBy && verification.escrowStatus === 'HELD') {
    verification.requestStatus = 'completed';
    verification.completedAt = new Date();
    await verification.save();

    try {
      const result = await commissionService.distributeCommission(verification);

      // Optionally process payouts automatically if configured
      // Check runtime env var for auto payout to allow tests to toggle at runtime
      const autoPayout = process.env.MONNIFY_AUTO_PAYOUT === 'true';
      const defaultPayoutProvider = process.env.DEFAULT_PAYOUT_PROVIDER || 'STRIPE';
      if (autoPayout) {
        const payoutTxIds = (result.transactions || []).slice().map(id => id.toString());
        for (const txId of payoutTxIds) {
          const tx = await commissionService.processPayout(txId, defaultPayoutProvider);
        }
        verification.escrowStatus = 'RELEASED';
        await verification.save();
      }

      return { verification, commission: result };
    } catch (err) {
      logger.error(`Commission distribution failed: ${err.message}`);
      // continue but surface the error up
      return { verification, commissionError: err.message };
    }
  }

  await verification.save();
  return { verification };
};
