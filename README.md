# Reality Check — Myntra wishlist-to-purchase conversion

A product case study on why items saved to a Myntra wishlist never get bought, and a working
prototype that addresses the dominant blocker — under a brief that banned every monetary lever
(no discounts, no cashback, no coupons).

**Live MVP** — https://myntra-reality-check.vercel.app/
**Live discovery engine** — https://myntra-reality-check.vercel.app/engine/

---

## The finding

651 public shopper conversations were scraped from the Google Play Store, Reddit and YouTube,
filtered in two stages, and coded against a 12-class blocker taxonomy.

| Stage | Count |
| --- | --- |
| Raw scrape | 651 |
| Keyword filter (bots and praise removed) | 237 |
| Pre-purchase hesitation, not post-order complaints | 68 |
| Coded as carrying an identifiable blocker | 43 |

**51%** of coded records were blocked on fit or fabric verification. **2%** were waiting for a
price drop — the lowest-ranked blocker of ten. The shopper is not waiting for a discount. She is
waiting for a fact the product page does not carry: how long the garment will be on *her* body,
whether the fabric is sheer, whether the colour is true.

One structural finding shaped the method: only **2 of 184** keyword-passing app-store reviews
mentioned a wishlist at all. App-store reviews are a post-purchase channel — people write them
after an order goes wrong. Wishlist abandonment happens before purchase. Reddit and YouTube
therefore carry the analytical weight here despite lower raw volume.

Triangulated against 6 semi-structured interviews run in English, Hindi and Marathi.

## The prototype

`app/RealityCheck.jsx` — a Myntra wishlist screen that asks the shopper what is actually stopping
her on a saved item, then answers only that doubt from buyer review text: fabric opacity, colour
accuracy, durability after washing, and garment length drawn against her own height rather than
the ~175cm model every product is photographed on.

`engine/WishlistSignalLab.jsx` — the discovery engine. Runs the two-stage filter and the blocker
coding over the scraped corpus and ranks blockers by an opportunity score that weights price-wait
down, because the brief rules monetary levers out.

## Layout

```
app/      RealityCheck.jsx          the MVP, single-file React component
engine/   WishlistSignalLab.jsx     the AI discovery engine, single-file React component
data/     corpus_keyword_filtered_237.csv   after stage one
          corpus_pre_purchase_68.txt        after stage two, tab-separated (PS / RD / YT)
          coded_records_43.csv              final coded set with blocker, intensity, intent
```

## How it runs

Both apps are static. Every model verdict was computed once, ahead of time, and baked into the
build — there is no API key, no server and no per-view inference cost. That is also how a
production version would work: review text changes rarely, so verdicts are batch-processed rather
than generated per page view.

Built as Next.js static exports (`output: "export"`), the engine mounted at `basePath: "/engine"`
so both apps share one deployment. Deployed on Vercel.

## Data provenance

Play Store reviews via `google-play-scraper`. Reddit via Apify (`trudax/reddit-scraper-lite`),
scoped by start URL to r/IndianFashionAddicts, r/TwoXIndia and r/OnlineShoppingIndia. YouTube
comments via Apify (`streamers/youtube-comments-scraper`) on Myntra haul and try-on videos.
All public data, collected August 2026.

Interview free-text from four of six participants is excluded from the findings: those
participants were shown example answers during the interview and their text matched them.
Structured responses from all six are retained. The limitation is documented rather than
quietly dropped.

## Context

Built as a product management case study for the NextLeap PM Fellowship, October 2026.
Not affiliated with or endorsed by Myntra. Brand names and product imagery belong to their owners
and appear here only to make the prototype legible as a case study.
