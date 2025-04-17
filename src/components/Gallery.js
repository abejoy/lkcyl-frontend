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
      <div style={{ backgroundColor: '#1F1F1F', padding: '6rem 1rem' }}>
        <BarNav />
        <ImageGallery
          lazy={true}
          imagesInfoArray={formattedImages}
          lazyFromIndex={0} // Start lazy loading from the first image
          customStyles={{
            imageStyle: {
              borderRadius: '10px', // Add rounded corners to images
              objectFit: 'cover', // Ensure images fit nicely
              border: '3px solid #FFA447', // Add a border around images
            },
          }}
        />
      </div>
    </>
  );
};

export default Gallery;
