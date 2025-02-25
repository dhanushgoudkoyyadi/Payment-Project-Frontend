import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './features/Dashboard';
import Register from "./features/Register";
import Login from "./features/Login";
import Admin from "./features/Admin";
import Mainboard from './features/Mainboard';
import Adminboard from './features/Adminboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/Mainboard" element={<Mainboard/>}/>
        <Route path="/Adminboard" element={<Adminboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
