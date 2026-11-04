import type { Profile } from "./data";

export function buildVCard(p: Profile): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${p.name}`,
    "N:Deve;Yuren;;;",
    `ORG:${p.company}`,
    `TITLE:${p.role}`,
    `TEL;TYPE=CELL:${p.phone}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `URL;TYPE=GitHub:${p.github}`,
    `URL;TYPE=LinkedIn:${p.linkedin}`,
    `BDAY:${p.birthDate}`,
    "ADR;TYPE=WORK:;;;Maputo;;;Moçambique",
    "END:VCARD",
  ].join("\r\n");
}

export function downloadVCard(p: Profile): void {
  const blob = new Blob([buildVCard(p)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.name.replace(/\s+/g, "-").toLowerCase()}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
