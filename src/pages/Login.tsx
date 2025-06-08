
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '@/contexts/SchoolContext';

type LoginMode = 'login' | 'register' | 'forgot-password';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { dispatch } = useSchool();
  const [mode, setMode] = useState<LoginMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Password data for registration
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });

  // Forgot password data
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegistrationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'firstName' || name === 'lastName') {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    } else if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleForgotPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validateLoginForm = () => {
    if (!loginData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Email is required.",
        variant: "destructive"
      });
      return false;
    }

    if (!loginData.password.trim()) {
      toast({
        title: "Validation Error", 
        description: "Password is required.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const validateRegistrationForm = () => {
    if (!formData.firstName || formData.firstName.trim().length < 1) {
      toast({
        title: "Validation Error",
        description: "First name must be at least 1 character.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.lastName || formData.lastName.trim().length < 1) {
      toast({
        title: "Validation Error",
        description: "Last name must be at least 1 character.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.phone || formData.phone.length !== 10 || !/^[6-9]\d{9}$/.test(formData.phone)) {
      toast({
        title: "Validation Error",
        description: "Phone number must be exactly 10 digits starting with 6, 7, 8, or 9.",
        variant: "destructive"
      });
      return false;
    }

    if (!passwordData.password || passwordData.password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-login for admin
    if (loginData.email === 'arunnanna3@gmail.com' && loginData.password === 'Arun@2004') {
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin panel!",
      });
      navigate('/admin');
      return;
    }
    
    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      navigate('/admin');
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password.";
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleRegistration = async () => {
    if (!validateRegistrationForm()) {
      return;
    }

    setLoading(true);
    try {
      // Add registration request to admin approval queue
      const registrationRequest = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `+91${formData.phone}`,
        password: passwordData.password,
        requestDate: new Date().toISOString(),
        status: 'pending'
      };

      dispatch({
        type: 'ADD_ADMIN_REQUEST',
        payload: registrationRequest
      });

      toast({
        title: "Registration Request Submitted",
        description: "Your request has been sent to admin (arunnanna3@gmail.com) for approval.",
      });
      
      // Reset form and go back to login
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      setPasswordData({ password: '', confirmPassword: '' });
      setMode('login');
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: "Failed to submit registration request. Please try again.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email to reset password.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotPasswordData.email);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setMode('login');
    } catch (error: any) {
      let errorMessage = "Failed to send reset email.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleLoginInputChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={loginData.password}
            onChange={handleLoginInputChange}
            placeholder="Enter your password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-school-blue hover:bg-school-blue/90 text-white py-3"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );

  const renderRegistrationForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleRegistrationInputChange}
            placeholder="Enter first name"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleRegistrationInputChange}
            placeholder="Enter last name"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Will be converted to uppercase</p>
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleRegistrationInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <div className="flex">
          <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
            <span className="text-sm font-medium">+91</span>
          </div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleRegistrationInputChange}
            placeholder="Enter 10-digit number"
            className="rounded-l-none"
            maxLength={10}
            required
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Enter 10 digits starting with 6, 7, 8, or 9</p>
      </div>
      <div>
        <Label htmlFor="regPassword">Password *</Label>
        <div className="relative">
          <Input
            id="regPassword"
            type={showPassword ? "text" : "password"}
            value={passwordData.password}
            onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder="Confirm your password"
          required
        />
      </div>
      <Button onClick={handleRegistration} disabled={loading} className="w-full bg-school-blue hover:bg-school-blue/90">
        {loading ? 'Submitting Request...' : 'Submit Registration Request'}
      </Button>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Reset Password</h3>
        <p className="text-sm text-gray-600">Enter your email to receive reset instructions</p>
      </div>
      <div>
        <Label htmlFor="forgotEmail">Email Address *</Label>
        <Input
          id="forgotEmail"
          name="email"
          type="email"
          value={forgotPasswordData.email}
          onChange={handleForgotPasswordInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <Button onClick={handleForgotPassword} disabled={loading} className="w-full bg-school-blue hover:bg-school-blue/90">
        {loading ? 'Sending...' : 'Send Reset Email'}
      </Button>
      <Button variant="outline" onClick={() => setMode('login')} className="w-full">
        Back to Login
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-school-blue-light to-school-orange-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-school-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-school-blue mb-2">
            {mode === 'login' ? 'Admin Login' : mode === 'register' ? 'Admin Registration' : 'Reset Password'}
          </h1>
          <p className="text-gray-600">
            {mode === 'login' ? 'Access the school management system' : mode === 'register' ? 'Request admin account access' : 'Reset your password'}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-school-blue">
              {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Registration Request' : 'Password Reset'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mode === 'login' && renderLoginForm()}
            {mode === 'register' && renderRegistrationForm()}
            {mode === 'forgot-password' && renderForgotPasswordForm()}

            {mode === 'login' && (
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <Button variant="link" className="text-school-blue" onClick={() => setMode('forgot-password')}>
                    Forgot Password?
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <p>Need admin access?</p>
                  <Button 
                    variant="link" 
                    className="text-school-orange"
                    onClick={() => setMode('register')}
                  >
                    Request Admin Access
                  </Button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="mt-6 text-center">
                <Button 
                  variant="link" 
                  className="text-school-blue"
                  onClick={() => setMode('login')}
                >
                  Already have an account? Sign In
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
