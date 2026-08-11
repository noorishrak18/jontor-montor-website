/* =====================================================================
   JONTOR MONTOR — everything you edit lives in this file
   =====================================================================

   ┌──────────────────────────────────────────────────────────────┐
   │  WANT TO...                          SEARCH FOR (Ctrl+F)     │
   ├──────────────────────────────────────────────────────────────┤
   │  change a price                      TASK: PRICE             │
   │  replace a product photo             TASK: PHOTO             │
   │  add extra photos to a product       TASK: MORE PHOTOS       │
   │  move a product to another category  TASK: MOVE CATEGORY     │
   │  add a brand new product             TASK: NEW PRODUCT       │
   │  hide or delete a product            TASK: HIDE              │
   │  change delivery charges             TASK: DELIVERY          │
   │  change the bKash number             TASK: BKASH             │
   │  change the cancellation window      TASK: CANCEL WINDOW     │
   │  change what's on the homepage       TASK: HOMEPAGE          │
   │  turn the yellow top strip back on   TASK: TOP STRIP         │
   │  see the list of valid categories    TASK: CATEGORY LIST     │
   └──────────────────────────────────────────────────────────────┘

   THE FIVE RULES
     1. Only change words BETWEEN "quote marks".
     2. Every product ends with a comma — except the last one.
     3. Prices go in quotes:  now:"1899"   not  now:1899
     4. Never type a plain " inside a sentence. Use ' instead.
     5. Photo names are case-sensitive: photo.JPG is not photo.jpg

   HOUSE STYLE: we do not put a comma before "and", "but" or "or".
     Write:  fast, cheap and good
     Not:    fast, cheap, and good

   Everything below the line that says "Machinery below" is code.
   You never need to touch it.
   ===================================================================== */

/* ============ 1) EDIT HERE ▸ YOUR BUSINESS DETAILS ============ */
var CONFIG = {
  brand:     "Jontor Montor",
  brandBn:   "যন্তর মন্তর",
  tagline:   "3D Printing · Prototyping · Collectibles — Bangladesh",

  // WhatsApp number: country code + number, digits only (no +, spaces, dashes)
  phone:     "8801601333064",

  email:     "jontormontor.official@gmail.com",
  facebook:  "https://www.facebook.com/share/1BfhpWifUt/",
  instagram: "https://www.instagram.com/jontor.montor?igsh=ZjBpaGNjOWNrMGxq",
  linkedin:  "https://www.linkedin.com/company/jontor-montor/",

  /* ---- TASK: TOP STRIP ----
     The yellow bar across the top of every page. It is OFF.
     Change false to true to bring it back for a sale, then edit
     the announce line underneath. */
  announceOn: false,
  announce:   "Order online — pick your pieces, fill the form, done. COD, bKash & Nagad accepted.",

  /* ---- TASK: DELIVERY — what you charge to deliver (৳) ----
     Plain numbers here, NO quote marks. */
  deliveryDhaka:   70,
  deliveryOutside: 130,

  /* ---- TASK: BKASH — the number customers Send Money to ---- */
  bkashNumber: "01601333064",

  /* ---- Nagad. Set nagadOn to false to hide Nagad at checkout ---- */
  nagadOn:     true,
  nagadNumber: "01601333064",

  /* ---- TASK: CANCEL WINDOW ----
     How many hours a customer may cancel their own order.
     If you change this, change CANCEL_HOURS in the Apps Script too
     or the two will disagree. */
  cancelHours: 1
};

/* ============ 2) EDIT HERE ▸ GOOGLE SHEET ORDER INBOX ============
   Paste the /exec web-app URL you get from Google Apps Script here.
   Full instructions are in SETUP-ORDERS.txt.
   Until you paste it, orders fall back to opening WhatsApp.            */
var ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbybg02MOQH6RMUF97YHugR5AZIWrvsxXAZWUZ78JePrSYpJQeDfFezWFVSyeLHfnwk/exec";

/* ============ 3) EDIT HERE ▸ FAQ (what the chat assistant knows) ====
   q = the question shown as a tappable chip
   k = keywords that trigger this answer (lowercase)
   a = the answer. \n makes a new line.                                */
var FAQ = [
 {q:"How do I order?",
  k:["order","how to order","buy","purchase","checkout","cart","start"],
  a:"Right here on the site — no messaging needed.\nOpen the Shop, tap a piece to see its details, add it to your cart, then hit Checkout. You fill in your name, phone, address and payment method and we get the order instantly."},
 {q:"How do I get a quote?",
  k:["quote","quotation","rfq","custom quote"],
  a:"For anything custom (a part, a model, a character we don't list), use the Get a quote page. We usually reply within a few hours with a price and lead time."},
 {q:"What does it cost?",
  k:["cost","price","pricing","how much","rate","charge","taka"],
  a:"Everything in the Shop has its price listed on the product page.\nCustom jobs are priced individually — it depends on size, material and finishing. Send the details on the Get a quote page and we'll quote it, usually within hours. No obligation."},
 {q:"How fast is delivery?",
  k:["delivery","deliver","shipping","ship","how long","lead time","days","time","fast","when"],
  a:"Inside Dhaka: usually 1–3 days after the print is done.\nAnywhere else in Bangladesh: by courier.\nMade-to-order pieces get a lead time confirmed after you order — average turnaround is about a week."},
 {q:"How do I pay?",
  k:["pay","payment","bkash","nagad","cod","cash","advance","invoice","transaction"],
  a:"At checkout you can pick Cash on delivery, bKash or Nagad.\nFor bKash or Nagad you Send Money to "+"01601333064"+" and paste the Transaction ID into the form — that's what confirms the order.\nCompanies can request an invoice."},
 {q:"What materials can you print?",
  k:["material","materials","pla","petg","abs","asa","tpu","nylon","pa","pc","carbon","cf","resin","filament","plastic","strength"],
  a:"Everyday: PLA / PLA+ and silk/matte finishes. Engineering: PETG, ABS, ASA, PC, plus carbon-fiber blends like PLA-CF and PETG-CF for stiff, matte parts. Flexible: TPU. Nylon (PA/PA-CF) for wear parts on request.\nWe print on an enclosed-chamber machine with automatic multicolor.\nNot sure what fits? Describe how the part will be used and we'll recommend one."},
 {q:"What files do you accept?",
  k:["file","files","format","stl","obj","step","cad","3mf","dwg","sketch","drawing","photo"],
  a:"Best: STL, OBJ, STEP or 3MF files.\nNo CAD file? A drawing, photo or even a clear description works — we can model it for you (small modelling fee depending on complexity)."},
 {q:"Can you do university projects?",
  k:["university","student","thesis","final year","architecture","civil","naval","mechanical","eee","project","model","scale"],
  a:"Yes — that's one of our main services. Scale models for architecture & civil, mechanical assemblies, enclosures for EEE and more.\nStudent rates are available. Send your file or drawing on the Get a quote page."},
 {q:"Do you work with companies?",
  k:["company","corporate","firm","business","bulk","batch","production","prototype","nda","b2b"],
  a:"Yes — we prototype and produce small batches for companies: enclosures, jigs & fixtures, brackets, product prototypes and presentation models.\nNDA on request, invoice available. Email us the RFQ or use the Get a quote page."},
 {q:"Is my design confidential?",
  k:["confidential","nda","secret","privacy","protect","ip"],
  a:"Yes. Client files are never shared or reused and we're happy to sign an NDA before you send anything."},
 {q:"Can you make something not on the site?",
  k:["custom","not on","anything","request","specific","character","figure","gift"],
  a:"Almost certainly — most of what we make started as a customer request.\nName the character, prop or part on the Get a quote page and we'll tell you if it's printable and what it costs."},
 {q:"Where are you located?",
  k:["located","location","where","address","dhaka","bangladesh","visit","shop"],
  a:"We're based in Bangladesh and deliver nationwide. You can order entirely through this website — no walk-in showroom yet."}
];

/* =====================================================================
   4) YOUR PRODUCTS
   =====================================================================

   ------------------------------------------------------------------
   TASK: CATEGORY LIST — the only values that work
   ------------------------------------------------------------------
   Copy-paste these. A typo does NOT show an error — the product just
   quietly disappears from that tile. Capitals and spaces matter.
   "Marvel & DC" is not "Marvel and DC".

   fandom: must be exactly one of
        "Anime"            "Harry Potter"      "Marvel & DC"
        "Star Wars"        "Movies & TV"       "Gaming"
        "Sci-Fi"           "Amigurumi"         "Bangladesh"
        "Home decor"       "Flexi"
     (the last two have no tile yet — they show under All products)

   type: must be exactly one of
        "Katana"           "Figure"            "Bust"
        "Headphone stand"  "Cosplay mask"      "Keychain"
        "Wand or prop"     "Flexi / articulated"
        "Home decor"       "Amigurumi"         "Display"

   ------------------------------------------------------------------
   TASK: MOVE CATEGORY — put a product somewhere else
   ------------------------------------------------------------------
   Change the fandom: and/or type: value. That is the whole job —
   nothing else needs touching, the shop page re-sorts itself.

   Example: the Poké Ball is under Gaming. To move it to Anime,
   find it and change

        fandom:"Gaming",        ->      fandom:"Anime",

   A product has ONE fandom and ONE type. To show something in two
   places you would need two entries with different names.

   ------------------------------------------------------------------
   TASK: PHOTO — replace a product's picture
   ------------------------------------------------------------------
   1. Upload the new photo to the images folder on GitHub.
      Lowercase, hyphens not spaces:  katana-zenitsu-new.jpg
   2. Change the img: line to point at it:

        img:"images/katana-zenitsu.jpg"
                    ^^^^^^^^^^^^^^^^^^ just this filename

   EASIEST TRICK: give the new photo the EXACT same filename as the
   old one and upload it over the top. Then you change nothing in
   this file at all. (You will need Ctrl+Shift+R to stop your
   browser showing the cached old picture.)

   If the product also has an imgs: list, update the filename there
   too — otherwise the gallery still shows the old photo.

   ------------------------------------------------------------------
   TASK: MORE PHOTOS — extra angles on the details page
   ------------------------------------------------------------------
   Add an imgs: line. First photo in the list is the one on the
   shop card. Include the main photo in the list too.

        imgs:["images/katana-zenitsu.jpg",
              "images/katana-zenitsu-2.jpg",
              "images/katana-zenitsu-hilt.jpg"],

   No imgs: line = the product just uses its single img:. Fine.

   ------------------------------------------------------------------
   TASK: NEW PRODUCT / TASK: PRICE / TASK: HIDE
   ------------------------------------------------------------------
   NEW PRODUCT: copy a whole block below (from { to },), paste it
   underneath, then edit every field. Keep the comma on the end.

   PRICE: now: is today's price, was: is the crossed-out one.
          The -25% badge works itself out. For no discount: was:""

   HIDE:  put // in front of every line of that product. It stops
          showing but you keep the text. Safer than deleting.

   ------------------------------------------------------------------
   WHAT EVERY FIELD DOES — annotated example
   ------------------------------------------------------------------
   {name:   "Zenitsu Nichirin Katana",     the big title
    sub:    "Anime · Demon Slayer",        small grey line under it
    fandom: "Anime",                       which TILE it lives under
    type:   "Katana",                      which CHIP it lives under
    badge:  "stock",                       "stock" or "order" only
    now:    "1899",                        price today, in quotes
    was:    "2399",                        old price, "" for none
    img:    "images/katana-zenitsu.jpg",   the shop card photo
    imgs:   [...],                         OPTIONAL extra photos
    desc:   "...",                         OPTIONAL paragraph
    specs:  ["...","..."]},                OPTIONAL bullet points

   Required: name, fandom, type, badge, now, img.
   The rest are optional and can be left out entirely.
   ===================================================================== */

var PRODUCTS = [
 {name:"Zenitsu Nichirin Katana", sub:"Anime · Demon Slayer", fandom:"Anime", type:"Katana", badge:"stock", now:"1899", was:"2399", img:"images/katana-zenitsu.jpg",
  imgs:["images/katana-zenitsu.jpg","images/hero-zenitsu.jpg"],
  desc:"Agatsuma Zenitsu's lightning-pattern Nichirin blade, printed in sections and bonded into a near-seamless full-length katana. Comes with a display stand. Hand-finished and painted to match the anime's yellow-white lightning motif.",
  specs:["Roughly 100 cm assembled","Display stand included","PLA+ · hand-painted finish","Display piece — not a real blade"]},

 {name:"Shinobu Nichirin Katana", sub:"Anime · Demon Slayer", fandom:"Anime", type:"Katana", badge:"stock", now:"1899", was:"2399", img:"images/katana-shinobu.jpg",
  desc:"Kocho Shinobu's distinctive thin needle-point Nichirin blade with the butterfly guard. Printed in sections, bonded, sanded and painted in her signature lavender-to-white gradient. Display stand included.",
  specs:["Roughly 100 cm assembled","Butterfly tsuba detail","PLA+ · hand-painted finish","Display piece — not a real blade"]},

 {name:"Wado Ichimonji Katana", sub:"Anime · One Piece", fandom:"Anime", type:"Katana", badge:"stock", now:"1899", was:"2399", img:"images/katana-onepiece.jpg",
  desc:"Zoro's white-sheathed Wado Ichimonji from One Piece — the Meito he carries for Kuina. Clean white saya, round guard, printed and finished for shelf or wall display. Stand included.",
  specs:["Roughly 100 cm assembled","White saya finish","PLA+ · hand-painted finish","Display piece — not a real blade"]},

 {name:"Elder Wand replica", sub:"Harry Potter · prop", fandom:"Harry Potter", type:"Wand or prop", badge:"order", now:"1099", was:"1499", img:"images/wand-elder.jpg",
  desc:"The Deathstick — knobbled elder wood with its distinctive segmented nodes, printed at high detail and finished with a wood-grain paint treatment. Made to order in the finish you pick.",
  specs:["Roughly 38 cm","Fine layer height for node detail","Wood-effect hand finish","Made to order · 4–7 days"]},

 {name:"Harry Potter Wand (boxed)", sub:"Harry Potter · prop", fandom:"Harry Potter", type:"Wand or prop", badge:"order", now:"1199", was:"1599", img:"images/wand-harry.jpg",
  desc:"Harry's holly-and-phoenix-feather wand with the ribbed handle, presented in an Ollivanders-style box — the reason this one makes such a good gift. Made to order.",
  specs:["Roughly 35 cm","Presentation box included","Wood-effect hand finish","Made to order · 4–7 days"]},

 {name:"Kratos Headphone Stand", sub:"Gaming · God of War", fandom:"Gaming", type:"Headphone stand", badge:"stock", now:"2989", was:"3999", img:"images/kratos-stand.jpg",
  imgs:["images/kratos-stand.jpg","images/hero-kratos.jpg"],
  desc:"Kratos in full Spartan detail, doubling as a weighted headphone stand. The shoulder and axe geometry cradle the headband so nothing slips. One of our most-requested desk pieces.",
  specs:["Roughly 28 cm tall","Fits most over-ear headsets","Weighted base — won't tip","PLA+ · hand-painted"]},

 {name:"Spider-Man Headphone Stand", sub:"Marvel · headphone stand", fandom:"Marvel & DC", type:"Headphone stand", badge:"stock", now:"2489", was:"2999", img:"images/spiderman-stand.jpg",
  desc:"Spider-Man mid-crawl, arm arched to hold your headset. Printed in multi-colour so the red-and-blue suit and web lines come out of the printer already detailed, then cleaned and sealed.",
  specs:["Roughly 26 cm tall","Fits most over-ear headsets","Multi-colour print","Weighted base"]},

 {name:"Batman Cosplay Mask", sub:"DC · wearable", fandom:"Marvel & DC", type:"Cosplay mask", badge:"order", now:"1699", was:"2199", img:"images/batman-mask.jpg",
  desc:"Wearable cowl printed to a comfortable adult head size, with the interior smoothed and a matte black finish. Tell us your head circumference when you order and we scale it to fit you.",
  specs:["Scaled to your head size","Matte black finish","Padded interior on request","Made to order · 5–8 days"]},

 {name:"Poké Ball (openable)", sub:"Gaming · Pokémon", fandom:"Gaming", type:"Figure", badge:"stock", now:"699", was:"899", img:"images/pokeball.jpg",
  desc:"A proper hinged Poké Ball that actually clicks open and shut — printed in red, white and black without a drop of paint, thanks to multi-colour printing. Big enough to keep small things in.",
  specs:["Roughly 7.5 cm diameter","Hinged, opens and latches","Multi-colour print, no paint","Hollow inside"]},

 {name:"Squid Game Figure", sub:"Movies & TV · Squid Game", fandom:"Movies & TV", type:"Figure", badge:"order", now:"899", was:"1200", img:"images/squidgame.jpg",
  desc:"The masked guard in the green tracksuit, printed as a clean desk figure. Made to order in the mask shape you want — circle, triangle or square.",
  specs:["Roughly 15 cm tall","Pick your mask symbol","PLA · painted finish","Made to order · 4–6 days"]},

 {name:"Demogorgon Figure", sub:"Movies & TV · Stranger Things", fandom:"Movies & TV", type:"Figure", badge:"stock", now:"799", was:"1100", img:"images/demogorgon.jpg",
  desc:"The petal-faced Demogorgon mid-roar. Printed at a fine layer height so the splayed face and limb texture read properly up close — this is a piece people pick up and inspect.",
  specs:["Roughly 16 cm tall","Fine layer height for texture","PLA · painted finish","Supplied on a base"]},

 {name:"Rocky — Project Hail Mary", sub:"Sci-Fi · figure", fandom:"Sci-Fi", type:"Figure", badge:"stock", now:"189", was:"400", img:"images/hailmary.jpg",
  desc:"Rocky, the five-legged Eridian engineer from Project Hail Mary. A small desk piece for the people who read the book and immediately wanted one. Fist my bump, amaze.",
  specs:["Roughly 8 cm","Desk / shelf scale","PLA","Great low-cost gift"]},

 {name:"Groot Keychain", sub:"Marvel · keychain", fandom:"Marvel & DC", type:"Keychain", badge:"stock", now:"299", was:"450", img:"images/groot-key.jpg",
  desc:"Baby Groot as a pocket-sized keychain with a metal ring fitted through a printed loop. Tough enough to live on a set of keys rather than a shelf.",
  specs:["Roughly 5 cm","Metal split ring included","Solid infill — won't snap","Pick your colour"]},

 {name:"Articulated Snake (flexi)", sub:"Flexi · fidget", fandom:"Flexi", type:"Flexi / articulated", badge:"stock", now:"349", was:"500", img:"images/snake-flexi.jpg",
  desc:"Prints in one piece and comes off the bed already moving — every segment articulates, so it coils, slithers and sits over a monitor. The classic desk fidget and a genuinely good demo of what the printer can do.",
  specs:["Roughly 22 cm long","Fully articulated, no assembly","Multi-colour options","Great for kids"]}
];

/* ---- ROOM DECOR & STATEMENT PIECES ----
   Same fields and same rules as PRODUCTS above. These also appear in
   the main shop grid — they are only listed separately so you can
   find them easily. */
var DECOR = [
 {name:"Buddha Statue", sub:"Statue · home decor", fandom:"Home decor", type:"Home decor", badge:"order", now:"1299", was:"1699", img:"images/buddha.jpg",
  desc:"A seated Buddha finished to look like carved stone rather than plastic — the surface is sanded and treated so the light catches it properly. A calm, weighty-looking piece for a shelf, entryway or studio corner.",
  specs:["Roughly 20 cm tall","Stone-effect hand finish","Pick your finish colour","Made to order · 5–8 days"]},

 {name:"Venom Bust", sub:"Marvel · display bust", fandom:"Marvel & DC", type:"Bust", badge:"order", now:"1799", was:"2299", img:"images/venom-bust.jpg",
  desc:"Venom mid-snarl as a display bust — all teeth, tongue and tendon detail. Printed at a fine layer height because this piece lives or dies on the mouth. Comes on a plinth.",
  specs:["Roughly 18 cm tall","Plinth included","Gloss black finish","Made to order · 5–8 days"]},

 {name:"Darth Vader Helmet", sub:"Star Wars · display", fandom:"Star Wars", type:"Display", badge:"order", now:"2499", was:"2999", img:"images/vader-helmet.jpg",
  desc:"The helmet, printed at display scale with the mask, dome and neck flare as separate pieces then bonded and finished to a deep gloss black. Originally built for a customer request — now a regular.",
  specs:["Display scale, roughly 22 cm","Multi-part, bonded seamless","Gloss black finish","Made to order · 6–10 days"]}
];

