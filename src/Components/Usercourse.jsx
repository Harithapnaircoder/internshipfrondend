import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Usercourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const userCourses = JSON.parse(sessionStorage.getItem('courses'));
    console.log("User Courses:", userCourses); 
    if (userCourses) {
      setCourses(userCourses);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxWidth: '800px', justifyContent: 'center' }}>
        {courses && courses.map((course) => (
          <Card
            key={course.courseId}
            sx={{
              borderRadius: '12px',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(to bottom right, #64B5F6, #81C784)',

              color: '#fff',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              textAlign: 'center', 
              width: '300px', 
              height: '350px', 
              marginTop: '20px', 
            }}
          >
            <CardContent>
            <Typography 
                variant="h6" 
                component="h1" 
                style={{ fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}  
              >
                {course.courseName}
              </Typography>
              <br />
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>   Start Date: {formatDate(course.startDate)}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>  End Date: {formatDate(course.endDate)}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>  Ou: {course.ou}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>  Batch count:{course['Batch count']}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>  Trainer name:{course['Trainer name']}</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom style={{ fontSize: '1rem' }}>
              <strong>   Status: {course.status}</strong>
              </Typography>
            </CardContent>

            {course.status.toLowerCase() === 'completed' && (
              <Link to="/feedback" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', margin: '1rem' }}>
      <Button variant="contained" color="primary">Give Feedback</Button>







              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Usercourse;
