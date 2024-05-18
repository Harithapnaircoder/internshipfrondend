import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const [ratings, setRatings] = useState({
    courseRelevance: 0,
    contentDelivery: 0,
    confidence: 0,
    trainerRating: 0
  });

  const [feedback, setFeedback] = useState({
    enjoyedMost: '',
    additionalComments: ''
  });

  const navigate = useNavigate();

  const handleRatingChange = (field, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [field]: value
    }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your valuable feedback.');
    navigate('https://ictkerala.org');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '10px', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          The training course was relevant and helpful for me to relate.
        </label>
        <StarRating rating={ratings.courseRelevance} onRatingChange={(value) => handleRatingChange('courseRelevance', value)} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Delivery of the content was clear and understandable.
        </label>
        <StarRating rating={ratings.contentDelivery} onRatingChange={(value) => handleRatingChange('contentDelivery', value)} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          I am confident in applying the learnings into practice.
        </label>
        <StarRating rating={ratings.confidence} onRatingChange={(value) => handleRatingChange('confidence', value)} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          How would you rate the trainer?
        </label>
        <StarRating rating={ratings.trainerRating} onRatingChange={(value) => handleRatingChange('trainerRating', value)} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          What did you enjoy the most about the training session?
        </label>
        <textarea
          name="enjoyedMost"
          value={feedback.enjoyedMost}
          onChange={handleFeedbackChange}
          style={{ 
            width: '100%', 
            height: '80px', 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '5px' 
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Any additional comments/suggestions
        </label>
        <textarea
          name="additionalComments"
          value={feedback.additionalComments}
          onChange={handleFeedbackChange}
          style={{ 
            width: '100%', 
            height: '80px', 
            padding: '10px', 
            border: '1px solid #ccc', 
            borderRadius: '5px' 
          }}
        />
      </div>

      <button 
        type="submit" 
        style={{ 
          display: 'block', 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          fontSize: '16px' 
        }}
      >
        Submit
      </button>
    </form>
  );
};

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} style={{ cursor: 'pointer' }}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              style={{ display: 'none' }}
            />
            <FaStar
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Feedback;
