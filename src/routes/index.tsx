import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Settings,
  X,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  Users,
  Heart,
  Download,
  Smile,
  Frown,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Invitation,
});

const palaceHero = { url: "/palace-hero-user.jpg" };

/* ---------------- Configurable content ---------------- */
const weddingConfig = {
  bride: "Nisha",
  groom: "Vikram",
  weddingDate: "2026-11-20",
  weddingDateLabel: "20 · November · 2026",
  venue: "The Leela Palace, New Delhi",
  hashtag: "#NishaWedsVikram",
  parents: {
    bride: "Daughter of Mr. & Mrs. Rajesh Malhotra",
    groom: "Son of Mr. & Mrs. Ashok Khanna",
  },
  blessing:
    "With the blessings of our families, we joyfully invite you to share in our happiness as we begin our journey together.",
  events: [
    {
      title: "Mehendi",
      date: "18 November 2026",
      time: "4:00 PM onwards",
      venue: "Malhotra Residence, New Delhi",
      description:
        "An afternoon of henna, marigolds, and folk songs — the softest way to begin the celebrations.",
      motif: "🌼",
    },
    {
      title: "Sangeet",
      date: "19 November 2026",
      time: "7:30 PM onwards",
      venue: "The Leela Palace, Chanakyapuri",
      description:
        "A night of music and dance where both families come together to celebrate love in rhythm.",
      motif: "🎶",
    },
    {
      title: "Haldi",
      date: "20 November 2026",
      time: "10:00 AM onwards",
      venue: "The Leela Palace, Chanakyapuri",
      description:
        "A sunlit ritual of turmeric, laughter, and blessings from the ones we love the most.",
      motif: "🌻",
    },
    {
      title: "The Wedding",
      date: "20 November 2026",
      time: "7:00 PM onwards",
      venue: "The Leela Palace, Chanakyapuri",
      description:
        "Seven vows, seven steps, and a lifetime of promises — under a canopy of gold and stars.",
      motif: "✦",
    },
  ],
  gallery: [
    "https://cdn.phototourl.com/free/2026-07-01-ad8e354b-47d1-4ecd-9e70-8c3d40e3be70.jpg",
    "https://cdn.phototourl.com/free/2026-07-01-cfc9f654-d0af-4b62-8683-23e018487089.jpg",
    "https://cdn.phototourl.com/free/2026-07-01-45e4a955-04fc-4b1c-95bc-95e47a567a30.jpg",
    "https://cdn.phototourl.com/free/2026-07-01-0d149ff2-afff-440d-83d0-39eb4731425b.jpg",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80",
  ],
  thingsToKnow: [
    { title: "Dress Code", body: "Traditional Indian attire in ivory, gold, and jewel tones.", icon: "👗" },
    { title: "Venue", body: "The Leela Palace, Diplomatic Enclave, Chanakyapuri, New Delhi 110023.", icon: "📍" },
    { title: "Parking", body: "Complimentary valet parking available at the porte-cochère.", icon: "🚗" },
    { title: "Accommodation", body: "Rooms have been blocked at The Leela Palace at preferred rates.", icon: "🏨" },
    { title: "Hashtag", body: "#NishaWedsVikram — please share your favourite moments.", icon: "✨" },
    { title: "Follow along", body: "@nisha.and.vikram on Instagram for live stories.", icon: "📸" },
  ],
  rsvp: {
    heading: "Will you join us?",
    subtext:
      "We have saved a seat for you — at our table, in our hearts, and under the Delhi sky. Come celebrate with us as we begin this beautiful new chapter together.",
    btnText: "Yes, I'll be there",
    whatsapp: "https://wa.me/",
  },
};

// Local storage keys
const CONFIG_KEY = "wedding_custom_config";
const RSVP_KEY = "wedding_rsvp_response";
const SUBMISSIONS_KEY = "wedding_rsvp_submissions";

/* ---------------- TypeScript types ---------------- */
type RsvpInput = {
  name: string;
  attending: "yes" | "no" | "";
  guestsCount: number;
  events: string[];
  notes: string;
};

type RsvpSubmission = RsvpInput & {
  id: string;
  submittedAt: string;
};

