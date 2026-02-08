import React from 'react';
import { Alert, Avatar, Box, Button, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BackButton from '../../../components/navigation/BackButton';
import propertiesAPI from '../../../api/properties';
import verificationAPI from '../../../api/verification';
import { useAuth } from '../../../contexts/AuthContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await propertiesAPI.getById(id);
        setProperty(res.property);
      } catch (err) {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleRequestProperty = async () => {
    if (!token) {
      setError('Please login to request this property');
      return;
    }

    if (user && user.isEmailVerified === false) {
      setError('Please verify your account before requesting a property');
      return;
    }

    try {
      setSubmitting(true);
      const fee = property?.verificationFee || Math.max(5000, Math.round((property?.price || 0) * 0.01));
      await verificationAPI.requestVerification({ propertyId: property._id, verificationFee: fee, termsAccepted: true }, token);
      setError('');
      alert('Property request submitted successfully. Continue with payment from your verification workflow.');
    } catch (err) {
      setError('Failed to request property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (!property) return <Box sx={{ p: 4 }}><BackButton /><Alert severity="error">Property not found.</Alert></Box>;

  const statusColor = property.status === 'reserved' ? 'warning' : property.status === 'available' ? 'success' : 'default';

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <BackButton />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {property.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {property.location?.address || `${property.location?.city || ''} ${property.location?.state || ''}`}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Chip label={(property.status || 'unknown').toUpperCase()} color={statusColor} />
        {property.visibleOnMap && <Chip icon={<VerifiedUserIcon />} label="Map Visible" color="info" />}
      </Box>

      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Property Details</Typography>
        <Typography>Price: ₦{Number(property.price || 0).toLocaleString()}</Typography>
        <Typography>Title Type: {property.titleType || 'N/A'}</Typography>
        <Typography>Land Use: {property.landUseType || 'N/A'}</Typography>
        <Typography>Description: {property.description || 'No description provided.'}</Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Deal Initiator</Typography>
        <Typography variant="body2" color="text.secondary">
          Deal initiator details are revealed through the verification workflow.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Assigned Agent</Typography>
        {property.agentId?.user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={property.agentId.profileImage}>{property.agentId.user.fullName?.charAt(0)}</Avatar>
            <Box>
              <Typography>{property.agentId.user.fullName}</Typography>
              <Typography variant="body2"><PhoneIcon fontSize="inherit" /> {property.agentId.user.phone}</Typography>
              <Typography variant="body2"><EmailIcon fontSize="inherit" /> {property.agentId.user.email}</Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">No agent assigned yet.</Typography>
        )}
      </Paper>

      <Button variant="contained" size="large" onClick={handleRequestProperty} disabled={submitting || property.status === 'reserved'}>
        {submitting ? 'Submitting...' : 'Request Property'}
      </Button>
    </Box>
  );
};

export default PropertyDetails;
