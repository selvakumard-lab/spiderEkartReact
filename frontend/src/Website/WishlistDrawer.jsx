import React from "react";

const BADGE_COLORS = { "Organic":"#2e7d32","Fresh":"#1565c0","Best Seller":"#e65100","Free Range":"#6a1b9a","Probiotic":"#006064","Artisan":"#880e4f","New":"#33691e","Seasonal":"#f57f17","Vegan":"#1b5e20","Premium":"#212121","Halal":"#2e7d32","Frozen":"#0d47a1","Wellness":"#4527a0","Raw":"#827717","Local":"#2e7d32","Crunchy":"#bf360c" };
const BADGE_BG    = { "Organic":"#e8f5e9","Fresh":"#e3f2fd","Best Seller":"#fff3e0","Free Range":"#f3e5f5","Probiotic":"#e0f7fa","Artisan":"#fce4ec","New":"#f1f8e9","Seasonal":"#fff8e1","Vegan":"#e8f5e9","Premium":"#fafafa","Halal":"#e8f5e9","Frozen":"#e3f2fd","Wellness":"#ede7f6","Raw":"#fff9c4","Local":"#e8f5e9","Crunchy":"#fff3e0" };

const WishlistDrawer = ({ open, onClose, wishlistIds, products, onRemoveWishlist, onAddToCart, notify }) => {
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id||p._id));
  const totalValue = wishlistProducts.reduce((s,p) => s + parseFloat(p.price||p.salePrice||0), 0);

  const handleMoveAll = () => {
    wishlistProducts.forEach(p => {
      const price=parseFloat(p.price||p.salePrice||0), oldPrice=parseFloat(p.oldPrice||p.regularPrice||price);
      onAddToCart({ ...p, name:p.name||p.productName||"", price, oldPrice, badge:p.badge||p.tag||"", emoji:p.emoji||"🛒", qty:1 });
    });
    wishlistProducts.forEach(p => onRemoveWishlist(p.id||p._id));
    notify(`🛒 All ${wishlistProducts.length} items moved to cart!`);
  };

  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:900, backdropFilter:"blur(3px)" }} />}
      <div style={{ position:"fixed", top:0, right:0, height:"100vh", width:400, background:"#fff", zIndex:901, transform:open?"translateX(0)":"translateX(100%)", transition:"transform 0.34s cubic-bezier(0.4,0,0.2,1)", boxShadow:"-8px 0 48px rgba(0,0,0,0.18)", display:"flex", flexDirection:"column", fontFamily:"Montserrat, sans-serif" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#fff1f2,#fef2f2)", borderBottom:"1px solid #fecdd3", padding:"20px 24px 0", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:44, height:44, background:"linear-gradient(135deg,#f43f5e,#e11d48)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, boxShadow:"0 4px 16px rgba(244,63,94,0.38)" }}>❤️</div>
              <div>
                <h3 style={{ margin:0, fontWeight:900, color:"#1a1a2e", fontSize:18, lineHeight:1 }}>My Wishlist</h3>
                <p style={{ margin:"4px 0 0", fontSize:13, color:"#9ca3af" }}>{wishlistProducts.length} saved item{wishlistProducts.length!==1?"s":""}</p>
              </div>
            </div>
            <button onClick={onClose} style={{ background:"rgba(0,0,0,0.06)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", color:"#374151" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.12)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.06)"}>✕</button>
          </div>
          {wishlistProducts.length>0 && (
            <button onClick={handleMoveAll} style={{ width:"100%", marginBottom:16, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:12, padding:"11px 0", fontSize:13, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 14px rgba(22,163,74,0.30)", transition:"transform 0.15s" }} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>🛒 Move All to Cart</button>
          )}
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"4px 0" }}>
          {wishlistProducts.length===0 ? (
            <div style={{ textAlign:"center", padding:"80px 32px 40px" }}>
              <div style={{ fontSize:64, marginBottom:20 }}>🤍</div>
              <p style={{ color:"#374151", fontSize:17, fontWeight:700, margin:"0 0 8px" }}>Your wishlist is empty</p>
              <p style={{ color:"#9ca3af", fontSize:14, margin:0, lineHeight:1.6 }}>Tap the ♡ on any product<br/>to save it for later.</p>
            </div>
          ) : wishlistProducts.map((p,idx) => {
            const name=p.name||p.productName||"", price=parseFloat(p.price||p.salePrice||0), oldPrice=parseFloat(p.oldPrice||p.regularPrice||price);
            const badge=p.badge||p.tag||"", emoji=p.emoji||"🛒", imageUrl=p.image?`http://localhost:5000/${p.image}`:null;
            const disc=oldPrice>price?Math.round(((oldPrice-price)/oldPrice)*100):0, pid=p.id||p._id;
            return (
              <div key={pid} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"16px 24px", borderBottom:idx<wishlistProducts.length-1?"1px solid #f3f4f6":"none", transition:"background 0.15s" }} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ width:74, height:74, flexShrink:0, borderRadius:16, background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.08)", position:"relative" }}>
                  {imageUrl?<img src={imageUrl} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>:<span style={{ fontSize:32 }}>{emoji}</span>}
                  {disc>0&&<div style={{ position:"absolute", top:4, left:4, background:"#ef4444", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:6 }}>-{disc}%</div>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  {badge&&<span style={{ background:BADGE_BG[badge]||"#f3f4f6", color:BADGE_COLORS[badge]||"#374151", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20, textTransform:"uppercase", letterSpacing:0.4, display:"inline-block", marginBottom:5 }}>{badge}</span>}
                  <p style={{ margin:"0 0 4px", fontSize:14, fontWeight:700, color:"#1a1a2e", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                    <span style={{ fontSize:15, fontWeight:900, color:"#16a34a" }}>₹{price.toFixed(2)}</span>
                    {oldPrice>price&&<del style={{ fontSize:12, color:"#9ca3af" }}>₹{oldPrice.toFixed(2)}</del>}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => { onAddToCart({...p,name,price,oldPrice,badge,emoji,qty:1}); onRemoveWishlist(pid); notify(`🛒 ${name} moved to cart!`); }} style={{ flex:1, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:10, padding:"8px 0", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>🛒 Add to Cart</button>
                    <button onClick={() => { onRemoveWishlist(pid); notify("Removed from wishlist"); }} style={{ width:34, height:34, flexShrink:0, background:"#fff5f5", border:"1.5px solid #fecaca", borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }} onMouseEnter={e=>{e.currentTarget.style.background="#fee2e2";}} onMouseLeave={e=>{e.currentTarget.style.background="#fff5f5";}}>🗑️</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {wishlistProducts.length>0 && (
          <div style={{ padding:"16px 24px 24px", borderTop:"1px solid #f3f4f6", background:"#fafafa", flexShrink:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, color:"#6b7280" }}>{wishlistProducts.length} item{wishlistProducts.length!==1?"s":""} saved</span>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, color:"#9ca3af", marginBottom:2 }}>Total value</div>
                <div style={{ fontSize:18, fontWeight:900, color:"#1a1a2e" }}>₹{totalValue.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={() => { wishlistProducts.forEach(p=>onRemoveWishlist(p.id||p._id)); notify("Wishlist cleared"); }} style={{ width:"100%", background:"none", border:"1.5px solid #fecaca", color:"#ef4444", borderRadius:12, padding:"10px 0", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="#fff5f5"} onMouseLeave={e=>e.currentTarget.style.background="none"}>🗑️ Clear Wishlist</button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;