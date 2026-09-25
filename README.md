# MD Cash Acceptance Clock

**Paste (1) Maryland shopper? yes/no, (2) category: food / water / hygiene-cleaning / health-PPE / fuel / other, (3) amount band: < $300 / ≥ $300, (4) time: 6am–10pm / outside, (5) view date → one shareable card:**  
giant **days until Oct 1 / live / not covered** · **covered essentials · < $300 · 6am–10pm: merchant generally may not refuse cash, require card-only, or surcharge cash** chip · **up to 4 cents** when rounding a cash price under applicable law · statutory exceptions **phone/mail/internet · vending machines/kiosks · on-premises food/beverage or limited gourmet/specialty foods · membership-required fuel · >$20 bills · fee-free prepaid machine** · Maryland **HB 191** (Chapter 714 of 2026) + **AG Consumer Protection Division** pointer (after at least **two opportunities to comply**, up to **$500** per violation, then up to **$1,000** per subsequent violation — **no private lawsuit CTA**).

Brand on the surface: **MD Cash Acceptance Clock** only (product-only; no Conglomerate / Brew City / personal names).

**Not legal advice.** User-pasted chips only — zero merchant POS scrape. Never invent a named store’s cash policy. **Not** a “cash is legal tender everywhere” meme. **Distinct from** MD Grocery Price Ban (HB 895) and Parking App Fee. Parking isn’t an essential good, so it’s out of scope for that reason. **Hard-avoid** class-action lead-gen — AG Consumer Protection Division after at least two opportunities to comply (up to $500, then up to $1,000) only.

## Hypothesis

MD shoppers hit “card only” signs at pharmacy/grocery/fuel and hear conflicting “legal tender” folklore. Flip that fog into an **effective-date-honest eligibility clock** — without scraping merchant policies or naming a chain as a violator. Success = “screenshot — after Oct 1, this $40 grocery run is cash-protected 6a–10p” shares in the week before Oct 1.

## How to test (local)

```bash
cd kb/mde/md-cash-acceptance
npm run build          # copies assets → dist/
# either open the file:
open index.html        # or dist/index.html
# or serve:
npm start              # http://localhost:4249
```

Manual checklist:

1. Open the page → click **MD grocery $40 · 2pm · Sep 21** → giant **10 days until Oct 1**.
2. Click **Live · Oct 5 grocery** → **Live**.
3. Click **Non-MD · not covered** → Not covered (non-MD).
4. Click **Other category · not covered** → Not covered (category).
5. Click **Under $5 · covered** → countdown (small total is still in the < $300 band).
6. Click **Outside hours · not covered** → Not covered (hours).
7. Click **Empty / missing date** → honest miss.
8. Paste your own flags → **Show cash clock**.
9. **Copy summary** → clipboard has status + scope + HB 191 cite + disclaimer.
10. **Share link** → `#p=` restores the card.
11. **Export PNG** → dark clock card with giant status + disclaimer on the face (not color-only).
12. Surface brand is **MD Cash Acceptance Clock** only (no Conglomerate / personal names).
13. GoatCounter script present in `<head>` (`mdcashaccept.goatcounter.com`).

### GitHub Pages

This folder is static-ready. Point Pages at `/` of a dedicated repo (or `/docs` after copying `dist/`), with `index.html` at the site root. Relative paths (`styles.css`, `app.js`) work on project pages.

**Try URL (target):** https://therealcpain.github.io/md-cash-acceptance-demo/

```bash
npm run build   # optional artifact in dist/
```

Do **not** create the public repo or post from this build step — Steward handles Pages + distro + GoatCounter site creation. Distro stays product-linked only (e.g. r/maryland, r/baltimore, r/frugal in the Sep 22–Oct 5 window). **No sock accounts.** No “boycott cashless chains” farms. No private-lawsuit CTA.

## Seed cohort (MVP)

Labeled teaching dates — not live merchant scrapes. Never invent a store’s cash policy.

| Chip | Inputs | Teaching point |
|------|--------|----------------|
| MD grocery $40 · 2pm · Sep 21 | MD · food · < $300 · in · view 2026-09-21 | 10 days until Oct 1 |
| Live · Oct 5 grocery | MD · food · < $300 · in · view 2026-10-05 | Live |
| Non-MD · not covered | mdShopper = no | Not covered (non-MD) |
| Other category · not covered | category = other | Not covered (category) |
| Under $5 · covered | amountBand = under300 | Covered (no dollar floor; small total still in band) |
| Outside hours · not covered | timeWindow = out | Not covered (hours) |
| Empty / missing date | blank view date | Honest miss |
| Health/PPE · Sep 21 · 10 days | MD · health · < $300 · in | Health category in scope |

