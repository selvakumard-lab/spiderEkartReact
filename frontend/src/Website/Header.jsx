import React, { useState } from "react";
import api from "../Services/api";

const Header = ({
  search, setSearch,
  cartCount, wishlistCount,
  onCartOpen, onWishlistOpen, onNavOpen,
  categories, activeCategory, setActiveCategory,
}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [authStep,    setAuthStep]    = useState("email"); // "email" | "otp" | "loggedIn"
  const [email,       setEmail]       = useState("");
  const [otp,         setOtp]         = useState(["","","","","",""]);
  const [user,        setUser]        = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const startResendTimer = () => {
    setResendTimer(30);
    const iv = setInterval(() => {
      setResendTimer(t => { if (t <= 1) { clearInterval(iv); return 0; } return t - 1; });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true); setError("");
    try {
      await api.post("/auth/send-otp", { email });
      setAuthStep("otp");
      startResendTimer();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the 6-digit OTP."); return; }
    setLoading(true); setError("");
    try {
      const res = await api.post("/auth/verify-otp", { email, otp: code });
      setUser(res.data.user || { email });
      setAuthStep("loggedIn");
    } catch (e) {
      setError(e?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally { setLoading(false); }
  };

  const handleOtpInput = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx+1}`)?.focus();
    if (!val && idx > 0) document.getElementById(`otp-${idx-1}`)?.focus();
  };

  const handleLogout = () => {
    setUser(null); setAuthStep("email");
    setEmail(""); setOtp(["","","","","",""]);
    setAccountOpen(false);
  };

  const closeModal = () => { setAccountOpen(false); setError(""); };

  return (
    <>
      <style>{`
        @keyframes modalFadeIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes overlayIn{from{opacity:0}to{opacity:1}}
      `}</style>

      {/* ── STICKY HEADER ── */}
      <header style={{ background:"rgba(255,255,255,0.96)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:200, boxShadow:"0 2px 20px rgba(0,0,0,0.06)", fontFamily:"Montserrat, sans-serif" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>

          {/* Hamburger */}
          <button onClick={onNavOpen} style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex", flexDirection:"column", gap:5 }}>
            {[0,1,2].map(i => <span key={i} style={{ display:"block", width:22, height:2.5, background:"#374151", borderRadius:2 }} />)}
          </button>

          {/* Logo */}
          <a href="/" onClick={e => e.preventDefault()} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
            <img src={require("../assets/images/logo/logo1.png")} alt="Logo" style={{ height:42, width:"auto", objectFit:"contain" }} />
          </a>

          {/* Search */}
          <div style={{ flex:1, minWidth:180, maxWidth:460 }}>
            <div style={{ display:"flex", alignItems:"center", background:"#f3f4f6", borderRadius:50, padding:"10px 18px", gap:10 }}>
              <span style={{ fontSize:14, color:"#9ca3af" }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search fresh groceries..."
                style={{ background:"none", border:"none", outline:"none", flex:1, fontSize:14, color:"#374151", fontFamily:"Montserrat, sans-serif" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", fontSize:14, lineHeight:1, padding:0 }}>✕</button>
              )}
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display:"flex", gap:24 }}>
            {["Home","Shop","Blog","About"].map((l,i) => (
              <a key={l} href={`/${l.toLowerCase()}`} onClick={e => e.preventDefault()}
                style={{ textDecoration:"none", fontSize:13, fontWeight:700, color:i===0?"#16a34a":"#6b7280", textTransform:"uppercase", letterSpacing:0.5, transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#16a34a"}
                onMouseLeave={e => e.currentTarget.style.color=i===0?"#16a34a":"#6b7280"}
              >{l}</a>
            ))}
          </nav>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
            {/* Account */}
            <button onClick={() => setAccountOpen(true)}
              style={{ background:user?"#f0fdf4":"#f3f4f6", border:user?"1.5px solid #86efac":"1.5px solid transparent", borderRadius:12, padding:"9px 14px", cursor:"pointer", fontSize:13, fontWeight:600, color:user?"#16a34a":"#374151", display:"flex", alignItems:"center", gap:6 }}>
              👤 {user ? (user.name || user.email?.split("@")[0] || "Account") : "Account"}
            </button>

            {/* Wishlist */}
            <button onClick={onWishlistOpen}
              style={{ background:wishlistCount>0?"#fff5f5":"#f3f4f6", border:wishlistCount>0?"1.5px solid #fecaca":"1.5px solid transparent", borderRadius:12, padding:"9px 14px", cursor:"pointer", fontSize:13, fontWeight:600, color:wishlistCount>0?"#e11d48":"#374151", display:"flex", alignItems:"center", gap:6, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#fee2e2"; e.currentTarget.style.borderColor="#fca5a5"; e.currentTarget.style.color="#e11d48"; }}
              onMouseLeave={e => { e.currentTarget.style.background=wishlistCount>0?"#fff5f5":"#f3f4f6"; e.currentTarget.style.borderColor=wishlistCount>0?"#fecaca":"transparent"; e.currentTarget.style.color=wishlistCount>0?"#e11d48":"#374151"; }}
            >
              {wishlistCount>0?"❤️":"🔖"} Wishlist
              {wishlistCount>0 && (
                <span style={{ background:"#e11d48", color:"#fff", fontSize:11, fontWeight:900, borderRadius:50, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button onClick={onCartOpen}
              style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", border:"none", borderRadius:12, padding:"9px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#fff", fontWeight:700, fontSize:13 }}>
              🛒 Cart
              {cartCount>0 && (
                <span style={{ background:"#ef4444", color:"#fff", fontSize:11, fontWeight:900, borderRadius:50, minWidth:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div style={{ borderTop:"1px solid #f0f0f0", padding:"0 24px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", overflowX:"auto", display:"flex", gap:6, padding:"12px 0", scrollbarWidth:"none" }}>
            {["All",...categories.map(c=>c.name)].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ flexShrink:0, padding:"8px 20px", background:activeCategory===cat?"#16a34a":"transparent", color:activeCategory===cat?"#fff":"#6b7280", border:activeCategory===cat?"none":"1.5px solid #e5e7eb", borderRadius:50, fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap" }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ── ACCOUNT MODAL ── */}
      {accountOpen && (
        <div onClick={closeModal} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)", animation:"overlayIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"#fff", borderRadius:28, padding:"40px 36px", width:"100%", maxWidth:420, boxShadow:"0 24px 80px rgba(0,0,0,0.22)", animation:"modalFadeIn 0.3s ease", fontFamily:"Montserrat, sans-serif" }}>

            {/* Modal header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
              <div>
                <div style={{ width:52, height:52, background:"linear-gradient(135deg,#22c55e,#16a34a)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14, boxShadow:"0 6px 20px rgba(22,163,74,0.35)" }}>
                  {authStep==="loggedIn"?"👤":"🔐"}
                </div>
                <h3 style={{ margin:0, fontSize:22, fontWeight:900, color:"#1a1a2e" }}>
                  {authStep==="email"&&"Sign In / Sign Up"}
                  {authStep==="otp"&&"Verify Your Email"}
                  {authStep==="loggedIn"&&"Welcome back!"}
                </h3>
                <p style={{ margin:"6px 0 0", fontSize:14, color:"#6b7280" }}>
                  {authStep==="email"&&"Enter your email to continue"}
                  {authStep==="otp"&&`OTP sent to ${email}`}
                  {authStep==="loggedIn"&&(user?.email||"")}
                </p>
              </div>
              <button onClick={closeModal} style={{ background:"#f3f4f6", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            </div>

            {/* Email step */}
            {authStep==="email" && (
              <div>
                <label style={{ fontSize:13, fontWeight:700, color:"#374151", display:"block", marginBottom:8 }}>Email Address</label>
                
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} onKeyDown={e => e.key==="Enter"&&handleSendOtp()} placeholder="you@example.com"
                  style={{ width:"100%", padding:"14px 18px", border:"2px solid #e5e7eb", borderRadius:14, fontSize:15, outline:"none", fontFamily:"Montserrat, sans-serif", boxSizing:"border-box", transition:"border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor="#22c55e"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />

                {error && <p style={{ color:"#ef4444", fontSize:13, margin:"8px 0 0" }}>{error}</p>}
                <button onClick={handleSendOtp} disabled={loading}
                  style={{ width:"100%", marginTop:18, background:loading?"#9ca3af":"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:"15px 0", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":"0 6px 20px rgba(22,163,74,0.32)" }}>
                  {loading?"Sending…":"Send OTP →"}
                </button>
                <p style={{ textAlign:"center", fontSize:13, color:"#9ca3af", marginTop:16 }}>By continuing, you agree to our Terms & Privacy Policy</p>
              </div>
            )}

            {/* OTP step */}
            {authStep==="otp" && (
              <div>
                <label style={{ fontSize:13, fontWeight:700, color:"#374151", display:"block", marginBottom:16 }}>Enter 6-digit OTP</label>
                <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:8 }}>
                  {otp.map((digit,idx) => (
                    <input key={idx} id={`otp-${idx}`} value={digit} onChange={e => handleOtpInput(e.target.value,idx)}
                      onKeyDown={e => { if(e.key==="Backspace"&&!digit&&idx>0) document.getElementById(`otp-${idx-1}`)?.focus(); }}
                      maxLength={1}
                      style={{ width:48, height:56, textAlign:"center", border:`2px solid ${digit?"#22c55e":"#e5e7eb"}`, borderRadius:14, fontSize:22, fontWeight:800, outline:"none", fontFamily:"Montserrat, sans-serif", transition:"border-color 0.2s, box-shadow 0.2s", boxShadow:digit?"0 0 0 3px rgba(34,197,94,0.15)":"none" }} />
                  ))}
                </div>
                {error && <p style={{ color:"#ef4444", fontSize:13, margin:"8px 0" }}>{error}</p>}
                <button onClick={handleVerifyOtp} disabled={loading}
                  style={{ width:"100%", marginTop:16, background:loading?"#9ca3af":"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:"15px 0", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":"0 6px 20px rgba(22,163,74,0.32)" }}>
                  {loading?"Verifying…":"Verify & Login ✓"}
                </button>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14 }}>
                  <button onClick={() => { setAuthStep("email"); setOtp(["","","","","",""]); setError(""); }} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"#6b7280", fontWeight:600 }}>← Change Email</button>
                  <button onClick={() => { if(resendTimer===0) handleSendOtp(); }} disabled={resendTimer>0} style={{ background:"none", border:"none", cursor:resendTimer>0?"not-allowed":"pointer", fontSize:13, color:resendTimer>0?"#9ca3af":"#16a34a", fontWeight:700 }}>
                    {resendTimer>0?`Resend in ${resendTimer}s`:"Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* Logged in step */}
            {authStep==="loggedIn" && (
              <div>
                <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:16, padding:"20px", marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:50, height:50, background:"linear-gradient(135deg,#22c55e,#16a34a)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👤</div>
                    <div>
                      <div style={{ fontWeight:800, color:"#1a1a2e", fontSize:16 }}>{user?.name||"Customer"}</div>
                      <div style={{ fontSize:13, color:"#6b7280" }}>{user?.email||email}</div>
                    </div>
                  </div>
                </div>
                {[{icon:"📦",label:"My Orders"},{icon:"📍",label:"Saved Addresses"},{icon:"❤️",label:"Wishlist"},{icon:"💳",label:"Payment Methods"}].map(item => (
                  <button key={item.label}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"13px 16px", background:"none", border:"1.5px solid #f3f4f6", borderRadius:12, marginBottom:8, cursor:"pointer", fontWeight:600, fontSize:14, color:"#374151", transition:"all 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.borderColor="#86efac"; e.currentTarget.style.color="#16a34a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.borderColor="#f3f4f6"; e.currentTarget.style.color="#374151"; }}>
                    <span style={{ fontSize:18 }}>{item.icon}</span> {item.label}
                    <span style={{ marginLeft:"auto", color:"#d1d5db" }}>›</span>
                  </button>
                ))}
                <button onClick={handleLogout}
                  style={{ width:"100%", marginTop:8, background:"none", border:"1.5px solid #fecaca", color:"#ef4444", borderRadius:12, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#fff5f5"}
                  onMouseLeave={e => e.currentTarget.style.background="none"}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;