// app.jsx — Marie de Galilée landing page

const { useState, useEffect, useRef } = React;

// ───── Tweak defaults (writable by host) ─────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#3d2845", "#e8a93c", "#faf5e8"],
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
  const src = variant === "alt" ? "assets/logo-beau-jardin.png" : "assets/logo-mdg.png";
  return (
    <a href="#" className={`logo logo-img ${light ? "logo-light" : ""}`} aria-label="Ensemble scolaire Marie de Galilée">
      <img src={src} alt="Ensemble scolaire Marie de Galilée" />
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

// ───── Tarifs data ─────
const ETAB_TARIFS = [
  {
    name: "Externat Sainte-Thérèse",
    levels: "Maternelle · Primaire — Raon-l'Étape",
    accent: "var(--acc-marine)",
    rates: [
      { label: "Contribution scolaire annuelle", indic: true, value: "Sur demande", unit: "selon QF" },
      { label: "Restauration & garderie", indic: true, value: "Sur demande", unit: "" }
    ],
    notes: [
      <span><strong>Tarifs modulés selon le quotient familial</strong>. Réductions appliquées à partir du 2ᵉ enfant. Prendre contact avec la direction pour un devis personnalisé.</span>
    ],
    contact: { tel: "03 29 41 44 43", url: "https://externat-saintetherese.fr/", urlLabel: "externat-saintetherese.fr" }
  },
  {
    name: "Institution Sainte-Marie",
    levels: "Maternelle · Primaire · Collège — Saint-Dié",
    accent: "var(--acc-brown)",
    rates: [
      { label: "Contribution scolaire annuelle", indic: true, value: "Sur demande", unit: "facturation en septembre" },
      { label: "Repas occasionnel au self", value: "6,35 €", unit: "/ repas" },
      { label: "Garderie matinale", value: "2 €", unit: "/ heure (ou 1 € / 30 min)" }
    ],
    notes: [
      <span><strong>Facture annuelle prélevée sur 10 mois</strong>, d'octobre à juillet. Garderie disponible de 7h30 à 18h45, étude du soir incluse.</span>,
      <span>Les absences pour convenances personnelles ne sont pas remboursées.</span>
    ],
    contact: { tel: "03 29 55 34 66", url: "https://www.saintemarie-stdie.fr/", urlLabel: "saintemarie-stdie.fr" }
  },
  {
    name: "Notre-Dame de la Providence",
    levels: "École · Collège · Lycée pro — Saint-Dié",
    accent: "var(--acc-violet)",
    rates: [
      { label: "Contribution scolaire", indic: true, value: "4 tranches QF", unit: "école & lycée pro · 3 tranches collège" },
      { label: "Restauration · 4 repas / sem.", value: "102 €", unit: "/ mois" },
      { label: "Repas avec Cité-PASS", value: "75 — 94 €", unit: "/ mois · Déodatiens" },
      { label: "Repas occasionnel Cité-PASS", value: "5,30 — 6,60 €", unit: "/ repas" },
      { label: "Garderie matin · 7h15-7h45", value: "103 €", unit: "/ an" },
      { label: "Étude du soir · 16h30-18h30", value: "205 — 411 €", unit: "/ an · selon créneau" }
    ],
    notes: [
      <span><strong>Tarifs différenciés selon le quotient familial</strong> à partir de la rentrée 2024. Quatre tranches pour l'école et le lycée pro, trois tranches pour le collège.</span>,
      <span>La <strong>Carte Cité-PASS</strong> permet aux enfants domiciliés à Saint-Dié de bénéficier de tarifs modulés sur la restauration.</span>
    ],
    contact: { tel: "03 29 56 96 53", url: "https://institutionlaprovidence.fr/accueil/", urlLabel: "institutionlaprovidence.fr" }
  },
  {
    name: "Lycée Beau Jardin",
    levels: "2ⁿᵈᵉ · 1ʳᵉ · Tle · BTS — Saint-Dié",
    accent: "var(--acc-green)",
    rates: [
      { label: "Contribution scolaire annuelle", indic: true, value: "Sur demande", unit: "selon filière (général · STMG · BTS)" },
      { label: "Demi-pension au self", indic: true, value: "Sur demande", unit: "" },
      { label: "Internat (60 places)", indic: true, value: "Sur demande", unit: "filles & garçons" }
    ],
    notes: [
      <span>Établissement <strong>sous contrat d'association</strong> avec l'État. Les <strong>bourses nationales du second degré</strong> et les bourses au mérite sont accessibles aux familles éligibles.</span>,
      <span>L'internat accueille également les élèves de Notre-Dame de la Providence.</span>
    ],
    contact: { tel: "03 29 56 13 52", url: "https://www.lycee-beaujardin.fr/", urlLabel: "lycee-beaujardin.fr" }
  }
];

const PRINCIPLES = [
  { num: "01", title: "Sous contrat d'association", desc: "L'État rémunère les enseignants. Les familles contribuent uniquement aux frais de fonctionnement et au caractère propre de l'établissement." },
  { num: "02", title: "Tarifs modulés selon le QF", desc: "Plusieurs tranches selon le quotient familial : chaque famille paie selon ses moyens, dans un esprit de solidarité éducative." },
  { num: "03", title: "Réductions fratries", desc: "Tarifs dégressifs à partir du deuxième enfant scolarisé dans l'ensemble. Le coût ne doit jamais empêcher une scolarité." }
];

const AIDES = [
  {
    num: "01",
    title: "Bourses nationales",
    desc: "Pour les collégiens et lycéens, sur demande auprès du secrétariat en début d'année. Les barèmes sont fixés par l'Éducation nationale.",
    items: ["Bourse de collège", "Bourse de lycée", "Bourse au mérite", "Prime à l'internat"]
  },
  {
    num: "02",
    title: "Bourses internes & fonds de solidarité",
    desc: "Les établissements disposent d'un fonds de solidarité pour accompagner les familles en difficulté ponctuelle. Demande confidentielle auprès du chef d'établissement.",
    items: ["Étude au cas par cas", "Aide aux voyages scolaires", "Soutien à la scolarité", "Contact direct & confidentiel"]
  },
  {
    num: "03",
    title: "Carte Cité-PASS",
    desc: "Réservée aux familles domiciliées à Saint-Dié-des-Vosges, la Carte Cité-PASS module le coût de la restauration scolaire selon le quotient familial.",
    items: ["Lettre A — tarif réduit", "Lettre B, C, D — tranches intermédiaires", "À demander en début d'année", "Cumulable avec les bourses"]
  },
  {
    num: "04",
    title: "Réductions fratries",
    desc: "Lorsque plusieurs enfants d'une même famille sont scolarisés dans l'ensemble Marie de Galilée, des réductions s'appliquent automatiquement sur la contribution des cadets.",
    items: ["2ᵉ enfant — réduction", "3ᵉ enfant — réduction renforcée", "Application automatique", "Aucune démarche supplémentaire"]
  }
];

// ───── Tarifs page ─────
function TarifsPage() {
  return (
    <>
      <section className="tarifs-hero">
        <div className="wrap tarifs-hero-grid">
          <Reveal>
            <span className="eyebrow">Tarifs &amp; inscriptions · 2026 — 2027</span>
            <h1>
              Une scolarité <span className="accent">accessible</span>,<br />
              modulée selon les ressources.
            </h1>
            <p className="lede">
              Marie de Galilée est un ensemble catholique sous contrat d'association avec l'État.
              Les contributions familiales financent uniquement le fonctionnement et le caractère
              propre — modulées par le quotient familial pour rester accessibles à tous.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <dl className="tarifs-hero-side">
              <dt>Statut</dt>
              <dd>Enseignement catholique sous contrat d'association avec l'État</dd>
              <dt>Modulation</dt>
              <dd>Tarifs différenciés selon le quotient familial (3 ou 4 tranches)</dd>
              <dt>Aides</dt>
              <dd>Bourses nationales · fonds de solidarité interne · Carte Cité-PASS</dd>
              <dt>Inscriptions</dt>
              <dd>Ouvertes — rendez-vous auprès de chaque établissement</dd>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="principles">
        <div className="wrap">
          <Reveal className="principles-head">
            <span className="eyebrow">Principes</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Trois engagements <em style={{ color: "var(--gold-warm)" }}>de transparence</em>.
            </h2>
          </Reveal>
          <div className="principles-grid">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.num} delay={i * 80} className="principle">
                <span className="principle-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="etab-tarifs">
        <div className="wrap">
          <Reveal className="etab-tarifs-head">
            <span className="eyebrow">Par établissement</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Tarifs <em style={{ color: "var(--gold-warm)" }}>indicatifs</em> par établissement.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Les montants ci-dessous sont communiqués à titre informatif. Pour un devis personnalisé
              tenant compte de votre quotient familial et du nombre d'enfants, contactez directement
              l'établissement concerné.
            </p>
          </Reveal>
          {ETAB_TARIFS.map((e, i) => (
            <Reveal key={e.name} className="etab-tarif" style={{ "--accent": e.accent }}>
              <div className="etab-tarif-id">
                <span className="num">0{i + 1} / 04</span>
                <h3>{e.name}</h3>
                <span className="levels">{e.levels}</span>
                <span className="accent-bar"></span>
                <div className="contact">
                  {e.contact.tel}<br />
                  <a href={e.contact.url} target="_blank" rel="noopener noreferrer">{e.contact.urlLabel} <Arrow /></a>
                </div>
              </div>
              <div className="etab-tarif-rates">
                {e.rates.map((r, j) => (
                  <div className="row" key={j}>
                    <span className="label">
                      {r.label}
                    </span>
                    <span className={`value ${r.indic ? "indicative" : ""}`}>
                      {r.value}
                      {r.unit && <span className="unit">{r.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
              <div className="etab-tarif-notes">
                {e.notes.map((n, j) => (
                  <p className="note" key={j}>{n}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="aides">
        <div className="wrap">
          <Reveal className="aides-head">
            <span className="eyebrow">Aides &amp; accompagnement</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Aucune famille <em style={{ color: "var(--gold-warm)" }}>laissée seule</em>.
            </h2>
            <p className="lede">
              Le coût de la scolarité ne doit jamais constituer un frein. Plusieurs dispositifs,
              cumulables, permettent à chaque famille d'accéder à l'enseignement de son choix.
            </p>
          </Reveal>
          <div className="aides-grid">
            {AIDES.map((a, i) => (
              <Reveal key={a.num} delay={i * 80} className="aide">
                <span className="aide-num">{a.num}</span>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
                <ul>
                  {a.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tarif-disclaimer">
        <div className="wrap">
          <div className="tarif-disclaimer-inner">
            <svg className="icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 7v5M11 14.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p>
              <strong>Information importante.</strong> Les tarifs publiés ici sont communiqués à titre
              indicatif d'après les informations officielles de chaque établissement (rentrée 2024 — 2025
              et suivantes). Ils peuvent évoluer chaque année. Pour un devis nominatif et personnalisé
              tenant compte de votre situation familiale, merci de prendre directement attache avec la
              direction de l'établissement concerné — un rendez-vous vous sera proposé dans les meilleurs
              délais.
            </p>
          </div>
        </div>
      </section>

      <Inscription />
    </>
  );
}

// ───── Sections ─────
function Nav({ open, setOpen, route }) {
  const navTo = (e, target) => {
    if (route === 'tarifs') {
      e.preventDefault();
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
      }, 60);
    }
  };
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#" onClick={(e)=>{e.preventDefault();window.location.hash='';window.scrollTo({top:0,behavior:'smooth'})}} className="logo logo-img" aria-label="Ensemble scolaire Marie de Galilée">
          <img src="assets/logo-mdg.png" alt="Ensemble scolaire Marie de Galilée" />
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <a href="#etablissements" onClick={(e)=>navTo(e,'etablissements')}>Nos établissements</a>
          <a href="#valeurs" onClick={(e)=>navTo(e,'valeurs')}>Nos valeurs</a>
          <a href="#tarifs" className={route==='tarifs'?'active':''}>Tarifs</a>
          <a href="#contact" onClick={(e)=>navTo(e,'contact')}>Contact</a>
          <a href="#inscription" className="nav-cta" onClick={(e)=>navTo(e,'inscription')}>Inscription</a>
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
          ["#3d2845", "#e8a93c", "#faf5e8"],
          ["#2d1f15", "#e8a93c", "#f7f0db"],
          ["#1a1612", "#e8a93c", "#faf6ec"],
          ["#1a5837", "#e8a93c", "#faf7ef"],
          ["#3d2540", "#d49680", "#faf3ee"]
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

// ───── Hash route ─────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash === '#tarifs' ? 'tarifs' : 'home';
}

// ───── App ─────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [navOpen, setNavOpen] = useState(false);
  const route = useHashRoute();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); }, [route]);

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
    r.setProperty("--acc-marine", t.etabAccent === "marine" ? t.palette[0] : "#4a8a9e");
    if (t.etabAccent === "marine") {
      r.setProperty("--acc-brown", t.palette[0]);
      r.setProperty("--acc-green", t.palette[0]);
      r.setProperty("--acc-violet", t.palette[0]);
    } else {
      r.setProperty("--acc-brown", "#d49680");
      r.setProperty("--acc-green", "#5a8859");
      r.setProperty("--acc-violet", "#7d5c95");
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
      <Nav open={navOpen} setOpen={setNavOpen} route={route} />
      <main>
        {route === 'tarifs' ? <TarifsPage /> : (
          <>
            {t.heroLayout === "centré"
              ? <HeroCentered showFloating={t.showFloatingCard} />
              : <Hero showFloating={t.showFloatingCard} />}
            <Stats />
            <Etablissements />
            <Valeurs />
            <Testimonial />
            <Inscription />
          </>
        )}
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
