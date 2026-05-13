// app.jsx — Institution Notre-Dame de la Providence

const { useState, useEffect, useRef } = React;

// ── Helpers ──────────────────────────────────────────────

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); }
        });
      },
      { threshold: 0.1 }
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

// ── Data ─────────────────────────────────────────────────

const NIVEAUX = [
  {
    tag: "Maternelle · Primaire",
    name: "École Notre-Dame",
    desc: "Un premier pas dans la confiance. Nos classes à effectifs réduits permettent à chaque enfant d'être pleinement accompagné, de la petite section au CM2, dans un cadre chaleureux et structurant.",
    logo: "../assets/Ecole NDP.png",
    img: "https://images.pexels.com/photos/8087869/pexels-photo-8087869.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: [
      "Effectifs réduits — chaque enfant connu et suivi",
      "Périscolaire : garderie matin & soir",
      "Cantine sur place",
      "Projets culturels et sorties régulières",
      "Lien étroit avec les familles",
    ],
    url: "https://institutionlaprovidence.fr/accueil/",
  },
  {
    tag: "6ème · 5ème · 4ème · 3ème",
    name: "Collège de la Providence",
    desc: "Quatre années pour construire une méthode, s'ouvrir au monde et se préparer à l'après. Un accompagnement individualisé, des projets transversaux et une exigence académique qui prépare aux choix de lycée.",
    logo: "../assets/Collège NDP.png",
    img: "https://images.pexels.com/photos/8466783/pexels-photo-8466783.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: [
      "Accompagnement personnalisé tout au long du cycle",
      "Options artistiques et linguistiques",
      "Sorties pédagogiques & projets interdisciplinaires",
      "Préparation au DNB",
      "Orientation active vers le lycée",
    ],
    url: "https://institutionlaprovidence.fr/accueil/",
  },
  {
    tag: "Bac pro · CAP",
    name: "Lycée Professionnel",
    desc: "Une voie d'excellence vers l'emploi. Nos filières professionnelles allient formation en entreprise et enseignements généraux pour un baccalauréat professionnel qui ouvre de vraies portes — et une poursuite en BTS possible au Lycée Beau Jardin.",
    logo: "../assets/LP NDP.png",
    img: "https://images.pexels.com/photos/27093997/pexels-photo-27093997.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: [
      "Alternance école / entreprise (PFMP)",
      "Accompagnement à l'insertion professionnelle",
      "Accès BTS au Lycée Beau Jardin",
      "Internat disponible (60 places, Lycée Beau Jardin)",
      "Réseau d'entreprises partenaires local",
    ],
    url: "https://institutionlaprovidence.fr/accueil/",
  },
];

const VALEURS = [
  {
    num: "01",
    name: "Enracinement",
    desc: "Une institution fondée sur des valeurs chrétiennes transmises depuis plus d'un siècle : la dignité de chaque personne, la solidarité, le sens du service.",
    icon: "cross",
  },
  {
    num: "02",
    name: "Bienveillance",
    desc: "Chaque élève est accueilli tel qu'il est. Le dialogue avec les familles, le suivi individualisé et l'attention portée aux difficultés sont au cœur de notre pédagogie.",
    icon: "circle",
  },
  {
    num: "03",
    name: "Exigence",
    desc: "Exiger le meilleur de chaque enfant, c'est lui faire confiance. Nous combinons ambition académique et soutien concret pour que personne ne soit laissé au bord du chemin.",
    icon: "diamond",
  },
  {
    num: "04",
    name: "Ouverture",
    desc: "Préparation à la vie professionnelle, ouverture culturelle, voyages scolaires, rencontres inter-établissements — l'institution regarde au-delà de la salle de classe.",
    icon: "triangle",
  },
];

const INTERNAT_FEATURES = [
  { label: "60 places", sublabel: "en chambres individuelles & doubles" },
  { label: "Lycée Beau Jardin", sublabel: "gestion partagée de l'internat" },
  { label: "500 € / mois", sublabel: "chambre individuelle" },
  { label: "450 € / mois", sublabel: "chambre double ou triple" },
];

const QF_ROWS = [
  { tranche: "QF ≥ 11 150 €", value: "71 €" },
  { tranche: "QF 9 150 — 11 150 €", value: "65 €" },
  { tranche: "QF 7 750 — 9 150 €", value: "60 €" },
  { tranche: "QF ≤ 7 750 €", value: "54 €" },
];

