import React, { useState, useEffect } from 'react';

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

  // State 4: Form Submitted Success Status
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields touched
    setTouched({ name: true, email: true, message: true });

    if (isFormValid) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });

      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

      // Cleanup timer
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="glass-card contact-form">
      {isSubmitted && (
        <div className="form-success-banner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Thank you! Your message has been received. Harsha will get back to you shortly.
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
            required
          ></textarea>
          {touched.message && errors.message && (
            <span className="error-text">{errors.message}</span>
          )}
        </div>

        {/* Submit Button - Disabled until required fields are filled and valid */}
        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={!isFormValid}
        >
          Send Message
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
