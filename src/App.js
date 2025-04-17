import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import resumeData from './assets/resumeData.json';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ImageCarousel from './components/ImageCarousel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import FootballStats from './components/FootballStats';
import MeetTheCommittee from './components/MeetTheCommittee';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator
import AdminDash from './components/AdminDash';
import { isAdminPageAvailable } from './data-service/pi-data-service';
import BarNav from './components/BarNav';

const userCookieId = 'user_uuid';

const App = () => {
  const [showAdminPage, setShowAdminPage] = useState(false);

  useEffect(() => {
    const handleLocalStorage = () => {
      // Check if a UUID exists in localStorage
      const existingUuid = localStorage.getItem(userCookieId);
      if (!existingUuid) {
        // Generate a new UUID and store it in localStorage
        const newUuid = uuidv4();
        localStorage.setItem(userCookieId, newUuid);
        return newUuid;
      } else {
        return existingUuid;
      }
    };

    const checkIFAdminIsAvaiable = async () => {
      const showAdmin = await isAdminPageAvailable();
      setShowAdminPage(showAdmin);
    };

    checkIFAdminIsAvaiable(handleLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once when the component mounts

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <ReactNotifications />
              <Header data={resumeData.main} />
              <ImageCarousel />
              <Testimonials data={resumeData.upcomingEvents} />
              {/* <Contact data={resumeData.main} /> */}
              <Footer data={resumeData.main} />
            </div>
          }
        />
        <Route
          path="/gallery"
          element={
            <div className="App">
              <ReactNotifications />
              <Gallery />
              <Footer data={resumeData.main} />
            </div>
          }
        />
        <Route
          path="/football"
          element={
            <div className="App">
              <ReactNotifications />
              <Contact data={resumeData.main} />
              <Footer data={resumeData.main} />
            </div>
          }
        />
        <Route
          path="/footballstats"
          element={
            <div className="App">
              <ReactNotifications />
              <FootballStats />
              <Footer data={resumeData.main} />
            </div>
          }
        />
        <Route
          path="/committee"
          element={
            <div className="App">
              <ReactNotifications />
              <MeetTheCommittee data={resumeData.committeeMembers} />
              <Footer data={resumeData.main} />
            </div>
          }
        />
        <Route
          path="/admindash"
          element={
            <div className="App">
              <ReactNotifications />
              <BarNav />
              {showAdminPage ? (
                <AdminDash />
              ) : (
                <div style={{ backgroundColor: 'black', color: 'red', fontSize: 'large', textAlign: 'center', marginTop: '5rem' }}>You do not have access to this page.</div>
              )}
              <Footer data={resumeData.main} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
