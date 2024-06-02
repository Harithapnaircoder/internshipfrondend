import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import { Card, CardContent, Typography, Button, Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alter = () => {
  const [courses, setCourses] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const handleUpdateClick = (course) => {
    setCurrentCourse({
      ...course,
      startDate: formatDateForInput(course.startDate),
      endDate: formatDateForInput(course.endDate)
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      if (currentCourse && currentCourse.courseId) { 
        const response = await fetch(`http://localhost:8080/course/${currentCourse.courseId}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentCourse),
        });

        if (response.ok) {
          setCourses((prevCourses) => prevCourses.map((course) => (course.courseId === currentCourse.courseId ? currentCourse : course))); // Corrected property name to courseId
          setSnackbarMessage('Course updated successfully!');
          setSnackbarOpen(true);
          setOpenUpdateDialog(false);
        } else {
          console.error('Failed to update course:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      if (courseId) {
        const response = await fetch(`http://localhost:8080/course/${courseId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setCourses((prevCourses) => prevCourses.filter((course) => course.courseId !== courseId)); // Corrected property name to courseId
          setSnackbarMessage('Course deleted successfully!');
          setSnackbarOpen(true);
        } else {
          console.error('Failed to delete course:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Navbar2 />
      <h1 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>All Courses</h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ width: '90%', padding: '10px' }}>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.courseId}> 
                <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', textAlign: 'center' }}>
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '22px' }}>{course.courseName}</Typography>
                    <br />
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Course id: {course.courseId}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>OU: {course.ou}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Training Type: {course.trainingType}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Start Date: {formatDate(course.startDate)}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>End Date: {formatDate(course.endDate)}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Batch Count: {course.batchCount}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Trainer Name: {course.trainerName}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Status: {course.status}</Typography>
                    <Typography variant="body2" style={{ fontFamily: 'Times New Roman', fontSize: '18px' }}>Final Feedback: {course.finalFeedback}</Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="space-between" p={2}>
                  <Button
  variant="contained"
  sx={{ backgroundColor: 'indigo', '&:hover': { backgroundColor: 'darkindigo' } }}
  onClick={() => handleUpdateClick(course)}
>
  Update
</Button>
                   <Button
  variant="contained"
  sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
  onClick={() => handleDelete(course.courseId)}
>
  Delete
</Button>


                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      {currentCourse && (
        <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
          <DialogTitle>Update Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please update the course details below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Course Name"
              name="courseName"
              fullWidth
              variant="standard"
              value={currentCourse.courseName}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="OU"
              name="ou"
              fullWidth
              variant="standard"
              value={currentCourse.ou}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Training Type"
              name="trainingType"
              fullWidth
              variant="standard"
              value={currentCourse.trainingType}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Batch Count"
              name="batchCount"
              fullWidth
              variant="standard"
              value={currentCourse.batchCount}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Trainer Name"
              name="trainerName"
              fullWidth
              variant="standard"
              value={currentCourse.trainerName}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Status"
              name="status"
              fullWidth
              variant="standard"
              value={currentCourse.status}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Final Feedback"
              name="finalFeedback"
              fullWidth
              variant="standard"
              value={currentCourse.finalFeedback}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="Start Date"
              name="startDate"
              fullWidth
              variant="standard"
              type="date"
              value={currentCourse.startDate}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              label="End Date"
              name="endDate"
              fullWidth
              variant="standard"
              type="date"
              value={currentCourse.endDate}
              onChange={handleUpdateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Added this line to set the position
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: 'green', color: 'white' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alter;
