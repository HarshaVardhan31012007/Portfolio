import React from 'react';

const About = () => {
  return (
    <div>
      {/* About Section Header */}
      <section className="section-container">
        <div className="container">
          <div className="section-header">
            <h2>About Me</h2>
            <p className="section-subtitle">
              Passionate engineer dedicated to high-concurrency systems, efficient algorithms, and robust distributed architectures.
            </p>
            <div className="header-line"></div>
          </div>

          <div className="about-grid">
            <article className="glass-card about-card">
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                Education
              </h3>
              <span className="edu-badge">Aug 2024 &ndash; May 2028</span>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                National Institute of Technology Warangal
              </h4>
              <p style={{ color: 'var(--primary-hover)', fontWeight: 500 }}>
                B.Tech in Computer Science and Engineering
              </p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                CGPA: 9.25 / 10.00
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Rigorous foundation in Data Structures, Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Object-Oriented Programming.
              </p>
            </article>

            <article className="glass-card about-card">
              <h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Professional Focus
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                My core focus lies in backend engineering, building highly concurrent fault-tolerant systems, and leveraging mathematical data structures to solve complex algorithmic problems efficiently.
              </p>
              <div className="interest-tags">
                <span className="interest-tag">Backend Engineering</span>
                <span className="interest-tag">Distributed Systems</span>
                <span className="interest-tag">Scalable Architecture</span>
                <span className="interest-tag">Graph Algorithms</span>
                <span className="interest-tag">Competitive Programming</span>
                <span className="interest-tag">Open Source</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline Experience Section */}
      <section className="section-container">
        <div className="container">
          <div className="section-header">
            <h2>Experience &amp; Contributions</h2>
            <p className="section-subtitle">
              Hackathons, open source programs, and collaborative engineering milestones.
            </p>
            <div className="header-line"></div>
          </div>

          <div className="timeline">
            {[
              {
                id: 1,
                title: "Open Source Contributor",
                organization: "GirlScript Summer of Code (GSSOC)",
                date: "May 2026 – June 2026",
                description: "Built a full-stack Kanban board in PrepIQ using React, TypeScript, and @dnd-kit with sub-100ms drag-and-drop state sync. Architected distributed AI queue pipelines in PlaceMentor369.",
                badge: "Full Stack & Distributed",
                skills: ["React", "TypeScript", "Redis", "BullMQ", "@dnd-kit"]
              },
              {
                id: 2,
                title: "Open Source Contributor",
                organization: "Nexus Spring of Code (NSoC)",
                date: "April 2026 – May 2026",
                description: "Architected an AI-powered GSoC organization recommender matching users against 184 organizations. Engineered a 4-factor recommendation engine, improving discoverability by 30%.",
                badge: "AI Recommendation Engine",
                skills: ["TypeScript", "Node.js", "TF-IDF Scoring", "GitHub API"]
              },
              {
                id: 3,
                title: "Hackathon Winner & Finalist",
                organization: "Uber She++ 2026",
                date: "March 2026",
                description: "Developed a 3-stage signal processing pipeline to detect harsh driving maneuvers with 90%+ precision. Built a real-time analytics pipeline reducing network overhead by 90%.",
                badge: "Top 63 Finalist & Winner",
                skills: ["Telematics", "Signal Processing", "Data Pipelines", "Algorithms"]
              }
            ].map((item, index) => (
              <div
                key={item.id}
                className="timeline-item"
                style={{ '--delay': `${index * 0.18}s` }}
              >
                <div className="timeline-marker"></div>
                <div className="glass-card timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{item.title}</h3>
                      <h4 className="timeline-org">{item.organization}</h4>
                    </div>
                    <span className="timeline-date">{item.date}</span>
                  </div>

                  <p className="timeline-desc">{item.description}</p>

                  <div className="timeline-skills">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="tech-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Grid */}
      <section className="section-container">
        <div className="container">
          <div className="section-header">
            <h2>Key Achievements</h2>
            <p className="section-subtitle">
              Recognition and competitive rankings achieved globally.
            </p>
            <div className="header-line"></div>
          </div>

          <div className="achievements-grid">
            <article className="glass-card achievement-card">
              <div className="achievement-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="achievement-title">LeetCode Knight</h3>
              <p className="achievement-desc">
                Peak rating of <strong>1939</strong>, placed in the <strong>Top Ranked Tier</strong> globally among millions of programmers.
              </p>
            </article>

            <article className="glass-card achievement-card">
              <div className="achievement-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="achievement-title">Hackathon Winner</h3>
              <p className="achievement-desc">
                <strong>Top 63 Finalist &amp; Hackathon Winner</strong> out of nationwide candidates at Uber She++ 2026.
              </p>
            </article>

            <article className="glass-card achievement-card">
              <div className="achievement-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 className="achievement-title">Amazon ML School</h3>
              <p className="achievement-desc">
                Selected for the prestigious 2026 cohort (<strong>Top 3,000</strong> out of 134,000+ applicants).
              </p>
            </article>

            <article className="glass-card achievement-card">
              <div className="achievement-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="achievement-title">Competitive Coding</h3>
              <p className="achievement-desc">
                Google Big Code Top 15k; <strong>Rank 473</strong> out of 40,000+ in LeetCode Weekly Contest 485.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
