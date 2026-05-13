import { contentSource, profile, projects } from './data/content';

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AWS portfolio scaffold</p>
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
        </div>
        <aside className="hero-card">
          <p className="card-label">Content source</p>
          <strong>{contentSource.profile}</strong>
          <span>{profile.location}</span>
          <p>{contentSource.projects === 'local' ? 'Local project overrides are active.' : 'Example project data is active.'}</p>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Focus areas</p>
          <h2>Built to show infrastructure, delivery, and frontend fundamentals.</h2>
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
          <p className="eyebrow">Featured projects</p>
          <h2>Example projects stay generic until local content replaces them.</h2>
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
    </main>
  );
}

export default App;