/* ---- AMIGURUMI (handmade crochet) ----
   Simpler than the others: no fandom or type needed. Both are set
   automatically to "Amigurumi". You only give name, prices, img
   and desc. Extra photos work here too — add an imgs: line. */
var AMI = [
 {name:"লক্ষ্মী প্যাঁচা · Owl", now:"239", was:"470", img:"images/ami-owl.jpg",
  desc:"The lokkhi pyacha owl, handmade in soft yarn — a Bengali good-luck figure that sits happily on a desk or shelf. Handmade, so no two are identical."},
 {name:"সুখ পাখি · Bird", now:"319", was:"550", img:"images/ami-bird.jpg",
  desc:"A plump little sukh pakhi in bright yarn. Soft, squeezable and small enough to sit on a monitor or a bedside table."},
 {name:"মন্টু হাতি · Elephant", now:"289", was:"570", img:"images/ami-elephant.jpg",
  desc:"Montu the elephant — round ears, stubby legs and a very smug expression. A safe gift for basically anyone."},
 {name:"সাগর ঘোড়া · Seahorse", now:"289", was:"570", img:"images/ami-seahorse.jpg",
  desc:"A curled seahorse with a ridged back, crocheted by hand in ocean colours. One of the trickier ones to make and it shows."}
];

/* ---- "YOU WISHED, WE DELIVERED" row on the shop page ----
   These are NOT for sale — they are proof of custom work. No price,
   no cart button. req: is the little caption underneath. */
var WISHED = [
 {name:"CUET FS clapperboard",     req:"Requested by CUET Film Society",  img:"images/cuet.jpg"},
 {name:"John Wick figure",         req:"A customer asked — we made it",   img:"images/johnwick.jpg"},
 {name:"Darth Vader helmet",       req:"Built from a fan's request",      img:"images/vader-helmet.jpg"},
 {name:"Doctor Doom cosplay mask", req:"Made to a buyer's spec",          img:"images/drdoom.jpg"}
];

/* ---- PROJECTS / OUR WORK (homepage) ----
   cat: decides which tab it appears under. Use exactly one of:
        "mech"  Mechanical      "eee"   EEE
        "prod"  Product         "rnd"   Company R&D
   meta: is the three little grey labels under the title. */
var WORKS = [
 {cat:"mech", label:"Mechanical",          title:"Gear & shaft assembly",   meta:["Functional","PETG","Moving parts"], img:"images/proj-gear.jpg"},
 {cat:"eee",  label:"EEE",                 title:"Electronics enclosure",   meta:["Custom fit","PLA","PCB housing"],   img:"images/proj-eee.jpg"},
 {cat:"prod", label:"Product / Industrial",title:"Bracket & mount set",     meta:["Batch","PLA+","Client"],            img:"images/proj-mech.jpg"},
 {cat:"rnd",  label:"Company R&D",         title:"Jig & fixture",           meta:["Assembly aid","Resin","Repeatable"],img:"images/proj-fixture.jpg"},
 {cat:"prod", label:"Product / Industrial",title:"Small-batch parts run",   meta:["x20+","ABS","Production"],          img:"images/proj-parts.jpg"},
 {cat:"mech", label:"Mechanical",          title:"Precision cylinder part", meta:["Prototype","PETG","Test fit"],      img:"images/proj-cylinder.jpg"}
];

/* ---- TASK: HOMEPAGE — the four products on the front page ----
   Just a list of names. Each one must match a product name EXACTLY,
   character for character, including any Bengali text.
   If you rename a product, change it here too or it silently
   vanishes from the homepage. */
var FEATURED_ON_HOME = [
 "Zenitsu Nichirin Katana",
 "Kratos Headphone Stand",
 "Venom Bust",
 "লক্ষ্মী প্যাঁচা · Owl"
];

/* =====================================================================
   Machinery below — you don't need to edit anything under this line.
   ===================================================================== */

