import React, { useState, useRef, useEffect } from "react";
import api from "../Services/api";

/* ─────────────────────────────────────────────
   DUMMY DATA  (unchanged)
───────────────────────────────────────────── */

const PRODUCTS = [
  { id: 1,  name: "Organic Avocado",           category: "Fruits & Veggies", price: 3.49,  oldPrice: 4.99,  rating: 4.8, reviews: 312, badge: "Organic",     emoji: "🥑", desc: "Creamy Hass avocados, perfectly ripe." },
  { id: 2,  name: "Fresh Strawberries 500g",   category: "Fruits & Veggies", price: 5.99,  oldPrice: 7.49,  rating: 4.9, reviews: 541, badge: "Fresh",        emoji: "🍓", desc: "Sun-kissed sweet strawberries from local farms." },
  { id: 3,  name: "Baby Spinach 250g",         category: "Fruits & Veggies", price: 2.99,  oldPrice: 3.99,  rating: 4.6, reviews: 189, badge: "Organic",      emoji: "🥬", desc: "Tender baby spinach leaves, washed and ready." },
  { id: 4,  name: "Whole Grain Oats 1kg",      category: "Breakfast",        price: 6.49,  oldPrice: 8.99,  rating: 4.7, reviews: 428, badge: "Best Seller",  emoji: "🌾", desc: "100% whole grain rolled oats, high in fiber." },
  { id: 5,  name: "Free Range Eggs x12",       category: "Dairy & Eggs",     price: 4.99,  oldPrice: 6.49,  rating: 4.9, reviews: 703, badge: "Free Range",   emoji: "🥚", desc: "Farm-fresh free-range eggs with golden yolks." },
  { id: 6,  name: "Greek Yogurt 500g",         category: "Dairy & Eggs",     price: 3.79,  oldPrice: 4.99,  rating: 4.7, reviews: 267, badge: "Probiotic",    emoji: "🫙", desc: "Thick, creamy Greek yogurt with live cultures." },
  { id: 7,  name: "Atlantic Salmon Fillet",    category: "Seafood",          price: 12.99, oldPrice: 15.99, rating: 4.8, reviews: 198, badge: "Fresh",        emoji: "🐟", desc: "Wild-caught Atlantic salmon, rich in Omega-3." },
  { id: 8,  name: "Sourdough Loaf",            category: "Bakery & Bread",   price: 4.49,  oldPrice: 5.99,  rating: 4.9, reviews: 621, badge: "Artisan",      emoji: "🍞", desc: "Slow-fermented sourdough with crispy crust." },
  { id: 9,  name: "Cold Brew Coffee 500ml",    category: "Beverages",        price: 5.49,  oldPrice: 6.99,  rating: 4.6, reviews: 344, badge: "New",          emoji: "☕", desc: "Smooth, bold cold brew, low acidity." },
  { id: 10, name: "Honeycrisp Apples x6",      category: "Fruits & Veggies", price: 6.99,  oldPrice: 8.49,  rating: 4.8, reviews: 512, badge: "Seasonal",     emoji: "🍎", desc: "Perfectly crisp and sweet Honeycrisp apples." },
  { id: 11, name: "Almond Milk 1L",            category: "Dairy & Eggs",     price: 3.29,  oldPrice: 4.49,  rating: 4.5, reviews: 389, badge: "Vegan",        emoji: "🥛", desc: "Unsweetened almond milk, naturally creamy." },
  { id: 12, name: "Dark Chocolate 85%",        category: "Snacks",           price: 3.99,  oldPrice: 5.49,  rating: 4.7, reviews: 476, badge: "Premium",      emoji: "🍫", desc: "Rich Belgian dark chocolate, 85% cacao." },
  { id: 13, name: "Chicken Breast 500g",       category: "Meat & Poultry",   price: 7.99,  oldPrice: 9.99,  rating: 4.6, reviews: 301, badge: "Halal",        emoji: "🍗", desc: "Skinless, boneless free-range chicken breast." },
  { id: 14, name: "Frozen Mixed Berries 500g", category: "Frozen Foods",     price: 4.99,  oldPrice: 6.49,  rating: 4.7, reviews: 258, badge: "Frozen",       emoji: "🫐", desc: "IQF blueberries, raspberries & blackberries." },
  { id: 15, name: "Fresh Orange Juice 1L",     category: "Beverages",        price: 4.49,  oldPrice: 5.99,  rating: 4.8, reviews: 415, badge: "Fresh",        emoji: "🍊", desc: "100% freshly squeezed, no added sugar." },
  { id: 16, name: "Turmeric Ginger Tea",       category: "Beverages",        price: 5.99,  oldPrice: 7.99,  rating: 4.6, reviews: 287, badge: "Wellness",     emoji: "🍵", desc: "Warming anti-inflammatory herbal blend." },
  { id: 17, name: "Organic Honey 350g",        category: "Snacks",           price: 8.49,  oldPrice: 10.99, rating: 4.9, reviews: 534, badge: "Raw",          emoji: "🍯", desc: "Raw, unfiltered wildflower honey." },
  { id: 18, name: "Broccoli Crown 400g",       category: "Fruits & Veggies", price: 2.49,  oldPrice: 3.49,  rating: 4.5, reviews: 176, badge: "Local",        emoji: "🥦", desc: "Fresh, crisp broccoli crowns, nutrient-dense." },
  { id: 19, name: "Smoked Salmon 200g",        category: "Seafood",          price: 9.99,  oldPrice: 12.99, rating: 4.8, reviews: 319, badge: "Premium",      emoji: "🐠", desc: "Delicately smoked Norwegian salmon." },
  { id: 20, name: "Granola Crunch 500g",       category: "Breakfast",        price: 7.49,  oldPrice: 9.49,  rating: 4.7, reviews: 392, badge: "Crunchy",      emoji: "🥣", desc: "Oven-baked granola with nuts & dried fruits." },
];

