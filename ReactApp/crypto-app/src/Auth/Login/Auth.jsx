import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

function Auth({ setLoggedInUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phone: "",
    status: ""
  });
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/users", {
        ...form,
        status: "registered"
      });
      setMessage("Sign up successful!");
      setLoggedIn(true);
      setLoggedInUser(form.username);
    } catch (error) {
      setMessage("Sign up failed. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: { email: form.email, password: form.password },
      });
      if (response.data.length > 0) {
        const user = response.data[0];
        // Update user status to "logged_in"
        await axios.put(`http://localhost:3000/users/${user.id}`, {
          ...user,
          status: "logged_in"
        });
        setMessage("Sign in successful!");
        setLoggedIn(true);
        setLoggedInUser(user.username);
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage("Sign in failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInUser(null);
    setMessage("You have logged out.");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      phone: "",
      status: "logged_out"
    });
  };

  return (
    <Container className="container my-5 p-4 w-50 shadow-lg p-3 mb-5 bg-white rounded">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {message && <Alert variant="info">{message}</Alert>}
      {!loggedIn ? (
        <Form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp && (
            <>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {isSignUp && (
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="d-block text-center mt-3"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Form>
      ) : (
        <Button variant="danger" onClick={handleLogout} className="mt-3 w-100">
          Log Out
        </Button>
      )}
    </Container>
  );
}

export default Auth;