var WA = CONFIG.phone.replace(/[^0-9]/g, "");
function waLink(msg){ return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

/* ---------- which page are we on? (works with or without .html) ---------- */
var PAGE_FILE = location.pathname.replace(/\/+$/,"").split("/").pop().toLowerCase().replace(/\.html$/,"");
var IS_HOME   = (PAGE_FILE === "" || PAGE_FILE === "index");
var HOME      = IS_HOME ? "" : "index.html";

/* ---------- the full catalogue, assembled from the lists above ---------- */
function amiAsProduct(a){
  return {name:a.name, sub:"Amigurumi · handmade", fandom:"Amigurumi", type:"Amigurumi",
          badge:"stock", now:a.now, was:a.was, img:a.img, desc:a.desc,
          specs:["Handmade crochet","Roughly 12–16 cm","Soft yarn, fibre filled","Colours may vary slightly"]};
}
var CATALOG = PRODUCTS.concat(DECOR).concat(AMI.map(amiAsProduct));
function findProduct(name){
  for(var i=0;i<CATALOG.length;i++){ if(CATALOG[i].name===name) return CATALOG[i]; }
  return null;
}

/* ---------- header + footer ---------- */
function buildChrome(){
  var logo="images/logo.jpg";
  var header=document.getElementById("site-header");
  if(header){
    header.innerHTML =
     (CONFIG.announceOn?'<div class="topbar"><span id="ticker">'+CONFIG.announce+'</span></div>':'')+
     '<header class="nav" id="siteNav"><div class="wrap nav__in">'+
       '<a href="index.html" class="brand"><img src="'+logo+'" alt="logo"> '+CONFIG.brand+'</a>'+
       '<nav class="navlinks">'+
         '<a href="index.html"'+(IS_HOME?' class="here"':'')+'>Home</a>'+
         '<a href="'+HOME+'#services">Services</a>'+
         '<a href="'+HOME+'#capabilities">Capabilities</a>'+
         '<a href="'+HOME+'#works">Our work</a>'+
         '<a href="shop.html"'+(PAGE_FILE==="shop"?' class="here"':'')+'>Shop</a>'+
         '<a href="custom.html"'+(PAGE_FILE==="custom"?' class="here"':'')+'>Get a quote</a>'+
         '<a href="about.html"'+(PAGE_FILE==="about"?' class="here"':'')+'>About</a>'+
         '<a href="contact.html"'+(PAGE_FILE==="contact"?' class="here"':'')+'>Contact</a>'+
         '<a href="orders.html"'+(PAGE_FILE==="orders"?' class="here"':'')+'>My orders</a>'+
       '</nav>'+
       '<div class="nav__right">'+
         '<button class="iconbtn" id="cartBtn" aria-label="Cart">'+
           '<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg>'+
           '<span class="cartcount" id="cartCount">0</span>'+
         '</button>'+
         '<a href="shop.html" class="btn btn-gold btn-sm navshop">Shop now</a>'+
         '<button class="iconbtn menutoggle" id="menuToggle" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'+
       '</div>'+
     '</div></header>';
  }
  var footer=document.getElementById("site-footer");
  if(footer){
    var social="";
    if(CONFIG.linkedin)  social+='<a href="'+CONFIG.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>';
    if(CONFIG.facebook)  social+='<a href="'+CONFIG.facebook+'" target="_blank" rel="noopener">Facebook</a>';
    if(CONFIG.instagram) social+='<a href="'+CONFIG.instagram+'" target="_blank" rel="noopener">Instagram</a>';
    social+='<a href="'+waLink("Hi "+CONFIG.brand+"!")+'" target="_blank" rel="noopener">WhatsApp</a>';
    footer.innerHTML =
     '<footer class="foot dots-bg"><div class="wrap"><div class="foot__grid">'+
       '<div class="foot__brand"><a href="index.html" class="brand"><img src="'+logo+'" alt="logo"> '+CONFIG.brand+'</a>'+
         '<p>3D printing studio in Bangladesh — rapid prototyping and small-batch production for companies and students, plus a collectibles shop loved by fans.</p>'+
         '<div class="paystrip"><span>Cash on delivery</span><span>bKash</span><span>Nagad</span><span>Invoice for companies</span></div></div>'+
       '<div><h5>Pages</h5><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="custom.html">Get a quote</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="orders.html">My orders</a></div>'+
       '<div><h5>Shop by fandom</h5><a href="shop.html?fandom=Anime">Anime</a><a href="shop.html?fandom=Harry%20Potter">Harry Potter</a><a href="shop.html?fandom=Marvel%20%26%20DC">Marvel &amp; DC</a><a href="shop.html?fandom=Gaming">Gaming</a><a href="shop.html?fandom=Amigurumi">Amigurumi</a></div>'+
       '<div><h5>Services</h5><a href="'+HOME+'#services">Rapid prototyping</a><a href="'+HOME+'#services">Small-batch production</a><a href="'+HOME+'#capabilities">Materials &amp; specs</a>'+
         '<p style="color:var(--muted);font-size:13px;margin-top:10px">Find us on</p>'+
         '<div class="paystrip">'+social+'</div></div>'+
     '</div><div class="foot__bottom"><span>© '+new Date().getFullYear()+' '+CONFIG.brand+' · 3D Printing &amp; Collectibles</span><span>Made in Bangladesh 🇧🇩</span></div></div></footer>';
  }
  var nav=document.getElementById("siteNav");
  var mt=document.getElementById("menuToggle");
  if(mt) mt.addEventListener("click", function(){ nav.classList.toggle("open"); });
  if(nav) nav.querySelectorAll(".navlinks a").forEach(function(a){
    a.addEventListener("click", function(){ nav.classList.remove("open"); });
  });
  var wa=document.getElementById("waFloat");
  if(wa) wa.href=waLink("Hi "+CONFIG.brand+"! I have a question.");
  var cb=document.getElementById("cartBtn");
  if(cb) cb.addEventListener("click", openCart);
  document.querySelectorAll("a.wa-quote").forEach(function(a){
    a.href=waLink("Hi "+CONFIG.brand+"! I'd like a quote for: "+(a.getAttribute("data-msg")||"a custom order"));
    a.target="_blank"; a.rel="noopener";
  });
  document.querySelectorAll("a.mail-quote").forEach(function(a){
    a.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent("Quote request — "+CONFIG.brand);
  });
}

/* ---------- toast ---------- */
var _tEl,_tT;
function toast(m){
  if(!_tEl){_tEl=document.createElement("div");_tEl.className="toast";document.body.appendChild(_tEl);}
  _tEl.textContent=m;_tEl.classList.add("show");
  clearTimeout(_tT);_tT=setTimeout(function(){_tEl.classList.remove("show")},1900);
}

/* ---------- cart ---------- */
function getCart(){try{return JSON.parse(localStorage.getItem("jm_cart"))||[]}catch(e){return[]}}
function setCart(c){localStorage.setItem("jm_cart",JSON.stringify(c));paintCartCount();paintCart();if(typeof paintCheckout==="function")paintCheckout();}
function paintCartCount(){var n=getCart().reduce(function(s,i){return s+i.qty},0);var el=document.getElementById("cartCount");if(el)el.textContent=n;}
function cartSubtotal(){return getCart().reduce(function(s,i){return s+i.price*i.qty},0);}
function addToCart(name,price,qty,silent){
  qty = qty||1;
  var c=getCart(),f=c.filter(function(i){return i.name===name})[0];
  if(f)f.qty+=qty; else c.push({name:name,price:+price,qty:qty});
  setCart(c);
  if(!silent){ toast("Added to cart: "+name); openCart(); }
}
function changeQty(name,d){var c=getCart();c.forEach(function(i){if(i.name===name)i.qty+=d});c=c.filter(function(i){return i.qty>0});setCart(c);}
function removeItem(name){setCart(getCart().filter(function(i){return i.name!==name}));}
function esc(s){return String(s).replace(/'/g,"\\'");}
function ensureDrawer(){
  if(document.getElementById("cartDrawer"))return;
  var ov=document.createElement("div");ov.className="cart-ov";ov.id="cartOv";ov.onclick=closeCart;
  var d=document.createElement("div");d.className="drawer";d.id="cartDrawer";
  d.innerHTML='<div class="drawer__head"><h3>Your cart</h3><button class="drawer__x" aria-label="Close">&times;</button></div>'+
    '<div class="drawer__body" id="cartBody"></div><div class="drawer__foot" id="cartFoot"></div>';
  document.body.appendChild(ov);document.body.appendChild(d);
  d.querySelector(".drawer__x").onclick=closeCart;paintCart();
}
function paintCart(){
  var body=document.getElementById("cartBody"),foot=document.getElementById("cartFoot");
  if(!body)return;
  var c=getCart();
  if(!c.length){
    body.innerHTML='<div class="drawer__empty">Your cart is empty.<br>Add a piece from the <a href="shop.html" style="color:var(--gold-2);font-weight:700">Shop</a>.</div>';
    foot.innerHTML='';return;
  }
  body.innerHTML=c.map(function(i){
    var p=findProduct(i.name);
    return '<div class="citem">'+
      (p?'<img class="citem__img" src="'+p.img+'" alt="">':'')+
      '<div class="citem__main"><div class="citem__n">'+i.name+'</div>'+
      '<div class="citem__p">'+i.price+'৳ each</div>'+
      '<div class="qty"><button aria-label="less" onclick="changeQty(\''+esc(i.name)+'\',-1)">–</button>'+
      '<span>'+i.qty+'</span><button aria-label="more" onclick="changeQty(\''+esc(i.name)+'\',1)">+</button></div></div>'+
      '<button class="citem__rm" onclick="removeItem(\''+esc(i.name)+'\')">remove</button></div>';
  }).join("");
  foot.innerHTML='<div class="drawer__sub"><span>Subtotal</span><b>'+cartSubtotal()+'৳</b></div>'+
    '<a class="btn btn-gold" href="checkout.html" style="justify-content:center">Checkout</a>'+
    '<div class="drawer__note">Delivery charge is added on the checkout page.</div>';
}
function openCart(){ensureDrawer();document.getElementById("cartOv").classList.add("on");document.getElementById("cartDrawer").classList.add("on");}
function closeCart(){var o=document.getElementById("cartOv"),d=document.getElementById("cartDrawer");if(o)o.classList.remove("on");if(d)d.classList.remove("on");}

/* ---------- product cards ---------- */
function pct(now,was){if(!was)return"";var p=Math.round((1-(+now)/(+was))*100);return p>0?("-"+p+"%"):"";}
function pcard(p){
  var badge=p.badge==="stock"?'<span class="badge b-stock">In stock</span>':'<span class="badge b-order">Made to order</span>';
  var price='<span class="now">'+p.now+'৳</span>'+(p.was?'<span class="was">'+p.was+'৳</span><span class="off">'+pct(p.now,p.was)+'</span>':'');
  var key=encodeURIComponent(p.name);
  return '<article class="pcard" data-open="'+key+'" role="button" tabindex="0">'+
    '<div class="pcard__media">'+badge+'<span class="ftag">'+p.fandom+'</span>'+
    '<img src="'+p.img+'" alt="'+p.name+'" loading="lazy">'+
    (productShots(p).length>1?'<span class="shots">'+productShots(p).length+' photos</span>':'')+
    '<span class="viewhint">View details</span></div>'+
    '<div class="pcard__body"><div class="pcard__name">'+p.name+'</div><div class="pcard__sub">'+p.sub+'</div>'+
    '<div class="price">'+price+'</div>'+
    '<div class="pcard__acts">'+
      '<button class="btn btn-ghost btn-sm" data-open="'+key+'">Details</button>'+
      '<button class="btn btn-gold btn-sm" data-add="'+key+'" data-price="'+p.now+'">Add to cart</button>'+
    '</div></div></article>';
}
function fill(id,html){var el=document.getElementById(id);if(el)el.innerHTML=html;}

/* one delegated listener handles every card on every page */
function initCardActions(){
  document.addEventListener("click",function(e){
    var addBtn=e.target.closest("[data-add]");
    if(addBtn){
      e.preventDefault(); e.stopPropagation();
      addToCart(decodeURIComponent(addBtn.getAttribute("data-add")), addBtn.getAttribute("data-price"));
      return;
    }
    var openEl=e.target.closest("[data-open]");
    if(openEl){
      e.preventDefault();
      openProduct(decodeURIComponent(openEl.getAttribute("data-open")));
    }
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape") closeProduct();
    var modalOpen=document.getElementById("pmodal")&&document.getElementById("pmodal").classList.contains("on");
    if(modalOpen&&GALLERY_NAV){
      if(e.key==="ArrowLeft")  GALLERY_NAV(GALLERY_POS()-1);
      if(e.key==="ArrowRight") GALLERY_NAV(GALLERY_POS()+1);
    }
    if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("pcard")){
      e.preventDefault(); openProduct(decodeURIComponent(e.target.getAttribute("data-open")));
    }
  });
}

/* ---------- product detail ---------- */
function ensurePmodal(){
  if(document.getElementById("pmodal"))return;
  var m=document.createElement("div");
  m.className="pmodal";m.id="pmodal";
  m.innerHTML='<div class="pmodal__ov" id="pmodalOv"></div><div class="pmodal__panel" id="pmodalPanel" role="dialog" aria-modal="true"></div>';
  document.body.appendChild(m);
  document.getElementById("pmodalOv").addEventListener("click",closeProduct);
}
/* every photo for a product: the imgs list if it has one, otherwise just img */
function productShots(p){
  var list=(p.imgs&&p.imgs.length)?p.imgs.slice():[p.img];
  return list.filter(function(s){return !!s});
}
/* arrows, thumbnails, swipe and arrow keys for the detail gallery */
function initGallery(total){
  var i=0;
  var imgs=[].slice.call(document.querySelectorAll("#galStage .gal__img"));
  var thumbs=[].slice.call(document.querySelectorAll("#galThumbs .gal__thumb"));
  var counter=document.getElementById("galCount");
  function show(n){
    i=(n+total)%total;
    imgs.forEach(function(el,k){el.classList.toggle("on",k===i)});
    thumbs.forEach(function(el,k){el.classList.toggle("on",k===i)});
    if(counter) counter.textContent=(i+1)+" / "+total;
  }
  document.getElementById("galPrev").onclick=function(e){e.stopPropagation();show(i-1)};
  document.getElementById("galNext").onclick=function(e){e.stopPropagation();show(i+1)};
  thumbs.forEach(function(t){ t.onclick=function(){show(+t.getAttribute("data-i"))}; });

  var stage=document.getElementById("galStage"), x0=null;
  stage.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  stage.addEventListener("touchend",function(e){
    if(x0===null)return;
    var dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>40) show(dx<0?i+1:i-1);
    x0=null;
  },{passive:true});

  GALLERY_NAV=show; GALLERY_POS=function(){return i};
}
var GALLERY_NAV=null, GALLERY_POS=null;

function openProduct(name){
  var p=findProduct(name); if(!p)return;
  ensurePmodal();
  var price='<span class="now">'+p.now+'৳</span>'+(p.was?'<span class="was">'+p.was+'৳</span><span class="off">'+pct(p.now,p.was)+'</span>':'');
  var badge=p.badge==="stock"?'<span class="badge b-stock">In stock</span>':'<span class="badge b-order">Made to order</span>';
  var specs=(p.specs||[]).map(function(s){return '<li>'+s+'</li>'}).join("");
  var key=encodeURIComponent(p.name);
  var shots=productShots(p);
  var gallery;
  if(shots.length>1){
    gallery='<div class="pmodal__media gal">'+badge+
      '<div class="gal__stage" id="galStage">'+
        shots.map(function(src,i){return '<img class="gal__img'+(i===0?" on":"")+'" src="'+src+'" alt="'+p.name+' — photo '+(i+1)+'">'}).join("")+
        '<button class="gal__nav gal__prev" id="galPrev" aria-label="Previous photo">&#8249;</button>'+
        '<button class="gal__nav gal__next" id="galNext" aria-label="Next photo">&#8250;</button>'+
        '<span class="gal__count" id="galCount">1 / '+shots.length+'</span>'+
      '</div>'+
      '<div class="gal__thumbs" id="galThumbs">'+
        shots.map(function(src,i){return '<button class="gal__thumb'+(i===0?" on":"")+'" data-i="'+i+'" aria-label="Photo '+(i+1)+'"><img src="'+src+'" alt=""></button>'}).join("")+
      '</div></div>';
  } else {
    gallery='<div class="pmodal__media"><img src="'+shots[0]+'" alt="'+p.name+'">'+badge+'</div>';
  }
  document.getElementById("pmodalPanel").innerHTML=
    '<button class="pmodal__x" aria-label="Close">&times;</button>'+
    gallery+
    '<div class="pmodal__info">'+
      '<div class="pmodal__tags"><span>'+p.fandom+'</span><span>'+p.type+'</span></div>'+
      '<h3>'+p.name+'</h3>'+
      '<div class="pmodal__sub">'+p.sub+'</div>'+
      '<div class="price">'+price+'</div>'+
      '<p class="pmodal__desc">'+(p.desc||"")+'</p>'+
      (specs?'<ul class="pmodal__specs">'+specs+'</ul>':'')+
      '<div class="pmodal__qty"><span>Quantity</span>'+
        '<div class="qty"><button id="pmQtyMinus">–</button><span id="pmQty">1</span><button id="pmQtyPlus">+</button></div></div>'+
      '<div class="pmodal__acts">'+
        '<button class="btn btn-gold" id="pmAdd">Add to cart</button>'+
        '<button class="btn btn-ghost" id="pmBuy">Buy now</button>'+
      '</div>'+
      '<div class="pmodal__note">Cash on delivery, bKash or Nagad · delivered anywhere in Bangladesh · '+
        '<a href="custom.html">want it in a different size or colour?</a></div>'+
    '</div>';
  if(shots.length>1) initGallery(shots.length);

  var q=1;
  var qEl=document.getElementById("pmQty");
  document.getElementById("pmQtyMinus").onclick=function(){ if(q>1){q--;qEl.textContent=q;} };
  document.getElementById("pmQtyPlus").onclick =function(){ if(q<20){q++;qEl.textContent=q;} };
  document.getElementById("pmAdd").onclick=function(){ addToCart(p.name,p.now,q,true); toast("Added "+q+" × "+p.name); closeProduct(); openCart(); };
  document.getElementById("pmBuy").onclick=function(){ addToCart(p.name,p.now,q,true); location.href="checkout.html"; };
  document.querySelector("#pmodalPanel .pmodal__x").onclick=closeProduct;
  document.getElementById("pmodal").classList.add("on");
  document.body.style.overflow="hidden";
  if(history.replaceState) history.replaceState(null,"","?p="+key);
}
function closeProduct(){
  var m=document.getElementById("pmodal"); if(!m)return;
  m.classList.remove("on"); document.body.style.overflow="";
  GALLERY_NAV=null; GALLERY_POS=null;
  if(history.replaceState) history.replaceState(null,"",filterUrl());
}
/* the URL that represents the current filter state (used after closing a product) */
function filterUrl(){
  if(FILTER.fandom) return location.pathname+"?fandom="+encodeURIComponent(FILTER.fandom);
  if(FILTER.type)   return location.pathname+"?type="+encodeURIComponent(FILTER.type);
  return location.pathname;
}

/* ---------- shop page: fandom + type filtering ---------- */
var FILTER = {fandom:"", type:""};
function qparam(k){
  var m=new RegExp("[?&]"+k+"=([^&]*)").exec(location.search);
  return m?decodeURIComponent(m[1].replace(/\+/g," ")):"";
}
function applyFilter(){
  var list=CATALOG.filter(function(p){
    if(FILTER.fandom && p.fandom!==FILTER.fandom) return false;
    if(FILTER.type   && p.type  !==FILTER.type)   return false;
    return true;
  });
  var grid=document.getElementById("grid"); if(!grid)return;

  var title=document.getElementById("dropsTitle");
  var count=document.getElementById("dropsCount");
  if(title) title.innerHTML = (FILTER.fandom||FILTER.type)
      ? (FILTER.fandom||FILTER.type)
      : 'All <span class="y">products</span>';
  if(count) count.textContent = list.length+(list.length===1?" piece":" pieces");

  if(!list.length){
    grid.innerHTML='<div class="emptyfilter"><b>Nothing listed here yet.</b>'+
      '<p>We make these to order all the time — they just aren\'t on the page. Tell us what you want and we\'ll quote it.</p>'+
      '<a class="btn btn-gold btn-sm" href="custom.html">Request this piece</a></div>';
  } else {
    grid.innerHTML=list.map(pcard).join("");
  }

  document.querySelectorAll(".tile[data-fandom]").forEach(function(t){
    t.classList.toggle("on", t.getAttribute("data-fandom")===FILTER.fandom);
  });
  document.querySelectorAll(".typechip[data-type]").forEach(function(c){
    c.classList.toggle("on", c.getAttribute("data-type")===FILTER.type);
  });
  var clear=document.getElementById("clearFilter");
  if(clear) clear.style.display=(FILTER.fandom||FILTER.type)?"":"none";
}
function setFilter(kind,value,scroll){
  if(kind==="fandom"){ FILTER.fandom = (FILTER.fandom===value?"":value); FILTER.type=""; }
  else               { FILTER.type   = (FILTER.type===value?"":value);   FILTER.fandom=""; }
  applyFilter();
  if(scroll!==false){
    var d=document.getElementById("drops");
    if(d) d.scrollIntoView({behavior:"smooth",block:"start"});
  }
  if(history.replaceState) history.replaceState(null,"",filterUrl());
}
function initShop(){
  var grid=document.getElementById("grid"); if(!grid)return;

  document.querySelectorAll(".tile[data-fandom]").forEach(function(t){
    t.setAttribute("role","button"); t.setAttribute("tabindex","0");
    t.addEventListener("click",function(){ setFilter("fandom",t.getAttribute("data-fandom")); });
    t.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){e.preventDefault();setFilter("fandom",t.getAttribute("data-fandom"));} });
  });
  var strip=document.getElementById("typestrip");
  if(strip) strip.addEventListener("click",function(e){
    var c=e.target.closest(".typechip"); if(!c)return;
    setFilter("type",c.getAttribute("data-type"));
  });
  var clear=document.getElementById("clearFilter");
  if(clear) clear.addEventListener("click",function(){ FILTER={fandom:"",type:""}; applyFilter(); if(history.replaceState)history.replaceState(null,"",location.pathname); });

  FILTER.fandom=qparam("fandom"); FILTER.type=qparam("type");
  applyFilter();

  fill("wishgrid",WISHED.map(function(w){
    return '<article class="wishcard"><div class="wishcard__media"><span class="ribbon">Requested</span>'+
      '<img src="'+w.img+'" alt="'+w.name+'" loading="lazy"></div><div class="wishcard__body">'+
      '<div class="wishcard__name">'+w.name+'</div><div class="wishcard__req">'+w.req+'</div></div></article>';
  }).join(""));
  fill("amirow",AMI.map(function(a){return pcard(amiAsProduct(a))}).join(""));
  fill("decorrow",DECOR.map(pcard).join(""));

  if(FILTER.fandom||FILTER.type){
    setTimeout(function(){ var d=document.getElementById("drops"); if(d)d.scrollIntoView({behavior:"smooth"}); },250);
  }
  var open=qparam("p"); if(open) setTimeout(function(){openProduct(open)},400);
}
function renderFeatured(){
  var el=document.getElementById("featgrid");if(!el)return;
  var picks=FEATURED_ON_HOME.map(findProduct).filter(Boolean);
  el.innerHTML=picks.map(pcard).join("");
}

