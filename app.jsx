// app.jsx — Marie de Galilée landing page

const { useState, useEffect, useRef } = React;

// ───── Tweak defaults (writable by host) ─────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#1a5837", "#e8a93c", "#faf7ef"],
  "heroLayout": "split",
  "etabAccent": "varied",
  "valueIcons": "geometric",
  "showFloatingCard": true,
  "fontPair": "cormorant-manrope"
}/*EDITMODE-END*/;

// ───── Content data ─────
const ETABLISSEMENTS = [
  {
    name: "Externat Sainte-Thérèse",
    levels: "Maternelle · Primaire",
    addr: "4 rue Jules Ferry\n88110 Raon-l'Étape",
    tel: "03 29 41 44 43",
    url: "https://externat-saintetherese.fr/",
    accent: "var(--acc-marine)",
    tone: "tone-marine",
    placeholder: "Externat Sainte-Thérèse"
  },
  {
    name: "Institution Sainte-Marie",
    levels: "Maternelle · Primaire · Collège",
    addr: "17 avenue de Robache\n88100 Saint-Dié-des-Vosges",
    tel: "03 29 55 34 66",
    url: "https://www.saintemarie-stdie.fr/",
    accent: "var(--acc-brown)",
    tone: "tone-warm",
    placeholder: "Sainte-Marie"
  },
  {
    name: "Institution Notre-Dame de la Providence",
    levels: "École · Collège · Lycée pro",
    addr: "14 rue Pasteur\n88100 Saint-Dié-des-Vosges",
    tel: "03 29 56 13 12",
    url: "https://institutionlaprovidence.fr/accueil/",
    accent: "var(--acc-violet)",
    tone: "tone-violet",
    placeholder: "La Providence"
  },
  {
    name: "Lycée Beau Jardin",
    levels: "2ⁿᵈᵉ · 1ʳᵉ · Tle · BTS",
    addr: "9 rue du Beau Jardin\n88100 Saint-Dié-des-Vosges",
    tel: "03 29 56 13 52",
    url: "https://www.lycee-beaujardin.fr/",
    accent: "var(--acc-green)",
    tone: "tone-green",
    placeholder: "Lycée Beau Jardin"
  }
];

const VALEURS = [
  {
    num: "01",
    name: "Bienveillance",
    desc: "Chaque enfant est accueilli pour qui il est, dans un climat de confiance et d'écoute attentive.",
    icon: "circle"
  },
  {
    num: "02",
    name: "Excellence",
    desc: "Une exigence académique soutenue par des équipes engagées et des résultats qui parlent d'eux-mêmes.",
    icon: "diamond"
  },
  {
    num: "03",
    name: "Accompagnement",
    desc: "Un suivi personnalisé tout au long du parcours, de la maternelle aux études supérieures.",
    icon: "triangle"
  },
  {
    num: "04",
    name: "Enracinement chrétien",
    desc: "Une formation humaine et spirituelle ancrée dans la tradition catholique et ouverte sur le monde.",
    icon: "cross"
  }
];

const TESTIMONIALS = [
  {
    quote: "Nous avons trouvé bien plus qu'une école : une vraie communauté éducative où nos enfants grandissent en confiance, encadrés par des adultes qui les connaissent et les portent.",
    author: "Famille Lemaître",
    role: "Parents de trois élèves · École Sainte-Jeanne d'Arc & Collège Saint-Joseph"
  },
  {
    quote: "Le suivi pendant les années lycée a été exceptionnel. Chaque professeur connaissait notre fille, ses forces, ses doutes — elle est arrivée à son BTS pleinement préparée et confiante.",
    author: "Madame Berthier",
    role: "Maman d'une ancienne élève · Lycée Notre-Dame"
  },
  {
    quote: "Ce qui nous a touchés, c'est cette attention au cœur et à l'esprit. Nos enfants reviennent chaque jour avec quelque chose à raconter, à questionner, à partager.",
    author: "Famille Rousset",
    role: "Parents · École Sainte-Anne, Raon-l'Étape"
  }
];

