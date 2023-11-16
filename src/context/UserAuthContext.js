import { createContext, useContext, useEffect, useState } from 'react';
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const userContext = createContext();

export const useAuth = () => useContext(userContext);

const UserAuthContextProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      setError('Email already in use. Try another email.');
    } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
      setError('Password must be at least 6 characters.');
    } else {
      setError(error.message);
    }
  };

  const SignUp = async (email, password, FullName) => {
    setError('');

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      const userInfoRef = doc(db, 'userinfo', result.user.uid);
      await setDoc(userInfoRef, { email, FullName });

      alert('Welcome! New user created successfully');
    } catch (err) {
      handleAuthError(err);
    }
  };

  const SignIn = async (email, password) => {
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const value = {
    signUp: SignUp,
    signIn: SignIn,
    error,
    currentUser,
  };

  return (
    <userContext.Provider value={{ basename: '/default', ...value }}>
      {children}
    </userContext.Provider>
  );
};

export default UserAuthContextProvider;
