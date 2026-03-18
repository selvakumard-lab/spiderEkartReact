import React from "react";

const CartDrawer = ({ open, onClose, items, onRemove, onClear, onCheckout }) => {
  const total = items.reduce((s,i) => s + i.price * i.qty, 0);

  return (
    <>
      {open && (
        <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:900, backdropFilter:"blur(3px)" }} />
      )}
      <div style={{ position:"fixed", top:0, right:0, height:"100vh", width:370, background:"#fff", zIndex:901, transform:open?"translateX(0)":"translateX(100%)", transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)", boxShadow:"-8px 0 40px rgba(0,0,0,0.15)", display:"flex", flexDirection:"column", fontFamily:"Montserrat, sans-serif" }}>

        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f0f0f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h3 style={{ margin:0, fontWeight:800, color:"#1a1a2e" }}>🛒 My Cart</h3>
            <p style={{ margin:0, fontSize:13, color:"#6b7280" }}>{items.length} item{items.length!==1?"s":""}</p>
          </div>
          <button onClick={onClose} style={{ background:"#f3f4f6", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {items.length===0 ? (
            <div style={{ textAlign:"center", paddingTop:60 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
              <p style={{ color:"#9ca3af", fontSize:16 }}>Your cart is empty</p>
              <p style={{ color:"#d1d5db", fontSize:14 }}>Add some fresh items!</p>
            </div>
          ) : (
            items.map((item,i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f9fafb" }}>
                <div style={{ width:50, height:50, background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{item.emoji||"🛒"}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#1f2937", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</p>
                  <p style={{ margin:0, fontSize:12, color:"#6b7280" }}>Qty {item.qty} × ₹{item.price.toFixed(2)}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <p style={{ margin:0, fontSize:14, fontWeight:800, color:"#16a34a" }}>₹{(item.price*item.qty).toFixed(2)}</p>
                  <button onClick={() => onRemove(i)} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", fontSize:12, marginTop:2, padding:0 }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length>0 && (
          <div style={{ padding:"20px 24px", borderTop:"1px solid #f0f0f0", background:"#fafafa" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:14, color:"#6b7280" }}>Subtotal</span>
              <span style={{ fontSize:16, fontWeight:900, color:"#1a1a2e" }}>₹{total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} style={{ width:"100%", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:14, fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:8 }}>Checkout →</button>
            <button onClick={onClear} style={{ width:"100%", background:"none", border:"1.5px solid #e5e7eb", color:"#6b7280", borderRadius:14, padding:10, fontSize:14, fontWeight:600, cursor:"pointer" }}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;