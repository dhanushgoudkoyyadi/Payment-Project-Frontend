import Dashboard from "./features/Dashboard";
import { BrowserRouter, Routes, Route ,Router} from "react-router-dom";

function App() {
  return (
    
   <>
   <Dashboard/>
   <Router>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Admin" element={<Admin/>} />
    </Routes>
   </Router>
   </> 
   
  );
}

export default App;
