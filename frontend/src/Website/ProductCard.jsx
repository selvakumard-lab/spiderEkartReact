import React, { useState, useRef } from "react";

const BADGE_COLORS = { "Organic":"#2e7d32","Fresh":"#1565c0","Best Seller":"#e65100","Free Range":"#6a1b9a","Probiotic":"#006064","Artisan":"#880e4f","New":"#33691e","Seasonal":"#f57f17","Vegan":"#1b5e20","Premium":"#212121","Halal":"#2e7d32","Frozen":"#0d47a1","Wellness":"#4527a0","Raw":"#827717","Local":"#2e7d32","Crunchy":"#bf360c" };
const BADGE_BG    = { "Organic":"#e8f5e9","Fresh":"#e3f2fd","Best Seller":"#fff3e0","Free Range":"#f3e5f5","Probiotic":"#e0f7fa","Artisan":"#fce4ec","New":"#f1f8e9","Seasonal":"#fff8e1","Vegan":"#e8f5e9","Premium":"#fafafa","Halal":"#e8f5e9","Frozen":"#e3f2fd","Wellness":"#ede7f6","Raw":"#fff9c4","Local":"#e8f5e9","Crunchy":"#fff3e0" };

const Stars = ({ rating }) => (
  <span style={{ display:"flex", gap:1 }}>
    {[1,2,3,4,5].map(i => <span key={i} style={{ color:i<=Math.round(rating)?"#f59e0b":"#e5e7eb" }}>★</span>)}
  </span>
);

export const ProductCard = ({ product, onAddToCart, onWishlist, wished }) => {
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  const name     = product.name     || product.productName || "";
  const desc     = product.desc     || product.description  || "";
  const price    = parseFloat(product.price    || product.salePrice    || 0);
  const oldPrice = parseFloat(product.oldPrice || product.regularPrice || price);
  const rating   = parseFloat(product.rating   || product.averageRating || 0);
  const reviews  = product.reviews  || product.reviewCount  || 0;
  const badge    = product.badge    || product.tag           || "";
  const emoji    = product.emoji    || "🛒";
  const imageUrl = product.image ? `http://localhost:5000/${product.image}` : null;
  const disc     = oldPrice>price ? Math.round(((oldPrice-price)/oldPrice)*100) : 0;
  const pid      = product.id || product._id;

  const handleAdd = () => {
    onAddToCart({ ...product, name, price, oldPrice, rating, reviews, badge, emoji, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", transition:"transform 0.22s, box-shadow 0.22s", position:"relative", display:"flex", flexDirection:"column" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.07)"; }}
    >
      {disc>0 && <div style={{ position:"absolute", top:12, left:12, background:"#ef4444", color:"#fff", fontWeight:700, padding:"3px 8px", borderRadius:20, zIndex:2, fontSize:12 }}>-{disc}%</div>}
      <button onClick={() => onWishlist(pid)}
        style={{ position:"absolute", top:10, right:10, zIndex:2, background:wished?"#fef2f2":"rgba(255,255,255,0.88)", border:wished?"1px solid #fca5a5":"1px solid #e5e7eb", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}>
        {wished?"❤️":"🤍"}
      </button>

      <div style={{ background:"linear-gradient(135deg,#f8fffe,#f0fdf4)", height:160, display:"flex", justifyContent:"center", alignItems:"center", overflow:"hidden" }}>
        {imageUrl && <img src={imageUrl} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{ e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="block"; }} />}
        <span style={{ filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.10))", lineHeight:1, display:imageUrl?"none":"block", fontSize:56 }}>{emoji}</span>
      </div>

      <div style={{ padding:"16px 16px 20px", display:"flex", flexDirection:"column", flex:1 }}>
        {badge && <span style={{ background:BADGE_BG[badge]||"#f3f4f6", color:BADGE_COLORS[badge]||"#374151", fontWeight:700, padding:"2px 8px", borderRadius:20, display:"inline-block", marginBottom:8, alignSelf:"flex-start", textTransform:"uppercase", letterSpacing:0.5, fontSize:11 }}>{badge}</span>}
        <h6 style={{ margin:"0 0 5px", fontWeight:700, color:"#1a1a2e", lineHeight:1.4 }}>{name}</h6>
        <p style={{ margin:"0 0 10px", color:"#6b7280", lineHeight:1.5, fontSize:13 }}>{desc}</p>
        {rating>0 && (
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
            <Stars rating={rating}/><span style={{ color:"#9ca3af", fontSize:13 }}>({reviews})</span>
          </div>
        )}
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
          <span style={{ fontWeight:900, color:"#16a34a", fontSize:16 }}>₹{price.toFixed(2)}</span>
          {oldPrice>price && <del style={{ color:"#9ca3af", fontSize:13 }}>₹{oldPrice.toFixed(2)}</del>}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
            <button onClick={() => setQty(q=>Math.max(1,q-1))} style={{ width:30, height:34, background:"none", border:"none", cursor:"pointer", fontWeight:700, color:"#374151" }}>−</button>
            <span style={{ width:28, textAlign:"center", fontWeight:700, color:"#1f2937", fontSize:14 }}>{qty}</span>
            <button onClick={() => setQty(q=>q+1)} style={{ width:30, height:34, background:"none", border:"none", cursor:"pointer", fontWeight:700, color:"#374151" }}>+</button>
          </div>
          <button onClick={handleAdd}
            style={{ flex:1, background:added?"#16a34a":"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontSize:13 }}>
            {added?"✓ Added!":"🛒 Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ScrollSection = ({ title, items, onAddToCart, onWishlist, wishlist }) => {
  const ref    = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left:d*270, behavior:"smooth" });

  return (
    <section style={{ padding:"48px 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <h2 style={{ margin:0, fontWeight:900, color:"#1a1a2e" }}>{title}</h2>
          <div style={{ display:"flex", gap:8 }}>
            {[["‹",false],["›",true]].map(([arrow,right]) => (
              <button key={String(right)} onClick={() => scroll(right?1:-1)}
                style={{ width:40, height:40, borderRadius:"50%", background:right?"#16a34a":"#fff", border:"2px solid "+(right?"#16a34a":"#e5e7eb"), cursor:"pointer", fontWeight:700, color:right?"#fff":"#374151", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} style={{ display:"flex", gap:20, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none" }}>
          {items.map(p => (
            <div key={p.id||p._id} style={{ minWidth:230, maxWidth:230 }}>
              <ProductCard product={p} onAddToCart={onAddToCart} onWishlist={onWishlist} wished={wishlist.includes(p.id||p._id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};