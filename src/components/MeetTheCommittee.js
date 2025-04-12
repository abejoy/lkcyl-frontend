import React from "react";
import "./MeetTheCommittee.css";

const committeeMembers = [
  {
    name: "Christie Jibi Anakuthickal",
    role: "President",
    image: "https://via.placeholder.com/100",
    description: "Leads the team with vision and passion for youth engagement.",
    instagram: "https://www.instagram.com/christie_johns_?igsh=MXZmaTRxamsyNWliOA=="
  },
  {
    name: "Jake Joseph",
    role: "Secretary",
    image: "/images/committee/jake.jpg",
    description: "Supports leadership and coordinates major events.",
    instagram: "https://www.instagram.com/_jake_joseph?igsh=NHl4MzI5ZmxjMTln"
  },
  {
    name: "Jeff Thomas",
    role: "Treasurer",
    image: "/images/committee/jeff.jpg",
    description: "Manages our finances with transparency and care.",
    instagram: "https://www.instagram.com/jeffthomasss?igsh=c2djc2Q1NGVlaml4 "
  },
  {
    name: "Leon Lalu",
    role: "Vice President",
    image: "/images/committee/leon.jpg",
    description: "Organizes all our exciting events and get-togethers.",
    instagram: "https://www.instagram.com/leon.lalu?igsh=MTZvMGNwb3JuMXNqYg== "
  },
  {
    name: "Maria Thomas",
    role: "Media Coordinator",
    image: "/images/committee/maria.jpg",
    description: "Tells our story through engaging content and visuals.",
    instagram: "https://instagram.com/maria"
  },
  {
    name: "Jaison Varghese",
    role: "Secretary",
    image: "/images/committee/jaison.jpg",
    description: "Keeps everything running smoothly behind the scenes.",
    instagram: "https://instagram.com/jaison"
  }
];

const MeetTheCommittee = () => {
  return (
    <section className="committee-section">
      <h2 className="section-heading">Meet the Committee</h2>
      <p style={{ color: 'white' }}>If you see this, the component is rendering</p>
      <img src="https://via.placeholder.com/100" alt="Test Image" />
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
              <img src={member.image} alt={member.name} className="committee-img" />
              <h3 className="card-title">{member.name}</h3>
              <p className="event-meta">{member.role}</p>
              <p className="event-details">{member.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MeetTheCommittee;
