(function (global) {
  const messages = {
    en: {
      languageLabel: "Language",
      documentTitle: "21-Card Trick",
      metaDescription: "A playful, browser-based version of the 21-card trick.",
      homeLabel: "21-Card Trick home",
      brand: "THE CARD TRICK",
      tagline: "A LITTLE BROWSER ILLUSION",
      restart: "Restart",
      heroEyebrow: "THREE ROUNDS. ONE CARD.",
      heroTitleFirst: "Think of a card.",
      heroTitleSecond: "I'll find it.",
      introDescription:
        "When the cards appear, silently choose one and keep it in mind. Point out its pile in each of three rounds, and let a little bit of math do the magic.",
      start: "Start the trick",
      introMicrocopy: "No camera, no deck, no funny business. Just 21 cards.",
      heroCards: "CARDS",
      roundProgress: "Round progress",
      roundKicker: "ROUND {{round}} OF 3",
      gameTitle: "Which pile holds your card?",
      gameInstruction: "Find your card, then choose its pile.",
      pileBoardLabel: "Choose the pile containing your card",
      pileName: "Pile {{number}}",
      pileCount: "7 CARDS",
      pileAria: "Pile {{number}}: {{cards}}",
      liveLook: "Your card is in one of these piles. Take a good look.",
      pileSelected: "Pile {{number}} selected. Gathering all three piles…",
      shuffling: "All three piles are together. Shuffling the deck…",
      finalCount: "THE FINAL COUNT",
      oneAtTime: "One card at a time.",
      finalInstruction: "All 21 cards will turn face up. Your card is the one in the middle.",
      cardsCounted: "Cards counted",
      countGridLabel: "Revealing all twenty-one cards",
      countInitial: "Turning over all 21 cards…",
      countingCard: "Turning over card {{number}} of 21…",
      countFinding: "All 21 cards are face up. Finding the card in the middle…",
      targetFound: "Card 11 — the one in the middle. Found it!",
      momentOfTruth: "THE MOMENT OF TRUTH",
      foundIt: "Found it.",
      revealDescription: "You were thinking of this card all along.",
      playAgain: "Try another card",
      chosenCard: "Your chosen card",
      footerTagline: "21 cards, 3 piles, a tiny mathematical miracle.",
      suitSpades: "spades",
      suitHearts: "hearts",
      suitDiamonds: "diamonds",
      suitClubs: "clubs",
      cardLabel: "{{rank}} of {{suit}}",
      cardNumberLabel: "Card {{number}}",
    },
    "zh-CN": {
      languageLabel: "语言",
      documentTitle: "21张牌魔术",
      metaDescription: "一个有趣的网页版21张牌魔术。",
      homeLabel: "21张牌魔术首页",
      brand: "纸牌魔术",
      tagline: "浏览器里的小魔法",
      restart: "重新开始",
      heroEyebrow: "三轮，找出一张牌。",
      heroTitleFirst: "想一张牌。",
      heroTitleSecond: "我来找出来。",
      introDescription: "牌面出现后，请在心里选定一张并记住它。连续三轮指出它所在的牌堆，让一点数学来完成魔法。",
      start: "开始魔术",
      introMicrocopy: "无需摄像头，无需牌组，也没有花招，只有21张牌。",
      heroCards: "张牌",
      roundProgress: "回合进度",
      roundKicker: "第 {{round}} 轮，共3轮",
      gameTitle: "你的牌在哪一堆？",
      gameInstruction: "找到你的牌，然后选择它所在的牌堆。",
      pileBoardLabel: "选择包含你所选牌的牌堆",
      pileName: "第{{number}}堆",
      pileCount: "7张牌",
      pileAria: "第{{number}}堆：{{cards}}",
      liveLook: "你的牌就在其中一堆里，仔细看看。",
      pileSelected: "已选择第{{number}}堆，正在收拢三堆牌……",
      shuffling: "三堆牌已合在一起，正在洗牌……",
      finalCount: "最后数牌",
      oneAtTime: "一张一张翻开。",
      finalInstruction: "21张牌将全部翻开，你的牌就在正中间。",
      cardsCounted: "已数牌数",
      countGridLabel: "正在翻开全部21张牌",
      countInitial: "正在翻开21张牌……",
      countingCard: "正在翻开第{{number}}张，共21张……",
      countFinding: "21张牌已全部翻开，正在寻找中间那张……",
      targetFound: "第11张——正中间的那张，找到了！",
      momentOfTruth: "揭晓时刻",
      foundIt: "找到了。",
      revealDescription: "你刚才想的就是这张牌。",
      playAgain: "再试一张",
      chosenCard: "你选中的牌",
      footerTagline: "21张牌、3个牌堆，一个小小的数学奇迹。",
      suitSpades: "黑桃",
      suitHearts: "红桃",
      suitDiamonds: "方块",
      suitClubs: "梅花",
      cardLabel: "{{suit}}{{rank}}",
      cardNumberLabel: "第{{number}}张牌",
    },
    "zh-TW": {
      languageLabel: "語言",
      documentTitle: "21 張牌魔術",
      metaDescription: "一個有趣的網頁版 21 張牌魔術。",
      homeLabel: "21 張牌魔術首頁",
      brand: "紙牌魔術",
      tagline: "瀏覽器裡的小魔法",
      restart: "重新開始",
      heroEyebrow: "三輪，找出一張牌。",
      heroTitleFirst: "想一張牌。",
      heroTitleSecond: "我來找出來。",
      introDescription: "牌面出現後，請在心裡選定一張並記住它。連續三輪指出它所在的牌堆，讓一點數學來完成魔法。",
      start: "開始魔術",
      introMicrocopy: "不需要攝影機、不需要牌組，也沒有花招，只有 21 張牌。",
      heroCards: "張牌",
      roundProgress: "回合進度",
      roundKicker: "第 {{round}} 輪，共 3 輪",
      gameTitle: "你的牌在哪一堆？",
      gameInstruction: "找到你的牌，然後選擇它所在的牌堆。",
      pileBoardLabel: "選擇包含你所選牌的牌堆",
      pileName: "第 {{number}} 堆",
      pileCount: "7 張牌",
      pileAria: "第 {{number}} 堆：{{cards}}",
      liveLook: "你的牌就在其中一堆裡，仔細看看。",
      pileSelected: "已選擇第 {{number}} 堆，正在收攏三堆牌……",
      shuffling: "三堆牌已合在一起，正在洗牌……",
      finalCount: "最後數牌",
      oneAtTime: "一張一張翻開。",
      finalInstruction: "21 張牌將全部翻開，你的牌就在正中間。",
      cardsCounted: "已數牌數",
      countGridLabel: "正在翻開全部 21 張牌",
      countInitial: "正在翻開 21 張牌……",
      countingCard: "正在翻開第 {{number}} 張，共 21 張……",
      countFinding: "21 張牌已全部翻開，正在尋找中間那張……",
      targetFound: "第 11 張——正中間的那張，找到了！",
      momentOfTruth: "揭曉時刻",
      foundIt: "找到了。",
      revealDescription: "你剛才想的就是這張牌。",
      playAgain: "再試一張",
      chosenCard: "你選中的牌",
      footerTagline: "21 張牌、3 個牌堆，一個小小的數學奇蹟。",
      suitSpades: "黑桃",
      suitHearts: "紅心",
      suitDiamonds: "方塊",
      suitClubs: "梅花",
      cardLabel: "{{suit}}{{rank}}",
      cardNumberLabel: "第 {{number}} 張牌",
    },
    ja: {
      languageLabel: "言語",
      documentTitle: "21枚のカードマジック",
      metaDescription: "ブラウザーで遊べる、楽しい21枚のカードマジックです。",
      homeLabel: "21枚のカードマジックのホーム",
      brand: "カードマジック",
      tagline: "ブラウザーの小さなマジック",
      restart: "最初から",
      heroEyebrow: "3回で、1枚を当てる。",
      heroTitleFirst: "カードを1枚思い浮かべて。",
      heroTitleSecond: "当ててみせます。",
      introDescription: "カードが並んだら、1枚を心の中で選んで覚えてください。3回それぞれ、そのカードがある山を選ぶだけ。あとは数学がマジックをかなえます。",
      start: "マジックを始める",
      introMicrocopy: "カメラもカードデッキも不要。仕掛けはありません。21枚のカードだけです。",
      heroCards: "枚",
      roundProgress: "ラウンドの進行状況",
      roundKicker: "第{{round}}ラウンド / 全3ラウンド",
      gameTitle: "あなたのカードはどの山？",
      gameInstruction: "カードを見つけて、その山を選んでください。",
      pileBoardLabel: "選んだカードがある山を選択",
      pileName: "{{number}}の山",
      pileCount: "7枚",
      pileAria: "{{number}}の山：{{cards}}",
      liveLook: "カードは3つの山のどれかにあります。よく見てください。",
      pileSelected: "{{number}}の山を選択しました。3つの山を集めています…",
      shuffling: "3つの山をまとめました。カードをシャッフルしています…",
      finalCount: "最後のカウント",
      oneAtTime: "1枚ずつめくります。",
      finalInstruction: "21枚すべてを表向きにします。あなたのカードは真ん中です。",
      cardsCounted: "カウントしたカード",
      countGridLabel: "21枚すべてのカードをめくっています",
      countInitial: "21枚のカードをめくっています…",
      countingCard: "{{number}}枚目 / 21枚をめくっています…",
      countFinding: "21枚すべてが表向きです。真ん中のカードを探しています…",
      targetFound: "11枚目——真ん中のカードが見つかりました！",
      momentOfTruth: "いよいよ結果発表",
      foundIt: "見つけました。",
      revealDescription: "ずっと思い浮かべていたカードです。",
      playAgain: "もう一度遊ぶ",
      chosenCard: "あなたが選んだカード",
      footerTagline: "21枚のカード、3つの山、小さな数学の奇跡。",
      suitSpades: "スペード",
      suitHearts: "ハート",
      suitDiamonds: "ダイヤ",
      suitClubs: "クラブ",
      cardLabel: "{{suit}}の{{rank}}",
      cardNumberLabel: "{{number}}枚目のカード",
    },
    ko: {
      languageLabel: "언어",
      documentTitle: "21장 카드 마술",
      metaDescription: "브라우저에서 즐기는 재미있는 21장 카드 마술입니다.",
      homeLabel: "21장 카드 마술 홈",
      brand: "카드 마술",
      tagline: "브라우저 속 작은 마술",
      restart: "다시 시작",
      heroEyebrow: "세 번의 라운드, 한 장의 카드.",
      heroTitleFirst: "카드 한 장을 떠올려 보세요.",
      heroTitleSecond: "제가 찾아낼게요.",
      introDescription: "카드가 나타나면 한 장을 마음속으로 고르고 기억하세요. 세 번의 라운드에서 그 카드가 있는 더미를 알려 주면, 수학이 마술을 완성합니다.",
      start: "마술 시작하기",
      introMicrocopy: "카메라도 카드 덱도 필요 없어요. 속임수 없이 카드 21장만 사용합니다.",
      heroCards: "장",
      roundProgress: "라운드 진행",
      roundKicker: "{{round}}라운드 / 총 3라운드",
      gameTitle: "내 카드가 어느 더미에 있을까요?",
      gameInstruction: "카드를 찾은 뒤 그 카드가 있는 더미를 선택하세요.",
      pileBoardLabel: "선택한 카드가 있는 더미 선택",
      pileName: "{{number}}번 더미",
      pileCount: "카드 7장",
      pileAria: "{{number}}번 더미: {{cards}}",
      liveLook: "카드는 세 더미 중 하나에 있습니다. 잘 살펴보세요.",
      pileSelected: "{{number}}번 더미를 선택했습니다. 세 더미를 모으는 중…",
      shuffling: "세 더미를 모았습니다. 카드를 섞는 중…",
      finalCount: "마지막으로 세기",
      oneAtTime: "한 장씩 뒤집습니다.",
      finalInstruction: "카드 21장을 모두 앞면으로 뒤집습니다. 당신의 카드는 가운데에 있습니다.",
      cardsCounted: "확인한 카드 수",
      countGridLabel: "카드 21장을 모두 뒤집는 중",
      countInitial: "카드 21장을 뒤집는 중…",
      countingCard: "{{number}}번째 카드 / 21장을 뒤집는 중…",
      countFinding: "카드 21장이 모두 앞면입니다. 가운데 카드를 찾는 중…",
      targetFound: "11번째 카드, 가운데 카드입니다. 찾았어요!",
      momentOfTruth: "마침내 공개",
      foundIt: "찾았어요.",
      revealDescription: "처음부터 당신이 생각했던 바로 그 카드예요.",
      playAgain: "다른 카드로 다시 하기",
      chosenCard: "선택한 카드",
      footerTagline: "카드 21장, 세 더미, 작은 수학의 기적.",
      suitSpades: "스페이드",
      suitHearts: "하트",
      suitDiamonds: "다이아몬드",
      suitClubs: "클럽",
      cardLabel: "{{suit}} {{rank}}",
      cardNumberLabel: "{{number}}번째 카드",
    },
  };

  const supportedLocales = Object.keys(messages);
  let activeLocale = "en";

  function translate(key, values = {}) {
    const template = messages[activeLocale][key] ?? messages.en[key] ?? key;
    return template.replace(/\{\{(\w+)\}\}/g, (_, name) => String(values[name] ?? ""));
  }

  function applyTranslations(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
    });
    if (root === document) {
      document.documentElement.lang = activeLocale;
      document.title = translate("documentTitle");
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = translate("metaDescription");
      const languageSelect = document.querySelector("#language-select");
      if (languageSelect) languageSelect.value = activeLocale;
    }
  }

  function initialize() {
    try {
      const savedLocale = global.localStorage.getItem("21-card-trick-language");
      if (supportedLocales.includes(savedLocale)) activeLocale = savedLocale;
    } catch {
      activeLocale = "en";
    }
    applyTranslations();
    return activeLocale;
  }

  function setLocale(locale) {
    if (!supportedLocales.includes(locale)) return;
    activeLocale = locale;
    try {
      global.localStorage.setItem("21-card-trick-language", locale);
    } catch {
      // The language still changes for the current page when storage is unavailable.
    }
    applyTranslations();
    document.dispatchEvent(new CustomEvent("app-language-change", { detail: { locale } }));
  }

  global.I18n = {
    t: translate,
    apply: applyTranslations,
    init: initialize,
    setLocale,
    getLocale: () => activeLocale,
  };
})(window);
