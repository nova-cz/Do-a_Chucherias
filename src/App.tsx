/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Facebook, MessageCircle, Menu, X, Phone, MapPin, ArrowRight, Clock, AlertTriangle, CreditCard, Banknote, Building2, Package, Truck, Home, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── Paleta ────────────────────────────────────────────────
const C = {
  peach:     "#FAEBE3",
  peachMid:  "#F5DDD3",
  peachDeep: "#EEC9B8",
  rose:      "#DA637A",
  roseDark:  "#C4566C",
  roseLight: "#F7DADE",
  rosePale:  "#FDF0F2",
  ink:       "#2E1519",
  inkSoft:   "#7A4F57",
  inkFaint:  "#B08890",
  border:    "#E8C4BA",
  borderLight:"#F1DDD7",
  white:     "#FFFFFF",
  offwhite:  "#FDF8F6",
};

const serif = "'Georgia', 'Times New Roman', serif";
const sans  = "'system-ui', '-apple-system', 'Helvetica Neue', sans-serif";
const waNum = "525541402088";
const waUrl = `https://wa.me/${waNum}?text=Hola%20Do%C3%B1a%20Chucheri%C3%ADas%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.`;
const fbUrl = "https://www.facebook.com/donachucherias/";

const NAV_LINKS = ["Inicio","Productos","Ocasiones","Envíos","Precios","Contacto"];

const PRODUCTS = [
  { id:"1",  name:"Tabla Clásica",           badge:"Más vendida",
    desc:"Quesos finos, carnes curadas, frutas frescas, frutos secos y galletas artesanales.",
    img:"/productos/3.jpeg" },
  { id:"2",  name:"Corazón de Charcutería",  badge:"Romántica",
    desc:"Presentación especial en forma de corazón con carnes premium, quesos y frutos frescos.",
    img:"/productos/16.jpeg" },
  { id:"3",  name:"Corazón de Chocolates",   badge:"Dulce",
    desc:"Chocolates finos, galletas y dulces gourmet con vino en presentación de corazón.",
    img:"/productos/17.jpeg" },
  { id:"4",  name:"Tabla con Vino",          badge:"Premium",
    desc:"Tabla completa acompañada de una botella de vino seleccionado para la ocasión perfecta.",
    img:"/productos/13.jpeg" },
  { id:"5",  name:"Tabla Redonda Especial",  badge:"Para compartir",
    desc:"Presentación redonda con quesos, embutidos, frutas, pan artesanal y salsas.",
    img:"/productos/6.jpeg" },
  { id:"6",  name:"Mini Tabla Personal",     badge:"Individual",
    desc:"El regalo perfecto para una persona especial: porción individual con todo el sabor.",
    img:"/productos/12.jpeg" },
  { id:"7",  name:"Tabla Grande Premium",    badge:"Para reuniones",
    desc:"Tabla abundante estilo gourmet con selección premium de carnes, quesos y frutos.",
    img:"/productos/7.jpeg" },
  { id:"8",  name:"Corazón con Vino",        badge:"San Valentín",
    desc:"Corazón de charcutería acompañado de vino tinto — el regalo más romántico.",
    img:"/productos/20.jpeg" },
  { id:"9",  name:"Tabla Regalo Especial",   badge:"Con dedicatoria",
    desc:"Tabla presentada como regalo con moño y decoración especial para sorprender.",
    img:"/productos/15.jpeg" },
];

const OCCASIONS = [
  { id:"01", title:"San Valentín",         desc:"Sorprende a tu pareja con una tabla romántica acompañada de vino y chocolates.",
    photos:["/productos/16.jpeg","/productos/17.jpeg","/productos/18.jpeg","/productos/19.jpeg","/productos/20.jpeg","/productos/9.jpeg"] },
  { id:"02", title:"Fechas Importantes",   desc:"Sorprende en ese día especial con una espectacular tabla de carnes frías y quesos.",
    photos:["/productos/3.jpeg","/productos/4.jpeg","/productos/5.jpeg","/productos/14.jpeg","/productos/15.jpeg"] },
  { id:"03", title:"Aniversarios",         desc:"Detalles personalizados con mensajes especiales para tu persona favorita.",
    photos:["/productos/9.jpeg","/productos/16.jpeg","/productos/20.jpeg","/productos/13.jpeg"] },
  { id:"04", title:"Fiestas y Reuniones",  desc:"Tablas grandes para compartir con familia y amigos en cualquier celebración.",
    photos:["/productos/6.jpeg","/productos/7.jpeg","/productos/14.jpeg","/productos/3.jpeg","/productos/21.jpeg"] },
  { id:"05", title:"Día de las Madres",    desc:"Haz sentir especial a mamá con una caja gourmet llena de sabor.",
    photos:["/productos/madre_1.jpeg","/productos/madre_2.jpeg","/productos/madre_3.jpeg","/productos/madre_4.jpeg","/productos/madre_5.jpeg"] },
  { id:"06", title:"Regalos Corporativos", desc:"Impresiona a tus clientes o equipo con detalles gourmet de calidad.",
    photos:["/productos/7.jpeg","/productos/13.jpeg","/productos/14.jpeg","/productos/3.jpeg","/productos/6.jpeg"] },
  { id:"07", title:"Día del Niño",         desc:"Endulza su día especial con una tabla divertida llena de chocolates, dulces y snacks gourmet.",
    photos:["/productos/nino_1.jpeg","/productos/nino_2.jpeg","/productos/8.jpeg","/productos/19.jpeg"] },
];

