import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = ({ onSignup }) => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
    password: '',
    confirmPassword: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    medicalHistory: '',
    allergies: '',
    preferredFood: '',
    behavior: '',
    temperament: '',
    experience: '',
    certifications: '',
    servicesOffered: [],
    availability: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    charges: ''
  });

  const [formErrors, setFormErrors] = useState({
    passwordMismatch: false,
    email: '',
    contact: '',
    charges: ''
  });

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateContactNumber = (contact) => /^[789]\d{9}$/.test(contact);

  const validatePasswords = () => formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          [name]: checked,
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const servicesOffered = checked
        ? [...prevData.servicesOffered, value]
        : prevData.servicesOffered.filter(service => service !== value);

      return {
        ...prevData,
        servicesOffered
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      passwordMismatch: !validatePasswords(),
      email: !validateEmail(formData.email) ? 'Invalid email address' : '',
      contact: !validateContactNumber(formData.contact) ? 'Invalid contact number (must be a 10-digit Indian number starting with 7, 8, or 9)' : '',
      charges: userType === 'petCareProvider' && !formData.charges ? 'Charges are required for pet care providers' : ''
    };

    if (Object.values(newErrors).some(error => error)) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({
      passwordMismatch: false,
      email: '',
      contact: '',
      charges: ''
    });

    try {
      const response = await fetch('https://backendofcarecrew.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType,
          ...formData
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Signup Result:', result);
        onSignup({ user: result.user, userType });
        // navigate('/', { state: { user: result.user, userType } });
        navigate('/login');
      } else {
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="user-type-selector">
        <button type="button" onClick={() => setUserType('petOwner')}>Sign Up as Pet Owner</button>
        <button type="button" onClick={() => setUserType('petCareProvider')}>Sign Up as Pet Care Provider</button>
      </div>

      {userType && (
        <div className="form-box">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2>{userType === 'petOwner' ? 'Pet Owner' : 'Pet Care Provider'} Sign-Up</h2>

            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}

            <label>Contact Details:</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
            {formErrors.contact && <p className="error-text">{formErrors.contact}</p>}

            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />

            {userType === 'petOwner' && (
              <>
                <label>Species:</label>
                <input type="text" name="species" value={formData.species} onChange={handleChange} required />

                <label>Breed:</label>
                <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />

                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>Weight:</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

                <label>Medical History:</label>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} required />

                <label>Allergies:</label>
                <textarea name="allergies" value={formData.allergies} onChange={handleChange} />

                <label>Preferred Food:</label>
                <textarea name="preferredFood" value={formData.preferredFood} onChange={handleChange} />

                <label>Behavior:</label>
                <textarea name="behavior" value={formData.behavior} onChange={handleChange} />

                <label>Temperament:</label>
                <textarea name="temperament" value={formData.temperament} onChange={handleChange} />
              </>
            )}

            {userType === 'petCareProvider' && (
              <>
                <label>Experience:</label>
                <textarea name="experience" value={formData.experience} onChange={handleChange} required />

                <label>Certifications:</label>
                <textarea name="certifications" value={formData.certifications} onChange={handleChange} required />

                <label>Services Offered:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="petSitting"
                      checked={formData.servicesOffered.includes('petSitting')}
                      onChange={handleServiceChange}
                    />
                    Pet Sitting
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="dayCare"
                      checked={formData.servicesOffered.includes('dayCare')}
                      onChange={handleServiceChange}
                    />
                    Day Care
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="training"
                      checked={formData.servicesOffered.includes('training')}
                      onChange={handleServiceChange}
                    />
                    Training
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="grooming"
                      checked={formData.servicesOffered.includes('grooming')}
                      onChange={handleServiceChange}
                    />
                    Grooming
                  </label>
                </div>

                <label>Availability:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="sunday"
                      checked={formData.availability.sunday}
                      onChange={handleChange}
                    />
                    Sunday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="monday"
                      checked={formData.availability.monday}
                      onChange={handleChange}
                    />
                    Monday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="tuesday"
                      checked={formData.availability.tuesday}
                      onChange={handleChange}
                    />
                    Tuesday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="wednesday"
                      checked={formData.availability.wednesday}
                      onChange={handleChange}
                    />
                    Wednesday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="thursday"
                      checked={formData.availability.thursday}
                      onChange={handleChange}
                    />
                    Thursday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="friday"
                      checked={formData.availability.friday}
                      onChange={handleChange}
                    />
                    Friday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="saturday"
                      checked={formData.availability.saturday}
                      onChange={handleChange}
                    />
                    Saturday
                  </label>
                </div>

                <label>Charges (per day):</label>
                <input
                  type="number"
                  name="charges"
                  value={formData.charges}
                  onChange={handleChange}
                  required={userType === 'petCareProvider'}
                />
                {formErrors.charges && <p className="error-text">{formErrors.charges}</p>}
              </>
            )}

            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

            {formErrors.passwordMismatch && <p className="error-text">Passwords do not match</p>}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
