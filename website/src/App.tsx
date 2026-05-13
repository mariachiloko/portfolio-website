import { contentSource, profile, projects } from './data/content';

function App() {
  const highlights = [
    'Private S3 origin behind CloudFront',
    'GitHub OIDC deploys with short-lived AWS access',
    'Local content fallback for private profile and project data',
  ];

  const recruiterSignals = [
    {
      label: 'Infrastructure',
      title: 'AWS-first delivery model',
      body: 'Shows Terraform-managed hosting, DNS, and deployment patterns without long-lived credentials.',
    },
    {
      label: 'Security',
      title: 'Public repo, private content',
      body: 'Keeps the public repository reusable while local-only content stays out of version control.',
    },
    {
      label: 'Frontend',
      title: 'Responsive React interface',
      body: 'Uses a compact information hierarchy that reads cleanly on desktop and mobile screens.',
    },
  ];

  const deliverySteps = [
    'Local example data fills the page until private content is available.',
    'GitHub Actions builds the static site from the same codebase.',
    'CloudFront serves the result from a private S3 origin over HTTPS.',
  ];

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">AWS portfolio scaffold</p>
            <span className="status-badge">
              {contentSource.profile === 'local' ? 'Private content active' : 'Example content active'}
            </span>
          </div>
          <h1>{profile.name}</h1>
          <p className="lede">{profile.role}</p>
          <p className="summary">{profile.summary}</p>
          <div className="actions">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <ul className="hero-highlights" aria-label="Homepage highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="hero-card">
          <div className="hero-card-block">
            <p className="card-label">Content source</p>
            <strong>{contentSource.profile}</strong>
            <span>{profile.location}</span>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Project data</p>
            <strong>{contentSource.projects}</strong>
            <p>
              {contentSource.projects === 'local'
                ? 'Private project content is being used.'
                : 'Example project content is being used.'}
            </p>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Delivery model</p>
            <p>The public scaffold stays reusable while the live site can load private content locally.</p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Recruiter signals</p>
          <h2>Built to communicate the stack, the delivery model, and the outcome quickly.</h2>
        </div>
        <div className="insight-grid">
          {recruiterSignals.map((item) => (
            <article className="insight-card" key={item.title}>
              <p className="card-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Core strengths</p>
          <h2>The skill set stays visible in a compact format recruiters can scan quickly.</h2>
        </div>
        <div className="pill-grid">
          {profile.strengths.map((strength) => (
            <span className="pill" key={strength}>
              {strength}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Delivery path</p>
          <h2>The same code path can support the public example site and the private production version.</h2>
        </div>
        <div className="delivery-grid">
          {deliverySteps.map((step, index) => (
            <article className="delivery-card" key={step}>
              <p className="card-label">Step {index + 1}</p>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured projects</p>
          <h2>Representative projects show the delivery story without exposing personal details.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <p className="card-label">{project.tag}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="chip-row">
                {project.stack.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <p className="outcome">{project.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-footer">
        <p className="eyebrow">Portfolio shape</p>
        <p>
          Public example content stays generic, while local-only files can supply the private version when you are ready to
          deploy it.
        </p>
      </section>
    </main>
  );
}

export default App;
