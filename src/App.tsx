import { useState } from "react";
import type { ReactNode } from "react";
import {
  profile, roles, toolGroups, softSkills, education, experience, languages, services,
  calcAge, formatDate, formatPhone,
} from "./data";
import { downloadVCard } from "./vcard";
import { goTo, useActiveSection, useReveal, useTheme, useToast } from "./hooks";
import Portfolio from "./components/Portfolio";
import CvViewer from "./components/CvViewer";

const wa = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
const SECTION_IDS = ["sobre", "portfolio", "contacto"];

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="reveal mt-5 anchor">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [toast, setToast] = useToast();
  const [cvOpen, setCvOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  useReveal();

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: profile.name, url: location.href });
      else { await navigator.clipboard.writeText(location.href); setToast("Link copiado ✓"); }
    } catch { /* cancelado */ }
  };

  return (
    <>
      <div className="bg-glow" />
      <div className={`toast-pill ${toast ? "on" : ""}`}>{toast}</div>

      <main className="container app-wrap">
        <div className="row g-4">
          {/* ───────── PERFIL ───────── */}
          <aside className="col-lg-5 col-xl-4">
            <div className="sticky-lg">
              <div className="profile-card">
                <span className="badge-live"><span className="dot" /> Disponível para novos projectos</span>
                <div className="pc-tools">
                  <button className="icon-btn" onClick={toggleTheme} aria-label="Alternar tema">
                    <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} />
                  </button>
                  <button className="icon-btn" onClick={share} aria-label="Partilhar">
                    <i className="bi bi-box-arrow-up-right" />
                  </button>
                </div>

                <div className="photo-wrap">
                  <img className="photo" src={profile.photo} alt={profile.name} />
                </div>

                <div className="pc-body text-center">
                  <h1 className="name">{profile.name}</h1>
                  <div className="role">{profile.role}</div>
                  <p className="tagline">{profile.tagline}</p>

                  <div className="row g-2 mt-1">
                    <div className="col-3"><a className="act" href={`tel:${profile.phone}`}><i className="bi bi-telephone-fill" />Ligar</a></div>
                    <div className="col-3"><a className="act" href={wa} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" />WhatsApp</a></div>
                    <div className="col-3"><a className="act" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" />LinkedIn</a></div>
                    <div className="col-3"><a className="act" href={profile.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github" />GitHub</a></div>
                  </div>

                  <button className="btn btn-brand w-100 mt-3" onClick={() => downloadVCard(profile)}>
                    <i className="bi bi-person-plus-fill me-2" />Guardar contacto
                  </button>
                  <div className="row g-2 mt-1">
                    <div className="col-6">
                      <a className="btn btn-outline-brand w-100" href="#portfolio" onClick={goTo("portfolio")}>
                        Ver portfólio <i className="bi bi-arrow-up-right" />
                      </a>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-outline-brand w-100" onClick={() => setCvOpen(true)}>
                        <i className="bi bi-file-earmark-person me-1" /> Visualizar CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ───────── CONTEÚDO ───────── */}
          <div className="col-lg-7 col-xl-8">
            <div className="row g-2 reveal">
              <div className="col-4"><div className="stat"><b>2+</b><span>Anos de design</span></div></div>
              <div className="col-4"><div className="stat"><b>{education.filter((e) => e.kind === "cert").length}</b><span>Certificações</span></div></div>
              <div className="col-4"><div className="stat"><b>{calcAge(profile.birthDate)}</b><span>Anos de idade</span></div></div>
            </div>

            <Section id="sobre" title="Sobre">
              {profile.about.map((p) => <p key={p} className="text-secondary">{p}</p>)}
              <div className="d-flex flex-wrap gap-2 mt-3">
                {roles.map((r) => <span key={r} className="chip chip-brand">{r}</span>)}
              </div>
            </Section>

            <Section id="experiencia" title="Experiência">
              <div className="timeline">
                {experience.map((j) => (
                  <div key={j.title} className="t-item">
                    <small>{j.when}</small>
                    <h3>{j.title}</h3>
                    <div className="t-org">{j.company}</div>
                    <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="educacao" title="Educação & certificações">
              <div className="timeline">
                {education.map((e) => (
                  <div key={e.title} className="t-item">
                    <small>{e.when}</small>
                    <h3>{e.title} {e.kind === "cert" && <span className="cert-badge"><i className="bi bi-patch-check-fill" /> Certificado</span>}</h3>
                    <div className="t-org">{e.org}</div>
                    {e.place && <div className="t-place">{e.place}</div>}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Linguagens & ferramentas">
              <div className="row g-2">
                {toolGroups.map((g) => (
                  <div key={g.title} className="col-md-6 col-xl-4">
                    <div className="panel h-100">
                      <h3 className="panel-title"><i className={`bi ${g.icon}`} /> {g.title}</h3>
                      <div className="d-flex flex-wrap gap-2">
                        {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Skills">
              <div className="d-flex flex-wrap gap-2">
                {softSkills.map((s) => <span key={s} className="chip chip-brand"><i className="bi bi-check2-circle me-1" />{s}</span>)}
              </div>
            </Section>

            <Section title="Idiomas">
              <div className="row g-2">
                {languages.map((l) => (
                  <div key={l.name} className="col-sm-6">
                    <div className="panel d-flex align-items-center">
                      <div className="me-auto"><b>{l.name}</b><div className="small text-secondary">{l.label}</div></div>
                      <span className="dots" aria-label={`Nível ${l.level} de 5`}>
                        {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= l.level ? "on" : ""} />)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Serviços">
              <div className="row g-2">
                {services.map((s) => (
                  <div key={s.title} className="col-md-6">
                    <div className="service h-100">
                      <i className={`bi ${s.icon}`} />
                      <div><h3>{s.title}</h3><p>{s.text}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="portfolio" title="Portfólio">
              <Portfolio />
            </Section>

            <Section id="contacto" title="Contacto">
              <div className="row g-2">
                <div className="col-md-6"><a className="contact" href={`tel:${profile.phone}`}><i className="bi bi-telephone" />{formatPhone(profile.phone)}</a></div>
                <div className="col-12"><a className="contact" href={`mailto:${profile.email}`}><i className="bi bi-envelope" />{profile.email}</a></div>
                <div className="col-md-6"><a className="contact" href={wa} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp" />WhatsApp</a></div>
                <div className="col-md-6"><a className="contact" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" />LinkedIn · Yuren Deve</a></div>
                <div className="col-md-6"><a className="contact" href={profile.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github" />github.com/Yurendeve17</a></div>
                <div className="col-12"><div className="contact"><i className="bi bi-mortarboard" />{profile.education}</div></div>
                <div className="col-12"><div className="contact"><i className="bi bi-geo-alt" />{profile.birthPlace} · {formatDate(profile.birthDate)}</div></div>
              </div>
            </Section>

            <footer className="text-center text-secondary small mt-5">
              © {new Date().getFullYear()} {profile.company} · React + TypeScript + Bootstrap
            </footer>
          </div>
        </div>
      </main>

      <nav className="dock" aria-label="Navegação">
        <a href="#sobre" className={active === "sobre" ? "active" : ""} onClick={goTo("sobre")}>Sobre</a>
        <a href="#portfolio" className={active === "portfolio" ? "active" : ""} onClick={goTo("portfolio")}>Portfólio</a>
        <a href="#contacto" className={active === "contacto" ? "active" : ""} onClick={goTo("contacto")}>Contacto</a>
        <a className="dock-cta" href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
      </nav>

      <CvViewer open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
