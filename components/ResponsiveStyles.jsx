export default function ResponsiveStyles() {
  return (
    <style>{`
      /* Responsive shell: kept outside the restored story bundle so deployments retain it. */
      html,
      body {
        width: 100%;
        max-width: 100%;
        overflow-x: clip;
      }

      body,
      button,
      input {
        -webkit-tap-highlight-color: transparent;
      }

      button,
      input {
        touch-action: manipulation;
      }

      .named-game-root,
      .named-game-root > div,
      .game-shell,
      .game-grid,
      .story-panel,
      .story-card,
      .status-panel,
      .status-card,
      .topbar,
      .progress-wrap,
      footer {
        min-width: 0;
        max-width: 100%;
      }

      .story-copy,
      .subtitle,
      .route-note p,
      .result-card p,
      .choice-label,
      .status-card,
      .modal p,
      footer,
      code {
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .scene-art {
        height: auto;
        aspect-ratio: 5 / 3;
      }

      .choice-card,
      .ghost-button,
      .danger-button,
      .primary-button,
      .player-name-chip button,
      .name-primary,
      .name-secondary {
        min-height: 44px;
      }

      :is(button, input):focus-visible {
        outline: 3px solid rgba(143, 217, 196, .68);
        outline-offset: 3px;
      }

      .modal-backdrop,
      .name-gate {
        overscroll-behavior: contain;
      }

      .modal {
        max-height: min(86dvh, 820px);
        overflow-y: auto;
      }

      .archive-modal .flag-list {
        max-height: min(34dvh, 300px);
      }

      @media (min-width: 1480px) {
        .game-grid {
          grid-template-columns: minmax(0, 1fr) 330px;
          gap: 28px;
        }

        .story-copy {
          max-width: 78ch;
        }
      }

      @media (min-width: 1181px) and (max-width: 1479px) {
        .game-grid {
          grid-template-columns: minmax(0, 1fr) minmax(280px, 305px);
        }
      }

      /* Narrow desktop and tablets */
      @media (max-width: 1180px) {
        .game-shell {
          padding-inline: clamp(18px, 3.4vw, 38px);
        }

        .game-grid {
          grid-template-columns: minmax(0, 1fr);
        }

        .status-panel {
          position: static;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
        }

        .status-card {
          height: 100%;
        }

        .identity-card {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          grid-template-rows: auto auto auto;
          column-gap: 18px;
          align-items: center;
          text-align: left;
        }

        .identity-card .eyebrow {
          grid-column: 1 / -1;
        }

        .identity-card .avatar {
          grid-row: 2 / 4;
          margin: 12px 0 0;
        }

        .identity-card h3 {
          align-self: end;
        }

        .identity-card p {
          align-self: start;
        }
      }

      @media (max-width: 900px) {
        .topbar {
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .topbar > div:first-child {
          flex: 1 1 420px;
          min-width: 0;
        }

        .header-actions {
          flex: 0 1 auto;
        }

        .progress-meta {
          align-items: flex-start;
          gap: 8px 20px;
          flex-wrap: wrap;
        }

        .progress-meta span {
          flex: 1 1 280px;
        }

        .story-card h2 {
          text-wrap: balance;
        }
      }

      /* Phones */
      @media (max-width: 767px) {
        .named-game-root {
          width: 100%;
        }

        .player-name-chip {
          position: sticky;
          top: max(8px, env(safe-area-inset-top));
          left: auto;
          width: fit-content;
          max-width: calc(100vw - 24px);
          margin: 8px auto -46px;
          transform: none;
        }

        .player-name-chip strong {
          max-width: min(48vw, 190px);
        }

        .named-game-root .game-shell {
          padding:
            68px
            max(14px, env(safe-area-inset-right))
            max(24px, env(safe-area-inset-bottom))
            max(14px, env(safe-area-inset-left));
        }

        .topbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 18px;
        }

        .topbar h1 {
          font-size: clamp(40px, 13vw, 58px);
          line-height: .95;
        }

        .eyebrow {
          letter-spacing: .16em;
        }

        .header-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          width: 100%;
          gap: 10px;
        }

        .header-actions button {
          width: 100%;
          padding-inline: 10px;
        }

        .progress-wrap {
          margin-top: 22px;
        }

        .progress-meta {
          display: block;
          font-size: 11px;
          line-height: 1.55;
        }

        .progress-meta span {
          display: block;
        }

        .progress-meta span + span {
          margin-top: 4px;
        }

        .game-grid {
          gap: 16px;
          margin-top: 18px;
        }

        .art-button {
          border-radius: 18px 18px 0 0;
        }

        .scene-art {
          width: 100%;
          height: auto;
          min-width: 0;
          max-height: none;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }

        .art-hint {
          right: 10px;
          bottom: 10px;
          max-width: calc(100% - 20px);
          white-space: normal;
          text-align: right;
          opacity: .92;
        }

        .story-card {
          padding: clamp(20px, 6vw, 28px) clamp(16px, 5vw, 22px);
          border-radius: 0 0 18px 18px;
        }

        .chapter-line {
          align-items: flex-start;
          gap: 10px;
          line-height: 1.45;
        }

        .chapter-line span:last-child {
          text-align: right;
        }

        .story-card h2 {
          margin-top: 12px;
          font-size: clamp(28px, 9vw, 40px);
        }

        .subtitle {
          margin-bottom: 20px;
          line-height: 1.65;
        }

        .story-copy {
          font-size: clamp(16px, 4.5vw, 18px);
          line-height: 1.9;
        }

        .route-note {
          margin: 18px 0;
          padding: 15px 14px;
        }

        .choices {
          gap: 10px;
        }

        .choice-card {
          grid-template-columns: 30px 40px minmax(0, 1fr) 18px;
          gap: 8px;
          padding: 14px 11px;
          border-radius: 5px 14px 5px 14px;
        }

        .choice-card:hover {
          transform: none;
        }

        .choice-icon {
          width: 36px;
          height: 36px;
        }

        .choice-label {
          font-size: 14px;
          line-height: 1.55;
        }

        .result-card {
          padding: 20px 16px;
        }

        .result-card h3 {
          font-size: clamp(23px, 7vw, 29px);
        }

        .result-card .primary-button,
        .waiting-card .primary-button,
        .archive-modal > .primary-button {
          width: 100%;
        }

        .status-panel {
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
        }

        .status-card {
          padding: 16px;
        }

        .identity-card {
          grid-template-columns: auto minmax(0, 1fr);
          column-gap: 14px;
        }

        .named-game-root .avatar {
          min-width: 66px;
          max-width: min(42vw, 180px);
          min-height: 66px;
          padding-inline: 12px;
          font-size: clamp(16px, 5vw, 23px);
        }

        .stat-row {
          grid-template-columns: minmax(76px, auto) minmax(0, 1fr) 24px;
        }

        footer {
          gap: 6px;
          padding-top: 20px;
          line-height: 1.55;
        }

        .waiting-card {
          width: 100%;
          margin-top: 26px;
          padding: 42px 18px;
          border-radius: 5px 19px 5px 19px;
        }

        .modal-backdrop {
          align-items: end;
          padding:
            16px
            max(12px, env(safe-area-inset-right))
            max(12px, env(safe-area-inset-bottom))
            max(12px, env(safe-area-inset-left));
          overflow-y: auto;
        }

        .modal {
          width: 100%;
          max-height: min(88dvh, 760px);
          padding: 23px 18px;
          border-radius: 18px 18px 5px 5px;
        }

        .modal-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .modal-actions button {
          width: 100%;
          padding-inline: 8px;
        }

        .archive-grid {
          gap: 6px;
        }

        .archive-grid div {
          padding-inline: 4px;
        }

        .archive-grid strong {
          font-size: 21px;
        }

        .name-gate {
          min-height: 100dvh;
          place-items: start center;
          padding:
            max(18px, env(safe-area-inset-top))
            max(14px, env(safe-area-inset-right))
            max(18px, env(safe-area-inset-bottom))
            max(14px, env(safe-area-inset-left));
          overflow-y: auto;
        }

        .name-card {
          width: 100%;
          max-height: none;
          margin: auto 0;
          padding: clamp(24px, 7vw, 34px) clamp(18px, 6vw, 28px);
          border-radius: 6px 22px 6px 22px;
        }

        .name-card h1 {
          font-size: clamp(34px, 11vw, 48px);
        }

        .name-card p {
          margin-bottom: 20px;
          font-size: 14px;
        }

        .name-card input {
          min-height: 50px;
          font-size: 16px;
        }

        .name-actions {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          margin-top: 20px;
        }

        .name-primary,
        .name-secondary {
          width: 100%;
          min-height: 48px;
        }
      }

      /* Small phones: 320–430 px */
      @media (max-width: 430px) {
        .player-name-chip {
          width: calc(100vw - 20px);
          justify-content: center;
          gap: 7px;
          padding-inline: 9px;
        }

        .player-name-chip span {
          display: none;
        }

        .player-name-chip strong {
          max-width: calc(100vw - 105px);
        }

        .topbar h1 {
          font-size: clamp(38px, 14vw, 50px);
        }

        .header-actions {
          gap: 7px;
        }

        .header-actions button {
          min-height: 46px;
          font-size: 12px;
        }

        .chapter-line {
          font-size: 9px;
          letter-spacing: .08em;
        }

        .choice-card {
          grid-template-columns: 24px 34px minmax(0, 1fr) 15px;
          gap: 7px;
          padding-inline: 9px;
        }

        .choice-index {
          font-size: 9px;
        }

        .choice-icon {
          width: 32px;
          height: 32px;
          font-size: 16px;
        }

        .choice-label {
          font-size: 13px;
        }

        .identity-card {
          grid-template-columns: minmax(62px, auto) minmax(0, 1fr);
        }

        .archive-grid span {
          font-size: 9px;
        }

        .toast {
          bottom: max(12px, env(safe-area-inset-bottom));
          padding: 12px;
          font-size: 13px;
        }
      }

      /* Short landscape phones and software-keyboard layouts */
      @media (max-height: 520px) and (orientation: landscape) {
        .name-gate {
          display: block;
        }

        .name-card {
          width: min(720px, 100%);
          margin: 0 auto;
          padding: 20px 26px;
        }

        .name-card h1 {
          font-size: 34px;
        }

        .name-card p {
          margin-bottom: 12px;
        }

        .name-actions {
          margin-top: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .player-name-chip {
          position: absolute;
        }
      }

      @media (hover: none), (pointer: coarse) {
        .choice-card:hover,
        .ghost-button:hover,
        .danger-button:hover,
        .primary-button:hover {
          transform: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .player-name-chip,
        .choice-card,
        .modal,
        .name-card {
          scroll-behavior: auto;
        }
      }
    `}</style>
  );
}
