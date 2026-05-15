import {
  certifications,
  contentSource,
  education,
  experience,
  profile,
  projects,
} from './data/content';

function App() {
  const profilePhoto = profile.photo ?? '/media/placeholders/profile-photo.svg';
  const resumeLabel = profile.resume?.endsWith('.pdf') ? 'Download resume' : 'Open resume';

  const heroHighlights = [
    'Enterprise IT support plus cloud engineering projects',
    'AWS, Terraform, GitHub Actions, IAM, and OIDC',
    'Infrastructure-first mindset with documentation habits',
  ];

  const cloudSkills = [
    'AWS',
    'Terraform',
    'Infrastructure as Code',
    'GitHub Actions',
    'IAM',
    'OIDC Federation',
    'AWS Lambda',
    'Amazon API Gateway',
    'Amazon CloudWatch',
    'Amazon S3',
    'Amazon CloudFront',
    'VPC Networking',
    'Public & Private Subnets',
    'Serverless Architecture',
  ];

  const enterpriseSkills = [
    'Active Directory',
    'Microsoft Entra ID',
    'Microsoft 365',
    'Microsoft Teams',
    'Microsoft Copilot',
    'Citrix Support',
    'Tricerat ScrewDrivers',
    'Print Infrastructure Support',
    'Direct IP Printing Migration',
    'Quest KACE',
    'VMware',
    'Endpoint Support',
    'MFA Support',
    'OneDrive Troubleshooting',
    'VLAN Coordination',
    'Windows Troubleshooting',
    'PowerShell',
    'Technical Documentation',
  ];

  const strengths = [
    'Technical troubleshooting',
    'End-user support',
    'Bilingual communication',
    'Documentation',
    'Cross-team collaboration',
    'Problem solving',
    'Adaptability',
    'Customer service',
    'Learning complex systems quickly',
  ];

  const contactLinks = profile.links;
  const githubLink = contactLinks.find((link) => link.label === 'GitHub');
  const linkedinLink = contactLinks.find((link) => link.label === 'LinkedIn');
  const emailLink = contactLinks.find((link) => link.label === 'Email');

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Cloud engineering portfolio</p>
            <span className="status-badge">
              {contentSource.profile === 'local' ? 'Private content active' : 'Example content active'}
            </span>
          </div>

          <h1>{profile.name}</h1>
          <p className="lede">{profile.role}</p>
          <p className="summary">{profile.summary}</p>

          <div className="actions">
            {githubLink ? (
              <a href={githubLink.href} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {linkedinLink ? (
              <a href={linkedinLink.href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
            {emailLink ? (
              <a href={emailLink.href} target="_blank" rel="noreferrer">
                Email
              </a>
            ) : null}
            {profile.resume ? (
              <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">
                {resumeLabel}
              </a>
            ) : null}
          </div>

          <ul className="hero-highlights" aria-label="Homepage highlights">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="hero-card">
          <div className="hero-portrait">
            <img src={profilePhoto} alt={`${profile.name} portrait`} />
          </div>
          <div className="hero-card-block">
            <p className="card-label">Current focus</p>
            <strong>Infrastructure-focused IT professional transitioning into Cloud Engineering</strong>
            <span>{profile.location}</span>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Cloud stack</p>
            <p>AWS, Terraform, GitHub Actions, IAM, OIDC, CloudFront, S3, Lambda, and API Gateway.</p>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Enterprise background</p>
            <p>
              Active Directory, Entra ID, Citrix, KACE, VMware, printing workflows, and technical support in a manufacturing
              environment.
            </p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Infrastructure support and cloud projects come together in one practical, recruiter-friendly story.</h2>
        </div>
        <div className="about-grid">
          <article className="detail-card">
            <p className="card-label">Summary</p>
            <p>{profile.summary}</p>
          </article>
          <article className="detail-card">
            <p className="card-label">How I work</p>
            <ul className="detail-list">
              <li>Focus on systems, networking, and secure delivery.</li>
              <li>Document what I build so others can follow it.</li>
              <li>Use troubleshooting and support work to sharpen cloud judgment.</li>
              <li>Keep the public site clean while preserving private content locally.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>A mix of cloud engineering, enterprise support, and practical troubleshooting.</h2>
        </div>
        <div className="skills-grid">
          <article className="detail-card">
            <p className="card-label">Cloud & infrastructure</p>
            <div className="chip-row">
              {cloudSkills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
          <article className="detail-card">
            <p className="card-label">Enterprise IT</p>
            <div className="chip-row">
              {enterpriseSkills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
          <article className="detail-card">
            <p className="card-label">Professional strengths</p>
            <div className="chip-row">
              {strengths.map((strength) => (
                <span className="chip" key={strength}>
                  {strength}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Real-world support work that builds the judgment behind cloud engineering.</h2>
        </div>
        <div className="timeline-grid">
          {experience.map((item) => (
            <article className="timeline-card" key={`${item.company}-${item.role}`}>
              <div className="timeline-card-head">
                <div>
                  <p className="card-label">{item.company}</p>
                  <h3>{item.role}</h3>
                </div>
                {item.dates ? <span className="timeline-date">{item.dates}</span> : null}
              </div>
              <p>{item.summary}</p>
              {item.responsibilities ? (
                <ul className="detail-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Hands-on work that shows cloud, automation, and support skills in context.</h2>
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

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Certifications</p>
          <h2>Credentials that support the cloud engineering transition.</h2>
        </div>
        <div className="grid-compact">
          {certifications.map((certification) => (
            <article className="detail-card" key={certification.name}>
              <p className="card-label">{certification.issuer ?? 'Certification'}</p>
              <h3>{certification.name}</h3>
              {certification.status ? <p>{certification.status}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h2>Formal training that adds communication, performance, and teaching experience to the technical work.</h2>
        </div>
        <div className="grid-compact">
          {education.map((item) => (
            <article className="detail-card" key={`${item.school}-${item.degree}`}>
              <p className="card-label">{item.school}</p>
              <h3>{item.degree}</h3>
              <p>{item.dates}</p>
              {item.details ? (
                <ul className="detail-list">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Contact and resume</p>
          <h2>Simple ways to review the site, open the resume, and reach out.</h2>
        </div>
        <div className="contact-grid">
          <article className="detail-card">
            <p className="card-label">Contact</p>
            <h3>{profile.name}</h3>
            <p>{profile.location}</p>
            <div className="stack-links">
              {emailLink ? (
                <a href={emailLink.href} target="_blank" rel="noreferrer">
                  Email
                </a>
              ) : null}
              {githubLink ? (
                <a href={githubLink.href} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              {linkedinLink ? (
                <a href={linkedinLink.href} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              ) : null}
            </div>
          </article>
          <article className="detail-card">
            <p className="card-label">Resume download</p>
            <h3>Current resume</h3>
            <p>
              Open the resume file stored in the private content path. If you switch to a PDF later, the same link pattern
              will still work.
            </p>
            {profile.resume ? (
              <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">
                {resumeLabel}
              </a>
            ) : (
              <p>TODO: add resume path in private-content/data/profile.local.json</p>
            )}
          </article>
        </div>
      </section>

      <section className="section section-footer">
        <p className="eyebrow">Portfolio shape</p>
        <p>
          The site now presents a full cloud engineering story: enterprise IT support, hands-on AWS projects, education,
          certifications, and direct contact paths.
        </p>
      </section>
    </main>
  );
}

export default App;
