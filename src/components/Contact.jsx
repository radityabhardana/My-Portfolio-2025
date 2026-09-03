import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { BiEnvelope } from 'react-icons/bi';
import './Contact.css';

// EmailJS configuration (set in .env.local for Vite):
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
// Optional: template used to send an automated acknowledgement back to the user
// Set VITE_EMAILJS_AUTO_TEMPLATE_ID in .env.local if you want an auto-reply sent
const AUTO_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_TEMPLATE_ID || ''; 

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [error, setError] = useState('');
  const [autoReplyStatus, setAutoReplyStatus] = useState(null);
  const isSending = status === 'sending';

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, []);

  // Helper: ensure a hidden input with `name` exists on the form and set its value
  const ensureHiddenInput = (formEl, name, value) => {
    if (!formEl) return;
    let el = formEl.querySelector(`input[name="${name}"]`);
    if (el) {
      el.value = value;
    } else {
      const i = document.createElement('input');
      i.type = 'hidden';
      i.name = name;
      i.value = value;
      formEl.appendChild(i);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError(''); 

    try {
      if (!SERVICE_ID || !TEMPLATE_ID) {
        setError('Message sending is temporarily unavailable. Please use the email address listed in the contact information.');
        setStatus('error');
        return;
      }

      // Read form field values so we can populate reply_to/subject and optionally send an auto-reply
      const formEl = formRef.current;
      const fd = new FormData(formEl);
      const fromName = (fd.get('from_name') || '').toString();
      const fromEmail = (fd.get('from_email') || '').toString();

      // Ensure template can access reply_to and subject fields
      ensureHiddenInput(formEl, 'reply_to', fromEmail);
      ensureHiddenInput(formEl, 'subject', `New message from ${fromName || 'Visitor'}`);

      const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl);

      if (result.status === 200) {
        // Optional: send an automated acknowledgement back to the user if configured
        if (AUTO_TEMPLATE_ID && fromEmail) {
          try {
            // Send variables matching typical EmailJS auto-reply templates
            const autoRes = await emailjs.send(SERVICE_ID, AUTO_TEMPLATE_ID, {
              from_email: fromEmail,
              name: fromName || 'Visitor',
              title: (fd.get('subject') || `Message from ${fromName}`),
              message: (fd.get('message') || '')
            });
            console.info('Auto-reply sent:', autoRes);
            if (import.meta.env.DEV) setAutoReplyStatus('sent');
          } catch (autoErr) {
            console.error('Auto-reply failed:', autoErr);
            if (import.meta.env.DEV) setAutoReplyStatus(`failed: ${autoErr && (autoErr.text || autoErr.message) ? (autoErr.text || autoErr.message) : 'unknown'}`);
          }
        }

        setStatus('success');
        formEl.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setError('Failed to send message. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id='contact'>
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%', boxSizing: 'border-box', padding: '0', overflow: 'hidden' }}>
        {/* Header */}
        <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '55px' }}>
          <div className="section-icon" style={{
            width: '61.6px',
            height: '61.6px',
            border: '1px solid rgba(82, 39, 255, 0.18)',
            borderRadius: '15.4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(82, 39, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            fontSize: '26.4px'
          }}>
            <BiEnvelope size={28} />
          </div>
          <h2 className="section-title" style={{
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2.75rem',
            fontWeight: 700,
            margin: 0
          }}>
Get In Touch
            </h2>
        </div>

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 300,
          marginBottom: '25px',
          lineHeight: '1.6'
        }}>
          Have a question or want to work together? I'd love to hear from you.
        </p>

        {/* Contact Container */}
        <div className="contact-grid" style={{ 
          display: 'grid', 
          alignItems: 'start',
          width: '100%'
        }}>
          {/* Contact Info */}
          <div className="contact-info">
            <h3 style={{
              color: 'white',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '13px',
              marginTop: '-13px'
            }}>
              Contact Information
            </h3>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <a href="mailto:rexnabagus@gmail.com">rexnabagus@gmail.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="contact-text">
                <h4>Phone</h4>
                <a href="tel:+628892274986">+62 889-2274-986</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Indonesia</p>
              </div>
            </div>

            {/* Social Links (desktop) */}
            <div className="follow-desktop" style={{ marginTop: '10px', paddingTop: '13px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.99rem',
                fontWeight: 500,
                margin: '0 0 6.5px 0'
              }}>
                Follow Me
              </p>
              <div style={{ display: 'flex', gap: '16.5px' }}>
                <a href="https://www.linkedin.com/in/raditya-hardana-962373382/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/radityabhardana" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-github"></i>
                </a>
               
                <a href="https://www.instagram.com/zxlyn_16/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://wa.me/628892274986" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
            <p className="contact-copyright">© 2025 Raditya Bagus Hardana</p>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="from_name">Full Name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="from_email">Email Address</label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Subject Input */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me more about your project or inquiry..."
                rows="6"
                required
              ></textarea>
            </div>

            {/* Status Messages */}
            {isSending && (
              <div role="status" aria-live="polite" className="alert alert-info">
                <span className="spinner" aria-hidden="true"></span>
                <span>Sending your message...</span>
              </div>
            )}

            {status === 'success' && (
              <div role="status" aria-live="polite" className="alert alert-success">
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                <span>Message sent successfully! I'll be in touch soon.</span>
              </div>
            )}

            {status === 'error' && error && (
              <div role="alert" className="alert alert-error">
                <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill" aria-hidden="true"></i>
                  <span>Send Message</span>
                </>
              )}
            </button>

            <p style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.85rem',
              textAlign: 'center',
              marginTop: '16.5px'
            }}>
              I respect your privacy. Your data won't be shared.
            </p>

            {/* Follow Me (mobile-only) */}
            <div className="follow-mobile" style={{ marginTop: '18px', paddingTop: '13px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="follow-title" style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.99rem',
                fontWeight: 500,
                margin: '0 0 6.5px 0'
              }}>Follow Me</p>
              <div className="follow-links" style={{ display: 'flex', gap: '16.5px' }}>
                <a href="https://www.linkedin.com/in/raditya-hardana-962373382/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/radityabhardana" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-github"></i>
                </a>
                <a href="https://www.instagram.com/zxlyn_16/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://wa.me/628892274986" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>

            <p className="contact-copyright mobile">© 2025 Raditya Bagus Hardana</p>
          </form>  
        </div>
      </div>
    </section>
  );
}
