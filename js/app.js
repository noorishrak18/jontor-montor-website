/* =====================================================================
   JONTOR MONTOR — site logic (shared by every page)
   =====================================================================
   Everything you'll normally change lives in the blocks below:
     1) CONFIG  — phone, email, social links, announcement bar
     2) FAQ     — the questions the chat assistant can answer
     3) DATA    — products, fan requests, projects, amigurumi
   Look for "EDIT HERE". Change text between quotes; keep the quotes,
   colons and commas exactly where they are.
   ===================================================================== */

/* ============ 1) EDIT HERE ▸ YOUR BUSINESS DETAILS ============ */
var CONFIG = {
  brand:     "Jontor Montor",
  brandBn:   "যন্তর মন্তর",
  tagline:   "3D Printing · Prototyping · Collectibles — Bangladesh",

  // ▼▼ THE ONE THING YOU MUST CHANGE ▼▼
  // WhatsApp number: country code + number, digits only (no +, spaces, dashes)
  phone:     "8801601333064",

  email:     "jontormontor.official@gmail.com",          // quotes & corporate enquiries land here
    facebook:  "https://www.facebook.com/share/1BfhpWifUt/",
    instagram: "https://www.instagram.com/jontor.montor?igsh=ZjBpaGNjOWNrMGxq",     // "" to hide
    linkedin:  "https://www.linkedin.com/company/jontor-montor/",  // "" to hide

  announce:  "Now taking prototyping & production orders — students, architecture & civil firms, product companies. Get a quote in hours."
};

/* ============ 2) EDIT HERE ▸ FAQ (what the chat assistant knows) ============
   q = the question shown as a tappable chip
   k = keywords that trigger this answer (lowercase)
   a = the answer. \n makes a new line.                                       */
var FAQ = [
 {q:"How do I get a quote?",
  k:["quote","quotation","how to order","order","rfq","start"],
  a:"Easy — go to the Get a quote page, tell us what you need, and send it by WhatsApp or email.\nWe usually reply within a few hours with a price and lead time."},
 {q:"What does it cost?",
  k:["cost","price","pricing","how much","rate","charge","taka"],
  a:"Every job is priced individually — it depends on size, material and finishing.\nCollectibles on the Shop page have prices listed. For anything custom, send the details on the Get a quote page and we'll quote it, usually within hours. No obligation."},
 {q:"How fast is delivery?",
  k:["delivery","deliver","shipping","ship","how long","lead time","days","time","fast","when"],
  a:"Inside Dhaka: usually 1–3 days after the print is done.\nAnywhere else in Bangladesh: by courier.\nMade-to-order pieces and projects get a lead time in the quote — average turnaround is about a week."},
 {q:"How do I pay?",
  k:["pay","payment","bkash","nagad","cod","cash","advance","invoice"],
  a:"Cash on delivery, bKash or Nagad.\nLarger custom jobs may need a small advance. Companies can request an invoice."},
 {q:"What materials can you print?",
  k:["material","materials","pla","petg","abs","asa","tpu","nylon","pa","pc","carbon","cf","resin","filament","plastic","strength"],
  a:"Everyday: PLA / PLA+ and silk/matte finishes. Engineering: PETG, ABS, ASA, PC, plus carbon-fiber blends like PLA-CF and PETG-CF for stiff, matte parts. Flexible: TPU. Nylon (PA/PA-CF) for wear parts on request.\nWe print on an enclosed-chamber machine with automatic multicolor.\nNot sure what fits? Describe how the part will be used and we'll recommend one."},
 {q:"What files do you accept?",
  k:["file","files","format","stl","obj","step","cad","3mf","dwg","sketch","drawing","photo"],
  a:"Best: STL, OBJ, STEP or 3MF files.\nNo CAD file? A drawing, photo or even a clear description works — we can model it for you (small modelling fee depending on complexity)."},
 {q:"Can you do university projects?",
  k:["university","student","thesis","final year","architecture","civil","naval","mechanical","eee","project","model","scale"],
  a:"Yes — that's one of our main services. Scale models for architecture & civil, mechanical assemblies, enclosures for EEE, and more.\nStudent rates are available. Send your file or drawing on the Get a quote page."},
 {q:"Do you work with companies?",
  k:["company","corporate","firm","business","bulk","batch","production","prototype","nda","b2b"],
  a:"Yes — we prototype and produce small batches for companies: enclosures, jigs & fixtures, brackets, product prototypes and presentation models.\nNDA on request, invoice available. Email us the RFQ or use the Get a quote page."},
 {q:"Is my design confidential?",
  k:["confidential","nda","secret","privacy","protect","ip"],
  a:"Yes. Client files are never shared or reused, and we're happy to sign an NDA before you send anything."},
 {q:"Can you make something not on the site?",
  k:["custom","not on","anything","request","specific","character","figure","gift"],
  a:"Almost certainly — most of what we make started as a customer request.\nName the character, prop or part on the Get a quote page and we'll tell you if it's printable and what it costs."},
 {q:"Where are you located?",
  k:["located","location","where","address","dhaka","bangladesh","visit","shop"],
  a:"We're based in Bangladesh and deliver nationwide. Orders run through WhatsApp, Facebook and email — no walk-in showroom yet."}
];

