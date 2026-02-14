'use client';

import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';

export default function AuthForm({ callbackUrl }: { callbackUrl?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      await signIn('google', {
        callbackUrl: callbackUrl || '/dashboard',
        redirect: true,
      });
      
      // If we reach here, redirect didn't happen (error occurred)
      setError('Failed to sign in with Google. Please try again.');
      setIsLoading(false);
    } catch (err) {
      console.error('Sign in exception:', err);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Email authentication will be implemented in future phases
      setError('Email authentication is not yet available. Please use Google sign-in.');
      setIsLoading(false);
    } catch {
      setError('Unable to sign in. Please check your email.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}
      
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-glass-5 hover:bg-glass-10 border border-border-10 rounded-lg text-text-90 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-orange/30"
        aria-label="Sign in with Google"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-text-90 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-glass-5 text-text-60">
            or
          </span>
        </div>
      </div>
      
      <form onSubmit={handleEmailSubmit} className="space-y-3">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-text-90 mb-2"
          >
            Continue with email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
              setError('');
            }}
            placeholder="you@example.com"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-glass-5 border border-border-10 rounded-lg text-text-90 placeholder-text-60 focus:outline-none focus:ring-2 focus:ring-accent-orange/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p id="email-error" className="mt-1 text-sm text-error">
              {emailError}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gradient-primary text-white font-medium rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-dark-base border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </div>
  );
}
