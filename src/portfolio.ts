// 🎨 PORTFÓLIO — adicione os seus trabalhos aqui.
// MODO FÁCIL: largue imagens/vídeos nas pastas  src/assets/portfolio/<categoria>/
//   design-grafico · motion-graphic · ui-ux · web · desenvolvimento
// O nome do ficheiro vira o título. Números no início (01-, 02-) definem a ordem.
// MODO MANUAL: acrescente itens à lista "manual" abaixo (links, descrições, etc.).

export type Category = "Design Gráfico" | "Motion Graphic" | "UI/UX" | "Web" | "Desenvolvimento";
export const categories: Category[] = ["Design Gráfico", "Motion Graphic", "UI/UX", "Web", "Desenvolvimento"];

export interface WorkItem {
  id: string;
  title: string;
  category: Category;
  cover?: string; // miniatura (imagem). Se faltar e media for imagem, usa a própria imagem
  media?: { type: "image" | "video"; src: string }; // abre ao clicar
  link?: string; // link externo opcional (Behance, Instagram, site...)
  description?: string;
  tech?: string[]; // etiquetas (linguagens/ferramentas)
}

const GH = "https://github.com/Yurendeve17?tab=repositories";

const manual: WorkItem[] = [
  {
    id: "medisync-server",
    title: "MediSync CORBA — Servidor",
    category: "Desenvolvimento",
    tech: ["Java", "CORBA"],
    description: "Projecto académico de Sistemas Distribuídos: servidor da aplicação MediSync, comunicação distribuída via CORBA.",
    link: GH,
  },
  {
    id: "medisync-client",
    title: "MediSync CORBA — Cliente",
    category: "Desenvolvimento",
    tech: ["Python", "CORBA"],
    description: "Projecto académico de Sistemas Distribuídos: cliente da aplicação MediSync que comunica com o servidor via CORBA.",
    link: GH,
  },
  /* EXEMPLO:
  {
    id: "logo-yude",
    title: "Identidade visual YUDE",
    category: "Design Gráfico",
    media: { type: "image", src: "/portfolio/logo-yude.jpg" } // ficheiro em public/portfolio/,
    description: "Logótipo e manual de marca.",
  },
  {
    id: "intro-motion",
    title: "Intro animada",
    category: "Motion Graphic",
    cover: "portfolio/intro-capa.jpg",
    media: { type: "video", src: "portfolio/intro.mp4" },
  },
  */
  { id: "p1", title: "Identidade visual", category: "Design Gráfico" },
  { id: "p2", title: "Campanha publicitária", category: "Design Gráfico" },
  { id: "p3", title: "Motion de logótipo", category: "Motion Graphic" },
  { id: "p4", title: "Vídeo promocional", category: "Motion Graphic" },
  { id: "p5", title: "Protótipo de app", category: "UI/UX" },
  { id: "p6", title: "Redesign de interface", category: "UI/UX" },
  { id: "p7", title: "Website institucional", category: "Web" },
  { id: "p8", title: "Landing page", category: "Web" },
];

export const categoryStyle: Record<Category, { icon: string; bg: string }> = {
  "Design Gráfico": { icon: "bi-palette2", bg: "linear-gradient(135deg,#e8283c,#5c0d18)" },
  "Motion Graphic": { icon: "bi-play-circle", bg: "linear-gradient(135deg,#7c3aed,#1e0b45)" },
  "UI/UX": { icon: "bi-layout-wtf", bg: "linear-gradient(135deg,#0ea5e9,#082a45)" },
  Web: { icon: "bi-code-slash", bg: "linear-gradient(135deg,#f59e0b,#4a2503)" },
  Desenvolvimento: { icon: "bi-terminal", bg: "linear-gradient(135deg,#10b981,#052e22)" },
};

// ── Descoberta automática de ficheiros nas pastas ──
const files = import.meta.glob("./assets/portfolio/*/*.{jpg,jpeg,png,webp,gif,mp4,webm}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const folderToCategory: Record<string, Category> = {
  "design-grafico": "Design Gráfico",
  "motion-graphic": "Motion Graphic",
  "ui-ux": "UI/UX",
  web: "Web",
  desenvolvimento: "Desenvolvimento",
};

function titleFrom(file: string): string {
  const t = file
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : file;
}

const auto: WorkItem[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .flatMap(([path, url]) => {
    const m = path.match(/portfolio\/([^/]+)\/([^/]+)$/);
    const category = m && folderToCategory[m[1]];
    if (!m || !category) return [];
    const video = /\.(mp4|webm)$/i.test(m[2]);
    return [{ id: path, title: titleFrom(m[2]), category, media: { type: video ? "video" : "image", src: url } } as WorkItem];
  });

const isReal = (w: WorkItem) => !!(w.media || w.link);
const real = [...manual.filter(isReal), ...auto];
// marcadores "Em breve" só aparecem nas categorias que ainda não têm trabalhos
export const works: WorkItem[] = [
  ...real,
  ...manual.filter((w) => !isReal(w) && !real.some((r) => r.category === w.category)),
];
