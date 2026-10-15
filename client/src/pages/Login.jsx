import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Temporary frontend demo login only
    localStorage.setItem("fixoraLoggedIn", "true");

    // Reload the landing page so the header updates
    window.location.href = "/";
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-brand">
          Fixora<span>.</span>
        </Link>

        <div className="login-heading">
          <div className="login-icon">🔐</div>
          <h1>Welcome back!</h1>
          <p>
            Sign in to manage your building maintenance requests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="login-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        <p className="login-register">
          New to Fixora?{" "}
          <Link to="/register">Create an account</Link>
        </p>

        <Link to="/" className="login-home">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}

export default Login;