# DESIGN & BUILD BRIEF — Rochda Riswat Muliampati Portfolio (v2)

> **Cara pakai:** dokumen ini adalah spesifikasi lengkap. Berikan seluruh isinya ke AI/developer, lalu minta: _"Build this in Astro, exactly to spec."_ Semua angka di sini adalah nilai final — jangan diganti dengan default framework.

---

## 0. RINGKASAN

|                 |                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Klien**       | Rochda Riswat Muliampati                                                                                          |
| **Peran**       | Graphic Designer, Photographer, Social Media Specialist                                                           |
| **Output**      | Landing page satu halaman + template halaman detail proyek (dinamis)                                              |
| **Stack**       | Astro (static). Tanpa framework UI. CSS ditulis manual, bukan Tailwind.                                           |
| **Arah visual** | Swiss / International Typographic Style, dark theme, ditumpangi bahasa visual "grainy gradient" ala PORTFOLIO–GO™ |
| **Referensi**   | https://portfoliogo.webflow.io/ (bahasa permukaan) + Swiss grid discipline (struktur)                             |

**Prinsip inti:** rangkanya Swiss — grid 12 kolom, hairline divider, label meta uppercase, whitespace besar. Permukaannya ekspresif — gradient mesh berbutir, headline uppercase raksasa dengan satu kata italic lowercase, bracket tag. Jangan tukar perannya: gradient tidak boleh masuk ke area teks panjang, dan grid tidak boleh dilanggar demi efek.

---

## 1. DESIGN TOKENS

Tulis persis sebagai CSS custom properties di `:root`.

```css
:root {
  color-scheme: dark;

  /* surface & text */
  --bg: #0d0d0d; /* deep off-black, background utama */
  --bg-2: #171717; /* lift, jarang dipakai */
  --fg: #ffffff; /* teks utama */
  --fg-80: rgba(255, 255, 255, 0.8); /* body text */
  --fg-60: rgba(255, 255, 255, 0.6); /* tag, label sekunder, kata italic */
  --muted: #a1a1a1;
  --line: #262626; /* border solid (thumbnail, header) */
  --line-soft: rgba(255, 255, 255, 0.12); /* divider antar baris */

  /* accent — dipakai MAKSIMAL 2 kali di seluruh halaman */
  --accent: #d23010; /* vermilion */
  --ok: #6dc06d; /* status dot "available" */

  /* layout */
  --gutter: 24px;
  --pad: clamp(20px, 3.2vw, 40px);
  --max: 1600px;

  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
}
```

**Aturan tema:** halaman ini dark-only. Set `color-scheme: dark` dan beri `body` background eksplisit. Jangan bikin varian light.

---

## 2. TIPOGRAFI

**Typeface:** Inter, variable, via Google Fonts — italic wajib ikut.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&display=swap"
  rel="stylesheet"
