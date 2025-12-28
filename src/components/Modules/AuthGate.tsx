import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AuthGateProps {
  redirect_if_locked?: string;
  children?: React.ReactNode;
}

const AuthGate: React.FC<AuthGateProps> = ({ 
  redirect_if_locked = '/login', 
  children 
}) => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate(redirect_if_locked);
    }
  }, [session, loading, redirect_if_locked, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return session ? <>{children}</> : null;
};

export default AuthGate;
