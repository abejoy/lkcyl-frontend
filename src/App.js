import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import resumeData from "./assets/resumeData.json";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ImageCarousel from './components/ImageCarousel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
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
            <Testimonials data={resumeData.testimonials} />
            {/* <Contact data={resumeData.main} /> */}
            <Footer data={resumeData.main} />
          </div>
          }
        />
        <Route path="/contact" element={
          <div className="App">
            <ReactNotifications />
            <Contact data={resumeData.main} />
            <Footer data={resumeData.main} />
          </div>
          } />
      </Routes>
    </Router>
  );
};
export default App;
