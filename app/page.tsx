'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {MapPin,Phone,MessageCircle,Clock3,ChevronRight,ArrowUpRight,Store,Settings2,Package,BriefcaseBusiness,Image as ImageIcon,Tag,Inbox,BarChart3,Search,Plus,CheckCircle2,Navigation,Menu,X,ExternalLink,ShoppingBasket,Carrot,Beef,Scissors,PawPrint,Heart} from 'lucide-react';

type CategoryKey='kiosco'|'minimercado'|'verduleria'|'carniceria'|'peluqueria'|'ferreteria'|'petshop'|'sexshop';
type Demo={key:CategoryKey;name:string;category:string;description:string;phone:string;wa:string;address:string;accent:string;hours:string;products:string[];services:string[];special?:string;promos?:string[];productImages?:string[]};
const demos:Demo[]=[
{key:'kiosco',name:'Kiosco La Esquina',category:'Kiosco',description:'Todo lo que necesitás para una pausa rápida, cerca de casa.',phone:'261 555 1040',wa:'5492615551040',address:'Av. Boulogne Sur Mer 742, Las Heras, Mendoza',accent:'orange',hours:'08:00–23:30',products:['Bebidas frías','Snacks','Golosinas','Cigarrillos'],productImages:['https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1621939514649-280e2aa9f2ad?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1603394630852-4f7b1f4d7f8f?auto=format&fit=crop&w=500&q=80'],services:['Recargas virtuales','Pago de servicios'],promos:['2 gaseosas + snack — promo del día']},
{key:'minimercado',name:'Mini Mercado San Juan',category:'Minimercado',description:'Compras de todos los días, rápidas y cerca de vos.',phone:'261 555 8855',wa:'5492615558855',address:'San Juan 1350, Las Heras, Mendoza',accent:'teal',hours:'07:30–22:30',products:['Almacén','Bebidas','Lácteos','Limpieza'],services:['Delivery en zona','Pedidos por WhatsApp'],special:'Delivery hasta 3 km',promos:['Envío gratis desde $18.000']},
{key:'verduleria',name:'Verdulería La Huerta',category:'Verdulería',description:'Frutas y verduras frescas para resolver tus compras del día.',phone:'261 555 1188',wa:'5492615551188',address:'Independencia 820, Las Heras, Mendoza',accent:'green',hours:'08:00–21:00',products:['Frutas de estación','Verduras frescas','Hojas verdes','Frutos secos'],services:['Pedidos por WhatsApp','Armado de bolsones'],special:'Productos frescos todos los días',promos:['Bolsones semanales disponibles']},
{key:'carniceria',name:'Carnicería El Buen Corte',category:'Carnicería',description:'Cortes seleccionados y atención cercana para tu compra semanal.',phone:'261 555 2299',wa:'5492615552299',address:'Ozamis 1510, Maipú, Mendoza',accent:'red',hours:'08:30–14:00 · 17:00–21:00',products:['Asado','Vacío','Milanesas','Hamburguesas'],services:['Pedidos por WhatsApp','Preparación de cortes'],special:'Cortes para parrilla y cocina',promos:['Consultá combos familiares']},
{key:'peluqueria',name:'Punto Barber',category:'Peluquería & Barbería',description:'Cortes, barba y servicios de cuidado personal con reserva previa.',phone:'261 555 3377',wa:'5492615553377',address:'Padre Vázquez 640, Maipú, Mendoza',accent:'violet',hours:'09:00–20:00',products:['Pomadas','Ceras','Shampoo'],services:['Corte masculino','Barba','Corte + barba','Coloración'],special:'Turnos por WhatsApp',promos:['Consultá disponibilidad de hoy']},
{key:'ferreteria',name:'Ferretería El Andino',category:'Ferretería',description:'Herramientas, materiales y soluciones para obra, hogar y mantenimiento.',phone:'261 555 6633',wa:'5492615556633',address:'Belgrano 1635, Maipú, Mendoza',accent:'amber',hours:'08:00–19:30',products:['Taladros','Pinturas','Tornillería','Herramientas'],services:['Corte de llaves','Asesoramiento'],special:'Stanley · Bosch · Makita · Truper'},
{key:'petshop',name:'Pet Shop Patitas',category:'PetShop',description:'Alimento, accesorios y productos para el cuidado de tus mascotas.',phone:'261 555 4488',wa:'5492615554488',address:'Maza 420, Maipú, Mendoza',accent:'blue',hours:'09:00–20:30',products:['Alimento balanceado','Correas','Juguetes','Higiene'],services:['Pedidos por WhatsApp','Delivery en zona'],special:'Perros · gatos · pequeños animales',promos:['Delivery sin cargo en compras seleccionadas']},
{key:'sexshop',name:'Íntima Store',category:'Sexshop',description:'Bienestar íntimo, privacidad y atención personalizada.',phone:'261 555 5599',wa:'5492615555599',address:'Zona Centro, Maipú, Mendoza',accent:'pink',hours:'10:00–21:00',products:['Bienestar íntimo','Lubricación','Accesorios','Cuidado personal'],services:['Consulta privada por WhatsApp','Envíos discretos'],special:'Atención confidencial y discreta'}
];
const cats:[CategoryKey,string][]=[
['kiosco','Kioscos'],['minimercado','Minimercados'],['verduleria','Verdulerías'],['carniceria','Carnicerías'],
['peluqueria','Peluquerías & Barberías'],['ferreteria','Ferreterías'],['petshop','PetShops'],['sexshop','Sexshops']
];
const categoryIcons:Record<CategoryKey,React.ElementType>={
  kiosco:Store,minimercado:ShoppingBasket,verduleria:Carrot,carniceria:Beef,
  peluqueria:Scissors,ferreteria:Package,petshop:PawPrint,sexshop:Heart
};

