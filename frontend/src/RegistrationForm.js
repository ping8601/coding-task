import React, { useState } from 'react';
import './App.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
  });

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.gender &&
      formData.dob &&
      formData.email
    ) {
      setButtonClicked(true);
    } else {
      alert('Please enter all the fields!');
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
        <input
          type="date"
          name="dob"
          value={formData.dob}
          placeholder="Date of Birth"
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
