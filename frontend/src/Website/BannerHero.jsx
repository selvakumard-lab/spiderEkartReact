import React, { useRef, useEffect, useState } from "react";

const SLIDE_MS = 4500;

const BannerHero = ({ banners = [] }) => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerAnim,  setBannerAnim]  = useState(false);
  const [bannerDir,   setBannerDir]   = useState("next");
  const bannerTimer = useRef(null);

  useEffect(() => {
    if (banners.length < 2) return;
    bannerTimer.current = setInterval(() => slideBanner("next"), SLIDE_MS);
    return () => clearInterval(bannerTimer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerIndex, banners.length]);

  const slideBanner = (dir) => {
    if (bannerAnim || banners.length === 0) return;
    setBannerDir(dir); setBannerAnim(true);
    setTimeout(() => {
      setBannerIndex(prev => dir==="next" ? (prev+1)%banners.length : (prev-1+banners.length)%banners.length);
      setBannerAnim(false);
    }, 480);
  };

  const jumpBanner = (i) => {
    clearInterval(bannerTimer.current);
    slideBanner(i > bannerIndex ? "next" : "prev");
    setTimeout(() => setBannerIndex(i), 0);
  };

  const activeBanner = banners[bannerIndex] || null;
  const accent       = activeBanner?.accent || "#22c55e";

  return (
    <section style={{ background:"linear-gradient(135deg,#ecfdf5 0%,#f0fdf4 40%,#dcfce7 100%)", overflow:"hidden", position:"relative" }}>
      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"rgba(34,197,94,0.12)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:80, left:-40, width:200, height:200, background:"rgba(22,163,74,0.08)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

      {/* ── BANNER CAROUSEL ── */}
      {banners.length === 0 ? (
        <div style={{ width:"100%", height:420, background:"linear-gradient(90deg,#d1fae5 25%,#f0fdf4 50%,#d1fae5 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
      ) : (
        <div style={{ position:"relative", width:"100%", height:420, overflow:"hidden" }}>
          <div
            key={bannerIndex}
            style={{
              position:"absolute", inset:0,
              backgroundImage:`url(http://localhost:5000/${activeBanner.image})`,
              backgroundSize:"cover", backgroundPosition:"center",
              animation: bannerAnim
                ? (bannerDir==="next" ? "bnSlideOutL 0.48s ease forwards" : "bnSlideOutR 0.48s ease forwards")
                : (bannerDir==="next" ? "bnSlideInR 0.48s ease forwards"  : "bnSlideInL 0.48s ease forwards"),
            }}
          />
          {/* Gradient overlay */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.20) 55%,transparent 100%)" }} />

          {/* Text overlay */}
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 60px", maxWidth:680, animation: bannerAnim ? "bnFadeOut 0.3s ease forwards" : "bnFadeInUp 0.55s ease 0.22s both" }}>
            {activeBanner.tag && (
              <span style={{ display:"inline-block", background:accent, color:"#fff", fontSize:11, fontWeight:800, padding:"4px 14px", borderRadius:50, textTransform:"uppercase", letterSpacing:1.5, marginBottom:14, alignSelf:"flex-start" }}>{activeBanner.tag}</span>
            )}
            {activeBanner.title && (
              <h2 style={{ margin:"0 0 10px", color:"#fff", fontWeight:900, lineHeight:1.15, textShadow:"0 2px 12px rgba(0,0,0,0.3)", fontSize:"clamp(1.6rem,3vw,2.6rem)" }}>{activeBanner.title}</h2>
            )}
            {activeBanner.sub && (
              <p style={{ margin:"0 0 24px", color:"rgba(255,255,255,0.88)", fontSize:16, lineHeight:1.6 }}>{activeBanner.sub}</p>
            )}
            {activeBanner.cta && (
              <button style={{ alignSelf:"flex-start", background:accent, color:"#fff", border:"none", borderRadius:50, padding:"13px 30px", fontSize:14, fontWeight:800, cursor:"pointer", boxShadow:`0 6px 20px ${accent}66`, transition:"transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
              >{activeBanner.cta}</button>
            )}
          </div>

          {/* Arrows */}
          {banners.length > 1 && (
            <>
              <button onClick={() => { clearInterval(bannerTimer.current); slideBanner("prev"); }}
                style={{ position:"absolute", top:"50%", left:16, transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.20)", backdropFilter:"blur(6px)", border:"1.5px solid rgba(255,255,255,0.35)", color:"#fff", fontSize:24, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", zIndex:10 }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.40)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.20)"}
              >‹</button>
              <button onClick={() => { clearInterval(bannerTimer.current); slideBanner("next"); }}
                style={{ position:"absolute", top:"50%", right:16, transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.20)", backdropFilter:"blur(6px)", border:"1.5px solid rgba(255,255,255,0.35)", color:"#fff", fontSize:24, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", zIndex:10 }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.40)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.20)"}
              >›</button>
            </>
          )}

          {/* Dots */}
          {banners.length > 1 && (
            <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10 }}>
              {banners.map((_,i) => (
                <button key={i} onClick={() => jumpBanner(i)}
                  style={{ width:i===bannerIndex?28:8, height:8, borderRadius:50, border:"none", cursor:"pointer", background:i===bannerIndex?"#fff":"rgba(255,255,255,0.45)", transition:"all 0.35s ease", padding:0 }} />
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.15)" }}>
            <div key={bannerIndex} style={{ height:"100%", background:"#22c55e", animation:`bnProgress ${SLIDE_MS}ms linear forwards` }} />
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", flexWrap:"wrap", alignItems:"center", gap:40, padding:"70px 24px 0", position:"relative", zIndex:1 }}>
        {/* Left copy */}
        <div style={{ flex:"1 1 360px", maxWidth:560 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#dcfce7", color:"#16a34a", padding:"6px 14px", borderRadius:50, fontSize:13, fontWeight:700, marginBottom:20, textTransform:"uppercase", letterSpacing:1 }}>
            🌱 Farm Fresh · Delivered Daily
          </div>
          <h4 style={{ margin:"0 0 18px", fontWeight:900, lineHeight:1.1, color:"#1a1a2e" }}>
            Eat Fresh. <span style={{ color:"#16a34a" }}>Live Better.</span> Shop Organic.
          </h4>
          <p style={{ fontSize:16, color:"#4b5563", lineHeight:1.7, margin:"0 0 32px" }}>
            Discover 20,000+ organic products sourced directly from local farms. Delivered to your door within hours, not days.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:48 }}>
            <button style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", boxShadow:"0 8px 24px rgba(22,163,74,0.35)" }}>Shop Now →</button>
            <button style={{ background:"transparent", color:"#16a34a", border:"2px solid #16a34a", borderRadius:50, padding:"16px 36px", fontWeight:800, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#16a34a"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#16a34a"; }}
            >Learn More</button>
          </div>
          <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
            {[["14k+","Products"],["50k+","Customers"],["98%","Satisfaction"],["10+","Cities"]].map(([num,label]) => (
              <div key={label}>
                <div style={{ fontSize:22, fontWeight:900, color:"#16a34a", lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:12, color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right emoji grid */}
        <div style={{ flex:"1 1 300px", display:"flex", justifyContent:"center" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, maxWidth:340 }}>
            {["🥑","🍓","🥦","🥛","🐟","🍞","🍊","🥚","🫙","🍿","🫐","🍯"].map((em,i) => (
              <div key={i}
                style={{ width:70, height:70, background:"#fff", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, boxShadow:"0 4px 20px rgba(0,0,0,0.08)", cursor:"default", transition:"transform 0.2s", animation:`fadeIn 0.5s ease ${i*0.04}s both` }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.15) rotate(-6deg)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1) rotate(0deg)"}
              >{em}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature bar */}
      <div style={{ maxWidth:1280, margin:"60px auto 0", display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderRadius:"20px 20px 0 0", overflow:"hidden", position:"relative", zIndex:1 }}>
        {[
          { bg:"#16a34a", icon:"🚜", title:"Farm to Door",      desc:"Straight from local farms to your kitchen." },
          { bg:"#15803d", icon:"✅", title:"100% Organic",       desc:"Certified organic, no pesticides ever." },
          { bg:"#166534", icon:"⚡", title:"Same Day Delivery",  desc:"Order by 2pm, receive by evening." },
        ].map(f => (
          <div key={f.title} style={{ background:f.bg, padding:"28px 32px", color:"#fff", display:"flex", gap:16, alignItems:"center" }}>
            <span style={{ fontSize:28, flexShrink:0 }}>{f.icon}</span>
            <div>
              <div style={{ fontSize:15, fontWeight:800, marginBottom:4 }}>{f.title}</div>
              <div style={{ fontSize:13, opacity:0.82, lineHeight:1.4 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHero;