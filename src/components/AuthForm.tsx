'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  formAction?: (formData: FormData) => Promise<void>;
  onSubmit?: (data: { email: string; password: string; confirmPassword?: string }) => void;
}

export default function AuthForm({ type, formAction, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isServerAction = !!formAction;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (type === 'sign-up') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formAction) {
      // For server actions, the form submits directly
      return;
    } else if (onSubmit && validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form action={formAction} onSubmit={formAction ? undefined : handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark-900)] mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={isServerAction ? undefined : formData.email}
          onChange={isServerAction ? undefined : handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-dark-900)] focus:border-transparent transition-colors ${
            errors.email ? 'border-[var(--color-red)]' : 'border-[var(--color-light-300)]'
          }`}
          placeholder="Enter your email"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[var(--color-red)]">{errors.email}</p>
        )}
      </div>

      {/* Name Input (Sign Up only) */}
      {type === 'sign-up' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-dark-900)] mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={isServerAction ? undefined : formData.name}
            onChange={isServerAction ? undefined : handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-dark-900)] focus:border-transparent transition-colors ${
              errors.name ? 'border-[var(--color-red)]' : 'border-[var(--color-light-300)]'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-[var(--color-red)]">{errors.name}</p>
          )}
        </div>
      )}

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[var(--color-dark-900)] mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={isServerAction ? undefined : formData.password}
          onChange={isServerAction ? undefined : handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-dark-900)] focus:border-transparent transition-colors ${
            errors.password ? 'border-[var(--color-red)]' : 'border-[var(--color-light-300)]'
          }`}
          placeholder="Enter your password"
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-[var(--color-red)]">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password (Sign Up only) */}
      {type === 'sign-up' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-dark-900)] mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={isServerAction ? undefined : formData.confirmPassword}
            onChange={isServerAction ? undefined : handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-dark-900)] focus:border-transparent transition-colors ${
              errors.confirmPassword ? 'border-[var(--color-red)]' : 'border-[var(--color-light-300)]'
            }`}
            placeholder="Confirm your password"
            required={type === 'sign-up'}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-[var(--color-red)]">{errors.confirmPassword}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[var(--color-dark-900)] text-[var(--color-light-100)] py-3 px-4 rounded-lg font-medium hover:bg-[var(--color-dark-700)] transition-colors focus:ring-2 focus:ring-[var(--color-dark-900)] focus:ring-offset-2"
      >
        {type === 'sign-in' ? 'Sign In' : 'Create Account'}
      </button>

      {/* Links */}
      <div className="text-center space-y-2">
        {type === 'sign-in' ? (
          <>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--color-dark-700)] hover:text-[var(--color-dark-900)] transition-colors"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-[var(--color-dark-500)]">
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                className="text-[var(--color-dark-900)] font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </>
        ) : (
          <p className="text-sm text-[var(--color-dark-500)]">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-[var(--color-dark-900)] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}