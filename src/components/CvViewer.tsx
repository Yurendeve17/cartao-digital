import { useEffect, useState } from "react";
import { profile } from "../data";
import { useEscape } from "../hooks";

type Status = "checking" | "ok" | "missing";

export default function CvViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("checking");
  useEscape(onClose, open);

  useEffect(() => {
    if (!open) return;
    setStatus("checking");
    fetch(profile.cv, { method: "HEAD" })
      .then((r) => setStatus(r.ok && (r.headers.get("content-type") ?? "").includes("pdf") ? "ok" : "missing"))
      .catch(() => setStatus("missing"));
  }, [open]);

  if (!open) return null;
  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="overlay-box cv-box" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex align-items-center gap-2 p-3 border-bottom border-secondary-subtle">
          <i className="bi bi-file-earmark-person fs-5 text-brand" />
          <b className="me-auto">Currículo — {profile.name}</b>
          {status === "ok" && (
            <>
              <a className="btn btn-outline-brand btn-sm" href={profile.cv} target="_blank" rel="noopener noreferrer">
                <i className="bi bi-box-arrow-up-right" />
              </a>
              <a className="btn btn-brand btn-sm" href={profile.cv} download="CV-Yuren-Deve.pdf">
                <i className="bi bi-download me-1" /> Descarregar
              </a>
            </>
          )}
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose} aria-label="Fechar">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        {status === "ok" && <iframe className="cv-frame" src={`${profile.cv}#view=FitH`} title="CV" />}
        {status === "checking" && <div className="p-5 text-center text-secondary">A carregar…</div>}
        {status === "missing" && (
          <div className="p-4 text-center">
            <i className="bi bi-file-earmark-pdf display-4 text-brand" />
            <p className="mt-3 mb-1 fw-semibold">CV ainda não adicionado</p>
            <p className="text-secondary small mb-0">
              Coloque o seu ficheiro em <code>public/cv.pdf</code> (com esse nome) e recarregue a página.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