// ───── Reusable bits ─────
function Placeholder({ tone = "", label }) {
  return (
    <div className={`ph ${tone}`}>
      <span className="ph-tag">{label}</span>
    </div>
  );
}

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
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

function Logo({ light = false, variant = "primary" }) {
  const src = variant === "alt" ? "assets/logo-mdg.png" : "assets/logo-beau-jardin.png";
  return (
    <a href="#" className={`logo logo-img ${light ? "logo-light" : ""}`} aria-label="Ensemble scolaire Marie de Galilée">
      <img src={src} alt="Ensemble scolaire Marie de Galilée — Lycée Beau Jardin" />
    </a>
  );
}

function ValueIcon({ kind }) {
  const stroke = "currentColor";
  const sw = 1.25;
  if (kind === "circle")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke={stroke} strokeWidth={sw} />
        <circle cx="24" cy="24" r="6" fill="currentColor" />
      </svg>
    );
  if (kind === "diamond")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="24" y="6" width="25.5" height="25.5" transform="rotate(45 24 6)" stroke={stroke} strokeWidth={sw} />
        <rect x="24" y="16" width="11.3" height="11.3" transform="rotate(45 24 16)" fill="currentColor" />
      </svg>
    );
  if (kind === "triangle")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8 L42 40 L6 40 Z" stroke={stroke} strokeWidth={sw} />
        <circle cx="24" cy="30" r="4" fill="currentColor" />
      </svg>
    );
  if (kind === "cross")
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke={stroke} strokeWidth={sw} />
        <line x1="24" y1="12" x2="24" y2="36" stroke={stroke} strokeWidth={sw} />
        <line x1="14" y1="20" x2="34" y2="20" stroke={stroke} strokeWidth={sw} />
      </svg>
    );
  return null;
}

