export default function AboutUs() {
  return (
    <>
      <section className="page-hero" style={{ padding: '44px 0' }}>
        <div className="container">
          <div className="crumb">Home / About Us</div>
          <h1>About Ahsan&rsquo;s Cattle Farm</h1>
          <p>Our story, how we care for our animals, and what we stand for.</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="section-head">
            <span className="eyebrow">Our Story</span>
            <h2>Farm Story &amp; Mission</h2>
            <p>
              Ahsan&rsquo;s Cattle Farm started as a small family effort to raise healthy,
              well-cared-for livestock for the local community, especially around
              Eid-ul-Adha. Over time it grew into a full farm covering Qurbani cattle,
              dairy animals, goats and sheep, farm-fresh dairy products, and feed
              &amp; fodder for other farmers.
            </p>
            <p>
              Our mission is simple: raise every animal the way we&rsquo;d want one raised
              for our own family — proper feed, clean housing, and regular veterinary
              care — and offer honest, fair-priced service to every customer who visits
              the farm.
            </p>
          </div>

          <div className="section-head">
            <span className="eyebrow">How We Work</span>
            <h2>Hygiene &amp; Standards</h2>
            <p>We follow the same daily routine for every animal on the farm:</p>
            <ul style={{ color: 'var(--ink-soft)', lineHeight: 2, paddingLeft: 20 }}>
              <li>Open, well-ventilated sheds that are cleaned daily</li>
              <li>A balanced diet of green fodder (chara), dry roughage (bhoosa), and concentrated feed (vanda)</li>
              <li>Fresh, clean drinking water available at all times</li>
              <li>Regular deworming and a standard vaccination schedule for every animal</li>
              <li>Separate handling for newly arrived animals until they're health-checked</li>
            </ul>
          </div>

          <div className="section-head">
            <span className="eyebrow">Health &amp; Care</span>
            <h2>Veterinary Care</h2>
            <p>
              Every animal on the farm goes through regular health checkups and follows
              a standard vaccination schedule under veterinary guidance. If you&rsquo;d like
              to see an animal&rsquo;s vaccination and health record before buying, just ask
              us when you visit or call.
            </p>
          </div>

          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Our Commitment</span>
            <h2>What We Stand For</h2>
            <div className="card-grid" style={{ marginTop: 20 }}>
              <div className="item-card" style={{ textAlign: 'center', padding: '26px 16px', cursor: 'default' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🧼</div>
                <h3>Hygienic Practices</h3>
                <p>Clean sheds and equipment, every single day.</p>
              </div>
              <div className="item-card" style={{ textAlign: 'center', padding: '26px 16px', cursor: 'default' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>💉</div>
                <h3>Health-Checked Animals</h3>
                <p>Regular vet visits and a standard vaccination schedule.</p>
              </div>
              <div className="item-card" style={{ textAlign: 'center', padding: '26px 16px', cursor: 'default' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🤝</div>
                <h3>Honest Pricing</h3>
                <p>Fair prices, no hidden charges, no pressure.</p>
              </div>
            </div>
            <p style={{ marginTop: 20, fontSize: 13.5, color: 'var(--ink-soft)' }}>
              If the farm holds any official registration or certification (e.g. from the
              local livestock department), add the details or a photo of the certificate
              here — ask to have this section updated once you have it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}