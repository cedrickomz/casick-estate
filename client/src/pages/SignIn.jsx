import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const loading = useSelector((state) => state.user.loading ?? null); // Ensure loading is initialized to null
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    setMessage('');
    setMessageType('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data.user));
        setMessage('User logged in successfully!');
        setMessageType('success');
        setTimeout(() => {
          navigate('/'); // Navigate to profile page on success
        }, 1000);
      } else {
        dispatch(signInFailure(data.message || 'Invalid email or password'));
        setMessage(data.message || 'Invalid email or password');
        setMessageType('error');
      }
    } catch (error) {
      dispatch(signInFailure('An error occurred. Please try again.'));
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 relative">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md absolute top-10">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'SIGN IN'}
          </button>
          <OAuth />
        </form>
        {message && (
          <div className={`mt-6 text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-500 hover:text-blue-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
