import React, { useState, useEffect } from "react";
import api from "../Services/api";

import Header         from "./Header";
import Footer         from "./Footer";
import Navbar         from "./Navbar";
import BannerHero     from "./BannerHero";
import CartDrawer     from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import CheckoutModal  from "./CheckoutModal";
import { ProductCard, ScrollSection } from "./ProductCard";

/* ─── Static data ─────────────────────────────────────── */
const BLOG_POSTS = [
  { id:1, date:"Mar 5, 2026",  category:"Nutrition", title:"10 Superfoods That Will Transform Your Morning",      excerpt:"Start your day with these nutrient-dense powerhouses that boost energy and focus all morning long.", readTime:"5 min", color:"#d4edda", emoji:"🥗" },
  { id:2, date:"Feb 28, 2026", category:"Recipes",   title:"The Art of Perfect Sourdough — A Beginner's Guide",  excerpt:"Master fermentation, hydration and shaping techniques to bake the most gorgeous crusty loaf.",      readTime:"8 min", color:"#fff3cd", emoji:"🍞" },
  { id:3, date:"Feb 18, 2026", category:"Wellness",  title:"Why Seasonal Eating Changes Everything About Health", excerpt:"Discover how aligning your diet with nature's rhythms can reduce inflammation and boost immunity.",   readTime:"6 min", color:"#cfe2ff", emoji:"🌿" },
];

const TESTIMONIALS = [
  { name:"Sarah K.",  location:"New York", text:"The freshness is unbelievable! My avocados arrived perfectly ripe. This has completely replaced my weekly grocery run.", rating:5, avatar:"👩"    },
  { name:"James T.",  location:"London",   text:"Incredible selection and lightning-fast delivery. The organic range is genuinely better than anything at my local supermarket.", rating:5, avatar:"👨"   },
  { name:"Priya M.",  location:"Toronto",  text:"The salmon fillet was restaurant-quality. I've been ordering weekly for 3 months. Never going back to regular grocery stores!", rating:5, avatar:"👩‍💼" },
];

const TAGS = ["Organic Avocado","Greek Yogurt","Sourdough Bread","Cold Brew Coffee","Dark Chocolate","Free Range Eggs","Fresh Salmon","Almond Milk","Honeycrisp Apples","Granola Crunch","Frozen Berries","Turmeric Tea"];

