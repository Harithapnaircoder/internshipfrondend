import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import { Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

const Coordinator = () => {
  const [courses, setCourses] = useState([]);
  const [ou, setOu] = useState('Academic');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/ou/${ou}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setSnackbarMessage(`No courses in the selected OU: ${ou}`);
          setOpenSnackbar(true);
        }
        setCourses(data);
      } else {
        console.error('Failed to fetch courses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [ou]); // Fetch courses when `ou` changes

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div>
      <Navbar2 />
      <h1 style={{ textAlign: 'center', fontFamily:'times new roman' }}>Training Coordinator</h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ width: '90%', height: '500px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          <FormControl style={{ width: '200px' }}>
            <InputLabel>OU</InputLabel>
            <Select value={ou} onChange={(e) => setOu(e.target.value)}>
              <MenuItem value="Academic">Academic</MenuItem>
              <MenuItem value="Corporate">Corporate</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
            </Select>
          </FormControl>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Course Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>OU</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Training Type</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Start Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>End Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Batch Count</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Trainer Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>Final Feedback</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={{ backgroundColor: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.courseName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.ou}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.trainingType}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{formatDate(course.startDate)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{formatDate(course.endDate)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.batchCount}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.trainerName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.status}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{course.finalFeedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: '100%', backgroundColor: 'red', color: 'white' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Coordinator;
