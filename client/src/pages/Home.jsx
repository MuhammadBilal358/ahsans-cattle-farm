import { Link } from 'react-router-dom';

const links = [
  { to: '/animals/cattle', emoji: '🐂', image: '/gallery/cow1.jpg', label: 'Qurbani Cattle', sub: 'See animals' },
  { to: '/animals/dairy', emoji: '🐄', image: '/gallery/icon-dairy.svg', label: 'Dairy Animals', sub: 'Local & imported breeds' },
  { to: '/animals/goats', emoji: '🐐', image: '/gallery/icon-goats.svg', label: 'Goats & Sheep', sub: 'Qurbani & dairy breeds' },
  { to: '/animals/feed', emoji: '🌾', image: '/gallery/icon-feed.svg', label: 'Feed & Fodder', sub: 'Order for your animals' },
  { to: '/animals/milk', emoji: '🥛', image: '/gallery/icon-products.svg', label: 'Dairy Products', sub: 'Milk, ghee, paneer & more' },
  { to: '/animals/services', emoji: '🛠️', image: '/gallery/icon-services.svg', label: 'Services', sub: 'Fattening, breeding & more' }
];

const highlights = [
  { emoji: '🥛', title: 'Pure, Unadulterated Milk', desc: 'Straight from our own animals, no additives.' },
  { emoji: '🌱', title: 'Organic Green Fodder', desc: 'Fresh-cut chara grown and fed on the farm.' },
  { emoji: '💉', title: 'Fully Vaccinated Animals', desc: 'Every animal gets regular veterinary checkups.' },
  { emoji: '🧹', title: 'Hygienic, Open Sheds', desc: 'Clean housing with proper space and airflow.' }
];

export default function Home() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Ahsan&rsquo;s Cattle Farm</h1>
          <p>
            Beautiful, healthy and well-bred Qurbani animals — trust, quality and dedicated care
            are our hallmark. Also home to dairy animals, goats, fresh milk and farm feed.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
            <a href="tel:03073777444" className="btn btn-primary">📞 Call Now</a>
            <a
              href="https://wa.me/923073777444"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Everything From The Farm</span>
            <h2>More Than Just Qurbani Cattle</h2>
            <p>Browse dairy animals, goats, farm-fresh milk and animal feed &amp; fodder — all in one place.</p>
          </div>

          <div className="card-grid">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="item-card" style={{ textAlign: 'center', padding: '30px 16px' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{l.emoji}</div>
                <h3>{l.label}</h3>
                <p>{l.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--green-deep)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: 'var(--brass-bright)' }}>Farm Highlights</span>
            <h2 style={{ color: 'var(--cream)' }}>Why Families Trust Us</h2>
          </div>
          <div className="card-grid">
            {highlights.map((h) => (
              <div key={h.title} className="item-card" style={{ textAlign: 'center', padding: '28px 16px', cursor: 'default', background: 'rgba(244,236,216,.06)', borderColor: 'rgba(201,162,39,.3)' }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>{h.emoji}</div>
                <h3 style={{ color: 'var(--cream)' }}>{h.title}</h3>
                <p style={{ color: 'var(--cream-2)' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
