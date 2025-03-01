import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login1 from '../images/login.png';
import { useLoginMutation } from "../../service/Leads";
import "./Login.css"
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem("token", response.token);
      navigate("/Mainboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="form-section">
          <h1 className="login-title">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="error-message">{error.data?.message || "An error occurred. Please try again."}</p>}
        </div>

        <div className="image-section">
          <img src={login1} alt="Login" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
