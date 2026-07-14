"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CORE_NODES,
  START_NODE_ID,
  STAT_META,
  getDominantRoute,
  resolveChoiceResult,
  routeLabel,
} from "../lib/story";
import {
  LIVE_PREFIX,
  buildDynamicNode,
  isDynamicNodeId,
  makeDynamicEntryId,
  migrateLiveNodeId,
  normalizeWorldFeed,
} from "../lib/runtimeStory";

const COOKIE_NAME = "autorpg_state_v3";
const LEGACY_COOKIE_NAMES = ["autorpg_state_v2", "autorpg_state"];
const LOOP_COOKIE = "autorpg_loops";

function createInitialState() {
  return {
    currentNodeId: START_NODE_ID,
    choices: "",
    history: [START_NODE_ID],
    stats: { nerve: 0, insight: 0, empathy: 0 },
    flags: [],
    items: [],
    flagCount: 0,
    itemCount: 0,
    result: null,
    dynamicEntry: null,
  };
}

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

function compactState(state) {
  return {
    ...state,
    choices: String(state.choices || "").slice(-512),
    history: Array.isArray(state.history) ? state.history.slice(-12) : [state.currentNodeId],
    flags: Array.isArray(state.flags) ? state.flags.slice(-20) : [],
    items: Array.isArray(state.items) ? state.items.slice(-16) : [],
    dynamicEntry: state.dynamicEntry
      ? {
          flags: (state.dynamicEntry.flags || []).slice(-12),
          items: (state.dynamicEntry.items || []).slice(-10),
        }
      : null,
  };
}

