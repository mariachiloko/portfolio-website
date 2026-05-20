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
    'AWS/Terraform infrastructure and deployment automation',
    'Enterprise identity, endpoint, and production support',
    'Systems analysis mindset with documented runbooks',
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
  const featuredCertifications = certifications.filter((certification) => certification.badge);
  const supportingCertifications = certifications.filter((certification) => !certification.badge);

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Cloud operations portfolio</p>
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
            <strong>Infrastructure-focused IT professional working across cloud operations, automation, and systems analysis.</strong>
            <span>{profile.location}</span>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Cloud stack</p>
            <p>AWS, Terraform, GitHub Actions, IAM, OIDC, CloudFront, S3, Lambda, and API Gateway.</p>
          </div>
          <div className="hero-card-block">
            <p className="card-label">Enterprise background</p>
            <p>
              Active Directory, Entra ID, Citrix, KACE, VMware, printing workflows, and technical support in a
              manufacturing environment.
            </p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Enterprise operations and AWS projects come together in one practical cloud operations story.</h2>
        </div>
        <div className="about-grid">
          <article className="detail-card">
            <p className="card-label">Summary</p>
            <p>{profile.summary}</p>
          </article>
          <article className="detail-card">
            <p className="card-label">How I work</p>
            <ul className="detail-list">
              <li>Connect support work to systems reliability, access control, and operational risk.</li>
              <li>Document workflows so infrastructure changes are repeatable and easier to hand off.</li>
              <li>Use troubleshooting and production support work to sharpen cloud operations judgment.</li>
              <li>Keep the public site clean while preserving private content locally.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>A mix of cloud operations, infrastructure automation, enterprise support, and practical troubleshooting.</h2>
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
          <h2>Real-world operations work that builds the judgment behind cloud infrastructure.</h2>
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
          <h2>Verified badges first, with supporting credentials underneath.</h2>
        </div>
        <div className="cert-grid">
          {featuredCertifications.map((certification) => (
            <article className="cert-card" key={certification.name}>
              <div className="cert-card-media">
                <img src={certification.badge} alt={`${certification.name} badge`} loading="lazy" />
              </div>
              <div className="cert-card-body">
                <p className="card-label">{certification.issuer ?? 'Certification'}</p>
                <h3>{certification.name}</h3>
                {certification.status ? <p>{certification.status}</p> : null}
                {certification.url ? (
                  <a className="cert-card-link" href={certification.url} target="_blank" rel="noreferrer">
                    View badge
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        {supportingCertifications.length ? (
          <div className="supporting-certs">
            <p className="card-label">Additional certifications</p>
            <div className="supporting-cert-list">
              {supportingCertifications.map((certification) => (
                <article className="supporting-cert" key={certification.name}>
                  <h3>{certification.name}</h3>
                  <p>
                    {certification.issuer}
                    {certification.status ? ` · ${certification.status}` : ''}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
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
          The site now presents the stretch-role story: enterprise IT operations, hands-on AWS/Terraform projects,
          infrastructure automation, systems analysis, education, certifications, and direct contact paths.
        </p>
      </section>
    </main>
  );
}

export default App;