const BLOG_POSTS = [
  { id: 1, date: "Mar 5, 2026",  category: "Nutrition", title: "10 Superfoods That Will Transform Your Morning",      excerpt: "Start your day with these nutrient-dense powerhouses that boost energy and focus all morning long.", readTime: "5 min", color: "#d4edda", emoji: "🥗" },
  { id: 2, date: "Feb 28, 2026", category: "Recipes",   title: "The Art of Perfect Sourdough — A Beginner's Guide",  excerpt: "Master fermentation, hydration and shaping techniques to bake the most gorgeous crusty loaf.",      readTime: "8 min", color: "#fff3cd", emoji: "🍞" },
  { id: 3, date: "Feb 18, 2026", category: "Wellness",  title: "Why Seasonal Eating Changes Everything About Health", excerpt: "Discover how aligning your diet with nature's rhythms can reduce inflammation and boost immunity.",   readTime: "6 min", color: "#cfe2ff", emoji: "🌿" },
];

const TESTIMONIALS = [
  { name: "Sarah K.",  location: "New York", text: "The freshness is unbelievable! My avocados arrived perfectly ripe. This has completely replaced my weekly grocery run.", rating: 5, avatar: "👩"    },
  { name: "James T.",  location: "London",   text: "Incredible selection and lightning-fast delivery. The organic range is genuinely better than anything at my local supermarket.", rating: 5, avatar: "👨"   },
  { name: "Priya M.",  location: "Toronto",  text: "The salmon fillet was restaurant-quality. I've been ordering weekly for 3 months. Never going back to regular grocery stores!", rating: 5, avatar: "👩‍💼" },
];

const TAGS = ["Organic Avocado","Greek Yogurt","Sourdough Bread","Cold Brew Coffee","Dark Chocolate","Free Range Eggs","Fresh Salmon","Almond Milk","Honeycrisp Apples","Granola Crunch","Frozen Berries","Turmeric Tea"];

const BADGE_COLORS = {
  "Organic":"#2e7d32","Fresh":"#1565c0","Best Seller":"#e65100",
  "Free Range":"#6a1b9a","Probiotic":"#006064","Artisan":"#880e4f",
  "New":"#33691e","Seasonal":"#f57f17","Vegan":"#1b5e20",
  "Premium":"#212121","Halal":"#2e7d32","Frozen":"#0d47a1",
  "Wellness":"#4527a0","Raw":"#827717","Local":"#2e7d32","Crunchy":"#bf360c",
};
const BADGE_BG = {
  "Organic":"#e8f5e9","Fresh":"#e3f2fd","Best Seller":"#fff3e0","Free Range":"#f3e5f5",
  "Probiotic":"#e0f7fa","Artisan":"#fce4ec","New":"#f1f8e9","Seasonal":"#fff8e1",
  "Vegan":"#e8f5e9","Premium":"#fafafa","Halal":"#e8f5e9","Frozen":"#e3f2fd",
  "Wellness":"#ede7f6","Raw":"#fff9c4","Local":"#e8f5e9","Crunchy":"#fff3e0",
};

/* ─────────────────────────────────────────────  COMPONENTS  ──── */

const Stars = ({ rating }) => (
  <span style={{ display:"flex", gap:1 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= Math.round(rating) ? "#f59e0b" : "#e5e7eb" }}>★</span>
    ))}
  </span>
);