function Arrow() {
  return (
    <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

// ───── Sections ─────
function Nav({ open, setOpen }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Logo />
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <a href="#etablissements">Nos établissements</a>
          <a href="#valeurs">Nos valeurs</a>
          <a href="#actualites">Actualités</a>
          <a href="#contact">Contact</a>
          <a href="#inscription" className="nav-cta">Inscription</a>
        </nav>
        <button
          className={`nav-burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

function Hero({ showFloating }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span className="eyebrow">Vosges · Saint-Dié & Raon-l'Étape</span>
          </div>
          <h1 className="h-display hero-title">
            De la maternelle au BTS,<br />
            un projet éducatif <span className="accent">d'exception</span>.
          </h1>
          <p className="hero-sub">
            Quatre établissements, une même ambition : la réussite et l'épanouissement
            de chaque enfant, dans un cadre humain, exigeant et chaleureux.
          </p>
          <div className="hero-actions">
            <a href="#etablissements" className="btn btn-gold">
              Choisir mon établissement <Arrow />
            </a>
            <a href="#inscription" className="btn btn-ghost">Prendre rendez-vous</a>
          </div>
          <div className="hero-meta">
            <span className="badge">⊹ Inscriptions 2026 — 2027 ouvertes</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="hero-img-wrap">
            <Placeholder label="Photo d'ambiance — enfants en classe" />
            {showFloating && (
              <div className="hero-floating">
                <div className="stamp">98%</div>
                <p>
                  <strong>Réussite au Bac 2025</strong>
                  Lycée Notre-Dame, toutes filières confondues
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats-grid">
        <Reveal className="stat">
          <span className="stat-num">~800<span className="unit">élèves</span></span>
          <span className="stat-label">Une communauté à taille humaine, répartie sur quatre établissements</span>
        </Reveal>
        <Reveal delay={100} className="stat">
          <span className="stat-num">98<span className="unit">%</span></span>
          <span className="stat-label">de réussite au Baccalauréat en 2025, toutes filières confondues</span>
        </Reveal>
        <Reveal delay={200} className="stat">
          <span className="stat-num">≤24<span className="unit">/ classe</span></span>
          <span className="stat-label">Un effectif à taille humaine — chaque enfant est connu, vu, accompagné</span>
        </Reveal>
      </div>
    </section>
  );
}

function Etablissements() {
  return (
    <section className="etabs" id="etablissements">
      <div className="wrap">
        <div className="etabs-head">
          <Reveal>
            <span className="eyebrow">Nos établissements</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Quatre lieux, <em style={{ color: "var(--gold-warm)" }}>un même souffle</em>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede">
              Chaque école, chaque collège, chaque lycée a son visage propre — mais tous partagent
              la pédagogie, les valeurs et l'attention qui font Marie de Galilée.
            </p>
          </Reveal>
        </div>
        <div className="etabs-grid">
          {ETABLISSEMENTS.map((e, i) => (
            <Reveal key={e.name} delay={i * 80}>
              <article className="etab" style={{ "--accent": e.accent }}>
                <div className="etab-img">
                  <Placeholder tone={e.tone} label={e.placeholder} />
                </div>
                <div className="etab-body">
                  <span className="etab-levels">{e.levels}</span>
                  <h3 className="etab-name">{e.name}</h3>
                  <p className="etab-addr">
                    {e.addr.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                    <span style={{ color: "var(--ink-2)", display: "inline-block", marginTop: 6 }}>{e.tel}</span>
                  </p>
                  <a className="etab-link" href={e.url} target="_blank" rel="noopener noreferrer">
                    Visiter le site <Arrow />
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

function Valeurs() {
  return (
    <section className="valeurs" id="valeurs">
      <div className="wrap">
        <Reveal className="valeurs-head">
          <span className="eyebrow">Notre projet</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>
            Quatre piliers <em style={{ color: "var(--gold-warm)" }}>au service</em> de chaque enfant.
          </h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Un projet éducatif catholique vivant, fondé sur la confiance, l'exigence et l'attention portée à chacun.
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

function Testimonial() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="testimonial">
      <div className="wrap testimonial-grid">
        <Reveal>
          <div className="testimonial-img">
            <Placeholder tone="tone-warm" label="Portrait parent" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="testimonial-quote">
            <span className="eyebrow" style={{ color: "var(--gold-warm)" }}>Ils nous font confiance</span>
            <span className="quote-mark">“</span>
            <blockquote key={idx}>{t.quote}</blockquote>
            <cite>
              <strong>{t.author}</strong>
              <span>{t.role}</span>
            </cite>
            <div className="testimonial-nav">
              <div className="testimonial-dots" role="tablist">
                {TESTIMONIALS.map((_, i) => (
                  <span
                    key={i}
                    className={i === idx ? "active" : ""}
                    onClick={() => setIdx(i)}
                    role="tab"
                    aria-selected={i === idx}
                  ></span>
                ))}
              </div>
              <div className="testimonial-arrows">
                <button onClick={prev} aria-label="Témoignage précédent">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
                </button>
                <button onClick={next} aria-label="Témoignage suivant">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Inscription() {
  return (
    <section className="cta" id="inscription">
      <div className="wrap cta-inner">
        <Reveal>
          <span className="eyebrow">Inscription · Année 2026 — 2027</span>
          <h2 className="cta-title">
            Vous hésitez encore ?<br />
            <span className="accent">Parlons-en, simplement.</span>
          </h2>
          <p className="cta-sub">
            Choisir une école pour son enfant, c'est une décision qui se mûrit. Nos directeurs et
            directrices accueillent chaque famille, sans rendez-vous formel, pour répondre à vos
            questions et vous faire visiter les lieux.
          </p>
          <div className="cta-actions">
            <a href="#contact" className="btn btn-gold-on-dark">
              Prendre contact <Arrow />
            </a>
            <a href="#" className="btn-link">Télécharger la brochure ↓</a>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="cta-card">
            <h4>Comment se passe une inscription ?</h4>
            <ul className="cta-list">
              <li><span className="num">01</span><span>Vous nous écrivez ou appelez l'établissement de votre choix.</span></li>
              <li><span className="num">02</span><span>Nous convenons d'une rencontre avec le chef d'établissement et une visite des locaux.</span></li>
              <li><span className="num">03</span><span>Vous constituez le dossier — nous vous accompagnons à chaque étape.</span></li>
              <li><span className="num">04</span><span>Votre enfant rejoint sa nouvelle classe à la rentrée, attendu et accueilli.</span></li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>
              Ensemble scolaire catholique des Vosges, sous contrat d'association avec l'État.
              Saint-Dié-des-Vosges & Raon-l'Étape.
            </p>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li>Direction de l'ensemble scolaire</li>
              <li>8 rue Thiers, 88100 Saint-Dié</li>
              <li>03 29 56 00 00</li>
              <li><a href="#">contact@marie-de-galilee.fr</a></li>
            </ul>
          </div>
          <div>
            <h5>Établissements</h5>
            <ul>
              <li><a href="https://externat-saintetherese.fr/" target="_blank" rel="noopener noreferrer">Externat Sainte-Thérèse</a></li>
              <li><a href="https://www.saintemarie-stdie.fr/" target="_blank" rel="noopener noreferrer">Institution Sainte-Marie</a></li>
              <li><a href="https://institutionlaprovidence.fr/accueil/" target="_blank" rel="noopener noreferrer">Notre-Dame de la Providence</a></li>
              <li><a href="https://www.lycee-beaujardin.fr/" target="_blank" rel="noopener noreferrer">Lycée Beau Jardin</a></li>
            </ul>
          </div>
          <div>
            <h5>Suivez-nous</h5>
            <div className="socials" style={{ marginBottom: 18 }}>
              <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M8 14V8h2l.5-2.5H8V4c0-.7.2-1.2 1.2-1.2H10.5V.5C10 .5 9.3.4 8.4.4 6.6.4 5.5 1.5 5.5 3.5v2H3.5V8h2v6H8z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1.5" y="1.5" width="11" height="11" rx="3"/><circle cx="7" cy="7" r="2.5"/><circle cx="10.5" cy="3.5" r=".6" fill="currentColor"/></svg></a>
              <a href="#" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M13.5 4.2c-.2-.7-.7-1.2-1.4-1.4C10.8 2.5 7 2.5 7 2.5s-3.8 0-5.1.3c-.7.2-1.2.7-1.4 1.4C.2 5.5.2 7 .2 7s0 1.5.3 2.8c.2.7.7 1.2 1.4 1.4 1.3.3 5.1.3 5.1.3s3.8 0 5.1-.3c.7-.2 1.2-.7 1.4-1.4.3-1.3.3-2.8.3-2.8s0-1.5-.3-2.8zM5.6 9.3V4.7L9.4 7l-3.8 2.3z"/></svg></a>
            </div>
            <h5>Légal</h5>
            <ul>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ensemble scolaire Marie de Galilée — Tous droits réservés</span>
          <span>Sous contrat d'association avec l'État</span>
        </div>
      </div>
    </footer>
  );
}

// ───── Tweaks panel ─────
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Identité visuelle" />
      <TweakColor
        label="Palette"
        value={t.palette}
        options={[
          ["#1a5837", "#e8a93c", "#faf7ef"],
          ["#0f4429", "#d99a2b", "#f7f3e8"],
          ["#1a2744", "#c8a96e", "#faf7f2"],
          ["#2c2c2c", "#e8a93c", "#f7f3e8"],
          ["#5a2a2a", "#e8a93c", "#faf6ef"]
        ]}
        onChange={(v) => setTweak("palette", v)}
      />
      <TweakRadio
        label="Pairing typo"
        value={t.fontPair}
        options={["cormorant-manrope", "playfair-inter"]}
        onChange={(v) => setTweak("fontPair", v)}
      />
      <TweakSection label="Hero" />
      <TweakRadio
        label="Mise en page"
        value={t.heroLayout}
        options={["split", "centré"]}
        onChange={(v) => setTweak("heroLayout", v)}
      />
      <TweakToggle
        label="Carte flottante 98%"
        value={t.showFloatingCard}
        onChange={(v) => setTweak("showFloatingCard", v)}
      />
      <TweakSection label="Établissements" />
      <TweakRadio
        label="Accents cartes"
        value={t.etabAccent}
        options={["varied", "marine"]}
        onChange={(v) => setTweak("etabAccent", v)}
      />
    </TweaksPanel>
  );
}

// ───── App ─────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [navOpen, setNavOpen] = useState(false);

  // Apply palette
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--navy", t.palette[0]);
    r.setProperty("--navy-deep", shade(t.palette[0], -10));
    r.setProperty("--navy-soft", shade(t.palette[0], 14));
    r.setProperty("--gold", t.palette[1]);
    r.setProperty("--gold-warm", shade(t.palette[1], -8));
    r.setProperty("--ivory", t.palette[2]);
    r.setProperty("--ivory-2", shade(t.palette[2], -5));
    r.setProperty("--ink", t.palette[0]);
    r.setProperty("--acc-marine", t.etabAccent === "marine" ? t.palette[0] : "#1a2744");
    if (t.etabAccent === "marine") {
      r.setProperty("--acc-brown", t.palette[0]);
      r.setProperty("--acc-green", t.palette[0]);
      r.setProperty("--acc-violet", t.palette[0]);
    } else {
      r.setProperty("--acc-brown", "#7a5a3f");
      r.setProperty("--acc-green", "#3f6b4e");
      r.setProperty("--acc-violet", "#5d4a7a");
    }
  }, [t.palette, t.etabAccent]);

  // Apply font pair
  useEffect(() => {
    const r = document.documentElement.style;
    if (t.fontPair === "playfair-inter") {
      r.setProperty("--serif", '"Playfair Display", "Times New Roman", serif');
      r.setProperty("--sans", '"Inter", -apple-system, system-ui, sans-serif');
      // load fonts on demand
      if (!document.getElementById("alt-fonts")) {
        const l = document.createElement("link");
        l.id = "alt-fonts";
        l.rel = "stylesheet";
        l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap";
        document.head.appendChild(l);
      }
    } else {
      r.setProperty("--serif", '"Cormorant Garamond", "Times New Roman", serif');
      r.setProperty("--sans", '"Manrope", -apple-system, system-ui, sans-serif');
    }
  }, [t.fontPair]);

  return (
    <>
      <Nav open={navOpen} setOpen={setNavOpen} />
      <main>
        {t.heroLayout === "centré"
          ? <HeroCentered showFloating={t.showFloatingCard} />
          : <Hero showFloating={t.showFloatingCard} />}
        <Stats />
        <Etablissements />
        <Valeurs />
        <Testimonial />
        <Inscription />
      </main>
      <Footer />
      <Tweaks t={t} setTweak={setTweak} />
    </>
  );
}

// Centered hero variant
function HeroCentered({ showFloating }) {
  return (
    <section className="hero" style={{ paddingTop: 80, paddingBottom: 0 }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 880 }}>
        <Reveal>
          <div className="hero-eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot"></span>
            <span className="eyebrow">Vosges · Saint-Dié & Raon-l'Étape</span>
          </div>
          <h1 className="h-display hero-title" style={{ fontSize: "clamp(44px,6vw,84px)" }}>
            De la maternelle au BTS,<br />
            un projet éducatif <span className="accent">d'exception</span>.
          </h1>
          <p className="hero-sub" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            Quatre établissements, une même ambition : la réussite et l'épanouissement
            de chaque enfant, dans un cadre humain, exigeant et chaleureux.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href="#etablissements" className="btn btn-gold">
              Choisir mon établissement <Arrow />
            </a>
            <a href="#inscription" className="btn btn-ghost">Prendre rendez-vous</a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ marginTop: 64, aspectRatio: "16/7", position: "relative" }}>
            <Placeholder label="Photo d'ambiance — vie scolaire" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ───── Color util ─────
function shade(hex, pct) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (pct / 100) * 255)));
  return "#" + [adj(r), adj(g), adj(b)].map(c => c.toString(16).padStart(2, "0")).join("");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
