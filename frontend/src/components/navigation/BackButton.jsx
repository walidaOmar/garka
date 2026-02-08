import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, label = 'Back' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/marketplace');
  };

  return (
    <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
      {label}
    </Button>
  );
};

export default BackButton;