/* ---------- projects (homepage) ---------- */
function wcard(w){
  return '<article class="wcard" data-cat="'+w.cat+'"><div class="wcard__media">'+
    '<span class="wcat">'+w.label+'</span><img src="'+w.img+'" alt="'+w.title+'" loading="lazy"></div>'+
    '<h4>'+w.title+'</h4><div class="wmeta">'+w.meta.map(function(m){return '<span>'+m+'</span>'}).join("")+'</div></article>';
}
function renderWorks(cat){
  var list=cat==="all"?WORKS:WORKS.filter(function(w){return w.cat===cat});
  fill("wgrid",list.map(wcard).join(""));
}
function initWorks(){
  var grid=document.getElementById("wgrid");if(!grid)return;
  renderWorks("all");
  var tabs=document.getElementById("tabs");
  if(tabs)tabs.addEventListener("click",function(e){
    var b=e.target.closest(".tab");if(!b)return;
    tabs.querySelectorAll(".tab").forEach(function(t){t.classList.remove("on")});
    b.classList.add("on");renderWorks(b.dataset.cat);
  });
}

/* ---------- hero rotation ---------- */
function initHero(){
  var stage=document.getElementById("stage");if(!stage)return;
  var slides=[].slice.call(stage.querySelectorAll(".stage__slide"));
  var dotsBox=document.getElementById("dots"),cur=0;
  if(!slides.length||!dotsBox)return;
  slides.forEach(function(s,i){var d=document.createElement("span");d.className="dot"+(i===0?" on":"");d.onclick=function(){go(i)};dotsBox.appendChild(d);});
  function go(i){
    slides[cur].classList.remove("on");dotsBox.children[cur].classList.remove("on");
    cur=i;slides[cur].classList.add("on");dotsBox.children[cur].classList.add("on");
    var k=document.getElementById("tagK"),n=document.getElementById("tagN");
    if(k)k.textContent=slides[cur].dataset.k;if(n)n.textContent=slides[cur].dataset.n;
  }
  var auto=setInterval(function(){go((cur+1)%slides.length)},4200);
  stage.addEventListener("mouseenter",function(){clearInterval(auto)});
}

