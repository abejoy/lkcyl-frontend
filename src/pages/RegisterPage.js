import React from "react";
import Contact from "../components/Contact";
import resumeData from "../assets/resumeData.json";

const RegisterPage = () => {
  return (
    <div>
      <Contact data={resumeData.main} />
    </div>
  );
};

export default RegisterPage;