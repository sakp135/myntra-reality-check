

import React, { useState, useMemo } from "react";

/* ───────────────────────────────────────────────────────────
   REALITY CHECK — Myntra wishlist feature
   Styled to Myntra's own design language so it reads as a
   native feature rather than a separate tool.
   ─────────────────────────────────────────────────────────── */

const M = {
  pink: "#FF3F6C",
  ink: "#282C3F",
  ink2: "#535766",
  ink3: "#94969F",
  border: "#EAEAEC",
  grey: "#F5F5F6",
  green: "#14958F",
  orange: "#FF905A",
};

/* The five doubts people actually name. Selecting one is the event that
   makes decision confidence measurable — it is otherwise a mental state
   Myntra has no way to log. */
const BLOCKERS = [
  { k: "FIT",      q: "Not sure about the fit",      sub: "Length, size, how it sits on me" },
  { k: "FABRIC",   q: "Not sure about the fabric",   sub: "Thickness, sheerness, how it feels" },
  { k: "COLOUR",   q: "Not sure about the colour",   sub: "Whether it matches the photo" },
  { k: "CARE",     q: "Will it last",                sub: "Shrinking, fading, wear" },
  { k: "BROWSING", q: "Just saving it for later",    sub: "No doubt, not buying yet" },
];

/* truth: how reviewers describe the garment against its studio photo.
   shift = colour correction, sheer = daylight opacity loss, note = why. */