const ProductCard = ({ product, onAddToCart, onWishlist, wished }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const disc = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const badgeColor = BADGE_COLORS[product.badge] || "#374151";
  const badgeBg    = BADGE_BG[product.badge]    || "#f3f4f6";

  const handleAdd = () => {
    onAddToCart({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", transition:"transform 0.22s, box-shadow 0.22s", position:"relative", display:"flex", flexDirection:"column" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.07)"; }}>

      <div style={{ position:"absolute", top:12, left:12, background:"#ef4444", color:"#fff",  fontWeight:700, padding:"3px 8px", borderRadius:20, zIndex:2 }}>-{disc}%</div>

      <button
        onClick={() => onWishlist(product.id)}
        style={{ position:"absolute", top:10, right:10, zIndex:2, background: wished?"#fef2f2":"rgba(255,255,255,0.88)", border: wished?"1px solid #fca5a5":"1px solid #e5e7eb", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",  transition:"all 0.2s" }}>
        {wished ? "❤️" : "🤍"}
      </button>

      <div style={{ background:"linear-gradient(135deg,#f8fffe,#f0fdf4)", height:160, display:"flex", justifyContent:"center", alignItems:"center" }}>
        <span style={{  filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.10))", lineHeight:1 }}>{product.emoji}</span>
      </div>

      <div style={{ padding:"16px 16px 20px", display:"flex", flexDirection:"column", flex:1 }}>
        <span style={{ background:badgeBg, color:badgeColor,  fontWeight:700, padding:"2px 8px", borderRadius:20, display:"inline-block", marginBottom:8, alignSelf:"flex-start", textTransform:"uppercase", letterSpacing:0.5 }}>
          {product.badge}
        </span>
        <h6 style={{ margin:"0 0 5px",  fontWeight:700, color:"#1a1a2e", lineHeight:1.4 }}>{product.name}</h6>
        <p style={{ margin:"0 0 10px",  color:"#6b7280", lineHeight:1.5 }}>{product.desc}</p>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <Stars rating={product.rating} />
          <span style={{ color:"#9ca3af" }}>({product.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
          <span style={{ fontWeight:900, color:"#16a34a" }}>${product.price.toFixed(2)}</span>
          <del style={{  color:"#9ca3af" }}>${product.oldPrice.toFixed(2)}</del>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
            <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:30, height:34, background:"none", border:"none", cursor:"pointer",  fontWeight:700, color:"#374151" }}>−</button>
            <span style={{ width:28, textAlign:"center",  fontWeight:700, color:"#1f2937" }}>{qty}</span>
            <button onClick={() => setQty(q => q+1)} style={{ width:30, height:34, background:"none", border:"none", cursor:"pointer",  fontWeight:700, color:"#374151" }}>+</button>
          </div>
          <button onClick={handleAdd} style={{ flex:1, background: added ? "#16a34a" : "linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
            {added ? "✓ Added!" : "🛒 Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ open, onClose, items, onRemove, onClear }) => {
  const total = items.reduce((s,i) => s + i.price * i.qty, 0);
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:900, backdropFilter:"blur(3px)" }} />}
      <div style={{ position:"fixed", top:0, right:0, height:"100vh", width:370, background:"#fff", zIndex:901, transform: open?"translateX(0)":"translateX(100%)", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)", boxShadow:"-8px 0 40px rgba(0,0,0,0.15)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f0f0f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h3 style={{ margin:0, fontWeight:800, color:"#1a1a2e" }}>🛒 My Cart</h3>
            <p style={{ margin:0,  color:"#6b7280" }}>{items.length} item{items.length!==1?"s":""}</p>
          </div>
          <button onClick={onClose} style={{ background:"#f3f4f6", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer",  display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {items.length === 0
            ? <div style={{ textAlign:"center", paddingTop:60 }}><div style={{  marginBottom:16 }}>🛒</div><p style={{ color:"#9ca3af",  }}>Your cart is empty</p><p style={{ color:"#d1d5db", }}>Add some fresh items!</p></div>
            : items.map((item, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f9fafb" }}>
                <div style={{ width:50, height:50, background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center",  flexShrink:0 }}>{item.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:0,  fontWeight:700, color:"#1f2937", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</p>
                  <p style={{ margin:0, color:"#6b7280" }}>Qty {item.qty} × ${item.price.toFixed(2)}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <p style={{ margin:0,  fontWeight:800, color:"#16a34a" }}>${(item.price*item.qty).toFixed(2)}</p>
                  <button onClick={() => onRemove(i)} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer",  marginTop:2, padding:0 }}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
        {items.length > 0 && (
          <div style={{ padding:"20px 24px", borderTop:"1px solid #f0f0f0", background:"#fafafa" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{  color:"#6b7280" }}>Total</span>
              <span style={{  fontWeight:900, color:"#1a1a2e" }}>${total.toFixed(2)}</span>
            </div>
            <button style={{ width:"100%", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:14,  fontWeight:800, cursor:"pointer", marginBottom:8 }}>Checkout →</button>
            <button onClick={onClear} style={{ width:"100%", background:"none", border:"1.5px solid #e5e7eb", color:"#6b7280", borderRadius:14, padding:10,  fontWeight:600, cursor:"pointer" }}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
};

/* ✅ FIX: Added `categories` prop */
const NavDrawer = ({ open, onClose, categories }) => (
  <>
    {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:900, backdropFilter:"blur(3px)" }} />}
    <div style={{ position:"fixed", top:0, left:0, height:"100vh", width:290, background:"#fff", zIndex:901, transform: open?"translateX(0)":"translateX(-100%)", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)", boxShadow:"8px 0 40px rgba(0,0,0,0.12)", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"20px 24px", background:"linear-gradient(135deg,#16a34a,#15803d)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <img src={require("../assets/images/logo/logo1.png")} alt="Logo" style={{ height:42, width:"auto", objectFit:"contain" }} />
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:34, height:34, cursor:"pointer",  color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={onClose}
            style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 24px", width:"100%", background:"none", border:"none", borderBottom:"1px solid #f9fafb", textAlign:"left", color:"#374151", fontWeight:600, cursor:"pointer", transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
            onMouseLeave={e => e.currentTarget.style.background="none"}
          >
            <img src={`http://localhost:5000/${cat.image}`} alt={cat.name} style={{ width: 40 }} />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  </>
);

const ScrollSection = ({ title, items, onAddToCart, onWishlist, wishlist }) => {
  const ref = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left: d * 270, behavior:"smooth" });
  return (
    <section style={{ padding:"48px 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <h2 style={{ margin:0, fontWeight:900, color:"#1a1a2e" }}>{title}</h2>
          <div style={{ display:"flex", gap:8 }}>
            {[["‹",false],["›",true]].map(([arrow, right]) => (
              <button key={String(right)} onClick={() => scroll(right?1:-1)} style={{ width:40, height:40, borderRadius:"50%", background: right?"#16a34a":"#fff", border:"2px solid "+(right?"#16a34a":"#e5e7eb"), cursor:"pointer", fontWeight:700, color: right?"#fff":"#374151", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} style={{ display:"flex", gap:20, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none" }}>
          {items.map(p => (
            <div key={p.id} style={{ minWidth:230, maxWidth:230 }}>
              <ProductCard product={p} onAddToCart={onAddToCart} onWishlist={onWishlist} wished={wishlist.includes(p.id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function OrganicStore() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const getProducts = async () => {
    try {

      const res = await api.get("http://localhost:5000/product");

      setProducts(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ── banners ─────────────────────────────────────────────────────────
  //  Expected API response array item shape:
  //  { id, image, tag?, title?, sub?, cta?, accent? }
  //  Only `image` is required; every other field is optional.
  const [banners,        setBanners]        = useState([]);
  const [bannerIndex,    setBannerIndex]    = useState(0);
  const [bannerAnim,     setBannerAnim]     = useState(false);
  const [bannerDir,      setBannerDir]      = useState("next");
  const bannerTimer = useRef(null);
  const SLIDE_MS    = 4500;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/homebanner/web");
        setBanners(res.data.data);          // adjust to res.data.data if your API wraps it
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // auto-slide
  useEffect(() => {
    if (banners.length < 2) return;
    bannerTimer.current = setInterval(() => slideBanner("next"), SLIDE_MS);
    return () => clearInterval(bannerTimer.current);
  }, [bannerIndex, banners.length]);

  const slideBanner = (dir) => {
    if (bannerAnim || banners.length === 0) return;
    setBannerDir(dir);
    setBannerAnim(true);
    setTimeout(() => {
      setBannerIndex(prev =>
        dir === "next"
          ? (prev + 1) % banners.length
          : (prev - 1 + banners.length) % banners.length
      );
      setBannerAnim(false);
    }, 480);
  };

  const jumpBanner = (i) => {
    clearInterval(bannerTimer.current);
    slideBanner(i > bannerIndex ? "next" : "prev");
    setTimeout(() => setBannerIndex(i), 0);
  };

  const [cartOpen,       setCartOpen]       = useState(false);
  const [navOpen,        setNavOpen]        = useState(false);
  const [cart,           setCart]           = useState([]);
  const [wishlist,       setWishlist]       = useState([]);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subEmail,       setSubEmail]       = useState("");
  const [subDone,        setSubDone]        = useState(false);
  const [toast,          setToast]          = useState("");

  const notify = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const addToCart = product => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) { const n=[...prev]; n[idx]={...n[idx], qty:n[idx].qty+product.qty}; return n; }
      return [...prev, product];
    });
    notify(`✓ ${product.name} added!`);
  };

  const toggleWishlist = id => {
    const inList = wishlist.includes(id);
    setWishlist(prev => inList ? prev.filter(i => i!==id) : [...prev, id]);
    notify(inList ? "Removed from wishlist" : `❤️ ${PRODUCTS.find(p=>p.id===id)?.name} wishlisted!`);
  };

  const cartCount = cart.reduce((s,i) => s+i.qty, 0);

  const filtered = PRODUCTS.filter(p => {
    const mc = activeCategory==="All" || p.category===activeCategory;
    const ms = search==="" || p.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const bestSellers = PRODUCTS.filter(p => p.reviews > 350);
  const featured    = PRODUCTS.filter(p => ["Premium","Artisan","Raw","Best Seller"].includes(p.badge));
  const newArrivals = PRODUCTS.filter(p => ["New","Seasonal","Crunchy","Wellness"].includes(p.badge));
  const showDefault = !search && activeCategory==="All";


  const activeBanner = banners[bannerIndex] || null;
  const accent       = activeBanner?.accent || "#22c55e";

  return (
    <div style={{ fontFamily:"Montserrat, sans-serif", background:"#f8f9fa", minHeight:"100vh", color:"#1a1a2e" }}>
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(18px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {toast && (
        <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"#1a1a2e", color:"#fff", padding:"12px 26px", borderRadius:50, fontWeight:600, zIndex:9999, boxShadow:"0 8px 32px rgba(0,0,0,0.28)", whiteSpace:"nowrap", animation:"slideUp 0.3s ease" }}>
          {toast}
        </div>
      )}

      <header style={{ background:"rgba(255,255,255,0.96)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:200, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>
          <button onClick={() => setNavOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex", flexDirection:"column", gap:5 }}>
            {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2.5, background:"#374151", borderRadius:2 }} />)}
          </button>
          <a href="/" onClick={e => e.preventDefault()} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
            <img src={require("../assets/images/logo/logo1.png")} alt="Logo" style={{ height:42, width:"auto", objectFit:"contain" }} />
          </a>
          <div style={{ flex:1, minWidth:180, maxWidth:460 }}>
            <div style={{ display:"flex", alignItems:"center", background:"#f3f4f6", borderRadius:50, padding:"10px 18px", gap:10 }}>
              <span style={{  color:"#9ca3af" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fresh groceries..."
                style={{ background:"none", border:"none", outline:"none", flex:1,  color:"#374151", fontFamily:"Montserrat, sans-serif" }} />
              {search && <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af",  lineHeight:1, padding:0 }}>✕</button>}
            </div>
          </div>
          <nav style={{ display:"flex", gap:24 }}>
            {["Home","Shop","Blog","About"].map((l,i) => (
              <a key={l} href={`/${l.toLowerCase()}`} onClick={e => e.preventDefault()}
                style={{ textDecoration:"none",  fontWeight:700, color: i===0?"#16a34a":"#6b7280", textTransform:"uppercase", letterSpacing:0.5, transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#16a34a"}
                onMouseLeave={e => e.currentTarget.style.color= i===0?"#16a34a":"#6b7280"}>
                {l}
              </a>
            ))}
          </nav>
          <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
            <button style={{ background:"#f3f4f6", border:"none", borderRadius:12, padding:"9px 14px", cursor:"pointer",  fontWeight:600, color:"#374151", display:"flex", alignItems:"center", gap:6 }}>👤 Account</button>
            <button style={{ background:"#f3f4f6", border:"none", borderRadius:12, padding:"9px 14px", cursor:"pointer",  fontWeight:600, color:"#374151", display:"flex", alignItems:"center", gap:6 }}>
              🔖 {wishlist.length > 0 ? `Wishlist (${wishlist.length})` : "Wishlist"}
            </button>
            <button onClick={() => setCartOpen(true)} style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", borderRadius:12, padding:"9px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#fff", fontWeight:700 }}>
              🛒 Cart
              {cartCount > 0 && <span style={{ background:"#ef4444", color:"#fff",  fontWeight:900, borderRadius:50, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* <section style={{ background:"linear-gradient(135deg,#ecfdf5 0%,#f0fdf4 40%,#dcfce7 100%)", padding:"70px 24px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"rgba(34,197,94,0.12)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:80, left:-40, width:200, height:200, background:"rgba(22,163,74,0.08)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", gap:40 }}>
          <div style={{ flex:"1 1 360px", maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#dcfce7", color:"#16a34a", padding:"6px 14px", borderRadius:50,  fontWeight:700, marginBottom:20, textTransform:"uppercase", letterSpacing:1 }}>
              🌱 Farm Fresh · Delivered Daily
            </div>
            <h4 style={{ margin:"0 0 18px", fontWeight:900, lineHeight:1.1, color:"#1a1a2e" }}>
              Eat Fresh. <span style={{ color:"#16a34a" }}>Live Better.</span> Shop Organic.
            </h4>
            <p style={{  color:"#4b5563", lineHeight:1.7, margin:"0 0 32px" }}>
              Discover 20,000+ organic products sourced directly from local farms. Delivered to your door within hours, not days.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:48 }}>
              <button style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", boxShadow:"0 8px 24px rgba(22,163,74,0.35)" }}>Shop Now →</button>
              <button style={{ background:"transparent", color:"#16a34a", border:"2px solid #16a34a", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#16a34a"; }}>
                Learn More
              </button>
            </div>
            <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
              {[["14k+","Products"],["50k+","Customers"],["98%","Satisfaction"],["10+","Cities"]].map(([num,label]) => (
                <div key={label}>
                  <div style={{ fontWeight:900, color:"#16a34a", lineHeight:1 }}>{num}</div>
                  <div style={{ color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:"1 1 300px", display:"flex", justifyContent:"center" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, maxWidth:340 }}>
              {["🥑","🍓","🥦","🥛","🐟","🍞","🍊","🥚","🫙","🍿","🫐","🍯"].map((em,i) => (
                <div key={i} style={{ width:70, height:70, background:"#fff", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center",  boxShadow:"0 4px 20px rgba(0,0,0,0.08)", cursor:"default", transition:"transform 0.2s", animation:`fadeIn 0.5s ease ${i*0.04}s both` }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.15) rotate(-6deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}>
                  {em}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1280, margin:"60px auto 0", display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderRadius:"20px 20px 0 0", overflow:"hidden" }}>
          {[
            { bg:"#16a34a", icon:"🚜", title:"Farm to Door",      desc:"Straight from local farms to your kitchen." },
            { bg:"#15803d", icon:"✅", title:"100% Organic",      desc:"Certified organic, no pesticides ever."    },
            { bg:"#166534", icon:"⚡", title:"Same Day Delivery", desc:"Order by 2pm, receive by evening."         },
          ].map(f => (
            <div key={f.title} style={{ background:f.bg, padding:"28px 32px", color:"#fff", display:"flex", gap:16, alignItems:"center" }}>
              <span style={{  flexShrink:0 }}>{f.icon}</span>
              <div>
                <div style={{  fontWeight:800, marginBottom:4 }}>{f.title}</div>
                <div style={{  opacity:0.82, lineHeight:1.4 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section style={{ background:"linear-gradient(135deg,#ecfdf5 0%,#f0fdf4 40%,#dcfce7 100%)", overflow:"hidden", position:"relative" }}>

        {/* ── decorative blobs (original) ── */}
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"rgba(34,197,94,0.12)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", bottom:80, left:-40, width:200, height:200, background:"rgba(22,163,74,0.08)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

        {/* ────────────────────────────────────────────
            FULL-WIDTH BANNER CAROUSEL  (above the text)
        ──────────────────────────────────────────── */}
        {banners.length === 0 ? (
          /* Loading skeleton */
          <div style={{ width:"100%", height:420, background:"linear-gradient(90deg,#d1fae5 25%,#f0fdf4 50%,#d1fae5 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
        ) : (
          <div style={{ position:"relative", width:"100%", height:420, overflow:"hidden" }}>

            {/* Slide image */}
            <div
              key={bannerIndex}
              style={{
                position:"absolute", inset:0,
                backgroundImage:`url(http://localhost:5000/${activeBanner.image})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
                animation: bannerAnim
                  ? (bannerDir==="next" ? "bnSlideOutL 0.48s ease forwards" : "bnSlideOutR 0.48s ease forwards")
                  : (bannerDir==="next" ? "bnSlideInR  0.48s ease forwards" : "bnSlideInL  0.48s ease forwards"),
              }}
            />

            {/* Left-to-transparent dark overlay */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.20) 55%,transparent 100%)" }} />

            {/* Text overlay */}
            <div style={{
              position:"absolute", inset:0,
              display:"flex", flexDirection:"column", justifyContent:"center",
              padding:"0 60px", maxWidth:680,
              animation: bannerAnim ? "bnFadeOut 0.3s ease forwards" : "bnFadeInUp 0.55s ease 0.22s both",
            }}>
              {activeBanner.tag && (
                <span style={{ display:"inline-block", background:accent, color:"#fff", fontSize:11, fontWeight:800, padding:"4px 14px", borderRadius:50, textTransform:"uppercase", letterSpacing:1.5, marginBottom:14, alignSelf:"flex-start" }}>
                  {activeBanner.tag}
                </span>
              )}
              {activeBanner.title && (
                <h2 style={{ margin:"0 0 10px", color:"#fff", fontWeight:900, lineHeight:1.15, textShadow:"0 2px 12px rgba(0,0,0,0.3)", fontSize:"clamp(1.6rem,3vw,2.6rem)" }}>
                  {activeBanner.title}
                </h2>
              )}
              {activeBanner.sub && (
                <p style={{ margin:"0 0 24px", color:"rgba(255,255,255,0.88)", fontSize:16, lineHeight:1.6 }}>
                  {activeBanner.sub}
                </p>
              )}
              {activeBanner.cta && (
                <button
                  style={{ alignSelf:"flex-start", background:accent, color:"#fff", border:"none", borderRadius:50, padding:"13px 30px", fontSize:14, fontWeight:800, cursor:"pointer", boxShadow:`0 6px 20px ${accent}66`, transition:"transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
                >
                  {activeBanner.cta}
                </button>
              )}
            </div>

            {/* ‹ Prev arrow */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={() => { clearInterval(bannerTimer.current); slideBanner("prev"); }}
                  style={{ position:"absolute", top:"50%", left:16, transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.20)", backdropFilter:"blur(6px)", border:"1.5px solid rgba(255,255,255,0.35)", color:"#fff", fontSize:24, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", zIndex:10 }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.40)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.20)"}
                >‹</button>
                {/* › Next arrow */}
                <button
                  onClick={() => { clearInterval(bannerTimer.current); slideBanner("next"); }}
                  style={{ position:"absolute", top:"50%", right:16, transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.20)", backdropFilter:"blur(6px)", border:"1.5px solid rgba(255,255,255,0.35)", color:"#fff", fontSize:24, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", zIndex:10 }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.40)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.20)"}
                >›</button>
              </>
            )}

            {/* Dot indicators */}
            {banners.length > 1 && (
              <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10 }}>
                {banners.map((_, i) => (
                  <button key={i} onClick={() => jumpBanner(i)}
                    style={{ width: i===bannerIndex ? 28 : 8, height:8, borderRadius:50, border:"none", cursor:"pointer", background: i===bannerIndex ? "#fff" : "rgba(255,255,255,0.45)", transition:"all 0.35s ease", padding:0 }}
                  />
                ))}
              </div>
            )}

            {/* Progress bar */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.15)" }}>
              <div key={bannerIndex} style={{ height:"100%", background:"#22c55e", animation:`bnProgress ${SLIDE_MS}ms linear forwards` }} />
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────
            ORIGINAL HERO CONTENT (unchanged)
        ──────────────────────────────────────────── */}
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", gap:40, padding:"70px 24px 0", position:"relative", zIndex:1 }}>
          <div style={{ flex:"1 1 360px", maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#dcfce7", color:"#16a34a", padding:"6px 14px", borderRadius:50, fontWeight:700, marginBottom:20, textTransform:"uppercase", letterSpacing:1 }}>
              🌱 Farm Fresh · Delivered Daily
            </div>
            <h4 style={{ margin:"0 0 18px", fontWeight:900, lineHeight:1.1, color:"#1a1a2e" }}>
              Eat Fresh. <span style={{ color:"#16a34a" }}>Live Better.</span> Shop Organic.
            </h4>
            <p style={{ color:"#4b5563", lineHeight:1.7, margin:"0 0 32px" }}>
              Discover 20,000+ organic products sourced directly from local farms. Delivered to your door within hours, not days.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:48 }}>
              <button style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", boxShadow:"0 8px 24px rgba(22,163,74,0.35)" }}>Shop Now →</button>
              <button style={{ background:"transparent", color:"#16a34a", border:"2px solid #16a34a", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#16a34a"; }}>
                Learn More
              </button>
            </div>
            <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
              {[["14k+","Products"],["50k+","Customers"],["98%","Satisfaction"],["10+","Cities"]].map(([num,label]) => (
                <div key={label}>
                  <div style={{ fontWeight:900, color:"#16a34a", lineHeight:1 }}>{num}</div>
                  <div style={{ color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:"1 1 300px", display:"flex", justifyContent:"center" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, maxWidth:340 }}>
              {["🥑","🍓","🥦","🥛","🐟","🍞","🍊","🥚","🫙","🍿","🫐","🍯"].map((em,i) => (
                <div key={i} style={{ width:70, height:70, background:"#fff", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", cursor:"default", transition:"transform 0.2s", animation:`fadeIn 0.5s ease ${i*0.04}s both` }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.15) rotate(-6deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}>
                  {em}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Green feature bar (unchanged) */}
        <div style={{ maxWidth:1280, margin:"60px auto 0", display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderRadius:"20px 20px 0 0", overflow:"hidden", position:"relative", zIndex:1 }}>
          {[
            { bg:"#16a34a", icon:"🚜", title:"Farm to Door",      desc:"Straight from local farms to your kitchen." },
            { bg:"#15803d", icon:"✅", title:"100% Organic",      desc:"Certified organic, no pesticides ever."    },
            { bg:"#166534", icon:"⚡", title:"Same Day Delivery", desc:"Order by 2pm, receive by evening."         },
          ].map(f => (
            <div key={f.title} style={{ background:f.bg, padding:"28px 32px", color:"#fff", display:"flex", gap:16, alignItems:"center" }}>
              <span style={{ flexShrink:0 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight:800, marginBottom:4 }}>{f.title}</div>
                <div style={{ opacity:0.82, lineHeight:1.4 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FIX: CATEGORY TABS — using `categories` state */}
      <section style={{ background:"#fff", borderBottom:"1px solid #f0f0f0", padding:"0 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", overflowX:"auto", display:"flex", gap:6, padding:"16px 0", scrollbarWidth:"none" }}>
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ flexShrink:0, padding:"9px 20px", background: activeCategory===cat?"#16a34a":"transparent", color: activeCategory===cat?"#fff":"#6b7280", border: activeCategory===cat?"none":"1.5px solid #e5e7eb", borderRadius:50,  fontWeight:700, cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {(search || activeCategory !== "All") && (
        <section style={{ padding:"40px 24px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h4 style={{ margin:0,  fontWeight:800 }}>
                {search ? `Results for "${search}"` : activeCategory}
                <span style={{  color:"#9ca3af", fontWeight:400, marginLeft:10 }}>{filtered.length} items</span>
              </h4>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} style={{ background:"#f3f4f6", border:"none", padding:"8px 16px", borderRadius:8, cursor:"pointer", fontWeight:600 }}>
                Clear ✕
              </button>
            </div>
            {filtered.length === 0
              ? <div style={{ textAlign:"center", padding:"60px 0" }}><div style={{  marginBottom:16 }}>🔍</div><p style={{ color:"#9ca3af",  }}>No products found</p></div>
              : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
                  {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} onWishlist={toggleWishlist} wished={wishlist.includes(p.id)} />)}
                </div>
            }
          </div>
        </section>
      )}

      {showDefault && (
        <>
          {/* ✅ FIX: CATEGORIES GRID — using `categories` state */}
          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <h2 style={{  fontWeight:900, margin:"0 0 10px" }}>Shop by Category</h2>
                <p style={{ color:"#6b7280",  margin:0 }}>Find exactly what you're looking for</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:16 }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
                    style={{ background:cat.color, border:`2px solid ${cat.color}`, borderRadius:20, padding:"22px 10px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:10, transition:"all 0.22s" }}
                    onMouseEnter={e => { e.currentTarget.style.border=`2px solid ${cat.accent}`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${cat.accent}28`; }}
                    onMouseLeave={e => { e.currentTarget.style.border=`2px solid ${cat.color}`; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    <img src={`http://localhost:5000/${cat.image}`} alt={cat.name} style={{ width: 40 }} />
                    <span style={{ fontWeight:700, color:cat.accent, textAlign:"center", lineHeight:1.3 }}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}>
            <ScrollSection title="🏆 Best Sellers" items={bestSellers} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />
          </div>

          <section style={{ padding:"48px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:20 }}>
              <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:24, padding:"44px 40px", color:"#fff", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-20, top:-20,  opacity:0.12, pointerEvents:"none" }}>🥦</div>
                <div>
                  <span style={{ background:"#22c55e", color:"#fff",  fontWeight:700, padding:"4px 12px", borderRadius:50, textTransform:"uppercase", letterSpacing:1 }}>Limited Offer</span>
                  <h5 style={{ margin:"16px 0 8px", fontWeight:900, lineHeight:1.2 }}>Summer Sale Up to 40% Off</h5>
                  <p style={{ margin:0, opacity:0.8,  }}>Fresh seasonal produce at unbeatable prices</p>
                </div>
                <button style={{ alignSelf:"flex-start", marginTop:20, background:"#22c55e", color:"#fff", border:"none", borderRadius:50, padding:"12px 26px", fontWeight:800, cursor:"pointer" }}>Shop Sale →</button>
              </div>
              {[
                { grad:"135deg,#7e22ce,#a21caf", label:"New",      title:"Dairy Free Range", sub:"Combo deals from $9.99",  emoji:"🫙" },
                { grad:"135deg,#c2410c,#ea580c", label:"Trending", title:"Raw & Natural",     sub:"Organic honey collection", emoji:"🍯" },
              ].map(b => (
                <div key={b.title} style={{ background:`linear-gradient(${b.grad})`, borderRadius:24, padding:"32px 28px", color:"#fff", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:-10, top:-10,  opacity:0.2, pointerEvents:"none" }}>{b.emoji}</div>
                  <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontWeight:700, padding:"4px 12px", borderRadius:50 }}>{b.label}</span>
                  <h5 style={{ margin:"14px 0 6px",  fontWeight:900 }}>{b.title}</h5>
                  <p style={{ margin:"0 0 20px", opacity:0.8, }}>{b.sub}</p>
                  <button style={{ background:"none", border:"none", color:"#fff",  fontWeight:700, cursor:"pointer", padding:0 }}>Explore →</button>
                </div>
              ))}
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}>
            <ScrollSection title="⭐ Featured Products" items={featured} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />
          </div>

          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", borderRadius:32, padding:"60px 48px", display:"flex", flexWrap:"wrap", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-40, top:-40, width:300, height:300, background:"rgba(34,197,94,0.08)", borderRadius:"50%", pointerEvents:"none" }} />
                <div style={{ flex:"1 1 300px" }}>
                  <div style={{ color:"#22c55e", fontWeight:700, textTransform:"uppercase", letterSpacing:2, marginBottom:14 }}>🎁 Exclusive Offer</div>
                  <h4 style={{ margin:"0 0 12px",  fontWeight:900, color:"#fff", lineHeight:1.2 }}>Get 25% Off Your First Order</h4>
                  <p style={{ margin:0, color:"rgba(255,255,255,0.65)",  lineHeight:1.6 }}>Join 50,000+ members enjoying weekly deals, new arrivals and fresh alerts.</p>
                </div>
                <div style={{ flex:"1 1 280px" }}>
                  {subDone
                    ? <div style={{ textAlign:"center", color:"#22c55e", fontWeight:800 }}>✅ You're on the list!</div>
                    : <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        <input placeholder="Your name" style={{ padding:"14px 20px", borderRadius:14, border:"none",  background:"rgba(255,255,255,0.1)", color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }} />
                        <input type="email" value={subEmail} onChange={e => setSubEmail(e.target.value)} placeholder="Email address" style={{ padding:"14px 20px", borderRadius:14, border:"none",  background:"rgba(255,255,255,0.1)", color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }} />
                        <button onClick={() => { if(subEmail){ setSubDone(true); setSubEmail(""); } }} style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:14, fontWeight:800,  cursor:"pointer" }}>
                          Subscribe & Get 25% Off
                        </button>
                      </div>
                  }
                </div>
              </div>
            </div>
          </section>

          <div style={{ background:"#f8f9fa" }}>
            <ScrollSection title="🆕 New Arrivals" items={newArrivals} onAddToCart={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} />
          </div>

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
                    <div style={{ display:"flex", marginBottom:16 }}>
                      {[1,2,3,4,5].map(i => <span key={i} style={{ color:"#f59e0b", }}>★</span>)}
                    </div>
                    <p style={{ lineHeight:1.75, color:"#374151", margin:"0 0 24px" }}>"{t.text}"</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center",  }}>{t.avatar}</div>
                      <div>
                        <div style={{ fontWeight:800, color:"#1a1a2e" }}>{t.name}</div>
                        <div style={{  color:"#9ca3af" }}>{t.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding:"56px 24px", background:"#f8f9fa" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:36 }}>
                <div>
                  <h2 style={{ fontWeight:900, margin:"0 0 6px" }}>Fresh from the Blog</h2>
                  <p style={{ color:"#6b7280", margin:0 }}>Tips, recipes and nutrition guides</p>
                </div>
                <button style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontWeight:700, cursor:"pointer" }}>View All</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
                {BLOG_POSTS.map(post => (
                  <article key={post.id} style={{ background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", cursor:"pointer", transition:"all 0.24s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)"; }}>
                    <div style={{ height:180, background:`linear-gradient(135deg,${post.color},${post.color}bb)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{  }}>{post.emoji}</span>
                    </div>
                    <div style={{ padding:"24px 24px 28px" }}>
                      <div style={{ display:"flex", gap:12, marginBottom:14, alignItems:"center" }}>
                        <span style={{  color:"#16a34a", fontWeight:700, textTransform:"uppercase", background:"#dcfce7", padding:"3px 10px", borderRadius:50 }}>{post.category}</span>
                        <span style={{ color:"#9ca3af" }}>{post.readTime} read</span>
                      </div>
                      <h5 style={{ margin:"0 0 10px",  fontWeight:800, color:"#1a1a2e", lineHeight:1.4 }}>{post.title}</h5>
                      <p style={{ margin:"0 0 16px",  color:"#6b7280", lineHeight:1.65 }}>{post.excerpt}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{  color:"#9ca3af" }}>{post.date}</span>
                        <button style={{ background:"none", border:"none", color:"#16a34a", fontWeight:700, cursor:"pointer", padding:0 }}>Read More →</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding:"56px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <div style={{ background:"linear-gradient(135deg,#fef9c3,#fef3c7)", borderRadius:32, padding:"56px", display:"flex", flexWrap:"wrap", alignItems:"center", gap:40, overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", right:200, top:"50%", transform:"translateY(-50%)",  opacity:0.07, pointerEvents:"none" }}>📱</div>
                <div style={{ flex:"1 1 300px" }}>
                  <h2 style={{ fontWeight:900, margin:"0 0 12px", color:"#1a1a2e" }}>Download Our App</h2>
                  <p style={{ color:"#6b7280", margin:"0 0 28px", lineHeight:1.7 }}>Manage orders, track delivery, discover deals — all from your phone.</p>
                  <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                    {[["🍎","App Store","https://apps.apple.com"],["▶","Google Play","https://play.google.com"]].map(([icon,store,url]) => (
                      <a key={store} href={url} target="_blank" rel="noreferrer"
                        style={{ display:"flex", alignItems:"center", gap:12, background:"#1a1a2e", color:"#fff", padding:"12px 22px", borderRadius:16, textDecoration:"none", transition:"transform 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                        <span style={{ }}>{icon}</span>
                        <div>
                          <div style={{ opacity:0.7, textTransform:"uppercase", letterSpacing:1 }}>Download on</div>
                          <div style={{  fontWeight:800 }}>{store}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{  textAlign:"center", flex:"0 0 auto" }}>📱</div>
              </div>
            </div>
          </section>

          <section style={{ padding:"32px 24px 48px", background:"#f8f9fa" }}>
            <div style={{ maxWidth:1280, margin:"0 auto" }}>
              <h3 style={{ fontWeight:800, marginBottom:18 }}>People also search for</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {TAGS.map(tag => (
                  <button key={tag} onClick={() => setSearch(tag)} style={{ background:"#fff", border:"1.5px solid #e5e7eb", color:"#374151", padding:"8px 18px", borderRadius:50, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#16a34a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.color="#374151"; e.currentTarget.style.borderColor="#e5e7eb"; }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding:"48px 24px", background:"#fff" }}>
            <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:20 }}>
              {[
                { icon:"📦", title:"Free Delivery",    desc:"On all orders over $49"    },
                { icon:"🔒", title:"Secure Payments",  desc:"256-bit SSL encryption"    },
                { icon:"🌱", title:"Quality Certified", desc:"USDA organic certified"   },
                { icon:"🔄", title:"Easy Returns",     desc:"30-day hassle-free policy" },
                { icon:"🎯", title:"Daily Deals",      desc:"New offers every morning"  },
              ].map(b => (
                <div key={b.title} style={{ background:"#f8fffe", border:"1.5px solid #dcfce7", borderRadius:20, padding:"28px 22px", textAlign:"center", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#22c55e"; e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#dcfce7"; e.currentTarget.style.background="#f8fffe"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ marginBottom:12 }}>{b.icon}</div>
                  <div style={{ fontWeight:800, color:"#1a1a2e", marginBottom:6 }}>{b.title}</div>
                  <div style={{ color:"#6b7280", lineHeight:1.5 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <footer style={{ background:"#111827", color:"#d1d5db", padding:"60px 24px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:40 }}>
          <div style={{ gridColumn:"span 2" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:40, height:40, background:"linear-gradient(135deg,#22c55e,#16a34a)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", }}>🌿</div>
              <div>
                <div style={{ fontWeight:900, color:"#fff" }}>Organic</div>
                <div style={{  color:"#6b7280", textTransform:"uppercase", letterSpacing:1 }}>Fresh Market</div>
              </div>
            </div>
            <p style={{  lineHeight:1.7, color:"#9ca3af", margin:"0 0 24px", maxWidth:260 }}>Fresh, certified organic produce delivered from local farms to your table every day.</p>
            <div style={{ display:"flex", gap:10 }}>
              {[["f","https://facebook.com"],["t","https://twitter.com"],["in","https://instagram.com"],["yt","https://youtube.com"]].map(([s,url]) => (
                <a key={s} href={url} target="_blank" rel="noreferrer"
                  style={{ width:36, height:36, background:"#1f2937", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#9ca3af",  fontWeight:800, textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#1f2937"; e.currentTarget.style.color="#9ca3af"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          {[
            { title:"Company", links:[["About Us","/about"],["Careers","/careers"],["Blog","/blog"],["Press","/press"],["Partners","/partners"]] },
            { title:"Shop",    links:[["All Products","/shop"],["New Arrivals","/new"],["Best Sellers","/best"],["Offers","/offers"],["Organic","/organic"]] },
            { title:"Support", links:[["Help Center","/help"],["Track Order","/track"],["Returns","/returns"],["Contact","/contact"],["Privacy","/privacy"]] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{ margin:"0 0 18px",  fontWeight:800, color:"#fff", textTransform:"uppercase", letterSpacing:1 }}>{col.title}</h5>
              <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} onClick={e => e.preventDefault()}
                      style={{ textDecoration:"none", color:"#9ca3af", transition:"color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color="#22c55e"}
                      onMouseLeave={e => e.currentTarget.style.color="#9ca3af"}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 style={{ margin:"0 0 18px",  fontWeight:800, color:"#fff", textTransform:"uppercase", letterSpacing:1 }}>Newsletter</h5>
            <p style={{  color:"#9ca3af", margin:"0 0 16px", lineHeight:1.6 }}>Get weekly deals and fresh picks.</p>
            <div style={{ display:"flex", background:"#1f2937", borderRadius:12, overflow:"hidden", border:"1px solid #374151" }}>
              <input type="email" placeholder="Email address" style={{ flex:1, background:"none", border:"none", padding:"12px 16px",  color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }} />
              <button style={{ background:"#16a34a", border:"none", padding:"12px 18px", color:"#fff", fontWeight:700, cursor:"pointer"}}>→</button>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1280, margin:"48px auto 0", borderTop:"1px solid #1f2937", padding:"24px 0", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ margin:0,  color:"#6b7280" }}>© 2026 Organic Fresh Market. All rights reserved.</p>
          <p style={{ margin:0,  color:"#6b7280" }}>Built with React · Fresh code, fresh produce 🌿</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart}
        onRemove={i => setCart(c => c.filter((_,j) => j!==i))} onClear={() => setCart([])} />
      {/* ✅ FIX: pass `categories` as prop to NavDrawer */}
      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} categories={categories} />
    </div>
  );
}