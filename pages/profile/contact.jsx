import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/contact.css';
import theme from '../../styles/theme';
import { FiChevronLeft } from 'react-icons/fi';

export default function Contact() {
    const BackButton = () => {
        return (
          <Link to="/profile" className="back-button">
            <FiChevronLeft className="chevron-left"/>
          </Link>
        );
      };
  
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // add form submission logic here 
    console.log('Form Data:', formData);

    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const inputStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    borderColor: theme.colors.blue0
  };
  const textareaStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    fontFamily: theme.fonts.fontFamily,
    height: '100px', 
    width: '100%',
    borderColor: theme.colors.blue0,
  };
  const buttonStyle = {
    borderRadius: theme.layout.inputBorderRadius,
    background: theme.colors.blue0,
    fontFamily: theme.fonts.fontFamily,
    width: '100%',
    borderColor: theme.colors.blue0,
  };
  const hrStyle = {
    background: theme.colors.blue0,
  };

  return (
    
    <div className="contact-container">
        <BackButton />
      <h2>Contact Us</h2>
      <p className="help-p">We&apos;re here to help! We&apos;ll get back to you soon.</p>
      <form onSubmit={handleSubmit}>
        <p className="top-label">Name</p>
        <input
          style={inputStyle}
          type="text"
          name="name"
          value={formData.name}
          placeholder="First and last name"
          onChange={handleInputChange}
        />
        <p className="label">Email</p>
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={formData.email}
          placeholder="gurufox@ourdate.com"
          onChange={handleInputChange}
        />
        <p className="label">Phone</p>
        <input
          style={inputStyle}
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="---"
          onChange={handleInputChange}
        />
        <p className="label">Leave us a message</p>
        <textarea
          style={textareaStyle}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
        />

        <button className="send-button" style={buttonStyle} type="submit">
          Send Message
        </button>
        <hr style={hrStyle} />
      </form>
    </div>
  );
}
