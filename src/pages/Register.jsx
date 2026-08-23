import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Phone, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    <div className="min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">CivicConnect</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create an Account</h1>
          <p className="text-xs text-slate-500">Join the smart civic platform to report and track neighborhood issues</p>
        </div>

        <Card className="shadow-lg border border-slate-200">
          
          {/* Role selector */}
          <div className="mb-6 space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
              Account Role Type
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedRole('citizen')}
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
                onClick={() => setSelectedRole('officer')}
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
                onClick={() => setSelectedRole('admin')}
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
              label="Full Name"
              type="text"
              name="fullName"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Kishore S"
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              icon={Phone}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <input type="checkbox" id="terms" required className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <label htmlFor="terms">
                I agree to the <a href="#terms" className="text-emerald-600 font-semibold">Terms of Service</a> & <a href="#privacy" className="text-emerald-600 font-semibold">Privacy Policy</a>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Complete Registration
            </Button>
          </form>

        </Card>

        <p className="text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
            Log in here
          </Link>
        </p>

      </div>
    </div>
  );
}
