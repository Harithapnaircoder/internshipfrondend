import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Snackbar,
  SnackbarContent,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const theme = createTheme();

const Feedback = () => {
  const [ratings, setRatings] = useState({
    courseRelevance: 0,
    contentDelivery: 0,
    confidence: 0,
    trainerRating: 0,
  });

  const [feedback, setFeedback] = useState({
    enjoyedMost: '',
    additionalComments: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [courseId, setCourseId] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
  
    const storedCourseId = sessionStorage.getItem('courseId');
    setCourseId(parseInt(storedCourseId, 10));
  }, []);

  const handleRatingChange = (field, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [field]: value,
    }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const calculateFinalScore = () => {
    const { courseRelevance, contentDelivery, confidence, trainerRating } = ratings;
    return (courseRelevance + contentDelivery + confidence + trainerRating) * 5;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalScore = calculateFinalScore();

    const feedbackData = {
      courseid: courseId,
      relevantAndHelpful: ratings.courseRelevance,
      clearAndUnderstandable: ratings.contentDelivery,
      confidentInApplying: ratings.confidence,
      trainerRating: ratings.trainerRating,
      enjoyment: feedback.enjoyedMost,
      additionalComments: feedback.additionalComments,
      finalScore: finalScore,
    };

    try {
      await axios.post('http://localhost:8080/feedback', feedbackData);
      setSnackbarMessage('Thank you for your valuable feedback.');
      setOpenSnackbar(true);
      setTimeout(() => {
        window.open('https://ictkerala.org', '_blank');
        setRatings({
          courseRelevance: 0,
          contentDelivery: 0,
          confidence: 0,
          trainerRating: 0,
        });
        setFeedback({
          enjoyedMost: '',
          additionalComments: '',
        });
      }, 3000); 
  
     
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSnackbarMessage('Failed to submit feedback. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              p: 3,
              borderRadius: 8,
              border: '2px solid #ccc',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px', 
              width: '100%',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: 'times new roman', fontWeight: 'bold' }}
            >
              Feedback Form
            </Typography>
            <br />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div style={{ marginBottom: '20px' }}>
                <Typography variant="body1" gutterBottom>
                  The training course was relevant and helpful for me to relate.
                </Typography>
                <StarRating
                  rating={ratings.courseRelevance}
                  onRatingChange={(value) => handleRatingChange('courseRelevance', value)}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <Typography variant="body1" gutterBottom>
                  Delivery of the content was clear and understandable.
                </Typography>
                <StarRating
                  rating={ratings.contentDelivery}
                    onRatingChange={(value) => handleRatingChange('contentDelivery', value)}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="body1" gutterBottom>
                    I am confident in applying the learnings into practice.
                  </Typography>
                  <StarRating
                    rating={ratings.confidence}
                    onRatingChange={(value) => handleRatingChange('confidence', value)}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="body1" gutterBottom>
                    How would you rate the trainer?
                  </Typography>
                  <StarRating
                    rating={ratings.trainerRating}
                    onRatingChange={(value) => handleRatingChange('trainerRating', value)}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="body1" gutterBottom>
                    What did you enjoy the most about the training session?
                  </Typography>
                  <TextField
                    name="enjoyedMost"
                    value={feedback.enjoyedMost}
                    onChange={handleFeedbackChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="body1" gutterBottom>
                    Any additional comments/suggestions
                  </Typography>
                  <TextField
                    name="additionalComments"
                    value={feedback.additionalComments}
                    onChange={handleFeedbackChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <SnackbarContent
              sx={{ backgroundColor: 'green' }}
              message={snackbarMessage}
            />
          </Snackbar>
        </ThemeProvider>
      </div>
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
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
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
  