"use client";
import { useState, useEffect, useRef } from "react";

const Star = ({ size = 16, color = "#DCD7CD" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
  </svg>
);

const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const t = { up:"translateY(50px)", down:"translateY(-50px)", left:"translateX(50px)", right:"translateX(-50px)", none:"none" };
  return <div ref={ref} style={{ opacity: v?1:0, transform: v?"none":t[direction], transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s` }}>{children}</div>;
};

const Img = ({ src, alt, style, aspect }) => {
  const [hover, setHover] = useState(false);
  return <div style={{ overflow: "hidden", ...style }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
    <img src={src} alt={alt} style={{ width: "100%", display: "block", aspectRatio: aspect, objectFit: "cover", filter: hover ? "brightness(1.05)" : "brightness(0.88)", transform: hover ? "scale(1.04)" : "none", transition: "all 0.7s ease" }} />
  </div>;
};

export default function OwldWebsite() {
  const [nav, setNav] = useState("hero");
  const [sy, setSy] = useState(0);
  const [ld, setLd] = useState(false);

  useEffect(() => {
    setTimeout(() => setLd(true), 300);
    const h = () => {
      setSy(window.scrollY || 0);
      for (const id of ["contact","shop","portfolio","about","philosophy","hero"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setNav(id); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const hoverCard = {
    onMouseEnter: e => { e.currentTarget.style.borderColor = "rgba(139,115,85,0.2)"; e.currentTarget.style.transform = "translateY(-5px)"; },
    onMouseLeave: e => { e.currentTarget.style.borderColor = "rgba(220,215,205,0.04)"; e.currentTarget.style.transform = "none"; }
  };

  return (
    <div style={{ background: "#080808", color: "#DCD7CD", fontFamily: "'Times New Roman', Times, serif", overflowX: "hidden" }}>

      {/* TOONO — Fixed background, always visible, rotating on scroll */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: `translate(-50%, -50%) rotate(${sy * 0.015}deg)`,
        width: "65vh", height: "65vh",
        backgroundImage: "url('/images/toono.png')", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        opacity: 0.1, filter: "invert(0.9) brightness(1.2)",
        pointerEvents: "none", zIndex: 0,
        transition: "opacity 2s ease"
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: sy > 80 ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: sy > 80 ? "blur(24px)" : "none",
        borderBottom: sy > 80 ? "1px solid rgba(220,215,205,0.03)" : "none",
        transition: "all 0.6s", padding: "0 40px", height: 54,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div onClick={() => go("hero")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Star size={12} /><span style={{ fontSize: 16, letterSpacing: 8, fontWeight: 300 }}>owl'd</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[["philosophy","Философи"],["about","Тухай"],["portfolio","Бүтээл"],["shop","Дэлгүүр"],["contact","Холбоо"]].map(([id,l]) => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: nav === id ? "#DCD7CD" : "rgba(220,215,205,0.18)",
              fontFamily: "inherit", fontSize: 11, letterSpacing: 2, padding: "6px 11px",
              borderBottom: nav === id ? "1px solid rgba(139,115,85,0.4)" : "1px solid transparent",
              transition: "all 0.3s"
            }}>{l}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/owl-key-visual.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: ld ? 0.15 : 0, transition: "opacity 2.5s ease", transform: `translateY(${sy * 0.1}px)`, mixBlendMode: "lighten" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.15), rgba(8,8,8,0.5) 45%, rgba(8,8,8,1) 96%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: ld?1:0, transform: ld?"none":"scale(0.8)", transition: "all 1.5s ease 0.3s" }}><Star size={24} /></div>
          <h1 style={{ fontSize: 92, fontWeight: 300, letterSpacing: 36, margin: "18px 0 10px", opacity: ld?1:0, transform: ld?"none":"translateY(40px)", transition: "all 1.6s ease 0.6s" }}>owl'd</h1>
          <p style={{ fontSize: 17, letterSpacing: 4, color: "rgba(220,215,205,0.45)", fontStyle: "italic", opacity: ld?1:0, transform: ld?"none":"translateY(25px)", transition: "all 1.5s ease 1s" }}>By your side in the dark, for the dawn…</p>
          <div style={{ width: 1, height: 70, background: "linear-gradient(to bottom, rgba(139,115,85,0.5), transparent)", margin: "34px auto 0", opacity: ld?1:0, transition: "opacity 2s ease 1.4s" }} />
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", fontSize: 8, letterSpacing: 5, color: "rgba(220,215,205,0.1)", animation: "pulse 2.5s ease infinite" }}>ДООШ</div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" style={{ padding: "160px 40px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ fontSize: 9, letterSpacing: 7, color: "rgba(220,215,205,0.14)", textTransform: "uppercase", marginBottom: 50 }}>Философи</div></FadeIn>
        <FadeIn delay={0.1}><h2 style={{ fontSize: 42, fontWeight: 300, letterSpacing: 5, marginBottom: 24, lineHeight: 1.4 }}>Мартагдаж буй өв соёлоо сэргээх</h2></FadeIn>
        <FadeIn delay={0.2}><p style={{ fontSize: 16, lineHeight: 2.2, color: "rgba(220,215,205,0.38)", fontWeight: 300, maxWidth: 720, marginBottom: 80 }}>Дэлхий хурдацтай өөрчлөгдөж байх зуур мянган жилийн турш уламжлагдаж ирсэн нүүдэлчдийн сүнслэг өв чимээгүйхэн алга болж байна. owl'd энэ чимээгүй байдлыг эсэргүүцдэг.</p></FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
          {[
            { t:"Сэргээх", s:"Awaken", d:"Тэнгэр шүтлэг, бөө мөргөл, тотемизм — мянган жилийн сүнслэг уламжлалыг орчин үеийн загварын хэлээр дахин дуудаж байна." },
            { t:"Хадгалах", s:"Preserve", d:"Нүүдэлчдийн дэлхий үзэл, зан үйл, бэлгэдлийн тогтолцоог бүртгэж шинэ хэлбэрээр хадгалах. Мартагдахаас өмнө санах." },
            { t:"Дамжуулах", s:"Transmit", d:"Хувцас гэдэг бүх нийтийн хэлээр нүүдэлчдийн мэргэн ухаан, гоо үзэсгэлэнг дэлхийд дамжуулна." }
          ].map((p,i) => (
            <FadeIn key={i} delay={0.12*i}><div style={{ padding: "44px 24px", border: "1px solid rgba(220,215,205,0.04)", transition: "all 0.5s", cursor: "default" }} {...hoverCard}>
              <h3 style={{ fontSize: 26, fontWeight: 300, letterSpacing: 4, marginBottom: 6 }}>{p.t}</h3>
              <div style={{ fontSize: 8, letterSpacing: 5, color: "rgba(139,115,85,0.4)", textTransform: "uppercase", marginBottom: 24 }}>{p.s}</div>
              <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(220,215,205,0.28)", fontWeight: 300 }}>{p.d}</p>
            </div></FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 40px 140px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid rgba(220,215,205,0.03)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 60, alignItems: "center" }}>
          <FadeIn direction="right"><div>
            <div style={{ fontSize: 9, letterSpacing: 7, color: "rgba(220,215,205,0.14)", textTransform: "uppercase", marginBottom: 40 }}>Бидний тухай</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, letterSpacing: 4, marginBottom: 28, lineHeight: 1.5 }}>Бага насандаа эх орноо орхин,<br/>өөр нутагт өссөн</h2>
            <p style={{ fontSize: 15, lineHeight: 2.3, color: "rgba(220,215,205,0.38)", fontWeight: 300, marginBottom: 20 }}>Бага насандаа эцэг эхийгээ дагаж Солонгост ирсэн. Солонгосын боловсрол, нийгэмд өсөж торнихын хэрээр миний Монгол үндэс, уламжлал, соёл аажмаар холдож байгааг мэдэрсэн. Гэвч тэр зай надад нэг зүйлийг ойлгуулсан — миний үндэс угсаа, миний уламжлал, миний соёлыг хамгаалж хадгалах ёстой гэсэн зорилгыг.</p>
            <p style={{ fontSize: 15, lineHeight: 2.3, color: "rgba(220,215,205,0.38)", fontWeight: 300, marginBottom: 20 }}>Хоёр соёлын завсарт өсөх нь хэцүү байсан ч, энэ нь надад Монголын өвийг өөр өнцгөөс харж, түүний үнэ цэнийг гүнзгий ойлгох боломж өгсөн. Миний цус, миний өвөг дээдсийн сүнс, тал нутгийн салхи — эдгээр бүгд миний дотор амьд байна.</p>
            <p style={{ fontSize: 15, lineHeight: 2.3, color: "rgba(220,215,205,0.45)", fontWeight: 400 }}>Бид Монголын ялгаа тодорхойлолтыг сэргээж, өвөг дээдсийн уламжлалт соёлыг залгамжлан хадгалж, дэлхийд дамжуулна. Энэ бол owl'd-ийн амлалт.</p>
          </div></FadeIn>
          <FadeIn delay={0.3} direction="left"><div style={{ border: "1px solid rgba(220,215,205,0.04)", padding: "40px 28px" }}>
            <div style={{ fontSize: 8, letterSpacing: 5, color: "rgba(139,115,85,0.4)", textTransform: "uppercase", marginBottom: 20 }}>Дизайнер</div>
            <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: 4, marginBottom: 14 }}>Галт Билгүүн</div>
            <div style={{ fontSize: 13, color: "rgba(220,215,205,0.22)", lineHeight: 2.2 }}>Улаанбаатар хот<br/>Сөүл хот<br/>Ханян Их Сургууль<br/>Чорос овог — Ууль тотем</div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(220,215,205,0.03)", fontSize: 12, color: "rgba(220,215,205,0.15)", lineHeight: 1.8 }}>
              <div>@eww.gvn</div><div>galtbilguun0@gmail.com</div>
            </div>
          </div></FadeIn>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ borderTop: "1px solid rgba(220,215,205,0.03)" }}>
        <div style={{ padding: "140px 40px 60px", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><div style={{ fontSize: 9, letterSpacing: 7, color: "rgba(220,215,205,0.14)", textTransform: "uppercase", marginBottom: 16 }}>Бүтээлүүд</div></FadeIn>
        </div>

        {/* SPIRIT OF NOMAD */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn><div style={{ marginBottom: 50 }}>
            <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 8 }}>Collection 01 — 2025</div>
            <h3 style={{ fontSize: 36, fontWeight: 300, letterSpacing: 5 }}>Spirit of Nomad</h3>
          </div></FadeIn>

          {/* Hero poster — contained, not full bleed */}
          <FadeIn><div style={{ position: "relative", overflow: "hidden", marginBottom: 50 }}>
            <img src="/images/spirit-poster.jpg" alt="Spirit of Nomad" style={{ width: "100%", display: "block", filter: "brightness(0.82)", maxHeight: "55vh", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.9))" }} />
          </div></FadeIn>

          {/* Lookbook — refined grid with breathing room */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <FadeIn><Img src="/images/spirit-look1.jpg" alt="Look 1" aspect="3/4" style={{ maxHeight: 520 }} /></FadeIn>
            <FadeIn delay={0.15}><Img src="/images/spirit-look2.jpg" alt="Look 2" aspect="3/4" style={{ maxHeight: 520 }} /></FadeIn>
          </div>

          {/* Closeup + text — balanced */}
          <div style={{ display: "grid", gridTemplateColumns: "0.55fr 0.45fr", gap: 30, marginBottom: 50, alignItems: "center" }}>
            <FadeIn><Img src="/images/spirit-closeup.jpg" alt="Detail" aspect="4/5" style={{ maxHeight: 440 }} /></FadeIn>
            <FadeIn delay={0.2}><div style={{ padding: "20px 0" }}>
              <p style={{ fontSize: 14, lineHeight: 2.2, color: "rgba(220,215,205,0.32)", fontWeight: 300, marginBottom: 24 }}>Монгол уламжлалт хувцасны бүтэц, дүрс дүрслэлийг орчин үеийн нүдээр дахин тайлбарласан. Нүүдэлчний ул мөрийг мөрдөж, хувцас бүтээсэн.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Darkwear","Leather","Wool","2 Looks"].map(t => <span key={t} style={{ fontSize: 8, letterSpacing: 3, padding: "4px 12px", border: "1px solid rgba(220,215,205,0.06)", color: "rgba(220,215,205,0.18)" }}>{t}</span>)}
              </div>
            </div></FadeIn>
          </div>

          {/* Sitting look — single centered image */}
          <FadeIn><div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
            <Img src="/images/spirit-look3.jpg" alt="Look 3" aspect="3/4" />
          </div></FadeIn>

          {/* Second poster — contained */}
          <FadeIn><div style={{ overflow: "hidden", maxHeight: "50vh" }}>
            <img src="/images/spirit-poster2.jpg" alt="Spirit of Nomad" style={{ width: "100%", display: "block", filter: "brightness(0.85)", objectFit: "cover", maxHeight: "50vh" }} />
          </div></FadeIn>
        </div>

        {/* LIMINAL STEPPE */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px 0" }}>
          <FadeIn><div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.45)", textTransform: "uppercase", marginBottom: 8 }}>Collection 02 — 2024</div>
            <h3 style={{ fontSize: 36, fontWeight: 300, letterSpacing: 5, marginBottom: 4 }}>Liminal Steppe</h3>
            <div style={{ fontSize: 15, fontStyle: "italic", color: "rgba(220,215,205,0.2)" }}>Between Night & Dawn</div>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FadeIn><Img src="/images/liminal-look1.jpg" alt="Night" aspect="3/4" style={{ maxHeight: 500 }} /></FadeIn>
            <FadeIn delay={0.15}><Img src="/images/liminal-look2.jpg" alt="Dawn" aspect="3/4" style={{ maxHeight: 500 }} /></FadeIn>
          </div>
          <FadeIn delay={0.2}><p style={{ fontSize: 13, lineHeight: 2, color: "rgba(220,215,205,0.22)", fontWeight: 300, maxWidth: 550, marginTop: 24 }}>Шөнө ба үүрийн хоёр гэрлийн хооронд. Торго, даавуу, угаасан жинс — шөнөөс үүр рүү шилжих тэнгэрийн өнгө.</p></FadeIn>
        </div>

        {/* OWL CLUB poster — contained */}
        <FadeIn><div style={{ maxWidth: 700, margin: "80px auto 0" }}>
          <img src="/images/brand-poster.png" alt="OWL CLUB" style={{ width: "100%", display: "block" }} />
        </div></FadeIn>
      </section>

      {/* SHOP */}
      <section id="shop" style={{ padding: "150px 40px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <Star size={28} color="rgba(220,215,205,0.07)" />
          <h2 style={{ fontSize: 42, fontWeight: 300, letterSpacing: 6, marginTop: 20, marginBottom: 14 }}>Тун удахгүй</h2>
          <p style={{ fontSize: 14, color: "rgba(220,215,205,0.22)", fontWeight: 300, maxWidth: 480, margin: "0 auto 50px" }}>Haute couture, бэлэн хувцас, мөн Монгол бичгийн мөнгөн гоёл чимэглэл удахгүй нээлтээ хийнэ.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[["Haute Couture","SS 2026 · 3 Төрх","4-р сар"],["Бэлэн хувцас","Футболк · Урт ханцуй","5-р сар"],["Мөнгөн гоёл","Монгол бичгийн цуглуулга","5-р сар"]].map(([l,s,t],i) => (
            <FadeIn key={i} delay={0.1*i}><div style={{ border: "1px solid rgba(220,215,205,0.04)", padding: "40px 20px", transition: "all 0.4s" }} {...hoverCard}>
              <h3 style={{ fontSize: 17, fontWeight: 300, letterSpacing: 3, marginBottom: 8 }}>{l}</h3>
              <p style={{ fontSize: 11, color: "rgba(220,215,205,0.18)", marginBottom: 16 }}>{s}</p>
              <span style={{ fontSize: 9, letterSpacing: 4, padding: "5px 16px", border: "1px solid rgba(220,215,205,0.07)", color: "rgba(220,215,205,0.18)" }}>{t}</span>
            </div></FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}><div style={{ marginTop: 50, display: "flex", gap: 8, justifyContent: "center", maxWidth: 380, margin: "50px auto 0" }}>
          <input type="email" placeholder="имэйл" style={{ flex: 1, background: "rgba(220,215,205,0.012)", border: "1px solid rgba(220,215,205,0.05)", padding: "11px 14px", color: "#DCD7CD", fontFamily: "inherit", fontSize: 13, outline: "none", transition: "border-color 0.3s" }}
            onFocus={e=>e.target.style.borderColor="rgba(139,115,85,0.3)"} onBlur={e=>e.target.style.borderColor="rgba(220,215,205,0.05)"} />
          <button style={{ background: "none", border: "1px solid rgba(220,215,205,0.1)", color: "rgba(220,215,205,0.35)", padding: "11px 20px", fontSize: 10, letterSpacing: 2, fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s" }}>Мэдэгдэх</button>
        </div></FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px 80px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid rgba(220,215,205,0.03)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <FadeIn direction="right"><div>
            <div style={{ fontSize: 9, letterSpacing: 7, color: "rgba(220,215,205,0.14)", textTransform: "uppercase", marginBottom: 28 }}>Холбоо барих</div>
            <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 24 }}>Бидэнтэй холбогдох</h2>
            <div style={{ fontSize: 14, color: "rgba(220,215,205,0.28)", lineHeight: 2.4 }}>galtbilguun0@gmail.com<br/>+82 010-8213-3725<br/><span style={{ marginTop: 8, display: "inline-block" }}>Instagram — @eww.gvn</span></div>
          </div></FadeIn>
          <FadeIn direction="left" delay={0.15}><div>
            <div style={{ fontSize: 9, letterSpacing: 7, color: "rgba(220,215,205,0.14)", textTransform: "uppercase", marginBottom: 28 }}>Байршил</div>
            <div style={{ fontSize: 14, color: "rgba(220,215,205,0.28)", lineHeight: 2.2 }}>Сөүл, Солонгос<br/>Улаанбаатар, Монгол</div>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(220,215,205,0.18)", fontStyle: "italic", lineHeight: 1.8 }}>Хамтын ажиллагаа, худалдан авагч,<br/>хэвлэлийн хүсэлтийг имэйлээр илгээнэ үү.</p>
          </div></FadeIn>
        </div>
      </section>

      <footer style={{ padding: "44px 40px", textAlign: "center", borderTop: "1px solid rgba(220,215,205,0.02)" }}>
        <Star size={10} />
        <div style={{ fontSize: 15, letterSpacing: 8, fontWeight: 300, marginTop: 12, marginBottom: 5 }}>owl'd</div>
        <div style={{ fontSize: 11, color: "rgba(220,215,205,0.16)", fontStyle: "italic", marginBottom: 8 }}>By your side in the dark, for the dawn…</div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(220,215,205,0.07)" }}>© 2026 OWL'D · УЛААНБААТАР</div>
      </footer>

      <style>{`
        @keyframes pulse{0%,100%{opacity:.08}50%{opacity:.2}}
        input::placeholder{color:rgba(220,215,205,0.1)}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#080808}::-webkit-scrollbar-thumb{background:rgba(220,215,205,0.08);border-radius:3px}
        @media(max-width:768px){nav>div:last-child{display:none}section{padding-left:16px!important;padding-right:16px!important}h1{font-size:50px!important;letter-spacing:14px!important}h2{font-size:26px!important}}
      `}</style>
    </div>
  );
}
