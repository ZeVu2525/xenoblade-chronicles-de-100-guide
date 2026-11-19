// Display-only names. Do not use these strings as save keys, species keys,
// sub-checkpoint ids, or Atlas query keys. The English source data stays put.
// Sources are listed in OFFICIAL-NAMES.md.
const OFFICIAL_NAME_PAIRS = [
  ["Future Connected", "つながる未来"],
  ["Before you press start", "始める前に"],
  ["The world reopens — biggest side-content chapter in the game", "世界が再び開く。本編で脇道が最も多い章"],
  ["The completion phase", "達成の段階"],
  ["The epilogue", "後日譚"],
  ["Unique Monster", "ユニークモンスター"],
  ["Unique Monsters", "ユニークモンスター"],
  ["Talent Arts", "タレントアーツ"],
  ["Talent Art", "タレントアーツ"],
  ["Central Bionis", "巨神中層部"],
  ["Upper Bionis", "巨神上層部"],
  ["Hidden Village", "隠れ里周辺"],
  ["Wedding Ring", "結婚指輪"],
  ["Grand Prix", "ノポングランプリ"],
  ["Ponspectors", "ノポンジャー"],
  ["Monsterpedia", "図鑑"],
  ["High Entia", "ハイエンター"],
  ["Zanza Guardian", "ザンザガーディアン"],
  ["Ether Up", "エーテルアップ"],
  ["HP Up", "ＨＰアップ"],
  ["Post-game", "クリア後"],
  ["Fogbeast", "霧乃獣"],
  ["Pessimism", "弱気"],
  ["Crazed", "狂暴"],
  ["Mechon", "機神兵"],
  ["Machina", "マシーナ"],
  ["Telethia", "テレシア"],
  ["Quadwing", "クロード"],
  ["Caterpile", "キャピル"],
  ["Piranhax", "サモン"],
  ["Moramora", "モラモラ"],
  ["Flamii", "フラミー"],
  ["Orluga", "オルガ"],
  ["Pterix", "プテルス"],
  ["Rhogul", "ローグル"],
  ["Skeeter", "スキート"],
  ["Krabble", "クライブ"],
  ["Arachno", "スパイド"],
  ["Antol", "アントル"],
  ["Eluca", "エルーカ"],
  ["Slobos", "ソロポス"],
  ["Sauros", "サウラー"],
  ["Tokilos", "トキロス"],
  ["Ekidno", "エキドナ"],
  ["Mammut", "マムート"],
  ["Deinos", "ディノス"],
  ["Chilkin", "チルキン"],
  ["Kromar", "スピカル"],
  ["Tirkin", "ターキン"],
  ["Ageshu", "アーケシュ"],
  ["Balgas", "バルカス"],
  ["Bunniv", "バニーヴ"],
  ["Bunnia", "バニア"],
  ["Bunnit", "バニット"],
  ["Lexos", "レクソス"],
  ["Grady", "グラディ"],
  ["Volff", "ヴォルフ"],
  ["Gogol", "ゴゴール"],
  ["Feris", "フェリス"],
  ["Hiln", "ヒルン"],
  ["Obart", "ホバート"],
  ["Rhana", "ラーナ"],
  ["Ansel", "アンセル"],
  ["Aries", "アリエス"],
  ["Tude", "トゥード"],
  ["Vang", "ヴァンプ"],
  ["Egel", "エーグル"],
  ["Wisp", "ランプス"],
  ["Brog", "グロッグ"],
  ["Laia", "ライア"],
  ["Ories", "オリエス"],
  ["Pagul", "パグール"],
  ["Sardi", "サーディ"],
  ["Selua", "セルラ"],
  ["Ardun", "アルドン"],
  ["Armu", "アルマ"],
  ["Ponio", "ポニオ"],
  ["Torta", "トーター"],
  ["Lizard", "リザド"],
  ["Dragon", "ドラゴン"],
  ["Hode", "フーディ"],
  ["Homs", "ホムス"],
  ["Igna", "イグーナ"],
  ["Taos", "ターオス"],
  ["Hox", "ホッグス"],
  ["Barg", "ボーク"],
  ["Eks", "エクス"],
  ["Flier", "フライア"],
  ["Upa", "ウーパー"],
  ["Apis", "アピス"],
  ["Kino", "キノ"],
  ["Nene", "ネネ"],
  ["Slow", "スロウ"],
  ["Bravery", "英雄"]
];

function officialJa(text) {
  if (!text || !/[A-Za-z]/.test(text)) return text;
  let out = String(text);
  for (const [en, ja] of OFFICIAL_NAME_PAIRS) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp("(?<![A-Za-z0-9])" + escaped + "(?![A-Za-z0-9])", "g"), ja);
  }
  return out.replace(/(?<![A-Za-z])Chapter (\d+)(?![A-Za-z0-9])/g, "$1章");
}

function subcheckJa(text) {
  return text
    .replace(/^Search Quest/, "探索クエスト")
    .replace(/^Monster Quest/, "討伐クエスト")
    .replace(/^Material Quest/, "素材クエスト")
    .replace(/^Collection Quest/, "収集クエスト")
    .replace(/^Collect Quest/, "収集クエスト")
    .replace(/^Register (.+)$/, "$1を登録")
    .replace(/^Defeat (.+)$/, "$1を倒す")
    .replace(/^Bank /, "預ける ")
    .replace(/^Complete (.+) Collectopaedia$/, "$1のコレペディアを完成")
    .replace(/ Area Affinity/g, "のエリアキズナ")
    .replace(/ page$/, "のページ")
    .replace(/^Speak to (.+)$/, "$1に話す")
    .replace(/^Collect /, "集める ")
    .replace(/^Return to (.+)$/, "$1に戻る");
}

function applyOfficialNames(root) {
  if (!root) return;
  const skip = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "KBD"]);
  const walk = node => {
    if (node.nodeType === 3) {
      const next = officialJa(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== 1 || skip.has(node.tagName)) return;
    for (const child of node.childNodes) walk(child);
  };
  walk(root);
  if (root.nodeType === 1 && root.querySelectorAll) {
    root.querySelectorAll(".route-subcheck-copy > span").forEach(span => {
      const next = subcheckJa(span.textContent);
      if (next !== span.textContent) span.textContent = next;
    });
  }
}
