import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import resumeData from './assets/resumeData.json'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = () =>  {
  return (
      <div className="App">
        <ReactNotifications />
        <Header data={resumeData.main}/>
        <Testimonials data={resumeData.testimonials}/>
        <Contact data={resumeData.main}/>
        <Footer data={resumeData.main}/>
      </div>
  )}
export default App;
