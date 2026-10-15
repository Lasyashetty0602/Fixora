import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (formData.name.trim().length < 2) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("Enter a valid 10-digit phone number.");
      setMessageType("error");
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    setMessage(
      "Your form is valid! Account registration will be connected to the backend next."
    );
    setMessageType("success");
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <Link to="/" className="register-brand">
          Fixora<span>.</span>
        </Link>

        <div className="register-heading">
          <h1>Create your account</h1>
          <p>Join Fixora to organize and manage maintenance requests.</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={10}
              inputMode="numeric"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-password">Password</label>

            <div className="register-password-wrapper">
              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {message && (
            <p
              className={`register-message ${messageType}`}
              role="status"
            >
              {message}
            </p>
          )}

          <button type="submit" className="register-submit">
            Create Account
          </button>
        </form>

        <p className="register-login">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <Link to="/" className="register-home">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}

export default Register;