/>
```

Fallback stack: `'Inter','Helvetica Neue',Helvetica,Arial,sans-serif`.

> Referensi aslinya memakai Aspekta (berbayar, tidak di Google Fonts). Inter adalah pengganti resmi untuk proyek ini. Kalau klien nanti membeli Aspekta, tukar family-nya saja — seluruh skala di bawah tetap berlaku.

### Skala

| Kelas         | Ukuran                          | Weight | Transform | Line-height | Tracking                                  |
| ------------- | ------------------------------- | ------ | --------- | ----------- | ----------------------------------------- |
| `.h-xl`       | `clamp(2.6rem, 8.2vw, 8rem)`    | 600    | uppercase | 1.06        | -.025em                                   |
| `.h-lg`       | `clamp(2rem, 4.6vw, 4rem)`      | 600    | uppercase | 1.06        | -.025em                                   |
| `.h-md`       | `clamp(1.4rem, 2.6vw, 2.6rem)`  | 600    | uppercase | 1.06        | -.025em                                   |
| `.label`      | `.875rem` (14px)                | 700    | uppercase | 1           | +.02em                                    |
| `.tag > span` | `.875rem`                       | 700    | uppercase | 1           | +.02em, warna `--fg-60`                   |
| `.body`       | `1rem`                          | 400    | none      | 1.5         | -.02em, warna `--fg-80`, `max-width:62ch` |
| `.body-lg`    | `clamp(1.05rem,1.35vw,1.25rem)` | 400    | none      | 1.5         | -.02em, `max-width:46ch`                  |

### Aksen italic — **ini tanda tangan desainnya**

Satu kata di dalam headline diset italic lowercase, lebih besar, dan lebih redup.

```css
.it {
  font-style: italic;
  font-weight: 300;
  text-transform: lowercase;
  color: var(--fg-60);
  font-size: 1.24em; /* relatif terhadap headline induknya */
  letter-spacing: -0.03em;
}
```

Dipakai di 4 tempat, tidak lebih:

1. Hero — `photography`
2. About statement — `feed`
3. FAQ heading — `answers`
4. Closing headline — `together`

---

## 3. GRID & SPACING

```css
.wrap {
  width: 100%;
  max-width: var(--max);
  margin-inline: auto;
  padding-inline: var(--pad);
  position: relative;
  z-index: 2;
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gutter);
}
```

- Section padding vertikal: `clamp(72px, 12vh, 150px)`.
- Breakpoint utama **900px** — di bawah itu semua kolom jadi `1 / -1`. Breakpoint sekunder 760px (metadata case study) dan 680px (wordmark header disembunyikan).
- `.wrap` harus `z-index:2` karena gradient mesh dan grain berada di `z-index` 0–1 di belakangnya.

---

## 4. GRAIN + GRADIENT MESH (efek kunci)

Dua lapis terpisah. Tidak ada file gambar — semuanya CSS, agar halaman tetap self-contained.

### 4a. Grain

Noise dari filter SVG inline sebagai data URI, disimpan di token:

```css
--grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
```

```css
.grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: var(--grain);
  background-size: 300px 300px;
  opacity: 0.16;
  mix-blend-mode: overlay;
}
```

### 4b. Mesh

Empat lingkaran blur besar di belakang grain, ditutup gradient fade ke `--bg`.

```css
.mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.mesh .blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.85;
}
.mesh .b1 {
  width: 64vw;
  height: 52vw;
  left: -8vw;
  top: -14vw;
  background: radial-gradient(
    circle at 40% 40%,
    #0e5e52,
    rgba(14, 94, 82, 0) 70%
  );
}
.mesh .b2 {
  width: 52vw;
  height: 44vw;
  left: 24vw;
  top: -6vw;
  background: radial-gradient(
    circle at 50% 50%,
    #b4460f,
    rgba(180, 70, 15, 0) 70%
  );
}
.mesh .b3 {
  width: 44vw;
  height: 40vw;
  right: -6vw;
  top: -10vw;
  background: radial-gradient(
    circle at 50% 50%,
    #7a1e42,
    rgba(122, 30, 66, 0) 70%
  );
}
.mesh .b4 {
  width: 46vw;
  height: 34vw;
  left: 8vw;
  top: 6vw;
  background: radial-gradient(
    circle at 50% 50%,
    #1d6b2e,
    rgba(29, 107, 46, 0) 72%
  );
  opacity: 0.55;
}
.mesh .fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 13, 13, 0.25) 0%,
    rgba(13, 13, 13, 0.55) 42%,
    #0d0d0d 96%
  );
}
```

Markup:

```html
<div class="mesh" aria-hidden="true">
  <span class="blob b1"></span><span class="blob b2"></span>
  <span class="blob b3"></span><span class="blob b4"></span>
  <span class="fade"></span>
</div>
<div class="grain" aria-hidden="true"></div>
```

**Dipakai di 3 tempat:** hero, closing/footer, header case study.
Di closing, mesh dibalik: `b1/b2/b3` pindah ke `bottom` (`top:auto`), `b4` di-`display:none`, dan `.fade` dibalik arahnya:

```css
.closing .mesh .fade {
  background: linear-gradient(
    180deg,
    #0d0d0d 0%,
    rgba(13, 13, 13, 0.55) 55%,
    rgba(13, 13, 13, 0.25) 100%
  );
}
```

---

## 5. KOMPONEN

### 5.1 Bracket tag — `[ Photography ]`

CSS murni, bukan SVG.

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.tag::before,
.tag::after {
  content: "";
  width: 3px;
  height: 12px;
  flex: none;
  border: 1px solid var(--fg-60);
  border-radius: 1px;
}
.tag::before {
  border-right: 0;
}
.tag::after {
  border-left: 0;
}
.tag > span {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--fg-60);
  line-height: 1;
}
.tag.solid > span {
  color: var(--fg);
}
```

