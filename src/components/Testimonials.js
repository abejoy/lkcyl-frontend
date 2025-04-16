import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Testimonials.css';
import { useNavigate } from 'react-router-dom';

const footballTournamentName = 'LKCYL 7-a-side Football Tournament';
const Testimonials = ({ data }) => {
  const navigate = useNavigate();
  if (!data || data.length === 0) return null;

  const handleCardClick = (e) => {
    const { name } = e;
    if (name === footballTournamentName) {
      navigate('/football');
    }
  };

  return (
    <section id="testimonials" className="py-5" style={{ backgroundColor: '#1F1F1F' }}>
      <Container>
        <h1 className="section-heading text-center mb-5" style={{ color: '#FFA447' }}>
          Upcoming Events
        </h1>

        <div className="card-grid">
          {data.map((upcomingEvent, index) => (
            <Card
              key={index}
              className="event-card text-white bg-dark"
              style={{ borderRadius: '30px', cursor: upcomingEvent.name === footballTournamentName ? 'pointer' : 'default' }}
              upcomingEvent={upcomingEvent}
              onClick={() => handleCardClick(upcomingEvent)}
            >
              <Card.Body className="text-center" style={{ borderRadius: '30px' }}>
                <Card.Title className="fw-bold mb-3">{upcomingEvent.name}</Card.Title>
                <Card.Text className="event-details mb-3">{upcomingEvent.text}</Card.Text>
                <Card.Text className="event-meta mb-1">
                  <strong>Date:</strong> {upcomingEvent.date}
                </Card.Text>
                <Card.Text className="event-meta">
                  <strong>Location:</strong> {upcomingEvent.location}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
