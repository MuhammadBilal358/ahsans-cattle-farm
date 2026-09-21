import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import ItemCard from '../components/ItemCard';
import DetailModal from '../components/DetailModal';

const META = {
  cattle: {
    title: 'Qurbani Cattle',
    intro: 'Every animal is distinct in breed, health and build — come see them at the farm today.'
  },
  dairy: {
    title: 'Dairy Animals',
    intro: "Improved, well-bred milk animals — the best of Pakistan's native breeds alongside select imported bloodlines."
  },
  goats: {
    title: 'Goats & Sheep',
    intro: 'From compact dairy breeds to large Qurbani goats and sheep, we keep a range of well-known breeds on the farm.'
  },
  feed: {
    title: 'Feed & Fodder',
    intro: 'Fresh green fodder, dry straw, concentrated feed and mineral supplements for your own animals at home.'
  },
  milk: {
    title: 'Dairy Products',
    intro: 'Fresh milk, ghee, butter, paneer, dahi and khoya — made from our own farm milk.'
  },
  services: {
    title: 'Services',
    intro: 'Beyond selling animals, we also offer fattening, breeding, consultancy and delivery services.'
  }
};

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | available | sold

  const meta = META[category];
  const isLivestock = ['cattle', 'dairy', 'goats'].includes(category);

  useEffect(() => {
    // Unknown category in the URL (e.g. /animals/xyz) — don't call the API at all
    if (!META[category]) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    setActive(null);
    setSearch('');
    setStatusFilter('all');
    api
      .get('/api/animals', { params: { category } })
      .then((res) => setItems(res.data))
      .catch(() =>
        setError('Could not load this page right now. Make sure the API server is running and connected to MongoDB.')
      )
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = items.filter((item) => {
    if (statusFilter === 'available' && !item.available) return false;
    if (statusFilter === 'sold' && item.available) return false;
    if (search.trim() && !item.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  if (!meta) {
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        <h2>Page not found</h2>
        <p style={{ marginTop: 10 }}>
          That category doesn&rsquo;t exist. <Link to="/">Go back to the home page</Link>.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero" style={{ padding: '44px 0' }}>
        <div className="container">
          <div className="crumb">Home / {meta.title}</div>
          <h1>{meta.title}</h1>
          <p>{meta.intro}</p>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <p>Loading…</p>}

          {error && <div className="form-error">{error}</div>}

          {!loading && !error && items.length === 0 && (
            <div className="empty-state">
              Nothing listed here right now. Please <Link to="/contact">contact us</Link> or call
              0307-3777444 to ask about current stock.
            </div>
          )}

          {!loading && items.length > 0 && (
            <>
              {isLivestock && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  <input
                    type="text"
                    placeholder="Search by breed name…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      padding: '10px 14px', border: '1px solid var(--cream-2)', borderRadius: 6,
                      fontFamily: 'inherit', fontSize: 14, minWidth: 220
                    }}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: '10px 14px', border: '1px solid var(--cream-2)', borderRadius: 6,
                      fontFamily: 'inherit', fontSize: 14
                    }}
                  >
                    <option value="all">All</option>
                    <option value="available">Available only</option>
                    <option value="sold">Sold only</option>
                  </select>
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="empty-state">No results match your search/filter.</div>
              ) : (
                <div className="card-grid">
                  {filtered.map((item) => (
                    <ItemCard key={item._id} item={item} onClick={setActive} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <DetailModal item={active} allItems={items} onSelect={setActive} onClose={() => setActive(null)} />
    </>
  );
}
