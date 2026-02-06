// app/components/idme/BackgroundForm.tsx
"use client";

import React, { useState } from 'react';

const BackgroundForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Implement background check form sending logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setMessage('Background check form sent successfully!');
      setEmail('');
    } catch (error) {
      setMessage('Error sending form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-shield-alt text-yellow-400 text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Background Check Form</h3>
        <p className="text-gray-400">Send background check information request to applicant</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Applicant Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="applicant@example.com"
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            The applicant will receive an email with a secure background check form
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-white mb-2">Information Collected</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <i className="fas fa-user text-yellow-400 mr-2 mt-0.5"></i>
              <span>Personal identification information</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-briefcase text-yellow-400 mr-2 mt-0.5"></i>
              <span>Employment history and references</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-car text-yellow-400 mr-2 mt-0.5"></i>
              <span>Driver's license information</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-gavel text-yellow-400 mr-2 mt-0.5"></i>
              <span>Criminal record declaration</span>
            </li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Send Background Check Form
            </>
          )}
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-center ${
            message.includes('success') 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default BackgroundForm;