const ITEMS = [
  {
    pattern: "floral",
    id: 1, brand: "Anouk", name: "Yellow Floral Print Kurta Set",
    price: 1899, mrp: 3799, off: 50, rating: 4.1, ratings: 2847,
    len: 118, modelH: 175, tone: "#F5D76E",
    truth: { shift: "#F5D76E", sheer: 0.34, note: "Colour true. Slightly sheer in daylight.", n: 3 },
    verdict: { size: 1, fabric: ["Slightly sheer", true, "Thinner than it looks. Needs a slip in daylight."],
      colour: ["True to photo", "Bright yellow, matches the listing."],
      care: "Wrinkles easily after sitting.", conf: ["High", "5 of 6 reviews mention fit or fabric"] },
    reviews: [
      "I'm 5'2\" and this came almost to my ankles, much longer than the photo suggests.",
      "Fabric is thinner than expected. Slightly see through in daylight, wore a slip.",
      "Colour is exactly like the picture, bright yellow. Very happy with the shade.",
      "Ordered my usual M and it was tight across the shoulders. Suggest sizing up.",
      "I'm 5'6\", falls mid calf on me. Cotton is soft, wrinkles a bit after sitting.",
      "Size up! I normally wear L, the L was snug. Otherwise lovely set.",
    ],
  },
  {
    pattern: "solid",
    id: 2, brand: "Libas", name: "Cotton Straight Kurta",
    price: 949, mrp: 1899, off: 50, rating: 4.3, ratings: 5120,
    len: 112, modelH: 173, tone: "#C9A227",
    truth: { shift: "#B08D2E", sheer: 0.0, note: "Duller than shown. Muted mustard, not bright.", n: 2 },
    verdict: { size: 0, fabric: ["Opaque", false, "Thick cotton. No slip needed, breathable."],
      colour: ["Differs", "Duller than shown \u2014 muted mustard, not bright."],
      care: "Shrinks about an inch on first wash. Wash cold.", conf: ["High", "6 of 6 reviews cover fit, fabric or wash"] },
    reviews: [
      "True to size, ordered M and it fits perfectly. I'm 5'4\", falls below the knee.",
      "Good thick cotton, not transparent at all. Wore it to office without a slip.",
      "The colour is slightly duller than shown online. More muted mustard than bright.",
      "Fits well but shrunk about an inch after the first wash. Wash cold.",
      "I'm 5'0\" and it was too long, got it hemmed. Otherwise good quality.",
      "Comfortable, breathable, held colour after several washes.",
    ],
  },
  {
    pattern: "chikan",
    id: 3, brand: "Sangria", name: "Chikankari Embroidered Kurta",
    price: 1499, mrp: 2999, off: 50, rating: 3.9, ratings: 1203,
    len: 110, modelH: 176, tone: "#EFEDE6",
    truth: { shift: "#E8E2D2", sheer: 0.52, note: "Off-white, not crisp white. Sheer, needs a camisole.", n: 4 },
    verdict: { size: 1, fabric: ["Sheer", true, "Delicate and see-through. Camisole required."],
      colour: ["Differs", "Off-white in person, not the crisp white shown."],
      care: "Handle gently. Colour holds after washing.", conf: ["High", "5 of 6 reviews mention fit or fabric"] },
    reviews: [
      "Beautiful embroidery but the fabric is quite sheer, definitely need a camisole.",
      "Runs small. I'm usually M, had to exchange for L. Shoulders were the issue.",
      "I'm 5'3\", this hits just below my knee. Nice length for leggings.",
      "The white is more off white in person, not the crisp white in photos.",
      "Delicate fabric, handle carefully. Colour stayed fine after two gentle washes.",
      "Size up if you want a relaxed fit. The cut is narrow through the hip.",
    ],
  },
  {
    pattern: "block",
    id: 4, brand: "Varanga", name: "Printed Kurta With Trousers",
    price: 2199, mrp: 5499, off: 60, rating: 3.2, ratings: 894,
    len: 120, modelH: 174, tone: "#7BA5C4",
    truth: { shift: "#6E93B0", sheer: 0.0, note: "Colour bleeds on first wash. Fabric feels synthetic.", n: 3 },
    verdict: { size: 0, fabric: ["Opaque", true, "Thick but feels synthetic. Not breathable in heat."],
      colour: ["Differs", "Bleeds on the first wash. Wash it separately."],
      care: "Colour ran onto other clothes.", conf: ["Medium", "4 of 6 reviews mention fabric or colour"] },
    reviews: [
      "Material quality is disappointing for the price. Feels synthetic, not like the photos.",
      "I'm 5'1\" and it was ankle length on me, far longer than expected.",
      "Colour bled in the first wash and ran onto other clothes. Wash separately.",
      "Fits true to size but the fabric is not breathable, uncomfortable in summer.",
      "Not transparent at least, thick enough. But it feels plasticky.",
      "Returned it. Looked much better on camera than in hand.",
    ],
  },
  {
    pattern: "solid",
    id: 5, brand: "Biba", name: "Cotton Anarkali Kurta",
    price: 2499, mrp: 3999, off: 37, rating: 4.5, ratings: 7431,
    len: 128, modelH: 175, tone: "#2E4272",
    truth: { shift: "#2E4272", sheer: 0.0, note: "True to the website. Opaque, no slip needed.", n: 4 },
    verdict: { size: 0, fabric: ["Opaque", false, "Premium cotton. Opaque, no slip needed."],
      colour: ["True to photo", "Deep navy, exactly as listed."],
      care: "No fading or shrinking after four washes.", conf: ["High", "6 of 6 reviews cover fit, fabric or wash"] },
    reviews: [
      "Gorgeous flowy anarkali. I'm 5'5\" and it just touches my ankle.",
      "True to size, no need to size up. Good fit through the bust.",
      "Lovely opaque cotton, no need for a slip. Feels premium.",
      "Colour is true to the website, deep navy as shown.",
      "I'm 5'0\", far too long, had to get it altered significantly.",
      "Held up beautifully after four washes, no fading or shrinking.",
    ],
  },
  {
    pattern: "block",
    id: 6, brand: "Vishudh", name: "Rayon Printed A-Line Kurta",
    price: 799, mrp: 2299, off: 65, rating: 3.4, ratings: 612,
    len: 108, modelH: 173, tone: "#E8A0B4",
    truth: { shift: "#F2C4D2", sheer: 0.66, note: "Much lighter pink than shown. Very transparent.", n: 5 },
    verdict: { size: 0, fabric: ["Sheer", true, "Very transparent. A full slip is essential."],
      colour: ["Differs", "Much lighter pink than the photo shows."],
      care: "Print fades noticeably by the second wash.", conf: ["Medium", "4 of 6 reviews mention fabric or colour"] },
    reviews: [
      "Very transparent, you can see everything. Cannot wear without a full slip.",
      "The print faded noticeably after the second wash.",
      "Fits fine, true to size. I'm 5'4\", falls just below the knee.",
      "Colour was different from the photo, much lighter pink than shown.",
      "Cheap rayon feel but for the price it's acceptable.",
      "Sizing was accurate for me, ordered L and it fit as expected.",
    ],
  },
];

const MARKS = [["Shoulder", 0.82], ["Waist", 0.62], ["Hip", 0.53], ["Thigh", 0.4], ["Knee", 0.28], ["Calf", 0.19], ["Ankle", 0.07]];

const hemFrac = (h, len) => Math.max(0.02, (0.82 * h - len) / h);
const nearest = (f) => MARKS.reduce((b, m) => (Math.abs(m[1] - f) < Math.abs(b[1] - f) ? m : b))[0];

