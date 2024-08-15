import React from 'react';
import './homepage.css';
import pet1 from './pet.jpeg';
import pet2 from './pet1.jpeg';
import pet3 from './pet2.jpeg';
function HomeData() {

  return (
    <div className='main-content'>
          
        <div className="homepage-container">
          <div className="section">
            <img src={pet1} alt="Pet 1" className="left-image" />

            <p className='para'>
              Welcome to our pet care center, your one-stop solution for all your furry friends' needs. We offer a wide range of services, including day care, boarding, grooming, and training. Our experienced staff is passionate about providing a safe and loving environment for your pets. We understand that leaving your pet can be difficult, which is why we strive to create a home away from home for them.
            </p>
          </div>
          <div className="section">
            <p className='para'>
              Our day care program is designed to provide your pet with plenty of exercise, socialization, and mental stimulation. Our facility is equipped with a variety of play areas and activities to keep your pet entertained and engaged. We also offer individual playtime sessions for pets who prefer a more one-on-one experience.
            </p>
            <img src={pet2} alt="Pet 2" className="right-image" />
          </div>
          <div className="section">
            <img src={pet3} alt="Pet 3" className="left-image" />
            <p className='para'>
              In addition to our day care services, we also offer boarding for pets of all ages and breeds. Our boarding facility is clean, comfortable, and secure, and we provide individual attention to each pet. We offer a variety of boarding options to meet your pet's needs, including individual kennels and shared play areas.
            </p>
          </div>
        </div>
    
    </div>
  );
}

export default HomeData;
