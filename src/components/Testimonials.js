import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Testimonials.css';

const Testimonials = ({ data }) => {
  if (!data || !data.testimonials) return null;

  return (
    <section id="testimonials" className="py-5" style={{ backgroundColor: '#1F1F1F' }}>
      <Container>
      <h1
         className="section-heading text-center mb-5"
         style={{ color: '#FFA447' }}
         >
         Upcoming Events
         </h1>


        <div className="card-grid">
          {data.testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="event-card text-white bg-dark"
              style={{ borderRadius: '30px' }}
            >
              <Card.Body className="text-center" style={{ borderRadius: '30px' }}>
                <Card.Title className="fw-bold mb-3">{testimonial.name}</Card.Title>
                <Card.Text className="event-details mb-3">
                  {testimonial.text}
                </Card.Text>
                <Card.Text className="event-meta mb-1">
                  <strong>Date:</strong> {testimonial.date}
                </Card.Text>
                <Card.Text className="event-meta">
                  <strong>Location:</strong> {testimonial.location}
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
