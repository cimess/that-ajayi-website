import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // We assume backend expects { email, password }
    // Since the previous login was just a password 'admin123', I should probably hardcode the email
    // or adding an email field. A login usually requires email.
    // The user didn't ask to change the UI to add email, but backend requires it.
    // I will add an email input field.

    const success = await login({ email, password });
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-eko-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-eko-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-eko-gold">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Agency Access</h1>
          <p className="text-gray-400 mt-2">Enter credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
              placeholder="Enter Password"
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
            {loading ? 'Unlocking...' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
