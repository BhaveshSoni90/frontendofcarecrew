import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backendofcarecrew.onrender.com/contact', formData);
      if (response.status === 201) {
        alert('ThankYou for contacting us');
        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending your message. Please try again later.');
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textarea: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      height: '150px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#2c3e50',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#34495e',
    },
    contactDetails: {
      marginTop: '20px',
      lineHeight: '1.6',
    },
    contactButton: {
      display: 'inline-block',
      marginRight: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#3498db',
      color: '#fff',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    contactButtonHover: {
      backgroundColor: '#2980b9',
    },
    mapContainer: {
      marginTop: '20px',
    },
    map: {
      width: '100%',
      height: '300px',
      border: '0',
    },
  };

  return (
    <div className='main-content'>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>Contact Us</h1>
        </header>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            Send Message
          </button>
        </form>
        <div style={styles.contactDetails}>
          <h2>Our Contact Information</h2>
          <p>
            Address: 123 Pet Lane, Animal City, CA 12345
          </p>
          <p>
            <a
              href="tel:+919079165109"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={styles.contactButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.contactButtonHover.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.contactButton.backgroundColor}
              >
                Call Us
              </button>
            </a>
            <a
              href="mailto:bhaveshsoni9079@gmail.com?subject=Contact%20Us"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={styles.contactButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.contactButtonHover.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.contactButton.backgroundColor}
              >
                Email Us
              </button>
            </a>
          </p>
        </div>
        <div style={styles.mapContainer}>
          <h2>Find Us Here</h2>
          <iframe
            style={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.671514568493!2d-122.41840288468165!3d37.77492927975883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808de003f6b5%3A0x6a4d2b586e391f0!2s123%20Pet%20Lane%2C%20San%20Francisco%2C%20CA%2094114!5e0!3m2!1sen!2sus!4v1627553319827!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
