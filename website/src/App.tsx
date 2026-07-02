import { useEffect, useMemo, useState } from 'react';
import {
  certifications,
  contentSource,
  education,
  experience,
  profile,
  projects,
} from './data/content';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.localStorage.getItem('portfolio-theme') !== 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setDarkMode((value) => !value)}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span aria-hidden="true">{darkMode ? '◐' : '◑'}</span>
    </button>
  );
}

function App() {
  const profilePhoto = profile.photo ?? '/media/placeholders/profile-photo.svg';
  const featuredCertifications = useMemo(
    () => certifications.filter((certification) => certification.badge),
    [],
  );
  const supportingCertifications = useMemo(
    () => certifications.filter((certification) => !certification.badge),
    [],
  );

  const navLinks = [
    ['about', 'about'],
    ['experience', 'experience'],
    ['education', 'education'],
    ['projects', 'projects'],
    ['achievements', 'achievements'],
    ['contact', 'contact'],
  ] as const;

  const [activeExperience, setActiveExperience] = useState(experience[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme ?? 'light';
  }, []);

  return (
    <main className="page">
      <header className="site-header">
        <a className="brand" href="#home">
          Miguel Cervantes
        </a>

        <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Primary">
          {navLinks.map(([href, label]) => (
            <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Hello, my name is</p>
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <h3>Enterprise IT • Hybrid Microsoft • AWS • Terraform • Automation • AI</h3>
          <p>{profile.summary}</p>
          <div className="hero-metrics" aria-label="Profile highlights">
            <span>Hybrid Microsoft</span>
            <span>AWS + Terraform</span>
            <span>Automation + AI</span>
          </div>
        </div>

        <div className="hero-image">
          <img src={profilePhoto} alt={`${profile.name} profile image`} />
        </div>
      </section>

      <section className="about section-card" id="about">
        <h2>Summary</h2>

        <div className="about-layout">
          <div className="about-copy">
            <p>
              Systems administrator and infrastructure engineer with nearly three years of enterprise IT experience
              supporting 750+ users across 10 manufacturing locations. I focus on troubleshooting, repeatable
              operations, secure access, and practical infrastructure work across hybrid Microsoft, endpoint,
              printing, networking, AWS, Terraform, and automation environments.
            </p>
            <p>
              My background combines enterprise support at Ulbrich, a former Chicago Public Schools music teaching
              role, and Mariachi Ameca technology ownership. I bridge systems and people by explaining technical
              issues clearly, onboarding users, documenting processes, and learning quickly.
            </p>

            <p className="subheading">Core skills</p>
            <ul className="about-list">
              {profile.strengths.slice(0, 8).map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-card" id="experience">
        <h2>Experience</h2>

        <div className="tab-bar" role="tablist" aria-label="Experience roles">
          {experience.map((item) => (
            <button
              key={item.company}
              type="button"
              role="tab"
              aria-selected={activeExperience.company === item.company}
              className={activeExperience.company === item.company ? 'tab active' : 'tab'}
              onClick={() => setActiveExperience(item)}
            >
              {item.company}
            </button>
          ))}
        </div>

        <article className="experience-panel">
          <div className="experience-head">
            <div>
              <p className="eyebrow">{activeExperience.company}</p>
              <h3>{activeExperience.role}</h3>
            </div>
            {activeExperience.dates ? <span className="pill">{activeExperience.dates}</span> : null}
          </div>
          <p>{activeExperience.summary}</p>
          <ul className="about-list">
            {activeExperience.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-card" id="education">
        <h2>Education</h2>

        <div className="stack-grid">
          {education.map((item) => (
            <article className="stack-card" key={`${item.school}-${item.degree}`}>
              <p className="stack-date">{item.dates}</p>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              {item.details?.length ? (
                <ul className="stack-details">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" id="projects">
        <h2>Selected Work</h2>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <div className="project-row-head">
                <div>
                  <div className="project-meta">{project.stack.slice(0, 4).join('  ')}</div>
                  <h3>{project.title}</h3>
                </div>
                {index < 3 ? <span className="coming-soon">coming soon</span> : null}
              </div>
              <p>{project.summary}</p>
              <p className="project-outcome">{project.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" id="achievements">
        <h2>Certifications</h2>

        <div className="cert-grid">
          {featuredCertifications.map((certification) => (
            <article className="cert-card" key={certification.name}>
              <img src={certification.badge} alt={certification.name} className="cert-image" />
              <h3>{certification.name}</h3>
              <p>
                {certification.issuer}
                {certification.status ? ` • ${certification.status}` : ''}
              </p>
              {certification.url ? (
                <a href={certification.url} target="_blank" rel="noreferrer">
                  View badge
                </a>
              ) : null}
            </article>
          ))}
        </div>

        {supportingCertifications.length ? (
          <div className="supporting-certifications">
            {supportingCertifications.map((certification) => (
              <article className="supporting-certification" key={certification.name}>
                <h3>{certification.name}</h3>
                <p>
                  {certification.issuer}
                  {certification.status ? ` • ${certification.status}` : ''}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="section-card" id="contact">
        <h2>Contact</h2>
        <p className="contact-copy">
          Based in the Chicago area and open to systems administration, infrastructure support, cloud support, and
          cloud infrastructure opportunities.
        </p>

        <div className="contact-links">
          {profile.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label.toLowerCase()}
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2026 Miguel Cervantes All rights reserved</p>
        <p>
          Made with <span aria-hidden="true">♥</span> and React
        </p>
      </footer>

      <div className="content-source">
        {contentSource.profile === 'local' ? 'Private content active' : 'Example content active'}
      </div>
    </main>
  );
}

export default App;
