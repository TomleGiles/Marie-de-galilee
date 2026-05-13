// histoire.jsx — Notre histoire · Institution Notre-Dame de la Providence

const { useState, useEffect, useRef } = React;

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); } }),
      { threshold: 0.08 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${rest.className || ""}`} {...rest}>
      {children}
    </Tag>
  );
}

function Arrow() {
  return (
    <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── Nav ──────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="index.html" className="nav-logo" aria-label="Institution Notre-Dame de la Providence">
          <img src="../assets/LP NDP.png" alt="Institution Notre-Dame de la Providence" />
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <a href="index.html#niveaux">Nos niveaux</a>
          <a href="index.html#valeurs">Projet éducatif</a>
          <a href="histoire.html" className="active">Notre histoire</a>
          <a href="actualites.html">Actualités</a>
          <a href="index.html#tarifs">Tarifs</a>
          <button className="nav-cta" onClick={() => { setOpen(false); window.location.href = 'index.html#inscription'; }}>Inscription</button>
        </nav>
        <a href="../index.html" className="nav-back" style={{ marginLeft: 16 }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span>Marie de Galilée</span>
        </a>
        <button className={`nav-burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-content">
        <Reveal>
          <div className="hero-date-badge">Fondée en 1784 · Plus de 240 ans d'histoire</div>
          <h1>Notre <em>histoire</em></h1>
          <p className="lede">
            De la Révolution Française à aujourd'hui, l'Institution Notre-Dame de la Providence
            incarne une continuité éducative rare — portée par des femmes et des hommes de
            conviction, au service de générations d'élèves vosgiens.
          </p>
          <div className="hero-rule"></div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Timeline (1784 & 1817) ────────────────────────────────

function Timeline() {
  return (
    <section className="timeline">
      <div className="timeline-spine"></div>
      <div className="wrap">

        {/* 1784 */}
        <div className="era">
          <div className="era-year">1784</div>
          <div className="era-dot"></div>
          <div className="era-grid">
            <Reveal className="era-text">
              <p className="era-date">1784</p>
              <h2 className="era-title">Les origines</h2>
              <ul className="era-events">
                <li>
                  Le chanoine <strong>RAULIN</strong>, ami du Bienheureux Père{" "}
                  <strong>Jean Martin Moÿe</strong> — fondateur de la congrégation
                  des Sœurs de la Providence — fonde une école à Saint-Dié,
                  faubourg Saint-Martin.
                </li>
                <li>
                  L'école accueille <strong>150 filles</strong> et s'impose rapidement
                  comme un lieu d'instruction et d'éducation chrétienne dans la région.
                </li>
                <li>
                  Elle est <strong>fermée à la Révolution Française</strong>, comme
                  tant d'établissements religieux de l'époque.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="photo-frame">
                <img
                  src="../assets/NDP/Histoire-NP-1.jpg"
                  alt="Salle à Manger — Institution Notre-Dame de la Providence"
                />
                <div className="photo-frame-caption">Salle à Manger</div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 1817 */}
        <div className="era">
          <div className="era-year">1817</div>
          <div className="era-dot"></div>
          <div className="era-grid reverse">
            <Reveal className="era-text">
              <p className="era-date">1817</p>
              <h2 className="era-title">La renaissance</h2>
              <ul className="era-events">
                <li>
                  Réouverture de l'école. <strong>Sœur Victoire</strong> en prend
                  la direction et y consacre un demi-siècle de sa vie, portant
                  l'établissement avec détermination et foi.
                </li>
                <li>
                  L'école compte <strong>130 élèves</strong> et connaît une expansion
                  remarquable : construction d'un <strong>internat</strong> et de la{" "}
                  <strong>chapelle actuelle</strong>, qui marque toujours le cœur de
                  l'institution.
                </li>
                <li>
                  L'établissement s'enracine durablement dans le paysage éducatif
                  de Saint-Dié, porté par la congrégation des Sœurs de la Providence
                  pendant plus de deux siècles.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="photo-frame">
                <img
                  src="../assets/NDP/Histoire-NP-2.jpg"
                  alt="Salle d'Études — Institution Notre-Dame de la Providence"
                />
                <div className="photo-frame-caption">Salle d'Études</div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Milestones contemporains ─────────────────────────────

const MILESTONES = [
  {
    year: "2004",
    label: "Transmission",
    title: "La tutelle confiée à la Direction Diocésaine",
    events: [
      <>
        Après <strong>220 ans de présence</strong>, les Sœurs de la Providence
        confient la tutelle de l'institution à la{" "}
        <strong>Direction Diocésaine de l'Enseignement Catholique</strong>.
      </>,
      <>
        Ce passage de témoin, préparé avec soin, permet à l'établissement de
        poursuivre sa mission éducative tout en s'inscrivant dans le réseau
        diocésain — sans tutelle directement congréganiste, comme le requiert
        le cadre canonique.
      </>,
    ],
  },
  {
    year: "2013",
    label: "1ᵉʳ janvier",
    title: "Naissance de l'ensemble du Val de Galilée",
    events: [
      <>
        Les établissements Diocésains du bassin de Saint-Dié — l'
        <strong>École Sainte-Thérèse de Raon-l'Étape</strong>, l'
        <strong>Institution Notre-Dame de la Providence</strong> et le{" "}
        <strong>Lycée Beau-Jardin</strong> — fusionnent pour former un seul
        ensemble scolaire : l'<strong>ensemble scolaire du Val de Galilée</strong>.
      </>,
      <>
        Cette union permet de mutualiser les ressources, de renforcer la
        cohérence pédagogique et d'offrir aux familles un parcours scolaire
        continu de la maternelle au BTS.
      </>,
    ],
  },
  {
    year: "2018",
    label: "1ᵉʳ janvier",
    title: "La naissance de Marie de Galilée",
    events: [
      <>
        Les établissements de l'OGEC du Val de Galilée et l'
        <strong>Institution Sainte-Marie</strong> (Saint-Dié-des-Vosges) ont
        fusionné pour ne créer qu'un seul ensemble scolaire :{" "}
        <strong>MARIE DE GALILÉE</strong>.
      </>,
      <>
        Quatre établissements, une même ambition. Cet ensemble réunit désormais
        environ <strong>800 élèves</strong>, de la maternelle au BTS, dans les
        Vosges — portés par une identité catholique commune et un projet
        éducatif partagé.
      </>,
    ],
  },
];

function Milestones() {
  return (
    <section className="milestones">
      <div className="wrap">
        <Reveal className="milestones-head">
          <span className="eyebrow">Vers le présent</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>
            Des rapprochements <em style={{ color: "var(--accent)", fontStyle: "italic" }}>au service des familles</em>.
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "56ch", margin: "16px auto 0" }}>
            À partir du début du XXIᵉ siècle, les établissements catholiques du bassin
            de Saint-Dié s'unissent progressivement pour former un ensemble cohérent
            et plus fort.
          </p>
        </Reveal>
        <div className="milestones-flow">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 120} className="milestone">
              <div className="milestone-year-col">
                <div className="milestone-year">
                  {m.year}
                  <small>{m.label}</small>
                </div>
              </div>
              <div className="milestone-body">
                <h3>{m.title}</h3>
                {m.events.map((ev, j) => <p key={j}>{ev}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Quote ────────────────────────────────────────────────

function Quote() {
  return (
    <Reveal>
      <section style={{
        padding: "96px 0",
        background: "var(--accent-dark)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(70% 60% at 80% 0%, rgba(200,169,110,.12), transparent 70%)",
        }} />
        <div className="wrap" style={{ textAlign: "center", maxWidth: 800, position: "relative" }}>
          <svg width="52" height="38" viewBox="0 0 52 38" fill="none" style={{ marginBottom: 24, display: "block", margin: "0 auto 24px" }}>
            <path d="M0 38V22C0 9.8 6.4 2.8 19.2 0l2.4 4C14.4 5.6 10.4 9.6 9.6 16H20V38H0zM32 38V22C32 9.8 38.4 2.8 51.2 0l2.4 4C46.4 5.6 42.4 9.6 41.6 16H52V38H32z" fill="rgba(200,169,110,.35)"/>
          </svg>
          <blockquote style={{
            fontFamily: "var(--serif)", fontSize: "clamp(22px,2.8vw,32px)",
            fontWeight: 400, fontStyle: "italic", color: "var(--ivory)",
            lineHeight: 1.4, margin: "0 0 32px", letterSpacing: "-.005em",
          }}>
            L'école, bien plus qu'un lieu d'instruction, est une maison où
            chaque enfant est accueilli pour qui il est et accompagné pour
            ce qu'il peut devenir.
          </blockquote>
          <cite style={{ fontStyle: "normal", fontFamily: "var(--sans)", fontSize: 13, color: "rgba(250,247,242,.6)", letterSpacing: ".06em", textTransform: "uppercase" }}>
            Esprit de la fondation · 1784
          </cite>
        </div>
      </section>
    </Reveal>
  );
}

// ── Back CTA ─────────────────────────────────────────────

function BackCTA() {
  return (
    <section className="back-cta">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Notre institution aujourd'hui</span>
          <h2>
            Plus de 240 ans d'histoire,<br />
            <em>au service de votre enfant</em>.
          </h2>
          <p>
            Découvrez nos niveaux, nos tarifs et comment inscrire votre enfant
            pour la rentrée 2026 — 2027.
          </p>
          <div className="actions">
            <a href="index.html" className="btn btn-violet">
              <BackArrow /> Retour à l'institution
            </a>
            <a href="index.html#niveaux" className="btn btn-ghost">
              Nos niveaux <Arrow />
            </a>
            <a href="index.html#tarifs" className="btn btn-ghost">
              Tarifs &amp; inscriptions <Arrow />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer strip ─────────────────────────────────────────

function FooterStrip() {
  return (
    <footer className="footer-strip">
      <div className="wrap footer-strip-inner">
        <span>© 2026 Institution Notre-Dame de la Providence — Ensemble scolaire Marie de Galilée</span>
        <nav className="footer-strip-links" aria-label="Liens rapides">
          <a href="index.html">
            <BackArrow /> Notre-Dame de la Providence
          </a>
          <a href="../index.html">Marie de Galilée</a>
        </nav>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Timeline />
        <Milestones />
        <Quote />
        <BackCTA />
      </main>
      <FooterStrip />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
