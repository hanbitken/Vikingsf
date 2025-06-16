import React, { useState, useEffect } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import RetailDonation from './RetailDonation';
import ServiceDonation from './ServiceDonation';
import SeassonPassDonation from './SeassonPassDonation';
import PackageDonation from './PackageDonation';
import HowToDonation from './HowToDonation';

const DonationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.fromMenu) {
      navigate('/admin');
    }
  }, [location, navigate]);

  const toggle = (key) => {
    setActive((prev) => (prev === key ? null : key));
  };

  const sections = [
    { key: 'Retail', title: 'Retail Donation', content: <RetailDonation /> },
    { key: 'Service', title: 'Service Donation', content: <ServiceDonation /> },
    { key: 'Seasson', title: 'Seasson Pass Donation', content: <SeassonPassDonation /> },
    { key: 'Package', title: 'Package Donation', content: <PackageDonation /> },
    { key: 'Howto', title: 'How To Donation', content: <HowToDonation /> },
  ];

  return (
    <div className="container mt-4">
      {sections.map(({ key, title, content }) => (
        <Card key={key} className="mb-3">
          <Card.Header>
            <Button
              variant="link"
              onClick={() => toggle(key)}
              aria-controls={`collapse-${key}`}
              aria-expanded={active === key}
              className="text-decoration-none"
            >
              {title}
            </Button>
          </Card.Header>
          <Collapse in={active === key}>
            <div id={`collapse-${key}`}>
              <Card.Body>{content}</Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default DonationPage;