function ProceduralArt({ scene, accent, seed, secretClicks, onSecret }) {
  const points = useMemo(() => {
    let value = [...String(seed)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Array.from({ length: 28 }, (_, index) => {
      value = (value * 9301 + 49297 + index) % 233280;
      const x = 3 + (value / 233280) * 94;
      value = (value * 9301 + 49297 + index * 2) % 233280;
      const y = 4 + (value / 233280) * 60;
      return { x, y, r: index % 5 === 0 ? 1.5 : 0.7 };
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
            <stop offset="0" stopColor={palette[1]} stopOpacity="0.62" />
            <stop offset="1" stopColor="#05060d" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill={`url(#sky-${seed})`} />
        {points.map((point, index) => (
          <circle key={index} cx={point.x * 10} cy={point.y * 6} r={point.r * 2} fill="#fff" opacity={0.3 + (index % 4) * 0.15} />
        ))}
        <circle cx="790" cy="125" r={secretClicks >= 7 ? 94 : 68} fill={`url(#moon-${seed})`} opacity="0.9" />
        <circle cx="790" cy="125" r="45" fill="#eff5ff" opacity="0.88" />
        <path d="M0 450 L120 355 L210 405 L320 290 L410 388 L520 245 L620 360 L730 270 L835 370 L1000 285 L1000 600 L0 600 Z" fill={`url(#ground-${seed})`} />
        <g opacity="0.86">
          {Array.from({ length: 14 }, (_, index) => {
            const width = 42 + (index % 4) * 18;
            const height = 85 + ((index * 37) % 190);
            return <rect key={index} x={index * 78 - 18} y={475 - height} width={width} height={height} rx="3" fill="#090b16" stroke={index % 3 === 0 ? palette[0] : "#222945"} strokeWidth="2" />;
          })}
        </g>
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

function findLegacyState() {
  for (const cookieName of LEGACY_COOKIE_NAMES) {
    const decoded = decodeState(readCookie(cookieName) || "");
    if (decoded?.stats) return decoded;
  }
  return null;
}

function migrateState(saved, feed) {
  const initial = createInitialState();
  if (!saved?.stats) return initial;

  if (saved.currentNodeId) {
    const migratedId = migrateLiveNodeId(saved.currentNodeId, feed);
    return compactState({
      ...initial,
      ...saved,
      currentNodeId: migratedId,
      history: Array.isArray(saved.history) && saved.history.length ? saved.history : [migratedId],
      result: null,
      dynamicEntry: saved.dynamicEntry || (isDynamicNodeId(migratedId) ? { flags: saved.flags || [], items: saved.items || [] } : null),
    });
  }

  return initial;
}

export default function Game() {
  const [feed, setFeed] = useState(normalizeWorldFeed(null));
  const [state, setState] = useState(createInitialState);
  const [ready, setReady] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [toast, setToast] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [loops, setLoops] = useState(0);

  const coreMap = useMemo(() => new Map(CORE_NODES.map((node) => [node.id, node])), []);

  useEffect(() => {
    const saved = decodeState(readCookie(COOKIE_NAME) || "") || findLegacyState();
    const loopValue = Number(readCookie(LOOP_COOKIE) || 0);
    setLoops(loopValue);

    fetch(`https://raw.githubusercontent.com/2lll5/AutoRPG/main/public/story.generated.json?t=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        const normalized = normalizeWorldFeed(data);
        setFeed(normalized);
        const migrated = migrateState(saved, normalized);
        setState(migrated);
        if (saved && !decodeState(readCookie(COOKIE_NAME) || "")) {
          setToast("故事引擎已升級為延遲展開樹；舊路徑已盡可能保留，動態支線改由父節點與空間狀態重新生成。");
        }
      })
      .catch(() => {
        setFeed(normalizeWorldFeed(null));
        setState(migrateState(saved, normalizeWorldFeed(null)));
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeCookie(COOKIE_NAME, encodeState(compactState(state)));
  }, [state, ready]);

  useEffect(() => {
    if (!ready || !feed.epochs.length) return;
    const migratedId = migrateLiveNodeId(state.currentNodeId, feed);
    if (migratedId !== state.currentNodeId) {
      setState((currentState) => ({
        ...currentState,
        currentNodeId: migratedId,
        history: [...currentState.history.slice(-11), migratedId],
        dynamicEntry: currentState.dynamicEntry || { flags: currentState.flags, items: currentState.items },
      }));
    }
  }, [feed, ready, state.currentNodeId]);

  useEffect(() => {
    const sequence = [];
    const onKey = (event) => {
      sequence.push(event.key.toLowerCase());
      if (sequence.length > 10) sequence.shift();
      if (sequence.join(",") === "arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a") {
        setToast("彩蛋解鎖：勇者密碼取得『空白硬幣』，它會被帶入後續空間。 ");
        setState((current) => compactState({ ...current, items: [...new Set([...current.items, "空白硬幣"])] }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4600);
    return () => clearTimeout(timer);
  }, [toast]);

  const resolvedCurrentId = migrateLiveNodeId(state.currentNodeId, feed);
  const dynamicSeedState = state.dynamicEntry || { flags: state.flags, items: state.items };
  const current = coreMap.get(resolvedCurrentId) || buildDynamicNode(resolvedCurrentId, feed, dynamicSeedState);
  const route = getDominantRoute(state.stats);
  const routeText = current?.routeText?.[route] || current?.routeText?.balanced || "你的過往選擇正在改變這個節點。";
  const memoryEcho = current?.echoes
    ? Object.entries(current.echoes).find(([key]) => state.flags.includes(key) || state.items.includes(key))?.[1]
    : current?.stateEcho || null;
  const isWaiting = ready && !current;

  const choose = (choiceData, choiceIndex) => {
    if (state.result) return;
    const nextStats = { ...state.stats };
    Object.entries(choiceData.effects || {}).forEach(([key, value]) => {
      nextStats[key] = (nextStats[key] || 0) + value;
    });
    const hasNewFlag = Boolean(choiceData.flag && !state.flags.includes(choiceData.flag));
    const hasNewItem = Boolean(choiceData.item && !state.items.includes(choiceData.item));
    const nextFlags = choiceData.flag ? [...new Set([...state.flags, choiceData.flag])].slice(-20) : state.flags;
    const nextItems = choiceData.item ? [...new Set([...state.items, choiceData.item])].slice(-16) : state.items;

    setState(compactState({
      ...state,
      stats: nextStats,
      flags: nextFlags,
      items: nextItems,
      flagCount: state.flagCount + (hasNewFlag ? 1 : 0),
      itemCount: state.itemCount + (hasNewItem ? 1 : 0),
      choices: `${state.choices}${choiceIndex}`,
      result: {
        text: resolveChoiceResult(choiceData, state),
        next: choiceData.next,
      },
    }));
  };

  const advance = () => {
    if (!state.result?.next) return;
    let nextId = state.result.next;
    let dynamicEntry = state.dynamicEntry;

    if (nextId.startsWith(LIVE_PREFIX)) {
      nextId = makeDynamicEntryId(nextId.slice(LIVE_PREFIX.length), feed);
      dynamicEntry = { flags: state.flags, items: state.items };
    }

    setState((currentState) => compactState({
      ...currentState,
      currentNodeId: nextId,
      history: [...currentState.history, nextId],
      result: null,
      dynamicEntry,
    }));
  };

  const restart = () => {
    const nextLoops = loops + 1;
    writeCookie(LOOP_COOKIE, String(nextLoops));
    setLoops(nextLoops);
    setState(createInitialState());
    setShowRestart(false);
    setToast(nextLoops === 3
      ? "彩蛋：第三次重來後，鐘塔開始保留你前兩輪留下的實體刮痕。"
      : "故事樹已回到根節點。選擇不同道路後，人物、空間與未解事件都會重新分流。" );
  };

  const investigateMoon = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next === 7) {
      setToast("隱藏彩蛋：獲得『月背鑰匙』；後續節點會記得你確實把它帶在身上。");
      setState((currentState) => compactState({ ...currentState, items: [...new Set([...currentState.items, "月背鑰匙"])] }));
    }
  };

  if (!ready) return <main className="loading-screen"><div className="loader" /><p>正在讀取延遲展開故事樹…</p></main>;

  return (
    <main className="game-shell">
      <div className="noise" />
      <header className="topbar">
        <div>
          <span className="eyebrow">AUTO RPG / LAZY BRANCHING WORLD</span>
          <h1>零時迴圈</h1>
        </div>
        <div className="header-actions">
          <button className="ghost-button" onClick={() => setShowArchive(true)}>路徑紀錄</button>
          <button className="danger-button" onClick={() => setShowRestart(true)}>重新開始</button>
        </div>
      </header>

      <section className="progress-wrap" aria-label="故事路徑深度">
        <div className="progress-meta">
          <span>已走過 {Math.max(0, state.history.length - 1)} 個近期節點 · 選擇總數 {state.choices.length}</span>
          <span>每個節點各有 3 個子節點 · 不限制全域分支數</span>
        </div>
        <div className="progress-track"><span style={{ width: `${Math.min(100, (state.choices.length / Math.max(feed.epochs.length, 1)) * 100)}%` }} /></div>
      </section>

      {isWaiting ? (
        <section className="waiting-card">
          <div className="waiting-orbit"><span /></div>
          <span className="eyebrow">NEXT WORLD EPOCH REQUIRED</span>
          <h2>這條路徑已走到目前可生成的最深層</h2>
          <p>目前節點是「{state.currentNodeId}」。排程每小時新增一份世界素材層；新增後，所有已存在的父路徑都能各自生成三個連續子節點，而不是全站只得到三個共同故事。</p>
          <button className="primary-button" onClick={() => location.reload()}>檢查新的世界層</button>
        </section>
      ) : current ? (
        <div className="game-grid">
          <section className="story-panel">
            <ProceduralArt scene={current.scene} accent={current.accent} seed={current.id} secretClicks={secretClicks} onSecret={investigateMoon} />
            <article className="story-card">
              <div className="chapter-line">
                <span>{current.ending ? "路線結局" : current.dynamic ? "延遲生成節點" : "核心故事節點"}</span>
                <span>{current.endingCode || routeLabel(route)}</span>
              </div>
              <h2>{current.title}</h2>
              <p className="subtitle">{current.subtitle}</p>
              <p className="story-copy">{current.intro}</p>

              {current.continuityNote && <div className="route-note continuity-note"><span>空間連續性</span><p>{current.continuityNote}</p></div>}
              {!current.ending && <div className="route-note"><span>路線反應</span><p>{routeText}</p></div>}
              {memoryEcho && <div className="route-note"><span>持續狀態</span><p>{memoryEcho}</p></div>}

              {current.ending ? (
                <div className="result-card">
                  <span className="eyebrow">ENDING RECORDED IN COOKIE</span>
                  <h3>{current.endingCode}</h3>
                  <p>這個結局繼承最後所在位置、同行者與未解事件，不會把角色突然傳送到不相干的場景。</p>
                  <button className="primary-button" onClick={() => setShowRestart(true)}>探索其他路徑 <span>↻</span></button>
                </div>
              ) : !state.result ? (
                <div className="choices" aria-label="選擇下一個故事節點">
                  {current.choices.map((choiceData, index) => (
                    <button className="choice-card" key={`${current.id}-${index}`} onClick={() => choose(choiceData, index)}>
                      <span className="choice-index">0{index + 1}</span>
                      <span className="choice-icon">{choiceData.icon}</span>
                      <span className="choice-label">{choiceData.label}</span>
                      <span className="choice-arrow">→</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="result-card">
                  <span className="eyebrow">BRANCH SELECTED / COOKIE SAVED</span>
                  <h3>這個選擇建立了自己的子節點</h3>
                  <p>{state.result.text}</p>
                  <button className="primary-button" onClick={advance}>沿實際路徑前進 <span>→</span></button>
                </div>
              )}
            </article>
          </section>

          <aside className="status-panel">
            <div className="status-card identity-card">
              <span className="eyebrow">PLAYER</span>
              <div className="avatar">Z<span>{loops > 0 ? loops : ""}</span></div>
              <h3>{routeLabel(route)}</h3>
              <p>重啟：{loops} · 選擇：{state.choices.length}</p>
            </div>
            <div className="status-card">
              <div className="status-heading"><h3>精神傾向</h3><span>影響每個子節點</span></div>
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
              <div><strong>世界素材持續更新</strong><p>每小時新增一層素材；所有路徑各自長出三個連貫子節點。</p></div>
            </div>
          </aside>
        </div>
      ) : null}

      <footer>
        <span>存檔：Browser Cookie · 節點：{state.currentNodeId}</span>
        <span>核心 {CORE_NODES.length} 節點 · 世界素材層 {feed.epochs.length}</span>
      </footer>

      {showRestart && (
        <div className="modal-backdrop" onClick={() => setShowRestart(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <span className="eyebrow">RESET THE STORY TREE</span><h2>回到根節點？</h2>
            <p>目前路徑、能力與物品會清空。重啟次數會保留，部分彩蛋與核心世界痕跡會因此改變。</p>
            <div className="modal-actions"><button className="ghost-button" onClick={() => setShowRestart(false)}>取消</button><button className="danger-button solid" onClick={restart}>重新選擇第一條路</button></div>
          </div>
        </div>
      )}

      {showArchive && (
        <div className="modal-backdrop" onClick={() => setShowArchive(false)}>
          <div className="modal archive-modal" onClick={(event) => event.stopPropagation()}>
            <span className="eyebrow">BRANCH HISTORY</span><h2>近期路徑紀錄</h2>
            <p>選擇碼：{state.choices || "尚未選擇"}</p>
            <div className="archive-grid"><div><strong>{state.flagCount || state.flags.length}</strong><span>分支旗標</span></div><div><strong>{state.itemCount || state.items.length}</strong><span>特殊物品</span></div><div><strong>{state.choices.length}</strong><span>總選擇數</span></div></div>
            <div className="flag-list">
              {state.history.map((nodeId, index) => {
                const migratedId = migrateLiveNodeId(nodeId, feed);
                const label = coreMap.get(migratedId)?.title || buildDynamicNode(migratedId, feed, dynamicSeedState)?.title || nodeId;
                return <code key={`${nodeId}-${index}`}>{index + 1}. {label}</code>;
              })}
            </div>
            <button className="primary-button" onClick={() => setShowArchive(false)}>回到目前分支</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
