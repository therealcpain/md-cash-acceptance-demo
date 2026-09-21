/**
 * MD Cash Acceptance Clock — paste (1) Maryland shopper? yes/no,
 * (2) category: food / water / hygiene / health / fuel / other,
 * (3) amount band: <$5 / $5–<$300 / ≥$300,
 * (4) time: 6am–10pm / outside,
 * (5) view date → one shareable card:
 * days until Oct 1 / live / not covered.
 * Brand: MD Cash Acceptance Clock only. User-pasted chips; no merchant scrape.
 * Never invents a named store’s cash policy. No “legal tender everywhere” framing.
 * Distinct from MD Grocery Price Ban (HB 895) and Parking App Fee.
 * Not legal advice. AG Consumer Protection after ≥2 compliance chances — no lawsuit CTA.
 */
(function () {
  "use strict";

  const HB191_PDF =
    "https://mgaleg.maryland.gov/2026RS/bills/hb/hb0191e.pdf";
  const BAY_NET =
    "https://thebaynet.com/new-maryland-laws-october-2026/";
  const FISCAL_NOTE =
    "https://mgaleg.maryland.gov/2026RS/fnotes/bil_0001/hb0191.pdf";
  const AG_CONSUMER =
    "https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx";

  const EFFECTIVE_ISO = "2026-10-01";
  const EFFECTIVE_LABEL = "Oct 1 2026";

  const CITE_ONE_LINER =
    "Maryland HB 191 enrolled: between 6 a.m. and 10 p.m., for in-person retail totaling ≥$5 and <$300, merchants may not prohibit cash, require credit/debit, or charge a higher cash price for essential consumer goods (food incl. pet food; water/beverages; hygiene & cleaning; medicine/medical/PPE; fuel). Exceptions: phone/mail/internet; vending/kiosk; on-premises food/beverage; gourmet/specialty food shops; membership-required fuel; parking. Merchants may refuse denominations >$20 or offer a fee-free on-site cash→prepaid device (must accept cash if device fails). AG Consumer Protection: ≥2 compliance opportunities before civil fines. Shall take effect October 1, 2026. The Bay Net Sep 5 2026 digest. Not legal advice. We never invent a named store’s cash policy.";

  const DISCLAIMER_SHORT =
    "Not legal advice. Maryland HB 191 literacy only — not a merchant scrape, not a lawsuit funnel, not “cash is legal tender everywhere.” AG Consumer Protection after ≥2 compliance opportunities. Restaurants / vending / online / membership fuel / parking and <$5 / ≥$300 / outside 6am–10pm may be out of scope. We never invent a named store’s cash policy.";

  const SCOPE_CHIP =
    "Covered essentials · $5–<$300 · 6am–10pm: merchant generally may not refuse cash, require card-only, or surcharge cash";

  const EXCEPTION_STRIP =
    "Out of scope / exceptions: restaurants · vending · online · membership fuel · parking · >$20 bills may be refused · fee-free prepaid machine OK if it works";

  const FOOTER_ENFORCEMENT =
    "Maryland HB 191 · AG Consumer Protection · ≥2 compliance opportunities before civil fines · no private lawsuit CTA on this card";

  const COVERED_CATEGORIES = {
    food: true,
    water: true,
    hygiene: true,
    health: true,
    fuel: true,
    other: false,
  };

  /** Teaching seeds — labeled dates/status. Not live merchant scrapes. */
  const SEEDS = [
    {
      id: "md-grocery-40-2pm",
      label: "MD grocery $40 · 2pm · Sep 21",
      sub: "Teaching · food · mid band · in window · countdown",
      mdShopper: "yes",
      category: "food",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "2026-09-21",
      noteLabel: "MD grocery $40 · 2pm teaching seed",
    },
    {
      id: "live-oct5",
      label: "Live · Oct 5 grocery",
      sub: "Teaching · MD food · mid · in window · post-effective",
      mdShopper: "yes",
      category: "food",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "2026-10-05",
      noteLabel: "Live teaching seed",
    },
    {
      id: "non-md",
      label: "Non-MD · not covered",
      sub: "Teaching · residency out",
      mdShopper: "no",
      category: "food",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "2026-09-21",
      noteLabel: "Non-MD teaching seed",
    },
    {
      id: "other-cat",
      label: "Other category · not covered",
      sub: "Teaching · category out of essentials",
      mdShopper: "yes",
      category: "other",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "2026-09-21",
      noteLabel: "Other-category teaching seed",
    },
    {
      id: "under5",
      label: "Under $5 · not covered",
      sub: "Teaching · amount band out",
      mdShopper: "yes",
      category: "food",
      amountBand: "under5",
      timeWindow: "in",
      viewDate: "2026-09-21",
      noteLabel: "Under-$5 teaching seed",
    },
    {
      id: "outside-hours",
      label: "Outside hours · not covered",
      sub: "Teaching · time window out",
      mdShopper: "yes",
      category: "fuel",
      amountBand: "mid",
      timeWindow: "out",
      viewDate: "2026-09-21",
      noteLabel: "Outside-hours teaching seed",
    },
    {
      id: "empty-date",
      label: "Empty / missing date",
      sub: "Teaching · honest miss",
      mdShopper: "yes",
      category: "food",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "",
      noteLabel: "Empty-date teaching seed",
    },
    {
      id: "health-ppe",
      label: "Health/PPE · Sep 21 · 10 days",
      sub: "Teaching · health category in scope",
      mdShopper: "yes",
      category: "health",
      amountBand: "mid",
      timeWindow: "in",
      viewDate: "2026-09-21",
      noteLabel: "Health/PPE teaching seed",
    },
  ];

  const $ = (id) => document.getElementById(id);

  function parseISODate(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const parts = s.split("-").map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (
      d.getFullYear() !== parts[0] ||
      d.getMonth() !== parts[1] - 1 ||
      d.getDate() !== parts[2]
    ) {
      return null;
    }
    return d;
  }

  function fmtDate(d) {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function isoFromDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayISO() {
    return isoFromDate(new Date());
  }

  /**
   * Whole calendar days from view date (local) to Oct 1 2026.
   * Sep 21 → 10; Oct 1 → 0 (live / effective day); Oct 5 → -4.
   */
  function daysUntilEffective(viewDate) {
    const eff = parseISODate(EFFECTIVE_ISO);
    const a = Date.UTC(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      viewDate.getDate()
    );
    const b = Date.UTC(eff.getFullYear(), eff.getMonth(), eff.getDate());
    return Math.round((b - a) / 86400000);
  }

  function categoryMeta(flag) {
    const map = {
      food: {
        short: "Food (incl. pet food)",
        inScope: true,
        line: "You marked food (incl. pet food). HB 191 essentials scope includes food when MD + amount + hours align.",
      },
      water: {
        short: "Water / beverages",
        inScope: true,
        line: "You marked water / beverages. HB 191 essentials scope includes water/beverages when MD + amount + hours align.",
      },
      hygiene: {
        short: "Hygiene & cleaning",
        inScope: true,
        line: "You marked hygiene & cleaning. HB 191 essentials scope includes hygiene/cleaning when MD + amount + hours align.",
      },
      health: {
        short: "Health / medicine / PPE",
        inScope: true,
        line: "You marked health / medicine / PPE. HB 191 essentials scope includes medical goods when MD + amount + hours align.",
      },
      fuel: {
        short: "Fuel",
        inScope: true,
        line: "You marked fuel. HB 191 covers fuel when MD + amount + hours align — membership-required fuel is an exception (out of scope).",
      },
      other: {
        short: "Other (not essentials)",
        inScope: false,
        line: "You marked other. This card’s MD cash clock covers listed essentials only — we do not invent that cash must be accepted for non-essentials.",
      },
    };
    return map[flag] || map.other;
  }

  function amountMeta(flag) {
    const map = {
      under5: {
        short: "<$5",
        inScope: false,
        line: "Amount band <$5 is outside HB 191’s ≥$5 and <$300 band.",
      },
      mid: {
        short: "$5 – <$300",
        inScope: true,
        line: "Amount band $5–<$300 is inside HB 191’s coverage band.",
      },
      over300: {
        short: "≥$300",
        inScope: false,
        line: "Amount band ≥$300 is outside HB 191’s ≥$5 and <$300 band.",
      },
    };
    return map[flag] || { short: "—", inScope: false, line: "" };
  }

  function timeMeta(flag) {
    const map = {
      in: {
        short: "6am – 10pm",
        inScope: true,
        line: "Time window 6am–10pm is inside HB 191’s covered hours.",
      },
      out: {
        short: "Outside 6am–10pm",
        inScope: false,
        line: "Outside 6am–10pm is outside HB 191’s covered hours.",
      },
    };
    return map[flag] || { short: "—", inScope: false, line: "" };
  }

  function clockMeta(phase, daysLeft) {
    if (phase === "not_covered_md") {
      return {
        phase: phase,
        pill: "Not covered (non-MD)",
        cls: "danger",
        sub: "Maryland shopper chip = no · HB 191 is a Maryland statute",
        ringLabel: "OUT",
        daysLabel: "Not covered (non-MD)",
        headline: "Not covered — not a Maryland shopper",
        flag:
          "NOT COVERED · non-MD · HB 191 is Maryland cash-for-essentials literacy · we do not invent that another state’s law applies",
      };
    }
    if (phase === "not_covered_category") {
      return {
        phase: phase,
        pill: "Not covered (category)",
        cls: "danger",
        sub: "Category outside listed essentials · food / water / hygiene / health / fuel only",
        ringLabel: "OUT",
        daysLabel: "Not covered (category)",
        headline: "Not covered — category outside essentials",
        flag:
          "NOT COVERED · category out · HB 191 targets listed essential consumer goods · restaurants / vending / online / membership fuel / parking also out of scope · we do not invent coverage",
      };
    }
    if (phase === "not_covered_amount") {
      return {
        phase: phase,
        pill: "Not covered (amount)",
        cls: "danger",
        sub: "Amount outside ≥$5 and <$300 band",
        ringLabel: "OUT",
        daysLabel: "Not covered (amount)",
        headline: "Not covered — amount outside band",
        flag:
          "NOT COVERED · amount band out · HB 191 covers in-person retail totaling ≥$5 and <$300 · we do not invent coverage outside that band",
      };
    }
    if (phase === "not_covered_hours") {
      return {
        phase: phase,
        pill: "Not covered (hours)",
        cls: "danger",
        sub: "Outside 6am–10pm window",
        ringLabel: "OUT",
        daysLabel: "Not covered (hours)",
        headline: "Not covered — outside 6am–10pm",
        flag:
          "NOT COVERED · hours out · HB 191 covers 6 a.m. to 10 p.m. · we do not invent overnight coverage",
      };
    }
    if (phase === "countdown") {
      const n = daysLeft;
      const daysTxt =
        n === 1 ? "1 day until Oct 1" : n + " days until Oct 1";
      return {
        phase: phase,
        pill: daysTxt,
        cls: n <= 7 ? "warn" : "ok",
        sub:
          "Maryland · covered essentials · cash rule effective " +
          EFFECTIVE_LABEL,
        ringLabel: String(n),
        daysLabel: daysTxt,
        headline: daysTxt,
        flag:
          "COUNTDOWN · " +
          n +
          " calendar day" +
          (n === 1 ? "" : "s") +
          " until Oct 1 2026 · after effective date, merchant generally may not refuse cash / require card-only / surcharge cash for covered essentials in-band · exceptions exist",
      };
    }
    // live (daysLeft <= 0)
    return {
      phase: "live",
      pill: "Live",
      cls: "ok",
      sub:
        daysLeft === 0
          ? "Effective TODAY — " + EFFECTIVE_LABEL
          : "Effective since " + EFFECTIVE_LABEL,
      ringLabel: "LIVE",
      daysLabel: "Live",
      headline:
        daysLeft === 0
          ? "Live TODAY — Oct 1 2026"
          : "Live — Maryland cash-for-essentials acceptance",
      flag:
        "LIVE · HB 191 effective " +
        EFFECTIVE_LABEL +
        " · covered essentials · $5–<$300 · 6am–10pm: merchant generally may not refuse cash, require card-only, or surcharge cash · >$20 bills / prepaid machine / restaurant exceptions may still apply · AG after ≥2 compliance chances",
    };
  }

  function validate(input) {
    if (!parseISODate(input.viewDate)) {
      return "Pick a view date (the day you’re looking) — the cash clock needs it. Empty date = honest miss (we will not invent days left).";
    }
    if (input.mdShopper !== "yes" && input.mdShopper !== "no") {
      return "Say whether you are a Maryland shopper (yes/no). Empty = honest miss.";
    }
    if (!(input.category in COVERED_CATEGORIES)) {
      return "Pick a category: food / water / hygiene / health / fuel / other. Empty = honest miss.";
    }
    if (
      input.amountBand !== "under5" &&
      input.amountBand !== "mid" &&
      input.amountBand !== "over300"
    ) {
      return "Pick an amount band: <$5 / $5–<$300 / ≥$300. Empty = honest miss.";
    }
    if (input.timeWindow !== "in" && input.timeWindow !== "out") {
      return "Pick a time window: 6am–10pm / outside. Empty = honest miss.";
    }
    return null;
  }

  function compute(input) {
    const viewDate = parseISODate(input.viewDate);
    const daysLeft = daysUntilEffective(viewDate);
    const cat = categoryMeta(input.category);
    const amt = amountMeta(input.amountBand);
    const tim = timeMeta(input.timeWindow);

    let phase = "countdown";
    if (input.mdShopper === "no") {
      phase = "not_covered_md";
    } else if (!cat.inScope) {
      phase = "not_covered_category";
    } else if (!amt.inScope) {
      phase = "not_covered_amount";
    } else if (!tim.inScope) {
      phase = "not_covered_hours";
    } else if (daysLeft <= 0) {
      phase = "live";
    } else {
      phase = "countdown";
    }

    const clock = clockMeta(phase, daysLeft);

    let pct = 0;
    if (phase === "countdown" && daysLeft > 0) {
      pct = Math.max(2, Math.min(100, Math.round((daysLeft / 30) * 100)));
    } else if (phase === "live") {
      pct = 100;
    }

    const decoder =
      phase === "not_covered_md"
        ? "You marked you are not a Maryland shopper. HB 191 is a Maryland statute. This card does not invent that another state’s cash rule applies. Distinct from MD Grocery Price Ban (HB 895) and from Parking App Fee."
        : phase === "not_covered_category"
          ? "You marked a category outside listed essentials. HB 191 covers food, water/beverages, hygiene & cleaning, medicine/medical/PPE, and fuel — not a blanket “cash everywhere” rule. Restaurants, vending, online, membership fuel, and parking are also out of scope."
          : phase === "not_covered_amount"
            ? "Your amount band is outside ≥$5 and <$300. HB 191’s cash-acceptance rule for essentials applies inside that band only. We do not invent coverage for under-$5 or ≥$300 tickets."
            : phase === "not_covered_hours"
              ? "Your time is outside 6 a.m.–10 p.m. HB 191’s covered hours are that window only. We do not invent overnight cash-acceptance coverage."
              : phase === "live"
                ? "HB 191 is effective. For covered essentials in-band during 6am–10pm, merchants generally may not refuse cash, require card-only, or surcharge cash. Exceptions (restaurants / vending / online / membership fuel / parking) and >$20 bill / fee-free prepaid-machine rules still apply. Enforcement is AG Consumer Protection after ≥2 compliance opportunities — this card is not a lawsuit form."
                : "HB 191 takes effect " +
                  EFFECTIVE_LABEL +
                  ". Until then this card is calendar literacy — not a complaint form. In-scope: listed essentials · $5–<$300 · 6am–10pm. Exceptions mean this is not “cash is legal tender everywhere.”";

    const action =
      "Calm next step: read HB 191 enrolled PDF + Bay Net Sep 5 2026 + fiscal note. Questions about enforcement → Maryland AG Consumer Protection (after ≥2 compliance opportunities). This card is not legal advice and not a private-lawsuit funnel.";

    return {
      mdShopper: input.mdShopper,
      category: input.category,
      categoryLabel: cat.short,
      categoryLine: cat.line,
      amountBand: input.amountBand,
      amountLabel: amt.short,
      amountLine: amt.line,
      timeWindow: input.timeWindow,
      timeLabel: tim.short,
      timeLine: tim.line,
      viewDate: viewDate,
      viewDateISO: input.viewDate,
      daysLeft: daysLeft,
      phase: phase,
      clock: clock,
      pct: pct,
      scopeChip: SCOPE_CHIP,
      exceptionStrip: EXCEPTION_STRIP,
      footerEnforcement: FOOTER_ENFORCEMENT,
      decoder: decoder,
      action: action,
      noteLabel: (input.noteLabel || "").trim(),
      cite: CITE_ONE_LINER,
      disclaimer: DISCLAIMER_SHORT,
    };
  }

  function readInputs() {
    return {
      mdShopper: $("mdShopper").value || "",
      category: $("category").value || "",
      amountBand: $("amountBand").value || "",
      timeWindow: $("timeWindow").value || "",
      viewDate: ($("viewDate").value || "").trim(),
      noteLabel: ($("noteLabel").value || "").trim(),
    };
  }

  function applyInputs(p) {
    $("mdShopper").value = p.mdShopper || "";
    $("category").value = p.category || "";
    $("amountBand").value = p.amountBand || "";
    $("timeWindow").value = p.timeWindow || "";
    $("viewDate").value = p.viewDate || "";
    $("noteLabel").value = p.noteLabel || "";
  }

  function encodeHash(input) {
    try {
      const payload = {
        md: input.mdShopper,
        cat: input.category,
        amt: input.amountBand,
        tm: input.timeWindow,
        v: input.viewDate,
        n: input.noteLabel || "",
      };
      return "#p=" + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) {
      return "";
    }
  }

  function decodeHash() {
    const h = location.hash || "";
    const m = h.match(/#p=([A-Za-z0-9+/=]+)/);
    if (!m) return null;
    try {
      const raw = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
      return {
        mdShopper: raw.md || "",
        category: raw.cat || "",
        amountBand: raw.amt || "",
        timeWindow: raw.tm || "",
        viewDate: raw.v || "",
        noteLabel: raw.n || "",
      };
    } catch (e) {
      return null;
    }
  }

  function setStatus(msg, isErr) {
    const el = $("status");
    el.textContent = msg || "";
    el.className = "status" + (isErr ? " err" : "");
  }

  function renderCard() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("cardSection").hidden = true;
      setStatus(err, true);
      return null;
    }
    const c = compute(input);
    $("cardSection").hidden = false;
    setStatus("");

    $("cardMeta").textContent =
      (c.noteLabel ? c.noteLabel + " · " : "") +
      "View " +
      fmtDate(c.viewDate) +
      " · " +
      (c.mdShopper === "yes" ? "MD shopper" : "Non-MD") +
      " · " +
      c.categoryLabel +
      " · " +
      c.amountLabel +
      " · " +
      c.timeLabel;

    $("dlHeadline").textContent = c.clock.headline;
    $("statusPill").textContent = c.clock.pill;
    $("statusPill").className = "verdict-k " + (c.clock.cls || "");
    $("statusSub").textContent = c.clock.sub;
    $("statusBadge").className = "verdict";

    $("viewDateDisp").textContent = fmtDate(c.viewDate);
    $("daysDisp").textContent = c.clock.daysLabel;
    $("deadlineLine").textContent =
      "Cash rule effective " + EFFECTIVE_LABEL + " · HB 191";

    $("daysRingDisp").textContent = c.clock.ringLabel;
    $("daysRing").style.setProperty("--pct", String(c.pct));
    $("windowLine").textContent = c.clock.sub;

    $("actionFlag").textContent = c.clock.flag;
    $("actionFlag").className =
      "look-enroll-flag" + (c.clock.cls ? " " + c.clock.cls : "");
    $("scopeChipStrip").textContent = c.scopeChip;
    $("exceptionStrip").textContent = c.exceptionStrip;
    $("enforceStrip").textContent = c.footerEnforcement;

    $("rMd").textContent = c.mdShopper === "yes" ? "Yes — MD" : "No — non-MD";
    $("rCategory").textContent = c.categoryLabel;
    $("rAmountTime").textContent = c.amountLabel + " · " + c.timeLabel;
    $("rStatus").textContent = c.clock.pill;

    $("decoderLine").textContent = c.decoder;
    $("actionLine").textContent = c.action;
    $("citeLine").textContent = c.cite;

    const hash = encodeHash(input);
    if (hash) {
      history.replaceState(null, "", hash);
      $("shareUrl").value = location.href.split("#")[0] + hash;
      $("shareBox").hidden = false;
    }

    return c;
  }

  function clearAll() {
    $("mdShopper").value = "";
    $("category").value = "";
    $("amountBand").value = "";
    $("timeWindow").value = "";
    $("viewDate").value = "";
    $("noteLabel").value = "";
    $("cardSection").hidden = true;
    $("shareBox").hidden = true;
    setStatus("");
    history.replaceState(null, "", location.pathname + location.search);
  }

  function summaryText(c) {
    return [
      "MD Cash Acceptance Clock",
      c.clock.pill,
      c.clock.sub,
      "MD shopper: " + (c.mdShopper === "yes" ? "yes" : "no"),
      "Category: " + c.categoryLabel,
      "Amount: " + c.amountLabel,
      "Time: " + c.timeLabel,
      "View date: " + fmtDate(c.viewDate),
      c.scopeChip,
      c.exceptionStrip,
      c.footerEnforcement,
      DISCLAIMER_SHORT,
      "Cite: HB 191 enrolled · Bay Net Sep 5 2026 · fiscal note",
    ].join("\n");
  }

  function copySummary() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    const c = compute(input);
    const text = summaryText(c);
    navigator.clipboard.writeText(text).then(
      function () {
        setStatus("Summary copied.");
      },
      function () {
        setStatus("Clipboard blocked — select share URL instead.", true);
      }
    );
  }

  function shareLink() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    renderCard();
    const url = $("shareUrl").value;
    if (navigator.share) {
      navigator
        .share({
          title: "MD Cash Acceptance Clock",
          text: "Maryland cash-for-essentials clock — HB 191 / Oct 1 2026",
          url: url,
        })
        .catch(function () {
          setStatus("Share canceled.");
        });
    } else {
      navigator.clipboard.writeText(url).then(
        function () {
          setStatus("Share link copied.");
        },
        function () {
          setStatus("Copy the share URL from the box.", true);
        }
      );
    }
  }

  function copyShare() {
    const url = $("shareUrl").value;
    navigator.clipboard.writeText(url).then(
      function () {
        setStatus("Share link copied.");
      },
      function () {
        setStatus("Clipboard blocked.", true);
      }
    );
  }

  function wrapText(ctx, text, x, y, maxW, lineH) {
    const words = text.split(/\s+/);
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += lineH;
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineH;
    }
    return y;
  }

  function exportPng() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    const c = compute(input);
    const canvas = $("pngCanvas");
    const ctx = canvas.getContext("2d");
    const W = 900;
    const H = 1200;
    canvas.width = W;
    canvas.height = H;

    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, W, H);

    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, "#7eb8e8");
    grad.addColorStop(0.5, "#f0b429");
    grad.addColorStop(1, "#3ecf8e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 8);

    let y = 56;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("MD Cash Acceptance Clock", 48, y);

    y += 36;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "700 36px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.clock.headline, 48, y, W - 96, 42);

    y += 16;
    ctx.fillStyle =
      c.clock.cls === "ok"
        ? "#3ecf8e"
        : c.clock.cls === "warn"
          ? "#f0b429"
          : "#f07178";
    ctx.font = "700 48px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText(c.clock.daysLabel, 48, y);

    y += 40;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 18px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.clock.sub, 48, y, W - 96, 26);

    y += 28;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.scopeChip, 48, y, W - 96, 24);

    y += 20;
    ctx.fillStyle = "#f0b429";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.exceptionStrip, 48, y, W - 96, 24);

    y += 28;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "400 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(
      ctx,
      "MD: " +
        (c.mdShopper === "yes" ? "yes" : "no") +
        " · " +
        c.categoryLabel +
        " · " +
        c.amountLabel +
        " · " +
        c.timeLabel +
        " · View: " +
        fmtDate(c.viewDate),
      48,
      y,
      W - 96,
      24
    );

    y += 24;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.footerEnforcement, 48, y, W - 96, 20);

    y += 20;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 13px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(
      ctx,
      "Cite: HB 191 enrolled PDF · Bay Net Sep 5 2026 · fiscal note",
      48,
      y,
      W - 96,
      18
    );

    y += 28;
    ctx.fillStyle = "#f07178";
    ctx.font = "600 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, DISCLAIMER_SHORT, 48, y, W - 96, 20);

    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText(
      "User-pasted chips only · no merchant scrape · ≠ legal tender everywhere · ≠ HB 895 grocery ban",
      48,
      H - 36
    );

    canvas.toBlob(function (blob) {
      if (!blob) {
        $("status").textContent = "PNG export failed.";
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download =
        "md-cash-acceptance-" +
        (c.phase || "status") +
        "-" +
        (input.viewDate || "view") +
        ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      $("status").textContent = "PNG downloaded.";
    });
  }

  function renderChips() {
    const wrap = $("seedChips");
    wrap.innerHTML = "";
    SEEDS.forEach(function (s) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "seed-chip";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        s.label + '<span class="chip-sub">' + s.sub + "</span>";
      btn.addEventListener("click", function () {
        applyInputs({
          mdShopper: s.mdShopper,
          category: s.category,
          amountBand: s.amountBand,
          timeWindow: s.timeWindow,
          viewDate: s.viewDate,
          noteLabel: s.noteLabel,
        });
        if (!s.viewDate) {
          $("cardSection").hidden = true;
          setStatus(
            "Pick a view date (the day you’re looking) — the cash clock needs it. Empty date = honest miss (we will not invent days left).",
            true
          );
          return;
        }
        renderCard();
      });
      wrap.appendChild(btn);
    });
  }

  function renderSources() {
    const el = $("sourceLinks");
    el.innerHTML =
      "<strong>Sources</strong> · " +
      '<a href="' +
      HB191_PDF +
      '" target="_blank" rel="noopener noreferrer">HB 191 enrolled PDF</a> · ' +
      '<a href="' +
      BAY_NET +
      '" target="_blank" rel="noopener noreferrer">Bay Net Sep 5 2026</a> · ' +
      '<a href="' +
      FISCAL_NOTE +
      '" target="_blank" rel="noopener noreferrer">Fiscal &amp; policy note</a> · ' +
      '<a href="' +
      AG_CONSUMER +
      '" target="_blank" rel="noopener noreferrer">MD AG Consumer Protection</a>';
  }

  function bind() {
    if (!$("viewDate").value) $("viewDate").value = todayISO();
    renderChips();
    renderSources();

    $("cardBtn").addEventListener("click", renderCard);
    $("clearBtn").addEventListener("click", clearAll);
    $("copySummary").addEventListener("click", copySummary);
    $("shareBtn").addEventListener("click", shareLink);
    $("copyShare").addEventListener("click", copyShare);
    $("pngBtn").addEventListener("click", exportPng);

    window.addEventListener("hashchange", function () {
      const p = decodeHash();
      if (p) {
        applyInputs(p);
        renderCard();
      }
    });

    const fromHash = decodeHash();
    if (fromHash) {
      applyInputs(fromHash);
      renderCard();
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind);
    } else {
      bind();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      SEEDS: SEEDS,
      EFFECTIVE_ISO: EFFECTIVE_ISO,
      EFFECTIVE_LABEL: EFFECTIVE_LABEL,
      COVERED_CATEGORIES: COVERED_CATEGORIES,
      parseISODate: parseISODate,
      daysUntilEffective: daysUntilEffective,
      categoryMeta: categoryMeta,
      amountMeta: amountMeta,
      timeMeta: timeMeta,
      clockMeta: clockMeta,
      validate: validate,
      compute: compute,
      fmtDate: fmtDate,
      DISCLAIMER_SHORT: DISCLAIMER_SHORT,
      CITE_ONE_LINER: CITE_ONE_LINER,
      SCOPE_CHIP: SCOPE_CHIP,
      EXCEPTION_STRIP: EXCEPTION_STRIP,
      FOOTER_ENFORCEMENT: FOOTER_ENFORCEMENT,
    };
  }
})();