const GALLERY = [
  "/productos/14.jpeg",
  "/productos/4.jpeg",
  "/productos/5.jpeg",
  "/productos/18.jpeg",
  "/productos/9.jpeg",
  "/productos/19.jpeg",
  "/productos/10.jpeg",
  "/productos/11.jpeg",
  "/productos/8.jpeg",
  "/productos/madre_4.jpeg",
  "/productos/madre_2.jpeg",
  "/productos/madre_3.jpeg",
  "/productos/madre_5.jpeg",
  "/productos/nino_2.jpeg",
  "/productos/nino_1.jpeg",
];

// ── SectionTag ────────────────────────────────────────────
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-16 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5 }}
      style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:"1.25rem" }}
    >
      <span style={{ display:"block", width:24, height:1.5, backgroundColor:C.rose, borderRadius:2 }} />
      <span style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.42em", textTransform:"uppercase", color:C.rose }}>{children}</span>
    </motion.div>
  );
}

// ── ProductCard (light editorial) ─────────────────────────
function ProductCard({ p, waUrl }: { p:any; waUrl:string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ y: hov ? -6 : 0, boxShadow: hov ? "0 24px 56px rgba(42,21,24,0.14)" : "0 4px 24px rgba(42,21,24,0.07)" }}
      transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
      style={{ backgroundColor:C.white, borderRadius:6, overflow:"hidden", border:`1px solid ${C.borderLight}`, cursor:"pointer" }}
    >
      {/* Image */}
      <div style={{ height:240, overflow:"hidden", position:"relative" }}>
        <motion.img
          src={p.img} alt={p.name}
          animate={{ scale: hov ? 1.07 : 1 }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        />
        {p.badge && (
          <div style={{
            position:"absolute", top:14, left:14,
            backgroundColor:C.rose, color:C.white,
            fontFamily:sans, fontSize:"0.48rem", letterSpacing:"0.2em", textTransform:"uppercase",
            padding:"4px 12px", borderRadius:100,
          }}>{p.badge}</div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding:"1.5rem 1.6rem 1.8rem" }}>
        <p style={{ fontFamily:sans, fontSize:"0.46rem", letterSpacing:"0.3em", textTransform:"uppercase", color:C.inkFaint, margin:"0 0 6px" }}>Charcutería artesanal</p>
        <h3 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"1.3rem", color:C.ink, margin:"0 0 0.5rem", lineHeight:1.2 }}>{p.name}</h3>
        <p style={{ fontFamily:sans, fontSize:"0.82rem", lineHeight:1.72, color:C.inkSoft, fontWeight:300, margin:"0 0 1.25rem" }}>{p.desc}</p>
        <motion.a
          href={waUrl} target="_blank" rel="noopener noreferrer"
          animate={{ opacity: hov ? 1 : 0.7 }}
          whileHover={{ backgroundColor: C.roseDark }}
          style={{ display:"inline-flex", alignItems:"center", gap:7, fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.55rem 1.3rem", borderRadius:4, textDecoration:"none", transition:"background-color 0.2s" }}
          onClick={e => e.stopPropagation()}
        ><MessageCircle size={12}/> Pedir</motion.a>
      </div>
    </motion.div>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [ctaMsg, setCtaMsg]             = useState("");
  const [activeOccasion, setActiveOccasion] = useState<typeof OCCASIONS[0] | null>(null);
  const [winW, setWinW]                 = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const isMobile = winW < 768;
  const isTablet = winW < 1024;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%","18%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const sendWa = () => {
    const msg = ctaMsg.trim() || "Hola, quiero hacer un pedido";
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ fontFamily:serif, backgroundColor:C.offwhite, color:C.ink, overflowX:"hidden" }}>

      {/* ══ NAV ══ */}
      <motion.nav
        initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:50,
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(253,248,246,0.92)",
          backdropFilter:"blur(20px)",
          borderBottom:`1px solid ${scrolled ? C.border : C.borderLight}`,
          transition:"all 0.4s ease",
          boxShadow: scrolled ? "0 2px 40px rgba(42,21,24,0.07)" : "none",
        }}
      >
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1rem" : "0 2.5rem", height: isMobile ? 60 : 72, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo */}
          <motion.a href="#inicio" whileHover={{ opacity:0.75 }} style={{ textDecoration:"none", lineHeight:1 }}>
            <div style={{ fontFamily:serif, fontSize:"1.3rem", fontStyle:"italic", letterSpacing:"-0.01em", color:C.rose }}>Doña Chucherías</div>
            <div style={{ fontFamily:sans, fontSize:"0.42rem", letterSpacing:"0.36em", textTransform:"uppercase", color:C.inkFaint, marginTop:3 }}>Tablas & Regalos Gourmet · CDMX</div>
          </motion.a>

          {/* Links desktop */}
          {!isMobile && <nav style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
            {NAV_LINKS.map((l, i) => (
              <motion.a key={l}
                href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}`}
                initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.05 }}
                style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.inkSoft, textDecoration:"none", position:"relative" }}
                whileHover={{ color:C.rose }}
              >{l}</motion.a>
            ))}
          </nav>}

          {/* WhatsApp CTA */}
          {!isMobile && <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.03, boxShadow:"0 8px 24px rgba(218,99,122,0.35)" }} whileTap={{ scale:0.96 }}
            style={{ fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.65rem 1.5rem", textDecoration:"none", display:"flex", alignItems:"center", gap:7, borderRadius:100, boxShadow:"0 3px 14px rgba(218,99,122,0.28)" }}
          ><MessageCircle size={12} strokeWidth={2} /> WhatsApp</motion.a>}

          {isMobile && (
            <button onClick={() => setMenuOpen(p => !p)}
              style={{ background:"none", border:"none", cursor:"pointer", color:C.ink, padding:4, display:"flex" }}
            >{menuOpen ? <X size={22} strokeWidth={1.5}/> : <Menu size={22} strokeWidth={1.5}/>}</button>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, x:"100%" }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:"100%" }}
            transition={{ type:"tween", duration:0.28 }}
            style={{ position:"fixed", inset:0, zIndex:49, backgroundColor:C.offwhite, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 2.5rem" }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position:"absolute", top:"1.5rem", right:"2rem", background:"none", border:"none", cursor:"pointer", color:C.ink }}><X size={24} strokeWidth={1}/></button>
            {NAV_LINKS.map((l,i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06 }}
                style={{ fontFamily:serif, fontSize:"2.2rem", fontStyle:"italic", color:C.ink, textDecoration:"none", padding:"0.75rem 0", borderBottom:`1px solid ${C.borderLight}`, display:"block" }}
                whileHover={{ color:C.rose, paddingLeft:10 }}
              >{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section ref={heroRef} id="inicio" style={{ minHeight: isMobile ? "auto" : "100vh", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "52% 48%", overflow:"hidden", paddingTop: isMobile ? 60 : 72 }}>
        {/* Texto */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding: isMobile ? "2.5rem 1.5rem 2rem" : "4rem 4rem 4rem calc(max(2.5rem, 50vw - 680px))", backgroundColor:C.peach, position:"relative" }}>
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}>
            {/* Label */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:"2.25rem", backgroundColor:C.roseLight, padding:"6px 16px", borderRadius:100 }}>
              <Star size={10} fill={C.rose} color={C.rose}/>
              <span style={{ fontFamily:sans, fontSize:"0.5rem", letterSpacing:"0.34em", textTransform:"uppercase", color:C.rose }}>Tablas artesanales · CDMX</span>
            </div>

            <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2.8rem,4.5vw,5rem)", lineHeight:1.07, letterSpacing:"-0.03em", color:C.ink, margin:"0 0 1.5rem" }}>
              Haz tu pedido<br />hoy y sorprende<br />a <em style={{ color:C.rose }}>alguien especial</em>
            </h1>

            <p style={{ fontFamily:sans, fontSize:"0.92rem", lineHeight:1.9, color:C.inkSoft, fontWeight:300, maxWidth:360, marginBottom:"2.5rem" }}>
              Escríbenos por WhatsApp para cotizar tu tabla personalizada. Entregas a domicilio en CDMX. Pedidos con 24 hrs de anticipación.
            </p>

            <div style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
              <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:"0 10px 32px rgba(218,99,122,0.4)" }} whileTap={{ scale:0.97 }}
                style={{ fontFamily:sans, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.9rem 1.9rem", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, borderRadius:100, boxShadow:"0 4px 18px rgba(218,99,122,0.3)" }}
              ><MessageCircle size={13}/> Pedir por WhatsApp</motion.a>

              <motion.a href="#productos"
                whileHover={{ backgroundColor:C.peachDeep }} whileTap={{ scale:0.97 }}
                style={{ fontFamily:sans, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.ink, padding:"0.9rem 1.9rem", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, border:`1.5px solid ${C.border}`, borderRadius:100, backgroundColor:C.white }}
              >Ver productos <ArrowRight size={12}/></motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.8 }}
            style={ isMobile
              ? { position:"relative", display:"flex", gap:"1.5rem", flexWrap:"wrap", paddingTop:"1.5rem", marginTop:"2rem", borderTop:`1px solid ${C.peachDeep}` }
              : { position:"absolute", bottom:"2.5rem", left:"calc(max(2.5rem,50vw - 680px))", right:"4rem", display:"flex", gap:"2.5rem", paddingTop:"1.5rem", borderTop:`1px solid ${C.peachDeep}` }
            }
          >
            {[["+ 500","clientes felices"],["100%","artesanal"],["5 ★","calificación"]].map(([n,l]) => (
              <div key={l}>
                <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:"1.5rem", color:C.rose, margin:0, lineHeight:1 }}>{n}</p>
                <p style={{ fontFamily:sans, fontSize:"0.44rem", letterSpacing:"0.24em", textTransform:"uppercase", color:C.inkSoft, margin:"5px 0 0" }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Imagen parallax */}
        {!isMobile && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.4 }} style={{ position:"relative", overflow:"hidden" }}>
          <motion.img
            src="/productos/21.jpeg"
            alt="Tabla artesanal Doña Chucherías"
            style={{ width:"100%", height:"125%", objectFit:"cover", objectPosition:"center", position:"absolute", top:"-12%", left:0, y:imgY } as any}
          />
          {/* soft fade from peach */}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right, ${C.peach} 0%, ${C.peach}60 8%, transparent 28%)` }} />
        </motion.div>}
      </section>

      {/* ══ PRODUCTOS ══ */}
      <section id="productos" style={{ backgroundColor:C.white, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem" }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem", paddingBottom:"2.25rem", borderBottom:`1px solid ${C.borderLight}` }}>
            <div>
              <SectionTag>Nuestros Productos</SectionTag>
              <motion.h2
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
                style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2.2rem,3.5vw,3.8rem)", letterSpacing:"-0.03em", color:C.ink, margin:0, lineHeight:1.1 }}
              >
                Creaciones para<br /><span style={{ color:C.rose }}>cada momento</span>
              </motion.h2>
            </div>
            <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ gap:14 }}
              style={{ fontFamily:sans, fontSize:"0.54rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.rose, textDecoration:"none", display:"flex", alignItems:"center", gap:8, paddingBottom:3, borderBottom:`1px solid ${C.rose}` }}
            >Pedir ahora <ArrowRight size={11}/></motion.a>
          </div>

          {/* Grid de productos — 3 columnas */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap:"1.25rem" }}>
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.65, delay:i*0.08 }}
              >
                <ProductCard p={p} waUrl={waUrl} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OCASIONES ══ */}
      <section id="ocasiones" style={{ backgroundColor:C.peach, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem" }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr", gap: isMobile ? "2rem" : "6rem", alignItems:"start" }}>
            {/* Izquierda sticky */}
            <div style={{ position:"sticky", top:110 }}>
              <SectionTag>Para cada ocasión</SectionTag>
              <motion.h2
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3vw,3.4rem)", letterSpacing:"-0.03em", color:C.ink, margin:"0 0 1.5rem", lineHeight:1.1 }}
              >El detalle perfecto siempre</motion.h2>
              <p style={{ fontFamily:sans, fontSize:"0.87rem", lineHeight:1.9, color:C.inkSoft, fontWeight:300, marginBottom:"2.25rem", maxWidth:320 }}>
                No importa la ocasión, tenemos la presentación ideal para hacerla memorable.
              </p>
              <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03, boxShadow:"0 8px 26px rgba(218,99,122,0.32)" }} whileTap={{ scale:0.97 }}
                style={{ fontFamily:sans, fontSize:"0.55rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.9rem 1.8rem", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, borderRadius:100 }}
              ><MessageCircle size={13}/> Pedir ahora</motion.a>

              {/* Imagen decorativa */}
              <motion.div
                initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.2 }}
                style={{ marginTop:"3rem", borderRadius:8, overflow:"hidden", boxShadow:"0 16px 56px rgba(42,21,24,0.12)" }}
              >
                <img src="/productos/21.jpeg" alt="Ocasiones especiales" style={{ width:"100%", height:260, objectFit:"cover", display:"block" }}/>
              </motion.div>
            </div>

            {/* Derecha: lista */}
            <div>
              {OCCASIONS.map((o, i) => (
                <motion.div key={o.id}
                  initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                  transition={{ duration:0.55, delay:i*0.07 }}
                  whileHover={{ x:6 }}
                  onClick={() => setActiveOccasion(o)}
                  style={{ display:"grid", gridTemplateColumns:"52px 1fr", gap:"1.5rem", alignItems:"start", paddingBottom:"2rem", marginBottom:"2rem", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}
                >
                  <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:"2rem", color:C.peachDeep, lineHeight:1, userSelect:"none" }}>{o.id}</span>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.4rem", flexWrap:"wrap" }}>
                      <h3 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"1.35rem", color:C.ink, margin:0, lineHeight:1.2 }}>{o.title}</h3>
                      <span style={{ fontFamily:sans, fontSize:"0.46rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.rose, backgroundColor:C.rosePale, padding:"3px 9px", borderRadius:100 }}>Ver fotos</span>
                    </div>
                    <p style={{ fontFamily:sans, fontSize:"0.84rem", lineHeight:1.8, color:C.inkSoft, fontWeight:300, margin:0 }}>{o.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALERÍA ══ */}
      <section id="galeria" style={{ backgroundColor:C.white, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3.5rem", paddingBottom:"2rem", borderBottom:`1px solid ${C.borderLight}` }}>
            <div>
              <SectionTag>Galería</SectionTag>
              <motion.h2
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3vw,3.4rem)", color:C.ink, margin:0, letterSpacing:"-0.03em" }}
              >Nuestras creaciones</motion.h2>
            </div>
            <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ gap:13 }}
              style={{ fontFamily:sans, fontSize:"0.54rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.rose, textDecoration:"none", display:"flex", alignItems:"center", gap:8, paddingBottom:3, borderBottom:`1px solid ${C.rose}` }}
            >Quiero el mío <ArrowRight size={11}/></motion.a>
          </div>

          {/* Grid galería — 3 columnas, todas las fotos */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? 4 : 6 }}>
            {GALLERY.map((src, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.55, delay:(i % 3) * 0.08 }}
                style={{ overflow:"hidden", borderRadius:6, aspectRatio:"4/3" }}
              >
                <motion.img src={src} alt={`Creación ${i+1}`}
                  whileHover={{ scale:1.06 }} transition={{ duration:0.6, ease:"easeOut" }}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENVÍOS ══ */}
      <section id="envios" style={{ backgroundColor:C.offwhite, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem" }}>
          <div style={{ textAlign:"center", maxWidth:540, margin:"0 auto 5rem" }}>
            <SectionTag>Información importante</SectionTag>
            <motion.h2
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3vw,3.2rem)", color:C.ink, margin:"0 0 1rem", letterSpacing:"-0.03em" }}
            >Envíos y Entregas</motion.h2>
            <p style={{ fontFamily:sans, fontSize:"0.87rem", lineHeight:1.88, color:C.inkSoft, fontWeight:300, margin:"0 0 0.4rem" }}>
              La liquidación del producto es de acuerdo a la forma de entrega que selecciones.
            </p>
            <p style={{ fontFamily:sans, fontSize:"0.85rem", color:C.rose, fontWeight:500 }}>
              El costo del envío es aparte — el cliente lo cotiza y paga.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:"1.25rem" }}>
            {[
              { Icon:Home, title:"Recolección en domicilio", body:"Puedes recoger tu pedido directamente en nuestro domicilio sin costo extra.", notes:[] },
              { Icon:Truck, title:"Envío Doña Chucherías", body:"Contamos con servicio de mensajería dentro de CDMX y Edo. Mex. Cotiza tu envío.", notes:[{type:"info",text:"Solicitar con 24 hrs de anticipación"}] },
              { Icon:Package, title:"Otra Mensajería", body:"Puedes solicitar tu Uber, Didi o Cabify. Te compartimos la información y ubicación.", notes:[{type:"info",text:"Debe liquidarse 8 hrs previas."},{type:"warn",text:"No nos hacemos responsables del manejo en otra mensajería."}] },
            ].map(({ Icon, title, body, notes }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.12 }}
                whileHover={{ y:-6, boxShadow:"0 20px 52px rgba(42,21,24,0.1)" }}
                style={{ backgroundColor:C.white, padding:"2.5rem 2.25rem", border:`1px solid ${C.borderLight}`, borderRadius:8, boxShadow:"0 2px 18px rgba(42,21,24,0.05)", cursor:"default" }}
              >
                <div style={{ width:52, height:52, borderRadius:12, backgroundColor:C.rosePale, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.5rem", color:C.rose }}>
                  <Icon size={22} strokeWidth={1.5}/>
                </div>
                <h3 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"1.2rem", color:C.ink, marginBottom:"0.6rem", lineHeight:1.25 }}>{title}</h3>
                <p style={{ fontFamily:sans, fontSize:"0.84rem", lineHeight:1.8, color:C.inkSoft, fontWeight:300, marginBottom:notes.length?"1rem":"0" }}>{body}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {notes.map((n: any) => (
                    <div key={n.text} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"8px 11px", borderRadius:6, backgroundColor:n.type==="warn"?"#FFF8EE":C.rosePale, color:n.type==="warn"?"#8A5C00":C.roseDark, fontFamily:sans, fontSize:"0.73rem", lineHeight:1.55 }}>
                      {n.type==="warn" ? <AlertTriangle size={12} style={{ flexShrink:0, marginTop:2 }}/> : <Clock size={12} style={{ flexShrink:0, marginTop:2 }}/>}
                      {n.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRECIOS ══ */}
      <section id="precios" style={{ backgroundColor:C.white, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:880, margin:"0 auto", padding:"0 2.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <SectionTag>Inversión</SectionTag>
            <motion.h2
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3vw,3.2rem)", color:C.ink, margin:"0 0 1rem", letterSpacing:"-0.03em" }}
            >Nuestros Precios</motion.h2>
            <p style={{ fontFamily:sans, fontSize:"0.87rem", lineHeight:1.88, color:C.inkSoft, fontWeight:300, maxWidth:460, margin:"0 auto" }}>
              El valor varía según el tamaño y la selección, garantizando siempre la mejor calidad.
            </p>
          </div>

          {/* Precio card */}
          <motion.div
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ backgroundColor:C.peach, border:`1px solid ${C.border}`, borderRadius:12, padding:"4.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}
          >
            {/* Decorative circles */}
            <div style={{ position:"absolute", top:-70, right:-70, width:220, height:220, borderRadius:"50%", backgroundColor:C.roseLight, opacity:0.6 }} />
            <div style={{ position:"absolute", bottom:-50, left:-50, width:160, height:160, borderRadius:"50%", backgroundColor:C.peachDeep, opacity:0.5 }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <p style={{ fontFamily:sans, fontSize:"0.48rem", letterSpacing:"0.34em", textTransform:"uppercase", color:C.rose, marginBottom:"0.6rem" }}>Precio base</p>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", gap:4, marginBottom:"0.2rem" }}>
                <span style={{ fontFamily:serif, fontSize:"1.5rem", color:C.inkSoft, marginTop:"0.9rem" }}>$</span>
                <span style={{ fontFamily:serif, fontSize:"5.5rem", fontWeight:"bold", color:C.ink, lineHeight:1 }}>550</span>
                <span style={{ fontFamily:sans, fontSize:"1.1rem", color:C.inkSoft, marginTop:"1.3rem" }}>MXN</span>
              </div>
              <p style={{ fontFamily:sans, fontSize:"0.48rem", letterSpacing:"0.32em", textTransform:"uppercase", color:C.inkFaint, marginBottom:"2rem" }}>Precio inicial mínimo</p>
              <p style={{ fontFamily:sans, fontSize:"0.9rem", lineHeight:1.88, color:C.inkSoft, fontWeight:300, maxWidth:440, margin:"0 auto 2.5rem" }}>
                El costo final dependerá de las dimensiones y los ingredientes o temáticas que elijas. Cotiza tu idea por WhatsApp y te damos un precio personalizado.
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:"0.7rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
                {[["🏷️","Desde $550 MXN"],["📐","Varía por tamaño"]].map(([e,t]) => (
                  <span key={t} style={{ display:"inline-flex", alignItems:"center", gap:6, backgroundColor:C.roseLight, color:C.roseDark, fontFamily:sans, fontSize:"0.78rem", padding:"7px 18px", borderRadius:100 }}>{e} {t}</span>
                ))}
              </div>
              <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04, boxShadow:"0 10px 32px rgba(218,99,122,0.38)" }} whileTap={{ scale:0.97 }}
                style={{ fontFamily:sans, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.95rem 2.25rem", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, borderRadius:100, boxShadow:"0 4px 18px rgba(218,99,122,0.28)" }}
              ><MessageCircle size={14}/> Cotizar mi pedido</motion.a>
            </div>
          </motion.div>

          {/* Formas de pago */}
          <div style={{ marginTop:"5.5rem" }}>
            <motion.h3
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(1.6rem,2.5vw,2.2rem)", color:C.ink, textAlign:"center", marginBottom:"0.4rem", letterSpacing:"-0.02em" }}
            >Formas de Pago</motion.h3>
            <p style={{ fontFamily:sans, fontSize:"0.84rem", color:C.inkSoft, textAlign:"center", marginBottom:"2.5rem", fontWeight:300 }}>Facilitamos tu compra con diversas opciones</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:"1rem" }}>
              {[
                { Icon:Building2, title:"Transferencia Bancaria", detail:"Banco BBVA" },
                { Icon:Banknote,  title:"Efectivo",               detail:"" },
                { Icon:CreditCard,title:"Tarjeta de Débito",      detail:"4152 3145 6936 9120" },
              ].map(({ Icon, title, detail }, i) => (
                <motion.div key={title}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  whileHover={{ y:-4, boxShadow:"0 14px 36px rgba(42,21,24,0.08)" }}
                  style={{ backgroundColor:C.offwhite, border:`1px solid ${C.borderLight}`, borderRadius:8, padding:"1.9rem 1.6rem", textAlign:"center" }}
                >
                  <div style={{ width:48, height:48, borderRadius:12, backgroundColor:C.rosePale, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.1rem", color:C.rose }}>
                    <Icon size={18} strokeWidth={1.5}/>
                  </div>
                  <h4 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"1.05rem", color:C.ink, marginBottom:"0.25rem" }}>{title}</h4>
                  {detail && <p style={{ fontFamily:sans, fontSize:"0.8rem", color:C.inkSoft, fontWeight:300, margin:0 }}>{detail}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section style={{ backgroundColor:C.roseLight, padding:"6rem 2.5rem", position:"relative", overflow:"hidden" }}>
        {/* Decorative */}
        <div style={{ position:"absolute", top:-60, left:"8%", width:240, height:240, borderRadius:"50%", backgroundColor:C.rose, opacity:0.08 }} />
        <div style={{ position:"absolute", bottom:-80, right:"6%", width:300, height:300, borderRadius:"50%", backgroundColor:C.rose, opacity:0.06 }} />

        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ position:"relative", zIndex:1, maxWidth:640, margin:"0 auto", textAlign:"center" }}
        >
          <p style={{ fontFamily:sans, fontSize:"0.5rem", letterSpacing:"0.38em", textTransform:"uppercase", color:C.rose, marginBottom:"0.75rem" }}>Contáctanos</p>
          <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3.5vw,3.5rem)", color:C.ink, marginBottom:"1rem", letterSpacing:"-0.02em", lineHeight:1.1 }}>
            Haz tu pedido hoy y<br />sorprende a alguien especial
          </h2>
          <p style={{ fontFamily:sans, fontSize:"0.88rem", color:C.inkSoft, fontWeight:300, marginBottom:"2.5rem", lineHeight:1.85 }}>
            Escríbenos por WhatsApp para cotizar tu tabla personalizada. Respuesta en menos de 10 minutos.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:"0.75rem", flexWrap:"wrap", marginBottom:"1.25rem" }}>
            <input
              value={ctaMsg} onChange={e => setCtaMsg(e.target.value)} onKeyDown={e => e.key==="Enter" && sendWa()}
              placeholder="Hola, quiero hacer un pedido..."
              style={{ flex:1, minWidth:240, maxWidth:380, padding:"1rem 1.4rem", border:`1.5px solid ${C.border}`, borderRadius:100, fontFamily:sans, fontSize:"0.88rem", outline:"none", color:C.ink, backgroundColor:C.white, boxShadow:"0 2px 12px rgba(42,21,24,0.05)" }}
            />
            <motion.button onClick={sendWa}
              whileHover={{ scale:1.04, boxShadow:"0 8px 26px rgba(218,99,122,0.36)" }} whileTap={{ scale:0.95 }}
              style={{ fontFamily:sans, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"1rem 1.75rem", border:"none", borderRadius:100, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, fontWeight:500, boxShadow:"0 4px 16px rgba(218,99,122,0.28)" }}
            ><MessageCircle size={14}/> Enviar</motion.button>
          </div>
          <p style={{ fontFamily:sans, fontSize:"0.73rem", color:C.inkFaint }}>⏱ Pedidos con al menos 24 horas de anticipación</p>
        </motion.div>
      </section>

      {/* ══ CONTACTO ══ */}
      <section id="contacto" style={{ backgroundColor:C.offwhite, padding: isMobile ? "4rem 0" : "9rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "6rem", alignItems:"start" }}>
          <motion.div initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <SectionTag>Contacto</SectionTag>
            <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"clamp(2rem,3vw,3.2rem)", color:C.ink, marginBottom:"2.5rem", letterSpacing:"-0.03em", lineHeight:1.1 }}>
              Hagamos tu pedido<br /><span style={{ color:C.rose }}>realidad</span>
            </h2>
            {[
              { Icon:Phone,     label:"WhatsApp",  val:"+52 55 4140 2088" },
              { Icon:Facebook,  label:"Facebook",  val:"donachucherias"   },
              { Icon:MapPin,    label:"Ubicación", val:"Ciudad de México, CDMX" },
            ].map(({ Icon, label, val }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                style={{ display:"flex", gap:"1.1rem", alignItems:"center", paddingBottom:"1.5rem", marginBottom:"1.5rem", borderBottom:`1px solid ${C.borderLight}` }}
              >
                <motion.div
                  whileHover={{ backgroundColor:C.rose, color:C.white }} transition={{ duration:0.22 }}
                  style={{ width:46, height:46, borderRadius:12, backgroundColor:C.rosePale, display:"flex", alignItems:"center", justifyContent:"center", color:C.rose, flexShrink:0 }}
                ><Icon size={16} strokeWidth={1.5}/></motion.div>
                <div>
                  <p style={{ fontFamily:sans, fontSize:"0.46rem", letterSpacing:"0.26em", textTransform:"uppercase", color:C.inkFaint, margin:"0 0 3px" }}>{label}</p>
                  <p style={{ fontFamily:sans, fontSize:"0.96rem", color:C.ink, margin:0 }}>{val}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ backgroundColor:C.white, padding:"3.5rem", borderRadius:12, boxShadow:"0 12px 64px rgba(42,21,24,0.09)", border:`1px solid ${C.borderLight}` }}
          >
            <p style={{ fontFamily:sans, fontSize:"0.48rem", letterSpacing:"0.36em", textTransform:"uppercase", color:C.rose, marginBottom:"0.7rem" }}>Escríbenos</p>
            <h3 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"2rem", color:C.ink, marginBottom:"0.75rem", letterSpacing:"-0.02em" }}>¿Lista para ordenar?</h3>
            <p style={{ fontFamily:sans, fontSize:"0.87rem", lineHeight:1.88, color:C.inkSoft, fontWeight:300, marginBottom:"2rem" }}>
              Contáctanos y creamos algo especial para ti. Personalizamos cada pedido con mucho cariño. Respuesta en menos de 10 minutos.
            </p>
            <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03, boxShadow:"0 10px 30px rgba(218,99,122,0.32)" }} whileTap={{ scale:0.97 }}
              style={{ fontFamily:sans, fontSize:"0.57rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"1.05rem 2rem", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:8, borderRadius:100, marginBottom:"0.9rem", boxShadow:"0 4px 18px rgba(218,99,122,0.26)" }}
            ><MessageCircle size={14}/> Escribir por WhatsApp</motion.a>
            <div style={{ display:"flex", gap:8 }}>
              {[["Facebook",fbUrl],["WhatsApp directo",waUrl]].map(([l,href]) => (
                <motion.a key={l} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ borderColor:C.rose, color:C.rose }}
                  style={{ flex:1, textAlign:"center", padding:"0.7rem", border:`1px solid ${C.borderLight}`, fontFamily:sans, fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:C.inkSoft, textDecoration:"none", borderRadius:100 }}
                >{l}</motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ backgroundColor:C.peach, borderTop:`1px solid ${C.border}`, padding:"2.5rem 0" }}>
        <div style={{ maxWidth:1360, margin:"0 auto", padding: isMobile ? "0 1.25rem" : "0 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:"1.1rem", color:C.rose, margin:"0 0 4px" }}>Doña Chucherías</p>
            <p style={{ fontFamily:sans, fontSize:"0.72rem", color:C.inkSoft, margin:0, fontWeight:300 }}>Tablas & Regalos Gourmet · Hecho con amor en CDMX.</p>
          </div>
          <p style={{ fontFamily:sans, fontSize:"0.46rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.inkFaint, margin:0 }}>© Doña Chucherías · CDMX · Todos los derechos reservados</p>
          <div style={{ display:"flex", gap:"0.7rem" }}>
            {([[Facebook,fbUrl],[MessageCircle,waUrl]] as const).map(([Icon,href],i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.14, backgroundColor:C.rose, color:C.white }} transition={{ duration:0.2 }}
                style={{ width:38, height:38, borderRadius:"50%", backgroundColor:C.roseLight, display:"flex", alignItems:"center", justifyContent:"center", color:C.rose, textDecoration:"none" }}
              ><Icon size={16}/></motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ MODAL OCASIONES ══ */}
      <AnimatePresence>
        {activeOccasion && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setActiveOccasion(null)}
            style={{ position:"fixed", inset:0, zIndex:100, backgroundColor:"rgba(42,21,24,0.7)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}
          >
            <motion.div
              initial={{ opacity:0, scale:0.93, y:24 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.93, y:24 }}
              transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
              onClick={e => e.stopPropagation()}
              style={{ backgroundColor:C.white, borderRadius:12, overflow:"hidden", maxWidth:860, width:"100%", maxHeight:"85vh", display:"flex", flexDirection:"column", boxShadow:"0 32px 80px rgba(42,21,24,0.25)" }}
            >
              {/* Header modal */}
              <div style={{ padding:"1.5rem 2rem", borderBottom:`1px solid ${C.borderLight}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
                <div>
                  <p style={{ fontFamily:sans, fontSize:"0.46rem", letterSpacing:"0.3em", textTransform:"uppercase", color:C.rose, margin:"0 0 4px" }}>Para cada ocasión</p>
                  <h3 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:"normal", fontSize:"1.6rem", color:C.ink, margin:0 }}>{activeOccasion.title}</h3>
                </div>
                <div style={{ display:"flex", gap:"0.75rem", alignItems:"center" }}>
                  <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale:1.03 }}
                    style={{ fontFamily:sans, fontSize:"0.5rem", letterSpacing:"0.16em", textTransform:"uppercase", color:C.white, backgroundColor:C.rose, padding:"0.6rem 1.25rem", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, borderRadius:100 }}
                  ><MessageCircle size={12}/> Pedir</motion.a>
                  <motion.button onClick={() => setActiveOccasion(null)}
                    whileHover={{ backgroundColor:C.peach }}
                    style={{ background:"none", border:`1px solid ${C.borderLight}`, borderRadius:"50%", width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.inkSoft }}
                  ><X size={16} strokeWidth={1.5}/></motion.button>
                </div>
              </div>
              {/* Fotos */}
              <div style={{ overflowY:"auto", padding:"1.5rem 2rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {activeOccasion.photos.map((src, i) => (
                    <motion.div key={i}
                      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                      style={{ overflow:"hidden", borderRadius:8, aspectRatio:"4/3" }}
                    >
                      <motion.img src={src} alt={`${activeOccasion.title} ${i+1}`}
                        whileHover={{ scale:1.05 }} transition={{ duration:0.5 }}
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
        initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:2.2, type:"spring", stiffness:260, damping:20 }}
        whileHover={{ scale:1.1 }} whileTap={{ scale:0.92 }}
        style={{ position:"fixed", bottom:"1.75rem", right:"1.75rem", zIndex:60, width:"3.4rem", height:"3.4rem", borderRadius:"50%", backgroundColor:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 32px rgba(37,211,102,0.42)", border:"3px solid #fff" }}
      >
        <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.737 5.47 2.027 7.774L0 32l8.44-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.773-1.854l-.486-.29-5.01 1.195 1.24-4.875-.318-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.829c-.398-.2-2.355-1.163-2.72-1.295-.366-.133-.633-.2-.9.2-.266.398-1.031 1.295-1.265 1.562-.233.266-.465.3-.863.1-.398-.2-1.681-.62-3.202-1.977-1.184-1.056-1.983-2.36-2.216-2.758-.233-.398-.025-.614.175-.812.18-.178.398-.465.598-.698.2-.233.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.9-2.17-1.232-2.97-.324-.78-.654-.674-.9-.686l-.766-.013c-.266 0-.698.1-.1064.498-.366.399-1.397 1.364-1.397 3.326s1.43 3.857 1.63 4.123c.199.266 2.815 4.3 6.822 6.028.953.412 1.697.657 2.278.842.957.304 1.828.261 2.516.158.768-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z"/>
        </svg>
      </motion.a>

    </div>
  );
}