Markup: `<span class="tag"><span>Photography</span></span>`

### 5.2 Section head

Pola tetap di setiap seksi. **Tidak ada penomoran 01/02/03** — diganti label ini.

```html
<div class="sec-head">
  <p class="label">Description</p>
  <span class="tag"><span>About</span></span>
  <span class="rule" aria-hidden="true"></span>
</div>
```

```css
.sec-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: clamp(32px, 5vh, 64px);
}
.rule {
  height: 1px;
  background: var(--line-soft);
  width: 100%;
}
```

Isi tag per seksi: `About`, `Experience`, `Services`, `FAQ`.

### 5.3 Round accent button

```css
.round {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--fg);
  color: var(--bg);
  font-size: 1.25rem;
  flex: none;
  transition:
    background 0.3s var(--ease),
    transform 0.3s var(--ease);
}
.round.accent {
  background: var(--accent);
  color: #fff;
}
.round:hover {
  transform: scale(1.06);
}
```

Isinya karakter `+`. **Hanya dua di seluruh situs:** baris service pertama, dan CTA di closing. Ini satu-satunya tempat `--accent` muncul selain status dot.

### 5.4 Row list (expertise, services, FAQ, contact)

Semua pakai pola sama: `border-top:1px solid var(--line-soft)`, item terakhir juga dapat `border-bottom`. Kiri label, kanan tag/ikon, `justify-content:space-between`.

Services: `h3` berwarna `--fg-60`, berubah ke `--fg` saat hover. Item pertama sudah `--fg` sejak awal (menandai layanan utama).

### 5.5 FAQ plus icon

```css
.plus {
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid var(--fg-60);
  border-radius: 999px;
  flex: none;
  transition:
    border-color 0.3s var(--ease),
    background 0.3s var(--ease);
}
.plus::before,
.plus::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 1px;
  background: var(--fg);
  transform: translate(-50%, -50%);
  transition: transform 0.4s var(--ease);
}
.plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
.faq-q[aria-expanded="true"] .plus {
  background: var(--fg);
}
.faq-q[aria-expanded="true"] .plus::before,
.faq-q[aria-expanded="true"] .plus::after {
  background: var(--bg);
}
.faq-q[aria-expanded="true"] .plus::after {
  transform: translate(-50%, -50%) rotate(0deg);
}
```

Animasi buka-tutup pakai `grid-template-rows: 0fr → 1fr` (bukan max-height):

```css
.faq-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease);
}
.faq-item.open .faq-a {
  grid-template-rows: 1fr;
}
.faq-a > div {
  overflow: hidden;
}
```

Tombolnya `<button class="faq-q" aria-expanded="false" aria-controls="a1">`, panelnya `role="region" aria-labelledby`.

### 5.6 Thumbnail proyek (gradient generatif)

Klien belum punya aset foto. Selama itu, thumbnail diisi gradient generatif — ini **bukan placeholder darurat**, referensinya pun memakai artwork gradient sebagai thumbnail.

```css
.thumb {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--line);
  background: #101010;
  aspect-ratio: 4/3;
}
.thumb .art {
  position: absolute;
  inset: 0;
  transition: transform 0.7s var(--ease);
}
.thumb .art .blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}
.thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: var(--grain);
  background-size: 300px 300px;
  opacity: 0.2;
  mix-blend-mode: overlay;
}
.thumb .cap {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  padding: 14px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--fg-60);
}
.work-item:hover .thumb .art {
  transform: scale(1.03);
}
```

Generator blob (deterministik, jadi hasilnya konsisten tiap build):

```js
const PALETTES = {
  artivive: ["#0E5E52", "#B4460F", "#7A1E42", "#1D6B2E"],
  "nadi-co": ["#123C6B", "#A8391C", "#5E2A6B", "#0F6B5C"],
};
function art(slug, seed = 0) {
  const p = PALETTES[slug] || PALETTES.artivive;
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
```

Di Astro ini dijalankan **saat build**, bukan di client. Nanti saat foto asli tersedia, ganti `<span class="art">` dengan `<Image />` — rasio dan caption tetap.

---

## 6. STRUKTUR HALAMAN 1 — HOMEPAGE

### 6.1 Header (fixed)

