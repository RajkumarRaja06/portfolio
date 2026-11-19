import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Linkedin, Github, MessageSquare, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Contact = ({ onNotify }) => {
  const { contactData } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!data.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@example.com).';
    }

    if (!data.details.trim()) {
      errs.details = 'Please describe your project requirements.';
    } else if (data.details.trim().length < 10) {
      errs.details = 'Project details must be at least 10 characters.';
    }

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);
    if (touched[name]) {
      setErrors(validate(nextData));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, details: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate network submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedSuccess(true);
        setFormData({ name: '', email: '', details: '' });
        setTouched({});
        if (onNotify) onNotify('Message sent successfully! Rajkumar will get back to you shortly.');
      }, 800);
    }
  };

  const handleCopyEmail = async () => {
    const emailToCopy = contactData.email || 'rajkumarrajaco@gmail.com';
    try {
      await navigator.clipboard.writeText(emailToCopy);
      setCopiedEmail(true);
      if (onNotify) onNotify('Email address copied to clipboard!');
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = emailToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      if (onNotify) onNotify('Email address copied to clipboard!');
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-slate-200 dark:border-obsidian-border/70 relative"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold/10 text-gold border border-gold/20 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communication &amp; Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Let's Architect Your Next Project
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
            Have an Odoo ERP requirement, a custom module to engineer, or a modern full-stack web application to build? Get in touch directly.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information Cards (Left) | Validated Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (5 cols): Contact Cards & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with Copy Button */}
            <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold/15 text-gold shrink-0 border border-gold/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-obsidian-muted uppercase tracking-wider">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${contactData.email || 'rajkumarrajaco@gmail.com'}`}
                    className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-gold dark:hover:text-gold transition-colors mt-0.5"
                  >
                    {contactData.email || 'rajkumarrajaco@gmail.com'}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="touch-target p-2.5 rounded-xl bg-slate-100 dark:bg-obsidian-surface hover:bg-gold/20 text-slate-700 dark:text-slate-300 hover:text-gold border border-slate-200 dark:border-obsidian-border transition-all focus-visible:ring-2 focus-visible:ring-gold shrink-0"
                aria-label="Copy email address"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent-cyan/15 text-accent-cyan shrink-0 border border-accent-cyan/30">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 dark:text-obsidian-muted uppercase tracking-wider">
                  Direct Phone / WhatsApp
                </span>
                <a
                  href={`tel:${(contactData.phone || '+91 95147 58427').replace(/[^0-9+]/g, '')}`}
                  className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-accent-cyan transition-colors mt-0.5"
                >
                  {contactData.phone || '+91 95147 58427'}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent-emerald/15 text-accent-emerald shrink-0 border border-accent-emerald/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 dark:text-obsidian-muted uppercase tracking-wider">
                  Location &amp; Hub
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {contactData.location || 'Coimbatore, Tamil Nadu, India'}
                </p>
              </div>
            </div>

            {/* Social & Professional Links */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-obsidian-surface border border-slate-200 dark:border-obsidian-border space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-obsidian-muted font-mono">
                Professional Profiles
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={contactData.linkedinUrl || 'https://www.linkedin.com/in/rajkumarraja06'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-obsidian-card text-slate-800 dark:text-slate-200 hover:text-gold dark:hover:text-gold border border-slate-200 dark:border-obsidian-border hover:border-gold/50 shadow-sm transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={contactData.githubUrl || 'https://github.com/RajkumarRaja06'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-obsidian-card text-slate-800 dark:text-slate-200 hover:text-gold dark:hover:text-gold border border-slate-200 dark:border-obsidian-border hover:border-gold/50 shadow-sm transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repos</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-obsidian-card border border-slate-200 dark:border-obsidian-border shadow-xl">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Fill in your details below to discuss project scopes, timelines, and technical requirements.
                </p>
              </div>

              {/* Accessible Confirmation Status Banner */}
              {submittedSuccess && (
                <div 
                  role="status" 
                  aria-live="polite"
                  className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">Thank you for your message!</p>
                    <p className="mt-0.5 text-slate-700 dark:text-slate-300">
                      Your inquiry has been logged successfully. Rajkumar will review your project details and follow up promptly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-surface border ${
                      errors.name 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-300 dark:border-obsidian-border focus:border-gold focus:ring-gold'
                    } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="e.g. john@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-surface border ${
                      errors.email 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-300 dark:border-obsidian-border focus:border-gold focus:ring-gold'
                    } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Project Details Input */}
                <div>
                  <label htmlFor="contact-details" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Project Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    rows={4}
                    required
                    value={formData.details}
                    onChange={handleChange}
                    onBlur={() => handleBlur('details')}
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? 'details-error' : undefined}
                    placeholder="Describe your Odoo module requirements, workflow automation needs, or web application goals..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-surface border ${
                      errors.details 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-300 dark:border-obsidian-border focus:border-gold focus:ring-gold'
                    } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {touched.details && errors.details && (
                    <p id="details-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="touch-target w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-gold to-gold-amber text-obsidian shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/35 hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
