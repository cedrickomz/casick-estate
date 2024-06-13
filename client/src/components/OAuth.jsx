
import React from 'react';
import app from '../firebase'; 
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app); 
    const provider = new GoogleAuthProvider();

    

    try {
      dispatch(signInStart());
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,

        }),
      });
      const user = result.user;
      dispatch(signInSuccess(user));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    ;
  };

  return (
    <div>
      <button
        type="button"
        className="w-full py-2 px-4 flex items-center justify-center bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={handleGoogleSignIn}
      >
        <FaGoogle className="mr-2" /> CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}
