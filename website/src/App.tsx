import { useEffect, useMemo, useState } from 'react';
import {
  certifications,
  contentSource,
  education,
  experience,
  profile,
  projects,
} from './data/content';

function getCurrentPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return window.location.pathname.replace(/\/+$/, '') || '/';
}

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

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 Miguel Cervantes All rights reserved</p>
      <p>
        Made with <span aria-hidden="true">♥</span> and React
      </p>
    </footer>
  );
}

function HomePage() {
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
    ['/about/', 'about'],
    ['#experience', 'experience'],
    ['#education', 'education'],
    ['#projects', 'projects'],
    ['#achievements', 'achievements'],
    ['#contact', 'contact'],
  ] as const;

  const [activeExperience, setActiveExperience] = useState(experience[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home">
          Miguel Cervantes
        </a>

        <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Primary">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
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
          <h3>Windows • Active Directory • Microsoft 365 • Citrix • Networking • VMware</h3>
          <p>{profile.summary}</p>
          <div className="hero-metrics" aria-label="Profile highlights">
            <span>Windows Support</span>
            <span>AD + M365</span>
            <span>Networking + Citrix</span>
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
        <h2>Featured</h2>

        <div className="project-list">
          <a className="project-row" href={profile.resume ?? '/resume/miguel-cervantes-resume.pdf'}>
            <div className="project-row-head">
              <div>
                <div className="project-meta">Resume PDF</div>
                <h3>Systems Administrator Resume</h3>
              </div>
              <span className="coming-soon">download</span>
            </div>
            <p>Download the resume recruiters should read first.</p>
            <p className="project-outcome">Support-first systems, identity, networking, and infrastructure experience.</p>
          </a>

          {projects.slice(0, 2).map((project) => (
            <article className="project-row" key={project.title}>
              <div className="project-row-head">
                <div>
                  <div className="project-meta">{project.stack.slice(0, 4).join('  ')}</div>
                  <h3>{project.title}</h3>
                </div>
                <span className="coming-soon">featured</span>
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

      <SiteFooter />

      <div className="content-source">
        {contentSource.profile === 'local' ? 'Private content active' : 'Example content active'}
      </div>
    </>
  );
}

function AboutPage() {
  const resumeLink = profile.resume ?? '/resume/miguel-cervantes-resume.pdf';
  const storyParagraphs = [
    'I grew up in a family of mariachi musicians, so music has always been part of my life. That background first led me into music education, but while helping grow our family business I became interested in how marketing, audio production, and websites could help us reach more people. As I worked on those projects, I found that I enjoyed the technical side just as much as the creative side.',
    'I started learning how to build and troubleshoot websites, audio setups, and everyday devices, and I naturally became the person people came to when something was not working. In school, that often meant helping teachers with their computers. Over time, that interest turned into a real career direction.',
    'During my master’s program in music, I took a step back and thought carefully about what I wanted to do next. My degree was in music, but I realized I wanted a new challenge and a long-term career in technology. I earned my first certification, landed my first IT role, and grew from help desk into broader support responsibilities.',
    'Today, I focus on systems administration and infrastructure support in enterprise environments. My work centers on Windows endpoints, Active Directory, Microsoft 365, Exchange, Citrix, printers, networking, and VMware, with AWS and Terraform continuing to grow as practical skills I apply through real projects. Music is still part of my life, but technology is now my primary career path.',
  ];

  const competencyBlocks = [
    {
      title: 'Windows, Identity, and Messaging',
      items: ['Windows 10/11', 'Active Directory', 'Microsoft 365', 'Exchange', 'Entra ID', 'Intune', 'MFA'],
    },
    {
      title: 'Networking and Access',
      items: ['DNS', 'DHCP', 'TCP/IP', 'VLANs', 'VPNs', 'Citrix'],
    },
    {
      title: 'Endpoints and Printing',
      items: ['Endpoint support', 'Imaging', 'Enterprise printing', 'Zebra printers', 'KACE', 'Device compliance'],
    },
    {
      title: 'Cloud and Automation',
      items: ['AWS', 'Terraform', 'PowerShell', 'Git/GitHub', 'Secure deployments', 'Documentation'],
    },
  ];

  return (
    <main className="page about-page">
      <header className="about-header">
        <a className="about-back" href="/">
          ← Back to Home
        </a>
        <ThemeToggle />
      </header>

      <section className="section-card about-hero">
        <p className="eyebrow">About Me.</p>
        <h1>The path behind the work</h1>
        <p className="about-lede">
          Support-first systems work shaped by music, troubleshooting, and practical infrastructure ownership.
        </p>

        <div className="about-story">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2>Core Competencies</h2>
        <p className="section-intro">The tools and environments I use to solve problems daily.</p>

        <div className="about-competency-grid">
          {competencyBlocks.map((block) => (
            <article className="about-competency-card" key={block.title}>
              <h3>{block.title}</h3>
              <ul className="about-list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2>Education & Certifications</h2>
        <p className="section-intro">Proof of the path I have built across music, support, and infrastructure.</p>

        <div className="about-credential-grid">
          <div>
            <p className="subheading">Education</p>
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
          </div>

          <div>
            <p className="subheading">Certifications</p>
            <div className="supporting-certifications about-certifications">
              {certifications.map((certification) => (
                <article className="supporting-certification" key={certification.name}>
                  <h3>{certification.name}</h3>
                  <p>
                    {certification.issuer}
                    {certification.status ? ` • ${certification.status}` : ''}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h2>Let&apos;s Connect</h2>
        <p className="contact-copy">
          If you are looking for someone who can support users, troubleshoot systems, and keep infrastructure moving,
          I would love to connect.
        </p>

        <div className="contact-links">
          <a href={resumeLink}>resume</a>
          {profile.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label.toLowerCase()}
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />

      <div className="content-source">
        {contentSource.profile === 'local' ? 'Private content active' : 'Example content active'}
      </div>
    </main>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme ?? 'light';
    document.title =
      getCurrentPathname() === '/about' ? 'About Miguel Cervantes' : 'Miguel Cervantes | Systems Administrator & Infrastructure Engineer';
  }, []);

  return getCurrentPathname() === '/about' ? <AboutPage /> : <main className="page"><HomePage /></main>;
}

export default App;
