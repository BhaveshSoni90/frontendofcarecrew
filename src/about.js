import React from 'react';

const About = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '20px',
    },
    sectionHeader: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    paragraph: {
      fontSize: '16px',
      color: '#34495e',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
    },
    listItem: {
      fontSize: '16px',
    },
  };

  return (
    <div className='main-content'>
        <div style={styles.container}>
      <header style={styles.header}>
        <h1>About Us</h1>
      </header>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Who We Are</h2>
        <p style={styles.paragraph}>
          At CareCrew, we are passionate about providing top-notch care for your beloved pets and offering a range of services to make your life easier. Whether you need someone to take care of your pets while you're away, or you're looking for daycare, training, or grooming services, we've got you covered.
        </p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Our Services</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Pet Sitting</li>
          <li style={styles.listItem}>Daycare</li>
          <li style={styles.listItem}>Training</li>
          <li style={styles.listItem}>Grooming</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Our Mission</h2>
        <p style={styles.paragraph}>
          Our mission is to ensure that every pet receives the highest quality care and attention. We are committed to creating a safe and nurturing environment where pets can thrive, and their owners can have peace of mind.
        </p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Contact Us</h2>
        <p style={styles.paragraph}>
          Have questions or want to learn more about our services? Feel free to reach out to us at <a href="mailto:info@carecrew.com">info@carecrew.com</a> or call us at (123) 456-7890.
        </p>
      </section>
    </div>
    </div>
  );
};

export default About;
