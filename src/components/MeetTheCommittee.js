import React from "react";
import "./MeetTheCommittee.css";
import BarNav from './BarNav';

const committeeMembers = [
  {
    name: "Christie Jibi Anakuthickal",
    role: "President",
    image: "christie.jpg",
    description: "Leads the team with vision and passion for youth engagement.",
    instagram:
      "https://www.instagram.com/christie_johns_?igsh=MXZmaTRxamsyNWliOA==",
  },
  {
    name: "Jake Joseph",
    role: "Secretary",
    image: "jake.jpg",
    description: "Supports leadership and coordinates major events.",
    instagram: "https://www.instagram.com/_jake_joseph?igsh=NHl4MzI5ZmxjMTln",
  },
  {
    name: "Jeff Thomas",
    role: "Treasurer",
    image: "jeff.jpg",
    description: "Manages our finances with transparency and care.",
    instagram: "https://www.instagram.com/jeffthomasss?igsh=c2djc2Q1NGVlaml4",
  },
  {
    name: "Leon Lalu",
    role: "Vice President",
    image: "leon.jpg",
    description: "Organizes all our exciting events and get-togethers.",
    instagram: "https://www.instagram.com/leon.lalu?igsh=MTZvMGNwb3JuMXNqYg==",
  },
  {
    name: "Coming Soon",
    role: "Joint Secretary",
    image: "maria.jpg",
    description: "Coming Soon",
    instagram: "",
  },
  {
    name: "Coming Soon",
    role: "Joint Treasurer",
    image: "jaison.jpg",
    description: "Coming Soon",
    instagram: "",
  },
];

const getImage = (imagePath) => {
  try {
    const images = require.context(
      "../assets/committee",
      false,
      /\.(jpg|jpeg|png|gif)$/i
    );
    return images(`./${imagePath}`);
  } catch (error) {
    console.error(`Error loading image: ${imagePath}`, error);
    return "https://via.placeholder.com/100";
  }
};

const MeetTheCommittee = () => {
  return (
    <>
      <BarNav />
      <section className="committee-section">
        <h2 className="section-heading">Meet the Committee</h2>
        <div className="card-grid">
          {committeeMembers.map((member, index) => (
            <a
              key={index}
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="event-card-link"
            >
              <div className="event-card">
                <img
                  src={getImage(member.image)}
                  alt={member.name}
                  className="committee-img"
                />
                <h3 className="card-title">{member.name}</h3>
                <p className="event-meta">{member.role}</p>
                <p className="event-details">{member.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default MeetTheCommittee;
