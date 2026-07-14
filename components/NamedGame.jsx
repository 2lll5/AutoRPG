"use client";

import { useEffect, useRef, useState } from "react";
import Game from "./Game";

const NAME_COOKIE = "autorpg_player_name";
const MAX_NAME_LENGTH = 16;

function readCookie(name) {
  if (typeof document === "undefined") return "";
  const hit = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : "";
}

function writeCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function normalizeName(value) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LENGTH);
}

function replacePlayerToken(text, playerName) {
  if (!text || !playerName || !text.includes("Z")) return text;

  return text
    .replace(/\{\{player\}\}/g, playerName)
    .replace(/(^|[\s「『（(：:，,。.!！？?、])Z(?=$|[\s」』）)：:，,。.!！？?、的])/g, `$1${playerName}`);
}

function personalizeRenderedStory(root, playerName) {
  if (!root || !playerName || typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node = walker.nextNode();

  while (node) {
    if (!node.parentElement?.closest("script, style, input, textarea")) nodes.push(node);
    node = walker.nextNode();
  }

  for (const textNode of nodes) {
    const nextText = replacePlayerToken(textNode.nodeValue, playerName);
    if (nextText !== textNode.nodeValue) textNode.nodeValue = nextText;
  }

  root.querySelectorAll(".avatar").forEach((avatar) => {
    const textNode = [...avatar.childNodes].find((child) => child.nodeType === Node.TEXT_NODE);
    if (textNode && textNode.nodeValue !== playerName) textNode.nodeValue = playerName;
    avatar.setAttribute("aria-label", `冒險者 ${playerName}`);
  });
}

function NameForm({ initialValue = "", onSave, onCancel }) {
  const [draft, setDraft] = useState(initialValue);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const nextName = normalizeName(draft);
    if (!nextName) {
      setError("請輸入冒險者名稱。");
      return;
    }
    onSave(nextName);
  };

  return (
    <div className="name-gate" role="dialog" aria-modal="true" aria-labelledby="name-title">
      <form className="name-card" onSubmit={submit}>
        <span className="name-eyebrow">CREATE YOUR ADVENTURER</span>
        <h1 id="name-title">為你的冒險者命名</h1>
        <p>這個名字會出現在角色卡與劇情中，並保存於瀏覽器 Cookie。重新開始故事不會清除名稱。</p>
        <label htmlFor="player-name">冒險者名稱</label>
        <input
          id="player-name"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value.slice(0, MAX_NAME_LENGTH));
            setError("");
          }}
          maxLength={MAX_NAME_LENGTH}
          autoComplete="nickname"
          autoFocus
          placeholder="例如：凱恩、艾莉亞、Z"
        />
        <div className="name-counter">{draft.length}/{MAX_NAME_LENGTH}</div>
        {error && <p className="name-error">{error}</p>}
        <div className="name-actions">
          {onCancel && <button type="button" className="name-secondary" onClick={onCancel}>取消</button>}
          <button type="submit" className="name-primary">踏入艾瑟蘭</button>
        </div>
      </form>
    </div>
  );
}

