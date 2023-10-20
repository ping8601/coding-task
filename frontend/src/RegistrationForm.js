import React, { useState } from 'react';
import './App.css';

const RegistrationForm = () => {
  // Define the API URL for form submission (backend)
  const url = 'http://127.0.0.1:5000/';

  // Define and initialize the state for form data and button click status
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
  });

  const [buttonClicked] = useState(false);

  // Handle input field changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission when the "Register" button is clicked
  const handleButtonClick = () => {
    // Validate that all required fields are filled
    if (
      formData.firstName &&
      formData.lastName &&
      formData.gender &&
      formData.dob &&
      formData.email
    ) {
      // test if email address is valid
      var emailPattern = /^[\w.-]+@[\w.-]+\.\w+$/;
      if (!emailPattern.test(formData.email)) {
        alert('Invalid email address.');
        return;
      }
      // test if dob is valid
      if (new Date(formData.dob) > new Date()) {
        alert('Invalid date.');
        return;
      }
      // All fields are filled, so proceed with form submission
      fetch(url +'/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      })
        .then((response) => {
          if (response.ok) {
            // Successful submission
            alert('Form submitted successfully. Register info has been sent to your email.');
          } else {
            // Handle errors if the submission fails
            alert('Form submission failed.');
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    } else {
      // If any required field is missing, show an error message to the user
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="form-container">
      <h1>User Registration</h1>
      <form>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <div className="radio-container">
          <div className="radio-option">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            <label>Male</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            <label>Female</label>
          </div>
        </div>
        <div></div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email Address"
          onChange={handleChange}
        />
      </form>
      <button
        type="button"
        className={`button ${buttonClicked ? 'button-clicked' : ''}`}
        onClick={handleButtonClick}
      >
        Register
      </button>
      <p className="required-info">* All fields are required</p>
    </div>
  );
};

export default RegistrationForm;
