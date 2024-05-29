import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  SnackbarContent,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import Navbar2 from './Navbar2';

const theme = createTheme();

const Course = () => {
  
  const [courseName, setCourseName] = useState('');
  const [ou, setOu] = useState('Academic');
  const [trainingType, setTrainingType] = useState('LTT');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [batchCount, setBatchCount] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [status, setStatus] = useState('Upcoming');
  const [finalFeedback, setFinalFeedback] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCourse = {
   
      courseName,
      ou,
      trainingType,
      startDate,
      endDate,
      batchCount,
      trainerName,
      status,
      finalFeedback,
    };

    try {
      const response = await fetch('http://localhost:8080/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        setSnackbarMessage('Course created');
        setOpenSnackbar(true);
      
        setCourseName('');
        setOu('');
        setTrainingType('');
        setStartDate('');
        setEndDate('');
        setBatchCount('');
        setTrainerName('');
        setStatus('');
        setFinalFeedback('');
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 3000);
      } else {
        console.error('Course creation failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during course creation:', error);
    }
  };

  return (
    <div>
    <Navbar2 />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Ensure full height to center vertically
          marginTop: 18, // Add margin top to create some space from the top
          marginBottom: 8, // Add margin bottom to create some space at the bottom
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
            maxWidth: '370px',
            width: '100%',
            margin: 'auto', // Center horizontally
          }}
        >
          <Typography component="h1" variant="h5" style={{fontFamily:'times new roman'}}>
            New Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="courseName"
              label="Course Name"
              name="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="ou-label">OU</InputLabel>
              <Select
                labelId="ou-label"
                id="ou"
                value={ou}
                onChange={(e) => setOu(e.target.value)}
                label="OU"
              >
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Government">Government</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="trainingType-label">Type of Training</InputLabel>
              <Select
                labelId="trainingType-label"
                id="trainingType"
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
                label="Type of Training"
              >
                <MenuItem value="LTT">LTT (6 months)</MenuItem>
                <MenuItem value="MDT">MDT (2 months)</MenuItem>
                <MenuItem value="Microskill">Microskill (1 month)</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="startDate"
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="endDate"
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="batchCount"
              label="Batch Count"
              type="number"
              value={batchCount}
              onChange={(e) => setBatchCount(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="trainerName"
              label="Trainer Name"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
            />
            <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Hold">Hold</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="finalFeedback"
              label="Final Feedback"
              multiline
              rows={4}
              value={finalFeedback}
              onChange={(e) => setFinalFeedback(e.target.value)}
            />
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
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
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

export default Course;