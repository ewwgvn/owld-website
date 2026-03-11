"use client";
import { useState, useEffect, useRef } from "react";

const Star = ({ size = 16, color = "#DCD7CD" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
  </svg>
);

// Scroll-triggered fade-in component
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const transforms = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none"
  };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    }}>{children}</div>
  );
};

const OwldWebsite = () => {
  const [activeNav, setActiveNav] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 200);
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
      const sects = ["hero", "philosophy", "about", "portfolio", "shop", "contact"];
      for (let i = sects.length - 1; i >= 0; i--) {
        const el = document.getElementById(sects[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveNav(sects[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navItems = [
    { id: "philosophy", label: "Философи" },
    { id: "about", label: "Бидний тухай" },
    { id: "portfolio", label: "Бүтээлүүд" },
    { id: "shop", label: "Дэлгүүр" },
    { id: "contact", label: "Холбоо барих" },
  ];

  return (
    <div style={{ background: "#0B0B0A", color: "#DCD7CD", fontFamily: "'Times New Roman', Times, serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 60 ? "rgba(11,11,10,0.97)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(24px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(220,215,205,0.04)" : "none",
        transition: "all 0.6s ease",
        padding: "0 40px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Star size={13} />
          <span style={{ fontSize: 17, letterSpacing: 8, fontWeight: 300 }}>owl'd</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeNav === n.id ? "#DCD7CD" : "rgba(220,215,205,0.2)",
              fontFamily: "'Times New Roman', serif", fontSize: 11, letterSpacing: 2,
              padding: "6px 12px", transition: "color 0.3s",
              borderBottom: activeNav === n.id ? "1px solid rgba(139,115,85,0.4)" : "1px solid transparent"
            }}>{n.label}</button>
          ))}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" style={{
        height: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {/* Background owl image with parallax */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/owl-key-visual.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: heroLoaded ? 0.2 : 0,
          transform: `scale(1.1) translateY(${scrollY * 0.15}px)`,
          transition: "opacity 2s ease",
          filter: "grayscale(20%)"
        }} />
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,11,10,0.3) 0%, rgba(11,11,10,0.7) 50%, rgba(11,11,10,1) 100%)" }} />
        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04, mixBlendMode: "overlay",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat", backgroundSize: "180px"
        }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "none" : "translateY(10px)", transition: "all 1.2s ease 0.2s" }}>
            <Star size={22} />
          </div>
          <h1 style={{
            fontSize: 84, fontWeight: 300, letterSpacing: 30, margin: "20px 0 12px",
            opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "none" : "translateY(30px)",
            transition: "all 1.4s ease 0.5s"
          }}>owl'd</h1>
          <p style={{
            fontSize: 16, letterSpacing: 3, color: "rgba(220,215,205,0.5)",
            fontStyle: "italic",
            opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "none" : "translateY(20px)",
            transition: "all 1.4s ease 0.9s"
          }}>By your side in the dark, for the dawn…</p>
          <div style={{
            width: 1, height: 60,
            background: "linear-gradient(to bottom, rgba(139,115,85,0.5), transparent)",
            margin: "30px auto 0",
            opacity: heroLoaded ? 1 : 0, transition: "opacity 1.5s ease 1.3s"
          }} />
        </div>

        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          fontSize: 9, letterSpacing: 5, color: "rgba(220,215,205,0.12)",
          textTransform: "uppercase", animation: "pulse 2.5s ease infinite"
        }}>Доош гүйлгэх</div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section id="philosophy" style={{ padding: "150px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Философи</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 38, fontWeight: 300, letterSpacing: 5, marginBottom: 20, lineHeight: 1.5 }}>
            Мартагдаж буй өв соёлоо сэргээх
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 16, lineHeight: 2.1, color: "rgba(220,215,205,0.45)", fontWeight: 300, maxWidth: 720, marginBottom: 80 }}>
            Дэлхий хурдацтай өөрчлөгдөж байх зуур мянган жилийн турш уламжлагдаж ирсэн нүүдэлчдийн сүнслэг өв чимээгүйхэн алга болж байна. owl'd энэ чимээгүй байдлыг эсэргүүцдэг. Хувцас хийх биш — дурсамжийг сэргээх, ялгаа тодорхойлох, унтаж буй соёлыг сэрээх — энэ бол бидний оршин тогтнох шалтгаан.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {[
            { title: "Сэргээх", sub: "Awaken", desc: "Тэнгэр шүтлэг, бөө мөргөл, тотемизм — Монголын нүүдэлчид мянган жилийн турш хамгаалж ирсэн сүнслэг уламжлалыг орчин үеийн загварын хэлээр дахин дуудаж байна. Унтаж буй сүнс хувцсаар дамжин сэрдэг." },
            { title: "Хадгалах", sub: "Preserve", desc: "Мянган жилийн турш уламжлагдаж ирсэн нүүдэлчдийн дэлхий үзэл, зан үйл, бэлгэдлийн тогтолцоог бүртгэж, шинэ хэлбэрээр хадгалах. Мартагдахаас өмнө санах нь хадгалалтын эхлэл юм." },
            { title: "Дамжуулах", sub: "Transmit", desc: "Монголын соёлын өв зөвхөн Монголынх биш. Хувцас гэдэг бүх нийтийн хэлээр нүүдэлчдийн мэргэн ухаан, гоо үзэсгэлэнг дэлхийд дамжуулна. Өмсөгч нь дамжуулагч болдог." }
          ].map((p, i) => (
            <FadeIn key={i} delay={0.15 * i} direction="up">
              <div style={{
                padding: "44px 28px", border: "1px solid rgba(220,215,205,0.05)",
                background: "rgba(220,215,205,0.008)",
                transition: "border-color 0.5s, transform 0.3s",
                cursor: "default", minHeight: 280
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,115,85,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(220,215,205,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <h3 style={{ fontSize: 26, fontWeight: 300, letterSpacing: 4, marginBottom: 6 }}>{p.title}</h3>
                <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 24 }}>{p.sub}</div>
                <p style={{ fontSize: 13, lineHeight: 1.95, color: "rgba(220,215,205,0.35)", fontWeight: 300 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Spiritual roots */}
        <div style={{ marginTop: 80, borderTop: "1px solid rgba(220,215,205,0.04)", paddingTop: 60 }}>
          <FadeIn><div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(220,215,205,0.15)", textTransform: "uppercase", marginBottom: 36 }}>Сүнслэг үндэс</div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
            {[
              { title: "Тэнгэр шүтлэг", sub: "Tengrism", desc: "Мөнх хөх Тэнгэр. Тэнгэр ба газар, хүн ба байгалийг босоо чиглэлд холбодог итгэл. Бүх амьд зүйл тэнгэрийн доор холбогдсон байдаг." },
              { title: "Бөө мөргөл", sub: "Shamanism", desc: "Бөө бол үл үзэгдэх ертөнц ба бодит байдлыг холбодог зуучлагч. Транс төлөвт өвөг дээдсийн сүнстэй харилцаж, байгалийн хүчийг дуудаж эдгэрэлт ба хамгаалалтыг гүйцэтгэдэг. Тэнгэр ба газар, уул ба гол, амьтан ба хүн — бүх зүйлд сүнс оршдог гэсэн итгэл нь бөө мөргөлийн үндэс юм." },
              { title: "Тотемизм", sub: "Totemism", desc: "Чорос овгийн тотем — Ууль. Шөнийн хамгаалагч, мэргэн ухааны бэлгэдэл, харанхуй дотроос хардаг нэгэн. owl'd-ийн нэр ба сүнс эндээс эхэлдэг." }
            ].map((s, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div>
                  <h4 style={{ fontSize: 20, fontWeight: 300, letterSpacing: 3, marginBottom: 4 }}>{s.title}</h4>
                  <div style={{ fontSize: 9, letterSpacing: 4, color: "rgba(139,115,85,0.45)", textTransform: "uppercase", marginBottom: 16 }}>{s.sub}</div>
                  <p style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(220,215,205,0.3)", fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}><div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} /></div>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "150px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Бидний тухай</div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60 }}>
          <FadeIn delay={0.1} direction="right">
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: 4, marginBottom: 28, lineHeight: 1.5 }}>Би Монголд төрж,<br />Солонгост өссөн</h2>
              <p style={{ fontSize: 15, lineHeight: 2.2, color: "rgba(220,215,205,0.45)", fontWeight: 300, marginBottom: 20 }}>Уламжлал ба орчин үе, нүүдэл ба хот, түүх ба мартахуй — энэ хоёрын хооронд би үргэлж асууж байсан: "Би хэн бэ, юуг хамгаалах ёстой вэ?"</p>
              <p style={{ fontSize: 15, lineHeight: 2.2, color: "rgba(220,215,205,0.45)", fontWeight: 300, marginBottom: 20 }}>owl'd бол миний тэр асуултад өгсөн хариулт. Чорос овгийн тотем Уулийн нэрийг зүүж, алга болж буй Монголын нүүдэлчдийн сүнслэг өвийг орчин үеийн dark wear-ээр сэргээнэ.</p>
              <p style={{ fontSize: 15, lineHeight: 2.2, color: "rgba(220,215,205,0.35)", fontWeight: 300, fontStyle: "italic" }}>By your side in the dark, for the dawn…</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3} direction="left">
            <div style={{ border: "1px solid rgba(220,215,205,0.05)", padding: "44px 32px", background: "rgba(220,215,205,0.008)" }}>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.45)", textTransform: "uppercase", marginBottom: 20 }}>Дизайнер</div>
              <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 12 }}>Галт Билгүүн</div>
              <div style={{ fontSize: 13, color: "rgba(220,215,205,0.3)", fontWeight: 300, lineHeight: 2.2 }}>
                Улаанбаатар хот<br />Сөүл хот<br />Ханян Их Сургууль, Хувцасны тэнхим<br />Чорос овог — Ууль тотем
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(220,215,205,0.04)" }}>
                <div style={{ fontSize: 12, color: "rgba(220,215,205,0.2)", lineHeight: 1.8 }}>
                  <div>@eww.gvn</div><div>galtbilguun0@gmail.com</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}><div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} /></div>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" style={{ padding: "150px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Бүтээлүүд</div></FadeIn>
        <FadeIn delay={0.1}><h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: 5, marginBottom: 70 }}>Өмнөх бүтээлүүд</h2></FadeIn>

        {/* Spirit of Nomad */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 100 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 16 }}>Collection 01 — 2025</div>
                <h3 style={{ fontSize: 30, fontWeight: 300, letterSpacing: 4, marginBottom: 20 }}>Spirit of Nomad</h3>
                <p style={{ fontSize: 14, lineHeight: 2, color: "rgba(220,215,205,0.4)", fontWeight: 300, marginBottom: 20 }}>
                  Монгол уламжлалт хувцасны бүтэц, дүрс дүрслэлийг орчин үеийн нүдээр дахин тайлбарласан цуглуулга. Нүүдэлчний ул мөрийг мөрдөж, алга болж буй уламжлал ба орчин үеийн гоо зүйн уулзвар дээр хувцас бүтээсэн.
                </p>
                <p style={{ fontSize: 14, lineHeight: 2, color: "rgba(220,215,205,0.35)", fontWeight: 300 }}>
                  Хөвөн арьстай адил танил, арьс шархыг хучдаг, ноос мартагдсан дулааныг санагдуулдаг. Эдгээр хувцас чимэглэхийн тулд бус — дурсамжийг өмсөх, сорвин дээгүүр оёх, амьд үлдэхийн тулд бүтээгдсэн.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                  {["Darkwear", "Leather", "6 Looks", "Capstone 2025"].map(tag => (
                    <span key={tag} style={{ fontSize: 9, letterSpacing: 3, padding: "5px 14px", border: "1px solid rgba(220,215,205,0.08)", color: "rgba(220,215,205,0.25)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              {/* Real lookbook image */}
              <div style={{
                overflow: "hidden", border: "1px solid rgba(220,215,205,0.06)",
                transition: "transform 0.5s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src="/images/spirit-of-nomad.jpg" alt="Spirit of Nomad" style={{ width: "100%", display: "block", filter: "brightness(0.9)" }} />
              </div>
            </div>
          </div>
        </FadeIn>

        <div style={{ height: 1, background: "rgba(220,215,205,0.04)", marginBottom: 100 }} />

        {/* Liminal Steppe */}
        <FadeIn delay={0.1}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
              <div style={{
                overflow: "hidden", border: "1px solid rgba(220,215,205,0.06)",
                transition: "transform 0.5s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src="/images/liminal-night.jpg" alt="Liminal Steppe - Night" style={{ width: "100%", display: "block", filter: "brightness(0.9)" }} />
              </div>
              <div style={{
                overflow: "hidden", border: "1px solid rgba(220,215,205,0.06)",
                transition: "transform 0.5s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src="/images/liminal-dawn.jpg" alt="Liminal Steppe - Dawn" style={{ width: "100%", display: "block", filter: "brightness(0.9)" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 16 }}>Collection 02 — 2024</div>
                <h3 style={{ fontSize: 30, fontWeight: 300, letterSpacing: 4, marginBottom: 8 }}>Liminal Steppe</h3>
                <div style={{ fontSize: 14, fontStyle: "italic", color: "rgba(220,215,205,0.3)", marginBottom: 20 }}>Between Night & Dawn</div>
              </div>
              <div>
                <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(220,215,205,0.35)", fontWeight: 300 }}>
                  Уламжлал ба орчин үеийн уулзвар дээр ажилласан цуглуулга. Монгол дээл, тэрлэгийг өнөөгийн бие ба хотын хэмнэлд зориулан дахин уншсан. Торго, даавуу, угаасан жинс. Цагаан, ягаан, хөх ногоон, хар хөх — шөнөөс үүр рүү шилжих тэнгэрийн өнгө.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
                  {["Denim", "Cotton", "Silk", "2 Looks", "Night & Dawn"].map(tag => (
                    <span key={tag} style={{ fontSize: 9, letterSpacing: 3, padding: "5px 14px", border: "1px solid rgba(220,215,205,0.08)", color: "rgba(220,215,205,0.25)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}><div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} /></div>

      {/* ===== SHOP ===== */}
      <section id="shop" style={{ padding: "150px 40px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Дэлгүүр</div>
          <Star size={30} color="rgba(220,215,205,0.1)" />
          <h2 style={{ fontSize: 38, fontWeight: 300, letterSpacing: 6, marginTop: 24, marginBottom: 16 }}>Тун удахгүй</h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(220,215,205,0.3)", fontWeight: 300, maxWidth: 520, margin: "0 auto 50px" }}>
            Haute couture цуглуулга, бэлэн хувцасны шугам, мөн Монгол уламжлалт бичгийн мөнгөн гоёл чимэглэл удахгүй нээлтээ хийнэ.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 40 }}>
          {[
            { label: "Haute Couture", sub: "SS 2026 · 3 Төрх", time: "2026 оны 4-р сар" },
            { label: "Бэлэн хувцас", sub: "Футболк · Урт ханцуй · Baby Tee", time: "2026 оны 5-р сар" },
            { label: "Мөнгөн гоёл", sub: "Монгол бичгийн цуглуулга", time: "2026 оны 5-р сар" }
          ].map((item, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{
                border: "1px solid rgba(220,215,205,0.05)", padding: "44px 24px",
                background: "rgba(220,215,205,0.008)",
                transition: "border-color 0.4s, transform 0.3s", cursor: "default"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,115,85,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(220,215,205,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Star size={14} color="rgba(220,215,205,0.08)" />
                <h3 style={{ fontSize: 18, fontWeight: 300, letterSpacing: 3, marginTop: 16, marginBottom: 8 }}>{item.label}</h3>
                <p style={{ fontSize: 11, color: "rgba(220,215,205,0.25)", fontWeight: 300, marginBottom: 18 }}>{item.sub}</p>
                <span style={{ fontSize: 9, letterSpacing: 4, padding: "6px 18px", border: "1px solid rgba(220,215,205,0.1)", color: "rgba(220,215,205,0.25)", display: "inline-block" }}>{item.time}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ marginTop: 60 }}>
            <p style={{ fontSize: 12, color: "rgba(220,215,205,0.2)", fontWeight: 300, marginBottom: 16 }}>Гарах мэдэгдэл авахыг хүсвэл</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", maxWidth: 400, margin: "0 auto" }}>
              <input type="email" placeholder="таны@имэйл.com" style={{
                flex: 1, background: "rgba(220,215,205,0.02)", border: "1px solid rgba(220,215,205,0.08)",
                padding: "12px 16px", color: "#DCD7CD", fontFamily: "'Times New Roman', serif", fontSize: 13, outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={e => e.target.style.borderColor = "rgba(139,115,85,0.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(220,215,205,0.08)"}
              />
              <button style={{
                background: "none", border: "1px solid rgba(220,215,205,0.15)",
                color: "rgba(220,215,205,0.5)", padding: "12px 24px",
                fontSize: 10, letterSpacing: 2, fontFamily: "'Times New Roman', serif",
                cursor: "pointer", transition: "all 0.3s"
              }}>Мэдэгдэх</button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid rgba(220,215,205,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <FadeIn direction="right">
            <div>
              <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 30 }}>Холбоо барих</div>
              <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 28 }}>Бидэнтэй холбогдох</h2>
              <div style={{ fontSize: 14, color: "rgba(220,215,205,0.35)", fontWeight: 300, lineHeight: 2.4 }}>
                <div>galtbilguun0@gmail.com</div>
                <div>+82 010-8213-3725</div>
                <div style={{ marginTop: 12 }}>Instagram — @eww.gvn</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 30 }}>Байршил</div>
              <div style={{ fontSize: 14, color: "rgba(220,215,205,0.35)", fontWeight: 300, lineHeight: 2 }}>
                <div>Суурин газар: Сөүл, Солонгос</div>
                <div>Төлөөлж буй: Улаанбаатар, Монгол</div>
              </div>
              <div style={{ marginTop: 30, fontSize: 14, color: "rgba(220,215,205,0.25)", fontStyle: "italic", lineHeight: 1.8 }}>
                Хамтын ажиллагаа, худалдан авагчийн хүсэлт,<br />хэвлэлийн хүсэлтийг имэйлээр илгээнэ үү.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "50px 40px", textAlign: "center", borderTop: "1px solid rgba(220,215,205,0.03)" }}>
        <Star size={11} />
        <div style={{ fontSize: 16, letterSpacing: 8, fontWeight: 300, marginTop: 14, marginBottom: 6 }}>owl'd</div>
        <div style={{ fontSize: 12, color: "rgba(220,215,205,0.2)", fontStyle: "italic", marginBottom: 10 }}>By your side in the dark, for the dawn…</div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(220,215,205,0.1)", textTransform: "uppercase" }}>© 2026 owl'd · Улаанбаатар</div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.12}50%{opacity:0.25} }
        input::placeholder { color: rgba(220,215,205,0.15); }
        img { transition: filter 0.4s ease; }
        img:hover { filter: brightness(1) !important; }
        @media (max-width: 768px) {
          nav > div:last-child { display: none; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 48px !important; letter-spacing: 14px !important; }
          h2 { font-size: 26px !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1.2fr 0.8fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default OwldWebsite;
