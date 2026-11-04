import { useCallback, useState } from "react";
import { categories, categoryStyle, works } from "../portfolio";
import type { Category, WorkItem } from "../portfolio";
import { useEscape } from "../hooks";

function Lightbox({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  useEscape(onClose, true);
  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="overlay-box" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose} aria-label="Fechar"><i className="bi bi-x-lg" /></button>
        {!item.media && (
          <div className="detail-hero" style={{ background: categoryStyle[item.category].bg }}>
            <i className={`bi ${categoryStyle[item.category].icon}`} />
          </div>
        )}
        {item.media?.type === "video" ? (
          <video src={item.media.src} controls autoPlay playsInline className="overlay-media" />
        ) : (
          item.media && <img src={item.media.src} alt={item.title} className="overlay-media" />
        )}
        <div className="p-3">
          <div className="small text-brand">{item.category}</div>
          <h3 className="h5 mb-1">{item.title}</h3>
          {item.description && <p className="text-secondary small mb-2">{item.description}</p>}
          {item.tech && <div className="d-flex gap-2 mb-3">{item.tech.map((t) => <span key={t} className="chip chip-brand">{t}</span>)}</div>}
          {item.link && (
            <a className="btn btn-brand btn-sm" href={item.link} target="_blank" rel="noopener noreferrer">
              Abrir projecto <i className="bi bi-arrow-up-right ms-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [cat, setCat] = useState<Category | "Todos">("Todos");
  const [open, setOpen] = useState<WorkItem | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const list = cat === "Todos" ? works : works.filter((w) => w.category === cat);

  return (
    <>
      <div className="filters">
        {(["Todos", ...categories] as const).map((c) => (
          <button key={c} className={`chip chip-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="row row-cols-2 row-cols-md-3 g-2 g-md-3">
        {list.map((w) => {
          const st = categoryStyle[w.category];
          const cover = w.cover ?? (w.media?.type === "image" ? w.media.src : undefined);
          const live = !!(w.media || w.link);
          const click = () => {
            if (w.media || w.description) setOpen(w);
            else if (w.link) window.open(w.link, "_blank", "noopener");
          };
          return (
            <div className="col" key={w.id}>
              <div
                className={`work ${live ? "" : "soon"}`}
                style={{ background: st.bg }}
                onClick={live ? click : undefined}
                role={live ? "button" : undefined}
                tabIndex={live ? 0 : undefined}
                onKeyDown={(e) => { if (live && e.key === "Enter") click(); }}
              >
                {cover && <img src={cover} alt={w.title} loading="lazy" />}
                {!cover && w.media?.type === "video" && <video src={`${w.media.src}#t=0.5`} muted playsInline preload="metadata" />}
                {!cover && w.media?.type !== "video" && <i className={`bi ${st.icon} work-ph`} />}
                {w.media?.type === "video" && <i className="bi bi-play-circle-fill work-play" />}
                <div className="work-cap">
                  <small>{w.category}</small>
                  <b>{w.title}</b>
                  {w.tech && <span className="tech-line">{w.tech.join(" · ")}</span>}
                  {!live && <span className="soon-tag">Em breve</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {open && <Lightbox item={open} onClose={close} />}
    </>
  );
}
