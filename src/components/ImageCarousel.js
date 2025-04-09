import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import AWS from "aws-sdk";
import "./ImageCarousel.css"; // Make sure this path is correct

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Configure AWS SDKs
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Add these to your .env file
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: "eu-west-2", // Your S3 bucket region
    });
    const fetchImages = async () => {
      try {
        const params = {
          Bucket: "prodlkcyllkcylstackemailbucket", // Your S3 bucket name
          Prefix: "photos/", // Folder path in the bucket
        };

        const data = await s3.listObjectsV2(params).promise();

        const imageKeys = data.Contents.map((item) => item.Key).filter((key) =>
          key.match(/\.(jpg|jpeg|png|gif)$/i)
        );

        const imageUrls = imageKeys.map((key) =>
          s3.getSignedUrl("getObject", {
            Bucket: params.Bucket,
            Key: key,
            Expires: 3600, // URL expiration time in seconds
          })
        );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images from S3:", error);
      }
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ backgroundColor: "#1F1F1F", padding: "3rem 0" }}>
      <h2
        style={{
          color: "#FFA447",
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Our Events
      </h2>

      <Carousel
        fade
        className="custom-carousel"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "20px",
          backgroundColor: "#1F1F1F",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* images comes from the s3 bucket add images to emailData/photos/ folder*/}
        {images.length > 0 ? (
          images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 rounded-carousel-img"
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "10px",
                }}
              >
                <h3>Slide {index + 1}</h3>
                {/* <p>Description for slide {index + 1}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <p style={{ color: "#FFF", textAlign: "center" }}>
            Loading images...
          </p>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