const CANTINE_ROWS = [
  { label: "Cantine · 4 j./sem. (hors Saint-Dié)", value: "103 €", unit: "/ mois" },
  { label: "Cantine · 4 j./sem. (Saint-Dié)", value: "89 €", unit: "/ mois" },
  { label: "Cantine · 1 j./sem. (hors Saint-Dié)", value: "27 €", unit: "/ mois" },
  { label: "Cantine · 1 j./sem. (Saint-Dié)", value: "23 €", unit: "/ mois" },
  { label: "Repas occasionnel (hors Saint-Dié)", value: "7,50 €", unit: "/ repas" },
  { label: "Repas occasionnel (Saint-Dié)", value: "6,50 €", unit: "/ repas" },
];

const GARDERIE_ROWS = [
  { label: "Garderie · tarif horaire", value: "2,50 €", unit: "/ heure" },
  { label: "Garderie matin · forfait annuel", value: "103 €", unit: "/ an" },
  { label: "Garderie soir 16h30–18h30 · forfait", value: "411 €", unit: "/ an" },
];

// ── Value icons ──────────────────────────────────────────

function ValueIcon({ kind }) {
  const sw = 1.25;
  if (kind === "circle")
    return <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth={sw}/><circle cx="24" cy="24" r="6" fill="currentColor"/></svg>;
  if (kind === "diamond")
    return <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="24" y="6" width="25.5" height="25.5" transform="rotate(45 24 6)" stroke="currentColor" strokeWidth={sw}/><rect x="24" y="16" width="11.3" height="11.3" transform="rotate(45 24 16)" fill="currentColor"/></svg>;
  if (kind === "triangle")
    return <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 8 L42 40 L6 40 Z" stroke="currentColor" strokeWidth={sw}/><circle cx="24" cy="30" r="4" fill="currentColor"/></svg>;
  if (kind === "cross")
    return <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth={sw}/><line x1="24" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth={sw}/><line x1="14" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth={sw}/></svg>;
  return null;
}

// ── Contact modal ────────────────────────────────────────