/* ---------- reveal + counters ---------- */
function initReveal(){
  if(!("IntersectionObserver" in window)){
    document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("in")});return;
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add("in");
      if(e.target.querySelectorAll&&e.target.querySelectorAll(".stat .n").length)countup(e.target);
      io.unobserve(e.target);}
  })},{threshold:.14});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el)});
  function countup(scope){
    scope.querySelectorAll(".stat .n").forEach(function(n){
      var to=+n.dataset.to,t0=performance.now();
      function step(t){var p=Math.min(1,(t-t0)/1100);n.textContent=Math.round(to*(1-Math.pow(1-p,3)))+(p===1&&to>=30?"+":"");if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    });
  }
}

/* =====================================================================
   CHECKOUT  (checkout.html)
   ===================================================================== */
function o_(obj,k){return obj[k]}
function orderId(){
  var d=new Date(), p=function(n){return(n<10?"0":"")+n};
  return "JM-"+String(d.getFullYear()).slice(2)+p(d.getMonth()+1)+p(d.getDate())+"-"+
    Math.random().toString(36).slice(2,6).toUpperCase();
}
function deliveryFee(){
  var z=document.querySelector('input[name="zone"]:checked');
  return (z && z.value==="Outside Dhaka") ? CONFIG.deliveryOutside : CONFIG.deliveryDhaka;
}
function paintCheckout(){
  var box=document.getElementById("coItems"); if(!box)return;
  var c=getCart();
  if(!c.length){
    document.getElementById("coMain").innerHTML=
      '<div class="okbox"><h3>Your cart is empty</h3>'+
      '<p>Add something from the shop and come back — checkout takes about a minute.</p>'+
      '<a class="btn btn-gold" href="shop.html">Go to the shop</a></div>';
    return;
  }
  box.innerHTML=c.map(function(i){
    var p=findProduct(i.name);
    return '<div class="coitem">'+(p?'<img src="'+p.img+'" alt="">':'')+
      '<div><div class="coitem__n">'+i.name+'</div>'+
      '<div class="coitem__p">'+i.price+'৳ × '+i.qty+'</div>'+
      '<div class="qty"><button type="button" onclick="changeQty(\''+esc(i.name)+'\',-1)">–</button><span>'+i.qty+'</span>'+
      '<button type="button" onclick="changeQty(\''+esc(i.name)+'\',1)">+</button>'+
      '<button type="button" class="citem__rm" onclick="removeItem(\''+esc(i.name)+'\')">remove</button></div></div>'+
      '<b>'+(i.price*i.qty)+'৳</b></div>';
  }).join("");
  var sub=cartSubtotal(), del=deliveryFee();
  document.getElementById("coSub").textContent=sub+"৳";
  document.getElementById("coDel").textContent=del+"৳";
  document.getElementById("coTot").textContent=(sub+del)+"৳";
  var pm=document.querySelector('input[name="pay"]:checked');
  var amt=document.getElementById("payAmount");
  if(amt) amt.textContent=(sub+del)+"৳";
}
function initCheckout(){
  var form=document.getElementById("coForm"); if(!form)return;

  /* payment method boxes */
  var payWrap=document.getElementById("payOpts");
  if(!CONFIG.nagadOn){
    var n=payWrap.querySelector('[data-pay="Nagad"]'); if(n) n.remove();
  }
  var bn=document.getElementById("bkashNum"); if(bn) bn.textContent=CONFIG.bkashNumber;
  var nn=document.getElementById("nagadNum"); if(nn) nn.textContent=CONFIG.nagadNumber;
  var dd=document.getElementById("feeDhaka");   if(dd) dd.textContent=CONFIG.deliveryDhaka+"৳";
  var dz=document.getElementById("feeOutside"); if(dz) dz.textContent=CONFIG.deliveryOutside+"৳";

  function syncPay(){
    var v=(document.querySelector('input[name="pay"]:checked')||{}).value||"";
    document.querySelectorAll(".payopt").forEach(function(o){
      o.classList.toggle("on", o.getAttribute("data-pay")===v);
    });
    var needsTrx = (v==="bKash"||v==="Nagad");
    var tb=document.getElementById("trxBlock");
    if(tb) tb.style.display = needsTrx ? "" : "none";
    var bk=document.getElementById("bkashBox"), ng=document.getElementById("nagadBox");
    if(bk) bk.style.display = (v==="bKash")?"":"none";
    if(ng) ng.style.display = (v==="Nagad")?"":"none";
    paintCheckout();
  }
  form.addEventListener("change",function(e){
    if(e.target.name==="pay") syncPay();
    if(e.target.name==="zone") paintCheckout();
  });
  syncPay();
  paintCheckout();

  /* paintCheckout() replaces the whole panel when the cart is empty,
     so the button may no longer exist by this point. */
  var place=document.getElementById("coPlace");
  if(place) place.addEventListener("click",placeOrder);
}
function val(id){var el=document.getElementById(id);return el?el.value.trim():"";}
function markBad(id,bad){var el=document.getElementById(id);if(el)el.classList.toggle("bad",!!bad);}
function placeOrder(){
  var c=getCart(); if(!c.length){toast("Your cart is empty.");return;}

  var pay=(document.querySelector('input[name="pay"]:checked')||{}).value||"";
  var zone=(document.querySelector('input[name="zone"]:checked')||{}).value||"Inside Dhaka";
  var need=[["co-name","name"],["co-phone","phone"],["co-address","address"],["co-area","area"],["co-district","district"]];
  var missing=false;
  need.forEach(function(f){ var bad=!val(f[0]); markBad(f[0],bad); if(bad)missing=true; });
  if(!pay){ toast("Please choose a payment method."); missing=true; }
  var needsTrx=(pay==="bKash"||pay==="Nagad");
  if(needsTrx){
    var bad1=!val("co-trx"), bad2=!val("co-sender");
    markBad("co-trx",bad1); markBad("co-sender",bad2);
    if(bad1||bad2) missing=true;
  }
  if(missing){ toast("Please fill in the highlighted fields."); return; }

  var phone=val("co-phone").replace(/[^0-9+]/g,"");
  if(phone.replace(/\D/g,"").length<11){ markBad("co-phone",true); toast("Please enter a valid 11-digit phone number."); return; }

  var sub=cartSubtotal(), del=deliveryFee(), tot=sub+del;
  var id=orderId();
  var itemsText=c.map(function(i){return i.name+" x"+i.qty+" @ "+i.price+"৳ = "+(i.price*i.qty)+"৳"}).join(" | ");

  var payload={
    orderId:   id,
    placedISO: new Date().toISOString(),
    placedAt:  new Date().toLocaleString("en-GB",{timeZone:"Asia/Dhaka"}),
    name:      val("co-name"),
    phone:     val("co-phone"),
    altPhone:  val("co-alt"),
    email:     val("co-email"),
    address:   val("co-address"),
    area:      val("co-area"),
    district:  val("co-district"),
    zone:      zone,
    payment:   pay,
    senderNo:  val("co-sender"),
    trxId:     val("co-trx"),
    notes:     val("co-notes"),
    items:     itemsText,
    itemCount: c.reduce(function(s,i){return s+i.qty},0),
    subtotal:  sub,
    delivery:  del,
    total:     tot,
    source:    location.hostname
  };

  var btn=document.getElementById("coPlace");
  btn.disabled=true; btn.textContent="Placing your order…";

  sendOrder(payload, function(){
    saveOrder({
      orderId:o_(payload,"orderId"), placedAt:payload.placedAt, placedISO:payload.placedISO,
      name:payload.name, phone:payload.phone, area:payload.area, district:payload.district,
      payment:payload.payment, total:payload.total, itemCount:payload.itemCount,
      itemList:c.map(function(i){return {name:i.name,price:i.price,qty:i.qty}}),
      status:"NEW"
    });
    showConfirmation(payload);
    localStorage.removeItem("jm_cart");
    paintCartCount();
  });
}
/* Sends to Google Sheets. Tries fetch first; falls back to a hidden form
   post (which always gets through, even if the browser blocks the reply). */