export default function NamedGame() {
  const [ready, setReady] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [editing, setEditing] = useState(false);
  const gameRoot = useRef(null);

  useEffect(() => {
    const savedName = normalizeName(readCookie(NAME_COOKIE));
    setPlayerName(savedName);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !playerName || !gameRoot.current) return undefined;

    const root = gameRoot.current;
    personalizeRenderedStory(root, playerName);

    const observer = new MutationObserver(() => {
      personalizeRenderedStory(root, playerName);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [ready, playerName]);

  const saveName = (nextName) => {
    writeCookie(NAME_COOKIE, nextName);
    if (playerName) {
      window.location.reload();
      return;
    }
    setPlayerName(nextName);
    setEditing(false);
  };

  if (!ready) return null;

  if (!playerName) {
    return (
      <>
        <NameForm onSave={saveName} />
        <NameStyles />
      </>
    );
  }

  return (
    <>
      <div className="named-game-root">
        <div className="player-name-chip" aria-label={`目前冒險者名稱：${playerName}`}>
          <span>冒險者</span>
          <strong>{playerName}</strong>
          <button type="button" onClick={() => setEditing(true)}>改名</button>
        </div>
        <div ref={gameRoot}><Game /></div>
      </div>
      {editing && (
        <NameForm
          initialValue={playerName}
          onSave={saveName}
          onCancel={() => setEditing(false)}
        />
      )}
      <NameStyles />
    </>
  );
}

function NameStyles() {
  return (
    <style>{`
      .name-gate {
        position: fixed;
        z-index: 1000;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 20px;
        color: #f8efd9;
        background:
          radial-gradient(circle at 20% 0, rgba(112, 65, 93, .5), transparent 38%),
          radial-gradient(circle at 88% 24%, rgba(39, 103, 86, .34), transparent 36%),
          rgba(9, 7, 6, .96);
        backdrop-filter: blur(14px);
      }
      .name-card {
        width: min(580px, 100%);
        padding: clamp(28px, 6vw, 54px);
        border: 1px solid rgba(244, 218, 163, .24);
        border-radius: 7px 28px 7px 28px;
        background: linear-gradient(160deg, rgba(48, 34, 25, .98), rgba(18, 14, 12, .99));
        box-shadow: 0 34px 110px rgba(0, 0, 0, .58);
      }
      .name-eyebrow {
        color: #8fd9c4;
        font: 800 10px/1.4 ui-sans-serif, system-ui, sans-serif;
        letter-spacing: .22em;
      }
      .name-card h1 {
        margin: 12px 0 10px;
        color: #fff1cf;
        font: 700 clamp(34px, 7vw, 58px)/1.05 Georgia, "Noto Serif TC", serif;
        letter-spacing: -.04em;
      }
      .name-card p {
        margin: 0 0 24px;
        color: #cfc1a6;
        line-height: 1.8;
      }
      .name-card label {
        display: block;
        margin-bottom: 9px;
        color: #e4d4b5;
        font: 750 12px/1.4 ui-sans-serif, system-ui, sans-serif;
      }
      .name-card input {
        width: 100%;
        padding: 15px 16px;
        border: 1px solid rgba(143, 217, 196, .42);
        border-radius: 5px 15px 5px 15px;
        outline: none;
        color: #fff7e6;
        background: rgba(255, 255, 255, .055);
        font: 700 20px/1.4 Georgia, "Noto Serif TC", serif;
      }
      .name-card input:focus {
        border-color: #8fd9c4;
        box-shadow: 0 0 0 3px rgba(143, 217, 196, .12);
      }
      .name-counter {
        margin-top: 7px;
        text-align: right;
        color: #897d69;
        font: 700 10px/1.4 ui-sans-serif, system-ui, sans-serif;
      }
      .name-error {
        margin: 10px 0 0 !important;
        color: #f0aaa1 !important;
        font-size: 12px;
      }
      .name-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 25px;
      }
      .name-primary, .name-secondary {
        padding: 12px 18px;
        border-radius: 4px 14px 4px 14px;
        cursor: pointer;
        font: 800 13px/1.4 ui-sans-serif, system-ui, sans-serif;
      }
      .name-primary {
        border: 0;
        color: #20160f;
        background: linear-gradient(90deg, #d6a85f, #a8d4b9);
      }
      .name-secondary {
        border: 1px solid rgba(244, 218, 163, .2);
        color: #f8efd9;
        background: rgba(255, 255, 255, .05);
      }
      .player-name-chip {
        position: fixed;
        z-index: 8;
        top: 18px;
        left: 50%;
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 8px 10px 8px 13px;
        border: 1px solid rgba(244, 218, 163, .2);
        border-radius: 999px;
        color: #f8efd9;
        background: rgba(24, 17, 14, .9);
        box-shadow: 0 10px 32px rgba(0, 0, 0, .3);
        backdrop-filter: blur(14px);
        transform: translateX(-50%);
      }
      .player-name-chip span {
        color: #8fd9c4;
        font: 800 9px/1 ui-sans-serif, system-ui, sans-serif;
        letter-spacing: .14em;
      }
      .player-name-chip strong {
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff1cf;
        font-size: 13px;
      }
      .player-name-chip button {
        padding: 4px 7px;
        border: 0;
        border-radius: 999px;
        cursor: pointer;
        color: #cfc1a6;
        background: rgba(255, 255, 255, .08);
        font-size: 10px;
      }
      .named-game-root .avatar {
        width: auto;
        min-width: 76px;
        max-width: 210px;
        padding: 0 18px;
        overflow: visible;
        white-space: nowrap;
        font-size: clamp(18px, 2vw, 29px);
      }
      @media (max-width: 700px) {
        .player-name-chip { top: 8px; }
        .name-actions { flex-direction: column-reverse; }
        .name-primary, .name-secondary { width: 100%; }
      }
    `}</style>
  );
}