/* ─── Main ─────────────────────────────────────────────── */
export default function OrganicStore() {

  // ── Data ──
  const [categories, setCategories] = useState([]);
  const [products,   setProducts]   = useState([]);
  const [banners,    setBanners]    = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    api.get("/category").then(r => setCategories(r.data.data)).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get("/product").then(r => setProducts(r.data.data)).catch(console.log).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api.get("/homebanner/web").then(r => setBanners(r.data.data)).catch(console.error);
  }, []);

  // ── UI state ──
  const [cartOpen,       setCartOpen]       = useState(false);
  const [navOpen,        setNavOpen]        = useState(false);
  const [wishlistOpen,   setWishlistOpen]   = useState(false);
  const [checkoutOpen,   setCheckoutOpen]   = useState(false);
  const [cart,           setCart]           = useState([]);
  const [wishlist,       setWishlist]       = useState([]);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subEmail,       setSubEmail]       = useState("");
  const [subDone,        setSubDone]        = useState(false);
  const [toast,          setToast]          = useState("");

  const notify = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  // ── Cart ──
  const addToCart = product => {
    const pid = product.id || product._id;
    setCart(prev => {
      const idx = prev.findIndex(i => (i.id||i._id)===pid);
      if (idx>=0) { const n=[...prev]; n[idx]={...n[idx],qty:n[idx].qty+product.qty}; return n; }
      return [...prev, product];
    });
    notify(`✓ ${product.name} added to cart!`);
  };

  const toggleWishlist = id => {
    const inList = wishlist.includes(id);
    setWishlist(prev => inList ? prev.filter(i=>i!==id) : [...prev,id]);
    const found = products.find(p=>(p.id||p._id)===id);
    notify(inList ? "Removed from wishlist" : `❤️ ${found?.name||found?.productName||""} wishlisted!`);
  };

  const cartCount     = cart.reduce((s,i)=>s+i.qty,0);
  const wishlistCount = wishlist.length;

  // ── Product helpers ──
  const getCat   = p => typeof p.category==="object"&&p.category ? p.category.name||"" : p.category||"";
  const getBadge = p => p.badge||p.tag||"";

  const filtered = products.filter(p => {
    const mc = activeCategory==="All" || getCat(p)===activeCategory;
    const ms = search==="" || (p.name||p.productName||"").toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const bestSellers = products.filter(p=>(p.reviews||p.reviewCount||0)>350);
  const featured    = products.filter(p=>["Premium","Artisan","Raw","Best Seller"].includes(getBadge(p)));
  const newArrivals = products.filter(p=>["New","Seasonal","Crunchy","Wellness"].includes(getBadge(p)));
  const eBest = bestSellers.length>0 ? bestSellers : products.slice(0,8);
  const eFeat = featured.length>0    ? featured     : products.slice(0,8);
  const eNew  = newArrivals.length>0 ? newArrivals  : products.slice(0,8);

  const showDefault = !search && activeCategory==="All";

  return (
    <div style={{ fontFamily:"Montserrat, sans-serif", background:"#f8f9fa", minHeight:"100vh", color:"#1a1a2e" }}>
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(18px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes bnSlideOutL{to{transform:translateX(-100%);opacity:0}}
        @keyframes bnSlideOutR{to{transform:translateX(100%);opacity:0}}
        @keyframes bnSlideInR{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes bnSlideInL{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes bnFadeOut{to{opacity:0}}
        @keyframes bnFadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bnProgress{from{width:0}to{width:100%}}
        @keyframes wlSlideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes wlPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"#1a1a2e", color:"#fff", padding:"12px 26px", borderRadius:50, fontWeight:600, zIndex:9999, boxShadow:"0 8px 32px rgba(0,0,0,0.28)", whiteSpace:"nowrap", animation:"slideUp 0.3s ease", fontSize:14 }}>
          {toast}
        </div>
      )}

      {/* ── HEADER ── */}
      <Header
        search={search} setSearch={setSearch}
        cartCount={cartCount} wishlistCount={wishlistCount}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onNavOpen={() => setNavOpen(true)}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* ── BANNER + HERO (home only) ── */}
      {showDefault && <BannerHero banners={banners} />}

      {/* ── FILTER / SEARCH RESULTS ── */}
      {(search || activeCategory!=="All") && (
        <section style={{ padding:"40px 24px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h4 style={{ margin:0, fontSize:20, fontWeight:800 }}>
                {search ? `Results for "${search}"` : activeCategory}
                <span style={{ fontSize:16, color:"#9ca3af", fontWeight:400, marginLeft:10 }}>{filtered.length} items</span>
              </h4>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} style={{ background:"#f3f4f6", border:"none", padding:"8px 16px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 }}>Clear ✕</button>
            </div>
            {loading ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af", fontSize:16 }}>Loading products…</div>
            ) : filtered.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 0" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                <p style={{ color:"#9ca3af", fontSize:16 }}>No products found</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
                {filtered.map(p => <ProductCard key={p.id||p._id} product={p} onAddToCart={addToCart} onWishlist={toggleWishlist} wished={wishlist.includes(p.id||p._id)} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── DEFAULT HOME SECTIONS ── */}
      {showDefault && (
        <>
          {/* Shop by Category */}
          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <h2 style={{ fontSize:28, fontWeight:900, margin:"0 0 10px" }}>Shop by Category</h2>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:16 }}>
                {categories.map(cat => (
                  <button key={cat.id||cat._id} onClick={() => setActiveCategory(cat.name)}
                    style={{ background:cat.color||"#f0fdf4", border:`2px solid ${cat.color||"#f0fdf4"}`, borderRadius:20, padding:"22px 10px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:10, transition:"all 0.22s" }}
                    onMouseEnter={e => { e.currentTarget.style.border=`2px solid ${cat.accent||"#16a34a"}`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${cat.accent||"#16a34a"}28`; }}
                    onMouseLeave={e => { e.currentTarget.style.border=`2px solid ${cat.color||"#f0fdf4"}`; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    {cat.image ? <img src={`http://localhost:5000/${cat.image}`} alt={cat.name} style={{ width:40 }}/> : <span style={{ fontSize:32 }}>📦</span>}
                    <span style={{ fontSize:13, fontWeight:700, color:cat.accent||"#16a34a", textAlign:"center", lineHeight:1.3 }}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}><ScrollSection title="🏆 Best Sellers" items={eBest} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} /></div>

          {/* Promo banners */}
          <section style={{ padding:"48px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:20 }}>
              <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:24, padding:"44px 40px", color:"#fff", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-20, top:-20, fontSize:120, opacity:0.12, pointerEvents:"none" }}>🥦</div>
                <div>
                  <span style={{ background:"#22c55e", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:50, textTransform:"uppercase", letterSpacing:1 }}>Limited Offer</span>
                  <h5 style={{ margin:"16px 0 8px", fontSize:22, fontWeight:900, lineHeight:1.2 }}>Summer Sale Up to 40% Off</h5>
                  <p style={{ margin:0, opacity:0.8, fontSize:14 }}>Fresh seasonal produce at unbeatable prices</p>
                </div>
                <button style={{ alignSelf:"flex-start", marginTop:20, background:"#22c55e", color:"#fff", border:"none", borderRadius:50, padding:"12px 26px", fontWeight:800, cursor:"pointer" }}>Shop Sale →</button>
              </div>
              {[{grad:"135deg,#7e22ce,#a21caf",label:"New",title:"Dairy Free Range",sub:"Combo deals from ₹9.99",emoji:"🫙"},{grad:"135deg,#c2410c,#ea580c",label:"Trending",title:"Raw & Natural",sub:"Organic honey collection",emoji:"🍯"}].map(b => (
                <div key={b.title} style={{ background:`linear-gradient(${b.grad})`, borderRadius:24, padding:"32px 28px", color:"#fff", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:-10, top:-10, fontSize:80, opacity:0.2, pointerEvents:"none" }}>{b.emoji}</div>
                  <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:50 }}>{b.label}</span>
                  <h5 style={{ margin:"14px 0 6px", fontSize:17, fontWeight:900 }}>{b.title}</h5>
                  <p style={{ margin:"0 0 20px", opacity:0.8, fontSize:13 }}>{b.sub}</p>
                  <button style={{ background:"none", border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", padding:0 }}>Explore →</button>
                </div>
              ))}
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}><ScrollSection title="⭐ Featured Products" items={eFeat} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} /></div>

          {/* Newsletter */}
          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", borderRadius:32, padding:"60px 48px", display:"flex", flexWrap:"wrap", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-40, top:-40, width:300, height:300, background:"rgba(34,197,94,0.08)", borderRadius:"50%", pointerEvents:"none" }} />
                <div style={{ flex:"1 1 300px" }}>
                  <div style={{ color:"#22c55e", fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:2, marginBottom:14 }}>🎁 Exclusive Offer</div>
                  <h4 style={{ margin:"0 0 12px", fontSize:26, fontWeight:900, color:"#fff", lineHeight:1.2 }}>Get 25% Off Your First Order</h4>
                  <p style={{ margin:0, color:"rgba(255,255,255,0.65)", fontSize:15, lineHeight:1.6 }}>Join 50,000+ members enjoying weekly deals, new arrivals and fresh alerts.</p>
                </div>
                <div style={{ flex:"1 1 280px" }}>
                  {subDone ? (
                    <div style={{ textAlign:"center", color:"#22c55e", fontSize:16, fontWeight:800 }}>✅ You're on the list!</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      <input placeholder="Your name" style={{ padding:"14px 20px", borderRadius:14, border:"none", fontSize:14, background:"rgba(255,255,255,0.1)", color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }}/>
                      <input type="email" value={subEmail} onChange={e=>setSubEmail(e.target.value)} placeholder="Email address" style={{ padding:"14px 20px", borderRadius:14, border:"none", fontSize:14, background:"rgba(255,255,255,0.1)", color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }}/>
                      <button onClick={() => { if(subEmail){setSubDone(true);setSubEmail("");} }} style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:14, fontWeight:800, fontSize:14, cursor:"pointer" }}>Subscribe & Get 25% Off</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}><ScrollSection title="🆕 New Arrivals" items={eNew} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} /></div>

          {/* Testimonials */}
          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <h2 style={{ fontWeight:900, margin:"0 0 8px" }}>What Our Customers Say</h2>
                <p style={{ color:"#6b7280", margin:0 }}>Trusted by 50,000+ happy shoppers worldwide</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
                {TESTIMONIALS.map(t => (
                  <div key={t.name} style={{ background:"#f8fffe", borderRadius:24, padding:"32px 28px", border:"1.5px solid #dcfce7", transition:"all 0.22s", cursor:"default" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow="0 10px 36px rgba(22,163,74,0.12)"; e.currentTarget.style.borderColor="#86efac"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="#dcfce7"; }}>
                    <div style={{ display:"flex", marginBottom:16 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ color:"#f59e0b", fontSize:18 }}>★</span>)}</div>
                    <p style={{ fontSize:15, lineHeight:1.75, color:"#374151", margin:"0 0 24px" }}>"{t.text}"</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{t.avatar}</div>
                      <div><div style={{ fontWeight:800, color:"#1a1a2e" }}>{t.name}</div><div style={{ fontSize:13, color:"#9ca3af" }}>{t.location}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Blog */}
          <section style={{ padding:"56px 24px", background:"#f8f9fa" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:36 }}>
                <div><h2 style={{ fontWeight:900, margin:"0 0 6px" }}>Fresh from the Blog</h2><p style={{ color:"#6b7280", margin:0 }}>Tips, recipes and nutrition guides</p></div>
                <button style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontWeight:700, cursor:"pointer" }}>View All</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
                {BLOG_POSTS.map(post => (
                  <article key={post.id} style={{ background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", cursor:"pointer", transition:"all 0.24s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)"; }}>
                    <div style={{ height:180, background:`linear-gradient(135deg,${post.color},${post.color}bb)`, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:72 }}>{post.emoji}</span></div>
                    <div style={{ padding:"24px 24px 28px" }}>
                      <div style={{ display:"flex", gap:12, marginBottom:14, alignItems:"center" }}>
                        <span style={{ fontSize:12, color:"#16a34a", fontWeight:700, textTransform:"uppercase", background:"#dcfce7", padding:"3px 10px", borderRadius:50 }}>{post.category}</span>
                        <span style={{ fontSize:13, color:"#9ca3af" }}>{post.readTime} read</span>
                      </div>
                      <h5 style={{ margin:"0 0 10px", fontSize:17, fontWeight:800, color:"#1a1a2e", lineHeight:1.4 }}>{post.title}</h5>
                      <p style={{ margin:"0 0 16px", fontSize:14, color:"#6b7280", lineHeight:1.65 }}>{post.excerpt}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:13, color:"#9ca3af" }}>{post.date}</span>
                        <button style={{ background:"none", border:"none", color:"#16a34a", fontWeight:700, cursor:"pointer", padding:0 }}>Read More →</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* App download */}
          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ background:"linear-gradient(135deg,#fef9c3,#fef3c7)", borderRadius:32, padding:"56px", display:"flex", flexWrap:"wrap", alignItems:"center", gap:40, overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", right:200, top:"50%", transform:"translateY(-50%)", fontSize:200, opacity:0.07, pointerEvents:"none" }}>📱</div>
                <div style={{ flex:"1 1 300px" }}>
                  <h2 style={{ fontWeight:900, margin:"0 0 12px", color:"#1a1a2e" }}>Download Our App</h2>
                  <p style={{ color:"#6b7280", margin:"0 0 28px", lineHeight:1.7 }}>Manage orders, track delivery, discover deals — all from your phone.</p>
                  <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                    {[["🍎","App Store","https://apps.apple.com"],["▶","Google Play","https://play.google.com"]].map(([icon,store,url]) => (
                      <a key={store} href={url} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:12, background:"#1a1a2e", color:"#fff", padding:"12px 22px", borderRadius:16, textDecoration:"none", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                        <span style={{ fontSize:22 }}>{icon}</span>
                        <div><div style={{ fontSize:11, opacity:0.7, textTransform:"uppercase", letterSpacing:1 }}>Download on</div><div style={{ fontSize:15, fontWeight:800 }}>{store}</div></div>
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize:120, textAlign:"center", flex:"0 0 auto" }}>📱</div>
              </div>
            </div>
          </section>

          {/* Tags */}
          <section style={{ padding:"32px 24px 48px", background:"#f8f9fa" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <h3 style={{ fontWeight:800, marginBottom:18 }}>People also search for</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {TAGS.map(tag => (
                  <button key={tag} onClick={() => setSearch(tag)}
                    style={{ background:"#fff", border:"1.5px solid #e5e7eb", color:"#374151", padding:"8px 18px", borderRadius:50, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#16a34a"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#374151"; e.currentTarget.style.borderColor="#e5e7eb"; }}
                  >{tag}</button>
                ))}
              </div>
            </div>
          </section>

          {/* Trust badges */}
          <section style={{ padding:"48px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:20 }}>
              {[{icon:"📦",title:"Free Delivery",desc:"On all orders over ₹49"},{icon:"🔒",title:"Secure Payments",desc:"256-bit SSL encryption"},{icon:"🌱",title:"Quality Certified",desc:"USDA organic certified"},{icon:"🔄",title:"Easy Returns",desc:"30-day hassle-free policy"},{icon:"🎯",title:"Daily Deals",desc:"New offers every morning"}].map(b => (
                <div key={b.title} style={{ background:"#f8fffe", border:"1.5px solid #dcfce7", borderRadius:20, padding:"28px 22px", textAlign:"center", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#22c55e"; e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#dcfce7"; e.currentTarget.style.background="#f8fffe"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>{b.icon}</div>
                  <div style={{ fontWeight:800, color:"#1a1a2e", marginBottom:6 }}>{b.title}</div>
                  <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.5 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── DRAWERS & MODALS ── */}
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={i => setCart(c=>c.filter((_,j)=>j!==i))}
        onClear={() => setCart([])}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <WishlistDrawer
        open={wishlistOpen} onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlist} products={products}
        onRemoveWishlist={id => setWishlist(p=>p.filter(i=>i!==id))}
        onAddToCart={addToCart} notify={notify}
      />
      <Navbar open={navOpen} onClose={() => setNavOpen(false)} categories={categories} />
      <CheckoutModal
        open={checkoutOpen} onClose={() => setCheckoutOpen(false)}
        cartItems={cart} notify={notify} onSuccess={() => setCart([])}
      />
    </div>
  );
}