import { useState, useEffect } from "react";

const NAV_LINKS = ["Features", "Pricing", "Integrations", "Blog"];

const FEATURES = [
  { icon: "🛒", title: "Unified Commerce", desc: "Sell online, in-store, and on social from one powerful dashboard with zero friction." },
  { icon: "⚡", title: "Lightning Checkout", desc: "One-tap checkout that cuts cart abandonment and boosts conversion by up to 34%." },
  { icon: "📊", title: "Live Analytics", desc: "Track revenue, traffic, and behavior in real-time with beautiful visual dashboards." },
  { icon: "🔌", title: "1,000+ Integrations", desc: "Connect Klaviyo, Stripe, QuickBooks, Meta Ads and every tool your business needs." },
  { icon: "🌍", title: "Global Payments", desc: "Accept 135+ currencies and localize your storefront for any market in minutes." },
  { icon: "🛡️", title: "Enterprise Security", desc: "PCI-DSS Level 1, SOC 2 Type II certified. 99.99% uptime SLA guaranteed." },
];

const PLANS = [
  { name: "Starter", price: 29, annualPrice: 23, desc: "For new businesses just getting started.", features: ["1 store", "Up to 1,000 orders/mo", "Basic analytics", "Email support"], highlight: false, cta: "Start free trial" },
  { name: "Growth", price: 79, annualPrice: 63, desc: "For scaling brands that need more power.", features: ["3 stores", "Unlimited orders", "Advanced analytics", "Priority support", "Abandoned cart recovery"], highlight: true, cta: "Start free trial" },
  { name: "Enterprise", price: null, annualPrice: null, desc: "For large teams with custom requirements.", features: ["Unlimited stores", "Dedicated infrastructure", "Custom integrations", "24/7 dedicated support", "SLA guarantee"], highlight: false, cta: "Contact sales" },
];

const TESTIMONIALS = [
  { quote: "We went from $200K to $2M ARR in 14 months. Sellify is the backbone of everything we do.", name: "Mia Chen", role: "Founder, LUMI Skincare", avatar: "MC", color: "#f59e0b" },
  { quote: "Checkout conversion jumped 34% in the first week after switching. That's not a typo.", name: "James Okafor", role: "Head of Growth, Tradecraft", avatar: "JO", color: "#10b981" },
  { quote: "Finally a platform that doesn't require an agency to customize. We run everything ourselves.", name: "Sara Lindqvist", role: "Co-founder, Nordic Nest", avatar: "SL", color: "#6366f1" },
];

const LOGOS = ["Stripe", "Klaviyo", "Notion", "Zapier", "Mailchimp", "Meta", "Google", "QuickBooks"];

const STATS = [
  { value: "40K+", label: "Active merchants" },
  { value: "$2.4B", label: "GMV processed" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average rating" },
];

// ── Primitives ───────────────────────────────────────────────────────────────

const Box = ({ as: Tag = "div", children, style, ...props }) => (
  <Tag style={style} {...props}>{children}</Tag>
);

const Text = ({ as: Tag = "span", children, style, ...props }) => (
  <Tag style={{ margin: 0, ...style }} {...props}>{children}</Tag>
);

const Anchor = ({ children, style = {}, href = "#", hoverStyle = {}, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{ textDecoration: "none", cursor: "pointer", ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </a>
  );
};

const Btn = ({ children, style = {}, hoverStyle = {}, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      style={{ cursor: "pointer", border: "none", outline: "none", ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

const SectionTag = ({ children, bg, color }) => (
  <Box style={{ display: "inline-block", background: bg, color, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: 20 }}>
    <Text>{children}</Text>
  </Box>
);

const SectionHeading = ({ children, style }) => (
  <Text as="h2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", marginBottom: 16, color: "#0f172a", lineHeight: 1.15,  ...style }}>
    {children}
  </Text>
);

const SubText = ({ children, style }) => (
  <Text as="p" style={{ fontSize: 17, color: "#64748b", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 56px", ...style }}>
    {children}
  </Text>
);

// ── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      as="nav"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(255,255,255,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <Box style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", gap: 32 }}>

        
        {/* Logo */}
        <Anchor href="#" style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
          <img 
            src={require("../assets/images/logo/logo1.png")} 
            alt="Logo" 
            style={{ height: 42, width: "auto", objectFit: "contain" }} 
          />
        </Anchor>

        {/* Desktop Nav Links */}
        <Box style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <Anchor key={l} href="#" style={{ fontSize: 14, color: "#475569" }} hoverStyle={{ color: "#0f172a" }}>{l}</Anchor>
          ))}
        </Box>

        {/* CTA Buttons */}
        <Box style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Anchor href="#" style={{ fontSize: 14, color: "#475569", padding: "8px 16px" }} hoverStyle={{ color: "#0f172a" }}>Log in</Anchor>
          <Anchor
            href="#"
            style={{ fontSize: 14, color: "#fff", padding: "9px 22px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", borderRadius: 10, boxShadow: "0 4px 14px rgba(99,102,241,0.35)", transition: "all .2s" }}
            hoverStyle={{ transform: "translateY(-1px)", boxShadow: "0 6px 22px rgba(99,102,241,0.45)" }}
          >
            Start free →
          </Anchor>
        </Box>

        {/* Hamburger */}
        <Btn onClick={() => setMenuOpen(!menuOpen)} style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", padding: 4 }}>
          {[0, 1, 2].map(i => (
            <Box key={i} style={{ width: 22, height: 2, background: "#0f172a", borderRadius: 2, transition: "all .3s" }} />
          ))}
        </Btn>
      </Box>

      {/* Mobile Menu */}
      {menuOpen && (
        <Box style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "16px 28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {NAV_LINKS.map(l => (
            <Anchor key={l} href="#" style={{ fontSize: 16, color: "#334155" }}>{l}</Anchor>
          ))}
          <Anchor href="#" style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 15, textAlign: "center", marginTop: 8 }}>
            Start free →
          </Anchor>
        </Box>
      )}
    </Box>
  );
};

