import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed in your project
import Navbar3 from './Navbar3';

const IQAView = () => {
  const [data, setData] = useState([]);

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

  const handleButtonClick = (courseId) => {
    // Handle button click action
    alert(`Clicked on button for course ID: ${courseId}`);
  };

  return (
    <>
      <Navbar3 />
      <div style={{ margin: '20px' }}>
        <h1 style={{ fontFamily: 'Times New Roman' }}>IQA Coordinator page</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Times New Roman' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Course ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Course Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Final Feedback</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>More Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.courseId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.courseName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item.finalFeedback}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => handleButtonClick(item.courseId)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' ,fontFamily:'times new roman'}}>Click Here</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default IQAView;
