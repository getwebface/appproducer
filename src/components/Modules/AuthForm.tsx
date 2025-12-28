import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  type: 'login' | 'signup' | 'forgot_password';
  redirect_after?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, redirect_after = '/dashboard' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (type === 'signup') {
        result = await supabase.auth.signUp({ email, password });
      } else if (type === 'login') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.resetPasswordForEmail(email);
      }

      if (result.error) throw result.error;

      if (type !== 'forgot_password' && redirect_after) {
        navigate(redirect_after);
      } else {
        alert('Check your email for confirmation!');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    login: 'Sign In',
    signup: 'Create Account',
    forgot_password: 'Reset Password'
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{titles[type]}</h1>
          <p className="py-6">Access your universal account securely.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleAuth}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email" 
                className="input input-bordered" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {type !== 'forgot_password' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input 
                  type="password" 
                  placeholder="password" 
                  className="input input-bordered" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            
            {error && <p className="text-error text-sm mt-2">{error}</p>}
            
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : titles[type]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
