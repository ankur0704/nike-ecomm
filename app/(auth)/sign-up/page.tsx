'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import AuthForm from '@/src/components/AuthForm';
import SocialProviders from '@/src/components/SocialProviders';
import { signUp } from '@/lib/auth';

export default function SignUpPage() {
  const [state, action] = useActionState(signUp, null);

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign up');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    console.log('Apple sign up');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[var(--text-heading-3)] font-[var(--text-heading-3--font-weight)] text-[var(--color-dark-900)] mb-2">
          Join Nike
        </h1>
        <p className="text-[var(--text-body)] text-[var(--color-dark-500)]">
          Create your Nike account
        </p>
      </div>

      {/* Auth Form */}
      <AuthForm type="sign-up" formAction={action} />
      {state?.error && (
        <p className="mt-4 text-sm text-[var(--color-red)] text-center">{state.error}</p>
      )}

      {/* Social Providers */}
      <div className="mt-8">
        <SocialProviders
          onGoogleSignIn={handleGoogleSignIn}
          onAppleSignIn={handleAppleSignIn}
        />
      </div>

      {/* Terms */}
      <div className="mt-8 text-center">
        <p className="text-xs text-[var(--color-dark-500)]">
          By creating an account, you agree to Nike&apos;s{' '}
          <Link href="/terms" className="text-[var(--color-dark-900)] hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[var(--color-dark-900)] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}