Kiri: glyph + wordmark. Kanan: About / Work / FAQ / Contact.
Nav link: 14px, weight 700, uppercase, warna `--fg-60`, hover ke `--fg`. Link Contact diberi kelas `.strong` (warna `--fg`) plus kotak kecil 10×10 berborder di depannya.

Glyph wordmark — tiga batang menurun, CSS murni:

```css
.mark .glyph {
  width: 14px;
  height: 12px;
  flex: none;
  background:
    linear-gradient(var(--fg), var(--fg)) 0 0/3px 12px no-repeat,
    linear-gradient(var(--fg), var(--fg)) 5.5px 3px/3px 9px no-repeat,
    linear-gradient(var(--fg), var(--fg)) 11px 6px/3px 6px no-repeat;
}
```

State scroll (`window.pageYOffset > 24` → class `.is-stuck`):

```css
.site-header {
  padding-block: 22px;
  border-bottom: 1px solid transparent;
  transition:
    background 0.35s var(--ease),
    border-color 0.35s var(--ease),
    padding 0.35s var(--ease);
}
.site-header.is-stuck {
  background: rgba(13, 13, 13, 0.72);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom-color: var(--line);
  padding-block: 14px;
}
```

Di bawah 680px, `.mark .txt` di-`display:none` (sisakan glyph saja).

### 6.2 Hero — `min-height:100svh`

Layout: flex column, `justify-content:flex-end`. Padding-top `clamp(120px,22vh,220px)`, padding-bottom 28px. Mesh + grain di belakang.

**Headline** (`.h-xl`, tiga baris, masing-masing `<span class="ln">` dengan child `<span>`):

```
Graphic design,
[photography] &        ← italic lowercase
social media
```

**Intro** (`.body-lg`, grid kolom 2–6):

> Focused on visual clarity and strategic content execution — identity, imagery and publishing built as one system.

**Hero bar** (flex, space-between, `margin-top:clamp(36px,7vh,88px)`):

- Kiri — tiga stat: `3 [ Disciplines ]` · `2 [ Brands ]` · `●(hijau) Open [ 2026 ]`
- Kanan — link `See work` dengan ikon panah diagonal (`.golink`), hover: ikon translate `(3px,-3px)`

### 6.3 About

Section head: `Description [ About ]`.

Grid: `.about-lead` kolom 1–8, `.about-side` kolom 9–12.

**Statement** — weight 500, uppercase, `clamp(1.5rem,3.1vw,3rem)`, line-height 1.12, `max-width:18ch`:

> Identity that holds up on a shelf, on a screen, and in a _feed_

**Paragraf kiri:**

> My work sits across three disciplines that rarely stay separate for long. Identity and layout give a brand its structure; commercial photography gives it evidence; social media management keeps it in front of the people it was built for. Treating those as one system is what keeps a brand consistent from a logo lockup to a Tuesday afternoon post.

**Paragraf kanan:**

> In practice that means art direction and design systems, product and lifestyle photography shot for real placements rather than for a portfolio, and content calendars planned around what a brand actually needs to say.

Di bawahnya link `Start a project` (`.golink`, ikon di kanan teks).

**Expertise list** — sub-head `Expertise` + rule, lalu 4 baris:

| Label                        | Tag kiri                     | Tag kanan |
| ---------------------------- | ---------------------------- | --------- |
| Visual identity & layout     | `[ Core ]`                   | `[ 1 ]`   |
| Commercial photography       | `[ Product & lifestyle ]`    | `[ 2 ]`   |
| Social media management      | `[ Strategy to publishing ]` | `[ 3 ]`   |
| Campaign & content direction | —                            | `[ 4 ]`   |

### 6.4 Work

Section head: `Description [ Experience ]`.

Grid asimetris — kartu bergantian:

```css
.w-left {
  grid-column: 1 / 8;
}
.w-right {
  grid-column: 6 / -1;
}
.work-item {
  margin-bottom: clamp(48px, 9vh, 112px);
}
.work-item:last-child {
  margin-bottom: 0;
}
```

Index genap → `.w-left`, ganjil → `.w-right`.

Isi tiap kartu: `.thumb` (gradient + caption) lalu `.work-cap` berisi nama proyek (14px/700/uppercase), bracket tag per scope, dan di kanan (`margin-left:auto`) teks `View detail →`. Panah translate 5px saat hover.

### 6.5 Services

Section head: `Description [ Services ]`. Empat baris `.svc-row`:

