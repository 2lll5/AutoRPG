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

const COOKIE_NAME = "autorpg_state_v2";
const LEGACY_COOKIE_NAME = "autorpg_state";
const LOOP_COOKIE = "autorpg_loops";
const LIVE_PREFIX = "$live:";

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

function ProceduralArt({ scene, accent, seed, secretClicks, onSecret }) {
  const points = useMemo(() => {
    let n = [...String(seed)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Array.from({ length: 28 }, (_, index) => {
      n = (n * 9301 + 49297 + index) % 233280;
      const x = 3 + (n / 233280) * 94;
      n = (n * 9301 + 49297 + index * 2) % 233280;
      const y = 4 + (n / 233280) * 60;
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

function normalizeGenerated(data) {
  if (!data || !Array.isArray(data.nodes)) return { nodes: [], entrypoints: {}, finalized: false };
  return {
    nodes: data.nodes,
    entrypoints: data.entrypoints || {},
    finalized: Boolean(data.finalized),
  };
}

export default function Game() {
  const [generated, setGenerated] = useState({ nodes: [], entrypoints: {}, finalized: false });
  const [state, setState] = useState(createInitialState);
  const [ready, setReady] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [toast, setToast] = useState("");
  const [secretClicks, setSecretClicks] = useState(0);
  const [loops, setLoops] = useState(0);

  useEffect(() => {
    const saved = decodeState(readCookie(COOKIE_NAME) || "");
    const legacy = decodeState(readCookie(LEGACY_COOKIE_NAME) || "");
    const loopValue = Number(readCookie(LOOP_COOKIE) || 0);

    if (saved?.currentNodeId && saved?.stats) {
      setState({ ...createInitialState(), ...saved });
    } else if (legacy?.stats) {
      setToast("故事已升級為真正的樹狀結構；舊線性存檔已保留為重啟紀錄，旅程從根節點重新開始。");
    }

    setLoops(loopValue);
    fetch(`https://raw.githubusercontent.com/2lll5/AutoRPG/main/public/story.generated.json?t=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setGenerated(normalizeGenerated(data)))
      .catch(() => setGenerated({ nodes: [], entrypoints: {}, finalized: false }))
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
        setToast("彩蛋解鎖：勇者密碼讓你取得一枚不被故事樹記錄的空白硬幣。");
        setState((current) => ({ ...current, items: [...new Set([...current.items, "勇者密碼硬幣"])] }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4200);
    return () => clearTimeout(timer);
  }, [toast]);

  const allNodes = useMemo(() => [...CORE_NODES, ...generated.nodes], [generated.nodes]);
  const nodeMap = useMemo(() => new Map(allNodes.map((node) => [node.id, node])), [allNodes]);

  const resolveNodeId = (nodeId) => {
    if (!nodeId?.startsWith(LIVE_PREFIX)) return nodeId;
    return generated.entrypoints[nodeId.slice(LIVE_PREFIX.length)] || nodeId;
  };

  const resolvedCurrentId = resolveNodeId(state.currentNodeId);
  const current = nodeMap.get(resolvedCurrentId);
  const route = getDominantRoute(state.stats);
  const routeText = current?.routeText?.[route] || current?.routeText?.balanced || "你的過往選擇正在改變這個節點。";
  const memoryEcho = current?.echoes
    ? Object.entries(current.echoes).find(([key]) => state.flags.includes(key) || state.items.includes(key))?.[1]
    : null;
  const isWaiting = ready && !current;

  const choose = (choiceData, choiceIndex) => {
    if (state.result) return;
    const nextStats = { ...state.stats };
    Object.entries(choiceData.effects || {}).forEach(([key, value]) => {
      nextStats[key] = (nextStats[key] || 0) + value;
    });
    const hasNewFlag = Boolean(choiceData.flag && !state.flags.includes(choiceData.flag));
    const hasNewItem = Boolean(choiceData.item && !state.items.includes(choiceData.item));
    const nextFlags = choiceData.flag ? [...new Set([...state.flags, choiceData.flag])].slice(-48) : state.flags;
    const nextItems = choiceData.item ? [...new Set([...state.items, choiceData.item])].slice(-32) : state.items;

    setState({
      ...state,
      stats: nextStats,
      flags: nextFlags,
      items: nextItems,
      flagCount: state.flagCount + (hasNewFlag ? 1 : 0),
      itemCount: state.itemCount + (hasNewItem ? 1 : 0),
      choices: `${state.choices}${choiceIndex}`.slice(-80),
      result: {
        text: resolveChoiceResult(choiceData, state),
        next: choiceData.next,
      },
    });
  };

  const advance = () => {
    if (!state.result?.next) return;
    const nextId = state.result.next;
    setState((currentState) => ({
      ...currentState,
      currentNodeId: nextId,
      history: [...currentState.history, nextId].slice(-48),
      result: null,
    }));
  };

  const restart = () => {
    const nextLoops = loops + 1;
    writeCookie(LOOP_COOKIE, String(nextLoops));
    setLoops(nextLoops);
    setState(createInitialState());
    setShowRestart(false);
    setToast(nextLoops === 3 ? "彩蛋：第三次重來後，根節點多了一道只有鐘塔記得的裂縫。" : "故事樹已回到根節點；這次選另一條路，第二幕就會完全不同。" );
  };

  const investigateMoon = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next === 7) {
      setToast("隱藏彩蛋：月亮其實是沒有連線的第七扇門。獲得「月背鑰匙」。");
      setState((currentState) => ({ ...currentState, items: [...new Set([...currentState.items, "月背鑰匙"])] }));
    }
  };

  if (!ready) return <main className="loading-screen"><div className="loader" /><p>正在讀取故事樹…</p></main>;

  return (
    <main className="game-shell">
      <div className="noise" />
      <header className="topbar">
        <div>
          <span className="eyebrow">AUTO RPG / BRANCHING STORY GRAPH</span>
          <h1>零時迴圈</h1>
        </div>
        <div className="header-actions">
          <button className="ghost-button" onClick={() => setShowArchive(true)}>路徑紀錄</button>
          <button className="danger-button" onClick={() => setShowRestart(true)}>重新開始</button>
        </div>
      </header>

      <section className="progress-wrap" aria-label="故事路徑深度">
        <div className="progress-meta">
          <span>已走過 {Math.max(0, state.history.length - 1)} 個故事節點</span>
          <span>樹狀分支 · 可交織 · 多重結局</span>
        </div>
        <div className="progress-track"><span style={{ width: `${Math.min(100, (state.history.length / 12) * 100)}%` }} /></div>
      </section>

      {isWaiting ? (
        <section className="waiting-card">
          <div className="waiting-orbit"><span /></div>
          <span className="eyebrow">UNWRITTEN BRANCH</span>
          <h2>你抵達了一個尚未生成的分支</h2>
          <p>目前路徑已指向「{state.currentNodeId}」。GitHub Actions 每小時會同時新增三個不同節點；更新後重新整理即可沿原路繼續，不會被送回共同的下一幕。</p>
          <button className="primary-button" onClick={() => location.reload()}>檢查新分支</button>
        </section>
      ) : current ? (
        <div className="game-grid">
          <section className="story-panel">
            <ProceduralArt scene={current.scene} accent={current.accent} seed={current.id} secretClicks={secretClicks} onSecret={investigateMoon} />
            <article className="story-card">
              <div className="chapter-line">
                <span>{current.ending ? "路線結局" : current.releaseAt ? "整點生成節點" : "故事樹節點"}</span>
                <span>{current.endingCode || routeLabel(route)}</span>
              </div>
              <h2>{current.title}</h2>
              <p className="subtitle">{current.subtitle}</p>
              <p className="story-copy">{current.intro}</p>

              {!current.ending && <div className="route-note"><span>路線反應</span><p>{routeText}</p></div>}
              {memoryEcho && <div className="route-note"><span>過往回聲</span><p>{memoryEcho}</p></div>}

              {current.ending ? (
                <div className="result-card">
                  <span className="eyebrow">ENDING RECORDED IN COOKIE</span>
                  <h3>{current.endingCode}</h3>
                  <p>這是目前選擇路徑的結局。其他分支不會經過這裡；重新開始後選擇不同根節點，會進入另一套故事。</p>
                  <button className="primary-button" onClick={() => setShowRestart(true)}>探索其他結局 <span>↻</span></button>
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
                  <h3>這個選擇已改變故事路徑</h3>
                  <p>{state.result.text}</p>
                  <button className="primary-button" onClick={advance}>進入對應分支 <span>→</span></button>
                </div>
              )}
            </article>
          </section>

          <aside className="status-panel">
            <div className="status-card identity-card">
              <span className="eyebrow">PLAYER</span>
              <div className="avatar">Z<span>{loops > 0 ? loops : ""}</span></div>
              <h3>{routeLabel(route)}</h3>
              <p>重啟：{loops} · 路徑深度：{state.history.length}</p>
            </div>
            <div className="status-card">
              <div className="status-heading"><h3>精神傾向</h3><span>影響交會節點</span></div>
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
              <div><strong>故事樹仍在生長</strong><p>每小時新增三個不同節點，舊路線可在後方交織。</p></div>
            </div>
          </aside>
        </div>
      ) : null}

      <footer>
        <span>存檔：Browser Cookie · 節點：{state.currentNodeId}</span>
        <span>核心 {CORE_NODES.length} 節點 · LIVE +{generated.nodes.length}</span>
      </footer>

      {showRestart && (
        <div className="modal-backdrop" onClick={() => setShowRestart(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <span className="eyebrow">RESET THE STORY TREE</span><h2>回到根節點？</h2>
            <p>目前路徑、能力與物品會清空。重啟次數會保留，部分彩蛋會因此改變。</p>
            <div className="modal-actions"><button className="ghost-button" onClick={() => setShowRestart(false)}>取消</button><button className="danger-button solid" onClick={restart}>重新選擇第一條路</button></div>
          </div>
        </div>
      )}

      {showArchive && (
        <div className="modal-backdrop" onClick={() => setShowArchive(false)}>
          <div className="modal archive-modal" onClick={(event) => event.stopPropagation()}>
            <span className="eyebrow">BRANCH HISTORY</span><h2>路徑紀錄</h2>
            <p>選擇序列：{state.choices || "尚未選擇"}</p>
            <div className="archive-grid"><div><strong>{state.flagCount || state.flags.length}</strong><span>分支旗標</span></div><div><strong>{state.itemCount || state.items.length}</strong><span>特殊物品</span></div><div><strong>{state.history.length}</strong><span>經過節點</span></div></div>
            <div className="flag-list">
              {state.history.map((nodeId, index) => {
                const resolvedId = resolveNodeId(nodeId);
                const label = nodeMap.get(resolvedId)?.title || nodeId;
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
