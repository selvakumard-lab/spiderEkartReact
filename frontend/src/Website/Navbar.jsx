import React from "react";

const Navbar = ({ open, onClose, categories }) => (
  <>
    {open && (
      <div
        onClick={onClose}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:900, backdropFilter:"blur(3px)" }}
      />
    )}
    <div
      style={{
        position:"fixed", top:0, left:0, height:"100vh", width:290,
        background:"#fff", zIndex:901,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        boxShadow:"8px 0 40px rgba(0,0,0,0.12)",
        display:"flex", flexDirection:"column",
        fontFamily:"Montserrat, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding:"20px 24px",
          background:"linear-gradient(135deg,#16a34a,#15803d)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <a href="/" onClick={e => e.preventDefault()} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
            <img src={require("../assets/images/logo/logo1.png")} alt="Logo" style={{ height:42, width:"auto", objectFit:"contain" }} />
          </a>
        </div>


        <button
          onClick={onClose}
          style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:34, height:34, cursor:"pointer", fontSize:14, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}
        >✕</button>
      </div>

      {/* Links */}
      <div style={{ flex:1, overflowY:"auto" }}>
        <button
          onClick={onClose}
          style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 24px", width:"100%", background:"none", border:"none", borderBottom:"1px solid #f9fafb", textAlign:"left", color:"#374151", fontWeight:700, cursor:"pointer", transition:"background 0.15s", fontSize:14 }}
          onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
          onMouseLeave={e => e.currentTarget.style.background="none"}
        >
          <span style={{ fontSize:22 }}>🏠</span> Home
        </button>
        {categories.map(cat => (
          <button
            key={cat.id || cat._id}
            onClick={onClose}
            style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 24px", width:"100%", background:"none", border:"none", borderBottom:"1px solid #f9fafb", textAlign:"left", color:"#374151", fontWeight:600, cursor:"pointer", transition:"background 0.15s", fontSize:14 }}
            onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
            onMouseLeave={e => e.currentTarget.style.background="none"}
          >
            {cat.image
              ? <img src={`http://localhost:5000/${cat.image}`} alt={cat.name} style={{ width:40 }} />
              : <span style={{ fontSize:22 }}>📦</span>
            }
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  </>
);

export default Navbar;