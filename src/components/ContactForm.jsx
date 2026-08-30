import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ContactForm = () => {
  // State 1: Form Inputs (Controlled Components)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State 2: Field Validation Errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State 3: Field Touched Indicators
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // State 4: Server Communication & Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Validate form fields dynamically whenever formData changes
  useEffect(() => {
    const newErrors = { name: '', email: '', message: '' };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
  }, [formData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (serverError) {
      setServerError(null);
    }
  };

  // Handle Input Blur (mark field as touched)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Check if overall form is valid
  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.message.trim().length >= 10 &&
    !errors.name &&
    !errors.email &&
    !errors.message;

  // Handle Form Submission to Express API Endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched
    setTouched({ name: true, email: true, message: true });
    setServerError(null);

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Display server-returned error message
        const message = responseData.message || responseData.error || 'Server rejected submission.';
        setServerError(message);
        return;
      }

      // Success confirmation (HTTP 201)
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });

      // Auto-hide success banner after 6 seconds
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setServerError('Unable to reach backend server. Please verify Express backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card contact-form">
      {isSubmitted && (
        <div className="form-success-banner" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: '#22c55e', color: '#22c55e', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #22c55e' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Thank you! Your submission was recorded by the backend server. Harsha will get back to you shortly.
        </div>
      )}

      {serverError && (
        <div className="form-error-banner" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: '#ef4444', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #ef4444' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <strong>Server Error:</strong> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            disabled={isSubmitting}
            required
          />
          {touched.name && errors.name && (
            <span className="error-text">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            disabled={isSubmitting}
            required
          />
          {touched.email && errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Hi Harsha, I'd like to discuss a backend engineering opportunity..."
            disabled={isSubmitting}
            required
          ></textarea>
          {touched.message && errors.message && (
            <span className="error-text">{errors.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <span>Sending to API...</span>
          ) : (
            <>
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
