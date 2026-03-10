"use client";
import { useState, useEffect } from "react";

const Star = ({ size = 16, color = "#DCD7CD" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
  </svg>
);

const OwldWebsite = () => {
  const [activeNav, setActiveNav] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "philosophy", label: "Философи" },
    { id: "about", label: "Бидний тухай" },
    { id: "portfolio", label: "Бүтээлүүд" },
    { id: "shop", label: "Дэлгүүр" },
    { id: "contact", label: "Холбоо барих" },
  ];

  return (
    <div style={{ background: "#0B0B0A", color: "#DCD7CD", fontFamily: "'Times New Roman', Times, serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 50 ? "rgba(11,11,10,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(220,215,205,0.04)" : "none",
        transition: "all 0.5s ease",
        padding: "0 40px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Star size={13} />
          <span style={{ fontSize: 17, letterSpacing: 8, fontWeight: 300 }}>owl'd</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeNav === n.id ? "#DCD7CD" : "rgba(220,215,205,0.25)",
              fontFamily: "'Times New Roman', Times, serif", fontSize: 11, letterSpacing: 2,
              padding: "6px 14px",
              transition: "color 0.3s"
            }}>{n.label}</button>
          ))}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" style={{
        height: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.035,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat", backgroundSize: "200px"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 45%, rgba(220,215,205,0.025) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(220,215,205,0.015) 0%, transparent 45%)"
        }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Star size={20} />
          <h1 style={{
            fontSize: 76, fontWeight: 300, letterSpacing: 26,
            marginTop: 24, marginBottom: 16,
            animation: "fadeUp 1.5s ease forwards"
          }}>owl'd</h1>
          <p style={{
            fontSize: 15, letterSpacing: 3, color: "rgba(220,215,205,0.45)",
            fontStyle: "italic", marginBottom: 12,
            animation: "fadeUp 1.5s ease 0.3s forwards", opacity: 0
          }}>By your side in the dark, for the dawn…</p>
          <div style={{
            width: 1, height: 50, background: "linear-gradient(to bottom, rgba(139,115,85,0.4), transparent)",
            margin: "24px auto 0",
            animation: "fadeUp 1.5s ease 0.6s forwards", opacity: 0
          }} />
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          fontSize: 9, letterSpacing: 4, color: "rgba(220,215,205,0.12)",
          textTransform: "uppercase", fontFamily: "'Times New Roman', serif",
          animation: "pulse 2.5s ease infinite"
        }}>Доош гүйлгэх</div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section id="philosophy" style={{ padding: "140px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40, fontFamily: "'Times New Roman', serif" }}>Философи</div>

        <h2 style={{ fontSize: 34, fontWeight: 300, letterSpacing: 5, marginBottom: 20, lineHeight: 1.5 }}>
          Мартагдаж буй өв соёлоо сэргээх
        </h2>
        <p style={{ fontSize: 15, lineHeight: 2, color: "rgba(220,215,205,0.45)", fontWeight: 300, maxWidth: 700, marginBottom: 70 }}>
          Дэлхий хурдацтай өөрчлөгдөж байх зуур мянган жилийн турш уламжлагдаж ирсэн нүүдэлчдийн сүнслэг өв чимээгүйхэн алга болж байна. owl'd энэ чимээгүй байдлыг эсэргүүцдэг. Хувцас хийх биш — дурсамжийг сэргээх, ялгаа тодорхойлох, унтаж буй соёлыг сэрээх — энэ бол бидний оршин тогтнох шалтгаан.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {[
            {
              title: "Сэргээх",
              sub: "Awaken",
              desc: "Тэнгэр шүтлэг, бөө мөргөл, тотемизм — Монголын нүүдэлчид мянган жилийн турш хамгаалж ирсэн сүнслэг уламжлалыг орчин үеийн загварын хэлээр дахин дуудаж байна. Унтаж буй сүнс хувцсаар дамжин сэрдэг."
            },
            {
              title: "Хадгалах",
              sub: "Preserve",
              desc: "Мянган жилийн турш уламжлагдаж ирсэн нүүдэлчдийн дэлхий үзэл, зан үйл, бэлгэдлийн тогтолцоог бүртгэж, шинэ хэлбэрээр хадгалах. Мартагдахаас өмнө санах нь хадгалалтын эхлэл юм."
            },
            {
              title: "Дамжуулах",
              sub: "Transmit",
              desc: "Монголын соёлын өв зөвхөн Монголынх биш. Хувцас гэдэг бүх нийтийн хэлээр нүүдэлчдийн мэргэн ухаан, гоо үзэсгэлэнг дэлхийд дамжуулна. Өмсөгч нь дамжуулагч болдог."
            }
          ].map((p, i) => (
            <div key={i} style={{
              padding: "40px 28px",
              border: "1px solid rgba(220,215,205,0.05)",
              background: "rgba(220,215,205,0.008)",
            }}>
              <h3 style={{ fontSize: 24, fontWeight: 300, letterSpacing: 4, marginBottom: 6 }}>{p.title}</h3>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 24 }}>{p.sub}</div>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(220,215,205,0.35)", fontWeight: 300 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Spiritual roots */}
        <div style={{ marginTop: 70, borderTop: "1px solid rgba(220,215,205,0.04)", paddingTop: 50 }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(220,215,205,0.15)", textTransform: "uppercase", marginBottom: 30 }}>Сүнслэг үндэс</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { title: "Тэнгэр шүтлэг", sub: "Tengrism", desc: "Мөнх хөх Тэнгэр. Тэнгэр ба газар, хүн ба байгалийг босоо чиглэлд холбодог итгэл. Бүх амьд зүйл тэнгэрийн доор холбогдсон байдаг." },
              { title: "Бөө мөргөл", sub: "Shamanism", desc: "Бөө бол үл үзэгдэх ертөнц ба бодит байдлыг холбодог зуучлагч. Транс төлөвт өвөг дээдсийн сүнстэй харилцаж, байгалийн хүчийг дуудаж эдгэрэлт ба хамгаалалтыг гүйцэтгэдэг. Тэнгэр ба газар, уул ба гол, амьтан ба хүн — бүх зүйлд сүнс оршдог гэсэн итгэл нь бөө мөргөлийн үндэс юм." },
              { title: "Тотемизм", sub: "Totemism", desc: "Чорос овгийн тотем — Ууль. Шөнийн хамгаалагч, мэргэн ухааны бэлгэдэл, харанхуй дотроос хардаг нэгэн. owl'd-ийн нэр ба сүнс эндээс эхэлдэг." }
            ].map((s, i) => (
              <div key={i} style={{ padding: "24px 0" }}>
                <h4 style={{ fontSize: 18, fontWeight: 300, letterSpacing: 3, marginBottom: 4 }}>{s.title}</h4>
                <div style={{ fontSize: 9, letterSpacing: 4, color: "rgba(139,115,85,0.45)", textTransform: "uppercase", marginBottom: 16 }}>{s.sub}</div>
                <p style={{ fontSize: 12, lineHeight: 1.85, color: "rgba(220,215,205,0.3)", fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} />
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "140px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Бидний тухай</div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60 }}>
          <div>
            <h2 style={{ fontSize: 30, fontWeight: 300, letterSpacing: 4, marginBottom: 28, lineHeight: 1.5 }}>
              Би Монголд төрж,<br />Солонгост өссөн
            </h2>
            <p style={{ fontSize: 14, lineHeight: 2.1, color: "rgba(220,215,205,0.45)", fontWeight: 300, marginBottom: 20 }}>
              Уламжлал ба орчин үе, нүүдэл ба хот, түүх ба мартахуй — энэ хоёрын хооронд би үргэлж асууж байсан: "Би хэн бэ, юуг хамгаалах ёстой вэ?"
            </p>
            <p style={{ fontSize: 14, lineHeight: 2.1, color: "rgba(220,215,205,0.45)", fontWeight: 300, marginBottom: 20 }}>
              owl'd бол миний тэр асуултад өгсөн хариулт. Чорос овгийн тотем Уулийн нэрийг зүүж, алга болж буй Монголын нүүдэлчдийн сүнслэг өвийг орчин үеийн dark wear-ээр сэргээнэ.
            </p>
            <p style={{ fontSize: 14, lineHeight: 2.1, color: "rgba(220,215,205,0.35)", fontWeight: 300, fontStyle: "italic" }}>
              By your side in the dark, for the dawn…
            </p>
          </div>
          <div style={{
            border: "1px solid rgba(220,215,205,0.05)",
            padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "center",
            background: "rgba(220,215,205,0.008)"
          }}>
            <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.45)", textTransform: "uppercase", marginBottom: 20 }}>Дизайнер</div>
            <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: 4, marginBottom: 12 }}>Галт Билгүүн</div>
            <div style={{ fontSize: 12, color: "rgba(220,215,205,0.3)", fontWeight: 300, lineHeight: 2 }}>
              Улаанбаатар хот<br />
              Сөүл хот<br />
              Ханян Их Сургууль, Хувцасны тэнхим<br />
              Чорос овог — Ууль тотем
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(220,215,205,0.04)" }}>
              <div style={{ fontSize: 11, color: "rgba(220,215,205,0.2)", lineHeight: 1.8 }}>
                <div>@eww.gvn</div>
                <div>galtbilguun0@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} />
      </div>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" style={{ padding: "140px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Бүтээлүүд</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, letterSpacing: 5, marginBottom: 60, lineHeight: 1.5 }}>
          Өмнөх бүтээлүүд
        </h2>

        {/* Spirit of Nomad */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 16 }}>Collection 01 — 2025</div>
              <h3 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 16 }}>Spirit of Nomad</h3>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(220,215,205,0.4)", fontWeight: 300, marginBottom: 20 }}>
                Монгол уламжлалт хувцасны бүтэц, дүрс дүрслэлийг орчин үеийн нүдээр дахин тайлбарласан цуглуулга. Нүүдэлчний ул мөрийг мөрдөж, алга болж буй уламжлал ба орчин үеийн гоо зүйн уулзвар дээр хувцас бүтээсэн.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(220,215,205,0.35)", fontWeight: 300, marginBottom: 20 }}>
                Хөвөн арьстай адил танил, арьс шархыг хучдаг, ноос мартагдсан дулааныг санагдуулдаг. Эдгээр хувцас чимэглэхийн тулд бус — дурсамжийг өмсөх, сорвин дээгүүр оёх, амьд үлдэхийн тулд бүтээгдсэн.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                {["Darkwear", "Leather", "6 Looks", "Capstone 2025"].map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: 3, padding: "5px 14px", border: "1px solid rgba(220,215,205,0.08)", color: "rgba(220,215,205,0.25)" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {/* Placeholder images for Spirit of Nomad lookbook */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  aspectRatio: "3/4",
                  background: `linear-gradient(to bottom, rgba(220,215,205,${0.01 + i * 0.005}), rgba(11,11,10,1))`,
                  border: "1px solid rgba(220,215,205,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ fontSize: 9, color: "rgba(220,215,205,0.1)", letterSpacing: 2 }}>LOOK {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider between collections */}
        <div style={{ height: 1, background: "rgba(220,215,205,0.04)", marginBottom: 80 }} />

        {/* Liminal Steppe */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {/* Placeholder images for Liminal Steppe lookbook */}
              {["Night", "Dawn"].map((look, i) => (
                <div key={i} style={{
                  aspectRatio: "3/4",
                  background: i === 0
                    ? "linear-gradient(to bottom, rgba(60,40,80,0.08), rgba(11,11,10,1))"
                    : "linear-gradient(to bottom, rgba(100,140,180,0.08), rgba(11,11,10,1))",
                  border: "1px solid rgba(220,215,205,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ fontSize: 9, color: "rgba(220,215,205,0.1)", letterSpacing: 2 }}>{look.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "rgba(139,115,85,0.5)", textTransform: "uppercase", marginBottom: 16 }}>Collection 02 — 2024</div>
              <h3 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 16 }}>Liminal Steppe</h3>
              <div style={{ fontSize: 13, fontStyle: "italic", color: "rgba(220,215,205,0.3)", marginBottom: 20 }}>Between Night & Dawn</div>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(220,215,205,0.4)", fontWeight: 300, marginBottom: 20 }}>
                Уламжлал ба орчин үеийн уулзвар дээр ажилласан цуглуулга. Монгол дээл, тэрлэгийг өнөөгийн бие ба хотын хэмнэлд зориулан дахин уншсан. Бүсийг нарийн зангиа болгон хоолойд байрлуулж, босоо захыг ташуузах болгон хувиргасан.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(220,215,205,0.35)", fontWeight: 300 }}>
                Шөнө ба үүрийн хоёр гэрлийн хооронд: Шөнө = хамгаалалт, жин, бараан гүн. Үүр = агаар, найдвар, хөдөлгөөн. Торго, даавуу, угаасан жинс. Цагаан, ягаан, хөх ногоон, хар хөх — шөнөөс үүр рүү шилжих тэнгэрийн өнгө.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                {["Denim", "Cotton", "Silk", "2 Looks", "Night & Dawn"].map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: 3, padding: "5px 14px", border: "1px solid rgba(220,215,205,0.08)", color: "rgba(220,215,205,0.25)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "rgba(220,215,205,0.04)" }} />
      </div>

      {/* ===== SHOP — COMING SOON ===== */}
      <section id="shop" style={{
        padding: "140px 40px", maxWidth: 1100, margin: "0 auto",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 40 }}>Дэлгүүр</div>

        <Star size={28} color="rgba(220,215,205,0.12)" />

        <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: 6, marginTop: 24, marginBottom: 16 }}>Тун удахгүй</h2>

        <p style={{
          fontSize: 14, lineHeight: 1.9, color: "rgba(220,215,205,0.3)",
          fontWeight: 300,
          maxWidth: 500, margin: "0 auto 40px"
        }}>
          Haute couture цуглуулга, бэлэн хувцасны шугам, мөн Монгол уламжлалт бичгийн мөнгөн гоёл чимэглэл удахгүй нээлтээ хийнэ.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 50 }}>
          {[
            { label: "Haute Couture", sub: "SS 2026 · 3 Төрх", time: "2026 оны 4-р сар" },
            { label: "Бэлэн хувцас", sub: "Футболк · Урт ханцуй · Baby Tee", time: "2026 оны 5-р сар" },
            { label: "Мөнгөн гоёл", sub: "Монгол бичгийн цуглуулга", time: "2026 оны 5-р сар" }
          ].map((item, i) => (
            <div key={i} style={{
              border: "1px solid rgba(220,215,205,0.05)",
              padding: "40px 24px",
              background: "rgba(220,215,205,0.008)"
            }}>
              <div style={{ marginBottom: 16 }}>
                <Star size={14} color="rgba(220,215,205,0.1)" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 300, letterSpacing: 3, marginBottom: 8 }}>{item.label}</h3>
              <p style={{ fontSize: 11, color: "rgba(220,215,205,0.25)", fontWeight: 300, marginBottom: 16 }}>{item.sub}</p>
              <span style={{
                fontSize: 9, letterSpacing: 4,
                padding: "6px 18px", border: "1px solid rgba(220,215,205,0.1)",
                color: "rgba(220,215,205,0.25)",
                display: "inline-block"
              }}>{item.time}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <p style={{ fontSize: 12, color: "rgba(220,215,205,0.2)", fontWeight: 300, marginBottom: 16 }}>
            Гарах мэдэгдэл авахыг хүсвэл
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", maxWidth: 400, margin: "0 auto" }}>
            <input type="email" placeholder="таны@имэйл.com" style={{
              flex: 1, background: "rgba(220,215,205,0.02)",
              border: "1px solid rgba(220,215,205,0.08)",
              padding: "11px 16px", color: "#DCD7CD",
              fontFamily: "'Times New Roman', serif", fontSize: 12, outline: "none"
            }} />
            <button style={{
              background: "none", border: "1px solid rgba(220,215,205,0.15)",
              color: "rgba(220,215,205,0.5)", padding: "11px 22px",
              fontSize: 10, letterSpacing: 2,
              fontFamily: "'Times New Roman', serif", cursor: "pointer",
              transition: "all 0.3s"
            }}>Мэдэгдэх</button>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{
        padding: "120px 40px", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(220,215,205,0.04)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 30 }}>Холбоо барих</div>
            <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 4, marginBottom: 28 }}>Бидэнтэй холбогдох</h2>
            <div style={{ fontSize: 13, color: "rgba(220,215,205,0.35)", fontWeight: 300, lineHeight: 2.4 }}>
              <div>galtbilguun0@gmail.com</div>
              <div>+82 010-8213-3725</div>
              <div style={{ marginTop: 12 }}>Instagram — @eww.gvn</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 6, color: "rgba(220,215,205,0.18)", textTransform: "uppercase", marginBottom: 30 }}>Байршил</div>
            <div style={{ fontSize: 14, color: "rgba(220,215,205,0.35)", fontWeight: 300, lineHeight: 2 }}>
              <div>Суурин газар: Сөүл, Солонгос</div>
              <div>Төлөөлж буй: Улаанбаатар, Монгол</div>
            </div>
            <div style={{ marginTop: 30, fontSize: 13, color: "rgba(220,215,205,0.25)", fontStyle: "italic", lineHeight: 1.7 }}>
              Хамтын ажиллагаа, худалдан авагчийн хүсэлт,<br />хэвлэлийн хүсэлтийг имэйлээр илгээнэ үү.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px", textAlign: "center",
        borderTop: "1px solid rgba(220,215,205,0.03)"
      }}>
        <Star size={11} />
        <div style={{ fontSize: 15, letterSpacing: 8, fontWeight: 300, marginTop: 12, marginBottom: 6 }}>owl'd</div>
        <div style={{ fontSize: 11, color: "rgba(220,215,205,0.2)", fontStyle: "italic", marginBottom: 8 }}>
          By your side in the dark, for the dawn…
        </div>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "rgba(220,215,205,0.1)", textTransform: "uppercase" }}>
          © 2026 owl'd · Улаанбаатар
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(139,115,85,0.3); color: #DCD7CD; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.25; }
        }
        input::placeholder { color: rgba(220,215,205,0.15); }
        button:hover { background: rgba(220,215,205,0.04) !important; }
        @media (max-width: 768px) {
          nav > div:last-child { display: none; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 44px !important; letter-spacing: 12px !important; }
          h2 { font-size: 24px !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1.2fr 0.8fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default OwldWebsite;
