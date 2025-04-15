import React from "react";
import "./MeetTheCommittee.css";
import BarNav from './BarNav';

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

const MeetTheCommittee = (props) => {

  const {data} = props;
  if (!data || data?.length === 0 ) {
    return null;
  }

  const committeeSections = data

  return (
    <>
      <BarNav />
      <section className="committee-section">
        {committeeSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="committee-section-wrapper">
            <h2 className="section-heading">{section.sectionHeading}</h2>
            <div className="card-grid">
              {section.items.map((member, memberIndex) => {
                const cardContent = (
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
                );

                return member.instagram ? (
                  <a
                    key={memberIndex}
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-card-link"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={memberIndex}>{cardContent}</div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MeetTheCommittee;