// ── Dashboard Preview ────────────────────────────────────────────────────────

const DashboardPreview = () => (
  <Box style={{ width: "100%", maxWidth: 860, borderRadius: 22, overflow: "hidden", boxShadow: "0 36px 90px rgba(15,23,42,0.16), 0 0 0 1px rgba(0,0,0,0.05)", background: "#fff", animation: "heroFloat 6s ease-in-out infinite" }}>
    {/* Chrome bar */}
    <Box style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "13px 18px", display: "flex", alignItems: "center", gap: 12 }}>
      <Box style={{ display: "flex", gap: 7 }}>
        {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
          <Box key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
      </Box>
      <Box style={{ flex: 1, background: "#eef2f7", borderRadius: 8, padding: "5px 14px", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
        <Text>app.sellify.com/dashboard</Text>
      </Box>
    </Box>

    <Box style={{ padding: "24px 24px 0" }}>
      {/* Stat Cards */}
      <Box style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Revenue Today", val: "$12,480", chg: "+18%", up: true },
          { label: "New Orders", val: "284", chg: "+7%", up: true },
          { label: "Conversion", val: "3.8%", chg: "-0.2%", up: false },
          { label: "Visitors", val: "1,042", chg: "+31%", up: true },
        ].map(s => (
          <Box key={s.label} style={{ background: "#f8fafc", borderRadius: 13, padding: "14px 16px" }}>
            <Text as="p" style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6 }}>{s.label}</Text>
            <Text as="p" style={{ fontSize: 20, letterSpacing: "-0.5px", color: "#0f172a", marginBottom: 4 }}>{s.val}</Text>
            <Text style={{ fontSize: 12, color: s.up ? "#10b981" : "#ef4444" }}>{s.chg}</Text>
          </Box>
        ))}
      </Box>

      {/* Chart */}
      <Box style={{ background: "#f8fafc", borderRadius: 14, padding: "16px", marginBottom: 24 }}>
        <Text as="p" style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>Revenue — Last 30 days</Text>
        <svg width="100%" height="85" viewBox="0 0 800 85" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,65 C80,55 120,30 200,38 S340,15 420,22 S580,45 660,28 S740,12 800,18 L800,85 L0,85Z" fill="url(#chartGrad)" />
          <path d="M0,65 C80,55 120,30 200,38 S340,15 420,22 S580,45 660,28 S740,12 800,18" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="800" cy="18" r="5" fill="#6366f1" />
          <circle cx="800" cy="18" r="10" fill="#6366f1" fillOpacity="0.2" />
        </svg>
      </Box>
    </Box>
  </Box>
);

// ── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "130px 28px 80px", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 50%,#f0fdf4 100%)" }}>

    {/* BG Orbs */}
    {[
      { top: "8%", left: "4%", size: 520, color: "rgba(14,165,233,0.11)" },
      { bottom: "8%", right: "4%", size: 420, color: "rgba(99,102,241,0.11)" },
      { top: "42%", right: "18%", size: 260, color: "rgba(16,185,129,0.08)" },
    ].map((orb, i) => (
      <Box key={i} style={{ position: "absolute", width: orb.size, height: orb.size, borderRadius: "50%", background: `radial-gradient(circle,${orb.color} 0%,transparent 70%)`, pointerEvents: "none", top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right }} />
    ))}

    {/* Badge */}
    <Box style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "#6366f1", fontSize: 13, padding: "7px 18px", borderRadius: 100, marginBottom: 36 }}>
      <Box style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", animation: "pulse 2s infinite" }} />
      <Text>New: AI-powered product recommendations</Text>
      <Text style={{ opacity: 0.55 }}>→</Text>
    </Box>

    <Text as="h1" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(20px,3vw,80px)", lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 28, maxWidth: 800, color: "#0f172a" }}>
      The commerce platform{" "}built to grow with you.
      
    </Text>

    <Text as="p" style={{ fontSize: "clamp(16px,2vw,20px)", color: "#64748b", lineHeight: 1.78, maxWidth: 560, marginBottom: 44 }}>
      Launch your store, manage inventory, and scale revenue — all from one beautifully simple platform trusted by 40,000+ brands.
    </Text>

    <Box style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 18 }}>
      <Anchor
        href="#"
        style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "15px 34px", borderRadius: 13, fontSize: 16, boxShadow: "0 8px 28px rgba(99,102,241,0.35)", transition: "all .25s" }}
        hoverStyle={{ transform: "translateY(-2px)", boxShadow: "0 12px 36px rgba(99,102,241,0.45)" }}
      >
        Start your free trial
      </Anchor>
      <Anchor
        href="#"
        style={{ display: "flex", alignItems: "center", gap: 10, color: "#0f172a", padding: "15px 28px", borderRadius: 13, fontSize: 16,  border: "1.5px solid #e2e8f0", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all .2s" }}
        hoverStyle={{ borderColor: "#6366f1" }}
      >
        <Box style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>▶</Box>
        Watch demo
      </Anchor>
    </Box>

    <Text as="p" style={{ fontSize: 13, color: "#94a3b8", marginBottom: 72 }}>Free 14-day trial · No credit card required · Cancel anytime</Text>

    <DashboardPreview />
  </Box>
);

// ── Stats Bar ────────────────────────────────────────────────────────────────

const StatsBar = () => (
  <Box style={{ background: "#0f172a", padding: "64px 28px" }}>
    <Box style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
      {STATS.map((s, i) => (
        <Box key={i}>
          <Text as="p" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(32px,4vw,48px)", color: "#fff", marginBottom: 6 }}>{s.value}</Text>
          <Text as="p" style={{ fontSize: 14, color: "#64748b" }}>{s.label}</Text>
        </Box>
      ))}
    </Box>
  </Box>
);

// ── Logo Strip ───────────────────────────────────────────────────────────────

const LogoStrip = () => (
  <Box style={{ borderBottom: "1px solid #f1f5f9", padding: "36px 0", overflow: "hidden", background: "#fafafa" }}>
    <Text as="p" style={{ textAlign: "center", fontSize: 11, letterSpacing: "2px", color: "#cbd5e1", textTransform: "uppercase", marginBottom: 22 }}>Integrates with</Text>
    <Box style={{ display: "flex", width: "max-content", animation: "marquee 22s linear infinite" }}>
      {[...LOGOS, ...LOGOS].map((l, i) => (
        <Text key={i} style={{ fontSize: 15, color: "#cbd5e1", whiteSpace: "nowrap", margin: "0 44px", letterSpacing: "-0.3px" }}>{l}</Text>
      ))}
    </Box>
  </Box>
);

// ── Features ─────────────────────────────────────────────────────────────────

const Features = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % FEATURES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <Box style={{ maxWidth: 1100, margin: "0 auto", padding: "112px 28px", textAlign: "center" }}>
      <SectionTag bg="#eff6ff" color="#3b82f6">Features</SectionTag>
      <SectionHeading>
        Everything you need.<br />
        <Text as="em" style={{ fontStyle: "italic" }}>Nothing you don't.</Text>
      </SectionHeading>
      <SubText>Sellify strips complexity so you can focus on what matters — growing your business.</SubText>

      <Box style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {FEATURES.map((f, i) => (
          <Box
            key={i}
            onMouseEnter={() => setActive(i)}
            style={{
              border: active === i ? "2px solid #6366f1" : "2px solid #f1f5f9",
              borderRadius: 20, padding: "28px 26px", textAlign: "left", cursor: "pointer",
              background: active === i ? "linear-gradient(145deg,#fafbff,#f0f1ff)" : "#fff",
              boxShadow: active === i ? "0 8px 32px rgba(99,102,241,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
              transition: "all .3s ease",
            }}
          >
            <Text as="span" style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{f.icon}</Text>
            <Text as="h3" style={{ fontSize: 17, color: "#0f172a", marginBottom: 10 }}>{f.title}</Text>
            <Text as="p" style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75 }}>{f.desc}</Text>
            {active === i && <Text as="p" style={{ marginTop: 16, fontSize: 13, color: "#6366f1" }}>Learn more →</Text>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// ── Pricing ──────────────────────────────────────────────────────────────────

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  const [hovered, setHovered] = useState(null);

  return (
    <Box style={{ background: "linear-gradient(180deg,#f8faff 0%,#fff 100%)", padding: "112px 28px", textAlign: "center" }}>
      <SectionTag bg="#f0fdf4" color="#16a34a">Pricing</SectionTag>
      <SectionHeading>Simple, transparent pricing.</SectionHeading>
      <SubText>No hidden fees. Upgrade or downgrade anytime.</SubText>

      {/* Toggle */}
      <Box style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 56 }}>
        <Text style={{ fontSize: 14, color: annual ? "#94a3b8" : "#0f172a", transition: "color .2s" }}>Monthly</Text>
        <Btn
          onClick={() => setAnnual(!annual)}
          style={{ width: 52, height: 28, borderRadius: 99, background: annual ? "#6366f1" : "#e2e8f0", position: "relative", transition: "background .25s", padding: 0 }}
        >
          <Box style={{ position: "absolute", top: 4, left: annual ? 28 : 4, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
        </Btn>
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 14, color: annual ? "#0f172a" : "#94a3b8", transition: "color .2s" }}>Annual</Text>
          {annual && (
            <Box style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, padding: "2px 10px", borderRadius: 99 }}>
              <Text>Save 20%</Text>
            </Box>
          )}
        </Box>
      </Box>

      <Box style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 980, margin: "0 auto" }}>
        {PLANS.map((p, i) => (
          <Box
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 22, padding: "36px 32px", position: "relative", textAlign: "left",
              background: p.highlight ? "linear-gradient(145deg,#4f46e5,#6366f1 60%,#818cf8)" : "#fff",
              border: p.highlight ? "none" : hovered === i ? "2px solid #6366f1" : "2px solid #f1f5f9",
              boxShadow: p.highlight ? "0 24px 60px rgba(99,102,241,0.35)" : hovered === i ? "0 12px 40px rgba(0,0,0,0.10)" : "0 4px 16px rgba(0,0,0,0.05)",
              transition: "all .3s ease",
            }}
          >
            {p.highlight && (
              <Box style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#10b981", color: "#fff", fontSize: 12, padding: "4px 18px", borderRadius: 99, whiteSpace: "nowrap" }}>
                <Text>✦ Most Popular</Text>
              </Box>
            )}
            <Text as="h3" style={{ fontSize: 18,  color: p.highlight ? "#fff" : "#0f172a", marginBottom: 14 }}>{p.name}</Text>
            <Box style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <Text style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 52, color: p.highlight ? "#fff" : "#0f172a", lineHeight: 1 }}>
                {p.price ? `$${annual ? p.annualPrice : p.price}` : "Custom"}
              </Text>
              {p.price && <Text style={{ fontSize: 15,  color: p.highlight ? "rgba(255,255,255,0.6)" : "#94a3b8" }}>/mo</Text>}
            </Box>
            <Text as="p" style={{ fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.7)" : "#64748b", marginBottom: 28, lineHeight: 1.65 }}>{p.desc}</Text>
            <Box as="ul" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {p.features.map(f => (
                <Box as="li" key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.9)" : "#334155" }}>
                  <Box style={{ width: 20, height: 20, borderRadius: "50%", background: p.highlight ? "rgba(255,255,255,0.15)" : "#f0fdf4", color: p.highlight ? "#a5f3fc" : "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✓</Box>
                  <Text>{f}</Text>
                </Box>
              ))}
            </Box>
            <Anchor
              href="#"
              style={{ display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 12, fontSize: 15, background: p.highlight ? "#fff" : "linear-gradient(135deg,#0ea5e9,#6366f1)", color: p.highlight ? "#6366f1" : "#fff", boxShadow: p.highlight ? "none" : "0 4px 14px rgba(99,102,241,0.28)", transition: "all .2s" }}
              hoverStyle={{ opacity: 0.88, transform: "translateY(-1px)" }}
            >
              {p.cta}
            </Anchor>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// ── Testimonials ─────────────────────────────────────────────────────────────

const TestiCard = ({ t }) => {
  const [hov, setHov] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#f8fafc", borderRadius: 20, padding: "32px 28px", textAlign: "left",
        border: "1px solid #f1f5f9", transition: "all .25s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <Text as="p" style={{ fontSize: 40, color: t.color, fontFamily: "'Montserrat', sans-serif", lineHeight: 1, marginBottom: 12 }}>"</Text>
      <Text as="p" style={{ fontSize: 15, color: "#334155", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>{t.quote}</Text>
      <Box style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <Box style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
          <Text>{t.avatar}</Text>
        </Box>
        <Box>
          <Text as="p" style={{ fontSize: 14,  color: "#0f172a" }}>{t.name}</Text>
          <Text as="p" style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{t.role}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const Testimonials = () => (
  <Box style={{ maxWidth: 1100, margin: "0 auto", padding: "112px 28px", textAlign: "center" }}>
    <SectionTag bg="#fff7ed" color="#ea580c">Testimonials</SectionTag>
    <SectionHeading>Loved by 40,000+ merchants.</SectionHeading>
    <Box style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 16 }}>
      {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} />)}
    </Box>
  </Box>
);

// ── CTA Banner ───────────────────────────────────────────────────────────────

const CTABanner = () => (
  <Box style={{ margin: "0 28px 80px", borderRadius: 28, background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)", padding: "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
    <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: "radial-gradient(ellipse,rgba(99,102,241,0.22) 0%,transparent 65%)", pointerEvents: "none" }} />
    <Box style={{ position: "absolute", top: "20%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
    <Text as="h2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(30px,5vw,60px)", color: "#fff", marginBottom: 20, position: "relative" }}>
      Ready to start selling?
    </Text>
    <Text as="p" style={{ fontSize: 18, color: "#94a3b8", maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.75, position: "relative" }}>
      Join 40,000+ businesses on Sellify. Set up your store in under 10 minutes.
    </Text>
    <Anchor
      href="#"
      style={{ display: "inline-block", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff", padding: "17px 42px", borderRadius: 14, fontSize: 17,  boxShadow: "0 10px 36px rgba(99,102,241,0.45)", transition: "all .25s", position: "relative" }}
      hoverStyle={{ transform: "translateY(-2px)", boxShadow: "0 14px 44px rgba(99,102,241,0.55)" }}
    >
      Start your free trial →
    </Anchor>
    <Text as="p" style={{ fontSize: 13, color: "#475569", marginTop: 20, position: "relative" }}>No credit card · No commitment · Cancel anytime</Text>
  </Box>
);

// ── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <Box as="footer" style={{ background: "#0f172a", padding: "64px 28px 36px" }}>
    <Box style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Box style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <Box style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center",  color: "#fff", fontSize: 17 }}>S</Box>
            <Text style={{ fontSize: 21,  color: "#fff" }}>Sellify</Text>
          </Box>
          <Text as="p" style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, maxWidth: 220 }}>The commerce platform built to grow with you.</Text>
          <Box style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {["𝕏", "in", "▶"].map((ic, i) => (
              <Anchor
                key={i}
                href="#"
                style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,  transition: "background .2s" }}
                hoverStyle={{ background: "rgba(255,255,255,0.13)", color: "#94a3b8" }}
              >
                {ic}
              </Anchor>
            ))}
          </Box>
        </Box>

        {[
          { heading: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
          { heading: "Company", links: ["About", "Blog", "Careers", "Press", "Legal"] },
          { heading: "Support", links: ["Help Center", "Status", "Contact", "Community", "API Docs"] },
        ].map(col => (
          <Box key={col.heading}>
            <Text as="h4" style={{ fontSize: 13, color: "#e2e8f0", marginBottom: 18 }}>{col.heading}</Text>
            {col.links.map(l => (
              <Anchor key={l} href="#" style={{ display: "block", fontSize: 14, color: "#475569", marginBottom: 12, transition: "color .2s" }} hoverStyle={{ color: "#94a3b8" }}>{l}</Anchor>
            ))}
          </Box>
        ))}
      </Box>

      <Box style={{ paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Text style={{ fontSize: 13, color: "#334155" }}>© 2026 Sellify Inc. All rights reserved.</Text>
        <Box style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Cookies"].map(l => (
            <Anchor key={l} href="#" style={{ fontSize: 13, color: "#334155", transition: "color .2s" }} hoverStyle={{ color: "#64748b" }}>{l}</Anchor>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

// ── Root ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Box style={{ fontFamily: "'Montserrat', sans-serif", background: "#fff", color: "#0f172a", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; }
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }
      `}</style>
      <Navbar />
      <Hero />
      <StatsBar />
      <LogoStrip />
      <Features />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Footer />
    </Box>
  );
}