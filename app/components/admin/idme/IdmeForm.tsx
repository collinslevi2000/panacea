// app/components/idme/IdmeForm.tsx
"use client";

import React, { useState } from 'react';
type FormState = {
    firstName: string;
    lastName: string;
    email: string;
  };
const IdmeForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const initialFormState: FormState = {
    firstName: "",
    lastName: "",
    email: "",
  };
    const [form, setForm] = useState<FormState>(initialFormState);
  
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Implement ID.me form sending logic here
      const res = await fetch("/api/send-idme", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMessage('ID.me verification form sent successfully!');
      setForm(initialFormState)
    } catch (error) {
      setMessage('Error sending form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-user-check text-blue-400 text-2xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">ID.me Verification Form</h3>
        <p className="text-gray-400">Send ID.me verification request to applicant</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Applicant Email Address *
          </label>
          <input
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
             className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="applicant@example.com"
           
          />
         
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
           First Name
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
            required
          />
         
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Applicant Email Address *
          </label>
          <input
             type="text"
             value={form.lastName}
             onChange={(e) =>
                 setForm({ ...form, lastName: e.target.value })
               }            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             placeholder="Doe"
             required
          />
         
        </div>

       

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Send ID.me Verification Form
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

export default IdmeForm;