| Judul                  | Tag                 | Catatan                                   |
| ---------------------- | ------------------- | ----------------------------------------- |
| Brand identity sprint  | `[ Fixed scope ]`   | judul `--fg`, plus tombol `.round.accent` |
| Photography production | `[ Per shoot day ]` |                                           |
| Social media retainer  | `[ Monthly ]`       |                                           |
| Full package           | `[ All three ]`     |                                           |

### 6.6 FAQ

Section head: `Description [ FAQ ]`, lalu heading `.h-lg`: **Questions? _answers_**

Tiga item accordion:

1. **What services do you offer?** — Graphic design, photography and social media management. Each one is available on its own, or combined into a single package when a brand needs the identity, the imagery and the publishing to move together.
2. **How does the process work?** — Briefing, then proposal and scope, then execution, then review, then final delivery. The scope is agreed in writing before any work starts, and the review round happens before files are handed over, so nothing arrives as a surprise.
3. **How do I start a project?** — Send a message by email or on LinkedIn with a short outline of what you need and your timeline. I will come back with current availability and the next step.

Penutup: `Still got questions? <a>Contact</a> me.` (link bergaris bawah, `text-underline-offset:3px`).

### 6.7 Closing / Footer

Mesh terbalik + grain. Padding `clamp(80px,14vh,160px)` atas, 40px bawah.

- **Baris atas** (center, flex): `Tasikmalaya / Remote [ 7°20′S 108°13′E ]` · `●(hijau) 00:00:00 [ GMT +7 ]`
  Jam berjalan, update tiap detik:
  ```js
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
  ```
- **Tengah** (center, `margin-block:clamp(56px,10vh,120px)`): `.h-xl` → **LET'S WORK _together_** (`max-width:15ch`), lalu `.round.accent` `+` yang mengarah ke `mailto:`.
- **Contact links** (`max-width:760px`, center): dua baris — `Email / hello@rochda.studio / ↗` dan `Direct message / LinkedIn / ↗`. Hover: panah translate `(4px,-4px)` dan berubah ke `--fg`.
- **Baris bawah**: nav About/Work/FAQ · `Copyright © 2026 Rochda Riswat Muliampati. All rights reserved.` · `LinkedIn ↗`

---

## 7. STRUKTUR HALAMAN 2 — CASE STUDY (template dinamis)

Satu template, di-render dari data. Urutan:

1. **Header** — mesh + grain, link `← Back to overview`, judul `.h-xl` (nama proyek), sub `.body-lg`.
2. **Cover** — `.thumb` dengan `aspect-ratio:21/9` (di bawah 760px jadi `4/3`).
3. **Metadata** — grid 3 kolom (`grid-column:span 4`), dibingkai border atas & bawah `--line-soft`, padding `clamp(36px,6vh,64px)`. Isi: Role / Period / Scope. `dt` pakai `.label.dim`, `dd` ukuran `clamp(1rem,1.3vw,1.2rem)`.
4. **Description** — label `Description` di kolom 1–3, paragraf di kolom 4–11.
5. **Gallery asimetris** — 5 slot:
   ```css
   .g1 {
     grid-column: 1 / 8;
   } /* 4:3  */
   .g2 {
     grid-column: 8 / -1;
     align-self: end;
   } /* 3:4  */
   .g3 {
     grid-column: 3 / 8;
   } /* 1:1  */
   .g4 {
     grid-column: 8 / -1;
     align-self: start;
   } /* 16:10 */
   .g5 {
     grid-column: 1 / -1;
   } /* 21:9 */
   ```
   Di bawah 900px semua jadi `1 / -1`; `.g2` jadi `4/5`, `.g5` jadi `16/9`.
6. **Next project** — link full-width, label `Next project` lalu nama proyek berikutnya (`.h-lg`) + `→`. Hover menambah `padding-inline` `clamp(10px,1.4vw,22px)` (kontennya bergeser masuk, bukan card yang membesar).
7. **Footer ringkas** — satu baris nav + copyright + LinkedIn.

---

## 8. DATA KONTEN

Di Astro, simpan sebagai content collection atau `src/data/projects.js`. Urutan: `artivive`, lalu `nadi-co`. Field `next` membentuk siklus tertutup.

