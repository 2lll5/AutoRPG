"use client";

import { useEffect, useMemo, useState } from "react";
import { CORE_STORY, STAT_META, getDominantRoute, routeLabel } from "../lib/story";

const COOKIE_NAME = "autorpg_state";
const LOOP_COOKIE = "autorpg_loops";
const INITIAL = {
  chapter: 0,
  choices: "",
  stats: { nerve: 0, insight: 0, empathy: 0 },
  flags: [],
  items: [],
  flagCount: 0,
  itemCount: 0,
  result: null,
};

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const hit = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : null;
}

function writeCookie(name, value, days = 180) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function encodeState(state) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  } catch {
    return "";
  }
}

function decodeState(value) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  } catch {
    return null;
  }
}

function ProceduralArt({ scene, accent, seed, secretClicks, onSecret }) {
  const points = useMemo(() => {
    let n = [...String(seed)].reduce((sum, c) => sum + c.charCodeAt(0), 0);
    return Array.from({ length: 26 }, (_, i) => {
      n = (n * 9301 + 49297 + i) % 233280;
      const x = 3 + (n / 233280) * 94;
      n = (n * 9301 + 49297 + i * 2) % 233280;
      const y = 4 + (n / 233280) * 60;
      return { x, y, r: i % 5 === 0 ? 1.5 : 0.7 };
    });
  }, [seed]);

  const palette = {
    violet: ["#9a7cff", "#4e2e86"],
    cyan: ["#52e5ff", "#167b93"],
    rose: ["#ff6ea8", "#8a294f"],
    amber: ["#ffbe55", "#8c5421"],
    lime: ["#b7ff64", "#4d7e28"],
    blue: ["#6ca8ff", "#244f91"],
  }[accent] || ["#9a7cff", "#4e2e86"];

  return (
    <button className="art-button" onClick={onSecret} aria-label="調查場景中的月亮">
      <svg className="scene-art" viewBox="0 0 1000 600" role="img" aria-label={`${scene} 場景插畫`}>
        <defs>
          <linearGradient id={`sky-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#080b1c" />
            <stop offset="0.6" stopColor="#151634" />
            <stop offset="1" stopColor={palette[1]} />
          </linearGradient>
          <radialGradient id={`moon-${seed}`}>
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor={palette[0]} />
            <stop offset="1" stopColor={palette[0]} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`ground-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={palette[1]} stopOpacity="0.6" />
            <stop offset="1" stopColor="#05060d" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill={`url(#sky-${seed})`} />
        {points.map((p, i) => <circle key={i} cx={p.x * 10} cy={p.y * 6} r={p.r * 2} fill="#fff" opacity={0.3 + (i % 4) * 0.15} />)}
        <circle cx="790" cy="125" r={secretClicks >= 7 ? 94 : 68} fill={`url(#moon-${seed})`} opacity="0.9" />
        <circle cx="790" cy="125" r="45" fill="#eff5ff" opacity="0.88" />
        <path d="M0 450 L120 355 L210 405 L320 290 L410 388 L520 245 L620 360 L730 270 L835 370 L1000 285 L1000 600 L0 600 Z" fill={`url(#ground-${seed})`} />
        <g opacity="0.86">
          {Array.from({ length: 14 }, (_, i) => {
            const w = 42 + (i % 4) * 18;
            const h = 85 + ((i * 37) % 190);
            const x = i * 78 - 18;
            return <rect key={i} x={x} y={475 - h} width={w} height={h} rx="3" fill="#090b16" stroke={i % 3 === 0 ? palette[0] : "#222945"} strokeWidth="2" />;
          })}
        </g>
        {Array.from({ length: 30 }, (_, i) => <rect key={i} x={20 + (i % 15) * 64} y={326 + Math.floor(i / 15) * 70 + (i % 3) * 9} width="8" height="13" fill={palette[0]} opacity={i % 4 === 0 ? 0.85 : 0.25} />)}
        <path d="M500 270 L526 340 L596 342 L540 384 L560 455 L500 414 L440 455 L460 384 L404 342 L474 340 Z" fill="none" stroke={palette[0]} strokeWidth="5" opacity="0.7" />
        <circle cx="500" cy="378" r="58" fill="#060812" stroke={palette[0]} strokeWidth="3" />
        <path d="M500 325 L500 378 L540 405" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M420 535 Q500 470 580 535" fill="#080a13" stroke={palette[0]} strokeWidth="3" />
        <circle cx="472" cy="505" r="6" fill={palette[0]} />
        <circle cx="528" cy="505" r="6" fill={palette[0]} />
        <path d="M486 530 Q500 542 514 530" fill="none" stroke={palette[0]} strokeWidth="3" />
        <text x="34" y="54" fill="#fff" opacity="0.55" fontSize="18" letterSpacing="7">AUTO RPG // {String(scene).toUpperCase()}</text>
      </svg>
      <span className="art-hint">點擊月亮調查異常</span>
    </button>
  );
}

export default function Game() {
  const [generated, setGenerated] = useState([]);
  const [state, setState] = useState(INITIAL);
  const [ready, setReady] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [toast, setToast] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [loops, setLoops] = useState(0);

  useEffect(() => {
    const saved = decodeState(readCookie(COOKIE_NAME) || "");
    const loopValue = Number(readCookie(LOOP_COOKIE) || 0);
    if (saved?.stats && typeof saved.chapter === "number") setState({ ...INITIAL, ...saved });
    setLoops(loopValue);
    fetch(`https://raw.githubusercontent.com/2lll5/AutoRPG/main/public/story.generated.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setGenerated(Array.isArray(data.episodes) ? data.episodes : []))
      .catch(() => setGenerated([]))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeCookie(COOKIE_NAME, encodeState(state));
  }, [state, ready]);

  useEffect(() => {
    const sequence = [];
    const onKey = (event) => {
      sequence.push(event.key.toLowerCase());
      if (sequence.length > 10) sequence.shift();
      if (sequence.join(",") === "arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a") {
        setToast("彩蛋解鎖：你輸入了古老的勇者密碼。空白硬幣 +1");
        setState((s) => ({ ...s, items: [...new Set([...s.items, "勇者密碼硬幣"])] }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  const episodes = useMemo(() => [...CORE_STORY, ...generated], [generated]);
  const current = episodes[Math.min(state.chapter, Math.max(episodes.length - 1, 0))];
  const route = getDominantRoute(state.stats);
  const routeText = current?.routeText?.[route] || current?.routeText?.balanced || "你的選擇正在改變這段故事。";
  const isWaiting = ready && state.chapter >= episodes.length;

  const choose = (choice, choiceIndex) => {
    if (state.result) return;
    const nextStats = { ...state.stats };
    Object.entries(choice.effects || {}).forEach(([key, value]) => { nextStats[key] = (nextStats[key] || 0) + value; });
    const hasNewFlag = Boolean(choice.flag && !state.flags.includes(choice.flag));
    const hasNewItem = Boolean(choice.item && !state.items.includes(choice.item));
    const nextFlags = choice.flag ? [...new Set([...state.flags, choice.flag])].slice(-36) : state.flags;
    const nextItems = choice.item ? [...new Set([...state.items, choice.item])].slice(-24) : state.items;
    setState({
      ...state,
      stats: nextStats,
      flags: nextFlags,
      items: nextItems,
      flagCount: state.flagCount + (hasNewFlag ? 1 : 0),
      itemCount: state.itemCount + (hasNewItem ? 1 : 0),
      choices: `${state.choices}${choiceIndex}`,
      result: choice.result,
    });
  };

  const advance = () => setState((s) => ({ ...s, chapter: s.chapter + 1, result: null }));

  const restart = () => {
    const nextLoops = loops + 1;
    writeCookie(LOOP_COOKIE, String(nextLoops));
    setLoops(nextLoops);
    setState(INITIAL);
    setShowRestart(false);
    setToast(nextLoops === 3 ? "彩蛋：第三次重來後，鐘塔開始記得你。" : "迴圈已重啟。這次也許會看見不同的真相。" );
  };

  const investigateMoon = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next === 7) {
      setToast("隱藏彩蛋：月亮其實是第七扇門。獲得「月背鑰匙」。");
      setState((s) => ({ ...s, items: [...new Set([...s.items, "月背鑰匙"])] }));
    }
  };

  if (!ready) return <main className="loading-screen"><div className="loader" /><p>正在讀取零時檔案…</p></main>;

  return (
    <main className="game-shell">
      <div className="noise" />
      <header className="topbar">
        <div>
          <span className="eyebrow">AUTO RPG / LIVE STORY</span>
          <h1>零時迴圈</h1>
        </div>
        <div className="header-actions">
          <button className="ghost-button" onClick={() => setShowArchive(true)}>旅程紀錄</button>
          <button className="danger-button" onClick={() => setShowRestart(true)}>重新開始</button>
        </div>
      </header>

      <section className="progress-wrap" aria-label="故事進度">
        <div className="progress-meta"><span>目前章節 {Math.min(state.chapter + 1, episodes.length)} / {episodes.length}</span><span>每小時新增故事 · 7/31 收尾</span></div>
        <div className="progress-track"><span style={{ width: `${Math.min(100, ((state.chapter + (state.result ? 0.5 : 0)) / Math.max(episodes.length, 1)) * 100)}%` }} /></div>
      </section>

      {isWaiting ? (
        <section className="waiting-card">
          <div className="waiting-orbit"><span /></div>
          <span className="eyebrow">THE STORY IS STILL GROWING</span>
          <h2>你已抵達目前最新的整點</h2>
          <p>下一段故事會在 GitHub Actions 的下一次每小時更新後出現。你的 Cookie 存檔已保留，重新整理即可繼續。</p>
          <button className="primary-button" onClick={() => location.reload()}>檢查新章節</button>
        </section>
      ) : current ? (
        <div className="game-grid">
          <section className="story-panel">
            <ProceduralArt scene={current.scene} accent={current.accent} seed={current.id} secretClicks={secretClicks} onSecret={investigateMoon} />
            <article className="story-card">
              <div className="chapter-line"><span>{current.releaseAt ? "整點新增章節" : "主線檔案"}</span><span>{routeLabel(route)}</span></div>
              <h2>{current.title}</h2>
              <p className="subtitle">{current.subtitle}</p>
              <p className="story-copy">{current.intro}</p>
              <div className="route-note"><span>路線反應</span><p>{routeText}</p></div>

              {!state.result ? (
                <div className="choices" aria-label="選擇行動">
                  {current.choices.map((choice, index) => (
                    <button className="choice-card" key={`${current.id}-${index}`} onClick={() => choose(choice, index)}>
                      <span className="choice-index">0{index + 1}</span>
                      <span className="choice-icon">{choice.icon}</span>
                      <span className="choice-label">{choice.label}</span>
                      <span className="choice-arrow">→</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="result-card">
                  <span className="eyebrow">CHOICE RECORDED IN COOKIE</span>
                  <h3>選擇留下了痕跡</h3>
                  <p>{state.result}</p>
                  <button className="primary-button" onClick={advance}>前往下一幕 <span>→</span></button>
                </div>
              )}
            </article>
          </section>

          <aside className="status-panel">
            <div className="status-card identity-card">
              <span className="eyebrow">PLAYER</span>
              <div className="avatar">Z<span>{loops > 0 ? loops : ""}</span></div>
              <h3>{routeLabel(route)}</h3>
              <p>重啟次數：{loops} · 選擇數：{state.choices.length}</p>
            </div>
            <div className="status-card">
              <div className="status-heading"><h3>精神傾向</h3><span>會影響敘事</span></div>
              {Object.entries(STAT_META).map(([key, meta]) => (
                <div className="stat-row" key={key}>
                  <span>{meta.icon} {meta.label}</span>
                  <div className="stat-bar"><i style={{ width: `${Math.min(100, 18 + Math.max(0, state.stats[key]) * 8)}%` }} /></div>
                  <strong>{state.stats[key]}</strong>
                </div>
              ))}
            </div>
            <div className="status-card">
              <div className="status-heading"><h3>持有物</h3><span>{state.itemCount || state.items.length}</span></div>
              <div className="item-list">
                {state.items.length ? state.items.slice(-6).map((item) => <span key={item}>{item}</span>) : <p>尚未取得特殊物品。</p>}
              </div>
            </div>
            <div className="status-card live-card">
              <span className="live-dot" />
              <div><strong>故事仍在生長</strong><p>GitHub 每小時生成一幕，Vercel 自動部署。</p></div>
            </div>
          </aside>
        </div>
      ) : null}

      <footer><span>存檔方式：Browser Cookie</span><span>版本：{generated.length ? `LIVE +${generated.length}` : "CORE"}</span></footer>

      {showRestart && (
        <div className="modal-backdrop" onClick={() => setShowRestart(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="eyebrow">RESET THE LOOP</span><h2>確定重新開始？</h2>
            <p>目前選擇、能力與物品會清空，但世界會記得你曾經重來。</p>
            <div className="modal-actions"><button className="ghost-button" onClick={() => setShowRestart(false)}>取消</button><button className="danger-button solid" onClick={restart}>重啟迴圈</button></div>
          </div>
        </div>
      )}

      {showArchive && (
        <div className="modal-backdrop" onClick={() => setShowArchive(false)}>
          <div className="modal archive-modal" onClick={(e) => e.stopPropagation()}>
            <span className="eyebrow">JOURNEY ARCHIVE</span><h2>旅程紀錄</h2>
            <p>選擇序列：{state.choices || "尚未選擇"}</p>
            <div className="archive-grid"><div><strong>{state.flagCount || state.flags.length}</strong><span>隱藏旗標</span></div><div><strong>{state.itemCount || state.items.length}</strong><span>特殊物品</span></div><div><strong>{loops}</strong><span>重啟次數</span></div></div>
            <div className="flag-list">{state.flags.length ? state.flags.map((flag) => <code key={flag}>{flag}</code>) : <span>尚未觸發隱藏事件。</span>}</div>
            <button className="primary-button" onClick={() => setShowArchive(false)}>回到故事</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
