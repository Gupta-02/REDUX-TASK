"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <Loader />;
  return children;
}