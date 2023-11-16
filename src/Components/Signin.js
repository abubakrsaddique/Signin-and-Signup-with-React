import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
  const { signIn } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    if (email && password) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        // Successful login
        setError(null);
        window.alert('Sign-in successful!');
        // Clear form fields
        setUser({
          email: '',
          password: '',
        });
      } catch (error) {
        console.error('Error during sign-in:', error);

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError('Incorrect email or password. Please try again.');
          window.alert('User not found. Please check your credentials.');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="box">
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <h2>Sign In</h2>
        <div className="inputfield">
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input type="submit" />
        </div>
        <p className="forget">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
