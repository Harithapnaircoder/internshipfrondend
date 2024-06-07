import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed in your project
import Navbar3 from './Navbar3';

const IQAView = () => {
  const [data, setData] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/latest');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleButtonClick = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/course/${courseId}`);
      setCourseDetails(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setCourseDetails(null);
      setError('Course not found');
    }
  };

  const handleClose = () => {
    setCourseDetails(null);
    setError(null);
  };

  // Sort the data array by courseId in ascending order numerically
  const sortedData = data.sort((a, b) => Number(a.courseId) - Number(b.courseId));

  return (
    <>
      <Navbar3 />
      <div style={{ margin: '20px', position: 'relative' }}>
        <h1 style={{ fontFamily: 'Times New Roman' }}>IQA Coordinator page</h1>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Added container for vertical scroll */}
          <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Times New Roman', filter: courseDetails ? 'blur(5px)' : 'none', pointerEvents: courseDetails ? 'none' : 'auto' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Course ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Course Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Feedback Score</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>More Link</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.courseId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.courseName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.status}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.finalFeedback}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handleButtonClick(item.courseId)} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'Times New Roman' }}>Click Here</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {courseDetails && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
            width: '40%', // Reduced width
            borderRadius: '10px',
            fontFamily: 'Times New Roman',
            textAlign: 'center',
            fontSize: '18px' // Increased text size
          }}>
            <h2>Course Details</h2>
            <p><strong>Course ID:</strong> {courseDetails.courseId}</p>
            <p><strong>Course Name:</strong> {courseDetails.courseName}</p>
            <p><strong>OU:</strong> {courseDetails.ou}</p>
            <p><strong>Training Type:</strong> {courseDetails.trainingType}</p>
            <p><strong>Start Date:</strong> {new Date(courseDetails.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(courseDetails.endDate).toLocaleDateString()}</p>
            <p><strong>Batch Count:</strong> {courseDetails.batchCount}</p>
            <p><strong>Trainer Name:</strong> {courseDetails.trainerName}</p>
            <p><strong>Status:</strong> {courseDetails.status}</p>
            <p><strong>Final Feedback:</strong> {courseDetails.finalFeedback}</p>
            <button onClick={handleClose} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', fontFamily: 'Times New Roman', fontSize: '20px' }}>Cancel</button>
          </div>
        )}
        {error && <div style={{ marginTop: '20px', color: 'red', fontFamily: 'Times New Roman' }}>{error}</div>}
      </div>
    </>
  );
};

export default IQAView;
