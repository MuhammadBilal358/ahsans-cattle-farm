import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import InquiriesPanel from '../components/InquiriesPanel';

const CATEGORIES = [
  { value: 'cattle', label: 'Qurbani Cattle' },
  { value: 'dairy', label: 'Dairy Animals' },
  { value: 'goats', label: 'Goats & Sheep' },
  { value: 'feed', label: 'Feed & Fodder' },
  { value: 'milk', label: 'Dairy Products' },
  { value: 'services', label: 'Services' }
];

const EMPTY_FORM = {
  _id: null,
  title: '',
  category: 'cattle',
  tag: '',
  description: '',
  icon: '🐾',
  image: '',
  origin: '',
  order: 0,
  available: true,
  tagNumber: '',
  ageLabel: '',
  weightKg: '',
  price: '',
  specs: []
};

export default function AdminDashboard() {
  const { username } = useAuth();
  const [view, setView] = useState('listings');
  const [activeCategory, setActiveCategory] = useState('cattle');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function loadItems() {
    setLoading(true);
    setError('');
    api
      .get('/api/animals', { params: { category: activeCategory } })
      .then((res) => setItems(res.data))
      .catch(() => setError('Could not load listings.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadItems();
  }, [activeCategory]);

  function openNewForm() {
    setForm({ ...EMPTY_FORM, category: activeCategory });
    setShowForm(true);
  }

  function openEditForm(item) {
    setForm({
      ...item,
      specs: item.specs || [],
      weightKg: item.weightKg == null ? '' : item.weightKg,
      price: item.price == null ? '' : item.price,
      tagNumber: item.tagNumber || '',
      ageLabel: item.ageLabel || ''
    });
    setShowForm(true);
  }

  function updateSpec(index, field, value) {
    const next = [...form.specs];
    next[index] = { ...next[index], [field]: value };
    setForm({ ...form, specs: next });
  }

  function addSpecRow() {
    setForm({ ...form, specs: [...form.specs, { label: '', value: '' }] });
  }

  function removeSpecRow(index) {
    setForm({ ...form, specs: form.specs.filter((_, i) => i !== index) });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api.post('/api/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm((f) => ({ ...f, image: res.data.path }));
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      delete payload._id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;
      payload.weightKg = form.weightKg === '' ? null : Number(form.weightKg);
      payload.price = form.price === '' ? null : Number(form.price);

      if (form._id) {
        await api.put(`/api/animals/${form._id}`, payload);
      } else {
        await api.post('/api/animals', payload);
      }
      setShowForm(false);
      loadItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this listing.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/api/animals/${item._id}`);
      loadItems();
    } catch {
      setError('Could not delete this listing.');
    }
  }

  return (
    <section>
      <div className="container">
        <div className="admin-topbar">
          <div>
            <h2 style={{ marginBottom: 4 }}>Admin Dashboard</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>Logged in as {username}</p>
          </div>
          {view === 'listings' && (
            <button className="btn btn-primary" onClick={openNewForm}>
              + Add Listing
            </button>
          )}
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="admin-tabs">
          <button
            className={`admin-tab ${view === 'listings' ? 'active' : ''}`}
            onClick={() => setView('listings')}
            style={{ fontWeight: 700 }}
          >
            Listings
          </button>
          <button
            className={`admin-tab ${view === 'inquiries' ? 'active' : ''}`}
            onClick={() => setView('inquiries')}
            style={{ fontWeight: 700 }}
          >
            Customer Messages
          </button>
        </div>

        {view === 'inquiries' ? (
          <InquiriesPanel />
        ) : (
          <>
            <div className="admin-tabs">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  className={`admin-tab ${activeCategory === c.value ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : items.length === 0 ? (
              <div className="empty-state">Nothing in this category yet. Click "Add Listing" to create one.</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Title</th>
                    <th>Tag</th>
                    <th>Available</th>
                    <th>Order</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.image ? (
                          <img src={item.image} alt={item.title} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6 }} />
                        ) : (
                          <span style={{ fontSize: 22 }}>{item.icon}</span>
                        )}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.tag}</td>
                      <td>{item.available ? 'Yes' : 'No'}</td>
                      <td>{item.order}</td>
                      <td>
                        <div className="row-actions">
                          <button className="edit" onClick={() => openEditForm(item)}>Edit</button>
                          <button className="del" onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {showForm && (
              <div className="detail-modal-overlay" onClick={() => setShowForm(false)}>
                <div className="detail-modal-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
                  <button className="detail-modal-close" onClick={() => setShowForm(false)} aria-label="Close">
                    x
                  </button>
                  <div style={{ padding: 30 }}>
                    <h3 style={{ marginBottom: 20 }}>{form._id ? 'Edit Listing' : 'New Listing'}</h3>

                    <form onSubmit={handleSave}>
                      <div className="admin-form-grid">
                        <div className="field">
                          <label>Title</label>
                          <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="field">
                          <label>Category</label>
                          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            {CATEGORIES.map((c) => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field">
                          <label>Tag (small label shown on the card)</label>
                          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
                        </div>
                        <div className="field">
                          <label>Origin (optional)</label>
                          <input value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
                        </div>

                        <div className="field">
                          <label>Tag Number (optional)</label>
                          <input value={form.tagNumber} onChange={(e) => setForm({ ...form, tagNumber: e.target.value })} placeholder="e.g. A-102" />
                        </div>
                        <div className="field">
                          <label>Age (optional)</label>
                          <input value={form.ageLabel} onChange={(e) => setForm({ ...form, ageLabel: e.target.value })} placeholder="e.g. 2 years" />
                        </div>
                        <div className="field">
                          <label>Weight in kg (optional)</label>
                          <input type="number" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
                        </div>
                        <div className="field">
                          <label>Price in PKR (optional)</label>
                          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        </div>
                        <div className="field full">
                          <label>Description</label>
                          <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                          />
                        </div>

                        <div className="field">
                          <label>Icon (emoji shown until a photo is uploaded)</label>
                          <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                        </div>
                        <div className="field">
                          <label>Display order (lower shows first)</label>
                          <input
                            type="number"
                            value={form.order}
                            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                          />
                        </div>

                        <div className="field full">
                          <label>Photo</label>
                          <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                          {uploading && <p style={{ fontSize: 13, marginTop: 6 }}>Uploading...</p>}
                          {form.image && (
                            <img
                              src={form.image}
                              alt="Preview"
                              style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 6, marginTop: 10 }}
                            />
                          )}
                        </div>

                        <div className="field full">
                          <label>Specs (shown as rows in the detail popup)</label>
                          {form.specs.map((s, i) => (
                            <div className="spec-editor-row" key={i}>
                              <input
                                placeholder="Label (e.g. Build)"
                                value={s.label}
                                onChange={(e) => updateSpec(i, 'label', e.target.value)}
                              />
                              <input
                                placeholder="Value"
                                value={s.value}
                                onChange={(e) => updateSpec(i, 'value', e.target.value)}
                              />
                              <button type="button" onClick={() => removeSpecRow(i)} aria-label="Remove spec">
                                x
                              </button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-ghost" style={{ marginTop: 6 }} onClick={addSpecRow}>
                            + Add spec row
                          </button>
                        </div>

                        <div className="field">
                          <label>
                            <input
                              type="checkbox"
                              checked={form.available}
                              onChange={(e) => setForm({ ...form, available: e.target.checked })}
                              style={{ width: 'auto', marginRight: 8 }}
                            />
                            Available (untick to mark as Sold / out of stock)
                          </label>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                          {saving ? 'Saving...' : 'Save Listing'}
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}