function ContactModal({ onClose }) {
  const [objet, setObjet] = useState('');
  const [email, setEmail] = useState('');
  const [niveau, setNiveau] = useState('');
  const [message, setMessage] = useState('');

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const to = 'secretariat@institution-laprovidence.fr';
    const subject = encodeURIComponent(`[${niveau || 'NDP'}] ${objet}`);
    const body = encodeURIComponent(`Niveau concerné : ${niveau}\nDe : ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>Prendre contact</span>
        <h3 id="modal-title" className="modal-title">Nous écrire</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="m-niveau">Niveau concerné</label>
            <div className="modal-select-wrap">
              <select id="m-niveau" value={niveau} onChange={e => setNiveau(e.target.value)} required>
                <option value="">Choisir un niveau…</option>
                <option value="École Notre-Dame">École Notre-Dame (Maternelle · Primaire)</option>
                <option value="Collège de la Providence">Collège de la Providence</option>
                <option value="Lycée Professionnel">Lycée Professionnel</option>
                <option value="Internat">Internat</option>
                <option value="Renseignement général">Renseignement général</option>
              </select>
              <svg className="modal-select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="modal-field">
            <label htmlFor="m-email">Votre adresse e-mail</label>
            <input id="m-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="prenom.nom@exemple.fr" required />
          </div>
          <div className="modal-field">
            <label htmlFor="m-objet">Objet</label>
            <input id="m-objet" type="text" value={objet} onChange={e => setObjet(e.target.value)} placeholder="Inscription, renseignement, visite…" required />
          </div>
          <div className="modal-field">
            <label htmlFor="m-message">Message</label>
            <textarea id="m-message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Votre message…" required rows={5} />
          </div>
          <button type="submit" className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }}>
            Envoyer <Arrow />
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────

function Nav({ open, setOpen, onContact }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="nav-logo" aria-label="Institution Notre-Dame de la Providence">
          <img src="../assets/LP NDP.png" alt="Institution Notre-Dame de la Providence" />
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <a href="#niveaux">Nos niveaux</a>
          <a href="#valeurs">Projet éducatif</a>
          <a href="histoire.html">Notre histoire</a>
          <a href="actualites.html">Actualités</a>
          <a href="#tarifs">Tarifs</a>
          <button className="nav-cta" onClick={() => { setOpen(false); onContact && onContact(); }}>Inscription</button>
        </nav>
        <a href="../index.html" className="nav-back" style={{ marginLeft: 16 }} aria-label="Retour à Marie de Galilée">
          <BackArrow />
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

function Hero({ onContact }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span className="eyebrow">Saint-Dié-des-Vosges · 14 rue Pasteur</span>
          </div>
          <h1 className="h-display hero-title">
            De l'école au Bac Pro,<br />
            un parcours qui <span className="accent">ne s'arrête pas</span>.
          </h1>
          <p className="hero-sub">
            Depuis plus d'un siècle, l'Institution Notre-Dame de la Providence accompagne
            chaque élève de la primaire au baccalauréat professionnel, dans un cadre
            bienveillant, exigeant et profondément humain.
          </p>
          <div className="hero-actions">
            <a href="#niveaux" className="btn btn-violet">
              Découvrir l'établissement <Arrow />
            </a>
            <button className="btn btn-ghost" onClick={() => onContact && onContact()}>Prendre contact</button>
          </div>
          <div className="hero-meta">
            <span className="hero-badge-violet">Inscriptions 2026 — 2027 ouvertes</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="hero-img-wrap">
            <img
              src="https://images.pexels.com/photos/8617970/pexels-photo-8617970.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Élèves à l'Institution Notre-Dame de la Providence"
            />
            <div className="hero-floating">
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <p>
                <strong>Ensemble scolaire Marie de Galilée</strong>
                Catholique sous contrat d'association avec l'État
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Stats ────────────────────────────────────────────────

function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats-grid">
        <Reveal className="stat">
          <span className="stat-num">3<span className="unit">niveaux</span></span>
          <span className="stat-label">École · Collège · Lycée professionnel, un parcours complet sur un même site</span>
        </Reveal>
        <Reveal delay={100} className="stat">
          <span className="stat-num">≤24<span className="unit">/ classe</span></span>
          <span className="stat-label">Un effectif à taille humaine — chaque élève est connu, vu, accompagné</span>
        </Reveal>
        <Reveal delay={200} className="stat">
          <span className="stat-num">60<span className="unit">places</span></span>
          <span className="stat-label">En internat (Lycée Beau Jardin) pour les élèves du lycée professionnel</span>
        </Reveal>
      </div>
    </section>
  );
}

// ── Niveaux ──────────────────────────────────────────────

function Niveaux() {
  return (
    <section className="niveaux" id="niveaux">
      <div className="wrap">
        <div className="niveaux-head">
          <Reveal>
            <span className="eyebrow">Nos niveaux</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Trois parcours, <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>un même engagement</em>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede">
              De la maternelle au baccalauréat professionnel, l'Institution Notre-Dame de la
              Providence propose une continuité éducative rare — avec les mêmes valeurs à chaque étape.
            </p>
          </Reveal>
        </div>
        <div className="niveaux-grid">
          {NIVEAUX.map((n, i) => (
            <Reveal key={n.name} delay={i * 100}>
              <article className="niveau-card">
                <div className="niveau-card-img">
                  <img src={n.img} alt={n.name} />
                </div>
                <div className="niveau-card-logo">
                  <img src={n.logo} alt={n.name} />
                </div>
                <div className="niveau-card-body">
                  <span className="niveau-tag">{n.tag}</span>
                  <h3 className="niveau-name">{n.name}</h3>
                  <p className="niveau-desc">{n.desc}</p>
                  <ul className="niveau-features">
                    {n.features.map((f, j) => <li key={j}>{f}</li>)}
                  </ul>
                  <a className="niveau-link" href={n.url} target="_blank" rel="noopener noreferrer">
                    En savoir plus <Arrow />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Valeurs ──────────────────────────────────────────────

function Valeurs() {
  return (
    <section className="valeurs" id="valeurs">
      <div className="wrap">
        <Reveal className="valeurs-head">
          <span className="eyebrow">Projet éducatif</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>
            Quatre piliers <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>au service de chaque enfant</em>.
          </h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Un projet catholique vivant, fondé sur la confiance, l'exigence et l'attention portée à chacun —
            depuis les premières années jusqu'à l'entrée dans la vie professionnelle.
          </p>
        </Reveal>
        <div className="valeurs-grid">
          {VALEURS.map((v, i) => (
            <Reveal key={v.name} delay={i * 100} className="valeur">
              <span className="valeur-num">{v.num}</span>
              <div className="valeur-icon"><ValueIcon kind={v.icon} /></div>
              <h3 className="valeur-name">{v.name}</h3>
              <p className="valeur-desc">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Internat ─────────────────────────────────────────────

function Internat({ onContact }) {
  return (
    <section className="internat">
      <div className="wrap internat-inner">
        <Reveal>
          <div className="internat-img">
            <img
              src="https://images.pexels.com/photos/5676667/pexels-photo-5676667.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Internat — Lycée Beau Jardin"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="internat-text">
          <span className="eyebrow">Hébergement</span>
          <h2>Un foyer au cœur<br />de <em>Saint-Dié</em>.</h2>
          <p className="lede">
            Les élèves du lycée professionnel bénéficient de l'internat du Lycée Beau Jardin,
            situé à quelques minutes — 60 places en chambres individuelles, doubles ou triples,
            dans un cadre sécurisé et encadré.
          </p>
          <div className="internat-features">
            {INTERNAT_FEATURES.map((f, i) => (
              <div className="internat-feat" key={i}>
                <strong>{f.label}</strong>
                <span>{f.sublabel}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <button className="btn btn-violet" onClick={() => onContact && onContact()}>
              Demander une place <Arrow />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Tarifs ───────────────────────────────────────────────

function Tarifs({ onContact }) {
  return (
    <section className="tarifs-section" id="tarifs">
      <div className="wrap">
        <Reveal className="tarifs-section-head">
          <span className="eyebrow">Tarifs &amp; inscriptions · 2026 — 2027</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>
            Une scolarité <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>accessible</em>,<br />
            modulée selon vos ressources.
          </h2>
          <p className="lede">
            Établissement sous contrat d'association avec l'État. Les contributions familiales
            sont modulées selon le quotient familial — les enseignants sont rémunérés par l'État.
          </p>
        </Reveal>

        <div className="tarifs-grid">
          <Reveal className="tarif-block">
            <span className="tarif-block-label">École · 2026 — 2027</span>
            <h3>Contribution mensuelle</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
              Selon le quotient familial (sur 10 mois)
            </p>
            <div className="tarif-rows">
              {QF_ROWS.map((r, i) => (
                <div className="tarif-row" key={i}>
                  <span className="t-label">{r.tranche}</span>
                  <span className="t-value">{r.value}<span className="t-unit">/ mois</span></span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="tarif-block">
            <span className="tarif-block-label">Restauration scolaire</span>
            <h3>Cantine</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
              Tarifs selon commune de résidence
            </p>
            <div className="tarif-rows">
              {CANTINE_ROWS.map((r, i) => (
                <div className="tarif-row" key={i}>
                  <span className="t-label">{r.label}</span>
                  <span className="t-value">{r.value}<span className="t-unit">{r.unit}</span></span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className="tarif-block">
            <span className="tarif-block-label">Périscolaire</span>
            <h3>Garderie</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
              Accueil matin et soir
            </p>
            <div className="tarif-rows">
              {GARDERIE_ROWS.map((r, i) => (
                <div className="tarif-row" key={i}>
                  <span className="t-label">{r.label}</span>
                  <span className="t-value">{r.value}<span className="t-unit">{r.unit}</span></span>
                </div>
              ))}
            </div>
            <p className="tarif-note" style={{ marginTop: 16 }}>
              <strong>Collège &amp; Lycée pro</strong> — Les tarifs sont communiqués sur demande.{' '}
              <button
                onClick={() => onContact && onContact()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontWeight: 600, fontSize: 'inherit', padding: 0 }}
              >
                Nous contacter →
              </button>
            </p>
          </Reveal>
        </div>

        <Reveal>
          <p className="tarif-note" style={{ marginBottom: 0 }}>
            <strong>Frais d'inscription :</strong> dossier 30 € + arrhes 30 €.
            {' '}Remises fratries automatiques : <strong>15 %</strong> sur le 2ᵉ enfant · <strong>20 %</strong> sur le 3ᵉ · <strong>25 %</strong> sur le 4ᵉ · <strong>30 %</strong> sur le 5ᵉ.
            Bourses nationales et fonds de solidarité disponibles sur demande.
          </p>
        </Reveal>

        <div className="tarifs-cta">
          <a
            href="../assets/Tarifs/2026_2027_conditions_financieres_ecole_notre-dame-de-la-providence.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M1 1h7l3 3v9H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M8 1v3h3" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M3 7h6M3 9.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            Conditions financières 2026 — 2027
          </a>
          <a href="../index.html#tarifs" className="btn btn-ghost">
            Tous les tarifs Marie de Galilée <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── CTA Inscription ──────────────────────────────────────

function Inscription({ onContact }) {
  return (
    <section className="cta" id="inscription">
      <div className="wrap cta-inner">
        <Reveal>
          <span className="eyebrow">Inscription · 2026 — 2027</span>
          <h2 className="cta-title">
            Vous hésitez encore ?<br />
            <em>Parlons-en, simplement.</em>
          </h2>
          <p className="cta-sub">
            Choisir une école pour son enfant, c'est une décision qui se mûrit. Notre équipe
            accueille chaque famille, sans rendez-vous formel, pour répondre à vos questions
            et vous faire visiter les lieux.
          </p>
          <div className="cta-actions">
            <button className="btn btn-gold" onClick={() => onContact && onContact()}>
              Prendre contact <Arrow />
            </button>
            <a
              href="https://institutionlaprovidence.fr/accueil/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              Site officiel <Arrow />
            </a>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="cta-card">
            <h4>Comment s'inscrire ?</h4>
            <ul className="cta-list">
              <li><span className="num">01</span><span>Vous nous écrivez ou appelez le secrétariat de l'établissement.</span></li>
              <li><span className="num">02</span><span>Nous convenons d'une rencontre et d'une visite des locaux avec le chef d'établissement.</span></li>
              <li><span className="num">03</span><span>Vous constituez le dossier — nous vous accompagnons à chaque étape.</span></li>
              <li><span className="num">04</span><span>Votre enfant rejoint sa nouvelle classe à la rentrée, attendu et accueilli.</span></li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="../assets/LP NDP.png" alt="Institution Notre-Dame de la Providence" className="footer-logo" />
            <p>
              Enseignement catholique sous contrat d'association avec l'État.
              14 rue Pasteur, 88100 Saint-Dié-des-Vosges.
            </p>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li>14 rue Pasteur</li>
              <li>88100 Saint-Dié-des-Vosges</li>
              <li>03 29 56 13 12</li>
              <li>
                <a href="https://institutionlaprovidence.fr/accueil/" target="_blank" rel="noopener noreferrer">
                  institutionlaprovidence.fr
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Niveaux</h5>
            <ul>
              <li><a href="#niveaux">École Notre-Dame</a></li>
              <li><a href="#niveaux">Collège de la Providence</a></li>
              <li><a href="#niveaux">Lycée Professionnel</a></li>
              <li><a href="#tarifs">Tarifs &amp; inscriptions</a></li>
            </ul>
          </div>
          <div>
            <h5>Ensemble scolaire</h5>
            <ul>
              <li>
                <a href="../index.html">
                  ← Marie de Galilée
                </a>
              </li>
              <li>
                <a href="https://externat-saintetherese.fr/" target="_blank" rel="noopener noreferrer">
                  Externat Sainte-Thérèse
                </a>
              </li>
              <li>
                <a href="https://www.saintemarie-stdie.fr/" target="_blank" rel="noopener noreferrer">
                  Institution Sainte-Marie
                </a>
              </li>
              <li>
                <a href="https://www.lycee-beaujardin.fr/" target="_blank" rel="noopener noreferrer">
                  Lycée Beau Jardin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Institution Notre-Dame de la Providence — Ensemble scolaire Marie de Galilée</span>
          <a href="../index.html" className="footer-back">
            <BackArrow /> Marie de Galilée
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Nav open={navOpen} setOpen={setNavOpen} onContact={() => setContactOpen(true)} />
      <main>
        <Hero onContact={() => setContactOpen(true)} />
        <Stats />
        <Niveaux />
        <Valeurs />
        <Internat onContact={() => setContactOpen(true)} />
        <Tarifs onContact={() => setContactOpen(true)} />
        <Inscription onContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
