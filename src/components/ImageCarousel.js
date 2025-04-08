import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageCarousel.css'; // Make sure this path is correct

const ImageCarousel = () => {
  return (
    <div style={{ backgroundColor: '#1F1F1F', padding: '3rem 0' }}>
      <h2
        style={{
          color: '#FFA447',
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        Our Events
      </h2>

      <Carousel
        fade
        className="custom-carousel"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '20px',
          backgroundColor: '#1F1F1F',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/header-background.jpg"
            alt="First slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
            <h3>Slide 1</h3>
            <p>Description for the first slide</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/poster.jpeg"
            alt="Second slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
            <h3>Slide 2</h3>
            <p>Description for the second slide</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/poster.jpeg"
            alt="Third slide"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
            <h3>Slide 3</h3>
            <p>Description for the third slide</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
