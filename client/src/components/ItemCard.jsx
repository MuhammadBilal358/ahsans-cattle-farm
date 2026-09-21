export default function ItemCard({ item, onClick }) {
  return (
    <div className="item-card" onClick={() => onClick(item)} style={{ position: 'relative' }}>
      <div className="thumb">
        {item.image ? (
          <img src={item.image} alt={item.title} />
        ) : (
          <span className="emoji">{item.icon || '🐾'}</span>
        )}
        {!item.available && (
          <span style={{
            position: 'absolute', top: 10, right: 10, background: 'var(--maroon)', color: '#fff',
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999
          }}>
            {['cattle', 'dairy', 'goats'].includes(item.category) ? 'SOLD' : 'OUT OF STOCK'}
          </span>
        )}
      </div>
      <div className="body">
        {item.origin && <span className="origin-tag">{item.origin}</span>}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.price != null && (
          <p style={{ marginTop: 8, fontWeight: 700, color: 'var(--green-deep)' }}>
            PKR {item.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
