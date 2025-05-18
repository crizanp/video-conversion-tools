import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Successfully subscribed! Check your inbox for confirmation.');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden bg-black py-24">
      {/* Decorative background elements matching features section */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 w-full bg-gradient-to-l from-blue-800 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated circles */}
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="text-left">
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className=" text-white">Stay </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100">
                Updated
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl max-w-lg text-blue-100 font-light mt-6 py-4">
              Professional-grade tools delivered to your inbox. Get exclusive updates on new features and conversion tips.
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-5 w-5 text-cyan-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 font-light">Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-5 w-5 text-cyan-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 font-light">Exclusive Tips</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-5 w-5 text-cyan-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 font-light">Early Access</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="max-w-lg">
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative ">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 bg-gray-700 rounded-lg border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:border-opacity-40 transition-all"
                      disabled={status === 'loading'}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300 pointer-events-none" />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:translate-y-[-2px] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg max-w-lg ${status === 'success'
                  ? 'bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 text-green-200'
                  : 'bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-200'
                }`}>
                {message}
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-sm text-blue-200 mt-6 opacity-70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Right side image */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full filter blur-3xl opacity-20"></div>

              {/* Image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1688/1688988.png"
                alt="Email subscription illustration"
                className="relative w-full max-w-md mx-auto filter brightness-125"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}