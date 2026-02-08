import LandProperty from '../models/LandProperty.js';
import Agent from '../models/Agent.js';
import { success, failure } from '../utils/response.js';

export const createProperty = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user.id });
    if (!agent) return failure(res, 'Agent profile not found', 404);

    const property = await LandProperty.create({
      ...req.body,
      agent: agent._id,
      listedBy: req.user.id
    });

    return success(res, { property }, 'Property created successfully');
  } catch (error) {
    return failure(res, 'Failed to create property', 500);
  }
};

export const listProperties = async (req, res) => {
  try {
    // Return all properties that are not sold; frontend will handle filtering
    const properties = await LandProperty.find({ status: { $ne: 'sold' } }).populate('agentId', 'user organizationName');
    return success(res, { properties }, 'Properties retrieved');
  } catch (error) {
    return failure(res, 'Failed to list properties', 500);
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await LandProperty.findById(req.params.id)
      .populate('agentId', 'user organizationName profileImage')
      .populate({ path: 'agentId', populate: { path: 'user', select: 'fullName email phone' } });

    if (!property) return failure(res, 'Property not found', 404);

    return success(res, { property }, 'Property retrieved');
  } catch (error) {
    return failure(res, 'Failed to get property', 500);
  }
};