/* ============ 3) EDIT HERE ▸ PRODUCTS (Shop page) ============
   badge: "stock" = In stock | "order" = Made to order
   now/was: prices, numbers only ("" for no old price)              */
var PRODUCTS = [
 {name:"Zenitsu Nichirin Katana", sub:"Anime · Demon Slayer",    tag:"Anime",       badge:"stock", now:"1899", was:"2399", img:"images/katana-zenitsu.jpg"},
 {name:"Shinobu Nichirin Katana", sub:"Anime · Demon Slayer",    tag:"Anime",       badge:"stock", now:"1899", was:"2399", img:"images/katana-shinobu.jpg"},
 {name:"Wado Ichimonji Katana",   sub:"Anime · One Piece",       tag:"Anime",       badge:"stock", now:"1899", was:"2399", img:"images/katana-onepiece.jpg"},
 {name:"Elder Wand replica",      sub:"Harry Potter · prop",     tag:"Harry Potter", badge:"order", now:"1099", was:"1499", img:"images/wand-elder.jpg"},
 {name:"Harry Potter Wand (boxed)",sub:"Harry Potter · prop",    tag:"Harry Potter", badge:"order", now:"1199", was:"1599", img:"images/wand-harry.jpg"},
 {name:"Kratos Headphone Stand",  sub:"Gaming · God of War",     tag:"Gaming",      badge:"stock", now:"2989", was:"3999", img:"images/kratos-stand.jpg"},
 {name:"Spider-Man Headphone Stand",sub:"Marvel · headphone stand",tag:"Marvel & DC",badge:"stock",now:"2489", was:"2999", img:"images/spiderman-stand.jpg"},
 {name:"Batman Cosplay Mask",     sub:"DC · wearable",           tag:"Marvel & DC", badge:"order", now:"1699", was:"2199", img:"images/batman-mask.jpg"},
 {name:"Poké Ball (openable)",    sub:"Gaming · Pokémon",        tag:"Gaming",      badge:"stock", now:"699",  was:"899",  img:"images/pokeball.jpg"},
 {name:"Squid Game Figure",       sub:"Movies & TV · Squid Game",tag:"Movies & TV", badge:"order", now:"899",  was:"1200", img:"images/squidgame.jpg"},
 {name:"Demogorgon Figure",       sub:"Movies & TV · Stranger Things",tag:"Movies & TV",badge:"stock",now:"799",was:"1100", img:"images/demogorgon.jpg"},
 {name:"Rocky — Project Hail Mary",sub:"Sci-Fi · figure",        tag:"Sci-Fi",      badge:"stock", now:"189",  was:"400",  img:"images/hailmary.jpg"},
 {name:"Groot Keychain",          sub:"Marvel · keychain",       tag:"Marvel & DC", badge:"stock", now:"299",  was:"450",  img:"images/groot-key.jpg"},
 {name:"Articulated Snake (flexi)",sub:"Flexi · fidget",         tag:"Flexi",       badge:"stock", now:"349",  was:"500",  img:"images/snake-flexi.jpg"}
];

/* EDIT HERE ▸ "YOU WISHED, WE DELIVERED" (Shop page) */
var WISHED = [
 {name:"CUET FS clapperboard",     req:"Requested by CUET Film Society",  img:"images/cuet.jpg"},
 {name:"John Wick figure",         req:"A customer asked — we made it",   img:"images/johnwick.jpg"},
 {name:"Darth Vader helmet",       req:"Built from a fan's request",      img:"images/vader-helmet.jpg"},
 {name:"Doctor Doom cosplay mask", req:"Made to a buyer's spec",          img:"images/drdoom.jpg"}
 // ,{name:"Avatar figure", req:"A customer wished for it", img:"images/avatar.jpg"}
];

