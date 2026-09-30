import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (!password) return "";

    if (password.length < 6) {
      return "Weak";
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // JWT Token Simulation
    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      })
    );

    const payload = btoa(
      JSON.stringify({
        username: username,
        loginTime: new Date().toISOString(),
      })
    );

    const signature = btoa("authentication-system-secret");

    const fakeToken = `${header}.${payload}.${signature}`;

    if (remember) {
      localStorage.setItem("authUser", username);
      localStorage.setItem("jwtToken", fakeToken);
    } else {
      sessionStorage.setItem("authUser", username);
      sessionStorage.setItem("jwtToken", fakeToken);
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🔐 Authentication System</h1>
        <p className="login-subtitle">
          Login to access your dashboard
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {password && (
            <div className="password-strength">
              Password Strength:{" "}
              <strong>{getPasswordStrength()}</strong>
            </div>
          )}

          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember Me
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="demo-text">
          JWT Authentication Simulation
        </p>
      </div>
    </div>
  );
}

export default Login;