## Coverage logic (public statute framing)

| Rule | Framing |
|------|---------|
| Effective | **Oct 1 2026** (HB 191) |
| Not MD | → **not covered (non-MD)** |
| Category other | → **not covered (category)** |
| Amount < $300 | → in band (covered when the other gates pass) |
| Amount ≥ $300 | → **not covered (amount)** |
| Outside 6am–10pm | → **not covered (hours)** |
| MD + essentials + < $300 + in + view &lt; Oct 1 | → **days until Oct 1** |
| MD + essentials + < $300 + in + view ≥ Oct 1 | → **live** |
| Scope | Food · water · hygiene · health/PPE · fuel · **< $300** · **6am–10pm** |
| Rounding | Up to **4 cents** extra when rounding a cash price under applicable law |
| Exceptions | Phone/mail/internet · vending machines/kiosks · on-premises food/beverage or limited gourmet/specialty foods · membership-required fuel · **>$20** bills · fee-free prepaid machine |
| Not an essential | Parking and other non-essentials are out of scope because they aren’t essential goods |
| Enforcement | AG Consumer Protection Division · at least **two opportunities to comply** · up to **$500** per violation, then up to **$1,000** per subsequent violation · **no private lawsuit CTA** |
| Distinct | ≠ HB 895 grocery price ban · ≠ Parking App Fee |
| Pointers | HB 191 enrolled PDF · Bay Net Sep 5 2026 · fiscal note |

## Ads pathway (ad-only free utility — do not spend yet)

| Path | Notes |
|------|--------|
| **Revenue (primary)** | **AdSense / display under the card + “when must Maryland stores take cash for essentials?” explainer** (not inside the PNG). Inventory spikes Sep 22–Oct 10. Justified when sessions cover hosting. Free card forever — **no paywall**, no Gumroad. |
| **Brand-safe** | Informational clock + public HB 191 / Bay Net cites. **Not legal advice.** Ads **not** inside PNG. **Hard-avoid** class-action lead-gen affiliates. AG Consumer Protection Division after at least two opportunities to comply (up to $500, then up to $1,000) only. |
| **Acquisition (gated)** | Google “Maryland cash payment law October 2026” / “HB 191 cash essential goods” + Reddit MD promo. Creative = “MD shopper? Paste time + cart band — cash-protected after Oct 1?”. Max CPA abort ~$0.30–0.50 without a completed share. Debit/cash only. **Spend only after one organic maryland-thread test.** |
| **UTM** | Example: `?utm_source=reddit&utm_medium=organic&utm_campaign=md_cash_acceptance_mvp` |
| **Tracking** | GoatCounter (`mdcashaccept.goatcounter.com`) from day 1 + card gens + share clicks when Pages is live. |
| **Abort sketch** | Pause paid if CPA exceeds band without share / “cash-protected after Oct 1” replies. |

**No spend from this ready_for_pages step.** Ads are the monetization path (**ad-only OK**).

## Product constraints

- Single static site (no backend).
- **Flags only from user paste** (or labeled seeds). Never invent store cash policy or coverage beyond paste.
- Brand: **MD Cash Acceptance Clock** only on surface.
- Status text-labeled (not color-only). Disclaimer always visible on page + share PNG.
- Share = URL hash + PNG + copy summary.
- No merchant scrape. No lawsuit funnel. No Gumroad. No sock farms.
- GoatCounter embedded in `<head>` from day 1.
- Distinct JTBD from MD Grocery Price Ban and Parking App Fee. Parking isn’t an essential good under HB 191.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell (GitHub Pages entry) + GoatCounter |
| `app.js` | Oct 1 gate, MD/category/amount/hours outs, seeds, card, share hash, PNG |
| `styles.css` | MD Cash Acceptance Clock UI |
| `scripts/build.js` | `npm run build` → `dist/` |
| `package.json` | build / start / preview scripts |

## Opportunity

Internal card: `opp_consumer_md_cash_acceptance` (consumer / Maryland retail).  
Experiment stub: `institutions/mde/experiments/exp_md_cash_acceptance.md`.
