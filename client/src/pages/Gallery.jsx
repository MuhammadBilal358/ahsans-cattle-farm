const photos = [
  { src: '/gallery/cow1.jpg', caption: 'Black & White — Qurbani Cattle' },
  { src: '/gallery/cow2.jpg', caption: 'Sturdy White — Qurbani Cattle' },
  { src: '/gallery/cow3.jpg', caption: 'Strong Brown — Qurbani Cattle' },
  { src: '/gallery/cow4.jpg', caption: 'Spotted Breed — Qurbani Cattle' },
  { src: '/gallery/gallery1.jpg', caption: 'On the farm' },
  { src: '/gallery/gallery2.jpg', caption: 'On the farm' },
  { src: '/gallery/gallery3.jpg', caption: 'On the farm' },
  { src: '/gallery/gallery4.jpg', caption: 'On the farm' }
];

export default function Gallery() {
  return (
    <>
      <section className="page-hero" style={{ padding: '44px 0' }}>
        <div className="container">
          <div className="crumb">Home / Gallery</div>
          <h1>Farm Gallery</h1>
          <p>A look at some of the healthy, well-conditioned animals currently on the farm.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20
            }}
          >
            {photos.map((p, i) => (
              <figure
                key={i}
                style={{
                  margin: 0,
                  background: 'var(--paper)',
                  border: '1px solid var(--cream-2)',
                  borderRadius: 8,
                  overflow: 'hidden'
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={p.src} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <figcaption style={{ padding: '10px 14px', fontSize: 13.5, color: 'var(--ink-soft)' }}>
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p style={{ marginTop: 30, fontSize: 13.5, color: 'var(--ink-soft)' }}>
            More photos and short video clips of the farm, sheds, and animals will be added here over time.
          </p>
        </div>
      </section>
    </>
  );
}