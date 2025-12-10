import { EditorView } from "@codemirror/view";
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

import type { Extension } from "@codemirror/state";

/**
 * Оформление редактора (фон, курсор, гаттеры, выделение и т.д.)
 */
export const evaCmTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "var(--color-eva-bg)",
      color: "var(--color-eva-text)",
      fontFamily: '"JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
      height: "100%",
    },

    ".cm-content": {
      backgroundColor: "var(--color-eva-bg)",
      caretColor: "var(--color-eva-accent)",
    },

    ".cm-cursor": {
      borderLeftColor: "var(--color-eva-accent)",
    },

    ".cm-selectionBackground, ::selection": {
      backgroundColor: "var(--color-eva-accent2)",
      opacity: 0.2,
    },

    ".cm-gutters": {
      backgroundColor: "var(--color-eva-bg)",
      color: "var(--color-eva-text-muted)",
      borderRight: "1px solid var(--color-eva-border)",
    },

    ".cm-activeLine": {
      backgroundColor: "var(--color-eva-bg2)",
    },

    ".cm-activeLineGutter": {
      backgroundColor: "var(--color-eva-bg2)",
      color: "var(--color-eva-text)",
    },
  },
  { dark: true }
);

/**
 * Подсветка синтаксиса под Eva-тему.
 * Здесь можно подогнать цвета под грамматику Eva.
 */
export const evaHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: "var(--color-eva-accent2)", fontWeight: "bold" },
  { tag: t.controlKeyword, color: "var(--color-eva-accent2)", fontWeight: "bold" },

  { tag: t.operator, color: "var(--color-eva-accent)" },

  { tag: t.string, color: "#79c0ff" },
  { tag: t.special(t.string), color: "#79c0ff" },

  { tag: t.number, color: "#7ee787" },
  { tag: t.bool, color: "#7ee787" },

  { tag: t.variableName, color: "var(--color-eva-text)" },
  { tag: t.definition(t.variableName), color: "var(--color-eva-text)" },

  { tag: t.function(t.variableName), color: "#ffa657" },
  { tag: t.definition(t.function(t.variableName)), color: "#ffa657" },

  { tag: t.comment, color: "var(--color-eva-text-muted)", fontStyle: "italic" },
  { tag: t.meta, color: "var(--color-eva-text-muted)" },

  { tag: t.invalid, color: "var(--color-eva-accent2)", textDecoration: "underline" },
]);

// Оборачиваем его в Extension через syntaxHighlighting
export const evaCmHighlight: Extension = syntaxHighlighting(evaHighlightStyle);

/**
 * Удобный бандл для подключения.
 */
export const evaCodeMirrorExtensions: Extension[] = [evaCmTheme, evaCmHighlight];