```js
export const projects = [
  {
    slug: "artivive",
    name: "Artivive",
    sub: "Visual identity, commercial photography and a social presence rebuilt around one consistent system.",
    role: "Graphic Designer, Photographer & Social Media Specialist",
    period: "Jan 2024 — Present", // ⚠ PLACEHOLDER — konfirmasi ke klien
    scope: "Graphic Design, Photography, Social Media Management",
    tags: ["Graphic Design", "Photography", "Social Media Management"],
    prose: [
      "Artivive needed its design, imagery and publishing to read as one brand instead of three separate efforts. The work began with the visual system: a fixed type scale, a defined grid and a set of layout rules that hold from a print piece down to a single story frame.",
      "Photography was produced against the placements it would actually live in. Product and lifestyle sets were shot in batches, retouched to a shared contrast and colour reference, and delivered as a library with crops already prepared for each channel.",
      "On the social side, I run the calendar end to end: planning, asset production, copy, scheduling and monthly reporting. Posts are built from the same library and rules as the rest of the identity, which keeps the feed recognisable without repeating itself.",
    ],
    gallery: [
      { slot: "g1", cap: "Identity system — logo lockups and grid" },
      { slot: "g2", cap: "Product photography — studio set" },
      { slot: "g3", cap: "Campaign layout — print" },
      { slot: "g4", cap: "Lifestyle photography — on location" },
      { slot: "g5", cap: "Social feed layout — nine-post grid" },
    ],
    next: "nadi-co",
  },
  {
    slug: "nadi-co",
    name: "Nadi & Co",
    sub: "Commercial photography and day-to-day social media management for a brand that publishes constantly.",
    role: "Photographer & Social Media Specialist",
    period: "Mar 2023 — Dec 2023", // ⚠ PLACEHOLDER — konfirmasi ke klien
    scope: "Photography, Social Media Management",
    tags: ["Photography", "Social Media Management"],
    prose: [
      "Nadi & Co already had an identity. What it lacked was a supply of images good enough to carry it and a publishing rhythm that did not depend on whoever was free that week.",
      "I set up a repeatable shoot format: a fixed lighting setup, a shot list built from the coming month's calendar, and a naming and export convention so assets could be found and reused without a second shoot.",
      "Management covered planning, captions, scheduling and community response, reviewed monthly against reach and saves. Over the engagement the feed moved from ad-hoc posting to a consistent weekly cadence with a clear visual through-line.",
    ],
    gallery: [
      { slot: "g1", cap: "Editorial photography — series" },
      { slot: "g2", cap: "Product detail — studio" },
      { slot: "g3", cap: "Content calendar — monthly plan" },
      { slot: "g4", cap: "Lifestyle set — daylight" },
      { slot: "g5", cap: "Social feed layout — nine-post grid" },
    ],
    next: "artivive",
  },
];
```

**Konstanta situs:**

```js
export const site = {
  name: "Rochda Riswat Muliampati",
  title:
    "Rochda Riswat Muliampati — Graphic Designer, Photographer & Social Media Specialist",
  description:
    "Portfolio of Rochda Riswat Muliampati. Visual identity, commercial photography and social media management.",
  email: "hello@rochda.studio", // ⚠ PLACEHOLDER — ganti dengan email asli
  linkedin: "https://www.linkedin.com/in/rochda-riswat-muliampati-0b88393a3/",
  location: "Tasikmalaya / Remote",
  coords: "7°20′S 108°13′E",
  timezone: "Asia/Jakarta",
  tzLabel: "GMT +7",
  year: 2026,
};
```

### ⚠ Yang harus dikonfirmasi sebelum live

- `email` — masih placeholder.
- `period` kedua proyek — masih placeholder.
- Teks About dan prose case study ditulis dari deskripsi peran, jadi _masuk akal_ tapi belum tentu _akurat_. Minta klien menyunting.
- **Jangan** menambahkan testimonial, logo klien, rating bintang, atau angka "50+ projects" seperti di referensi. Klien belum punya klaim itu, dan placeholder di situ akan terbaca palsu.

---

## 9. PERILAKU & INTERAKSI

### Routing

Di HTML tunggal sebelumnya ini memakai hash routing. **Di Astro, ganti dengan halaman asli:**

- `src/pages/index.astro` → homepage
- `src/pages/work/[slug].astro` → case study, `getStaticPaths()` dari `projects`

Link `View detail` → `/work/artivive`. Link `← Back to overview` → `/#work`. Nav header dari halaman case study menunjuk ke `/#about` dst.

