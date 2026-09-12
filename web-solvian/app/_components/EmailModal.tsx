'use client';

import { useState } from 'react';

const ALLOWED_EMAILS = new Set([
  'info@sollviantech.com',
  'divyanshu@sollviantech.com',
  'ankit.roy@sollviantech.com',
  'abhishek.goswami@sollviantech.com',
]);

interface EmailModalProps {
  onClose: () => void;
}

export default function EmailModal({ onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ALLOWED_EMAILS.has(email.trim().toLowerCase())) {
      setError('');
      setShowDownload(true);
    } else {
      setError('This email is wrong');
      setShowDownload(false);
    }
  }

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)' }}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl p-8"
        style={{
          background: 'rgb(7, 20, 48)',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl leading-none"
        >
          ×
        </button>

        {/* Email icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(0, 212, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-white text-xl font-bold mb-1">
          Download Access
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter your authorized email to unlock the download.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setShowDownload(false);
              }}
              placeholder="name@sollviantech.com"
              className="w-full h-11 rounded-lg px-4 text-white text-sm outline-none"
              style={{
                background: 'rgba(2, 14, 28, 0.8)',
                border: '1px solid rgba(0, 200, 255, 0.3)',
              }}
              required
              autoFocus
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-black text-sm bg-cyan-400 hover:bg-cyan-300 transition-all"
            style={{ boxShadow: '0 0 16px rgba(0, 212, 255, 0.5)' }}
          >
            Verify &amp; Unlock
          </button>

          {/* Download link on success */}
          {showDownload && (
            <a
              href="/api/download"
              download="sollvian_profile.png"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-black text-sm bg-cyan-400 hover:bg-cyan-300 transition-all"
              style={{ boxShadow: '0 0 16px rgba(0, 212, 255, 0.5)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v13m0 0l-4-4m4 4l4-4"
                />
              </svg>
              Download Now
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
