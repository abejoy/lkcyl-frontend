import React, { Component } from 'react';

class Footer extends Component {
  render() {
    if (this.props.data) {
      var networks = this.props.data.social.map((network) => (
        <li key={network.name}>
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.className}></i>
          </a>
        </li>
      ));
    }

    return (
      <footer
        style={{
          padding: "3rem 1rem",
          backgroundColor: "#111",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "0",
        }}
      >
        <ul
          className="social-links"
          style={{
            marginBottom: "2rem",
            fontSize: "2.5rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            padding: 0,
            listStyle: "none",
          }}
        >
          {networks}
        </ul>

        <ul
          className="copyright"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "1.5rem",
            letterSpacing: "1.2px",
            fontWeight: "500",
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <li>&copy; KCYL</li>
          <li>
            Design by{" "}
            <a
              href="https://www.linkedin.com/in/abraham-joys-2698a6192/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFA447",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Jesvin Abraham Joys
            </a>
          </li>
          <li>
            {" "}
            <a
              href="https://www.linkedin.com/in/toms-xavi-99693b2a3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFA447",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Toms Xavi
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
