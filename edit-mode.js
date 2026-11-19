/* Display-text corrections. Stored separately from guide progress. */
(function () {
  const KEY = "xc1de-guide-text-edits-v1";
  const SESSION = "xc1de-text-edit-open";
  const DATA_FILES = [
    ["data/route-data.js", ["ROUTE", "STORY_ROUTE_SPINE", "ROUTE_SUBCHECK_LABELS", "ROUTE_SUBCHECK_OBJECTIVES", "ROUTE_SUBCHECK_HINTS"]],
    ["data/world-data.js", ["WORLD_DATA"]],
    ["data/completion-data.js", ["COMPLETION_DATA"]],
    ["data/build-data.js", ["BUILD_DATA"]],
    ["data/workshop-data.js", ["WORKSHOP_DATA"]],
    ["data/monsterpedia-data.js", ["MONSTERPEDIA_DATA"]],
    ["data/affinity-data.js", ["AFFINITY_DATA"]],
    ["data/collectopaedia-data.js", ["COLLECTOPAEDIA_DATA"]],
    ["data/combat-dossier-data.js", ["COMBAT_DOSSIER_DATA"]],
    ["data/quest-schedule-data.js", ["QUEST_SCHEDULE_DATA"]],
    ["data/route-bindings-data.js", ["ROUTE_BINDINGS_DATA"]],
    ["data/frontier-map-data.js", ["FRONTIER_MAP_DATA"]],
    ["data/map-atlas-data.js", ["MAP_ATLAS_DATA"]],
    ["index.html", []]
  ];

  let edits = load();
  let editOn = false;
  let dialogOpen = false;
  let activeNode = null;
  let activeFrom = "";
  let sourceIndex = null;

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (e) {
      return {};
    }
  }
  function persist() {
    localStorage.setItem(KEY, JSON.stringify(edits));
  }
  function shownForm(value) {
    let text = String(value);
    if (typeof officialJa === "function") text = officialJa(text);
    if (typeof subcheckJa === "function") text = subcheckJa(text);
    return text;
  }
  function ensureIndex() {
    if (sourceIndex) return sourceIndex;
    sourceIndex = new Map();
    const seen = new WeakSet();
    const add = (key, hit) => {
      if (!key || key.length < 2 || key.length > 4000) return;
      if (/^https?:|^data\/|^assets\//.test(key)) return;
      const list = sourceIndex.get(key) || [];
      if (list.length >= 6 || list.some(item => item.file === hit.file && item.path === hit.path)) return;
      list.push(hit);
      sourceIndex.set(key, list);
    };
    const visit = (file, value, path) => {
      if (typeof value === "string") {
        const pieces = value.includes("<") ? value.replace(/<[^>]+>/g, "\n").split("\n") : [value];
        for (const piece of pieces) {
          const bit = piece.trim();
          if (!bit) continue;
          add(bit, { file, path });
          const shown = shownForm(bit);
          if (shown !== bit) add(shown, { file, path });
        }
        return;
      }
      if (!value || typeof value !== "object") return;
      if (seen.has(value)) return;
      seen.add(value);
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) visit(file, value[i], path + "[" + i + "]");
        return;
      }
      for (const key of Object.keys(value)) visit(file, value[key], path + "." + key);
    };
    for (const [file, names] of DATA_FILES) {
      for (const name of names) {
        try {
          const value = (0, eval)(name);
          if (typeof value !== "undefined") visit(file, value, name);
        } catch (e) { /* a data file may not be loaded yet */ }
      }
    }
    return sourceIndex;
  }
  function sourcesFor(text, element) {
    const hits = (ensureIndex().get(text) || []).map(item => ({ file: item.file, path: item.path }));
    const idHost = element && element.closest ? element.closest("[id]") : null;
    const card = element && element.closest ? element.closest("[data-id]") : null;
    const panel = element && element.closest ? element.closest(".panel") : null;
    hits.push({
      file: "index.html",
      selector: idHost ? "#" + idHost.id : "",
      dataId: card ? card.getAttribute("data-id") || "" : "",
      panel: panel ? panel.id || "" : ""
    });
    return hits;
  }
  function canonicalFrom(displayed) {
    for (const from of Object.keys(edits)) {
      if (edits[from].to === displayed) return from;
    }
    return displayed;
  }
  function applyNode(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      const current = node.nodeValue;
      if (!current || !current.trim()) return;
      const record = edits[current];
      if (record && record.to !== current) node.nodeValue = record.to;
      return;
    }
    if (node.nodeType !== 1) return;
    if (node.id === "text-edit-root" || (node.closest && node.closest("#text-edit-root"))) return;
    if (node.tagName === "SCRIPT" || node.tagName === "STYLE" || node.tagName === "TEXTAREA" || node.tagName === "INPUT") return;
    for (const child of node.childNodes) applyNode(child);
  }
  function applyAll() {
    if (!Object.keys(edits).length) return;
    applyNode(document.body);
  }

  const style = document.createElement("style");
  style.textContent = [
    "#text-edit-root{font:13px/1.35 sans-serif}",
    "#text-edit-bar{position:fixed;z-index:260;top:0;left:0;right:0;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:8px 10px;background:#14324a;color:#fff}",
    "#text-edit-bar strong{margin-right:4px}",
    "#text-edit-bar button,#text-edit-toggle{box-sizing:border-box;min-height:36px;padding:6px 10px;border:1px solid #8fb6cc;border-radius:6px;background:#0d2436;color:#fff;font:inherit;white-space:nowrap;cursor:pointer}",
    "#text-edit-toggle{min-height:32px;padding:4px 8px;border-color:var(--line,#8aa);background:transparent;color:inherit;font-size:12px}",
    "#text-edit-dialog,#text-edit-sheet{position:fixed;z-index:270;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:12px;background:rgba(2,10,18,.55);box-sizing:border-box}",
    "#text-edit-dialog[hidden],#text-edit-sheet[hidden],#text-edit-bar[hidden]{display:none}",
    "#text-edit-dialog form,#text-edit-sheet .sheet{width:min(640px,100%);max-height:min(80vh,640px);overflow:auto;box-sizing:border-box;padding:14px;border-radius:12px;background:#fff;color:#10202c}",
    "#text-edit-input{width:100%;min-height:120px;box-sizing:border-box;font:16px/1.45 sans-serif;padding:8px}",
    "#text-edit-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}",
    "#text-edit-actions button,.text-edit-mini{min-height:40px;padding:8px 12px;border-radius:8px;border:1px solid #8aa;background:#f4f7f8;font:inherit}",
    ".text-edit-row{padding:8px 0;border-bottom:1px solid #dde}",
    ".text-edit-row p{margin:0 0 6px;white-space:pre-wrap;word-break:break-word}",
    "@media(max-width:640px){#text-edit-bar{padding:8px}#text-edit-bar button{flex:1 1 auto}#text-edit-dialog,#text-edit-sheet{padding:8px;align-items:flex-end}}"
  ].join("");
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "text-edit-root";
  root.innerHTML = [
    '<div id="text-edit-bar" hidden><strong>編集モード</strong>',
    '<button type="button" id="text-edit-list-open">修正一覧</button>',
    '<button type="button" id="text-edit-export">書き出し</button>',
    '<button type="button" id="text-edit-import-open">読み込み</button>',
    '<button type="button" id="text-edit-reset">すべて元に戻す</button>',
    '<span id="text-edit-count"></span></div>',
    '<div id="text-edit-dialog" hidden role="dialog" aria-modal="true" aria-labelledby="text-edit-title">',
    '<form><h2 id="text-edit-title">この文を直す</h2>',
    '<textarea id="text-edit-input"></textarea>',
    '<p id="text-edit-where"></p>',
    '<div id="text-edit-actions"><button type="submit">保存</button><button type="button" id="text-edit-cancel">キャンセル</button></div>',
    '</form></div>',
    '<div id="text-edit-sheet" hidden><div class="sheet" id="text-edit-sheet-body"></div></div>'
  ].join("");
  document.body.appendChild(root);
  const bar = document.getElementById("text-edit-bar");
  const dialog = document.getElementById("text-edit-dialog");
  const sheet = document.getElementById("text-edit-sheet");
  const input = document.getElementById("text-edit-input");
  const count = document.getElementById("text-edit-count");

  function syncBar() {
    const n = Object.keys(edits).length;
    count.textContent = n ? n + "件" : "";
    bar.hidden = !editOn;
    document.body.style.paddingTop = editOn ? bar.offsetHeight + "px" : "";
  }
  function setEditOn(on) {
    editOn = !!on;
    try { sessionStorage.setItem(SESSION, editOn ? "1" : "0"); } catch (e) {}
    if (!editOn) closeDialog();
    syncBar();
    const toggle = document.getElementById("text-edit-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", editOn ? "true" : "false");
  }
  function closeDialog() {
    dialogOpen = false;
    dialog.hidden = true;
    activeNode = null;
  }
  function closeSheet() { sheet.hidden = true; }
  function textNodeFrom(event) {
    const point = document.caretRangeFromPoint || document.caretPositionFromPoint;
    if (typeof document.caretRangeFromPoint === "function") {
      const range = document.caretRangeFromPoint(event.clientX, event.clientY);
      if (range && range.startContainer && range.startContainer.nodeType === 3 && range.startContainer.nodeValue.trim()) return range.startContainer;
    }
    const host = event.target && event.target.nodeType === 1 ? event.target : event.target && event.target.parentElement;
    if (!host || !host.closest) return null;
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node && !node.nodeValue.trim()) node = walker.nextNode();
    return node;
  }
  function allowed(target) {
    return !!(target && target.closest && target.closest("#text-edit-root, #tabs, #hub-rail, #hub-section-picker, #open-howto, #howto, #vision, #text-edit-toggle"));
  }
  function beginEdit(event) {
    const node = textNodeFrom(event);
    if (!node || node.nodeValue == null || !node.nodeValue.trim()) return;
    if (node.parentElement && node.parentElement.closest("#text-edit-root, script, style")) return;
    activeNode = node;
    activeFrom = canonicalFrom(node.nodeValue);
    input.value = node.nodeValue;
    const hits = sourcesFor(activeFrom, node.parentElement);
    const where = document.getElementById("text-edit-where");
    where.textContent = hits.filter(hit => hit.path).slice(0, 3).map(hit => hit.file + " · " + hit.path).join(" / ") || "静的な表示（index.html）";
    dialogOpen = true;
    dialog.hidden = false;
    input.focus();
  }
  function saveEdit(next) {
    const from = activeFrom;
    if (!from) return closeDialog();
    if (!next.trim() || next === from) delete edits[from];
    else edits[from] = { to: next, sources: sourcesFor(from, activeNode && activeNode.parentElement) };
    persist();
    if (activeNode && activeNode.isConnected) activeNode.nodeValue = next === from || !next.trim() ? from : next;
    else applyAll();
    closeDialog();
    syncBar();
  }
  function payload() {
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      edits: Object.keys(edits).map(from => ({ from, to: edits[from].to, sources: edits[from].sources || [] }))
    };
  }
  function download(json) {
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "guide-text-edits.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
  async function copyText(json) {
    try {
      await navigator.clipboard.writeText(json);
      return true;
    } catch (e) {
      return false;
    }
  }
  function openSheet(html) {
    document.getElementById("text-edit-sheet-body").innerHTML = html;
    sheet.hidden = false;
  }
  function showList() {
    const rows = Object.keys(edits).map(from => {
      const to = edits[from].to;
      return '<div class="text-edit-row"><p><b>元</b> ' + escapeHtml(from) + '</p><p><b>修正</b> ' + escapeHtml(to) + '</p><button type="button" class="text-edit-mini" data-edit-drop="' + encodeURIComponent(from) + '">この文を消す</button></div>';
    }).join("") || "<p>まだ修正はありません。</p>";
    openSheet('<h2>修正一覧</h2>' + rows + '<div id="text-edit-actions"><button type="button" id="text-edit-sheet-close">閉じる</button></div>');
  }
  function escapeHtml(text) {
    return String(text).replace(/[&<>]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));
  }
  function showImport() {
    openSheet('<h2>読み込み</h2><p>書き出した JSON を貼るか、ファイルを選ぶ。</p><textarea id="text-edit-import-text" style="width:100%;min-height:120px;box-sizing:border-box;font:16px/1.4 sans-serif"></textarea><input id="text-edit-file" type="file" accept="application/json,.json"><div id="text-edit-actions"><button type="button" id="text-edit-import-do">反映する</button><button type="button" id="text-edit-sheet-close">閉じる</button></div>');
  }
  function importJson(raw) {
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : parsed.edits || [];
    edits = {};
    for (const item of list) {
      if (!item || typeof item.from !== "string" || typeof item.to !== "string") continue;
      edits[item.from] = { to: item.to, sources: item.sources || [] };
    }
    persist();
    applyAll();
    syncBar();
    closeSheet();
  }

  document.getElementById("text-edit-cancel").addEventListener("click", closeDialog);
  dialog.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    saveEdit(input.value);
  });
  document.getElementById("text-edit-list-open").addEventListener("click", showList);
  document.getElementById("text-edit-import-open").addEventListener("click", showImport);
  document.getElementById("text-edit-export").addEventListener("click", async () => {
    const json = JSON.stringify(payload(), null, 2);
    const copied = await copyText(json);
    download(json);
    openSheet("<h2>書き出し</h2><p>" + (copied ? "JSONをコピーし、ファイルも保存しました。" : "ファイルを保存しました。下のJSONを選んでコピーできます。") + "</p><textarea id=\"text-edit-export-text\" style=\"width:100%;min-height:140px;box-sizing:border-box;font:16px/1.4 sans-serif\">" + escapeHtml(json) + "</textarea><div id=\"text-edit-actions\"><button type=\"button\" id=\"text-edit-sheet-close\">閉じる</button></div>");
  });
  document.getElementById("text-edit-reset").addEventListener("click", () => {
    if (!window.confirm("この端末の訳の修正をすべて消しますか。進行チェックは消えません。")) return;
    edits = {};
    persist();
    location.reload();
  });
  sheet.addEventListener("click", event => {
    if (event.target === sheet || event.target.id === "text-edit-sheet-close") { closeSheet(); return; }
    const drop = event.target.closest("[data-edit-drop]");
    if (drop) {
      delete edits[decodeURIComponent(drop.getAttribute("data-edit-drop"))];
      persist();
      applyAll();
      syncBar();
      showList();
      return;
    }
    if (event.target.id === "text-edit-import-do") {
      const file = document.getElementById("text-edit-file");
      const text = document.getElementById("text-edit-import-text").value.trim();
      if (file && file.files && file.files[0] && !text) {
        const reader = new FileReader();
        reader.onload = () => { try { importJson(String(reader.result || "")); } catch (e) { window.alert("JSONを読めませんでした。"); } };
        reader.readAsText(file.files[0]);
        return;
      }
      try { importJson(text); } catch (e) { window.alert("JSONを読めませんでした。"); }
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && dialogOpen) { event.preventDefault(); closeDialog(); }
  });

  function onInteract(event) {
    if (dialogOpen) {
      if (!event.target.closest("#text-edit-root")) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (!editOn || allowed(event.target)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "click") beginEdit(event);
  }
  document.addEventListener("click", onInteract, true);
  document.addEventListener("change", onInteract, true);

  const params = new URLSearchParams(location.search);
  let open = params.get("edit") === "1";
  if (params.get("edit") === "0") open = false;
  else if (!params.has("edit")) {
    try { open = sessionStorage.getItem(SESSION) === "1"; } catch (e) { open = false; }
  }
  applyAll();
  setEditOn(open);
  new MutationObserver(mutations => {
    if (!Object.keys(edits).length) return;
    for (const mutation of mutations) for (const node of mutation.addedNodes) applyNode(node);
  }).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("resize", () => { if (editOn) syncBar(); });

  const toggle = document.getElementById("text-edit-toggle");
  if (toggle) toggle.addEventListener("click", () => setEditOn(!editOn));
})();
