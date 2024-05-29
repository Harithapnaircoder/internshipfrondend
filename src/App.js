import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Signin from './Components/Signin'; 
import Signup from './Components/Signup'; 
import Footer from './Components/Footer'; 
import Coordinator from './Components/Coordinator'; 
import IQAView from './Components/IQAView'; 
import Feedback from './Components/Feedback'; 
import Course from './Components/Course';
import Alter from './Components/Alter';


function App() {
  return ( 
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />      
          <Route path="/feedback" element={<Feedback />} /> 
          <Route path="/coordinator" element={<Coordinator />} /> 
          <Route path="/iqaview" element={<IQAView />} /> 
          <Route path="/course" element={<Course />} /> 
          <Route path="/alter" element={<Alter />} /> 
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
