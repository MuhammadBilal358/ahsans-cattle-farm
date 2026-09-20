import { useState } from 'react';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.post('/api/inquiries', form);
      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Could not send your message. Please try calling or WhatsApp instead.');
    }
  }

  return (
    <>
      <section className="page-hero" style={{ padding: '44px 0' }}>
        <div className="container">
          <div className="crumb">Home / Contact</div>
          <h1>Get In Touch</h1>
          <p>Call, message on WhatsApp, or visit the farm in person.</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="contact-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>

            <div className="contact-card">
              <div>
                <strong>Phone</strong>
                <p className="phone"><a href="tel:03073777444">0307-3777444</a></p>
              </div>
              <div>
                <strong>WhatsApp</strong>
                <p><a href="https://wa.me/923073777444" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
              </div>
              <div>
                <strong>Location</strong>
                <p>Dera Adnan Abbasi, Thurr Mehr Khan, Talagang, District Chakwal</p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="tel:03073777444" className="btn btn-primary">Call Now</a>
                <a href="https://wa.me/923073777444" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>WhatsApp</a>
              </div>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--cream-2)', borderRadius: 8, padding: 30 }}>
              <h3 style={{ marginBottom: 16 }}>Send Us a Message</h3>

              {status === 'sent' && <div className="form-success">Thank you, we will get back to you soon.</div>}
              {status === 'error' && <div className="form-error">{errorMsg}</div>}

              {status !== 'sent' && (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label>Your Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}