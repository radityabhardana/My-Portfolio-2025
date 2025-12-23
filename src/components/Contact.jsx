import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key

export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your service ID
        'YOUR_TEMPLATE_ID', // Replace with your template ID
        formRef.current,
        'YOUR_PUBLIC_KEY' // Replace with your public key
      );

      if (result.status === 200) {
        setSuccess(true);
        formRef.current.reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('EmailJS error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      style={{
        width: '100%',
        height: window && window.innerWidth < 900 ? 'auto' : '100vh',
        // remove heavy gradient on mobile for better legibility
        background: (typeof window !== 'undefined' && window.innerWidth < 900) ? 'transparent' : 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: window && window.innerWidth < 900 ? '40px 20px 80px' : '0 35.2px',
      }} 
      id='contact'
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '55px' }}>
          <div className="section-icon" style={{
            width: '61.6px',
            height: '61.6px',
            background: (typeof window !== 'undefined' && window.innerWidth < 900) ? 'transparent' : 'linear-gradient(135deg, rgba(82, 39, 255, 0.2), rgba(157, 78, 221, 0.2))',
            border: '1px solid rgba(82, 39, 255, 0.3)',
            borderRadius: '15.4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(82, 39, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            fontSize: '26.4px'
          }}>
            ✉️
          </div>
          <h1 className="section-title" style={{
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2.75rem',
            fontWeight: 700,
            margin: 0
          }}>
            Get In Touch
          </h1>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
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

            {/* Social Links */}
            <div style={{ marginTop: '10px', paddingTop: '13px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
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
                  <i class="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
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
            {success && (
              <div className="alert alert-success">
                <i className="bi bi-check-circle-fill"></i>
                <span>Message sent successfully! I'll be in touch soon.</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill"></i>
                  Send Message
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
          </form>
        </div>
      </div>
    </section>
  );
}