function sendOrder(payload, done){
  if(!ORDER_ENDPOINT){
    // No sheet connected yet — fall back to WhatsApp so no order is ever lost.
    var lines=["New order "+payload.orderId,"",payload.items.split(" | ").join("\n"),"",
      "Subtotal: "+payload.subtotal+"৳","Delivery ("+payload.zone+"): "+payload.delivery+"৳","TOTAL: "+payload.total+"৳","",
      "Name: "+payload.name,"Phone: "+payload.phone,"Address: "+payload.address,
      "Area: "+payload.area,"District: "+payload.district,
      "Payment: "+payload.payment+(payload.trxId?(" · TrxID "+payload.trxId):""),
      payload.notes?("Notes: "+payload.notes):""];
    window.open(waLink(lines.join("\n")),"_blank");
    done(); return;
  }
  var body=new URLSearchParams();
  Object.keys(payload).forEach(function(k){ body.append(k,payload[k]); });

  var finished=false;
  var finish=function(){ if(!finished){ finished=true; done(); } };

  try{
    fetch(ORDER_ENDPOINT,{method:"POST",body:body})
      .then(function(){ finish(); })
      .catch(function(){ iframePost(payload); finish(); });
  }catch(err){
    iframePost(payload); finish();
  }
  setTimeout(finish, 6000); // never leave the customer hanging
}
function iframePost(payload){
  var name="jmpost_"+Date.now();
  var f=document.createElement("iframe"); f.name=name; f.style.display="none";
  document.body.appendChild(f);
  var form=document.createElement("form");
  form.method="POST"; form.action=ORDER_ENDPOINT; form.target=name; form.style.display="none";
  Object.keys(payload).forEach(function(k){
    var i=document.createElement("input"); i.type="hidden"; i.name=k; i.value=payload[k]; form.appendChild(i);
  });
  document.body.appendChild(form); form.submit();
}
function showConfirmation(o){
  var main=document.getElementById("coMain"); if(!main)return;
  var payLine = o.payment==="Cash on delivery"
    ? "Pay <b>"+o.total+"৳</b> in cash when the courier hands it over."
    : "We'll verify your "+o.payment+" transaction <b>"+o.trxId+"</b> and confirm on WhatsApp.";
  main.innerHTML=
    '<div class="okbox">'+
      '<div class="okbox__tick">✓</div>'+
      '<h3>Order placed</h3>'+
      '<p>Thanks '+o.name+' — your order is with us.</p>'+
      '<div class="okbox__id">Order ID<b>'+o.orderId+'</b></div>'+
      '<div class="okbox__rows">'+
        '<div><span>Items</span><b>'+o.itemCount+'</b></div>'+
        '<div><span>Total</span><b>'+o.total+'৳</b></div>'+
        '<div><span>Payment</span><b>'+o.payment+'</b></div>'+
        '<div><span>Delivering to</span><b>'+o.area+', '+o.district+'</b></div>'+
      '</div>'+
      '<p class="okbox__note">'+payLine+' We\'ll call or WhatsApp <b>'+o.phone+'</b> to confirm the delivery date — usually within a few hours.</p>'+
      '<div class="okbox__acts">'+
        '<a class="btn btn-gold" href="orders.html">Track this order</a>'+
        '<a class="btn btn-ghost" href="shop.html">Keep shopping</a>'+
        '<a class="btn btn-ghost" target="_blank" rel="noopener" href="'+waLink("Hi "+CONFIG.brand+"! About my order "+o.orderId+" — ")+'">Message us about this order</a>'+
      '</div>'+
      '<p class="okbox__small">Saved to <a href="orders.html" style="color:var(--gold-2);font-weight:700">My orders</a> on this device. '+
        'You can cancel it yourself there for the next '+CONFIG.cancelHours+' hours.</p>'+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

/* =====================================================================
   MY ORDERS  (orders.html)
   Every order is kept on the customer's own device so they can see it
   again and the live status is fetched from your sheet when possible.
   ===================================================================== */
function getOrders(){ try{return JSON.parse(localStorage.getItem("jm_orders"))||[]}catch(e){return[]} }
function saveOrder(o){
  var all=getOrders();
  all.unshift(o);
  localStorage.setItem("jm_orders",JSON.stringify(all.slice(0,40)));
}
function updateOrder(id,patch){
  var all=getOrders();
  all.forEach(function(o){ if(o.orderId===id) Object.keys(patch).forEach(function(k){o[k]=patch[k]}); });
  localStorage.setItem("jm_orders",JSON.stringify(all));
}
function hoursSince(iso){ return (Date.now()-new Date(iso).getTime())/36e5; }
function canCancel(o){
  var s=(o.status||"NEW").toUpperCase();
  if(s.indexOf("CANCEL")>-1||s.indexOf("SHIPPED")>-1||s.indexOf("DONE")>-1||s.indexOf("DELIVERED")>-1) return false;
  return hoursSince(o.placedISO) < CONFIG.cancelHours;
}
function cancelWindowLeft(o){
  var left=CONFIG.cancelHours-hoursSince(o.placedISO);
  if(left<=0) return "";
  var mins=Math.round(left*60);
  if(mins<60){
    mins=Math.max(1,mins);
    return mins+(mins===1?" minute":" minutes")+" left to cancel";
  }
  return Math.floor(mins/60)+"h "+(mins%60)+"m left to cancel";
}

/* Talks to Apps Script without CORS trouble by loading it as a script tag. */
function jsonp(params,cb){
  if(!ORDER_ENDPOINT){ cb(null); return; }
  var name="jmcb_"+Math.random().toString(36).slice(2);
  var done=false;
  var s=document.createElement("script");
  function finish(data){
    if(done)return; done=true;
    try{delete window[name]}catch(e){window[name]=null}
    if(s.parentNode)s.parentNode.removeChild(s);
    cb(data);
  }
  window[name]=finish;
  var q=Object.keys(params).map(function(k){return k+"="+encodeURIComponent(params[k])}).join("&");
  s.src=ORDER_ENDPOINT+"?"+q+"&callback="+name;
  /* An OLD Apps Script answers with plain JSON instead of calling our
     callback, so the browser errors on it and we land here. That is the
     usual reason live status looks "broken" — the v2 script isn't
     deployed yet. */
  s.onerror=function(){ finish(null) };
  document.body.appendChild(s);
  setTimeout(function(){ finish(null) },9000);
}

function statusClass(s){
  s=(s||"NEW").toUpperCase();
  if(s.indexOf("REQUEST")>-1)  return "st-pending";
  if(s.indexOf("CANCEL")>-1)   return "st-cancel";
  if(s.indexOf("DELIVER")>-1||s.indexOf("DONE")>-1) return "st-done";
  if(s.indexOf("SHIP")>-1)     return "st-ship";
  if(s.indexOf("PRINT")>-1||s.indexOf("MAKING")>-1) return "st-making";
  if(s.indexOf("CONFIRM")>-1)  return "st-confirm";
  return "st-new";
}
var STATUS_STEPS=["NEW","CONFIRMED","PRINTING","SHIPPED","DELIVERED"];
function statusIndex(s){
  s=(s||"NEW").toUpperCase();
  if(s.indexOf("REQUEST")>-1) return -2;   // asked to cancel, not confirmed
  if(s.indexOf("CANCEL")>-1) return -1;
  if(s.indexOf("DELIVER")>-1||s.indexOf("DONE")>-1) return 4;
  if(s.indexOf("SHIP")>-1) return 3;
  if(s.indexOf("PRINT")>-1||s.indexOf("MAKING")>-1) return 2;
  if(s.indexOf("CONFIRM")>-1) return 1;
  return 0;
}
function orderCard(o){
  var st=o.status||"NEW";
  var idx=statusIndex(st);
  var track = idx===-2 ? '<div class="opending">You asked to cancel this order. We\'ll confirm it with you shortly — if you haven\'t heard from us, send us a message.</div>'
    : idx<0 ? '<div class="ocancel">This order was cancelled.</div>'
    : '<div class="track">'+STATUS_STEPS.map(function(lbl,i){
        return '<div class="track__s'+(i<=idx?" on":"")+'"><span class="track__d"></span><em>'+
          lbl.charAt(0)+lbl.slice(1).toLowerCase()+'</em></div>';
      }).join("")+'</div>';
  var items=(o.itemList||[]).map(function(i){
    var p=findProduct(i.name);
    return '<div class="oitem">'+(p?'<img src="'+p.img+'" alt="">':'')+
      '<div><b>'+i.name+'</b><span>'+i.price+'৳ × '+i.qty+'</span></div>'+
      '<i>'+(i.price*i.qty)+'৳</i></div>';
  }).join("");
  var cancelBtn="";
  if(canCancel(o)){
    cancelBtn='<div class="ocancelbox"><button class="btn btn-ghost btn-sm" data-cancel="'+o.orderId+'">Cancel this order</button>'+
      '<span class="olen">'+cancelWindowLeft(o)+'</span></div>';
  } else if(idx>=0 && hoursSince(o.placedISO)>=CONFIG.cancelHours){
    cancelBtn='<div class="ocancelbox"><span class="olen">The '+CONFIG.cancelHours+'-hour cancellation window has closed — '+
      '<a href="'+waLink("Hi "+CONFIG.brand+"! About order "+o.orderId+" — ")+'" target="_blank" rel="noopener">message us</a> if you need to change it.</span></div>';
  }
  return '<article class="ocard" id="oc-'+o.orderId+'">'+
    '<div class="ocard__top"><div><span class="oid">'+o.orderId+'</span>'+
      '<span class="odate">'+o.placedAt+'</span></div>'+
      '<span class="ostatus '+statusClass(st)+'">'+st+'</span></div>'+
    track+
    '<div class="oitems">'+items+'</div>'+
    '<div class="ototals"><span>'+o.itemCount+' item'+(o.itemCount==1?"":"s")+' · '+o.payment+'</span><b>'+o.total+'৳</b></div>'+
    '<div class="oaddr">Delivering to '+o.name+' · '+o.area+', '+o.district+'</div>'+
    cancelBtn+
  '</article>';
}
function paintOrders(){
  var wrap=document.getElementById("ordersList"); if(!wrap)return;
  var all=getOrders();
  if(!all.length){
    wrap.innerHTML='<div class="okbox" style="margin-top:0">'+
      '<h3>No orders on this device yet</h3>'+
      '<p>Orders you place are saved here automatically so you can check on them any time.</p>'+
      '<p style="font-family:var(--tech);font-size:13.5px;color:var(--muted);margin-top:10px">'+
      'Ordered from a different phone or browser? Use the lookup box below.</p>'+
      '<a class="btn btn-gold" href="shop.html" style="margin-top:18px">Go to the shop</a></div>';
    return;
  }
  wrap.innerHTML='<div class="livebar"><span id="liveNote"></span>'+
      '<button class="btn btn-ghost btn-sm" id="refreshBtn" type="button">Refresh status</button></div>'+
    all.map(orderCard).join("");
  var rb=document.getElementById("refreshBtn");
  if(rb) rb.onclick=function(){ refreshStatuses(getOrders(),true); };
  refreshStatuses(all);
}
/* ask the sheet what the real status is now */
function refreshStatuses(all,announce){
  var note=document.getElementById("liveNote");
  if(!ORDER_ENDPOINT){
    if(note) note.innerHTML='<span class="live live--off">Live status isn\'t switched on yet — showing what you ordered.</span>';
    return;
  }
  var pending=all.slice(0,10).filter(function(o){
    return statusIndex(o.status)<4 && statusIndex(o.status)>=0;
  });
  if(!pending.length){
    if(note&&announce) note.innerHTML='<span class="live live--ok">Up to date.</span>';
    return;
  }
  if(note) note.innerHTML='<span class="live live--wait">Checking for updates…</span>';

  var done=0, reached=0, changed=0;
  pending.forEach(function(o){
    jsonp({action:"status",orderId:o.orderId,phone:o.phone},function(r){
      done++;
      if(r&&r.ok!==undefined) reached++;
      if(r&&r.ok&&r.status&&r.status!==o.status){
        changed++;
        updateOrder(o.orderId,{status:r.status});
        var card=document.getElementById("oc-"+o.orderId);
        if(card){
          var fresh=getOrders().filter(function(x){return x.orderId===o.orderId})[0];
          if(fresh) card.outerHTML=orderCard(fresh);
        }
      }
      if(done===pending.length&&note){
        if(!reached){
          note.innerHTML='<span class="live live--off">Couldn\'t reach us for a live update just now — '+
            'showing the last status we know. <a href="'+waLink("Hi "+CONFIG.brand+"! Could you tell me the status of my order?")+
            '" target="_blank" rel="noopener">Ask us directly</a></span>';
        } else if(changed){
          note.innerHTML='<span class="live live--ok">Updated just now.</span>';
        } else {
          note.innerHTML='<span class="live live--ok">Up to date — checked just now.</span>';
        }
      }
    });
  });
}
function doCancel(id){
  var o=getOrders().filter(function(x){return x.orderId===id})[0];
  if(!o)return;
  if(!canCancel(o)){ toast("This order can no longer be cancelled here."); paintOrders(); return; }
  if(!confirm("Cancel order "+id+"?\n\nThis cannot be undone. If you just want to change something, message us instead."))return;

  var btn=document.querySelector('[data-cancel="'+id+'"]');
  if(btn){ btn.disabled=true; btn.textContent="Cancelling…"; }

  jsonp({action:"cancel",orderId:id,phone:o.phone},function(r){
    if(r&&r.ok){
      updateOrder(id,{status:"CANCELLED BY CUSTOMER"});
      toast("Order "+id+" cancelled.");
    }else if(r&&r.ok===false&&r.reason==="window_closed"){
      toast("That order is past the cancellation window.");
      updateOrder(id,{status:r.status||"NEW"});
    }else if(r&&r.ok===false&&r.reason==="too_late_stage"){
      toast("That order has already shipped — please message us.");
      updateOrder(id,{status:r.status||"SHIPPED"});
    }else{
      /* We could not confirm with the server, so we must NOT claim it is
         cancelled — the workshop may still be printing it. */
      updateOrder(id,{status:"CANCELLATION REQUESTED"});
      toast("We couldn't confirm that automatically — please send us the message.");
      window.open(waLink("Hi "+CONFIG.brand+"! Please cancel my order "+id+" ("+o.name+", "+o.phone+")."),"_blank");
    }
    paintOrders();
  });
}
function initOrders(){
  var wrap=document.getElementById("ordersList"); if(!wrap)return;
  paintOrders();

  /* re-check when they come back to the tab, so a status you changed in
     the sheet shows up without them reloading */
  document.addEventListener("visibilitychange",function(){
    if(!document.hidden) refreshStatuses(getOrders());
  });

  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-cancel]");
    if(b) doCancel(b.getAttribute("data-cancel"));
  });

  var find=document.getElementById("lookupBtn");
  if(find) find.addEventListener("click",function(){
    var id=val("lk-id").toUpperCase(), ph=val("lk-phone");
    var out=document.getElementById("lookupResult");
    if(!id||!ph){ toast("Enter both your Order ID and phone number."); return; }
    if(!ORDER_ENDPOINT){ out.innerHTML='<div class="lkmsg">Order lookup isn\'t switched on yet — please message us and we\'ll check for you.</div>'; return; }
    out.innerHTML='<div class="lkmsg">Looking…</div>';
    jsonp({action:"status",orderId:id,phone:ph},function(r){
      if(r&&r.ok&&r.status){
        out.innerHTML='<div class="lkmsg ok"><b>'+id+'</b> — status: <b>'+r.status+'</b>'+
          (r.total?('<br>Total '+r.total+'৳ · '+(r.items||"")):"")+'</div>';
      }else{
        out.innerHTML='<div class="lkmsg">We couldn\'t find an order with that ID and phone number. '+
          'Check both or <a href="'+waLink("Hi "+CONFIG.brand+"! I'm trying to track order "+id)+'" target="_blank" rel="noopener">message us</a>.</div>';
      }
    });
  });
}

