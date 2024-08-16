import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './services.css';

const Services = ({ userData }) => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDays, setSelectedDays] = useState({});
  const [selectedServices, setSelectedServices] = useState({});

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('https://backendofcarecrew.onrender.com/providers');
        setProviders(response.data);
      } catch (err) {
        setError('Error fetching providers');
        console.error(err);
      }
    };

    fetchProviders();
  }, []);

  const handleDayChange = (providerId, day) => {
    setSelectedDays(prevState => ({
      ...prevState,
      [providerId]: {
        ...prevState[providerId],
        [day]: !prevState[providerId]?.[day]
      }
    }));
  };

  const handleServiceChange = (providerId, service) => {
    setSelectedServices(prevState => ({
      ...prevState,
      [providerId]: {
        ...prevState[providerId],
        [service]: !prevState[providerId]?.[service]
      }
    }));
  };

  const calculateTotalCost = (providerId) => {
    const provider = providers.find(provider => provider._id === providerId);
    if (!provider) return 0;

    const selectedDaysArray = Object.keys(selectedDays[providerId] || {}).filter(day => selectedDays[providerId][day]);
    const selectedServicesArray = Object.keys(selectedServices[providerId] || {}).filter(service => selectedServices[providerId][service]);

    if (selectedDaysArray.length === 0 || selectedServicesArray.length === 0) return 0;

    return provider.charges * selectedDaysArray.length * selectedServicesArray.length;
  };

  const handleBook = async (providerId) => {
    if (!userData) {
      alert('Please log in to book a service.');
      return;
    }

    const selectedProvider = providers.find(provider => provider._id === providerId);
    const selectedDaysArray = Object.keys(selectedDays[providerId] || {}).filter(day => selectedDays[providerId][day]);
    const selectedServicesArray = Object.keys(selectedServices[providerId] || {}).filter(service => selectedServices[providerId][service]);

    const serviceDetails = {
      providerId,
      customerId: userData._id,
      service: selectedServicesArray.join(', '),
      days: selectedDaysArray.join(', '),
    };
    console.log('Service Details:', serviceDetails); // Debugging line

    try {
      const response = await axios.post('https://backendofcarecrew.onrender.com/book', serviceDetails);
      alert('Booking request sent!');
    } catch (err) {
      alert('Error sending booking request');
      console.error('Error details:', err.response.data);
    }
  };

  return (
    <div className="services-container">
      <h2>Available Pet Care Providers</h2>
      {error && <p className="error">{error}</p>}
      <div className="providers-list">
        {providers.map(provider => {
          // Calculate total cost here for the services user take
          const totalCost = calculateTotalCost(provider._id);

          return (
            <div key={provider._id} className="provider-block">
              <h3>{provider.name}</h3>
              <p><strong>Contact:</strong> {provider.contact}</p>
              <p><strong>Location:</strong> {provider.location}</p>
              <p><strong>Experience:</strong> {provider.experience}</p>
              <p><strong>Certifications:</strong> {provider.certifications}</p>
              <p><strong>Charges:</strong> ${provider.charges} per service</p>
              <p><strong>Services Offered:</strong></p>
              <ul>
                {provider.servicesOffered.map(service => (
                  <li key={service}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedServices[provider._id]?.[service] || false}
                        onChange={() => handleServiceChange(provider._id, service)}
                      />
                      {service}
                    </label>
                  </li>
                ))}
              </ul>
              <p><strong>Availability:</strong></p>
              <ul>
                {Object.entries(provider.availability).map(([day, isAvailable]) => (
                  isAvailable ? (
                    <li key={day}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedDays[provider._id]?.[day] || false}
                          onChange={() => handleDayChange(provider._id, day)}
                        />
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                    </li>
                  ) : null
                ))}
              </ul>
              {totalCost > 0 && (
                <p><strong>Total Cost:</strong> ${totalCost}</p>
              )}
              <button onClick={() => handleBook(provider._id)}>Book Service</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
