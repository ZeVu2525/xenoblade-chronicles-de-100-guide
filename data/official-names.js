// Display-only names. Do not use these strings as save keys, species keys,
// sub-checkpoint ids, or Atlas query keys. The English source data stays put.
// Sources are listed in OFFICIAL-NAMES.md.
// Longer phrases are applied first inside officialJa.
const OFFICIAL_NAME_PAIRS = [
  ["Future Connected", "つながる未来"],
  ["Before you press start", "始める前に"],
  ["The world reopens — biggest side-content chapter in the game", "世界が再び開く。本編で脇道が最も多い章"],
  ["The completion phase", "達成の段階"],
  ["Supply Station Battle", "サプライステーションバトル"],
  ["Fiora's Conviction", "フィオルンのコンビクション"],
  ["Astas Remote Unit", "アスタスの遠隔装置"],
  ["Path to the Top", "パス・トゥ・ザ・トップ"],
  ["Bionis' Interior", "巨神胎内"],
  ["High Entia Tomb", "ハイエンター墓所"],
  ["Rainbow Zirconia", "虹色キュービック"],
  ["Galahad Fortress", "ガラハド要塞"],
  ["Physical Def Up", "物理防御アップ"],
  ["Frontier Village", "サイハテ村"],
  ["Mechonis Field", "機神界フィールド"],
  ["Central Factory", "中央工廠"],
  ["Valak Mountain", "ヴァラク雪山"],
  ["Sword Valley", "大剣の渓谷"],
  ["Turbine Battle", "タービンバトル"],
  ["Chase Dickson", "チェイス・ディクソン"],
  ["Black Beetle", "クロメタルカナブン"],
  ["Rabbit Diode", "ラビットダイオード"],
  ["Tephra Cave", "テフラ洞窟"],
  ["Makna Forest", "マクナ原生林"],
  ["Satorl Marsh", "燐光の地ザトール"],
  ["Bionis' Leg", "巨神脚"],
  ["Ether Mine", "中央採掘場"],
  ["Fallen Arm", "落ちた腕"],
  ["Green Diode", "グリーンダイオード"],
  ["Ready Coil", "レディコイル"],
  ["Love Source", "ホレルゲン"],
  ["Burst Affinity", "突発キズナ"],
  ["Faced Mechon", "フェイス機神兵"],
  ["Union Strikes", "ユニオンストライク"],
  ["Union Strike", "ユニオンストライク"],
  ["Lift Battle", "リフトバトル"],
  ["Expert Mode", "エキスパートモード"],
  ["Strong Flame", "ストロングフレイム"],
  ["Medium Flame", "ミディアムフレイム"],
  ["Gentle Flame", "ジェントルフレイム"],
  ["Mega Heat", "メガヒート"],
  ["Skill Links", "スキルリンク"],
  ["Skill Link", "スキルリンク"],
  ["Chain Link", "チェインリンク"],
  ["Colony 9", "コロニー9"],
  ["Colony 6", "コロニー6"],
  ["Eryth Sea", "エルト海"],
  ["Alcamoth", "皇都アカモート"],
  ["Agniratha", "帝都アグニラータ"],
  ["Impatience", "短気"],
  ["Camaraderie", "友情"],
  ["Obstinance", "頑固"],
  ["Enthusiasm", "熱血"],
  ["Cowardice", "臆病"],
  ["Reticence", "内気"],
  ["Reliance", "依存"],
  ["Affection", "愛情"],
  ["Rashness", "勝気"],
  ["Innocence", "純真"],
  ["Heroism", "勇者"],
  ["Passion", "情熱"],
  ["Love Sources", "ホレルゲン"],
  ["Veritas Glyphs", "ベリタス・グリフ"],
  ["Veritas Glyph", "ベリタス・グリフ"],
  ["Oriental Glass", "オリエンタルグラス"],
  ["Oriental Glasses", "オリエンタルグラス"],
  ["New Game Plus", "ニューゲームプラス"],
  ["Romantic Notions", "恋愛成就"],
  ["Xenoblade Chronicles DE", "ゼノブレイドDE"],
  ["Immunization", "イミュナイゼーション"],
  ["Bodybuilder", "ボディビルダー"],
  ["または Trust", "または小娘隊長の信頼"],
  ["Area Affinity", "エリアアフィニティ"],
  ["Xenoblade Wiki", "ゼノブレイドWiki"],
  ["Sage", "セージ"],
  ["Argentis", "シルバー"],
  ["Abaasy", "アバーシ"],
  ["Housing", "ハウジング"],
  ["Commerce", "コマース"],
  ["Nature", "ネイチャー"],
  ["Special", "スペシャル"],
  ["Valak", "ヴァラク"],
  ["Makna", "マクナ"],
  ["Seven", "セブン"],
  ["Zel", "ゼル"],
  ["Don", "ドン"],
  ["Engineer", "エンジニア"],
  ["Behemoth", "ベヒモス"],
  ["Shooter", "シューター"],
  ["Nebula", "ネブラ"],
  ["Spirit", "スピリット"],
  ["Andos", "アンドス"],
  ["Astas", "アスタス"],
  ["Giant", "ジャイアント"],
  ["Heat", "ヒート"],
  ["Shulk", "シュルク"],
  ["Reyn", "ライン"],
  ["Fiora's", "フィオルンの"],
  ["Fiora", "フィオルン"],
  ["Dunban", "ダンバン"],
  ["Sharla", "カルナ"],
  ["Melia", "メリア"],
  ["Riki", "リキ"],
  ["Pod", "ポッド"],
  ["God", "ゴッド"],
  ["drops logged", "ドロップログ"],
  ["hunt pins", "ハントピン"],
  ["Spike warning:", "スパイク・ワーニング:"],
  ["documented Spike", "ドキュメント・スパイク"],
  ["Topple plan", "転倒プラン"],
  ["Target:", "ターゲット:"],
  ["Alcamoth at Dawn", "皇都アカモート・ドーン"],
  ["Alcamoth Orbital", "皇都アカモート・オービタル"],
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

const OFFICIAL_NAME_SORTED = OFFICIAL_NAME_PAIRS.slice().sort((a, b) => b[0].length - a[0].length);

function officialJa(text) {
  if (!text || !/[A-Za-z]/.test(text)) return text;
  let out = String(text);
  for (const [en, ja] of OFFICIAL_NAME_SORTED) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp("(?<![A-Za-z0-9])" + escaped + "(?![A-Za-z0-9])", "g"), ja);
  }
  return out
    .replace(/(?<![A-Za-z])Chapter (\d+)(?![A-Za-z0-9])/g, "$1章")
    .replace(/(?<![A-Za-z])Part (\d+)(?![A-Za-z0-9])/g, "パート$1");
}

function subcheckJa(text) {
  return text
    .replace(/^Search Quest/, "サーチクエスト")
    .replace(/^Monster Quest/, "モンスタークエスト")
    .replace(/^Material Quest/, "マテリアルクエスト")
    .replace(/^Collection Quest/, "コレクションクエスト")
    .replace(/^Collect Quest/, "コレクトクエスト")
    .replace(/^Bank /, "バンク ")
    .replace(/^Complete (.+) Collectopaedia$/, "$1のコレペディアをコンプリート")
    .replace(/^Collect /, "コレクト ")
    .replace(/^Challenge /, "チャレンジ ")
    .replace(/ page$/, "ページ");
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
    if (node.classList && node.classList.contains("subcheck-atlas-link")) return;
    if (node.tagName === "OPTION" && !node.hasAttribute("value")) node.setAttribute("value", node.textContent);
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
