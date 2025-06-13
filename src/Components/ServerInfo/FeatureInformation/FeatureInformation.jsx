import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureInformation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin', { replace: true });
  }, [navigate]);

  return null;
};

export default FeatureInformation;
