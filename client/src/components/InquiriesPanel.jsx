import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function InquiriesPanel() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api
      .get('/api/inquiries')
      .then((res) => setInquiries(res.data))
      .catch(() => setError('Could not load inquiries.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleHandled(inq) {
    try {
      await api.put(`/api/inquiries/${inq._id}`, { handled: !inq.handled });
      load();
    } catch {
      setError('Could not update this inquiry.');
    }
  }

  async function remove(inq) {
    if (!window.confirm(`Delete the message from "${inq.name}"?`)) return;
    try {
      await api.delete(`/api/inquiries/${inq._id}`);
      load();
    } catch {
      setError('Could not delete this inquiry.');
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <div className="form-error">{error}</div>;
  if (inquiries.length === 0) return <div className="empty-state">No messages yet — they'll show up here when a customer uses the Contact form.</div>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Received</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inq) => (
          <tr key={inq._id}>
            <td>{inq.name}</td>
            <td><a href={`tel:${inq.phone}`}>{inq.phone}</a></td>
            <td style={{ maxWidth: 280 }}>{inq.message}</td>
            <td>{new Date(inq.createdAt).toLocaleString()}</td>
            <td>{inq.handled ? 'Handled' : 'New'}</td>
            <td>
              <div className="row-actions">
                <button className="edit" onClick={() => toggleHandled(inq)}>
                  Mark {inq.handled ? 'New' : 'Handled'}
                </button>
                <button className="del" onClick={() => remove(inq)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}