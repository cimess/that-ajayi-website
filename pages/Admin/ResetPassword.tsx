import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lock } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useData();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const success = await resetPassword({ email, password});
    console.log(success)
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-eko-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-eko-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-eko-gold">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Reset Password</h1>
          <p className="text-gray-400 mt-2">Enter your email and new password to continue</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-widest focus:outline-none focus:border-eko-gold transition-colors mb-4"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-widest focus:outline-none focus:border-eko-gold transition-colors"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-widest focus:outline-none focus:border-eko-gold transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eko-gold text-eko-black font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ResetPassword;