/* ---------------- Small helpers ---------------- */
function useCountdown(target: string) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setRemaining(diff(target));
    const id = setInterval(() => setRemaining(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return remaining;
}
function diff(target: string) {
  const t = new Date(target).getTime() - Date.now();
  const clamp = Math.max(0, t);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

/* ---------------- SVG ornaments ---------------- */
const Ganesh = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="46" opacity="0.35" />
    <circle cx="50" cy="50" r="38" opacity="0.55" />
    <path d="M50 22c-6 0-10 4-10 9 0 4 3 6 3 9 0 2-2 4-2 7 0 4 4 7 9 7s9-3 9-7c0-3-2-5-2-7 0-3 3-5 3-9 0-5-4-9-10-9z" />
    <path d="M35 48c-4 3-7 8-7 14 0 10 10 18 22 18s22-8 22-18c0-6-3-11-7-14" />
    <path d="M42 62c0 3 3 5 8 5s8-2 8-5" />
    <path d="M32 55c-4 1-8 4-8 8" />
    <path d="M68 55c4 1 8 4 8 8" />
    <path d="M50 30v-8M46 26l-4-4M54 26l4-4" />
  </svg>
);

const Ornament = () => (
  <svg viewBox="0 0 120 24" className="w-40 h-6 text-[color-mix(in_oklab,var(--gold)_90%,var(--bronze))]" fill="none" stroke="currentColor" strokeWidth="0.8">
    <path d="M2 12 H50" />
    <path d="M70 12 H118" />
    <circle cx="60" cy="12" r="4" />
    <circle cx="60" cy="12" r="1.5" fill="currentColor" />
    <path d="M56 12 Q60 4 64 12 Q60 20 56 12 Z" />
  </svg>
);

/* Reference-design asset base (elephants, toran, ganesha, etc.) */
const REFI = "https://pub-1cc0f6e993214be9a36badeeb631f4b6.r2.dev/templates/template01/assets";

/* ---------------- Component ---------------- */
function Invitation() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<{ stop: () => void; start: () => void } | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [gatePhase, setGatePhase] = useState<"closed" | "opening" | "done">("closed");

  // States for localStorage config
  const [config, setConfig] = useState(weddingConfig);
  const [draftConfig, setDraftConfig] = useState(weddingConfig);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<"general" | "events" | "gallery" | "rsvps">("general");

  // Guest RSVP Form States
  const [rsvpInput, setRsvpInput] = useState<RsvpInput>({
    name: "",
    attending: "",
    guestsCount: 1,
    events: [],
    notes: "",
  });
  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(null);
  const [allSubmissions, setAllSubmissions] = useState<RsvpSubmission[]>([]);

  // Load configuration and submissions on mount
  useEffect(() => {
    // Config
    const localConfig = localStorage.getItem(CONFIG_KEY);
    if (localConfig) {
      try {
        const parsed = JSON.parse(localConfig);
        setConfig(parsed);
        setDraftConfig(parsed);
      } catch (e) {
        console.error("Failed to parse local config", e);
      }
    }

    // Personal RSVP
    const localRsvp = localStorage.getItem(RSVP_KEY);
    if (localRsvp) {
      try {
        const parsed = JSON.parse(localRsvp);
        setSavedRsvp(parsed);
        setRsvpInput(parsed);
      } catch (e) {
        console.error("Failed to parse local RSVP", e);
      }
    }

    // All submissions (Admin view)
    const localSubs = localStorage.getItem(SUBMISSIONS_KEY);
    if (localSubs) {
      try {
        setAllSubmissions(JSON.parse(localSubs));
      } catch (e) {
        console.error("Failed to parse submissions", e);
      }
    }
  }, []);

  const countdown = useCountdown(config.weddingDate);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let rafId = 0;
    let lenisInstance: { destroy: () => void; raf: (t: number) => void } | null = null;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod, splitMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      const SplitType = splitMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---- Lenis smooth scroll ----
      const lenis = new Lenis({ duration: 1.35, smoothWheel: true, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      lenisInstance = lenis as unknown as typeof lenisInstance;
      lenisRef.current = lenis as unknown as typeof lenisRef.current;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // ---- Preloader (optional) ----
      if (preloaderRef.current) {
        const plTl = gsap.timeline();
        plTl
          .from(".pl-mandala circle, .pl-mandala path, .pl-mandala line", {
            drawSVG: 0,
            strokeDasharray: 400, strokeDashoffset: 400,
            duration: 1.6, ease: "power2.out", stagger: 0.05,
          })
          .from(".pl-name, .pl-amp, .pl-date", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "-=1.2")
          .to(preloaderRef.current, { opacity: 0, duration: 1, ease: "power2.inOut", delay: 0.5, pointerEvents: "none" })
          .set(preloaderRef.current, { display: "none" });
      }

      // ---- Hero intro ----
      if (!reduce) {
        const heroSplit = new SplitType(".hero-copy .names", { types: "chars" });
        gsap.from(heroSplit.chars, {
          yPercent: 110, opacity: 0, duration: 1.2, ease: "power4.out", stagger: 0.04, delay: 2.6,
        });
        gsap.from(".hero-copy .eyebrow, .hero-copy .amp, .hero-copy .meta, .hero-copy .cta", {
          y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 3.1,
        });
        // Palace fades + scales in
        gsap.from(".hero-palace", { scale: 1.05, opacity: 0, duration: 2.8, ease: "power2.out", delay: 0.2 });
        gsap.from(".hero-moon", { scale: 0.6, opacity: 0, duration: 2.4, ease: "power2.out", delay: 0.8 });
        gsap.from(".hero-fog", { opacity: 0, duration: 2.0, ease: "power2.out", delay: 1.0 });
        gsap.from(".hero-dust", { opacity: 0, duration: 3.0, ease: "power2.out", delay: 1.5 });
        gsap.from(".hero-ray", { opacity: 0, duration: 2.5, ease: "power2.out", delay: 1.2 });
      }

      // ---- Hero parallax on scroll ----
      gsap.to(".hero-moon", {
        yPercent: 40, xPercent: -10,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-stars", {
        yPercent: 20,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-palace", {
        yPercent: -8, scale: 1.06,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-fog", {
        yPercent: -6,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-copy", {
        yPercent: -25, opacity: 0,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // ---- Mouse parallax ----
      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".hero-moon", { x: nx * 12, y: ny * 8, duration: 1.4, ease: "power2.out" });
        gsap.to(".hero-dust", { x: nx * 18, y: ny * 10, duration: 1.8, ease: "power2.out" });
        gsap.to(".hero-stars", { x: nx * 10, y: ny * 6, duration: 1.6, ease: "power2.out" });
        gsap.to(".hero-fog", { x: nx * 6, y: ny * 3, duration: 2.0, ease: "power2.out" });
        gsap.to(".hero-palace", { x: nx * -8, duration: 1.4, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove);

      // ---- Generic reveal ----
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".reveal-fast").forEach((el) => {
        gsap.to(el, {
          opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // ---- Split heading reveals ----
      document.querySelectorAll<HTMLElement>(".split-lines").forEach((el) => {
        const s = new SplitType(el, { types: "lines,words" });
        gsap.from(s.words, {
          yPercent: 110, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ---- Invitation card ----
      gsap.from(".invite-card > *", {
        y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".invite-card", start: "top 75%" },
      });

      // ---- Timeline SVG path draw ----
      const path = document.querySelector<SVGPathElement>("#timeline-path");
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 80%", end: "bottom 60%", scrub: true },
        });
      }

      // ---- Event cards ----
      gsap.utils.toArray<HTMLElement>(".event-card").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // ---- Curtains ----
      gsap.to(".curtain.left", {
        xPercent: -105,
        scrollTrigger: { trigger: ".stage", start: "top 70%", end: "bottom 40%", scrub: 1 },
      });
      gsap.to(".curtain.right", {
        xPercent: 105,
        scrollTrigger: { trigger: ".stage", start: "top 70%", end: "bottom 40%", scrub: 1 },
      });

      // ---- Gallery photo wall reveal ----
      gsap.utils.toArray<HTMLElement>(".pw-rope-row").forEach((el, i) => {
        gsap.from(el, {
          y: -20, opacity: 0, duration: 1.0, ease: "power3.out", delay: i * 0.22,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      cleanup?.();
    };
  }, [config]); // Re-trigger animations beautifully if the config changes

  // ---- Lock / unlock scroll based on gate state ----
  useEffect(() => {
    const locked = gatePhase !== "done";
    if (locked) {
      // Lock native scroll
      document.body.style.overflow = "hidden";
      // Lock Lenis smooth scroll if already initialised
      lenisRef.current?.stop();
    } else {
      // Unlock native scroll
      document.body.style.overflow = "";
      // Unlock Lenis
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [gatePhase]);

  // Customizer functions
  const handleSaveConfig = () => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(draftConfig));
    setConfig(draftConfig);
    setIsEditorOpen(false);
    // Reload dynamically to re-trigger Lenis/GSAP perfectly with new content
    window.location.reload();
  };

  const handleResetConfig = () => {
    if (window.confirm("Are you sure you want to reset all configurations to their original defaults? This will erase all customizations.")) {
      localStorage.removeItem(CONFIG_KEY);
      setConfig(weddingConfig);
      setDraftConfig(weddingConfig);
      setIsEditorOpen(false);
      window.location.reload();
    }
  };

  // RSVP Form submission handler
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpInput.name.trim() || !rsvpInput.attending) return;

    const rsvpSubmission = {
      ...rsvpInput,
      id: savedRsvp?.id || Date.now().toString(),
      submittedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Save personal RSVP response
    localStorage.setItem(RSVP_KEY, JSON.stringify(rsvpSubmission));
    setSavedRsvp(rsvpSubmission);

    // Save to submissions database in localstorage
    let currentSubmissions: RsvpSubmission[] = [];
    const savedSubmissions = localStorage.getItem(SUBMISSIONS_KEY);
    if (savedSubmissions) {
      try {
        currentSubmissions = JSON.parse(savedSubmissions) as RsvpSubmission[];
      } catch (e) {
        console.error(e);
      }
    }

    const existingIndex = currentSubmissions.findIndex((s) => s.id === rsvpSubmission.id);
    if (existingIndex > -1) {
      currentSubmissions[existingIndex] = rsvpSubmission;
    } else {
      currentSubmissions.push(rsvpSubmission);
    }

    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(currentSubmissions));
    setAllSubmissions(currentSubmissions);
  };

  const handleClearPersonalRsvp = () => {
    if (window.confirm("Do you want to clear your current RSVP selection?")) {
      localStorage.removeItem(RSVP_KEY);
      setSavedRsvp(null);
      setRsvpInput({
        name: "",
        attending: "",
        guestsCount: 1,
        events: [],
        notes: "",
      });
    }
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm("Are you sure you want to delete this RSVP response?")) {
      const updated = allSubmissions.filter((sub) => sub.id !== id);
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
      setAllSubmissions(updated);
    }
  };

  const handleClearAllSubmissions = () => {
    if (window.confirm("Are you sure you want to delete ALL guest RSVP submissions? This action cannot be undone.")) {
      localStorage.removeItem(SUBMISSIONS_KEY);
      setAllSubmissions([]);
    }
  };

  // Generate WhatsApp prefilled RSVP link
  const getWhatsAppLink = () => {
    if (!savedRsvp) return "#";
    const isAttending = savedRsvp.attending === "yes";
    const text = isAttending
      ? `Hi ${config.bride} & ${config.groom},\n\nI have RSVP'd to your wedding!\n\n*Name:* ${savedRsvp.name}\n*Attending:* Yes\n*Number of Guests:* ${savedRsvp.guestsCount}\n*Events:* ${savedRsvp.events.join(", ") || "None"}${savedRsvp.notes ? `\n*Note:* ${savedRsvp.notes}` : ""}\n\nCan't wait to celebrate with you!`
      : `Hi ${config.bride} & ${config.groom},\n\nI have RSVP'd to your wedding.\n\n*Name:* ${savedRsvp.name}\n*Attending:* Unfortunately, I cannot make it. Wishing you both a beautiful celebration!`;

    const base = config.rsvp.whatsapp.startsWith("http") ? config.rsvp.whatsapp : `https://wa.me/${config.rsvp.whatsapp}`;
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}text=${encodeURIComponent(text)}`;
  };

  // Export submissions to CSV file
  const exportToCSV = () => {
    if (allSubmissions.length === 0) return;
    const headers = ["Guest Name", "Attending", "Number of Guests", "Selected Events", "Dietary/Notes", "Submitted At"];
    const rows = allSubmissions.map((s) => [
      s.name,
      s.attending === "yes" ? "Yes" : "No",
      s.attending === "yes" ? s.guestsCount : 0,
      s.events.join("; "),
      s.notes,
      s.submittedAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_rsvps_${config.bride}_${config.groom}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGateOpen = () => {
    if (gatePhase !== "closed") return;

    setGatePhase("opening");

    window.setTimeout(() => {
      setGatePhase("done");
    }, 1600);
  };

  return (
    <div ref={rootRef} className="relative">
      {/* ============= Gate Intro ============= */}
      {gatePhase !== "done" && (
        <section className={`gate-intro ${gatePhase === "opening" ? "is-opening" : ""}`} aria-label="Gate intro">
          <button
            type="button"
            className="gate-enter"
            onClick={handleGateOpen}
            aria-label="Open gate and continue"
          >
            <div className="gate-canvas" aria-hidden="true">
              <div className="gate-scene" />
              <div className="gate-door gate-door-left" />
              <div className="gate-door gate-door-right" />
              <div className="gate-seam" />
            </div>
            <div className="gate-hint">Click The Gate To Enter</div>
          </button>
        </section>
      )}

      {/* ============= Hero ============= */}
      <section ref={heroRef} className="hero">

        {/* ── Layer 0 · Deep midnight sky base ── */}
        <div className="layer hero-sky" />

        {/* ── Layer 1 · Palace image (cinematic treatment) ── */}
        <div
          className="layer hero-palace"
          style={{ backgroundImage: `url(${palaceHero.url})` }}
        />

        {/* ── Layer 2 · Side & bottom fade — palace edges bleed to black ── */}
        <div className="layer hero-fade-sides" />

        {/* ── Layer 3 · Top-down gradient — deep navy above palace ── */}
        <div className="layer hero-fade-top" />

        {/* ── Layer 4 · Radial vignette ── */}
        <div className="layer hero-vignette" />

        {/* ── Layer 5 · Stars ── */}
        <div className="layer hero-stars" />

        {/* ── Layer 6 · Fog at palace base ── */}
        <div className="layer hero-fog" />

        {/* ── Layer 7 · Gold haze behind text ── */}
        <div className="layer hero-text-glow" />

        {/* ── Layer 8 · Volumetric light ray from palace entrance ── */}
        <div className="layer hero-ray" />

        {/* ── Layer 9 · Floating golden dust particles (CSS) ── */}
        <HeroDust />

        {/* Moon — large, top right */}
        <div className="hero-moon" aria-hidden="true" />

        {/* Main copy */}
        <div className="hero-copy">
          <div className="eyebrow mb-5" style={{ letterSpacing: "0.5em", fontSize: "0.65rem" }}>The Wedding Of</div>
          <h1 className="names">{config.bride}</h1>
          <div className="amp">
            <span className="amp-line" />
            <span className="amp-text">weds</span>
            <span className="amp-line" />
          </div>
          <h1 className="names">{config.groom}</h1>
          <div className="meta font-sans mt-7" style={{ letterSpacing: "0.32em", fontSize: "0.78rem", textTransform: "uppercase" }}>
            {config.weddingDateLabel}
          </div>
          <div className="meta font-serif italic mt-2" style={{ fontSize: "1.1rem" }}>{config.venue}</div>
          <div className="cta mt-8">
            <Countdown v={countdown} />
          </div>
        </div>

        {/* Music button — bottom right */}
        <button className="hero-music-btn" aria-label="Toggle music">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-ornament">✦</div>
          <div className="track" />
        </div>
      </section>

      {/* ============= Elephant Transition Bridge ============= */}
      <div className="eleph-bridge" aria-hidden="true">
        <div className="eleph eleph-l">
          <img
            src="/left-elephant.png?w=400&auto=format&fit=crop&q=80"
            alt="Royal Elephant Left"
            style={{ width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply", filter: "sepia(100%) hue-rotate(5deg) saturate(150%) brightness(90%) contrast(110%)" }}
          />
        </div>
        <div className="eleph eleph-r">
          <img
            src="/right-elephant.png?w=400&auto=format&fit=crop&q=80"
            alt="Royal Elephant Right"
            style={{ width: "100%", height: "auto", objectFit: "contain", transform: "scaleX(1)", mixBlendMode: "multiply", filter: "sepia(100%) hue-rotate(5deg) saturate(150%) brightness(90%) contrast(110%)" }}
          />
        </div>
      </div>

      {/* ============= Invitation ============= */}
      <section id="invite" className="s-invite">
        <img className="bg-fill" src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80" alt="" />
        <div className="toran">
          <img
            src={`${REFI}/backgrounds/Background%204.png`}
            alt=""
            className="toran-img"
          />
        </div>
        <img className="fl-moon" src={`${REFI}/elements/Element%203.png`} alt="" aria-hidden="true" />
        <img className="fl-leaf-l" src={`${REFI}/elements/Element%204.png`} alt="" aria-hidden="true" />
        <img className="fl-leaf-r" src={`${REFI}/elements/Element%205.png`} alt="" aria-hidden="true" />

        <div className="container">
          <div className="invite-card vis">
            <div className="card-tl">
              <svg viewBox="0 0 50 50" width="50">
                <path d="M8,42 Q25,-5 45,12 Q58,28 32,40Z" fill="none" stroke="#C4985A" strokeWidth="0.8" opacity="0.35" />
              </svg>
            </div>
            <div className="card-tr">
              <svg viewBox="0 0 50 50" width="50">
                <path d="M42,42 Q25,-5 5,12 Q-8,28 18,40Z" fill="none" stroke="#C4985A" strokeWidth="0.8" opacity="0.35" />
              </svg>
            </div>

            <div className="i-ganesha flex justify-center items-center py-2 text-gold">
              <img
                src="/Lord-ganesh.png"
                alt="Lord Ganesh"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="i-rule">
              <svg viewBox="0 0 300 8" width="100%" style={{ maxWidth: 300 }}>
                <line x1="0" y1="4" x2="128" y2="4" stroke="#C4985A" strokeWidth="0.6" opacity="0.45" />
                <polygon points="150,1 160,4 150,7 140,4" fill="#C4985A" opacity="0.75" />
                <line x1="172" y1="4" x2="300" y2="4" stroke="#C4985A" strokeWidth="0.6" opacity="0.45" />
              </svg>
            </div>

            <p className="i-bless">
              With the blessings of the divine
              <br />
              and the love of our families
            </p>
            <p className="i-label">Together we invite you to celebrate</p>

            <div className="i-names">
              <span className="i-bride">{config.bride}</span>
              <span className="i-amp">&amp;</span>
              <span className="i-groom">{config.groom}</span>
            </div>

            <div className="i-rule">
              <svg viewBox="0 0 300 8" width="100%" style={{ maxWidth: 300 }}>
                <line x1="0" y1="4" x2="128" y2="4" stroke="#C4985A" strokeWidth="0.6" opacity="0.45" />
                <polygon points="150,1 160,4 150,7 140,4" fill="#C4985A" opacity="0.75" />
                <line x1="172" y1="4" x2="300" y2="4" stroke="#C4985A" strokeWidth="0.6" opacity="0.45" />
              </svg>
            </div>

            <div className="i-fam">
              <div className="fam-side">
                <div className="fam-parents">
                  <em>Daughter of</em>
                  <span>{config.parents.bride.replace(/^Daughter of\s*/i, "")}</span>
                </div>
              </div>
              <div className="fam-dot">✦</div>
              <div className="fam-side">
                <div className="fam-parents">
                  <em>Son of</em>
                  <span>{config.parents.groom.replace(/^Son of\s*/i, "")}</span>
                </div>
              </div>
            </div>
            <p className="i-close">On the following auspicious occasions</p>
          </div>
        </div>
      </section>

      {/* ============= Events Timeline ============= */}
      <section className="section festival-section relative overflow-hidden" id="events">
        {/* Full-cover fireworks background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/festival-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />
        {/* Dark overlay so text stays legible */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(to bottom, rgba(8,6,20,0.62) 0%, rgba(12,6,30,0.55) 50%, rgba(8,6,20,0.72) 100%)" }}
          aria-hidden
        />

        <div className="container-wide text-center relative z-10">
          <div className="eyebrow reveal-fast" style={{ color: "color-mix(in oklab, var(--gold) 80%, var(--champagne))" }}>The Celebrations</div>
          <h2 className="split-lines font-display text-5xl md:text-7xl italic mt-4" style={{ color: "var(--champagne)" }}>A festival of days</h2>
          <div className="divider-orn mt-6"><span className="line" /><Ornament /><span className="line" /></div>
        </div>

        <div className="timeline container-narrow mt-16 relative z-10">
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block" width="4" height="100%" preserveAspectRatio="none" viewBox="0 0 4 1000">
            <path id="timeline-path" d="M2 0 C 2 250, 2 500, 2 750 S 2 1000, 2 1000" stroke="url(#tg)" strokeWidth="2" fill="none" />
            <defs>
              <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="color-mix(in oklab, var(--gold) 80%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-16 md:space-y-24">
            {config.events.map((ev, i) => (
              <div key={ev.title} className="md:grid md:grid-cols-2 md:gap-16 relative">
                <div className={i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}>
                  <div className="event-card festival-event-card">
                    <div className="text-4xl mb-3">{ev.motif}</div>
                    <div className="eyebrow" style={{ color: "color-mix(in oklab, var(--gold) 85%, var(--champagne))" }}>{ev.date} · {ev.time}</div>
                    <h3 className="font-display text-3xl md:text-4xl mt-2" style={{ color: "var(--champagne)" }}>{ev.title}</h3>
                    <div className="font-serif italic mt-1" style={{ color: "color-mix(in oklab, var(--gold) 70%, var(--champagne))" }}>
                      {ev.venue}
                    </div>
                    <p className="mt-4 leading-relaxed" style={{ color: "rgba(240,228,210,0.88)" }}>{ev.description}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.venue)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-ghost mt-6"
                    >
                      View on map →
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <span
                    className="event-dot"
                    style={{ left: "50%", transform: "translateX(-50%)", top: "2.5rem", position: "absolute" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= Meet the Couple (curtain) ============= */}
      <section className="section section-dark relative overflow-hidden" id="couple">
        <Petals count={12} tone="gold" />
        <div className="container-wide text-center relative z-10">
          <div className="eyebrow reveal-fast" style={{ color: "color-mix(in oklab, var(--gold) 75%, var(--champagne))" }}>Meet the couple</div>
          <h2 className="split-lines font-display italic text-5xl md:text-7xl mt-4">Two hearts, one story</h2>

          <div className="stage mt-14 mx-auto max-w-4xl aspect-[16/10] relative">
            <div className="curtain left" />
            <div className="curtain right" />
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
              <div className="glass rounded-[var(--radius-xl)] p-10 md:p-14 text-center max-w-2xl reveal" style={{ color: "var(--ink)" }}>
                <div className="text-3xl gold-text">✦</div>
                <p className="font-serif italic text-2xl md:text-3xl leading-relaxed mt-4">
                  "In a room full of art, I'd still stare at you."
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {["Delhi ↔ Bombay", "Coffee & long walks", "College sweethearts", "Hopeless romantics"].map((t) => (
                    <span key={t} className="text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_45%,transparent)] text-[color-mix(in_oklab,var(--bronze)_85%,var(--ink))]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-display text-3xl">{config.bride}</div>
                    <div className="eyebrow mt-2">The Bride</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl">{config.groom}</div>
                    <div className="eyebrow mt-2">The Groom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= Gallery ============= */}
      <section className="section photo-wall-section" id="gallery">
        {/* Background texture & glow */}
        <div className="pw-bg-texture" aria-hidden />
        <div className="pw-bg-glow" aria-hidden />
        <div className="pw-vignette" aria-hidden />

        {/* Heading */}
        <div className="container-wide text-center mb-16 relative z-10">
          <div className="eyebrow reveal-fast" style={{ color: "color-mix(in oklab, var(--bronze) 85%, var(--ink))" }}>Moments</div>
          <h2 className="split-lines font-display italic text-5xl md:text-7xl mt-4">Frames of us</h2>
          <div className="divider-orn mt-6"><span className="line" /><Ornament /><span className="line" /></div>
        </div>

        {/* ── Photo Wall ── */}
        <PhotoWall photos={config.gallery} onOpen={setLightbox} />
      </section>

      {/* ============= Things to Know ============= */}
      <section className="section" id="info">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="eyebrow reveal-fast">Things to know</div>
            <h2 className="split-lines font-display italic text-5xl md:text-7xl mt-4">Before you arrive</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.thingsToKnow.map((item) => (
              <div key={item.title} className="info-card reveal">
                <div className="info-icon text-xl">{item.icon}</div>
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-[color-mix(in_oklab,var(--ink)_90%,transparent)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= RSVP (Interactive Form) ============= */}
      <section className="section section-dark relative overflow-hidden" id="rsvp">
        <Petals count={18} tone="gold" />
        <div className="container-narrow text-center relative z-10">
          <div className="eyebrow reveal-fast" style={{ color: "color-mix(in oklab, var(--gold) 80%, var(--champagne))" }}>RSVP</div>
          <h2 className="split-lines font-display italic text-5xl md:text-7xl mt-4">{config.rsvp.heading}</h2>
          <div className="divider-orn mt-6"><span className="line" /><Ornament /><span className="line" /></div>

          <p className="reveal font-serif text-lg md:text-xl leading-relaxed mt-6 max-w-2xl mx-auto text-[color-mix(in_oklab,var(--champagne)_90%,var(--ivory))]">
            {config.rsvp.subtext}
          </p>

          <div className="mt-12 max-w-lg mx-auto text-left">
            {!savedRsvp ? (
              <form onSubmit={handleRsvpSubmit} className="glass p-6 md:p-8 rounded-[var(--radius-lg)] space-y-6 border border-gold/30">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--gold)_85%,var(--ivory))] mb-2 font-sans">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpInput.name}
                    onChange={(e) => setRsvpInput({ ...rsvpInput, name: e.target.value })}
                    className="w-full bg-[color-mix(in_oklab,var(--ink)_90%,transparent)] border border-gold/30 rounded-md px-4 py-2.5 text-ivory placeholder-[color-mix(in_oklab,var(--ivory)_40%,transparent)] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-sans"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Attendance Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--gold)_85%,var(--ivory))] mb-3 font-sans">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpInput({ ...rsvpInput, attending: "yes" })}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border font-sans text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${rsvpInput.attending === "yes"
                        ? "bg-gold text-ink border-gold font-medium"
                        : "bg-transparent text-ivory border-gold/30 hover:border-gold/60"
                        }`}
                    >
                      <Smile className="w-4 h-4" /> Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpInput({ ...rsvpInput, attending: "no", guestsCount: 0 })}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border font-sans text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${rsvpInput.attending === "no"
                        ? "bg-rose-800 text-ivory border-rose-800 font-medium"
                        : "bg-transparent text-ivory border-gold/30 hover:border-gold/60"
                        }`}
                    >
                      <Frown className="w-4 h-4" /> Regretfully Decline
                    </button>
                  </div>
                </div>

                {rsvpInput.attending === "yes" && (
                  <>
                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--gold)_85%,var(--ivory))] mb-2 font-sans">
                        Number of Guests (including yourself)
                      </label>
                      <select
                        value={rsvpInput.guestsCount}
                        onChange={(e) => setRsvpInput({ ...rsvpInput, guestsCount: Number(e.target.value) })}
                        className="w-full bg-[color-mix(in_oklab,var(--ink)_90%,transparent)] border border-gold/30 rounded-md px-4 py-2.5 text-ivory focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-sans"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-[var(--ink)] text-ivory">
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Events Attend Selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--gold)_85%,var(--ivory))] mb-2 font-sans">
                        Which events will you attend?
                      </label>
                      <div className="space-y-2 mt-2">
                        {config.events.map((ev) => {
                          const isChecked = rsvpInput.events.includes(ev.title);
                          return (
                            <button
                              type="button"
                              key={ev.title}
                              onClick={() => {
                                const nextEvents = isChecked
                                  ? rsvpInput.events.filter((t) => t !== ev.title)
                                  : [...rsvpInput.events, ev.title];
                                setRsvpInput({ ...rsvpInput, events: nextEvents });
                              }}
                              className={`flex items-center justify-between w-full p-3 rounded-md border text-left font-sans transition-all cursor-pointer ${isChecked
                                ? "bg-gold/10 border-gold text-ivory"
                                : "bg-transparent border-gold/25 text-[color-mix(in_oklab,var(--ivory)_80%,transparent)] hover:border-gold/50"
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{ev.motif}</span>
                                <div>
                                  <div className="text-sm font-medium">{ev.title}</div>
                                  <div className="text-xs opacity-60">{ev.date}</div>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${isChecked ? "border-gold bg-gold text-ink" : "border-gold/40"
                                }`}>
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* Notes / Song request */}
                {rsvpInput.attending !== "" && (
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--gold)_85%,var(--ivory))] mb-2 font-sans">
                      {rsvpInput.attending === "yes" ? "Dietary preferences or warm notes" : "Message for the couple"}
                    </label>
                    <textarea
                      value={rsvpInput.notes}
                      onChange={(e) => setRsvpInput({ ...rsvpInput, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-[color-mix(in_oklab,var(--ink)_90%,transparent)] border border-gold/30 rounded-md px-4 py-2.5 text-ivory placeholder-[color-mix(in_oklab,var(--ivory)_40%,transparent)] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-sans text-sm resize-none"
                      placeholder="Add a special message or note..."
                    />
                  </div>
                )}

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={rsvpInput.attending === ""}
                  className={`w-full text-center py-3.5 rounded-md font-sans text-xs uppercase tracking-[0.3em] font-semibold transition-all duration-300 ${rsvpInput.attending === ""
                    ? "bg-gold/20 text-gold/40 border border-gold/10 cursor-not-allowed"
                    : "bg-gold hover:bg-gold-soft text-ink cursor-pointer hover:shadow-lg"
                    }`}
                >
                  Confirm RSVP
                </button>
              </form>
            ) : (
              /* Success screen after submitting */
              <div className="glass p-8 rounded-[var(--radius-lg)] border border-gold/30 text-center space-y-6">
                <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold">
                  <Heart className="w-7 h-7 fill-current stroke-[1.5px]" />
                </div>

                <div>
                  <h3 className="font-display text-3xl text-ivory font-medium">
                    {savedRsvp.attending === "yes" ? "Thank you, Beautiful!" : "Warmly Received"}
                  </h3>
                  <p className="font-serif italic text-[color-mix(in_oklab,var(--champagne)_80%,var(--ivory))] mt-2 text-lg">
                    {savedRsvp.attending === "yes"
                      ? `We have saved a place for you (${savedRsvp.guestsCount} ${savedRsvp.guestsCount === 1 ? 'person' : 'people'}) under the stars.`
                      : "We are sad you cannot join us, but we carry your blessings in our hearts."}
                  </p>
                </div>

                {savedRsvp.attending === "yes" && (
                  <div className="bg-[color-mix(in_oklab,var(--ink)_80%,transparent)] border border-gold/15 rounded-md p-4 text-left font-sans text-sm space-y-2">
                    <div className="flex justify-between border-b border-gold/10 pb-1">
                      <span className="opacity-60">Guest Name:</span>
                      <span className="font-medium text-gold">{savedRsvp.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold/10 pb-1">
                      <span className="opacity-60">Attending:</span>
                      <span className="font-medium text-emerald-400">Yes</span>
                    </div>
                    <div className="flex justify-between border-b border-gold/10 pb-1">
                      <span className="opacity-60">Guests count:</span>
                      <span className="font-medium">{savedRsvp.guestsCount}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block mb-1">Attending Events:</span>
                      <div className="flex flex-wrap gap-1">
                        {savedRsvp.events.map((e: string) => (
                          <span key={e} className="bg-gold/10 border border-gold/30 text-gold text-xs px-2 py-0.5 rounded-full">
                            {e}
                          </span>
                        ))}
                        {savedRsvp.events.length === 0 && <span className="text-xs opacity-40">None selected</span>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal sm:flex-1 py-3 text-xs tracking-wider"
                  >
                    Share via WhatsApp →
                  </a>
                  <button
                    onClick={handleClearPersonalRsvp}
                    className="btn-ghost sm:flex-1 py-3 text-xs tracking-wider border border-gold/20"
                  >
                    Edit your response
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="reveal eyebrow mt-12" style={{ color: "color-mix(in oklab, var(--gold) 70%, var(--champagne))" }}>
            {config.hashtag}
          </div>
        </div>
      </section>

      {/* ============= Footer ============= */}
      <footer className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container-narrow text-center">
          <div className="divider-orn"><span className="line" /><Ornament /><span className="line" /></div>
          <div className="mt-6 font-display text-3xl md:text-4xl italic flex items-center justify-center gap-4">
            <span>{config.bride}</span>
            <span className="gold-text text-2xl">♥</span>
            <span>{config.groom}</span>
          </div>
          <div className="eyebrow mt-4">{config.weddingDateLabel} · {config.venue}</div>
          <div className="mt-8 text-xs font-sans tracking-[0.3em] uppercase text-[color-mix(in_oklab,var(--bronze)_70%,var(--ink))]">
            Made with love · {config.hashtag}
          </div>
        </div>
      </footer>

      {/* ============= Lightbox ============= */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <img src={lightbox} alt="Gallery view" />
        </div>
      )}

      {/* ============= Floating Customizer Toggle ============= */}
      <button
        onClick={() => {
          setDraftConfig(JSON.parse(JSON.stringify(config))); // Deep copy
          setIsEditorOpen(true);
        }}
        className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full glass border border-gold shadow-[0_10px_30px_-5px_rgba(196,152,90,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer text-gold hover:text-gold-soft"
        title="Customize Invitation"
      >
        <Settings className="w-6 h-6 rotate-hover" />
      </button>

      {/* ============= Customizer Sheet Drawer ============= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsEditorOpen(false)}
          />
          {/* Slide-over panel */}
          <div className="relative w-full max-w-lg md:max-w-xl h-full bg-[#181119] border-l border-gold/25 shadow-2xl flex flex-col z-10 text-[var(--ivory)] overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gold/15 flex items-center justify-between bg-[#221623]">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gold" />
                <h3 className="font-display font-medium text-lg text-gold-soft uppercase tracking-wider">Invitation Customizer</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetConfig}
                  className="p-2 rounded-md hover:bg-gold/10 text-gold/60 hover:text-gold transition-colors cursor-pointer"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-md hover:bg-gold/10 text-gold/60 hover:text-gold transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab selection */}
            <div className="grid grid-cols-4 border-b border-gold/10 bg-[#1d121e] text-xs font-semibold uppercase tracking-wider text-center">
              {[
                { id: "general", label: "Details" },
                { id: "events", label: "Events" },
                { id: "gallery", label: "Gallery" },
                { id: "rsvps", label: "RSVPs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setEditorTab(tab.id as any)}
                  className={`py-3.5 border-b-2 transition-all cursor-pointer ${editorTab === tab.id
                    ? "border-gold text-gold bg-gold/5"
                    : "border-transparent text-gold/45 hover:text-gold/80 hover:bg-gold/2"
                    }`}
                >
                  {tab.label}
                  {tab.id === "rsvps" && allSubmissions.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[0.6rem] bg-gold text-ink rounded-full">
                      {allSubmissions.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#160f17]">
              {/* Tab 1: General Details */}
              {editorTab === "general" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Bride's First Name</label>
                      <input
                        type="text"
                        value={draftConfig.bride}
                        onChange={(e) => setDraftConfig({ ...draftConfig, bride: e.target.value })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Groom's First Name</label>
                      <input
                        type="text"
                        value={draftConfig.groom}
                        onChange={(e) => setDraftConfig({ ...draftConfig, groom: e.target.value })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Wedding Date</label>
                      <input
                        type="date"
                        value={draftConfig.weddingDate}
                        onChange={(e) => setDraftConfig({ ...draftConfig, weddingDate: e.target.value })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm text-ivory"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Date Label Format</label>
                      <input
                        type="text"
                        value={draftConfig.weddingDateLabel}
                        onChange={(e) => setDraftConfig({ ...draftConfig, weddingDateLabel: e.target.value })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                        placeholder="20 · November · 2026"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Hashtag</label>
                    <input
                      type="text"
                      value={draftConfig.hashtag}
                      onChange={(e) => setDraftConfig({ ...draftConfig, hashtag: e.target.value })}
                      className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Wedding Venue</label>
                    <input
                      type="text"
                      value={draftConfig.venue}
                      onChange={(e) => setDraftConfig({ ...draftConfig, venue: e.target.value })}
                      className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                    />
                  </div>

                  <div className="border-t border-gold/10 pt-4 mt-4 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-soft">Parents Details</h4>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Bride's Parents</label>
                      <input
                        type="text"
                        value={draftConfig.parents.bride}
                        onChange={(e) => setDraftConfig({
                          ...draftConfig,
                          parents: { ...draftConfig.parents, bride: e.target.value }
                        })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                        placeholder="Mr. & Mrs. Rajesh Malhotra"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">Groom's Parents</label>
                      <input
                        type="text"
                        value={draftConfig.parents.groom}
                        onChange={(e) => setDraftConfig({
                          ...draftConfig,
                          parents: { ...draftConfig.parents, groom: e.target.value }
                        })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                        placeholder="Mr. & Mrs. Ashok Khanna"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gold/10 pt-4 mt-4 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-soft">RSVP Settings</h4>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gold/70 mb-1">WhatsApp Number or Base URL</label>
                      <input
                        type="text"
                        value={draftConfig.rsvp.whatsapp}
                        onChange={(e) => setDraftConfig({
                          ...draftConfig,
                          rsvp: { ...draftConfig.rsvp, whatsapp: e.target.value }
                        })}
                        className="w-full bg-[#231724] border border-gold/20 rounded px-3 py-2 focus:outline-none focus:border-gold text-sm"
                        placeholder="e.g. +919999999999 or wa.me/ link"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Events Customization */}
              {editorTab === "events" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-soft">Manage Wedding Events</h4>
                    <button
                      onClick={() => {
                        const newEvents = [
                          ...draftConfig.events,
                          {
                            title: "New Celebration",
                            date: "Date here",
                            time: "Time here",
                            venue: "Venue details here",
                            description: "Event explanation here...",
                            motif: "✨"
                          }
                        ];
                        setDraftConfig({ ...draftConfig, events: newEvents });
                      }}
                      className="flex items-center gap-1 bg-gold text-ink text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded hover:bg-gold-soft cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Event
                    </button>
                  </div>

                  <div className="space-y-4">
                    {draftConfig.events.map((ev, i) => (
                      <div key={i} className="bg-[#211622] border border-gold/15 p-4 rounded-md relative space-y-3">
                        <button
                          onClick={() => {
                            const filtered = draftConfig.events.filter((_, idx) => idx !== i);
                            setDraftConfig({ ...draftConfig, events: filtered });
                          }}
                          className="absolute top-4 right-4 text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-5 gap-3 pt-4 sm:pt-0">
                          <div className="col-span-1">
                            <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Icon</label>
                            <input
                              type="text"
                              value={ev.motif}
                              onChange={(e) => {
                                const updated = [...draftConfig.events];
                                updated[i].motif = e.target.value;
                                setDraftConfig({ ...draftConfig, events: updated });
                              }}
                              className="w-full bg-[#2a1d2b] border border-gold/15 rounded text-center px-1 py-1 focus:outline-none text-sm"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Event Title</label>
                            <input
                              type="text"
                              value={ev.title}
                              onChange={(e) => {
                                const updated = [...draftConfig.events];
                                updated[i].title = e.target.value;
                                setDraftConfig({ ...draftConfig, events: updated });
                              }}
                              className="w-full bg-[#2a1d2b] border border-gold/15 rounded px-2.5 py-1 focus:outline-none focus:border-gold text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Date</label>
                            <input
                              type="text"
                              value={ev.date}
                              onChange={(e) => {
                                const updated = [...draftConfig.events];
                                updated[i].date = e.target.value;
                                setDraftConfig({ ...draftConfig, events: updated });
                              }}
                              className="w-full bg-[#2a1d2b] border border-gold/15 rounded px-2 py-1 focus:outline-none text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Time</label>
                            <input
                              type="text"
                              value={ev.time}
                              onChange={(e) => {
                                const updated = [...draftConfig.events];
                                updated[i].time = e.target.value;
                                setDraftConfig({ ...draftConfig, events: updated });
                              }}
                              className="w-full bg-[#2a1d2b] border border-gold/15 rounded px-2 py-1 focus:outline-none text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Venue</label>
                          <input
                            type="text"
                            value={ev.venue}
                            onChange={(e) => {
                              const updated = [...draftConfig.events];
                              updated[i].venue = e.target.value;
                              setDraftConfig({ ...draftConfig, events: updated });
                            }}
                            className="w-full bg-[#2a1d2b] border border-gold/15 rounded px-2 py-1 focus:outline-none focus:border-gold text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase text-gold/60 mb-0.5">Description</label>
                          <textarea
                            value={ev.description}
                            onChange={(e) => {
                              const updated = [...draftConfig.events];
                              updated[i].description = e.target.value;
                              setDraftConfig({ ...draftConfig, events: updated });
                            }}
                            rows={2}
                            className="w-full bg-[#2a1d2b] border border-gold/15 rounded px-2 py-1 focus:outline-none focus:border-gold text-xs resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Gallery Photos & Info items */}
              {editorTab === "gallery" && (
                <div className="space-y-6">
                  {/* Photo URLs list */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-soft mb-3">Gallery Image URLs</h4>
                    <div className="space-y-2.5">
                      {draftConfig.gallery.map((img, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => {
                              const updated = [...draftConfig.gallery];
                              updated[i] = e.target.value;
                              setDraftConfig({ ...draftConfig, gallery: updated });
                            }}
                            className="flex-1 bg-[#231724] border border-gold/15 rounded px-2.5 py-1.5 text-xs text-gold/80 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              const filtered = draftConfig.gallery.filter((_, idx) => idx !== i);
                              setDraftConfig({ ...draftConfig, gallery: filtered });
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const updated = [...draftConfig.gallery, ""];
                        setDraftConfig({ ...draftConfig, gallery: updated });
                      }}
                      className="mt-4 flex items-center justify-center gap-1.5 w-full border border-dashed border-gold/30 hover:border-gold/60 text-gold-soft hover:text-gold text-xs py-2 rounded transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Photo URL
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Submissions (RSVPs) */}
              {editorTab === "rsvps" && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-soft">RSVP Guest List</h4>
                      <p className="text-[10px] text-gold/50 mt-0.5">Saved in localStorage on this device</p>
                    </div>
                    {allSubmissions.length > 0 && (
                      <div className="flex gap-2">
                        <button
                          onClick={exportToCSV}
                          className="flex items-center gap-1 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 text-xs px-2.5 py-1.5 rounded transition-colors cursor-pointer font-sans"
                        >
                          <Download className="w-3.5 h-3.5" /> CSV
                        </button>
                        <button
                          onClick={handleClearAllSubmissions}
                          className="flex items-center gap-1 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 border border-rose-900/30 text-xs px-2.5 py-1.5 rounded transition-colors cursor-pointer font-sans"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Summary Banner */}
                  {allSubmissions.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 bg-[#241725] border border-gold/15 p-3 rounded text-center">
                      <div>
                        <div className="text-xs opacity-50 font-sans">Attending</div>
                        <div className="text-lg font-display text-emerald-400 font-bold mt-0.5">
                          {allSubmissions.filter((s) => s.attending === "yes").length}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 font-sans">Total Guests</div>
                        <div className="text-lg font-display text-gold font-bold mt-0.5">
                          {allSubmissions.filter((s) => s.attending === "yes").reduce((acc, c) => acc + (c.guestsCount || 1), 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 font-sans">Declining</div>
                        <div className="text-lg font-display text-rose-400 font-bold mt-0.5">
                          {allSubmissions.filter((s) => s.attending === "no").length}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submissions list */}
                  <div className="space-y-3">
                    {allSubmissions.map((sub, idx) => (
                      <div key={sub.id || idx} className="bg-[#201421] border border-gold/10 p-3.5 rounded-md relative flex flex-col gap-2">
                        <button
                          onClick={() => handleDeleteSubmission(sub.id)}
                          className="absolute top-3 right-3 text-gold/30 hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${sub.attending === "yes" ? "bg-emerald-400" : "bg-rose-500"}`} />
                          <span className="font-medium text-sm text-ivory tracking-wide">{sub.name}</span>
                          {sub.attending === "yes" && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-gold/10 border border-gold/30 text-gold rounded font-sans font-medium">
                              +{sub.guestsCount - 1} guests
                            </span>
                          )}
                        </div>

                        {sub.attending === "yes" && sub.events && sub.events.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {sub.events.map((e: string) => (
                              <span key={e} className="bg-[#2c1d2e] text-[9px] px-2 py-0.5 rounded text-gold/80 border border-gold/10">
                                {e}
                              </span>
                            ))}
                          </div>
                        )}

                        {sub.notes && (
                          <div className="flex items-start gap-1.5 bg-[#261927] p-2 rounded text-xs text-[color-mix(in_oklab,var(--ivory)_80%,transparent)] font-sans mt-0.5">
                            <MessageSquare className="w-3.5 h-3.5 text-gold/40 mt-0.5 flex-shrink-0" />
                            <span className="italic">"{sub.notes}"</span>
                          </div>
                        )}

                        <div className="text-[9px] text-gold/35 mt-1 border-t border-gold/5 pt-1 flex justify-between items-center font-sans">
                          <span>ID: {sub.id?.slice(-6) || "local"}</span>
                          <span>{sub.submittedAt}</span>
                        </div>
                      </div>
                    ))}

                    {allSubmissions.length === 0 && (
                      <div className="text-center py-12 bg-[#201421] border border-dashed border-gold/15 rounded-md">
                        <Users className="w-8 h-8 text-gold/20 mx-auto mb-2" />
                        <p className="text-xs text-gold/40 font-sans">No guest RSVPs submitted yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="p-5 border-t border-gold/15 bg-[#221623] grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-full text-center py-2.5 border border-gold/30 hover:border-gold/60 text-gold-soft hover:text-gold rounded font-sans text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveConfig}
                className="w-full text-center py-2.5 bg-gold hover:bg-gold-soft text-ink font-semibold rounded font-sans text-xs uppercase tracking-wider cursor-pointer hover:shadow-lg transition-all"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Sub components ---------------- */
function Countdown({ v }: { v: { days: number; hours: number; minutes: number; seconds: number } }) {
  const items = [
    { l: "Days", v: v.days },
    { l: "Hours", v: v.hours },
    { l: "Minutes", v: v.minutes },
    { l: "Seconds", v: v.seconds },
  ];
  return (
    <div className="hero-countdown">
      {items.map((item, idx) => (
        <React.Fragment key={item.l}>
          <div className="countdown-item">
            <div className="countdown-num">{String(item.v).padStart(2, "0")}</div>
            <div className="countdown-label">{item.l}</div>
          </div>
          {idx < items.length - 1 && <div className="countdown-sep" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Petals({ count = 12, tone = "warm" }: { count?: number; tone?: "warm" | "gold" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seededVal(i, 7) * 100,
        dur: 12 + seededVal(i, 8) * 14,
        delay: -(seededVal(i, 9) * 26),
        size: 8 + seededVal(i, 10) * 14,
      })),
    [count],
  );

  if (!mounted) return null;
  return (
    <div className="petals" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: tone === "gold" ? 0.55 : 0.5,
            filter: tone === "gold" ? "hue-rotate(-10deg) brightness(1.15)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* Golden floating dust particles for the hero */
function HeroDust() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        left: seededVal(i, 11) * 100,
        top: 20 + seededVal(i, 12) * 75,
        dur: 18 + seededVal(i, 13) * 22,
        delay: -(seededVal(i, 14) * 40),
        size: 1.5 + seededVal(i, 15) * 2.8,
        bokeh: seededVal(i, 16) > 0.72,
      })),
    [],
  );

  if (!mounted) return null;
  return (
    <div className="hero-dust" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className={p.bokeh ? "dust-bokeh" : "dust-mote"}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.bokeh ? p.size * 3.5 : p.size,
            height: p.bokeh ? p.size * 3.5 : p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHOTO WALL — Luxury hanging rope gallery
   ───────────────────────────────────────────── */

// Per-photo layout metadata
type PhotoMeta = {
  src: string;
  rot: number;       // rotation degrees
  clipLeft: number;  // clip horizontal offset % within photo
};

// Deterministic "random" from index — no hydration mismatch
function seededVal(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildMeta(photos: string[]): PhotoMeta[] {
  return photos.map((src, i) => ({
    src,
    rot: (seededVal(i, 1) * 8) - 4,  // -4 to +4 deg
    clipLeft: 20 + seededVal(i, 4) * 60,  // 20%–80%
  }));
}

// One wooden clothespin SVG
function Clip({ color = "#8B6340" }: { color?: string }) {
  return (
    <svg viewBox="0 0 18 32" width="18" height="32" className="pw-clip" aria-hidden>
      <rect x="5" y="0" width="8" height="18" rx="2" fill={color} />
      <rect x="6" y="18" width="3" height="10" rx="1.5" fill={color} />
      <rect x="9" y="18" width="3" height="10" rx="1.5" fill={color} />
      <rect x="5" y="15" width="8" height="2" fill="rgba(0,0,0,.15)" />
      <rect x="7.5" y="2" width="3" height="12" rx="1" fill="rgba(255,255,255,.12)" />
    </svg>
  );
}

// Botanical eucalyptus branch SVG (matches reference image)
function BotanicalBranch() {
  return (
    <svg viewBox="0 0 110 90" width="110" height="90" aria-hidden fill="none">
      {/* Main stems */}
      <path d="M 90,80 Q 55,55 18,35" stroke="#8aaf7a" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <path d="M 90,80 Q 60,65 30,60" stroke="#8aaf7a" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      {/* Eucalyptus leaves — round-ish */}
      {[
        { cx: 20, cy: 34, r: 9, rot: -30, c: "#8aaf7a" },
        { cx: 35, cy: 28, r: 10, rot: -15, c: "#7fa36e" },
        { cx: 48, cy: 35, r: 8, rot: 5, c: "#8aaf7a" },
        { cx: 60, cy: 42, r: 9, rot: 20, c: "#a3c490" },
        { cx: 70, cy: 52, r: 8, rot: 35, c: "#8aaf7a" },
        { cx: 30, cy: 56, r: 8, rot: -5, c: "#7fa36e" },
        { cx: 44, cy: 62, r: 7, rot: 10, c: "#a3c490" },
        { cx: 55, cy: 69, r: 7, rot: 25, c: "#8aaf7a" },
        { cx: 25, cy: 42, r: 7, rot: -20, c: "#a3c490" },
        { cx: 68, cy: 65, r: 6, rot: 40, c: "#7fa36e" },
      ].map((l, i) => (
        <ellipse
          key={i}
          cx={l.cx} cy={l.cy}
          rx={l.r * 0.62} ry={l.r}
          fill={l.c}
          fillOpacity="0.72"
          transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
        />
      ))}
      {/* Small flower buds */}
      {[
        { x: 18, y: 25 },
        { x: 46, y: 26 },
        { x: 68, y: 43 },
      ].map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="3.5" fill="#e8c8c0" fillOpacity="0.80" />
      ))}
    </svg>
  );
}

// Single photo polaroid
function PolaroidPhoto({
  meta, index, onOpen,
}: { meta: PhotoMeta; index: number; onOpen: (src: string) => void }) {
  return (
    <div
      className="pw-photo-wrap"
      style={{ "--rot": `${meta.rot}deg` } as React.CSSProperties}
    >
      {/* Clip pin */}
      <div className="pw-clip-wrap" aria-hidden><Clip /></div>

      {/* String from rope to clip */}
      <div className="pw-string" aria-hidden />

      {/* Polaroid card */}
      <button
        className="pw-photo"
        style={{ "--idx": index } as React.CSSProperties}
        onClick={() => onOpen(meta.src)}
        aria-label={`View photo ${index + 1}`}
      >
        <div className="pw-photo-inner">
          <img src={meta.src} alt={`Wedding moment ${index + 1}`} loading="lazy" />
        </div>
        {/* Bottom caption strip (Polaroid white space) */}
        <div className="pw-caption" />
      </button>
    </div>
  );
}

// One full rope row with botanical branches at ends
function RopeRow({
  photos, rowIndex, onOpen,
}: { photos: PhotoMeta[]; rowIndex: number; onOpen: (src: string) => void }) {
  return (
    <div className="pw-rope-row" style={{ "--row": rowIndex } as React.CSSProperties}>

      {/* Botanical branches at each end */}
      <div className="pw-botanical pw-botanical--left" aria-hidden>
        <BotanicalBranch />
      </div>
      <div className="pw-botanical pw-botanical--right" aria-hidden>
        <BotanicalBranch />
      </div>

      {/* SVG rope with deep natural catenary droop */}
      <svg className="pw-rope-svg" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={`rope-grad-${rowIndex}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6b4a25" stopOpacity="0" />
            <stop offset="4%" stopColor="#7a5530" stopOpacity="1" />
            <stop offset="96%" stopColor="#7a5530" stopOpacity="1" />
            <stop offset="100%" stopColor="#6b4a25" stopOpacity="0" />
          </linearGradient>
          <filter id={`rope-shadow-${rowIndex}`}>
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#4a2e10" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Main rope — deep catenary sag */}
        <path
          d="M 0,10 Q 50%,46 100%,10"
          stroke={`url(#rope-grad-${rowIndex})`}
          strokeWidth="3"
          fill="none"
          filter={`url(#rope-shadow-${rowIndex})`}
          strokeLinecap="round"
        />
        {/* Rope texture highlight */}
        <path
          d="M 0,9 Q 50%,45 100%,9"
          stroke="rgba(240,200,140,0.22)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Subtle rope twist texture */}
        <path
          d="M 0,11 Q 50%,47 100%,11"
          stroke="rgba(60,30,10,0.10)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />
      </svg>

      {/* Photos hanging from rope */}
      <div className="pw-photos-row">
        {photos.map((meta, i) => (
          <PolaroidPhoto key={i} meta={meta} index={rowIndex * 4 + i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

// Main PhotoWall component — pyramid 4-4-3 layout
function PhotoWall({ photos, onOpen }: { photos: string[]; onOpen: (src: string) => void }) {
  const meta = buildMeta(photos);

  // Pyramid layout: rows of 4, 4, 3
  const ROW_SIZES = [4, 4, 3];
  const rows: PhotoMeta[][] = [];
  let cursor = 0;
  for (const size of ROW_SIZES) {
    if (cursor >= meta.length) break;
    rows.push(meta.slice(cursor, cursor + size));
    cursor += size;
  }
  // If more photos remain, add them in extra rows of 4
  while (cursor < meta.length) {
    rows.push(meta.slice(cursor, cursor + 4));
    cursor += 4;
  }

  return (
    <div className="pw-wall">
      {rows.map((row, i) => (
        <RopeRow key={i} photos={row} rowIndex={i} onOpen={onOpen} />
      ))}
    </div>
  );
}

