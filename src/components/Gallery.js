import React from 'react';
import BarNav from './BarNav';
import { importAll } from './ImageCarousel';
import { ImageGallery } from 'react-image-grid-gallery';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const importedImages = importAll(require.context('../assets/gallery', false, /\.(jpg|jpeg|png|gif)$/i));

const formattedImages = importedImages.map((src, index) => ({
  id: uuidv4(), // Generate a unique ID for each image
  alt: `Image ${index + 1}`, // Default alt text
  src, // Image source
}));

const Gallery = (props) => {
  return (
    <>
      <div style={{ backgroundColor: '#1F1F1F', padding: '3rem 0' }}>
        <BarNav />
        <ImageGallery imagesInfoArray={formattedImages} />
      </div>
    </>
  );
};

export default Gallery;
