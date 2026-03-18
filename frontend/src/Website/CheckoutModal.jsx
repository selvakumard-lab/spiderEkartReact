import React, { useState, useEffect } from "react";
import api from "../Services/api";

const CheckoutModal = ({ open, onClose, cartItems, onSuccess, notify }) => {
  const [step,           setStep]           = useState("address"); // address | payment | confirm
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState("");
  const [address,        setAddress]        = useState({ name:"", phone:"", line1:"", city:"", state:"", pincode:"" });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loadingMethods, setLoadingMethods] = useState(false);
  const [upiId,          setUpiId]          = useState("");
  const [card,           setCard]           = useState({ number:"", expiry:"", cvv:"", name:"" });

  const total = cartItems.reduce((s,i) => s + i.price * i.qty, 0);

  useEffect(() => {
    if (!open) return;
    setStep("address"); setError("");
    fetchPaymentSettings();
  }, [open]);

  const fetchPaymentSettings = async () => {
    setLoadingMethods(true);
    try {
      const res = await api.get("/payment/settings");
      const methods = res.data?.data || res.data || [];
      setPaymentMethods(Array.isArray(methods) ? methods : []);
    } catch {
      setPaymentMethods([
        { id:"cod",        label:"Cash on Delivery",   icon:"💵", description:"Pay when your order arrives",             enabled:true },
        { id:"upi",        label:"UPI Payment",         icon:"📱", description:"Pay via GPay, PhonePe, Paytm",           enabled:true },
        { id:"card",       label:"Credit / Debit Card", icon:"💳", description:"Visa, Mastercard, RuPay",               enabled:true },
        { id:"netbanking", label:"Net Banking",          icon:"🏦", description:"Pay via your bank account",             enabled:true },
        { id:"wallet",     label:"Digital Wallet",       icon:"👜", description:"Paytm, MobiKwik, Freecharge",           enabled:true },
      ]);
    } finally { setLoadingMethods(false); }
  };

  const enabledMethods = paymentMethods.filter(m => m.enabled !== false);

  const handleAddressNext = () => {
    const { name, phone, line1, city, state, pincode } = address;
    if (!name||!phone||!line1||!city||!state||!pincode) { setError("Please fill all address fields."); return; }
    if (!/^\d{10}$/.test(phone))  { setError("Enter a valid 10-digit phone number."); return; }
    if (!/^\d{6}$/.test(pincode)) { setError("Enter a valid 6-digit pincode."); return; }
    setError(""); setStep("payment");
  };

  const handlePaymentNext = () => {
    if (!selectedMethod) { setError("Please select a payment method."); return; }
    if (selectedMethod.id==="upi"  && !upiId)                                              { setError("Please enter your UPI ID."); return; }
    if (selectedMethod.id==="card" && (!card.number||!card.expiry||!card.cvv||!card.name)) { setError("Please fill all card details."); return; }
    setError(""); setStep("confirm");
  };

  const handlePlaceOrder = async () => {
    setLoading(true); setError("");
    try {
      await api.post("/order", {
        items: cartItems.map(i => ({ productId:i.id||i._id, name:i.name, qty:i.qty, price:i.price })),
        address,
        paymentMethod: selectedMethod?.id,
        paymentDetails: selectedMethod?.id==="upi" ? { upiId } : selectedMethod?.id==="card" ? { last4:card.number.slice(-4) } : {},
        total,
      });
      notify("🎉 Order placed successfully!");
      onSuccess();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to place order. Please try again.");
    } finally { setLoading(false); }
  };

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)", padding:20, fontFamily:"Montserrat, sans-serif" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:28, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.25)" }}>

        {/* Header */}
        <div style={{ padding:"28px 32px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#fff", zIndex:10, borderRadius:"28px 28px 0 0" }}>
          <div>
            <h3 style={{ margin:0, fontWeight:900, fontSize:20, color:"#1a1a2e" }}>
              {step==="address"&&"🏠 Delivery Address"}
              {step==="payment"&&"💳 Payment Method"}
              {step==="confirm"&&"✅ Confirm Order"}
            </h3>
            <div style={{ display:"flex", gap:6, marginTop:10 }}>
              {["address","payment","confirm"].map((s,i) => (
                <div key={s} style={{ height:4, borderRadius:50, width:s===step?24:8, background:["address","payment","confirm"].indexOf(step)>=i?"#16a34a":"#e5e7eb", transition:"all 0.3s" }} />
              ))}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"#f3f4f6", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        <div style={{ padding:"24px 32px 32px" }}>

          {/* ── ADDRESS ── */}
          {step==="address" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[{key:"name",label:"Full Name",type:"text",placeholder:"John Doe",full:true},{key:"phone",label:"Phone Number",type:"tel",placeholder:"9876543210",full:false},{key:"pincode",label:"Pincode",type:"text",placeholder:"600001",full:false},{key:"line1",label:"Address Line",type:"text",placeholder:"Street, Apt No.",full:true},{key:"city",label:"City",type:"text",placeholder:"Chennai",full:false},{key:"state",label:"State",type:"text",placeholder:"Tamil Nadu",full:false}].map(f => (
                  <div key={f.key} style={{ gridColumn:f.full?"span 2":"span 1" }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>{f.label}</label>
                    <input type={f.type} value={address[f.key]} onChange={e => setAddress(a=>({...a,[f.key]:e.target.value}))} placeholder={f.placeholder}
                      style={{ width:"100%", padding:"12px 16px", border:"2px solid #e5e7eb", borderRadius:12, fontSize:14, outline:"none", fontFamily:"Montserrat, sans-serif", boxSizing:"border-box", transition:"border-color 0.2s" }}
                      onFocus={e=>e.target.style.borderColor="#22c55e"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                  </div>
                ))}
              </div>
              {error&&<p style={{ color:"#ef4444", fontSize:13, margin:"12px 0 0" }}>{error}</p>}
              <button onClick={handleAddressNext} style={{ width:"100%", marginTop:20, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:"15px 0", fontSize:15, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 20px rgba(22,163,74,0.32)" }}>Continue to Payment →</button>
            </div>
          )}

          {/* ── PAYMENT ── */}
          {step==="payment" && (
            <div>
              {loadingMethods ? (
                <div style={{ textAlign:"center", padding:"40px 0", color:"#9ca3af" }}>Loading payment options…</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {enabledMethods.map(method => (
                    <div key={method.id||method._id} onClick={() => { setSelectedMethod(method); setError(""); }}
                      style={{ border:`2px solid ${selectedMethod?.id===method.id?"#22c55e":"#e5e7eb"}`, background:selectedMethod?.id===method.id?"#f0fdf4":"#fff", borderRadius:14, padding:"14px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, transition:"all 0.2s", boxShadow:selectedMethod?.id===method.id?"0 0 0 3px rgba(34,197,94,0.15)":"none" }}>
                      <div style={{ width:44, height:44, background:selectedMethod?.id===method.id?"#dcfce7":"#f3f4f6", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, transition:"all 0.2s" }}>{method.icon||"💳"}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:"#1a1a2e" }}>{method.label||method.name}</div>
                        {method.description&&<div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{method.description}</div>}
                      </div>
                      <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${selectedMethod?.id===method.id?"#16a34a":"#d1d5db"}`, background:selectedMethod?.id===method.id?"#16a34a":"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
                        {selectedMethod?.id===method.id&&<div style={{ width:8, height:8, borderRadius:"50%", background:"#fff" }}/>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedMethod?.id==="upi" && (
                <div style={{ marginTop:16 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>UPI ID</label>
                  <input type="text" value={upiId} onChange={e=>setUpiId(e.target.value)} placeholder="yourname@upi"
                    style={{ width:"100%", padding:"12px 16px", border:"2px solid #e5e7eb", borderRadius:12, fontSize:14, outline:"none", fontFamily:"Montserrat, sans-serif", boxSizing:"border-box" }}
                    onFocus={e=>e.target.style.borderColor="#22c55e"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                </div>
              )}

              {selectedMethod?.id==="card" && (
                <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[{key:"name",label:"Cardholder Name",placeholder:"Name on card",full:true},{key:"number",label:"Card Number",placeholder:"1234 5678 9012 3456",full:true},{key:"expiry",label:"Expiry (MM/YY)",placeholder:"12/28",full:false},{key:"cvv",label:"CVV",placeholder:"123",full:false}].map(f => (
                    <div key={f.key} style={{ gridColumn:f.full?"span 2":"span 1" }}>
                      <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>{f.label}</label>
                      <input type={f.key==="cvv"?"password":"text"} value={card[f.key]} onChange={e=>setCard(c=>({...c,[f.key]:e.target.value}))} placeholder={f.placeholder}
                        style={{ width:"100%", padding:"12px 16px", border:"2px solid #e5e7eb", borderRadius:12, fontSize:14, outline:"none", fontFamily:"Montserrat, sans-serif", boxSizing:"border-box" }}
                        onFocus={e=>e.target.style.borderColor="#22c55e"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
                    </div>
                  ))}
                </div>
              )}

              {error&&<p style={{ color:"#ef4444", fontSize:13, margin:"12px 0 0" }}>{error}</p>}
              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                <button onClick={() => { setStep("address"); setError(""); }} style={{ flex:1, background:"#f3f4f6", color:"#374151", border:"none", borderRadius:14, padding:"15px 0", fontSize:14, fontWeight:700, cursor:"pointer" }}>← Back</button>
                <button onClick={handlePaymentNext} style={{ flex:2, background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:"15px 0", fontSize:15, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 20px rgba(22,163,74,0.32)" }}>Review Order →</button>
              </div>
            </div>
          )}

          {/* ── CONFIRM ── */}
          {step==="confirm" && (
            <div>
              {/* Order summary */}
              <div style={{ background:"#f8fffe", border:"1.5px solid #dcfce7", borderRadius:16, padding:"18px 20px", marginBottom:18 }}>
                <div style={{ fontWeight:800, fontSize:14, color:"#1a1a2e", marginBottom:14 }}>Order Summary</div>
                {cartItems.map((item,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontSize:13, color:"#374151" }}>{item.emoji} {item.name} × {item.qty}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:"#16a34a" }}>₹{(item.price*item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop:"1px solid #dcfce7", paddingTop:10, marginTop:6, display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontWeight:800, color:"#1a1a2e" }}>Total</span>
                  <span style={{ fontWeight:900, color:"#16a34a", fontSize:16 }}>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Address */}
              <div style={{ background:"#f8faff", border:"1.5px solid #dbeafe", borderRadius:16, padding:"16px 20px", marginBottom:14 }}>
                <div style={{ fontWeight:800, fontSize:13, color:"#1a1a2e", marginBottom:8 }}>📍 Delivery To</div>
                <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.6 }}>
                  <strong>{address.name}</strong> · {address.phone}<br/>
                  {address.line1}, {address.city}, {address.state} – {address.pincode}
                </p>
              </div>

              {/* Payment */}
              <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:16, padding:"14px 20px", marginBottom:18 }}>
                <div style={{ fontWeight:800, fontSize:13, color:"#1a1a2e", marginBottom:6 }}>💳 Payment</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#374151" }}>
                  <span style={{ fontSize:18 }}>{selectedMethod?.icon}</span>
                  <span>{selectedMethod?.label||selectedMethod?.name}</span>
                  {selectedMethod?.id==="upi"  && upiId          && <span style={{ color:"#6b7280" }}>· {upiId}</span>}
                  {selectedMethod?.id==="card" && card.number    && <span style={{ color:"#6b7280" }}>· ···· {card.number.slice(-4)}</span>}
                </div>
              </div>

              {error&&<p style={{ color:"#ef4444", fontSize:13, margin:"0 0 12px" }}>{error}</p>}
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => { setStep("payment"); setError(""); }} style={{ flex:1, background:"#f3f4f6", color:"#374151", border:"none", borderRadius:14, padding:"15px 0", fontSize:14, fontWeight:700, cursor:"pointer" }}>← Back</button>
                <button onClick={handlePlaceOrder} disabled={loading} style={{ flex:2, background:loading?"#9ca3af":"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", border:"none", borderRadius:14, padding:"15px 0", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":"0 6px 20px rgba(22,163,74,0.32)" }}>
                  {loading?"Placing Order…":"🎉 Place Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;