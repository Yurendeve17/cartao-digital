// ✏️ Edite aqui os seus dados — o resto do site actualiza sozinho.
export interface Profile {
  name: string;
  role: string;
  company: string;
  tagline: string;
  about: string[];
  phone: string; // formato internacional, sem espaços
  email: string;
  github: string;
  linkedin: string; // ⚠️ troque pelo link do SEU perfil (ex.: https://www.linkedin.com/in/seu-utilizador)
  birthDate: string; // AAAA-MM-DD
  birthPlace: string;
  photo: string;
  education: string;
  cv: string; // coloque o seu CV em public/cv.pdf
}

export const profile: Profile = {
  name: "Yuren Deve",
  role: "Desenvolvedor Web | UI/UX Designer | Designer Gráfico",
  company: "YUDE Agência",
  tagline: "Transformo ideias em experiências visuais e digitais.",
  about: [
        "Sou apaixonado por tecnologia e pelo seu potencial de gerar impacto positivo na sociedade. Ao longo da minha formação, tenho desenvolvido competências em programação, design grafico e interfaces de usuários e resolução de problemas, aliando pensamento crítico, disciplina e responsabilidade. Tenho particular interesse no desenvolvimento de software e em tecnologias emergentes, procurando constantemente evoluir através de projetos académicos e estudo autónomo",
    "Sou designer gráfico com mais de 3 anos de experiência na área. Ao longo desses anos, tive a oportunidade de trabalhar em diversos projetos, desde a criação de identidades visuais até o desenvolvimento de materiais gráficos para campanhas publicitárias. Minha paixão pelo design é o que me motiva a buscar sempre soluções criativas e inovadoras para atender às necessidades dos meus clientes.",
  ],
  phone: "+258821200954",
  email: "yurendeve00@gmail.com",
  github: "https://github.com/Yurendeve17",
  linkedin: "https://www.linkedin.com/search/results/people/?keywords=Yuren%20Deve",
  birthDate: "2003-03-17",
  birthPlace: "Cidade de Maputo, Moçambique",
  photo: "foto.jpg",
  education: "Engenharia Informática — Universidade Eduardo Mondlane (UEM)",
  cv: "cv.pdf",
};

export const roles: string[] = [
  "Desenvolvedor Web",
  "UI/UX Design",
  "Design Gráfico",
  "Motion Graphic",
  "Gestor de Tráfego",
  "Estudante de Eng. Informática",
];

export interface ToolGroup { title: string; icon: string; items: string[] }
export const toolGroups: ToolGroup[] = [
  { title: "Linguagens & Web", icon: "bi-code-slash", items: ["Java", "HTML", "CSS", "TypeScript", "JavaScript", "PHP", "Python", "Node.js", "Bootstrap"] },
  { title: "Dados & Dev tools", icon: "bi-hdd-network", items: ["MySQL", "Docker", "Git", "GitHub", "VS Code", "Antigravity"] },
  { title: "Design & Motion", icon: "bi-brush", items: ["Photoshop", "Illustrator", "Premiere", "Figma", "CorelDRAW", "Blender"] },
];

export const softSkills: string[] = [
  "Problem Solving", "Teamwork", "Fast Learning", "Adaptability", "Organization", "Professionalism",
];

export interface Edu { when: string; title: string; org: string; place?: string; kind: "degree" | "cert" }
export const education: Edu[] = [
  { when: "02-02-2022 — Actual", title: "Licenciatura em Engenharia Informática", org: "Universidade Eduardo Mondlane", kind: "degree" },
  { when: "29-09-2023", title: "Arduino Programming", org: "TME Education", place: "NEEN — Faculdade de Engenharia · UEM", kind: "cert" },
  { when: "07-06-2024", title: "Cybersecurity", org: "ICT4DEV-CIUEM · Faculdade de Ciências", place: "NEEN — Faculdade de Engenharia · UEM", kind: "cert" },
  { when: "12-03-2025", title: "Administração de Sistemas — X-Road", org: "Nordic Institute for Interoperability Solutions (NIIS)", kind: "cert" },
];

export interface Job { when: string; title: string; company: string; points: string[] }
export const experience: Job[] = [
      {
      when: "2025 — Atualmente",
      title: "Fundador & CEO | Diretor Criativo",
      company: "YUDE AGÊNCIA",
      points: [
        "Fundação e liderança da YUDE AGÊNCIA, uma agência de marketing, publicidade, design e tecnologia.",
        "Desenvolvimento de estratégias criativas e soluções digitais para fortalecer marcas e conectar empresas ao seu público.",
        "Direção e supervisão de projetos de identidade visual, design gráfico, branding e comunicação publicitária.",
        "Planeamento e gestão de estratégias de marketing digital e redes sociais.",
        "Coordenação de projetos, definição de objetivos e desenvolvimento de soluções orientadas para os resultados dos clientes.",
        "Promoção da inovação, criatividade e transformação digital através de soluções estratégicas e personalizadas."
      ],
    },
    {
    when: "2025 — Atualmente",
    title: "UI/UX Designer | Frontend Dev",
    company: "Bytnex Tech Solutions",
    points: [
      "Suporte e manutenção de software em ambiente corporativo.",
      "Participação em projectos de implementação de sistemas e mitigação de dados.",
      "Habilidades avançadas em solução de problemas e suporte ao utilizador.",
    ],
  },
  {
    when: "2022 — 2025",
    title: "Designer Gráfico",
    company: "Q's Tap | Q's Ice",
    points: [
      "Responsável pela criação e desenvolvimento de identidades visuais completas, desde a concepção do logótipo até à definição de elementos como tipografia, paleta de cores e aplicações institucionais.",
    ],
  },
  ];

export const languages = [
  { name: "Português", label: "Alto", level: 5 },
  { name: "Inglês", label: "Básico", level: 2 },
];

export interface Service { icon: string; title: string; text: string }
export const services: Service[] = [
  { icon: "bi-palette2", title: "Identidade visual", text: "Logótipos, paleta, tipografia e manual de marca." },
  { icon: "bi-megaphone", title: "Campanhas publicitárias", text: "Materiais gráficos e gestão de tráfego para comunicar e converter." },
  { icon: "bi-play-btn", title: "Motion graphic", text: "Animações e vídeos curtos que dão vida à sua marca." },
  { icon: "bi-window-sidebar", title: "UI/UX & Desenvolvimento web", text: "Interfaces no Figma e sites modernos e responsivos." },
];

export function calcAge(iso: string, now = new Date()): number {
  const b = new Date(iso);
  let age = now.getFullYear() - b.getFullYear();
  const before = now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate());
  return before ? age - 1 : age;
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}

export function formatPhone(p: string): string {
  const d = p.replace(/\D/g, "");
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
}
