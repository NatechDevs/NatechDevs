/* NatechDevs profile badges — Poppins-first SVG strips (shields.io can't do custom fonts) */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'badges');
mkdirSync(root, { recursive: true });

const W = '#FFFFFF';
const B = '#0B0B0C';
const sections = {
  languages: [
    ['PHP', '#777BB4', W], ['JAVASCRIPT', '#F7DF1E', B], ['PYTHON', '#3776AB', W],
    ['SQL', '#4479A1', W], ['SHELL', '#4EAA25', W],
  ],
  frontend: [
    ['REACT', '#61DAFB', B], ['TAILWIND CSS', '#06B6D4', W], ['TAILWIND FORMS', '#06B6D4', W],
    ['FRAMER MOTION', '#005571', W], ['LUCIDE REACT', '#000000', W], ['GSAP', '#88CE02', B],
    ['BOOTSTRAP', '#7952B3', W], ['APEXCHARTS', '#00E396', B],
  ],
  backend: [
    ['SUPABASE', '#3ECF8E', B], ['REST API', '#005571', W], ['MYSQL', '#4479A1', W], ['PDO', '#4479A1', W],
  ],
  mobile: [['CAPACITOR', '#0077F5', W], ['ANDROID', '#3DDC84', B]],
  devops: [['GITHUB ACTIONS', '#2088FF', W], ['DOCKER', '#2496ED', W], ['VERCEL', '#000000', W]],
  security: [
    ['CSRF', '#000000', W], ['CSP', '#000000', W], ['HSTS', '#000000', W],
    ['SRI', '#000000', W], ['RATE LIMITING', '#000000', W], ['XSS', '#000000', W],
  ],
  ai: [
    ['CLAUDE', '#6F2DA8', W], ['CHATGPT', '#412991', W], ['GEMINI', '#4285F4', W],
    ['MACHINE LEARNING', '#FF6F00', W], ['PREDICTIVE ANALYTICS', '#005571', W], ['PROCESS AUTOMATION', '#00897B', W],
  ],
  'ai-coding': [['CURSOR', '#000000', W], ['CODEX', '#10A37F', W], ['GOOGLE ANTIGRAVITY', '#4285F4', W]],
  tools: [
    ['FIGMA', '#F24E1E', W], ['GIT', '#F05032', W], ['VS CODE', '#007ACC', W],
    ['POSTMAN', '#FF6C37', W], ['XAMPP', '#FB7A24', W], ['VITE', '#646CFF', W],
  ],
};

const MAXW = 800, PH = 30, GAP = 8, FS = 12.5;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const pillW = (label) => Math.ceil(label.length * 8.2 + 46);

for (const [name, pills] of Object.entries(sections)) {
  let x = 0, y = 0, els = [];
  for (const [label, bg, fg] of pills) {
    const w = pillW(label);
    if (x + w > MAXW) { x = 0; y += PH + GAP; }
    const dot = fg === W ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)';
    els.push(`<rect x="${x}" y="${y}" width="${w}" height="${PH}" rx="7" fill="${bg}"/><circle cx="${x + 14}" cy="${y + 15}" r="4" fill="${dot}"/><text x="${x + 24}" y="${y + 19.5}" font-size="${FS}" font-weight="700" letter-spacing="1.2" fill="${fg}">${esc(label)}</text>`);
    x += w + GAP;
  }
  const H = y + PH;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${MAXW}" height="${H}" viewBox="0 0 ${MAXW} ${H}" font-family="Poppins, 'Segoe UI', Verdana, sans-serif"><title>${name}</title>${els.join('')}</svg>`;
  writeFileSync(join(root, `${name}.svg`), svg);
  console.log(`${name}.svg (${H}px)`);
}
