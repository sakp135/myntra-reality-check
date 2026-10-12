import React, { useState, useMemo, useRef } from "react";


const CORPUS = [{"s": "PS", "b": "VALUE_DOUBT", "b2": "", "i": 4, "t": "UNCLEAR", "x": "don't buy anything from here they'll always manipulate you in prices but you compare to other site you'll found better price they'll will give coupon all time but it's not means price became less so don't be confused and don't try go at Ajio buy better product in good price.", "rel": 1}, {"s": "PS", "b": "FIT_SIZE", "b2": "QUALITY_TRUST", "i": 3, "t": "PURCHASE", "x": "best aap for Good choice for clothes and branded fashion, but always check product reviews, size chart, seller/product details, and return eligibility before ordering", "rel": 1}, {"s": "PS", "b": "RETURN_FRICTION", "b2": "", "i": 4, "t": "UNCLEAR", "x": "they are scammers fraudsters, I know ki 1 rating se tum logo ka kuch nahi hoga but agar 1 person bhi is baat ko samjh lega to mera issue describe karna worth it hoga, first of all they applied platform fee on each product when you are going to buy something then you have to pay that platform fee along with your product charge, after that agar aap us product ko return karte like size issue nd all then ye apko product charges hi return karenge platform fees nahi.", "rel": 1}, {"s": "PS", "b": "FIT_SIZE", "b2": "", "i": 4, "t": "PURCHASE", "x": "It is a good service but size confusion in XL and XXL Roadstar brand.so i am exchange this item. Myntra gives well brand and good service as per my opinion.", "rel": 1}, {"s": "PS", "b": "FIT_SIZE", "b2": "", "i": 5, "t": "PURCHASE", "x": "Why are myntra reference model 6 feet in height, Only 5% of Indians may have that height, who is your target audience Europeans or Indians, Please put some realstic reference sizes for clothing.", "rel": 1}, {"s": "PS", "b": "CHOICE_OVERLOAD", "b2": "", "i": 5, "t": "PURCHASE", "x": "There is a LIMIT on how many items you can add to your WISHLIST. I like to wishlist a lot to compare them with each other before deciding what to buy. This limit makes it harder to shortlist, and narrows down the options. I enjoy browsing through clothing and wishlisting items on myntra ,it’s almost a hobby for me .Please consider increasing the limit or allowing users to wishlist unlimited items. 9/10 app Btw", "rel": 1}, {"s": "PS", "b": "CHOICE_OVERLOAD", "b2": "", "i": 3, "t": "PURCHASE", "x": "I love this app but please bring back the category section in the wishlist", "rel": 1}, {"s": "RD", "b": "FIT_SIZE", "b2": "RETURN_FRICTION", "i": 3, "t": "PURCHASE", "x": "Pls tell where I can get modest and classy plus size dresses online in India? Should be ideal for Delhi summers and have good return/exchange policy? lol may be I’m asking for too much. Preference- mid length or ankle length.", "rel": 1}, {"s": "RD", "b": "BOOKMARK", "b2": "", "i": 2, "t": "ASPIRATIONAL", "x": "i definitely want a huge gym wardrobe. just a lot of (almost all their collections)gymshark leggings/shorts, sports bras and oversized tees. not crazy about luxury brands but i want to own a pair of louboutins in my life", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 3, "t": "PURCHASE", "x": "It’s good but kindaaaaa overhyped. There’s something very similar in Carlton London, imo of better quality. I have both of them. I use the CL one more", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "i see a lot of people recommending guess and aldo. now this depends on your personal preference but having used both of these brands for my primary handbag over the last few years- i’ve seen a really poor quality of wear and tear. Guess’ hardware starts tarnishing and my aldo bag began peeling. My thought is that if you’re spending 15k on a handbag it should give you atleast 2 years of good wear and not be made completely out of PU which is essentially plastic and functionally similar to a Zara handbag except for the branding. Please try brands like Da milano, tan and loom, and behno for a long lasting gift", "rel": 1}, {"s": "RD", "b": "SOCIAL_PROOF", "b2": "", "i": 3, "t": "PURCHASE", "x": "This is really helpful. I have used Aldo and didn’t really like the quality so I recommended Guess. Haven’t really used them but have been eyeing for a while….but this is really helpful. Thanks a lot!!", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "I have used bags from Chales & Keith, MK, Aldo, Steve madden, H&M, Mango, UCB, Guess. My honest opinion: Worst quality - Aldo & Mango. The leather started shedding within 6 months. I suggest you go for Charles & Keith or Michael Kors. C&K you will get lots and lots of options under 15k MK you will get 2-3 options under 15k.", "rel": 1}, {"s": "RD", "b": "SOCIAL_PROOF", "b2": "STYLING", "i": 3, "t": "PURCHASE", "x": "You can checkout the Acloset app, where you can create and share outfits", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 2, "t": "PURCHASE", "x": "hii, this might be a very underrated brand I am recommending and I hope it stays so cuz I really really like them but max fashion has amazingggg linen and cotton linen blend clothes- I shopped them from the first time in June and I genuinely loved their quality and collection. they have everything- shirts, tops and trousers for women in linen and very affordable and often have discounts on them, altho I shopped from their store, but they sell all the pieces on their website as the salesperson told me. I genuinely vouch for them!!!! ig they are on amazon too", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "Oh. Thanks. I'll go to their store in my city and check them out with my eyes and hands. I feel with max quality can be hit or miss. I never knew they had linen as well. I prefer pure cotton and linens rather than blends though. But I'll go and check if they have anything good that I like.", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 2, "t": "PURCHASE", "x": "ohh i totally agree with you, i myself had no idea they would’ve linen clothes in their summer collection but somehow they did, also i went shopping with my mom who is kinda an expert when it comes to fabrics so idk she was the one who helped me pick up good pieces. i got my dad a couple of shirts as well so i’d suggest you check out their men’s shirts if you have no problem wearing those, they are really nice. and idk about other clothes but the ones i got specifically are all pure cotton, khadi cotton and linens. just to save yourself some time and energy check out their website too once before you go, might give you an idea about what you might find and if it even goes with your aesthetics, i didn’t do that so had to spend a lot of time browsing products in the store", "rel": 1}, {"s": "RD", "b": "PRICE_WAIT", "b2": "VALUE_DOUBT", "i": 4, "t": "PURCHASE", "x": "500-1000 would be ideal, that way I could get a few of them together, but I've seen the prices, if I want good quality nothing remotely good is below 1300-1500 minimum. If I want something long lasting the prices are like 2000-3000. I have been eyeing M&S and mango shirts, also got my eye on uniqlo, but will have to wait for some good discounts. I'll check out Westside as you suggested. Might get lucky there. Thanks for suggestions.", "rel": 1}, {"s": "RD", "b": "FIT_SIZE", "b2": "", "i": 3, "t": "PURCHASE", "x": "Yeah, that's about right on the prices. It's discount season currently and I have decent collections in the malls near me. Be sure to go in person if you can and browse through the racks yourself. And don't limit yourself to size. I've ended up purchasing oversized stuff too if it's on discount because I can just get those tailored to fit better. As for Westside, look for their Studio or Giva sub-brands. You'll still need to do some browsing, but in my experience, clothing in white/beige/blue/pale yellow usually ends up being cotton or linen.", "rel": 1}, {"s": "RD", "b": "RETURN_FRICTION", "b2": "", "i": 2, "t": "PURCHASE", "x": "I hv ordered from Tatacliq, the nearest Westside is 300km from my house😂, it’s arriving today bro, let them come, I can always return right if Tatacliq allows! I will probably go with the dual strap Arizona types", "rel": 1}, {"s": "RD", "b": "SOCIAL_PROOF", "b2": "QUALITY_TRUST", "i": 5, "t": "PURCHASE", "x": "Can u show me brother how it actually looks on feet? I hate crocs look, I fear these will be no different! The cork material I hv heard settles with time", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "Now it is clear that I am returning them😂, they look like crocs only! Cheap dupes of Birkens", "rel": 1}, {"s": "RD", "b": "RETURN_FRICTION", "b2": "", "i": 3, "t": "UNCLEAR", "x": "What do u suggest me to do? Should I reject the delivery or should I check first and then place a return?", "rel": 1}, {"s": "RD", "b": "BOOKMARK", "b2": "", "i": 3, "t": "UNCLEAR", "x": "Those earrings have been on my wishlist for so long!!!", "rel": 1}, {"s": "RD", "b": "SOCIAL_PROOF", "b2": "STOCK_DECAY", "i": 3, "t": "PURCHASE", "x": "What color would you suggest? My favorite is wine but this dress wasn't available in that color 🥲", "rel": 1}, {"s": "RD", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "All these brands from jaipur selling suits for sub 5k. Have gaarbaagé quality. All of them.", "rel": 1}, {"s": "RD", "b": "FIT_SIZE", "b2": "RETURN_FRICTION", "i": 5, "t": "PURCHASE", "x": "True, Even I had ordered 2 oversized Tshirt and Both had different lengths. And returning process is retarded as fuq. The first time I got them, it was good and consistent but now they are straight up trash.", "rel": 1}, {"s": "RD", "b": "FIT_SIZE", "b2": "", "i": 4, "t": "PURCHASE", "x": "Ppl were recommending to buy +1 your usual size...will it be right??", "rel": 1}, {"s": "RD", "b": "STYLING", "b2": "", "i": 2, "t": "PURCHASE", "x": "Pretty good, can pair it with light blue jeans or even dark blue", "rel": 1}, {"s": "YT", "b": "VALUE_DOUBT", "b2": "", "i": 3, "t": "ASPIRATIONAL", "x": "i olways get a smile on my face when uh drop new vid!!!! whislist is full of ua recos waiting to earna nd buy all", "rel": 1}, {"s": "YT", "b": "CHOICE_OVERLOAD", "b2": "", "i": 3, "t": "PURCHASE", "x": "Always a treat to see ur videos...As a matter of fact I added all kurta sets of todays vidro in my wishlist, wud buy few of them for sure... PLZ DO TAKE a LOT of CARE of urself while keeping urself busy in making hauls for us...This is one of the beautiful journey dearest in which u r in😊", "rel": 1}, {"s": "YT", "b": "FIT_SIZE", "b2": "", "i": 5, "t": "PURCHASE", "x": "Your height?? Just to get the idea of length of these suits on me", "rel": 1}, {"s": "YT", "b": "QUALITY_TRUST", "b2": "", "i": 3, "t": "PURCHASE", "x": "Is this a sponsored video? You usually give genuine reviews of the outfits.", "rel": 1}, {"s": "YT", "b": "CHOICE_OVERLOAD", "b2": "", "i": 4, "t": "PURCHASE", "x": "Bhai ...my my ....😢confuse hi kar diya aaj k collection ne ...kaun sa lu ...kaunsa nhi😱 really stunning collection ❤🎉", "rel": 1}, {"s": "YT", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "Your videos r the best .Varanga material is not satisfactory... tried few times", "rel": 1}, {"s": "YT", "b": "QUALITY_TRUST", "b2": "", "i": 4, "t": "PURCHASE", "x": "plz exchange last vishudh kurti coz i already buy it. it fed its color a lot.", "rel": 1}, {"s": "YT", "b": "CHOICE_OVERLOAD", "b2": "", "i": 3, "t": "PURCHASE", "x": "Yes one more haul please…hard to choose one from your hauls❤", "rel": 1}, {"s": "YT", "b": "FIT_SIZE", "b2": "", "i": 4, "t": "PURCHASE", "x": "Mam ​ @amillionbuckstyle apki height ??", "rel": 1}, {"s": "YT", "b": "CHOICE_OVERLOAD", "b2": "", "i": 4, "t": "PURCHASE", "x": "Mujhe aaj k haul k sare kurta set boht ache lge ❤❤😅 can't choose between them😊all are so sooo good 👍🏻😊❤ You are too good at choosing ❤❤❤", "rel": 1}, {"s": "YT", "b": "FIT_SIZE", "b2": "", "i": 4, "t": "PURCHASE", "x": "Can you tell me your height please", "rel": 1}, {"s": "YT", "b": "STOCK_DECAY", "b2": "", "i": 3, "t": "PURCHASE", "x": "Nice collection. The yellow one is so beautiful yet simple. But it is out of stock.", "rel": 1}, {"s": "YT", "b": "BOOKMARK", "b2": "", "i": 2, "t": "BOOKMARK", "x": "Yellow floral kurta set 💛 Is a stand out piece Added to my wishlist already🌼", "rel": 1}, {"s": "YT", "b": "QUALITY_TRUST", "b2": "", "i": 5, "t": "PURCHASE", "x": "Hello There is no doubt you come to with a lot of pieces from myntra on all kinds of clothing. Inspired by the videos i ordered quite a few pieces. I have ordered the yellow kurta from this haul but it's very transparent and does not look as good as it appears on the camera. I have experienced this with other pieces too. Try and give more quality appropriate pieces....", "rel": 1}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "Myntra always have wonderful things and great quality no doubt", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "iam very angry my rakhi not delever on time pls you also get the follow up why things return ,your delivery man not responding on call ,you didn't know about rakhi's feeling when it not reach on time ,my brother call and also watsup you but you never responded so I never choose rakhi online sorry", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "first of all i did not like to purchase clothes by online app. because I had some doubt about products quality and fake products. But Myntra change my thoughts 360 degree. I get good product and in very good price. totally value for money.", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "⭐⭐⭐⭐⭐ Excellent Shopping Experience! I’ve had a great experience shopping on Myntra. The app is easy to use, there is a huge variety of clothes, footwear, and accessories, and there are many brands to choose from. The products are generally good quality, and the discounts and offers make shopping more affordable. Delivery is convenient, and the return/exchange process is simple. Overall, Myntra is one of my favourite online fashion shopping platforms. Highly recommended!", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "Great shopping experience with Myntra! The product quality was good, the packaging was neat, and the delivery was on time. The product looked exactly like the pictures and the overall experience was smooth. The app is also easy to use, with plenty of options to choose from. Definitely recommended! 👍", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "Very disappointing experience with Myntra. I received my Big Foz ankle-length boots on 12th Aug and requested a refund due to poor quality. The pickup agent collected both the boots and my jeans on 17th Aug, but I received a refund only for the jeans. The agent falsely reported that he didn’t collect the boots. I’ve been trying to contact customer support for 2 weeks with no proper response. No refund, no update, and no resolution. Really shameful customer service and a total disappointment.", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "Really happy with my Myntra shopping experience. The products are good quality, exactly as shown, and there’s a great variety to choose from.", "rel": 0}, {"s": "PS", "b": "", "b2": "", "i": 0, "t": "", "x": "nice quality and it's in worth it price", "rel": 0}, {"s": "RD", "b": "", "b2": "", "i": 0, "t": "", "x": "How is it a 'wishlist' after we buy them? XD", "rel": 0}, {"s": "RD", "b": "", "b2": "", "i": 0, "t": "", "x": "Don't know about the rest, but can definitely help you with oversized tees. We can personalise the prints as per your request and send it to you without evaporating your wallet. Let me know if you're interested 😄", "rel": 0}, {"s": "RD", "b": "", "b2": "", "i": 0, "t": "", "x": "But da milano has no style. They have super ugly pieces", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Always a treat to just see and hear you! Apart from your brilliant suggestions!!!👌🏼👌🏼👏🏼", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Hi...love your content❤, u have amazing style ideas. Please make a video on Uniqlo, may be a haul video or styling ideas video. It's a request. 😊", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "They all r so good now they all r in my cart 😭😭😭😭❤❤❤❤", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Hye Hiee!! So, today i have 10 Straight Kurtas for College & Office Purpose or you can wear them on daily basis as well.. All these are under 500/- and has the best quality of each of them..", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Every kurta set is a masterpiece....and as always you look like a million bucks style😅....one more haul from them pls pls", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Beautiful collection once again 😍 I like that your selection of outfits cause they are different from other youtube creators who show the same trending outfits. I like your taste and awesome style. ❤", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "I know, I know! I'm working on bringing you more Indo era styles! 💖", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Love health to all. Everyone loves kurtas irrespective of age. Great videos. Stay smiling courageous blessed. Jazz up style up sd keep smiling💗. Stay confident and love urself", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Beautiful beautiful suit sets and u have styled them and made them shine through ❤❤❤❤❤❤. Thank you Manmeet ❤", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "I love you manmeet for bringing such beautiful kurta et hauls really love ved it my YouTube downloads are filled with your haul video and it's worth it ❤❤❤", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Love it ❤️Do some knee length dresses and sleeveless kurta sets haul", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Can you make a haul on modest party wear chic mid size dresses ❤", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "hello manmeet bhatia how r u very beautiful video very nice sangia try on haul cotton kurta sets from myntya beautiful collection best collection beautiful colour beautiful design aap bauth koobsurat lag raha ho awesome look beautiful style love you your look beautiful outfits", "rel": 0}, {"s": "YT", "b": "", "b2": "", "i": 0, "t": "", "x": "Sure, I already have shot a lot of content, so will bring this one as soon as I possibly can. Thank you for the suggestion.", "rel": 0}];

const C = {
  paper: "#FBFAF7", card: "#FFFFFF", ink: "#191817", ink2: "#57544E",
  ink3: "#8C877E", rule: "#E2DED6", rule2: "#EFEDE7", thread: "#B4432F",
};

const TAX = {
  FIT_SIZE:        { label: "Fit & size uncertainty",        color: "#1F3A5F", money: false },
  STYLING:         { label: "Styling uncertainty",           color: "#4A78A8", money: false },
  SOCIAL_PROOF:    { label: "Needs someone's opinion",       color: "#8FB3D9", money: false },
  QUALITY_TRUST:   { label: "Quality / photo-vs-reality",    color: "#6B4E71", money: false },
  CHOICE_OVERLOAD: { label: "Too many saved to decide",      color: "#9B7BA8", money: false },
  OCCASION_DRIFT:  { label: "No occasion yet",               color: "#C97B2C", money: false },
  STOCK_DECAY:     { label: "Size gone on return visit",     color: "#E0A458", money: false },
  RETURN_FRICTION: { label: "Return hassle if wrong",        color: "#4A5D52", money: false },
  VALUE_DOUBT:     { label: "Unsure it's worth the price",   color: "#8A9A8B", money: false },
  PRICE_WAIT:      { label: "Waiting for a sale",            color: "#A64B4B", money: true  },
  BOOKMARK:        { label: "Bookmark, not intent",          color: "#7A7873", money: false },
  OTHER:           { label: "Other",                          color: "#B8B5AE", money: false },
};

const INTENT = { PURCHASE: "Real purchase intent", BOOKMARK: "Bookmarking / moodboard",
                 ASPIRATIONAL: "Aspirational, no near-term intent", UNCLEAR: "Unclear" };
const SRC = { PS: "Play Store", RD: "Reddit", YT: "YouTube" };

/* Rules classifier — used only for text a reviewer pastes in.
   Labelled as such in the UI; the corpus results are LLM-coded. */
const RULES = [
  ["FIT_SIZE",        /\b(size|sizing|fit|fits|fitting|length|height|body (shape|type)|measurement|tall|short|runs (small|large)|size up|size chart)\b/i],
  ["QUALITY_TRUST",   /\b(fabric|material|quality|sheer|transparent|see.?through|opaque|photo|picture|camera|looks different|cheap|thin)\b/i],
  ["CHOICE_OVERLOAD", /\b(too many|can.?t (decide|choose)|confus|overwhelm|compare|comparing|shortlist|which one|so many)\b/i],
  ["SOCIAL_PROOF",    /\b(opinion|ask(ed|ing)? (my|a)|friend|sister|suggest|advise|show me|does (this|it) suit|what do you think)\b/i],
  ["RETURN_FRICTION", /\b(return|exchange|refund|pickup|send.? back)\b/i],
  ["STOCK_DECAY",     /\b(out of stock|sold out|unavailable|gone)\b/i],
  ["PRICE_WAIT",      /\b(sale|discount|eors|price drop|wait(ing)? for|cheaper)\b/i],
  ["VALUE_DOUBT",     /\b(worth it|worth the|expensive|overpriced|value for)\b/i],
  ["OCCASION_DRIFT",  /\b(occasion|wedding|festival|diwali|party|event|no chance to wear)\b/i],
  ["STYLING",         /\b(pair|style it|goes with|what to wear|match(es|ing)? with)\b/i],
  ["BOOKMARK",        /\b(mood ?board|window shop|just saving|never (meant|intend)|for later|wishlist for so long)\b/i],
];
const NOISE = /\b(deliver|courier|payment failed|app crash|login|otp|refund not received)\b/i;

function classify(text) {
  const t = text.trim();
  if (t.split(/\s+/).length < 6) return null;
  if (NOISE.test(t) && !/wishlist|saved|size|fabric/i.test(t)) return { rel: 0 };
  const hits = RULES.filter(([, re]) => re.test(t));
  if (!hits.length) return { rel: 0 };
  const strong = /\b(never|always|hate|gave up|stopped|so long|months|every time|can.?t)\b/i.test(t);
  return { rel: 1, b: hits[0][0], b2: hits[1] ? hits[1][0] : "",
           i: Math.min(5, 2 + hits.length + (strong ? 1 : 0)),
           t: /\b(mood ?board|window shop|never meant)\b/i.test(t) ? "BOOKMARK" : "PURCHASE", x: t, s: "IN" };
}

const Mono = ({ children, style, ...p }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", ...style }} {...p}>{children}</span>
);
const Eyebrow = ({ n, children }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
    <Mono style={{ fontSize: 10, letterSpacing: ".14em", color: C.thread, fontWeight: 600 }}>{n}</Mono>
    <Mono style={{ fontSize: 10, letterSpacing: ".14em", color: C.ink3, textTransform: "uppercase" }}>{children}</Mono>
    <div style={{ flex: 1, height: 1, background: C.rule }} />
  </div>
);

export default function Engine() {
  const [stage, setStage] = useState(0);         // 0 idle, 1..4 running, 5 done
  const [prog, setProg] = useState(0);
  const [rows, setRows] = useState(null);
  const [wMoney, setWMoney] = useState(0.15);
  const [open, setOpen] = useState(null);
  const [paste, setPaste] = useState("");
  const resRef = useRef(null);

  function run(records, live) {
    setStage(1); setProg(0); setRows(null); setOpen(null);
    let p = 0;
    const timer = setInterval(() => {
      p += 4 + Math.random() * 7;
      setProg(Math.min(100, Math.round(p)));
      setStage(p < 25 ? 1 : p < 55 ? 2 : p < 85 ? 3 : 4);
      if (p >= 100) {
        clearInterval(timer);
        setRows(records); setStage(5);
        setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }, 130);
  }

  function runPasted() {
    const recs = paste.split("\n").map((l) => l.trim()).filter(Boolean)
      .map((l) => { const m = l.match(/^(PS|RD|YT)\t(.*)$/); const text = m ? m[2] : l;
                    const c = classify(text); return c ? { ...c, x: text, s: m ? m[1] : "IN" } : { rel: 0, x: text, s: "IN" }; });
    if (recs.length) run(recs, true);
  }

  const a = useMemo(() => {
    if (!rows) return null;
    const rel = rows.filter((r) => r.rel);
    const out = Object.keys(TAX).map((k) => {
      const prim = rel.filter((r) => r.b === k);
      const n = prim.length, freq = rel.length ? n / rel.length : 0;
      const inten = n ? prim.reduce((s, r) => s + r.i, 0) / n : 0;
      const w = TAX[k].money ? wMoney : 1;
      return { k, ...TAX[k], n, freq, inten, score: freq * (inten / 5) * w * 100, recs: prim };
    }).filter((r) => r.n).sort((x, y) => y.score - x.score);
    const intents = Object.keys(INTENT).map((k) => ({ k, label: INTENT[k], n: rel.filter((r) => r.t === k).length }));
    return { rel, noise: rows.length - rel.length, rows: out, intents, max: out[0]?.score || 1, total: rows.length };
  }, [rows, wMoney]);

  const STAGES = [
    ["01", "Relevance filter", "drops delivery, payment and praise noise"],
    ["02", "Taxonomy extraction", "12 blocker classes, primary and secondary"],
    ["03", "Attribute coding", "intensity, intent type, source"],
    ["04", "Opportunity scoring", "frequency × intensity × addressability"],
  ];

  function exportCsv() {
    if (!rows) return;
    const body = rows.map((r) => [r.s, r.rel, r.b || "", r.b2 || "", r.i || "", r.t || "", r.x]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([["source,relevant,blocker,secondary,intensity,intent,text", ...body].join("\n")], { type: "text/csv" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(blob); el.download = "coded_corpus.csv"; el.click();
  }

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.ink, paddingBottom: 64 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600&display=swap');
        *{box-sizing:border-box} body{margin:0}
        .wsl{font-family:'Instrument Sans',system-ui,sans-serif}
        .wsl button:focus-visible,.wsl textarea:focus-visible{outline:2px solid ${C.thread};outline-offset:2px}
        .grow{animation:g .5s cubic-bezier(.2,.7,.2,1) both;transform-origin:left}
        @keyframes g{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .fade{animation:f .4s ease both}
        @keyframes f{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @media(prefers-reduced-motion:reduce){.grow,.fade{animation:none!important}}
      `}</style>

      <div className="wsl" style={{ maxWidth: 940, margin: "0 auto", padding: "0 20px" }}>
        <header style={{ paddingTop: 44, paddingBottom: 26, borderBottom: `2px solid ${C.ink}` }}>
          <Mono style={{ fontSize: 10, letterSpacing: ".18em", color: C.thread, fontWeight: 600 }}>
            AI DISCOVERY ENGINE · MYNTRA GROWTH
          </Mono>
          <h1 style={{ fontSize: 40, lineHeight: 1.02, margin: "14px 0 12px", fontWeight: 600, letterSpacing: "-.02em" }}>
            Wishlist Signal Lab
          </h1>
          <p style={{ margin: 0, maxWidth: 640, color: C.ink2, fontSize: 15, lineHeight: 1.55 }}>
            Codes public shopper conversations against a wishlist-abandonment taxonomy, then ranks
            blockers by how much addressable conversion they hold. Built on 651 records scraped from
            Play Store, Reddit and YouTube, filtered to 68 pre-purchase records.
          </p>
        </header>

        <section style={{ padding: "22px 0", borderBottom: `1px solid ${C.rule}` }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STAGES.map(([n, t, d], i) => {
              const active = stage >= 1 && stage <= 4 && stage === i + 1;
              const done = stage === 5 || stage > i + 1;
              return (
                <div key={n} style={{ flex: "1 1 200px", border: `1px solid ${active ? C.thread : C.rule}`,
                     background: active ? "#FDF6F4" : C.card, padding: "12px 13px", transition: "all .2s" }}>
                  <Mono style={{ fontSize: 10, color: done || active ? C.thread : C.ink3, fontWeight: 600 }}>
                    {n}{done ? " ✓" : ""}
                  </Mono>
                  <div style={{ fontSize: 13, fontWeight: 600, margin: "5px 0 3px" }}>{t}</div>
                  <div style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.4 }}>{d}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ padding: "26px 0" }}>
          <Eyebrow n="01">Corpus</Eyebrow>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => run(CORPUS)} disabled={stage >= 1 && stage < 5}
              style={{ background: C.ink, color: C.paper, border: "none", padding: "12px 22px",
                       fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {stage >= 1 && stage < 5 ? `Coding… ${prog}%` : "Code the scraped corpus"}
            </button>
            <Mono style={{ fontSize: 11.5, color: C.ink3 }}>{CORPUS.length} records</Mono>
            {rows && (
              <button onClick={exportCsv} style={{ background: "none", border: `1px solid ${C.rule}`,
                       padding: "11px 16px", fontSize: 12.5, cursor: "pointer", color: C.ink2, fontFamily: "inherit" }}>
                Download coded CSV
              </button>
            )}
          </div>
          {stage >= 1 && stage < 5 && (
            <div style={{ height: 3, background: C.rule2, marginTop: 14 }}>
              <div style={{ height: "100%", width: `${prog}%`, background: C.thread, transition: "width .13s" }} />
            </div>
          )}

          <details style={{ marginTop: 20 }}>
            <summary style={{ cursor: "pointer", fontSize: 13, color: C.ink2 }}>Or paste your own records</summary>
            <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.5, margin: "10px 0" }}>
              One record per line. Pasted text is classified by a rules-based pass, not the language
              model — so treat it as a demonstration of the taxonomy rather than the full pipeline.
            </p>
            <textarea value={paste} onChange={(e) => setPaste(e.target.value)} spellCheck={false}
              placeholder="I saved this kurta months ago but I can't tell how long it will be on me…"
              style={{ width: "100%", height: 110, padding: 12, border: `1px solid ${C.rule}`, background: C.card,
                       color: C.ink2, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, lineHeight: 1.7, resize: "vertical" }} />
            <button onClick={runPasted} disabled={!paste.trim()}
              style={{ marginTop: 10, background: "none", border: `1px solid ${C.ink}`, padding: "10px 18px",
                       fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: C.ink, fontFamily: "inherit" }}>
              Code pasted records
            </button>
          </details>
        </section>

        {a && (
          <div ref={resRef}>
            <section className="fade" style={{ padding: "12px 0 30px" }}>
              <Eyebrow n="02">Blocker spectrum</Eyebrow>
              <div style={{ display: "flex", height: 62, border: `1px solid ${C.ink}`, overflow: "hidden" }}>
                {a.rows.map((r) => (
                  <div key={r.k} className="grow" onClick={() => setOpen(open === r.k ? null : r.k)}
                    title={`${r.label} — ${r.n} records`}
                    style={{ width: `${r.freq * 100}%`, background: r.color, cursor: "pointer",
                             borderRight: `1px solid ${C.paper}`, display: "flex", alignItems: "flex-end", padding: 6 }}>
                    <Mono style={{ fontSize: 10, color: "#fff", opacity: .9, fontWeight: 600 }}>{r.freq > .06 ? r.n : ""}</Mono>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, flexWrap: "wrap", gap: 8 }}>
                <Mono style={{ fontSize: 11, color: C.ink3 }}>{a.rel.length} relevant · {a.noise} filtered as noise</Mono>
                <Mono style={{ fontSize: 11, color: C.ink3 }}>click a band for evidence</Mono>
              </div>
            </section>

            <section className="fade" style={{ padding: "12px 0 30px" }}>
              <Eyebrow n="03">Ranked opportunities</Eyebrow>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <Mono style={{ fontSize: 11, color: C.ink2 }}>MONETARY-BLOCKER WEIGHT</Mono>
                <input type="range" min="0" max="1" step=".05" value={wMoney}
                  onChange={(e) => setWMoney(parseFloat(e.target.value))}
                  style={{ width: 150, accentColor: C.thread }} />
                <Mono style={{ fontSize: 11, color: C.ink3 }}>
                  {wMoney.toFixed(2)} — the brief forbids monetary levers, so price-wait is discounted, not deleted
                </Mono>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.ink}` }}>
                    {["Blocker", "n", "Share", "Intensity", "Opportunity"].map((h, i) => (
                      <th key={h} style={{ textAlign: i ? "right" : "left", padding: "0 0 8px", fontWeight: 500 }}>
                        <Mono style={{ fontSize: 10, letterSpacing: ".1em", color: C.ink3, textTransform: "uppercase" }}>{h}</Mono>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.rows.map((r) => (
                    <tr key={r.k} onClick={() => setOpen(open === r.k ? null : r.k)}
                        style={{ borderBottom: `1px solid ${C.rule2}`, cursor: "pointer" }}>
                      <td style={{ padding: "11px 0" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                          <span style={{ width: 11, height: 11, background: r.color, flexShrink: 0 }} />
                          <span style={{ color: r.money ? C.ink3 : C.ink, fontWeight: r.money ? 400 : 500 }}>{r.label}</span>
                          {r.money && <Mono style={{ fontSize: 9.5, color: C.thread, border: `1px solid ${C.thread}`, padding: "1px 5px" }}>OUT OF SCOPE</Mono>}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}><Mono style={{ fontSize: 12 }}>{r.n}</Mono></td>
                      <td style={{ textAlign: "right" }}><Mono style={{ fontSize: 12, color: C.ink2 }}>{(r.freq * 100).toFixed(0)}%</Mono></td>
                      <td style={{ textAlign: "right" }}><Mono style={{ fontSize: 12, color: C.ink2 }}>{r.inten.toFixed(1)}</Mono></td>
                      <td style={{ textAlign: "right", width: 170, paddingLeft: 16 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                          <span style={{ flex: 1, height: 6, background: C.rule2 }}>
                            <span className="grow" style={{ display: "block", height: "100%", width: `${(r.score / a.max) * 100}%`, background: r.color }} />
                          </span>
                          <Mono style={{ fontSize: 12, width: 34, textAlign: "right" }}>{r.score.toFixed(1)}</Mono>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {open && (
                <div className="fade" style={{ marginTop: 16, border: `1px solid ${C.rule}`, background: C.card, padding: 16 }}>
                  <Mono style={{ fontSize: 10, letterSpacing: ".1em", color: C.ink3, textTransform: "uppercase" }}>
                    Evidence · {TAX[open].label}
                  </Mono>
                  <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                    {a.rows.find((r) => r.k === open)?.recs.map((r, i) => (
                      <div key={i} style={{ borderLeft: `2px solid ${TAX[open].color}`, paddingLeft: 12 }}>
                        <div style={{ fontSize: 13, lineHeight: 1.5 }}>{r.x}</div>
                        <Mono style={{ fontSize: 10.5, color: C.ink3 }}>
                          {SRC[r.s] || "Pasted"} · intensity {r.i} · {INTENT[r.t] || r.t}
                        </Mono>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="fade" style={{ padding: "12px 0 30px" }}>
              <Eyebrow n="04">What a save actually means</Eyebrow>
              <p style={{ margin: "0 0 14px", fontSize: 13.5, color: C.ink2, lineHeight: 1.55, maxWidth: 660 }}>
                If most saves were moodboarding, the business metric's denominator would be polluted.
                They are not — the demand is real and stalling.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {a.intents.map((it) => {
                  const pct = a.rel.length ? (it.n / a.rel.length) * 100 : 0;
                  return (
                    <div key={it.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 190, fontSize: 13 }}>{it.label}</div>
                      <div style={{ flex: 1, height: 22, background: C.rule2 }}>
                        <div className="grow" style={{ height: "100%", width: `${pct}%`, background: it.k === "PURCHASE" ? "#1F3A5F" : C.ink3 }} />
                      </div>
                      <Mono style={{ fontSize: 12, width: 62, textAlign: "right", color: C.ink2 }}>{it.n} · {pct.toFixed(0)}%</Mono>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        <footer style={{ paddingTop: 22, borderTop: `1px solid ${C.rule}`, marginTop: 10 }}>
          <Mono style={{ fontSize: 10.5, color: C.ink3, lineHeight: 1.7, display: "block" }}>
            Opportunity = share of relevant records × (mean intensity ÷ 5) × addressability weight × 100.
            Corpus classification was produced by a language model reading each record against the
            taxonomy, then cached — review text changes slowly, so a production system batches this
            rather than calling a model per request.
          </Mono>
        </footer>
      </div>
    </div>
  );
}
