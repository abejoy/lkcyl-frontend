import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import AWS from "aws-sdk";
import "./ImageCarousel.css"; // Make sure this path is correct

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Configure AWS SDKs
    console.log("AWS SDK configured", process.env);
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
    console.log("Images fetched", images);
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
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/header-background.jpg"
            alt="First slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <h3>Slide 1</h3>
            <p>Description for the first slide</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/poster.jpeg"
            alt="Second slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <h3>Slide 2</h3>
            <p>Description for the second slide</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 rounded-carousel-img"
            src="/images/poster.jpeg"
            alt="Third slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <h3>Slide 3</h3>
            <p>Description for the third slide</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
