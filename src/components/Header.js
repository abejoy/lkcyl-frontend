import React, { useState } from 'react';
import BarNav from './BarNav';

const Header = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!props.data) return null;

  const { name, description, social } = props.data;

  const networks = social.map((network) => (
    <li key={network.name}>
      <a href={network.url}>
        <i className={network.className}></i>
      </a>
    </li>
  ));

  return (
    <header id="home">
      <BarNav />
      <div className="row banner">
        <div className="banner-text">
          <h1 className="modern-hero-heading">Welcome to {name}.</h1>
          {!showDescription && (
            <button
              onClick={() => setShowDescription(true)}
              style={{
                backgroundColor: 'transparent',
                border: '4px solid #FFA447',
                padding: '1.4rem 3rem',
                borderRadius: '60px',
                color: '#FFA447',
                fontWeight: '800',
                fontSize: '1.75rem',
                marginTop: '2.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FFA447';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#FFA447';
              }}
            >
              About Us
            </button>
          )}

          {showDescription && (
            <>
              <h3 style={{ marginTop: '2.5rem', fontSize: '1.4rem', lineHeight: '2.2rem' }}>{description}</h3>
              <button
                onClick={() => setShowDescription(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: '4px solid #FFA447',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '60px',
                  color: '#FFA447',
                  fontWeight: '800',
                  fontSize: '1.5rem',
                  marginTop: '2.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFA447';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#FFA447';
                }}
              >
                Show Less
              </button>
            </>
          )}

          <hr />
          <ul className="social">{networks}</ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#testimonials">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