/* ---------- quote form (custom.html) ---------- */
function quoteMessage(){
  var g=function(id){var el=document.getElementById(id);return el?el.value.trim():"";};
  var who=document.querySelector("#whoSeg button.on");
  var kind=who?who.dataset.kind:"Individual";
  var lines=["Quote request — "+kind,"",
    "Name: "+g("cu-name"),
    (kind==="Company"?("Company: "+g("cu-company")+"\n"):"")+"Phone: "+g("cu-phone"),
    "Email: "+g("cu-email"),"",
    "What I need: "+g("cu-item"),
    "Size / scale: "+g("cu-size"),
    "Material / colour: "+g("cu-material"),
    "Quantity: "+g("cu-qty"),
    "Deadline: "+g("cu-deadline"),
    "Notes: "+g("cu-notes"),"",
    "(Reference file / photo attached in chat or reply.)"];
  return lines.join("\n");
}
function initQuoteForm(){
  var f=document.getElementById("customForm");if(!f)return;
  var seg=document.getElementById("whoSeg");
  if(seg)seg.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    seg.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});
    b.classList.add("on");
    var cf=document.getElementById("companyField");
    if(cf)cf.style.display=(b.dataset.kind==="Company")?"":"none";
  });
  function valid(){
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():"";};
    if(!g("cu-name")||!g("cu-item")){toast("Please add your name and what you need made.");return false;}
    return true;
  }
  var wa=document.getElementById("sendWa");
  if(wa)wa.addEventListener("click",function(){if(!valid())return;window.open(waLink("Hi "+CONFIG.brand+"!\n\n"+quoteMessage()),"_blank");});
  var em=document.getElementById("sendEmail");
  if(em)em.addEventListener("click",function(){
    if(!valid())return;
    location.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent("Quote request — "+CONFIG.brand)+"&body="+encodeURIComponent(quoteMessage());
  });
}

/* ---------- contact form ---------- */
function initContactForm(){
  var f=document.getElementById("contactForm");if(!f)return;
  var send=document.getElementById("contactSend");
  if(!send)return;
  send.addEventListener("click",function(){
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():"";};
    if(!g("ct-name")||!g("ct-msg")){toast("Please add your name and a message.");return;}
    window.open(waLink("Hi "+CONFIG.brand+"!\n\nName: "+g("ct-name")+"\nPhone: "+g("ct-phone")+"\n\n"+g("ct-msg")),"_blank");
  });
}

/* ---------- FAQ chat assistant ---------- */
function initBot(){
  var fab=document.createElement("button");
  fab.className="cb-fab";fab.id="cbFab";fab.setAttribute("aria-label","Chat with us");
  fab.innerHTML='<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-8 8H5l-2 2V12a8 8 0 018-8h2a8 8 0 018 8z"/><path d="M9 11h.01M12.5 11h.01M16 11h.01"/></svg>';
  document.body.appendChild(fab);
  var panel=document.createElement("div");
  panel.className="cb";panel.id="cbPanel";
  panel.innerHTML='<div class="cb__head"><img src="images/logo.jpg" alt="">'+
    '<div><b>'+CONFIG.brand+' assistant</b><span>Instant answers · not a human</span></div>'+
    '<button class="cb__x" aria-label="Close">&times;</button></div>'+
    '<div class="cb__body" id="cbBody"></div>'+
    '<div class="cb__foot"><input id="cbInput" placeholder="Type a question…" aria-label="Your question">'+
    '<button id="cbSend" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button></div>';
  document.body.appendChild(panel);

  var body=panel.querySelector("#cbBody");
  function botSay(text,withWa){
    var m=document.createElement("div");m.className="cb__msg bot";m.textContent=text;
    if(withWa){
      var a=document.createElement("a");a.className="btn btn-gold btn-sm";
      a.href=waLink("Hi "+CONFIG.brand+"! I have a question: ");a.target="_blank";a.rel="noopener";
      a.textContent="Ask us on WhatsApp";m.appendChild(document.createElement("br"));m.appendChild(a);
    }
    body.appendChild(m);body.scrollTop=body.scrollHeight;
  }
  function meSay(text){
    var m=document.createElement("div");m.className="cb__msg me";m.textContent=text;
    body.appendChild(m);body.scrollTop=body.scrollHeight;
  }
  function chips(){
    var c=document.createElement("div");c.className="cb__chips";
    FAQ.slice(0,6).forEach(function(f){
      var b=document.createElement("button");b.textContent=f.q;
      b.onclick=function(){meSay(f.q);setTimeout(function(){botSay(f.a);},260);};
      c.appendChild(b);
    });
    body.appendChild(c);body.scrollTop=body.scrollHeight;
  }
  function answer(input){
    var t=input.toLowerCase();
    var best=null,score=0;
    FAQ.forEach(function(f){
      var s=0;
      f.k.forEach(function(k){if(t.indexOf(k)>-1)s+=k.split(" ").length;});
      if(s>score){score=s;best=f;}
    });
    if(best&&score>0)botSay(best.a);
    else botSay("I don't have that one yet — but a human does! Tap below and ask us directly; we usually reply fast.",true);
  }
  function send(){
    var inp=panel.querySelector("#cbInput");
    var v=inp.value.trim();if(!v)return;
    meSay(v);inp.value="";
    setTimeout(function(){answer(v);},300);
  }
  panel.querySelector("#cbSend").addEventListener("click",send);
  panel.querySelector("#cbInput").addEventListener("keydown",function(e){if(e.key==="Enter")send();});
  panel.querySelector(".cb__x").addEventListener("click",function(){panel.classList.remove("on");});
  var opened=false;
  fab.addEventListener("click",function(){
    panel.classList.toggle("on");
    if(panel.classList.contains("on")&&!opened){
      opened=true;
      botSay("Hi! I can answer common questions about ordering, pricing, delivery and materials. Tap one below or type your own.");
      chips();
    }
  });
}

/* ---------- go ---------- */
document.addEventListener("DOMContentLoaded",function(){
  buildChrome();
  paintCartCount();
  initCardActions();
  initShop();
  renderFeatured();
  initWorks();
  initHero();
  initReveal();
  initQuoteForm();
  initContactForm();
  initCheckout();
  initOrders();
  initBot();
});