/* EDIT HERE ▸ PROJECTS / OUR WORK (homepage) — cat: mech, eee, prod, rnd */
var WORKS = [
 {cat:"mech", label:"Mechanical",          title:"Gear & shaft assembly",   meta:["Functional","PETG","Moving parts"], img:"images/proj-gear.jpg"},
 {cat:"eee",  label:"EEE",                 title:"Electronics enclosure",   meta:["Custom fit","PLA","PCB housing"],   img:"images/proj-eee.jpg"},
 {cat:"prod", label:"Product / Industrial",title:"Bracket & mount set",     meta:["Batch","PLA+","Client"],            img:"images/proj-mech.jpg"},
 {cat:"rnd",  label:"Company R&D",         title:"Jig & fixture",           meta:["Assembly aid","Resin","Repeatable"],img:"images/proj-fixture.jpg"},
 {cat:"prod", label:"Product / Industrial",title:"Small-batch parts run",   meta:["x20+","ABS","Production"],          img:"images/proj-parts.jpg"},
 {cat:"mech", label:"Mechanical",          title:"Precision cylinder part", meta:["Prototype","PETG","Test fit"],      img:"images/proj-cylinder.jpg"}
];

/* EDIT HERE ▸ AMIGURUMI (Shop page) */
var AMI = [
 {name:"লক্ষ্মী প্যাঁচা · Owl",     now:"239", was:"470", img:"images/ami-owl.jpg"},
 {name:"সুখ পাখি · Bird",          now:"319", was:"550", img:"images/ami-bird.jpg"},
 {name:"মন্টু হাতি · Elephant",     now:"289", was:"570", img:"images/ami-elephant.jpg"},
 {name:"সাগর ঘোড়া · Seahorse",     now:"289", was:"570", img:"images/ami-seahorse.jpg"}
];

/* EDIT HERE ▸ ROOM DECOR & STATEMENT PIECES (Shop page) ============
   Statues, busts and display pieces. Same format as PRODUCTS.        */
var DECOR = [
 {name:"Buddha Statue",        sub:"Statue · home decor",   tag:"Statue", badge:"order", now:"1299", was:"1699", img:"images/buddha.jpg"},
 {name:"Venom Bust",           sub:"Marvel · display bust", tag:"Bust",   badge:"order", now:"1799", was:"2299", img:"images/venom-bust.jpg"},
 {name:"Darth Vader Helmet",   sub:"Star Wars · display",   tag:"Display",badge:"order", now:"2499", was:"2999", img:"images/vader-helmet.jpg"}
];

/* EDIT HERE ▸ FEATURED ON HOMEPAGE ============
   Which pieces show in the homepage "From the collectibles shop" row.
   Use the exact name from PRODUCTS or AMI above. 4 works best.      */
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
var HOME = /(?:shop|custom|about|contact)\.html/.test(location.pathname) ? "index.html" : "";

