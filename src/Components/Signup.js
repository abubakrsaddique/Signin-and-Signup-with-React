import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';
import './Signup.css';

const Signup = () => {
  const { error, signUp, currentUser } = useAuth();
  const [err, setError] = useState('');
  const [backError, setBackError] = useState('');
  const [user, setUser] = useState({
    FullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    console.log('I am in');
    if (error) {
      setInterval(() => {
        setBackError('');
      }, 5000);
      setBackError(error);
    }
  }, [error, currentUser]);

  const userHandler = (e) => {
    const { name, value } = e.target;
    console.log(name + '::::::::::' + value);
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, FullName } = user;

    if (password === '' || confirmPassword === '' || email === '' || FullName === '') {
      setInterval(() => {
        setError('');
      }, 5000);
      return setError('Please fill all the fields.');
    } else if (password !== confirmPassword) {
      setInterval(() => {
        setError('');
      }, 5000);
      return setError('Password does not match');
    } else if (!(password.length >= 6) || !(confirmPassword.length >= 6)) {
      setInterval(() => {
        setError('');
      }, 5000);
      return setError('Password must be greater than 6 characters');
    } else {
      signUp(email, password, FullName);
      setUser({
        FullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className='box'>
      {err ? (
        err && <p className='error'>{err}</p>
      ) : (
        backError && <p className='error'>{backError}</p>
      )}

      <form onSubmit={submitHandler} className='form'>
        <h2>Registration Form</h2>
        <div className='inputfield'>
          <input type='text' placeholder='UserName' value={user.FullName} name='FullName' onChange={userHandler} />
        </div>
        <div className='inputfield'>
          <input type='text' placeholder='Email' value={user.email} name='email' onChange={userHandler} />
        </div>

        <div className='inputfield'>
          <input type='password' placeholder='Password' value={user.password} name='password' onChange={userHandler} />
        </div>
        <div className='inputfield'>
          <input type='password' placeholder='Confirm Password' value={user.confirmPassword} name='confirmPassword' onChange={userHandler} />
        </div>
        <div className='inputfield'>
          <input type='submit' />
        </div>
        <p className='forget'>
          Already have an account? <Link to='/signin'>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