function IconButton({children,onClick,ariaLabel}:{children:React.ReactNode;onClick?:()=>void;ariaLabel?:string}){return <button className="icon-btn" onClick={onClick} aria-label={ariaLabel}>{children}</button>}
function PublicSite({demo,onDashboard,onCategory}:{demo:Demo;onDashboard:()=>void;onCategory:(k:CategoryKey)=>void}){const [lead,setLead]=useState(false);const [menu,setMenu]=useState(false);const [categoryMenu,setCategoryMenu]=useState(false); return <div className="site-wrap">
<header className="public-nav"><div className="brand"><span className="brand-mark">SB</span><span>SmartBarrio</span></div><div className="public-nav-right"><div className="category-menu-wrap"><button className="category-menu-trigger" onClick={()=>setCategoryMenu(!categoryMenu)} aria-expanded={categoryMenu}><Store size={16}/><span>Explorar categorías</span><ChevronRight className={categoryMenu?'rotate':''} size={15}/></button>{categoryMenu&&<div className="mega-menu"><div className="mega-menu-head"><div><span className="kicker">DESCUBRÍ COMERCIOS</span><h2>Explorá por categoría</h2></div><button className="mega-close" onClick={()=>setCategoryMenu(false)} aria-label="Cerrar categorías"><X size={17}/></button></div><div className="mega-grid">{cats.map(([k,n])=>{const Icon=categoryIcons[k];return <button className="mega-item" key={k} onClick={()=>{onCategory(k);setCategoryMenu(false)}}><span className={'category-icon '+k}><Icon size={22}/></span><span><strong>{n}</strong><small>Ver comercios</small></span><ArrowUpRight size={15}/></button>})}</div></div>}</div><span className="demo-pill">Sitio demo</span><button className="admin-link" onClick={onDashboard}><Settings2 size={16}/> Administrar</button><IconButton ariaLabel={menu ? "Cerrar menú" : "Abrir menú"} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</IconButton></div></header>
{menu&&<div className="mobile-menu"><button onClick={onDashboard}>Ir al dashboard</button><strong>Explorar categorías</strong>{cats.map(([k,n])=><button key={k} onClick={()=>{onCategory(k);setMenu(false)}}>{n}</button>)}</div>}
<main className="public-main">
<section className="hero-card"><div className="hero-copy"><div className="eyebrow"><span className={'dot '+demo.accent}></span>{demo.category} · Mendoza</div><h1>{demo.name}</h1><p>{demo.description}</p><div className="hero-actions"><a className="btn primary" href={`https://wa.me/${demo.wa}`} onClick={()=>{}}><MessageCircle size={18}/> WhatsApp</a><a className="btn secondary" href={`tel:${demo.phone.replaceAll(' ','')}`}><Phone size={18}/> Llamar</a></div><div className="trust-row"><span><CheckCircle2 size={15}/> Negocio verificado</span><span><Clock3 size={15}/> {demo.hours}</span></div></div><div className={'hero-visual '+demo.accent}><div className="visual-badge">{demo.category}</div><div className="visual-initials">{demo.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="visual-caption"><MapPin size={15}/> {demo.address}</div></div></section>
<section className="info-strip"><div><MapPin/><strong>Encontranos</strong><span>{demo.address}</span></div><div><Clock3/><strong>Horarios</strong><span>{demo.hours}</span></div><div><Phone/><strong>Contacto</strong><span>{demo.phone}</span></div><a className="route" href="#ubicacion"><Navigation size={17}/> Cómo llegar <ArrowUpRight size={15}/></a></section><section className="map-section"><div className="section-head"><div><span className="kicker">UBICACIÓN</span><h2>Encontralo en Las Heras o Maipú</h2></div><a className="text-btn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.address)}`} target="_blank" rel="noreferrer">Abrir mapa <ExternalLink size={15}/></a></div><div className="map-frame"><iframe title={`Mapa de ${demo.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(demo.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>
{demo.promos&&<section className="promo"><div><Tag/><div><small>Promoción</small><strong>{demo.promos[0]}</strong></div></div><ChevronRight/></section>}
<section className="section-head"><div><span className="kicker">LO QUE ENCONTRÁS</span><h2>{demo.services.length?'Productos y servicios':'Productos'}</h2></div><span className="section-note">Información del comercio</span></section>
<div className="content-grid"><div className="catalog-grid">{demo.products.map((p,i)=><article className="catalog-card" key={p}><div className={'catalog-img '+demo.accent} style={demo.productImages?.[i]?{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.2)),url(${demo.productImages[i]})`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}><span>{String(i+1).padStart(2,'0')}</span></div><div><h3>{p}</h3><p>{'Consultá por este producto.'}</p></div><ArrowUpRight size={16}/></article>)}</div>{demo.services.length>0&&<div className="service-list"><div className="service-head"><BriefcaseBusiness size={18}/><span>Servicios</span></div>{demo.services.map(s=><div className="service-row" key={s}><span>{s}</span><ChevronRight size={16}/></div>)}</div>}</div>
{demo.special&&<section className="special"><div><span className="kicker">ESPECIALIDADES</span><h2>{demo.special}</h2></div><div className="chips">{demo.special.split(' · ').map(s=><span key={s}>{s}</span>)}</div></section>}
<section className="contact-panel" id="ubicacion"><div><span className="kicker">¿TENÉS UNA CONSULTA?</span><h2>Hablemos por WhatsApp</h2><p>Preguntanos por productos, servicios, disponibilidad o cómo llegar.</p></div><div className="contact-actions"><button className="btn primary" onClick={()=>setLead(true)}><MessageCircle size={18}/> Enviar consulta</button><a className="btn secondary" href={`tel:${demo.phone.replaceAll(' ','')}`}><Phone size={18}/> {demo.phone}</a></div></section>
<footer><div className="brand"><span className="brand-mark">SB</span><span>{demo.name}</span></div><span>© 2026 · Presencia digital con SmartBarrio</span></footer>
</main>{lead&&<div className="modal-backdrop" onClick={()=>setLead(false)}><div className="lead-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="kicker">NUEVA CONSULTA</span><h2>Contactar a {demo.name}</h2></div><IconButton ariaLabel="Cerrar" onClick={()=>setLead(false)}><X/></IconButton></div><label>Nombre<input placeholder="Tu nombre"/></label><label>Teléfono<input placeholder="261..."/></label><label>Consulta<textarea placeholder="¿Qué necesitás consultar?"/></label><button className="btn primary full" onClick={()=>setLead(false)}><MessageCircle size={18}/> Registrar consulta y abrir WhatsApp</button><small>La consulta queda registrada en SmartBarrio aunque la conversación continúe por WhatsApp.</small></div></div>}</div>}

function Dashboard({demo,onPublic,onCategory}:{demo:Demo;onPublic:()=>void;onCategory:(k:CategoryKey)=>void}){const [section,setSection]=useState('Inicio');const nav=[['Inicio',BarChart3],['Mi negocio',Store],['Productos',Package],['Servicios',BriefcaseBusiness],['Promociones',Tag],['Fotos',ImageIcon],['Horarios',Clock3],['WhatsApp',MessageCircle],['Consultas',Inbox]] as const; const modules=nav; const leads=[['María Gómez','Quiero saber si tienen pastillas para Corolla','Producto','Nuevo'],['Carlos Pérez','¿Cuánto cuesta el service?','Servicio','Contactado'],['Lucía Sosa','Consulta por Toyota Corolla 2021','Vehículo','Interesado']]; return <div className="dash"><aside><div className="dash-brand"><span className="brand-mark">SB</span><div><strong>SmartBarrio</strong><small>Panel del comercio</small></div></div><div className="side-business"><div className="avatar">{demo.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><strong>{demo.name}</strong><span>{demo.category}</span></div></div><nav>{modules.map(([n,I])=><button className={section===n?'active':''} onClick={()=>setSection(n)} key={n}><I size={17}/>{n}</button>)}</nav><button className="view-public" onClick={onPublic}><ExternalLink size={16}/> Ver sitio público</button></aside><main className="dash-main"><header className="dash-top"><div><span className="kicker">PANEL ADMINISTRATIVO</span><h1>{section}</h1></div><div className="dash-top-actions"><button className="category-switch"><span className={'dot '+demo.accent}></span>{demo.category}</button><button className="btn secondary small" onClick={onPublic}>Ver sitio</button></div></header>{section==='Inicio'?<><div className="metric-grid">{[['Visitas','1.284','+18%'],['Consultas','37','+12%'],['WhatsApp','84','+24%'],['Cómo llegar','51','+9%']].map(m=><div className="metric" key={m[0]}><span>{m[0]}</span><strong>{m[1]}</strong><small>{m[2]} vs. período anterior</small></div>)}</div><div className="dash-grid"><section className="panel"><div className="panel-title"><div><span className="kicker">ÚLTIMOS 30 DÍAS</span><h2>Actividad</h2></div><span className="select">Últimos 30 días ▾</span></div><div className="chart"><div className="chart-bars">{[38,52,45,65,54,72,61,84,68,78,91,76,88,94,82,96,72,86,90,78,95,88,100,92,96,86,94,100,90,97].map((h,i)=><i style={{height:`${h}%`}} key={i}></i>)}</div><div className="chart-axis"><span>Hace 30 días</span><span>Hoy</span></div></div></section><section className="panel"><div className="panel-title"><div><span className="kicker">CAPTACIÓN</span><h2>Acciones</h2></div></div><div className="action-stat"><span><MessageCircle size={17}/> WhatsApp</span><strong>84</strong><div className="progress"><i style={{width:'82%'}}/></div></div><div className="action-stat"><span><Phone size={17}/> Llamadas</span><strong>46</strong><div className="progress"><i style={{width:'58%'}}/></div></div><div className="action-stat"><span><Navigation size={17}/> Cómo llegar</span><strong>51</strong><div className="progress"><i style={{width:'64%'}}/></div></div></section></div><section className="panel product-panel"><div className="panel-title"><div><span className="kicker">CATÁLOGO</span><h2>Productos destacados</h2></div><button className="text-btn" onClick={()=>setSection('Productos')}>Gestionar <ChevronRight size={15}/></button></div><div className="catalog-grid" style={{gridTemplateColumns:"1fr"}}>{demo.products.slice(0,4).map((p,i)=><div className="catalog-card" key={p}><div className={'catalog-img '+demo.accent} style={demo.productImages?.[i]?{backgroundImage:`url(${demo.productImages[i]})`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}><span>{String(i+1).padStart(2,'0')}</span></div><div><strong>{p}</strong><small>{demo.key==='kiosco'?'Disponible en catálogo demo':'Producto del comercio'}</small></div></div>)}</div></section><section className="panel leads-panel"><div className="panel-title"><div><span className="kicker">LEADS</span><h2>Consultas recientes</h2></div><button className="text-btn" onClick={()=>setSection('Consultas')}>Ver todas <ChevronRight size={15}/></button></div><div className="lead-table">{leads.map((l,i)=><div className="lead-row" key={i}><div className="lead-avatar">{l[0][0]}</div><div className="lead-info"><strong>{l[0]}</strong><span>{l[1]}</span></div><span className="lead-type">{l[2]}</span><span className={'status '+l[3].toLowerCase()}>{l[3]}</span><button className="wa-mini"><MessageCircle size={15}/> WhatsApp</button></div>)}</div></section></>:<section className="panel editor"><div className="panel-title"><div><span className="kicker">CONFIGURACIÓN</span><h2>{section}</h2></div><button className="btn primary small"><Plus size={16}/> Agregar</button></div><div className="form-grid"><label>Nombre comercial<input defaultValue={demo.name}/></label><label>Categoría<select defaultValue={demo.key}>{cats.map(c=><option key={c[0]} value={c[0]}>{c[1]}</option>)}</select></label><label>Teléfono<input defaultValue={demo.phone}/></label><label>WhatsApp<input defaultValue={demo.wa}/></label><label className="wide">Dirección<input defaultValue={demo.address}/></label><label className="wide">Descripción<textarea defaultValue={demo.description}/></label></div><div className="save-row"><span><CheckCircle2 size={16}/> Guardado en modo demo</span><button className="btn primary">Guardar cambios</button></div></section>}</main></div>}

function routeForCategory(k:CategoryKey){return '/'+({kiosco:'kioscos',minimercado:'minimercados',verduleria:'verdulerias',carniceria:'carnicerias',peluqueria:'peluquerias-barberias',ferreteria:'ferreterias',petshop:'petshops',sexshop:'sexshops'} as Record<CategoryKey,string>)[k]}

function CommercialHome(){
  return <div className="commercial-page">
    <header className="commercial-nav">
      <Link href="/" className="brand"><span className="brand-mark">SB</span><span>SmartBarrio</span></Link>
      <nav aria-label="Navegación principal">
        <a href="#beneficios">Beneficios</a>
        <a href="#categorias">Categorías de negocios</a>
        <a href="#inversion">Inversión</a>
        <a href="#preguntas">Preguntas frecuentes</a>
        <a href="#registro">Registrá tu negocio</a>
      </nav>
      <Link href="/admin" className="btn secondary small">Login</Link>
    </header>
    <main>
      <section className="commercial-hero">
        <div>
          <span className="kicker">SMARTBARRIO · LAS HERAS + MAIPÚ</span>
          <h1>Comercios y servicios de tu barrio.</h1>
          <p>Descubrí negocios cercanos, consultá productos y servicios y contactá directamente con el comercio.</p>
          <div className="hero-actions"><a href="#categorias" className="btn primary">Explorar categorías <ArrowUpRight size={17}/></a><a href="#registro" className="btn secondary">Registrá tu negocio</a></div>
        </div>
        <div className="commercial-hero-panel">
          <span className="kicker">DESCUBRÍ CERCA TUYO</span>
          <strong>Las Heras · Maipú</strong>
          <p>Un punto de entrada simple para encontrar comercios locales.</p>
          <div className="commercial-search"><Search size={17}/><span>¿Qué necesitás?</span><span>Buscar</span></div>
        </div>
      </section>
      <section id="beneficios" className="commercial-section">
        <div className="section-head"><div><span className="kicker">BENEFICIOS</span><h2>Una experiencia directa para vecinos y comercios.</h2></div></div>
        <div className="benefit-grid">
          <article><MapPin size={20}/><h3>Comercios cercanos</h3><p>Explorá opciones de Las Heras y Maipú con ubicación y horarios visibles.</p></article>
          <article><MessageCircle size={20}/><h3>Contacto directo</h3><p>Consultá por WhatsApp o teléfono sin pasos innecesarios.</p></article>
          <article><Store size={20}/><h3>Presencia para negocios</h3><p>Un catálogo digital simple para mostrar productos, servicios y promociones.</p></article>
        </div>
      </section>
      <section id="categorias" className="commercial-section">
        <div className="section-head"><div><span className="kicker">CATEGORÍAS</span><h2>Elegí qué estás buscando.</h2></div><span className="section-note">PMV local</span></div>
        <div className="category-card-grid commercial-category-grid">{cats.map(([k,n])=>{const I=categoryIcons[k];return <Link href={routeForCategory(k)} className="category-card" key={k}><span className={'category-icon '+k}><I size={21}/></span><span className="category-card-copy"><strong>{n}</strong><small>Ver comercios</small></span><ArrowUpRight size={15}/></Link>})}</div>
      </section>
      <section id="inversion" className="commercial-section">
        <div className="section-head"><div><span className="kicker">INVERSIÓN</span><h2>Presencia digital para tu negocio.</h2></div></div>
        <div className="price-grid"><article><span className="kicker">BÁSICO</span><strong>$150.000</strong><p>Alta y presencia digital del comercio.</p><a href="#registro" className="text-btn">Quiero participar <ChevronRight size={15}/></a></article><article><span className="kicker">MENSUAL</span><strong>$75.000/mes</strong><p>Acompañamiento y potenciación continua de la presencia.</p><a href="#registro" className="text-btn">Consultar <ChevronRight size={15}/></a></article></div>
      </section>
      <section id="preguntas" className="commercial-section faq-section">
        <div><span className="kicker">PREGUNTAS FRECUENTES</span><h2>¿Cómo funciona?</h2><p>SmartBarrio conecta la búsqueda del vecino con la información del comercio y su contacto directo.</p></div>
        <a className="btn secondary" href="https://socios.pedidosya.com.ar/es#faq" target="_blank" rel="noreferrer">Ver referencia FAQ <ExternalLink size={15}/></a>
      </section>
      <section id="registro" className="commercial-register">
        <div><span className="kicker">REGISTRÁ TU NEGOCIO</span><h2>Sumá tu comercio al PMV.</h2><p>Dejanos tus datos y coordinamos la publicación de tu presencia digital.</p></div>
        <a className="btn primary" href="mailto:hola@smartbarrio.ar">Quiero registrar mi negocio <ArrowUpRight size={17}/></a>
      </section>
    </main>
    <footer className="commercial-footer"><div className="brand"><span className="brand-mark">SB</span><span>SmartBarrio</span></div><span>© 2026 · Marketplace local</span></footer>
    <style jsx global>{`
      .commercial-page{min-height:100vh;background:var(--paper)}
      .commercial-nav{height:72px;padding:0 max(24px,calc((100vw - 1180px)/2));display:flex;align-items:center;gap:28px;background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
      .commercial-nav nav{display:flex;gap:20px;align-items:center;flex:1;justify-content:center}
      .commercial-nav nav a{font-size:12px;font-weight:700;color:#526057}
      .commercial-nav nav a:hover{color:var(--brand)}
      .commercial-hero{max-width:1180px;margin:auto;padding:72px 24px 60px;display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:center}
      .commercial-hero h1{font-family:Manrope;font-size:58px;line-height:1.01;letter-spacing:-.06em;max-width:700px;margin:14px 0 20px}
      .commercial-hero p{font-size:18px;line-height:1.55;color:var(--muted);max-width:640px}
      .commercial-hero-panel{background:#fff;border:1px solid var(--line);border-radius:22px;padding:30px;min-height:250px;display:flex;flex-direction:column;justify-content:center}
      .commercial-hero-panel strong{font-family:Manrope;font-size:30px;letter-spacing:-.04em;margin-top:8px}
      .commercial-hero-panel p{font-size:14px;margin:10px 0 20px}
      .commercial-search{display:flex;align-items:center;gap:9px;border:1px solid var(--line);border-radius:11px;padding:12px;color:#77817a;font-size:12px}.commercial-search span:last-child{margin-left:auto;font-weight:800;color:var(--brand)}
      .commercial-section{max-width:1180px;margin:auto;padding:42px 24px}.commercial-section>.section-head{margin-bottom:20px}.commercial-section>.section-head h2{max-width:700px}
      .benefit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.benefit-grid article{background:#fff;border:1px solid var(--line);border-radius:15px;padding:22px}.benefit-grid h3{font-family:Manrope;font-size:17px;margin:18px 0 7px}.benefit-grid p{font-size:12px;color:var(--muted);line-height:1.5;margin:0}.benefit-grid svg{color:#5b7667}
      .commercial-category-grid{grid-template-columns:repeat(4,1fr)}.commercial-category-grid .category-card{min-height:98px}
      .price-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.price-grid article{background:#fff;border:1px solid var(--line);border-radius:15px;padding:24px}.price-grid strong{display:block;font-family:Manrope;font-size:31px;margin:12px 0 8px}.price-grid p{color:var(--muted);font-size:12px;min-height:34px}
      .faq-section{display:flex;justify-content:space-between;gap:25px;align-items:center;background:#eef3ea;border-radius:18px;margin-top:18px}.faq-section h2{font-family:Manrope;font-size:29px;margin:6px 0}.faq-section p{font-size:13px;color:var(--muted);max-width:650px}
      .commercial-register{max-width:1180px;margin:24px auto 0;padding:35px 24px;background:var(--brand);color:#fff;border-radius:20px;display:flex;justify-content:space-between;align-items:center;gap:20px}.commercial-register h2{font-family:Manrope;font-size:31px;letter-spacing:-.04em;margin:7px 0}.commercial-register p{color:#d5e0d8;font-size:13px}.commercial-register .btn.primary{background:#d7ef47;color:#172019}
      .commercial-footer{max-width:1180px;margin:auto;padding:30px 24px 45px;display:flex;justify-content:space-between;color:#77817a;font-size:11px}
      @media(max-width:900px){.commercial-nav nav{display:none}.commercial-hero{grid-template-columns:1fr;padding-top:45px}.commercial-hero h1{font-size:45px}.commercial-category-grid{grid-template-columns:repeat(2,1fr)}.benefit-grid{grid-template-columns:1fr}.faq-section,.commercial-register{margin-left:15px;margin-right:15px}.price-grid{grid-template-columns:1fr}}
      @media(max-width:620px){.commercial-nav{padding:0 15px}.commercial-nav .btn{margin-left:auto}.commercial-hero{padding:38px 15px}.commercial-hero h1{font-size:37px}.commercial-section{padding:32px 15px}.commercial-category-grid{grid-template-columns:1fr}.commercial-register{display:block;padding:28px 20px}.commercial-register .btn{margin-top:18px}.commercial-footer{display:grid;gap:12px}}
    `}</style>
  </div>
}

function CategoryLanding({category}:{category:CategoryKey}){
  const d=demos.find(x=>x.key===category)!;
  return <div className="site-wrap"><header className="public-nav"><Link href="/" className="brand"><span className="brand-mark">SB</span><span>SmartBarrio</span></Link><div className="public-nav-right"><Link className="btn secondary small" href="/">Inicio</Link></div></header><main className="public-main"><div className="section-head"><div><span className="kicker">CATEGORÍA</span><h2>{d.category}</h2><p className="category-explorer-note">Comercios disponibles en el PMV.</p></div></div><div className="category-card-grid"><Link href={routeForCategory(category)+'/nuovo-market'} className="category-card"><span className={'category-icon '+d.accent}><Store size={21}/></span><span className="category-card-copy"><strong>{d.name}</strong><small>{d.address}</small></span><ArrowUpRight size={15}/></Link></div></main></div>
}

function NotFoundDemo(){return <div className="site-wrap"><main className="public-main"><section className="hero-card"><div className="hero-copy"><span className="kicker">SMARTBARRIO</span><h1>Página no disponible</h1><p>La ruta solicitada todavía no forma parte del PMV.</p><Link href="/" className="btn primary">Volver al inicio</Link></div></section></main></div>}

export default function App(){
  const pathname=usePathname();
  const router=useRouter();
  const segments=pathname.split('/').filter(Boolean);
  const categorySlugs={kioscos:'kiosco',minimercados:'minimercado',verdulerias:'verduleria',carnicerias:'carniceria',peluquerias:'peluqueria','peluquerias-barberias':'peluqueria',ferreterias:'ferreteria',petshops:'petshop',sexshops:'sexshop'} as Record<string,CategoryKey>;
  if(pathname==='/') return <CommercialHome/>;
  if(pathname==='/admin') {const demo=demos[0];return <Dashboard demo={demo} onPublic={()=>router.push('/kioscos/nuovo-market')} onCategory={(k)=>router.push(routeForCategory(k))}/>;}
  const category=categorySlugs[segments[0]];
  if(category && segments.length===1) return <CategoryLanding category={category}/>;
  if(category && segments.length===2) {
    const slug=segments[1];
    const demo=category==='kiosco' && slug==='nuovo-market' ? demos.find(d=>d.key==='kiosco') : demos.find(d=>d.key===category);
    if(!demo) return <NotFoundDemo/>;
    return <PublicSite demo={demo} onDashboard={()=>router.push('/admin')} onCategory={(k)=>router.push(routeForCategory(k))}/>;
  }
  return <NotFoundDemo/>;
}
