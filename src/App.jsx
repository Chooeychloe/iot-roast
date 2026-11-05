import { useEffect, useState } from "react";
import { QUESTIONS, ROASTS, ENDINGS, shuffle } from "./data";

const DEFAULT_SECONDS = 20;
const MIN_SECONDS = 5;
const MAX_SECONDS = 300;
const gradePercent = (score, total) => total ? Math.round((score / total) * 10000) / 100 : 0;
const choiceBags = new WeakMap();
const lastChoiceByPool = new WeakMap();
const choose = (items) => {
  let bag = choiceBags.get(items);
  if (!bag?.length) {
    bag = shuffle(items.map((text, index) => ({ text, index })));
    const lastIndex = lastChoiceByPool.get(items);
    if (bag.length > 1 && bag[bag.length - 1].index === lastIndex) {
      [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    choiceBags.set(items, bag);
  }

  const choice = bag.pop();
  lastChoiceByPool.set(items, choice.index);
  return choice.text;
};

function useLocalStorage(key, init) {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ }
  }, [key, v]);
  return [v, setV];
}

/* ---------- Mascot ---------- */
function Mascot({ mood, tick }) {
  const browL = mood === "mad" ? "rotate-[22deg] translate-y-0.5" : mood === "glad" ? "-translate-y-1" : "";
  const browR = mood === "mad" ? "-rotate-[22deg] translate-y-0.5" : mood === "glad" ? "-translate-y-1" : "";
  const body = mood === "mad" ? "animate-shake" : mood === "glad" ? "animate-hop" : "";
  const brow = "origin-center [transform-box:fill-box] transition-transform duration-200";
  return (
    <svg viewBox="0 0 300 270" role="img" aria-label="An IoT robot mascot with a wireless antenna and sensor display" className="w-44 shrink-0 overflow-visible sm:w-56 md:w-64">
      <g key={tick} className={body}>
        <ellipse cx="150" cy="252" rx="77" ry="9" fill="#241a4d" opacity=".12" />
        {/* Wireless antenna and signal arcs */}
        <path d="M150 49V32" stroke="#37312d" strokeWidth="6" strokeLinecap="round" />
        <path d="M137 28q13-13 26 0m-21 5q8-8 16 0" fill="none" stroke="#258b78" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="150" cy="37" r="4" fill="#258b78" />
        <circle cx="150" cy="25" r="8" fill="#f2c94c" stroke="#37312d" strokeWidth="4" />
        {/* Side sensor modules */}
        <rect x="72" y="88" width="24" height="42" rx="9" fill="#4f8e78" stroke="#37312d" strokeWidth="4" />
        <circle cx="84" cy="101" r="4" fill="#c8f5dc" /><circle cx="84" cy="117" r="4" fill="#f2c94c" />
        <rect x="204" y="88" width="24" height="42" rx="9" fill="#4f8e78" stroke="#37312d" strokeWidth="4" />
        <circle cx="216" cy="101" r="4" fill="#c8f5dc" /><circle cx="216" cy="117" r="4" fill="#f2c94c" />
        {/* Compact robot body */}
        <path d="M119 148v15h62v-15" fill="#8b8984" stroke="#37312d" strokeWidth="5" strokeLinejoin="round" />
        <rect x="101" y="158" width="98" height="82" rx="20" fill="#d9d3c7" stroke="#37312d" strokeWidth="5" />
        <path d="M105 178h-14q-9 0-9 9v24q0 8 8 8h13m96-41h14q9 0 9 9v24q0 8-8 8h-13" fill="#cbc5b9" stroke="#37312d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="89" cy="202" r="7" fill="#4f8e78" stroke="#37312d" strokeWidth="3" />
        <circle cx="211" cy="202" r="7" fill="#4f8e78" stroke="#37312d" strokeWidth="3" />
        {/* Chest telemetry display */}
        <rect x="121" y="174" width="58" height="48" rx="9" fill="#263d48" stroke="#37312d" strokeWidth="4" />
        <rect x="128" y="180" width="44" height="27" rx="4" fill="#b9e8d5" />
        <path d="M132 200l8-9 7 5 8-10 11 7" fill="none" stroke="#258b78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="134" cy="214" r="2.5" fill="#79e0a7" /><circle cx="142" cy="214" r="2.5" fill="#f2c94c" />
        <text x="160" y="217" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">IoT</text>
        {/* Short articulated legs and sturdy feet */}
        <path d="M122 239v10m56-10v10" stroke="#37312d" strokeWidth="9" strokeLinecap="round" />
        <path d="M108 253q0-7 8-7h15q8 0 8 7v2h-31zm50 0q0-7 8-7h15q8 0 8 7v2h-31z" fill="#4f8e78" stroke="#37312d" strokeWidth="4" strokeLinejoin="round" />
        {/* Rounded screen head */}
        <rect x="91" y="49" width="118" height="105" rx="28" fill="#d9d3c7" stroke="#37312d" strokeWidth="5" />
        <rect x="104" y="65" width="92" height="72" rx="20" fill="#263d48" stroke="#37312d" strokeWidth="4" />
        <rect x="116" y="82" width="21" height="25" rx="10" fill="#c8f5dc" />
        <rect x="163" y="82" width="21" height="25" rx="10" fill="#c8f5dc" />
        <circle cx="127" cy="94" r="5" fill="#258b78" /><circle cx="174" cy="94" r="5" fill="#258b78" />
        <rect x="117" y="73" width="20" height="5" rx="3" fill="#d9d3c7" className={`${brow} ${browL}`} />
        <rect x="163" y="73" width="20" height="5" rx="3" fill="#d9d3c7" className={`${brow} ${browR}`} />
        <g className={`transition-opacity ${mood === "glad" ? "opacity-70" : "opacity-0"}`}>
          <circle cx="110" cy="117" r="5" fill="#ed8991" /><circle cx="190" cy="117" r="5" fill="#ed8991" />
        </g>
        <path d="M141 117q9 8 18 0" fill="none" stroke="#c8f5dc" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M141 119q9 8 18 0" fill="none" stroke="#ed8991" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ---------- Small UI helpers ---------- */
const card = "rounded-3xl border-2 border-violet-200 bg-white p-4 sm:p-6 dark:border-violet-900 dark:bg-panel";
const btn = "rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:opacity-40 dark:bg-violet-300 dark:text-night";
const chip = (on) =>
  `rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-colors ${
    on ? "border-violet-600 bg-violet-600 text-white dark:border-violet-300 dark:bg-violet-300 dark:text-night"
       : "border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300"}`;
const input = "w-full rounded-xl border-2 border-violet-200 bg-violet-50 px-3 py-2 dark:border-violet-800 dark:bg-night";

/* ---------- App ---------- */
export default function App() {
  useEffect(() => {
    document.title = "IoT Robot Roast | IoT Quiz by Sir Dhan";
  }, []);

  const [screen, setScreen] = useState("setup");
  const [cfg, setCfg] = useLocalStorage("iot-cfg", { off: [], count: 10, timer: false, seconds: DEFAULT_SECONDS });
  const [custom, setCustom] = useLocalStorage("iot-custom", []);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState([]);
  const [streak, setStreak] = useState({ good: 0, bad: 0 });
  const [missed, setMissed] = useState([]);
  const [ending, setEnding] = useState("");
  const [supportOpen, setSupportOpen] = useState(false);
  const [left, setLeft] = useState(DEFAULT_SECONDS);
  const [nextCountdown, setNextCountdown] = useState(5);
  const [line, setLine] = useState("Ready na ba ang IoT knowledge mo? Tingnan natin kung may signal.");
  const [mood, setMood] = useState("");
  const [tick, setTick] = useState(0);
  const secondsPerQuestion = Math.min(Math.max(Math.floor(Number(cfg.seconds) || DEFAULT_SECONDS), MIN_SECONDS), MAX_SECONDS);

  const all = [...QUESTIONS, ...custom.filter((question) => question.topic?.startsWith("IoT Module"))];
  const topics = [...new Set(all.map((q) => q.topic))];
  const pool = all.filter((q) => !cfg.off.includes(q.topic));
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  const showRoast = (text, m = "") => {
    setLine(text);
    setMood(m);
    setTick((t) => t + 1);
  };

  const start = () => {
    if (!pool.length) return;
    const d = shuffle(pool).slice(0, cfg.count).map((q) => ({
      ...q, opts: shuffle(q.o.map((t, i) => ({ t, ok: i === q.a }))),
    }));
    setDeck(d); setIdx(0); setPicked(null); setScore(0); setResponses([]); setStreak({ good: 0, bad: 0 }); setMissed([]);
    setScreen("quiz");
    showRoast("Sige, simulan natin. Tingnan natin kung may signal ang IoT knowledge mo.");
  };

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i >= 0 && deck[idx].opts[i].ok;
    setResponses((items) => [...items, { topic: deck[idx].topic, correct: ok }]);
    if (!ok) setMissed((items) => [...items, { question: deck[idx], answer: i < 0 ? "No answer (time ran out)" : deck[idx].opts[i].t }]);
    const R = ROASTS.iot;
    const g = ok ? streak.good + 1 : 0, b = ok ? 0 : streak.bad + 1;
    setStreak({ good: g, bad: b });
    if (ok) setScore((s) => s + 1);
    let chosen;
    if (ok && g >= 3) {
      chosen = choose(ROASTS.iot.streakGood);
    } else if (ok) {
      chosen = choose(R.good);
    } else if (i === -1) {
      chosen = choose(R.timeout);
    } else if (b >= 2) {
      chosen = choose(R.streakBad);
    } else {
      chosen = choose(R.bad);
    }
    showRoast(chosen, ok ? "glad" : "mad");
  };

  const next = () => {
    if (idx + 1 >= deck.length) {
      const pct = gradePercent(score, deck.length);
      const messages = ENDINGS.find(([threshold]) => pct >= threshold)?.[1] ?? ENDINGS.at(-1)[1];
      const finalLine = choose(messages).replaceAll("{score}", pct.toFixed(2));
      setEnding(finalLine);
      setScreen("end");
      showRoast(finalLine, pct >= 80 ? "glad" : "mad");
    } else { setIdx(idx + 1); setPicked(null); setMood(""); }
  };

  /* Optional countdown per question; running out counts as wrong */
  useEffect(() => {
    if (screen !== "quiz" || !cfg.timer || picked !== null) return;
    setLeft(secondsPerQuestion);
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen, idx, picked, cfg.timer, secondsPerQuestion]);
  useEffect(() => {
    if (screen === "quiz" && cfg.timer && picked === null && left <= 0) answer(-1);
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (screen !== "quiz" || picked === null) return;
    setNextCountdown(5);
    const interval = setInterval(() => setNextCountdown((seconds) => Math.max(seconds - 1, 0)), 1000);
    const timeout = setTimeout(next, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [screen, picked, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = deck[idx];
  const pct = gradePercent(score, deck.length);
  const moduleScores = responses.reduce((scores, response) => {
    const module = scores[response.topic] ?? { correct: 0, total: 0 };
    module.total += 1;
    if (response.correct) module.correct += 1;
    scores[response.topic] = module;
    return scores;
  }, {});

  return (
    <div className="flex min-h-screen flex-col bg-violet-50 font-sans text-violet-950 dark:bg-night dark:text-violet-50">
      <div className="mx-auto grid w-full max-w-5xl flex-1 content-start gap-5 p-4 sm:gap-6 sm:p-5 md:grid-cols-[380px_1fr] md:pt-10">
        {/* Mascot column */}
        <aside className="flex flex-col items-center gap-3 md:sticky md:top-6 md:self-start">
          <div
            aria-live="polite"
            className={`relative min-h-24 w-full rounded-2xl border-2 bg-white p-4 text-lg font-bold dark:bg-panel
              ${mood === "mad" ? "border-red-500" : mood === "glad" ? "border-emerald-500" : "border-violet-900 dark:border-violet-200"}`}
          >
            {line}
            <span className={`absolute -bottom-3 left-1/2 -ml-2.5 size-5 rotate-45 border-r-2 border-b-2 bg-white dark:bg-panel
              ${mood === "mad" ? "border-red-500" : mood === "glad" ? "border-emerald-500" : "border-violet-900 dark:border-violet-200"}`} />
          </div>
          <div className="flex w-full items-center justify-center gap-1">
            <Mascot mood={mood} tick={tick} />
          </div>
        </aside>

        {/* Main column */}
        <main className={card}>
          {screen === "setup" && (
            <Setup {...{ cfg, set, topics, all, pool, custom, setCustom, start }} />
          )}

          {screen === "quiz" && q && (
            <section>
              <button className={`${chip(false)} mb-4`} onClick={() => {
                setScreen("setup");
                setPicked(null);
                setMood("");
                showRoast("Back to the lobby, rookie.");
              }}>← Back to lobby</button>
              <div className="mb-3 flex items-center justify-between font-bold text-violet-700 dark:text-violet-300">
                <span>Question {idx + 1} of {deck.length}</span>
                <span>
                  {cfg.timer && picked === null && <span className={left <= 5 ? "mr-3 text-red-500" : "mr-3"}>{Math.max(left, 0)}s</span>}
                  Score {score} · Streak {streak.good}
                </span>
              </div>
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-violet-900">
                <div className="h-full bg-violet-600 transition-all dark:bg-violet-300" style={{ width: `${(idx / deck.length) * 100}%` }} />
              </div>
              <p className="mb-4 text-xl font-bold leading-snug">{q.q}</p>
              {q.code && <pre className="mb-4 overflow-x-auto rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm dark:border-violet-800 dark:bg-night">{q.code}</pre>}
              <div className="grid gap-2.5">
                {q.opts.map((o, i) => {
                  const state = picked === null ? "" : o.ok ? "border-emerald-500 bg-emerald-500/15"
                    : picked === i ? "border-red-500 bg-red-500/15" : "opacity-60";
                  return (
                    <button key={o.t} disabled={picked !== null} onClick={() => answer(i)}
                      className={`rounded-xl border-2 border-violet-200 bg-violet-50 px-4 py-3 text-left hover:enabled:border-violet-500 dark:border-violet-800 dark:bg-night ${state}`}>
                      {o.t}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <>
                  <p className="mt-4 rounded-r-xl border-l-4 border-violet-500 bg-violet-50 p-3 text-sm dark:bg-night">{q.e}</p>
                  <p aria-live="polite" className="mt-3 text-sm text-violet-700 dark:text-violet-300">
                    {idx + 1 >= deck.length ? "Your result is ready" : `Next question in ${nextCountdown} ${nextCountdown === 1 ? "second" : "seconds"}`}
                  </p>
                  <button autoFocus className={`${btn} mt-2`} onClick={next}>{idx + 1 >= deck.length ? "See my grade" : "Next question"}</button>
                </>
              )}
            </section>
          )}

          {screen === "end" && (
            <section>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Final grade</h1>
              <p className="my-2 flex flex-wrap items-baseline gap-x-3 text-4xl font-extrabold tracking-tight sm:text-6xl"><span>{score} / {deck.length}</span><span className="text-xl text-violet-500 sm:text-2xl">({pct.toFixed(2)}%)</span></p>
              <div className="mb-5 rounded-2xl border-2 border-violet-200 p-4 dark:border-violet-800">
                <p className="mb-3 text-sm text-violet-700 dark:text-violet-300">
                  Exact score: {score} correct out of {deck.length} questions. Percentage = correct / total x 100, rounded to two decimal places. {missed.length} wrong, {Math.max(deck.length - responses.length, 0)} unanswered.
                </p>
                <h2 className="mb-2 font-bold">Score by IoT module</h2>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(moduleScores).map(([topic, result]) => (
                    <div key={topic} className="rounded-xl bg-violet-50 p-3 dark:bg-night">
                      <dt className="text-sm">{topic}</dt>
                      <dd className="font-extrabold">{result.correct} / {result.total} ({gradePercent(result.correct, result.total).toFixed(2)}%)</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mb-5 text-violet-700 dark:text-violet-300">{ending}</p>
              {missed.length > 0 && (
                <details className="mb-5 rounded-2xl border-2 border-violet-200 p-4 dark:border-violet-800">
                  <summary className="cursor-pointer font-bold">Review {missed.length} missed {missed.length === 1 ? "question" : "questions"}</summary>
                  <div className="mt-3 grid gap-3">
                    {missed.map(({ question, answer }, i) => (
                      <div key={`${question.q}-${i}`} className="rounded-xl bg-violet-50 p-3 text-sm dark:bg-night">
                        <p className="font-bold">{question.q}</p>
                        <p className="mt-1 text-red-700 dark:text-red-300">Your answer: {answer}</p>
                        <p className="text-emerald-800 dark:text-emerald-300">Correct answer: {question.o[question.a]}</p>
                        <p className="mt-1">{question.e}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
              <div className="flex flex-wrap gap-3">
                <button className={btn} onClick={start}>Try again</button>
                <button className={chip(false)} onClick={() => { setScreen("setup"); showRoast("Back to the lobby, rookie."); }}>Change settings</button>
              </div>
            </section>
          )}
        </main>
      </div>
      <footer className="mt-auto w-full border-t border-violet-200/80 bg-white/70 dark:border-violet-900 dark:bg-panel/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 py-4 text-center text-sm text-violet-600 dark:text-violet-300 md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p>
              Built for IoT survivors by <span className="font-extrabold text-violet-900 dark:text-white">Sir Dhan</span>
              <span aria-hidden="true"> | </span>
              <span>Powered by sensors, robot energy, and questionable confidence.</span>
            </p>
            <nav aria-label="Sir Dhan's social profiles and support" className="flex flex-wrap items-center justify-center gap-2">
            <button className={`${chip(false)} whitespace-nowrap`} aria-haspopup="dialog" onClick={() => setSupportOpen(true)}>
              ☕ Buy me a coffee
            </button>
            <a aria-label="GitHub" title="GitHub" className="flex size-11 items-center justify-center rounded-full hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-violet-900" href="https://github.com/Chooeychloe" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.97 2.05 3.32 1.55.1-.73.4-1.23.7-1.52-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>
            </a>
            <a aria-label="LinkedIn" title="LinkedIn" className="flex size-11 items-center justify-center rounded-full hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-violet-900" href="https://www.linkedin.com/in/dhan-belgica/" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.34H4.97V9.02h2.96v9.32ZM6.45 7.75a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm11.89 10.59h-2.95V13.8c0-1.08-.02-2.46-1.5-2.46-1.5 0-1.73 1.17-1.73 2.38v4.62H9.2V9.02h2.84v1.27h.04c.4-.73 1.36-1.5 2.8-1.5 3 0 3.56 1.97 3.56 4.53v5.02Z" /></svg>
            </a>
            <a aria-label="Instagram" title="Instagram" className="flex size-11 items-center justify-center rounded-full hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-violet-900" href="https://www.instagram.com/well_dhan/" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /></svg>
            </a>
            </nav>
          </div>
        </div>
      </footer>
      {supportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSupportOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="gcash-dialog-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 text-center text-violet-950 shadow-2xl dark:bg-panel dark:text-violet-50"
            onClick={(event) => event.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between gap-3 text-left">
              <h2 id="gcash-dialog-title" className="text-xl font-extrabold">Buy me a coffee</h2>
              <button className={chip(false)} aria-label="Close GCash QR" onClick={() => setSupportOpen(false)}>Close</button>
            </div>
            <p className="mb-3 text-sm text-violet-700 dark:text-violet-300">Scan this GCash QR code to support the project.</p>
            <img src="./gcash-qr.jpg" alt="GCash payment QR code for Sir Dhan" className="mx-auto max-h-[68vh] w-auto max-w-full rounded-xl object-contain" />
          </section>
        </div>
      )}
    </div>
  );
}

/* ---------- Setup screen: everything here shapes the next round ---------- */
function Setup({ cfg, set, topics, all, pool, custom, setCustom, start }) {
  const [form, setForm] = useState({ q: "", a: "", b: "", c: "", d: "", e: "", topic: "IoT Module 5: Web and Cloud of Things" });
  const f = (k) => ({ value: form[k], onChange: (ev) => setForm({ ...form, [k]: ev.target.value }) });
  const valid = form.q && form.a && form.b && form.c && form.d;
  const max = Math.max(pool.length, 1);
  const questionCount = Math.min(Math.max(Math.floor(Number(cfg.count) || 1), 1), max);
  const updateQuestionCount = (value) => set({ count: Math.min(Math.max(Math.floor(Number(value) || 1), 1), max) });
  const secondsPerQuestion = Math.min(Math.max(Math.floor(Number(cfg.seconds) || DEFAULT_SECONDS), MIN_SECONDS), MAX_SECONDS);
  const updateTimerSeconds = (value) => set({ seconds: Math.min(Math.max(Math.floor(Number(value) || MIN_SECONDS), MIN_SECONDS), MAX_SECONDS) });
  const add = (ev) => {
    ev.preventDefault();
    if (!valid) return;
    setCustom([...custom, { topic: form.topic.trim() || "Custom", q: form.q, o: [form.a, form.b, form.c, form.d], a: 0, e: form.e || "No explanation given. The robot is judging you." }]);
    setForm({ q: "", a: "", b: "", c: "", d: "", e: "", topic: form.topic });
  };
  return (
    <section className="grid gap-6">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">The IoT robot will judge your knowledge.</h1>
        <p className="text-violet-700 dark:text-violet-300">Pick your IoT modules, set the question count, and add your own IoT questions. The robot comes in one setting: savage.</p>
      </div>

      <div>
        <h2 className="mb-2 font-bold">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = !cfg.off.includes(t);
            return <button key={t} aria-pressed={on} className={chip(on)}
              onClick={() => set({ off: on ? [...cfg.off, t] : cfg.off.filter((x) => x !== t) })}>{t} ({all.filter((q) => q.topic === t).length})</button>;
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <fieldset className="flex flex-wrap items-center gap-2 sm:gap-3">
          <legend className="sr-only">Number of questions</legend>
          <span className="font-bold">Questions</span>
          <button type="button" className={chip(false)} aria-label="Decrease question count"
            disabled={questionCount <= 1} onClick={() => updateQuestionCount(questionCount - 1)}>−</button>
          <input type="number" min="1" max={max} step="1" inputMode="numeric" aria-label="Number of questions"
            value={questionCount} onChange={(e) => updateQuestionCount(e.target.value)}
            className="w-20 rounded-xl border-2 border-violet-200 bg-violet-50 px-2 py-2 text-center font-bold dark:border-violet-800 dark:bg-night" />
          <button type="button" className={chip(false)} aria-label="Increase question count"
            disabled={questionCount >= max} onClick={() => updateQuestionCount(questionCount + 1)}>+</button>
          <span className="text-sm text-violet-600 dark:text-violet-300">of {pool.length} available</span>
        </fieldset>
        <label className="flex items-center gap-2 font-bold">
          <input type="checkbox" checked={cfg.timer} onChange={(e) => set({ timer: e.target.checked })} className="size-5 accent-violet-600" />
          Enable timer
        </label>
        {cfg.timer && (
          <fieldset className="flex flex-wrap items-center gap-2 sm:gap-3">
            <legend className="sr-only">Timer duration per question</legend>
            <span className="font-bold">Time per question</span>
            <button type="button" className={chip(false)} aria-label="Decrease time per question" disabled={secondsPerQuestion <= MIN_SECONDS}
              onClick={() => updateTimerSeconds(secondsPerQuestion - 5)}>−</button>
            <input type="number" min={MIN_SECONDS} max={MAX_SECONDS} step="5" inputMode="numeric" aria-label="Time per question in seconds"
              value={secondsPerQuestion} onChange={(e) => updateTimerSeconds(e.target.value)}
              className="w-20 rounded-xl border-2 border-violet-200 bg-violet-50 px-2 py-2 text-center font-bold dark:border-violet-800 dark:bg-night" />
            <button type="button" className={chip(false)} aria-label="Increase time per question" disabled={secondsPerQuestion >= MAX_SECONDS}
              onClick={() => updateTimerSeconds(secondsPerQuestion + 5)}>+</button>
            <span className="text-sm text-violet-600 dark:text-violet-300">seconds</span>
          </fieldset>
        )}
      </div>

      <div>
        <button className={btn} disabled={!pool.length} onClick={start}>Start the review</button>
        {!pool.length && <span className="ml-3 text-sm text-red-500">Select at least one topic.</span>}
      </div>

      <details className="rounded-2xl border-2 border-violet-200 p-4 dark:border-violet-800">
        <summary className="cursor-pointer font-bold">Add your own question ({custom.length} saved)</summary>
        <form onSubmit={add} className="mt-4 grid gap-2.5">
          <input className={input} placeholder="Question" {...f("q")} />
          <input className={input} placeholder="Correct answer" {...f("a")} />
          <input className={input} placeholder="Wrong answer 1" {...f("b")} />
          <input className={input} placeholder="Wrong answer 2" {...f("c")} />
          <input className={input} placeholder="Wrong answer 3" {...f("d")} />
          <input className={input} placeholder="Explanation (optional)" {...f("e")} />
          <select className={input} aria-label="IoT module" {...f("topic")}>
            {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
          </select>
          <div className="flex gap-3">
            <button className={btn} disabled={!valid}>Save question</button>
            {custom.length > 0 && <button type="button" className={chip(false)} onClick={() => setCustom([])}>Delete all custom</button>}
          </div>
        </form>
      </details>
    </section>
  );
}
