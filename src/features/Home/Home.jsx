import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');

    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/Dashbord">Edupoly</Link>
                <Link to="/AddCourse">Add Course</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <button onClick={handleLogout}>Log Out</button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Home