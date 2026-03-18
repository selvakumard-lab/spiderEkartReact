import React, { useState } from "react";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerDone,  setFooterDone]  = useState(false);

  return (
    <footer style={{ background:"#111827", color:"#d1d5db", padding:"60px 24px 0", fontFamily:"Montserrat, sans-serif" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:40 }}>

        {/* Brand */}
        <div style={{ gridColumn:"span 2" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <a href="/" onClick={e => e.preventDefault()} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
              <img src={require("../assets/images/logo/logo1.png")} alt="Logo" style={{ height:42, width:"auto", objectFit:"contain" }} />
            </a>
          </div>
          <p style={{ fontSize:14, lineHeight:1.7, color:"#9ca3af", margin:"0 0 24px", maxWidth:260 }}>Fresh, certified organic produce delivered from local farms to your table every day.</p>
          <div style={{ display:"flex", gap:10 }}>
            {[["f","https://facebook.com"],["t","https://twitter.com"],["in","https://instagram.com"],["yt","https://youtube.com"]].map(([s,url]) => (
              <a key={s} href={url} target="_blank" rel="noreferrer"
                style={{ width:36, height:36, background:"#1f2937", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#9ca3af", fontSize:13, fontWeight:800, textDecoration:"none", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#1f2937"; e.currentTarget.style.color="#9ca3af"; }}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { title:"Company", links:[["About Us","/about"],["Careers","/careers"],["Blog","/blog"]] },
          { title:"Shop",    links:[["All Products","/shop"],["New Arrivals","/new"],["Best Sellers","/best"]] },
          { title:"Support", links:[["Help Center","/help"],["Track Order","/track"],["Contact","/contact"],["Privacy","/privacy"]] },
        ].map(col => (
          <div key={col.title}>
            <h5 style={{ margin:"0 0 18px", fontSize:13, fontWeight:800, color:"#fff", textTransform:"uppercase", letterSpacing:1 }}>{col.title}</h5>
            <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
              {col.links.map(([label,href]) => (
                <li key={label}>
                  <a href={href} onClick={e => e.preventDefault()}
                    style={{ textDecoration:"none", fontSize:14, color:"#9ca3af", transition:"color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#22c55e"}
                    onMouseLeave={e => e.currentTarget.style.color="#9ca3af"}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h5 style={{ margin:"0 0 18px", fontSize:13, fontWeight:800, color:"#fff", textTransform:"uppercase", letterSpacing:1 }}>Newsletter</h5>
          <p style={{ fontSize:14, color:"#9ca3af", margin:"0 0 16px", lineHeight:1.6 }}>Get weekly deals and fresh picks.</p>
          {footerDone ? (
            <div style={{ color:"#22c55e", fontWeight:700, fontSize:14 }}>✅ Subscribed!</div>
          ) : (
            <div style={{ display:"flex", background:"#1f2937", borderRadius:12, overflow:"hidden", border:"1px solid #374151" }}>
              <input type="email" placeholder="Email address" value={footerEmail} onChange={e => setFooterEmail(e.target.value)}
                style={{ flex:1, background:"none", border:"none", padding:"12px 16px", fontSize:14, color:"#fff", outline:"none", fontFamily:"Montserrat, sans-serif" }} />
              <button onClick={() => { if(footerEmail){ setFooterDone(true); setFooterEmail(""); } }}
                style={{ background:"#16a34a", border:"none", padding:"12px 18px", color:"#fff", fontWeight:700, cursor:"pointer" }}>→</button>
            </div>
          )}
          <div style={{ marginTop:24, display:"flex", flexDirection:"column", gap:8 }}>
            {[{icon:"📦",label:"Free Delivery over ₹49"},{icon:"🔒",label:"Secure Payments"},{icon:"🌱",label:"USDA Organic Certified"},{icon:"🔄",label:"30-day Easy Returns"}].map(b => (
              <div key={b.label} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#6b7280" }}>
                <span>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth:1280, margin:"48px auto 0", borderTop:"1px solid #1f2937", padding:"24px 0", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <p style={{ margin:0, fontSize:14, color:"#6b7280" }}>© 2026 Spider India. All rights reserved.</p>
        <div style={{ display:"flex", gap:20 }}>
          {["Terms","Privacy"].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} onClick={e => e.preventDefault()}
              style={{ fontSize:13, color:"#6b7280", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#22c55e"}
              onMouseLeave={e => e.currentTarget.style.color="#6b7280"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;