Smooth scroll cukup `html{ scroll-behavior:smooth }`, dimatikan di `prefers-reduced-motion`.

### Motion — hemat, satu momen saja

Hanya ada **satu** animasi yang tidak dipicu user: reveal baris hero saat halaman dimuat.

```css
.rv > span {
  transform: translateY(106%);
  opacity: 0;
}
body.ready .rv > span {
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.95s var(--ease),
    opacity 0.95s var(--ease);
}
body.ready .rv:nth-of-type(2) > span {
  transition-delay: 0.08s;
}
body.ready .rv:nth-of-type(3) > span {
  transition-delay: 0.16s;
}
.fade-in {
  opacity: 0;
}
body.ready .fade-in {
  opacity: 1;
  transition: opacity 0.9s var(--ease) 0.5s;
}
```

Class `ready` ditambahkan ke `body` di dalam `requestAnimationFrame` setelah init.

**Jangan tambahkan** scroll-reveal per section atau fade-and-slide-up di tiap kartu. Sisanya murni respons terhadap aksi user: hover, buka accordion, state header saat scroll.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .rv > span,
  body.ready .rv > span {
    transform: none;
    opacity: 1;
    transition: none;
  }
  .fade-in,
  body.ready .fade-in {
    opacity: 1;
    transition: none;
  }
  .faq-a {
    transition: none;
  }
}
```

### Aksesibilitas — lantai kualitas

- `:focus-visible{ outline:2px solid var(--fg); outline-offset:4px; }`
- Accordion: `<button>`, `aria-expanded`, `aria-controls`; panel `role="region"` + `aria-labelledby`.
- Semua elemen dekoratif (`.mesh`, `.grain`, panah, glyph, dot) diberi `aria-hidden="true"`.
- `<nav aria-label="Primary">` dan `aria-label="Footer"`.
- Teks body memakai `--fg-80` di atas `#0D0D0D` — kontras aman. Jangan turunkan body ke `--fg-60`; opacity itu hanya untuk tag, label sekunder, dan kata italic yang ukurannya besar.

---

## 10. STRUKTUR FILE ASTRO YANG DISARANKAN

```
src/
  data/site.js
  data/projects.js
  styles/tokens.css        ← bagian 1
  styles/base.css          ← reset, tipografi, .wrap/.grid
  styles/components.css    ← .tag .label .round .thumb .faq .mesh .grain
  components/
    Header.astro
    Mesh.astro             ← props: variant "hero" | "closing"
    Grain.astro
    Tag.astro              ← props: label, solid
    SectionHead.astro      ← props: tag
    Thumb.astro            ← props: slug, seed, caption, ratio
    WorkItem.astro
    FaqItem.astro
    Closing.astro
  pages/
    index.astro
    work/[slug].astro
  utils/art.js             ← generator blob, bagian 5.6
```

Accordion FAQ dan state header adalah dua-satunya JS di client. Tulis sebagai `<script>` inline di komponennya (Astro otomatis membundel), bukan hydration framework.

---

## 11. CHECKLIST PENERIMAAN

- [ ] Hero mengisi persis satu viewport (`100svh`, bukan `100vh` — penting di mobile Safari).
- [ ] Gradient mesh terlihat di hero, closing, dan header case study. Tidak di tempat lain.
- [ ] Butiran grain terlihat jelas saat di-zoom, tapi tidak mengaburkan teks.
- [ ] Ada tepat 4 kata italic lowercase di homepage.
- [ ] Warna `--accent` muncul tepat 2 kali.
- [ ] Tidak ada penomoran seksi 01/02/03 — hanya label `Description [ … ]`.
- [ ] Kartu Work bergantian kiri/kanan dan tidak pernah selebar penuh.
- [ ] Jam footer berjalan dan menampilkan waktu Asia/Jakarta.
- [ ] Case study bisa ditambah hanya dengan menambah satu entri di `projects.js` — overview, halaman detail, dan link "Next project" ikut menyesuaikan sendiri.
- [ ] Tab keyboard menampilkan outline putih di setiap link dan tombol.
- [ ] Di 375px lebar: tidak ada horizontal scroll, headline tidak terpotong, semua kolom menumpuk.
- [ ] `prefers-reduced-motion` mematikan reveal hero dan smooth scroll.
