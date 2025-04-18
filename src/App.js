import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './features/Dashboard-main/Dashboard';
import Login from "./features/Authentication/Login";
import Admin from "./features/Admin/Admin";
import Mainboard from './features/Student-Details/Mainboard';
import Adminboard from './features/Admin/Adminboard';
import Register from "./features/Authentication/Register";
import SpFailed from './features/Student-Details/SpFailed';
import Paymentdetails from './features/Home/Paymentdetails';
import FileUpload from './features/Student-Details/StudentPayment';
import Home from "./features/Home/Home"
import AddCourse from './features/Student-Details/AddCourse';
import Tech from './features/Cohort/Tech';
import Techs from './features/Cohort/Technologies';
import AddCohorts from './features/Cohort/AddCohorts';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/Mainboard" element={<Mainboard/>}/>
        <Route path="/SpFailed" element={<SpFailed/>}/>
        <Route path="/Adminboard" element={<Adminboard/>}/>
        <Route path="/Paymentdetails" element={<Paymentdetails/>}/>
        <Route path="/FileUpload" element={<FileUpload/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/AddCourse" element={<AddCourse/>}/>
        <Route path="/Tech" element={<Tech/>}></Route>
        <Route path="/cohorts" element={<Techs/>}></Route>
        <Route path="/AddCohorts" element={<AddCohorts/>}></Route>

        
       
        
        
      </Routes>
    </Router>
  );
}

export default App;
