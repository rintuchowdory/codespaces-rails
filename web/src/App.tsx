import { useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "./api";
import "./index.css";

type Status = "loading" | "ok" | "error";

const FEATURES = [
  {
    icon: "ruby",
    label: "Rails 8.1 API",
    desc: "API-only Rails backend with PostgreSQL, Puma, and rack-cors preconfigured.",
    tag: "Ruby 3.4",
  },
  {
    icon: "react",
    label: "React + Vite",
    desc: "TypeScript-first frontend with hot module replacement and optimized builds.",
    tag: "React 19",
  },
  {
    icon: "docker",
    label: "Docker Ready",
    desc: "Slim Dockerfile with bundler caching for fast container builds.",
    tag: "Dockerfile",
  },
  {
    icon: "render",
    label: "Render Blueprint",
    desc: "One-click deploy via render.yaml with managed Postgres included.",
    tag: "render.yaml",
  },
  {
    icon: "railway",
    label: "Railway Config",
    desc: "Pre-configured railway.json for instant deployment with Postgres plugin.",
    tag: "railway.json",
  },
  {
    icon: "pages",
    label: "GitHub Pages CI",
    desc: "Automated build and deploy workflow for the frontend on every push.",
    tag: "Actions",
  },
];

const STACK = [
  "Rails 8.1",
  "Ruby 3.4",
  "PostgreSQL",
  "React 19",
  "TypeScript",
  "Vite 7",
  "Docker",
  "Puma",
];

function iconFor(name: string) {
  const icons: Record<string, string> = {
    ruby: "💎",
    react: "⚛",
    docker: "🐳",
    render: "▲",
    railway: "🚂",
    pages: "📄",
  };
  return icons[name] ?? "📦";
}

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setHealth(data);
        setStatus("ok");
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : String(e));
        setStatus("error");
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-badge">
          <span className="dot" />
          Open Source Starter
        </div>
        <h1>Codespaces Rails</h1>
        <p>
          A production-ready Rails 8.1 API with a React + TypeScript frontend.
          Deploy the backend to Render or Railway, and the frontend to GitHub
          Pages or Vercel — all from one monorepo.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="https://github.com/rintuchowdory/codespaces-rails"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          <a className="btn btn-secondary" href="#features">
            Explore Features
          </a>
        </div>
      </section>

      <section className="section" id="features">
        <h2 className="section-title">What's Included</h2>
        <p className="section-subtitle">
          Everything you need to ship a full-stack app, preconfigured and ready
          to deploy.
        </p>
        <div className="grid">
          {FEATURES.map((f) => (
            <div className="card" key={f.label}>
              <div className="card-icon">{iconFor(f.icon)}</div>
              <h3>{f.label}</h3>
              <p>{f.desc}</p>
              <code>{f.tag}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="status-bar">
        <div className="status-card">
          <div className="status-header">
            <h3>
              <span className={`status-indicator ${status}`} />
              API Health Check
            </h3>
            <span style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
              GET /api/v1/health
            </span>
          </div>
          <div className="status-data">
            {status === "loading" && (
              <div className="status-loading">Checking API status…</div>
            )}
            {status === "error" && (
              <div>
                <span className="key">status:</span>{" "}
                <span className="value">unreachable</span>{"\n"}
                <span className="key">error:</span>{" "}
                <span className="error-text">{error}</span>{"\n"}
                <span className="key">hint:</span>{" "}
                <span style={{ color: "var(--text-dim)" }}>
                  Run the API locally with `bin/rails s` from api/, or deploy it
                  via render.yaml — then set VITE_API_BASE_URL to its URL.
                </span>
              </div>
            )}
            {status === "ok" && health && (
              <div>
                <span className="key">status:</span>{" "}
                <span className="value">{health.status}</span>{"\n"}
                <span className="key">environment:</span>{" "}
                <span className="value">{health.environment}</span>{"\n"}
                <span className="key">timestamp:</span>{" "}
                <span className="value">{health.timestamp}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          Modern, battle-tested technologies that scale.
        </p>
        <div className="stack-list">
          {STACK.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>

      <footer>
        <p>
          Built by{" "}
          <a
            href="https://github.com/rintuchowdory"
            target="_blank"
            rel="noopener noreferrer"
          >
            rintuchowdory
          </a>{" "}
          — open source and free to use.
        </p>
      </footer>
    </>
  );
}
