import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, UserCheck, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('citizen'); // citizen | officer | admin
  const [email, setEmail] = useState('citizen@civicconnect.gov');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'citizen') {
      setEmail('citizen@civicconnect.gov');
    } else if (role === 'officer') {
      setEmail('officer.kalai@civicconnect.gov');
    } else {
      setEmail('admin.kanishk@civicconnect.gov');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate quick UI transition without real backend
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'citizen') {
        navigate('/citizen/dashboard');
      } else if (selectedRole === 'officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">CivicConnect</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to access your portal and manage civic complaints</p>
        </div>

        <Card className="shadow-lg border border-slate-200">
          
          {/* Role Selection Tabs */}
          <div className="mb-6 space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
              Select Portal Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSelect('citizen')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'citizen'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 mb-0.5" />
                <span>Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('officer')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'officer'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 mb-0.5" />
                <span>Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mb-0.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@civicconnect.gov"
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end">
                <a href="#forgot" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant={selectedRole === 'officer' ? 'secondary' : selectedRole === 'admin' ? 'secondary' : 'primary'}
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Button>
          </form>

          {/* Quick Demo Role Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Frontend UI Demo Mode:</strong> Selecting a role above auto-fills demo credentials and redirects to the corresponding module dashboard.
            </div>
          </div>
        </Card>

        {/* Register Link */}
        <p className="text-center text-xs text-slate-600">
          Don't have a Citizen Account?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}
