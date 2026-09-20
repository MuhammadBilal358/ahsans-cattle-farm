export default function DetailModal({ item, allItems, onSelect, onClose }) {
  if (!item) return null;

  const related = allItems.filter((i) => i._id !== item._id).slice(0, 6);

  // Livestock-specific fields, shown first, only when present
  const extraSpecs = [];
  const isLivestock = ['cattle', 'dairy', 'goats'].includes(item.category);
  if (item.tagNumber) extraSpecs.push({ label: 'Tag Number', value: item.tagNumber });
  if (item.ageLabel) extraSpecs.push({ label: 'Age', value: item.ageLabel });
  if (item.weightKg != null) extraSpecs.push({ label: 'Weight', value: `${item.weightKg} kg` });
  if (item.price != null) extraSpecs.push({ label: 'Price', value: `PKR ${item.price.toLocaleString()}` });
  if (isLivestock) extraSpecs.push({ label: 'Status', value: item.available ? 'Available' : 'Sold' });
  const allSpecs = [...extraSpecs, ...(item.specs || [])];

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="detail-modal-media">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <span className="emoji">{item.icon || '🐾'}</span>
          )}
        </div>

        <div className="detail-modal-body">
          {item.tag && <span className="detail-modal-tag">{item.tag}</span>}
          <h3>{item.title}</h3>
          <p className="desc">{item.description}</p>

          <div>
            {allSpecs.map((s, i) => (
              <div className="spec-row" key={i}>
                <span>{s.label}</span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="detail-modal-cta">
            <a href="tel:03073777444" className="btn btn-primary">
              📞 Call Now
            </a>
            <a
              href="https://wa.me/923073777444"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ borderTop: '1px solid var(--cream-2)', padding: '20px 28px 28px' }}>
            <h4 style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.03em' }}>
              You may also like
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10 }}>
              {related.map((r) => (
                <button
                  key={r._id}
                  onClick={() => onSelect(r)}
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--cream-2)',
                    borderRadius: 8,
                    padding: 8,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 5, overflow: 'hidden', background: 'var(--green-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                    {r.image ? (
                      <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 22 }}>{r.icon || '🐾'}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{r.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