const Tag = ({ tone, children }) => {
  const map = { good: [M.green, "#E8F4F3"], warn: [M.orange, "#FFF1EA"], info: [M.pink, "#FFEBF0"] };
  const [fg, bg] = map[tone] || map.info;
  return <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: "3px 7px", borderRadius: 2, letterSpacing: "0.02em" }}>{children}</span>;
};

/* Which verdict a review speaks to, so each verdict can show the buyer
   evidence behind it rather than just claiming a count. */
const TOPIC = {
  FIT: /\b(size|sizing|fit|fits|fitting|length|tall|short|snug|tight|loose|hem|ankle|knee|calf|shoulder|5'\d)/i,
  FABRIC: /\b(fabric|material|cotton|rayon|sheer|transparent|see.?through|opaque|thick|thin|slip|synthetic|breathable|soft|plasticky|quality)/i,
  COLOUR: /\b(colour|color|shade|yellow|navy|pink|white|mustard|bright|dull|muted|bled|bleed)/i,
  CARE: /\b(wash|washed|washing|shrunk|shrink|faded|fading|wrinkle|wrinkles|held up|ran onto)/i,
};
const topicOf = (text) =>
  Object.keys(TOPIC).filter((k) => TOPIC[k].test(text));

/* Reviewers state their own height constantly; Myntra never publishes the
   model's. Pulling it out is what lets photos be matched to the shopper. */
const reviewerCm = (text) => {
  const m = text.match(/(\d)'(\d{1,2})/);
  return m ? Math.round((+m[1] * 12 + +m[2]) * 2.54) : null;
};

/* Garment on a studio-shot figure. Hem height follows the item's real
   length against the wearer's height, so the same garment sits differently
   on different bodies; in "arrives" mode the reviewer-reported shade
   replaces the studio colour and sheerness lets the figure read through. */
function Garment({ item, real, height = 210, bodyH = 175 }) {
  const t = item.truth;
  const fill = real ? t.shift : item.tone;
  const sheer = real ? t.sheer : 0;
  const uid = `${item.id}${real ? "r" : "s"}${bodyH}`;
  const hem = 178 - hemFrac(bodyH, item.len) * 170;
  const fl = (178 - hem) * 0.07 + 2;
  const SKIN = "#D9AE83", SKIN_D = "#BE8F65", HAIR = "#241B22", BOT = "#E9E4DD";

  const body = `M48 41 Q60 36 72 41 C74 48 75 50 75 55 C75 63 70 66 70 71
                L${70 + fl} ${hem} Q60 ${hem + 5} ${50 - fl} ${hem} L50 71
                C50 66 45 63 45 55 C45 50 46 48 48 41 Z`;

  const motif = {
    floral: (
      <g fill="#fff" opacity=".5">
        <circle cx="4.5" cy="2.6" r="1" /><circle cx="4.5" cy="6.4" r="1" />
        <circle cx="2.6" cy="4.5" r="1" /><circle cx="6.4" cy="4.5" r="1" />
        <circle cx="4.5" cy="4.5" r=".85" fill="#000" opacity=".28" />
      </g>
    ),
    chikan: (
      <g fill="#fff" opacity=".65">
        <ellipse cx="3.4" cy="3.4" rx="1.4" ry=".5" transform="rotate(-25 3.4 3.4)" />
        <ellipse cx="7.6" cy="7.6" rx="1.4" ry=".5" transform="rotate(-25 7.6 7.6)" />
        <circle cx="7.6" cy="3" r=".45" /><circle cx="3" cy="7.6" r=".45" />
      </g>
    ),
    block: (
      <g opacity=".38">
        <path d="M4.5 1.8l2.2 2.4-2.2 2.4-2.2-2.4z" fill="#fff" />
        <circle cx="4.5" cy="4.2" r=".7" fill="#000" opacity=".3" />
      </g>
    ),
    solid: null,
  }[item.pattern || "solid"];

  return (
    <div style={{ height, background: "#F8F8F9", overflow: "hidden" }}>
      <svg viewBox="0 0 120 202" preserveAspectRatio="xMidYMid meet"
           style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <defs>
          <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCFCFD" /><stop offset="100%" stopColor="#EFEFF1" />
          </linearGradient>
          <linearGradient id={`sh${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity=".18" />
            <stop offset="18%" stopColor="#000" stopOpacity="0" />
            <stop offset="44%" stopColor="#fff" stopOpacity=".16" />
            <stop offset="70%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity=".2" />
          </linearGradient>
          {motif && (
            <pattern id={`pt${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">{motif}</pattern>
          )}
          <clipPath id={`cl${uid}`}><path d={body} /></clipPath>
        </defs>

        <rect width="120" height="202" fill={`url(#bg${uid})`} />
        <ellipse cx="60" cy="179" rx="20" ry="2.6" fill="#000" opacity=".09" />

        <path d="M50 14q10-7 20 0 3 12 1.5 22-1-7-4-11-6 3-13 0-3 4-4 11-1.5-10-.5-22z" fill={HAIR} />
        <ellipse cx="60" cy="24" rx="7.6" ry="9.4" fill={SKIN} />
        <path d="M52.4 25q.6 9 7.6 9.8 7-0.8 7.6-9.8-1.4 7.4-7.6 8.2-6.2-.8-7.6-8.2z" fill={SKIN_D} opacity=".3" />
        <path d="M56.6 23.4h1.8M61.6 23.4h1.8" stroke="#4A3A40" strokeOpacity=".55" strokeWidth=".8" strokeLinecap="round" />
        <path d="M56 32h8v8h-8z" fill={SKIN_D} />

        <path d={`M53 ${hem - 3}h5.6v${172 - hem}H53z`} fill={BOT} />
        <path d={`M61.4 ${hem - 3}H67v${172 - hem}h-5.6z`} fill={BOT} />
        <path d={`M53 ${hem - 3}h1.8v${172 - hem}h-1.8z`} fill="#000" opacity=".06" />
        <ellipse cx="55.8" cy="174" rx="4.4" ry="2.4" fill={SKIN} />
        <ellipse cx="64.2" cy="174" rx="4.4" ry="2.4" fill={SKIN} />

        <path d="M45 56l-3.6 34 4.6.6 3.4-33z" fill={SKIN} />
        <path d="M75 56l3.6 34-4.6.6-3.4-33z" fill={SKIN} />
        <ellipse cx="43.6" cy="94" rx="2.8" ry="4" fill={SKIN} />
        <ellipse cx="76.4" cy="94" rx="2.8" ry="4" fill={SKIN} />

        <g opacity={1 - sheer}>
          <path d="M48 41q-5 2-6.4 9l-2.2 24 8.6 1.4 5-26z" fill={fill} />
          <path d="M72 41q5 2 6.4 9l2.2 24-8.6 1.4-5-26z" fill={fill} />
          <path d={body} fill={fill} />
          {motif && <rect width="120" height="202" fill={`url(#pt${uid})`} clipPath={`url(#cl${uid})`} />}
          <rect width="120" height="202" fill={`url(#sh${uid})`} clipPath={`url(#cl${uid})`} />
          <path d={`M50 ${hem - 8}q10 3 20 0`} fill="none" stroke="#000" strokeOpacity=".1" strokeWidth="1.1" />
          <path d={`M54 72 Q52 ${hem * .72} 51 ${hem - 7}`} fill="none" stroke="#000" strokeOpacity=".07" strokeWidth="1" />
          <path d={`M66 72 Q68 ${hem * .72} 69 ${hem - 7}`} fill="none" stroke="#000" strokeOpacity=".07" strokeWidth="1" />
          <path d="M55 40q5 8 10 0" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="1.2" />
          <path d="M60 48v11" stroke="#000" strokeOpacity=".13" strokeWidth=".9" />
        </g>
      </svg>
    </div>
  );
}

function Ruler({ h, item }) {
  const H = 250, you = hemFrac(h, item.len), mod = hemFrac(item.modelH, item.len);
  const y = (f) => H - f * H;
  return (
    <svg viewBox={`0 0 168 ${H + 30}`} style={{ width: "100%", maxWidth: 168 }} role="img"
         aria-label={`Falls at ${nearest(you)} on you, ${nearest(mod)} on the model`}>
      {MARKS.map(([l, f]) => (
        <g key={l}>
          <line x1="44" y1={y(f)} x2="50" y2={y(f)} stroke={M.border} strokeWidth="1" />
          <text x="40" y={y(f) + 3} textAnchor="end" fontSize="9" fill={M.ink3}>{l}</text>
        </g>
      ))}
      <line x1="47" y1="6" x2="47" y2={H} stroke={M.border} strokeWidth="1" />
      <rect x="56" y="6" width="28" height={y(mod) - 6} fill={M.grey} />
      <line x1="56" y1={y(mod)} x2="84" y2={y(mod)} stroke={M.ink3} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="70" y={H + 15} textAnchor="middle" fontSize="9" fill={M.ink3}>Model</text>
      <text x="70" y={H + 26} textAnchor="middle" fontSize="9" fill={M.ink3}>{item.modelH}cm</text>
      <rect x="94" y="6" width="32" height={y(you) - 6} fill="#FFEBF0" />
      <line x1="94" y1={y(you)} x2="126" y2={y(you)} stroke={M.pink} strokeWidth="2.5" />
      <text x="110" y={H + 15} textAnchor="middle" fontSize="9" fill={M.pink} fontWeight="700">You</text>
      <text x="110" y={H + 26} textAnchor="middle" fontSize="9" fill={M.pink} fontWeight="700">{h}cm</text>
      <text x="132" y={y(you) + 3} fontSize="9.5" fill={M.pink} fontWeight="700">{nearest(you)}</text>
    </svg>
  );
}

/* Buyers who stated their height in a review, drawn wearing the garment at
   that height. Nothing here is uploaded: the heights come from review text
   and the figures are rendered, so no customer's body is shown. */
function BuyerPhotos({ item, h }) {
  const buyers = item.reviews
    .map((x) => ({ cm: reviewerCm(x), x }))
    .filter((b) => b.cm)
    .sort((a, b) => Math.abs(a.cm - h) - Math.abs(b.cm - h));

  if (!buyers.length) return null;
  const shown = [...buyers.slice(0, 2), { cm: item.modelH, x: null, isModel: true }];

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: M.ink, letterSpacing: ".03em", textTransform: "uppercase", marginBottom: 8 }}>
        On bodies like yours
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {shown.map((b, i) => {
          const near = !b.isModel && Math.abs(b.cm - h) <= 6;
          return (
            <div key={i} style={{ flex: 1, border: `1px solid ${near ? M.pink : M.border}`, borderRadius: 3, overflow: "hidden", background: "#fff" }}>
              <Garment item={item} real={false} height={132} bodyH={b.cm} />
              <div style={{ padding: "6px 8px", borderTop: `1px solid ${M.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: near ? M.pink : M.ink2 }}>
                  {b.cm}cm{b.isModel ? " · model" : near ? " · like you" : ""}
                </div>
                <div style={{ fontSize: 10.5, color: M.ink3 }}>
                  {b.isModel ? "Myntra photo" : nearest(hemFrac(b.cm, item.len))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: M.ink3, marginTop: 7, lineHeight: 1.45 }}>
        Heights taken from reviews. Figures are drawn, not customer photos.
      </div>
    </div>
  );
}

/* The buyer quotes behind a verdict, so the claim carries its evidence. */
function Evidence({ item, topic, open, onToggle }) {
  const hits = item.reviews.filter((x) => topicOf(x).includes(topic));
  if (!hits.length) return null;
  return (
    <div style={{ marginTop: 6 }}>
      <button onClick={onToggle}
        style={{ background: "none", border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, color: M.pink }}>
        {open ? "Hide" : `Read the ${hits.length} ${hits.length === 1 ? "review" : "reviews"} behind this`}
      </button>
      {open && (
        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
          {hits.map((x, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${M.border}`, paddingLeft: 10, fontSize: 12, color: M.ink2, lineHeight: 1.5 }}>
              {x}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyntraRealityCheck() {
  const [h, setH] = useState(152);
  const [size, setSize] = useState("M");
  const [open, setOpen] = useState(null);
  const [setup, setSetup] = useState(false);
  const [real, setReal] = useState(false);
  const [blocker, setBlocker] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [ev, setEv] = useState(null);

  const ft = useMemo(() => {
    const total = Math.round(h / 2.54);
    return `${Math.floor(total / 12)}'${total % 12}"`;
  }, [h]);

  const item = ITEMS.find((i) => i.id === open);

  const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
  const advise = (delta) => {
    const i = SIZES.indexOf(size);
    if (!delta) return `Order your usual ${size}. Reviewers report it fits true.`;
    const to = SIZES[Math.min(SIZES.length - 1, i + delta)];
    return `Order ${to}, not your usual ${size}. It runs small across reviews.`;
  };

  const r = item ? item.verdict : null;

  return (
    <div style={{ background: "#EDEDED", minHeight: "100%", padding: "20px 0", fontFamily: "'Assistant', system-ui, sans-serif" }}>
      {/* dangerouslySetInnerHTML, not a text child: React escapes a style
          tag's text children server-side but not on the client, which makes
          the two renders disagree and throws hydration away. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url(https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap);
        * { box-sizing: border-box; }
        .mx button { font-family: inherit; cursor: pointer; }
        .mx button:focus-visible { outline: 2px solid ${M.pink}; outline-offset: 1px; }
        .sheet { animation: up .28s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes up { from { transform: translateY(14px); opacity: 0 } to { transform: none; opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .sheet { animation: none } }
        input[type=range] { accent-color: ${M.pink}; }
      ` }} />

      <div className="mx" style={{ maxWidth: 412, margin: "0 auto", background: "#fff", position: "relative", minHeight: 720, boxShadow: "0 1px 14px rgba(0,0,0,.12)" }}>

        {/* Myntra header */}
        <div style={{ borderBottom: `1px solid ${M.border}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: M.ink, fontSize: 19 }}>‹</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: M.ink, letterSpacing: ".02em", flex: 1 }}>
            Wishlist <span style={{ color: M.ink3, fontWeight: 400 }}>{ITEMS.length} items</span>
          </span>
          <span style={{ display: "flex", gap: 18, color: M.ink, fontSize: 15 }}>
            <span aria-hidden="true">↴</span><span aria-hidden="true">⌂</span>
          </span>
        </div>

        {/* Reality Check strip. Before setup it is the whole pitch; after,
            it collapses to a one-line statement of what it is sized for. */}
        <div style={{ background: "#FFF7F9", borderBottom: `1px solid ${M.border}`, padding: "12px 16px" }}>
          {!configured ? (
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: M.pink, letterSpacing: ".06em" }}>NEW · REALITY CHECK</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: M.ink, marginTop: 6, lineHeight: 1.35 }}>
                Every photo here is on a 175cm model. How tall are you?
              </div>
              <div style={{ fontSize: 12, color: M.ink2, marginTop: 4, lineHeight: 1.45 }}>
                We&apos;ll show where each saved item falls on you, and what buyers said about the fabric.
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 14 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: M.ink }}>{h}</span>
                <span style={{ fontSize: 12.5, color: M.ink2 }}>cm · {ft}</span>
              </div>
              <input type="range" min="140" max="185" value={h} aria-label="Your height in centimetres"
                     style={{ width: "100%", marginTop: 4 }} onChange={(e) => setH(+e.target.value)} />

              <div style={{ fontSize: 11.5, color: M.ink2, marginTop: 12, marginBottom: 6 }}>Size you usually order</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{ border: `1px solid ${size === s ? M.pink : M.border}`, background: size === s ? "#FFEBF0" : "#fff", color: size === s ? M.pink : M.ink2, fontWeight: size === s ? 700 : 400, width: 42, height: 32, borderRadius: 2, fontSize: 12 }}>
                    {s}
                  </button>
                ))}
              </div>

              <button onClick={() => setConfigured(true)}
                style={{ width: "100%", marginTop: 14, border: "none", background: M.pink, color: "#fff", fontWeight: 700, fontSize: 13, padding: "12px 0", borderRadius: 3, letterSpacing: ".03em" }}>
                CHECK MY WISHLIST
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: M.ink, letterSpacing: ".02em" }}>
                    REALITY CHECK <span style={{ color: M.pink }}>·</span> ON
                  </div>
                  <div style={{ fontSize: 11.5, color: M.ink2, marginTop: 2 }}>
                    Sized for {h}cm ({ft}) · usually {size}
                  </div>
                </div>
                <button onClick={() => setSetup(!setup)}
                  style={{ background: "none", border: `1px solid ${M.pink}`, color: M.pink, fontWeight: 700, fontSize: 11.5, padding: "6px 12px", borderRadius: 2, letterSpacing: ".03em" }}>
                  {setup ? "DONE" : "EDIT"}
                </button>
              </div>

              {setup && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${M.border}` }}>
                  <label style={{ fontSize: 11.5, color: M.ink2, display: "block", marginBottom: 6 }}>Your height</label>
                  <input type="range" min="140" max="185" value={h} style={{ width: "100%" }}
                         onChange={(e) => setH(+e.target.value)} />
                  <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    {SIZES.map((s) => (
                      <button key={s} onClick={() => setSize(s)}
                        style={{ border: `1px solid ${size === s ? M.pink : M.border}`, background: size === s ? "#FFEBF0" : "#fff", color: size === s ? M.pink : M.ink2, fontWeight: size === s ? 700 : 400, width: 42, height: 32, borderRadius: 2, fontSize: 12 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wishlist grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {ITEMS.map((it, i) => (
            <div key={it.id} style={{ borderRight: i % 2 === 0 ? `1px solid ${M.border}` : "none", borderBottom: `1px solid ${M.border}` }}>
              <button onClick={() => { setOpen(it.id); setReal(false); setBlocker(null); setShowAll(false); setEv(null); }} style={{ background: "none", border: "none", padding: 0, width: "100%", textAlign: "left", display: "block" }}>
                <div style={{ position: "relative", height: 210 }}>
                  <Garment item={it} real={false} height={210} />
                  <span style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: 2, background: "rgba(255,255,255,.9)", color: M.ink2, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>×</span>
                  <span style={{ position: "absolute", left: 6, bottom: 30, background: "rgba(255,255,255,.95)", padding: "2px 6px", fontSize: 10.5, fontWeight: 700, color: M.ink, borderRadius: 2, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    {it.rating} <span style={{ color: M.green }}>★</span>
                    <span style={{ color: M.ink3, fontWeight: 400 }}>| {(it.ratings / 1000).toFixed(1)}k</span>
                  </span>
                  <span style={{ position: "absolute", left: 0, bottom: 0, right: 0, background: "rgba(255,255,255,.94)", padding: "5px 8px", fontSize: 10.5, fontWeight: 700, color: configured ? M.pink : M.ink3, letterSpacing: ".02em" }}>
                    {configured ? `${nearest(hemFrac(h, it.len)).toUpperCase()} ON YOU` : "SET YOUR HEIGHT"}
                  </span>
                </div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: M.ink }}>{it.brand}</div>
                  <div style={{ fontSize: 12, color: M.ink3, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.name}</div>
                  <div style={{ marginTop: 5, fontSize: 12.5 }}>
                    <span style={{ fontWeight: 700, color: M.ink }}>₹{it.price.toLocaleString("en-IN")}</span>
                    <span style={{ color: M.ink3, textDecoration: "line-through", marginLeft: 5 }}>₹{it.mrp.toLocaleString("en-IN")}</span>
                    <span style={{ color: M.orange, marginLeft: 5, fontWeight: 600 }}>({it.off}% OFF)</span>
                  </div>
                </div>
              </button>
              <div style={{ borderTop: `1px solid ${M.border}`, padding: "9px 0", textAlign: "center", fontSize: 12, fontWeight: 700, color: M.ink, letterSpacing: ".03em" }}>
                MOVE TO BAG
              </div>
            </div>
          ))}
        </div>

        {/* Detail sheet */}
        {open && item && (
          <div onClick={() => setOpen(null)}
               style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex",
                        alignItems: "flex-end", justifyContent: "center", zIndex: 50 }}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}
                 style={{ background: "#fff", width: "100%", maxWidth: 412, maxHeight: "86vh", overflowY: "auto" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${M.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, position: "sticky", top: 0, background: "#fff" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: M.ink }}>{item.brand}</div>
                  <div style={{ fontSize: 12.5, color: M.ink3 }}>{item.name}</div>
                  <div style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 3, border: `1px solid ${M.border}`, borderRadius: 2, padding: "2px 6px", fontSize: 11.5 }}>
                    <span style={{ fontWeight: 700, color: M.ink }}>{item.rating}</span>
                    <span style={{ color: M.green }}>★</span>
                    <span style={{ color: M.ink3 }}>| {item.ratings.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <button onClick={() => setOpen(null)} style={{ background: "none", border: "none", fontSize: 20, color: M.ink2, lineHeight: 1 }}>×</button>
              </div>

              {!blocker ? (
                /* Step 1 — name the doubt. This is also the only place the
                   decision-confidence lever gets recorded as an event. */
                <div style={{ padding: "22px 16px 20px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: M.ink, marginBottom: 4 }}>
                    What&apos;s stopping you?
                  </div>
                  <div style={{ fontSize: 12.5, color: M.ink3, marginBottom: 16, lineHeight: 1.5 }}>
                    Tell us the doubt and we&apos;ll answer just that, from what buyers reported.
                  </div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {BLOCKERS.map((b) => (
                      <button key={b.k} onClick={() => { setBlocker(b.k); setEv(null); }}
                        style={{ textAlign: "left", background: "#fff", border: `1px solid ${M.border}`,
                                 borderRadius: 3, padding: "13px 14px", display: "flex",
                                 justifyContent: "space-between", alignItems: "center", gap: 10, width: "100%" }}>
                        <span>
                          <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: M.ink }}>{b.q}</span>
                          <span style={{ display: "block", fontSize: 11.5, color: M.ink3, marginTop: 2 }}>{b.sub}</span>
                        </span>
                        <span style={{ color: M.pink, fontSize: 16 }}>&rsaquo;</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ padding: "12px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => { setBlocker(null); setShowAll(false); setEv(null); }}
                      style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: M.pink, fontWeight: 700 }}>
                      &lsaquo; Back
                    </button>
                    <span style={{ fontSize: 12, color: M.ink3 }}>
                      {BLOCKERS.find((b) => b.k === blocker)?.q}
                    </span>
                  </div>

                  {(showAll || blocker === "FABRIC" || blocker === "COLOUR") && (
                    <div style={{ padding: "14px 16px 0" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[["As photographed", false], ["As it arrives", true]].map(([label, isReal]) => (
                          <div key={label} style={{ flex: 1 }}>
                            <div style={{ border: `1px solid ${real === isReal ? M.pink : M.border}`, borderRadius: 3, overflow: "hidden" }}>
                              <Garment item={item} real={isReal} height={150} />
                            </div>
                            <button onClick={() => setReal(isReal)}
                              style={{ width: "100%", marginTop: 6, background: "none", border: "none", padding: 0, fontSize: 11, fontWeight: real === isReal ? 700 : 400, color: real === isReal ? M.pink : M.ink3, letterSpacing: ".02em" }}>
                              {label}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 10, background: "#FFF7F9", padding: "9px 11px", borderRadius: 3, fontSize: 12, color: M.ink2, lineHeight: 1.5 }}>
                        {item.truth.note} <span style={{ color: M.ink3 }}>Based on {item.truth.n} reviewer photos.</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "16px", display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {(showAll || blocker === "FIT") && (
                      <div style={{ flex: "0 0 auto" }}><Ruler h={h} item={item} /></div>
                    )}

                    <div style={{ flex: "1 1 190px", minWidth: 180 }}>
                      <div style={{ display: "grid", gap: 14 }}>
                        {[
                          ["FIT", "Size", r.size ? "Size up" : "True to size", advise(r.size), r.size ? "warn" : "good"],
                          ["FABRIC", "Fabric", r.fabric[0], r.fabric[2], r.fabric[1] ? "warn" : "good"],
                          ["COLOUR", "Colour", r.colour[0], r.colour[1], r.colour[0] === "True to photo" ? "good" : "warn"],
                          ["CARE", "After washing", null, r.care, null],
                        ].filter(([k]) => showAll || k === blocker)
                         .map(([k, label, verdict, note, tone]) => (
                          <div key={k}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: M.ink, letterSpacing: ".03em", textTransform: "uppercase" }}>{label}</span>
                              {verdict && <Tag tone={tone}>{verdict}</Tag>}
                            </div>
                            <div style={{ fontSize: 13, color: M.ink2, lineHeight: 1.5 }}>{note}</div>
                            <Evidence item={item} topic={k} open={ev === k}
                                      onToggle={() => setEv(ev === k ? null : k)} />
                          </div>
                        ))}

                        {(showAll || blocker === "FIT") && <BuyerPhotos item={item} h={h} />}

                        {blocker === "BROWSING" && !showAll && (
                          <div style={{ fontSize: 13, color: M.ink2, lineHeight: 1.55 }}>
                            No problem, it stays saved. We&apos;ll tell you if your size starts running low.
                          </div>
                        )}

                        <div style={{ borderTop: `1px solid ${M.border}`, paddingTop: 10, fontSize: 11.5, color: M.ink3 }}>
                          {r.conf[0]} confidence &mdash; {r.conf[1]}
                        </div>

                        {!showAll && (
                          <button onClick={() => setShowAll(true)}
                            style={{ background: "none", border: "none", padding: 0, textAlign: "left", fontSize: 12, fontWeight: 700, color: M.pink }}>
                            Show everything buyers reported
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "0 16px 16px", display: "flex", gap: 10 }}>
                    <button style={{ flex: 1, border: `1px solid ${M.border}`, background: "#fff", color: M.ink, fontWeight: 700, fontSize: 13, padding: "13px 0", borderRadius: 3, letterSpacing: ".03em" }}>
                      KEEP SAVED
                    </button>
                    <button style={{ flex: 1, border: "none", background: M.pink, color: "#fff", fontWeight: 700, fontSize: 13, padding: "13px 0", borderRadius: 3, letterSpacing: ".03em" }}>
                      MOVE TO BAG
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* bottom nav */}
        <div style={{ borderTop: `1px solid ${M.border}`, display: "flex", background: "#fff" }}>
          {[["Home", false], ["Categories", false], ["Studio", false], ["Wishlist", true], ["Profile", false]].map(([label, on]) => (
            <div key={label} style={{ flex: 1, textAlign: "center", padding: "9px 0 11px" }}>
              <div style={{ width: 17, height: 17, margin: "0 auto 4px", borderRadius: 3, border: `1.6px solid ${on ? M.pink : M.ink3}`, background: on ? "#FFEBF0" : "transparent" }} />
              <div style={{ fontSize: 9.5, fontWeight: on ? 700 : 400, color: on ? M.pink : M.ink3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ maxWidth: 412, margin: "12px auto 0", fontSize: 11, color: "#7A7A7A", lineHeight: 1.5, textAlign: "center" }}>
        Prototype. Hem position is calculated from garment length; size, fabric and colour
        findings are read from review text. Product and review data are illustrative.
      </p>
    </div>
  );
}
