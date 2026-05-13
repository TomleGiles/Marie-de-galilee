// actualites.jsx — Actualités · Institution Notre-Dame de la Providence

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

// ── Données ───────────────────────────────────────────────

const ARTICLES = [
  {
    id: 1,
    category: "inscriptions",
    categoryLabel: "Inscriptions",
    date: "2026-04-15",
    dateLabel: "15 avril 2026",
    featured: true,
    title: "Inscriptions 2026 — 2027 : les dossiers sont ouverts",
    excerpt:
      "La campagne d'inscriptions pour la rentrée prochaine est lancée. Familles des futurs élèves de l'école, du collège ou du lycée professionnel : contactez dès à présent le secrétariat pour convenir d'un rendez-vous avec le chef d'établissement et organiser une visite.",
    img: "https://images.pexels.com/photos/8471939/pexels-photo-8471939.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 2,
    category: "resultats",
    categoryLabel: "Résultats",
    date: "2025-07-08",
    dateLabel: "8 juillet 2025",
    featured: false,
    title: "Bac Pro 2025 : 94 % de réussite pour nos lycéens",
    excerpt:
      "Les élèves du lycée professionnel ont brillé cette année avec un taux de réussite de 94 % au baccalauréat professionnel, toutes filières confondues. Félicitations à toutes les promotions 2025 et à leurs enseignants.",
    img: "https://images.pexels.com/photos/8617970/pexels-photo-8617970.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    category: "evenements",
    categoryLabel: "Événements",
    date: "2026-01-18",
    dateLabel: "18 janvier 2026",
    featured: false,
    title: "Journée Portes Ouvertes — compte-rendu",
    excerpt:
      "Plus de 150 familles ont franchi les portes de l'institution lors de notre journée d'accueil du 18 janvier. Rencontres avec les équipes pédagogiques, visite des ateliers et de la chapelle : un moment chaleureux et riche d'échanges.",
    img: "https://images.pexels.com/photos/8466783/pexels-photo-8466783.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    category: "vie",
    categoryLabel: "Vie scolaire",
    date: "2025-05-20",
    dateLabel: "20 mai 2025",
    featured: false,
    title: "Voyage à Rome pour les élèves de Terminale Pro",
    excerpt:
      "Cinq jours à Rome pour les élèves de Terminale Bac Pro. Au programme : visite du Vatican, des forums antiques et rencontres avec des entreprises italiennes partenaires. Un voyage qui allie culture, foi et découverte professionnelle.",
    img: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    category: "vie",
    categoryLabel: "Vie scolaire",
    date: "2025-03-14",
    dateLabel: "14 mars 2025",
    featured: false,
    title: "Forum des métiers : les 3ème à la découverte de l'avenir",
    excerpt:
      "Vingt-deux professionnels locaux sont intervenus dans nos classes de 3ème pour présenter leur parcours et leur métier. Une matinée d'échanges précieuse pour aider nos collégiens à construire leur projet d'orientation.",
    img: "https://images.pexels.com/photos/5676667/pexels-photo-5676667.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    category: "evenements",
    categoryLabel: "Événements",
    date: "2025-06-28",
    dateLabel: "28 juin 2025",
    featured: false,
    title: "Fête de fin d'année : une journée inoubliable",
    excerpt:
      "Toute la communauté éducative s'est retrouvée pour célébrer la fin de l'année scolaire. Spectacles des élèves, remise des prix, messe d'action de grâce et pique-nique partagé — une journée qui résume bien l'esprit de la Providence.",
    img: "https://images.pexels.com/photos/4452215/pexels-photo-4452215.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const A_VENIR = [
  {
    day: "28",
    month: "Juin",
    title: "Fête de fin d'année 2026",
    desc: "Toute la communauté éducative · Programme à venir",
    tag: "Événement",
  },
  {
    day: "06",
    month: "Sep",
    title: "Rentrée scolaire 2026 — 2027",
    desc: "Accueil des élèves de 8h à 9h selon les niveaux",
    tag: "Vie scolaire",
  },
  {
    day: "17",
    month: "Jan",
    title: "Journée Portes Ouvertes 2027",
    desc: "Accueil des familles de 9h à 17h · Entrée libre",
    tag: "Événement",
  },
];

const FILTERS = [
  { key: "all", label: "Tout" },
  { key: "inscriptions", label: "Inscriptions", color: "var(--cat-inscr)" },
  { key: "evenements", label: "Événements", color: "var(--cat-event)" },
  { key: "resultats", label: "Résultats", color: "var(--cat-result)" },
  { key: "vie", label: "Vie scolaire", color: "var(--cat-vie)" },
];

// ── Composants ───────────────────────────────────────────

function CatPill({ category, label }) {
  return (
    <span className={`cat-pill cat-${category}`}>
      <span className="dot"></span>
      {label}
    </span>
  );
}

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
          <a href="histoire.html">Notre histoire</a>
          <a href="actualites.html" className="active">Actualités</a>
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

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-content">
        <Reveal>
          <span className="eyebrow">Vie de l'établissement</span>
          <h1>Actu<em>alités</em></h1>
          <p>
            Événements, résultats, projets pédagogiques et inscriptions —
            toute la vie de l'Institution Notre-Dame de la Providence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Filters({ active, setActive, counts }) {
  return (
    <div className="filters">
      <div className="wrap">
        <div className="filters-inner">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${active === f.key ? "active" : ""}`}
              onClick={() => setActive(f.key)}
            >
              {f.color && (
                <span
                  className="filter-dot"
                  style={{ background: active === f.key ? "#fff" : f.color }}
                />
              )}
              {f.label}
              <span className="filter-count">
                ({f.key === "all" ? ARTICLES.length : counts[f.key] || 0})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ article }) {
  return (
    <Reveal className="featured-card">
      <div className="featured-img">
        <img src={article.img} alt={article.title} />
      </div>
      <div className="featured-body">
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span className="featured-badge">À la une</span>
          <CatPill category={article.category} label={article.categoryLabel} />
        </div>
        <p className="featured-date">{article.dateLabel}</p>
        <h2 className="featured-title">{article.title}</h2>
        <p className="featured-excerpt">{article.excerpt}</p>
        <div style={{ marginTop: 8 }}>
          <a href="#contact" className="btn btn-violet" style={{ fontSize: 12 }}>
            Nous contacter <Arrow />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ArticleCard({ article, delay = 0 }) {
  return (
    <Reveal delay={delay} className="article-card">
      <div className={`article-top-bar cat-${article.category}`}></div>
      <div className="article-img">
        <img src={article.img} alt={article.title} />
      </div>
      <div className="article-body">
        <div className="article-meta">
          <CatPill category={article.category} label={article.categoryLabel} />
          <span className="article-date">{article.dateLabel}</span>
        </div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <span className="article-link">
          Lire la suite <Arrow />
        </span>
      </div>
    </Reveal>
  );
}

function Articles({ filter }) {
  const featured = ARTICLES.find((a) => a.featured && (filter === "all" || a.category === filter));
  const rest = ARTICLES.filter((a) => {
    if (a.featured && featured && a.id === featured.id) return false;
    return filter === "all" || a.category === filter;
  });

  const noResults = !featured && rest.length === 0;

  return (
    <section style={{ paddingBottom: 40 }}>
      <div className="wrap">
        {featured && (
          <div className="featured" id="a-la-une">
            <FeaturedCard article={featured} />
          </div>
        )}

        <div className="articles-head">
          <h2>
            {filter === "all" ? "Toutes les actualités" : FILTERS.find(f => f.key === filter)?.label}
          </h2>
          <span className="articles-count">{rest.length} article{rest.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="articles-grid">
          {noResults ? (
            <div className="empty-state">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 26c1.5-3 5.5-5 12-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="15" cy="16" r="1.5" fill="currentColor"/>
                <circle cx="25" cy="16" r="1.5" fill="currentColor"/>
              </svg>
              <p>Aucune actualité dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            rest.map((a, i) => <ArticleCard key={a.id} article={a} delay={i * 80} />)
          )}
        </div>
      </div>
    </section>
  );
}

function AVenir() {
  return (
    <section className="a-venir">
      <div className="wrap">
        <Reveal className="a-venir-head">
          <span className="eyebrow">Agenda</span>
          <h2>À venir</h2>
        </Reveal>
        <div className="a-venir-list">
          {A_VENIR.map((ev, i) => (
            <Reveal key={i} delay={i * 80} className="a-venir-item">
              <div className="a-venir-date-block">
                <span className="a-venir-day">{ev.day}</span>
                <span className="a-venir-month">{ev.month}</span>
              </div>
              <div className="a-venir-text">
                <h4>{ev.title}</h4>
                <p>{ev.desc}</p>
              </div>
              <span className="a-venir-tag">{ev.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterStrip() {
  return (
    <footer className="footer-strip" id="contact">
      <div className="wrap footer-strip-inner">
        <span>© 2026 Institution Notre-Dame de la Providence — 14 rue Pasteur, Saint-Dié-des-Vosges — 03 29 56 13 12</span>
        <nav className="footer-strip-links">
          <a href="index.html"><BackArrow /> Notre-Dame de la Providence</a>
          <a href="../index.html">Marie de Galilée</a>
        </nav>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────

function App() {
  const [filter, setFilter] = useState("all");

  const counts = ARTICLES.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Filters active={filter} setActive={setFilter} counts={counts} />
        <Articles filter={filter} />
        <AVenir />
      </main>
      <FooterStrip />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