/* ---------- header + footer ---------- */
function buildChrome(){
  var logo="images/logo.jpg";
  var header=document.getElementById("site-header");
  if(header){
    header.innerHTML =
     '<div class="topbar"><span id="ticker">'+CONFIG.announce+'</span></div>'+
     '<header class="nav" id="siteNav"><div class="wrap nav__in">'+
       '<a href="'+(HOME||"#")+'" class="brand"><img src="'+logo+'" alt="logo"> '+CONFIG.brand+'</a>'+
       '<nav class="navlinks">'+
         '<a href="'+HOME+'#services">Services</a>'+
         '<a href="'+HOME+'#capabilities">Capabilities</a>'+
         '<a href="'+HOME+'#works">Our work</a>'+
         '<a href="shop.html">Shop</a>'+
         '<a href="about.html">About</a>'+
         '<a href="contact.html">Contact</a>'+
       '</nav>'+
       '<div class="nav__right">'+
         '<button class="iconbtn" id="cartBtn" aria-label="Cart">'+
           '<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg>'+
           '<span class="cartcount" id="cartCount">0</span>'+
         '</button>'+
         '<a href="custom.html" class="btn btn-gold btn-sm">Get a quote</a>'+
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
       '<div class="foot__brand"><a href="'+(HOME||"#")+'" class="brand"><img src="'+logo+'" alt="logo"> '+CONFIG.brand+'</a>'+
         '<p>3D printing studio in Bangladesh — rapid prototyping and small-batch production for companies and students, plus a collectibles shop loved by fans.</p>'+
         '<div class="paystrip"><span>Cash on delivery</span><span>bKash</span><span>Nagad</span><span>Invoice for companies</span></div></div>'+
       '<div><h5>Services</h5><a href="'+HOME+'#services">Rapid prototyping</a><a href="'+HOME+'#services">Small-batch production</a><a href="'+HOME+'#services">Scale &amp; study models</a><a href="custom.html">Get a quote</a></div>'+
       '<div><h5>Shop</h5><a href="shop.html">All collectibles</a><a href="shop.html#fandoms">Shop by fandom</a><a href="shop.html#ami">Amigurumi</a><a href="custom.html">Request a piece</a></div>'+
       '<div><h5>Company</h5><a href="about.html">About us</a><a href="contact.html">Contact</a>'+
         '<p style="color:var(--muted);font-size:13px;margin-top:10px">Find us on</p>'+
         '<div class="paystrip">'+social+'</div></div>'+
     '</div><div class="foot__bottom"><span>© '+new Date().getFullYear()+' '+CONFIG.brand+' · 3D Printing &amp; Collectibles</span><span>Made in Bangladesh 🇧🇩</span></div></div></footer>';
  }
  var mt=document.getElementById("menuToggle");
  if(mt) mt.addEventListener("click", function(){ document.getElementById("siteNav").classList.toggle("open"); });
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
function setCart(c){localStorage.setItem("jm_cart",JSON.stringify(c));paintCartCount();paintCart();}
function paintCartCount(){var n=getCart().reduce(function(s,i){return s+i.qty},0);var el=document.getElementById("cartCount");if(el)el.textContent=n;}
function addToCart(name,price){
  var c=getCart(),f=c.filter(function(i){return i.name===name})[0];
  if(f)f.qty++;else c.push({name:name,price:+price,qty:1});
  setCart(c);toast("Added: "+name);openCart();
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
  if(!c.length){body.innerHTML='<div class="drawer__empty">Your cart is empty.<br>Add a piece from the <a href="shop.html" style="color:var(--gold)">Shop</a> and check out on WhatsApp.</div>';foot.innerHTML='';return;}
  body.innerHTML=c.map(function(i){
    return '<div class="citem"><div class="citem__main"><div class="citem__n">'+i.name+'</div>'+
      '<div class="citem__p">'+i.price+'৳ each</div>'+
      '<div class="qty"><button aria-label="less" onclick="changeQty(\''+esc(i.name)+'\',-1)">–</button>'+
      '<span>'+i.qty+'</span><button aria-label="more" onclick="changeQty(\''+esc(i.name)+'\',1)">+</button></div></div>'+
      '<button class="citem__rm" onclick="removeItem(\''+esc(i.name)+'\')">remove</button></div>';
  }).join("");
  var sub=c.reduce(function(s,i){return s+i.price*i.qty},0);
  foot.innerHTML='<div class="drawer__sub"><span>Subtotal</span><b>'+sub+'৳</b></div>'+
    '<a class="btn btn-gold" href="'+cartWaLink()+'" target="_blank" rel="noopener" onclick="toast(\'Opening WhatsApp…\')">Checkout on WhatsApp</a>'+
    '<div class="drawer__note">You\'ll confirm your order &amp; address in the WhatsApp chat.</div>';
}
function cartWaLink(){
  var c=getCart();
  var lines=c.map(function(i){return "• "+i.name+" × "+i.qty+" — "+(i.price*i.qty)+"৳"}).join("\n");
  var sub=c.reduce(function(s,i){return s+i.price*i.qty},0);
  return waLink("Hi "+CONFIG.brand+"! I'd like to order:\n\n"+lines+"\n\nSubtotal: "+sub+"৳\n\nMy details —\nName: \nPhone: \nAddress: \nArea/District: \nPayment (COD / bKash / Nagad): ");
}
function openCart(){ensureDrawer();document.getElementById("cartOv").classList.add("on");document.getElementById("cartDrawer").classList.add("on");}
function closeCart(){var o=document.getElementById("cartOv"),d=document.getElementById("cartDrawer");if(o)o.classList.remove("on");if(d)d.classList.remove("on");}

/* ---------- product rendering ---------- */
function pct(now,was){if(!was)return"";var p=Math.round((1-(+now)/(+was))*100);return p>0?("-"+p+"%"):"";}
function pcard(p){
  var badge=p.badge==="stock"?'<span class="badge b-stock">In stock</span>':'<span class="badge b-order">Made to order</span>';
  var price='<span class="now">'+p.now+'৳</span>'+(p.was?'<span class="was">'+p.was+'৳</span><span class="off">'+pct(p.now,p.was)+'</span>':'');
  return '<article class="pcard"><div class="pcard__media">'+badge+'<span class="ftag">'+p.tag+'</span>'+
    '<img src="'+p.img+'" alt="'+p.name+'" loading="lazy"><div class="quick">'+
    '<button class="btn btn-gold btn-sm" data-add="'+encodeURIComponent(p.name)+'" data-price="'+p.now+'">Add to cart</button></div></div>'+
    '<div class="pcard__body"><div class="pcard__name">'+p.name+'</div><div class="pcard__sub">'+p.sub+'</div>'+
    '<div class="price">'+price+'</div></div></article>';
}
function fill(id,html){var el=document.getElementById(id);if(el)el.innerHTML=html;}
function renderCatalog(){
  fill("grid",PRODUCTS.map(pcard).join(""));
  fill("wishgrid",WISHED.map(function(w){
    return '<article class="wishcard"><div class="wishcard__media"><span class="ribbon">Requested</span>'+
      '<img src="'+w.img+'" alt="'+w.name+'" loading="lazy"></div><div class="wishcard__body">'+
      '<div class="wishcard__name">'+w.name+'</div><div class="wishcard__req">'+w.req+'</div></div></article>';
  }).join(""));
  fill("amirow",AMI.map(function(a){
    return pcard({img:a.img,name:a.name,sub:"Amigurumi · handmade",tag:"Amigurumi",badge:"stock",now:a.now,was:a.was});
  }).join(""));
  fill("decorrow",DECOR.map(pcard).join(""));
  document.querySelectorAll("[data-add]").forEach(function(b){
    b.addEventListener("click",function(){addToCart(decodeURIComponent(b.dataset.add),b.dataset.price);});
  });
}
function renderFeatured(){
  var el=document.getElementById("featgrid");if(!el)return;
  var all=PRODUCTS.concat(DECOR).concat(AMI.map(function(a){
    return {img:a.img,name:a.name,sub:"Amigurumi · handmade",tag:"Amigurumi",badge:"stock",now:a.now,was:a.was};
  }));
  var picks=FEATURED_ON_HOME.map(function(n){
    return all.filter(function(p){return p.name===n})[0];
  }).filter(Boolean);
  el.innerHTML=picks.map(pcard).join("");
  el.querySelectorAll("[data-add]").forEach(function(b){
    b.addEventListener("click",function(){addToCart(decodeURIComponent(b.dataset.add),b.dataset.price);});
  });
}

/* ---------- projects ---------- */
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

/* ---------- shop-by-type chips ---------- */
function initTypeStrip(){
  var s=document.getElementById("typestrip");if(!s)return;
  s.addEventListener("click",function(e){
    var c=e.target.closest(".typechip");if(!c)return;
    window.open(waLink("Hi "+CONFIG.brand+"! I'm looking for: "+c.dataset.type),"_blank");
  });
}

/* ---------- hero rotation ---------- */
function initHero(){
  var stage=document.getElementById("stage");if(!stage)return;
  var slides=[].slice.call(stage.querySelectorAll(".stage__slide"));
  var dotsBox=document.getElementById("dots"),cur=0;
  if(!slides.length)return;
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
  document.getElementById("contactSend").addEventListener("click",function(){
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():"";};
    if(!g("ct-name")||!g("ct-msg")){toast("Please add your name and a message.");return;}
    window.open(waLink("Hi "+CONFIG.brand+"!\n\nName: "+g("ct-name")+"\nPhone: "+g("ct-phone")+"\n\n"+g("ct-msg")),"_blank");
  });
}

/* ---------- FAQ chat assistant ---------- */
function initBot(){
  // floating chat button + panel, injected on every page
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
      botSay("Hi! I can answer common questions about pricing, delivery, materials and custom orders. Tap one below or type your own.");
      chips();
    }
  });
}

/* ---------- go ---------- */
document.addEventListener("DOMContentLoaded",function(){
  buildChrome();
  paintCartCount();
  renderCatalog();
  renderFeatured();
  initWorks();
  initTypeStrip();
  initHero();
  initReveal();
  initQuoteForm();
  initContactForm();
  initBot();
});
