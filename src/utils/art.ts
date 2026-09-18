/**
 * Deterministic generative gradient artwork (Brief §5.6).
 * Runs at build time in Astro frontmatter — never on the client.
 * When real photography arrives, replace the `<span class="art">` output
 * with an `<Image />`; aspect ratio and caption stay unchanged.
 */
const PALETTES: Record<string, string[]> = {
  artivive: ["#0E5E52", "#B4460F", "#7A1E42", "#1D6B2E"],
  "nadi-co": ["#123C6B", "#A8391C", "#5E2A6B", "#0F6B5C"],
};

export function art(slug: string, seed = 0): string {
  const p = PALETTES[slug] ?? PALETTES.artivive;
  let out = "";
  for (let i = 0; i < 4; i++) {
    const c = p[(i + seed) % p.length];
    const x = 12 + ((i * 37 + seed * 23) % 70);
    const y = 8 + ((i * 53 + seed * 31) % 64);
    const w = 55 + ((i * 29 + seed * 17) % 45);
    out += `<span class="blob" style="left:${x}%;top:${y}%;width:${w}%;height:${w}%;transform:translate(-50%,-50%);background:radial-gradient(circle at 50% 50%,${c},rgba(0,0,0,0) 70%);opacity:.9"></span>`;
  }
  return out;
}
