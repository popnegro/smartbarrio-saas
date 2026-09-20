'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ChevronRight,MapPin,Phone,MessageCircle,Navigation,X,Plus,Minus} from 'lucide-react';
import type {Commerce,Product} from '@/lib/data';
import {PublicHeader} from '@/components/PublicHeader';
import {PublicFooter} from '@/components/PublicFooter';

const kioskImages:Record<string,string>={
  bebidas:'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"><rect width="640" height="420" rx="28" fill="#edf4e8"/><circle cx="150" cy="210" r="90" fill="#d7ef47"/><rect x="115" y="95" width="70" height="230" rx="28" fill="#164a36"/><rect x="128" y="112" width="44" height="196" rx="20" fill="#fff" opacity=".18"/><text x="320" y="185" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#172019">Bebidas</text><text x="320" y="230" font-family="Arial,sans-serif" font-size="24" fill="#69746c">frías</text></svg>`),
  snacks:'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"><rect width="640" height="420" rx="28" fill="#fff4df"/><path d="M125 105h120l-12 210H137z" fill="#ef9b45"/><path d="M140 120h90" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/><circle cx="183" cy="215" r="35" fill="#fff" opacity=".9"/><text x="300" y="185" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#172019">Snacks</text><text x="300" y="230" font-family="Arial,sans-serif" font-size="24" fill="#69746c">para llevar</text></svg>`),
  golosinas:'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"><rect width="640" height="420" rx="28" fill="#f8e9ef"/><path d="M105 145q80-55 160 0v105q-80 55-160 0z" fill="#c97895"/><path d="M125 160q60-35 120 0" fill="none" stroke="#fff" stroke-width="12" opacity=".8"/><circle cx="185" cy="215" r="30" fill="#d7ef47"/><text x="310" y="185" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#172019">Golosinas</text><text x="310" y="230" font-family="Arial,sans-serif" font-size="24" fill="#69746c">variedades</text></svg>`)
};
const productImage=(p:Product)=>p.imageType?kioskImages[p.imageType]:undefined;
export function CommerceClient({commerce}:{commerce:Commerce}) {
  const [cart,setCart]=useState<Record<string,number>>({});
  const [selected,setSelected]=useState<Product|null>(null);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const add=(slug:string)=>setCart(c=>({...c,[slug]:(c[slug]||0)+1}));
  const remove=(slug:string)=>setCart(c=>({...c,[slug]:Math.max(0,(c[slug]||0)-1)}));
  const wa='https://wa.me/'+commerce.wa+'?text='+encodeURIComponent('Hola '+commerce.name+', quiero consultar/pedir: '+commerce.products.filter(p=>cart[p.slug]).map(p=>p.name+' x'+cart[p.slug]).join(', '));
  return <div className="site-wrap">
    <PublicHeader/>
    <main className="public-main">
      <div className="breadcrumb"><Link href="/">Inicio</Link><ChevronRight size={14}/><Link href={'/categoria/'+commerce.category}>{commerce.categoryLabel}</Link><ChevronRight size={14}/><span>{commerce.name}</span></div>
      <section className="hero-card"><div className="hero-copy"><div className="eyebrow"><span className={'dot '+commerce.accent}></span>{commerce.categoryLabel} · {commerce.zoneLabel}</div><h1>{commerce.name}</h1><p>{commerce.description}</p><div className="hero-actions"><a className="btn primary" href={'https://wa.me/'+commerce.wa}><MessageCircle size={18}/> WhatsApp</a><a className="btn secondary" href={'tel:'+commerce.phone.replaceAll(' ','')}><Phone size={18}/> Llamar</a></div><div className="trust-row"><span><MapPin size={15}/> {commerce.address}</span><span>{commerce.hours}</span></div></div><div className={'hero-visual '+commerce.accent}><div className="visual-badge">{commerce.categoryLabel}</div><div className="visual-initials">{commerce.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="visual-caption"><MapPin size={15}/> {commerce.address}</div></div></section>
      <section className="info-strip"><div><MapPin/><strong>Encontranos</strong><span>{commerce.address}</span></div><div><strong>Horarios</strong><span>{commerce.hours}</span></div><div><Phone/><strong>Contacto</strong><span>{commerce.phone}</span></div><a className="route" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(commerce.mapQuery)} target="_blank" rel="noreferrer"><Navigation size={17}/> Cómo llegar <ArrowUpRight size={15}/></a></section>
      {commerce.promos?.map(p=><section className="promo" key={p}><strong>{p}</strong></section>)}
      <section className="section-head"><div><span className="kicker">CATÁLOGO</span><h2>Productos</h2></div><span className="section-note">{count} en pedido</span></section>
      <div className="content-grid"><div className="catalog-grid">{commerce.products.map(p=><button className="catalog-card" key={p.slug} onClick={()=>setSelected(p)}><div className={'catalog-img '+commerce.accent}>{productImage(p)?<img src={productImage(p)} alt={p.name}/>:<span>{p.imageLabel}</span>}</div><div><h3>{p.name}</h3><p>{p.price||'Consultar'} · {p.description}</p></div><ArrowUpRight size={16}/></button>)}</div><div className="service-list"><div className="service-head">Servicios</div>{commerce.services.map(s=><div className="service-row" key={s}><span>{s}</span><ChevronRight size={16}/></div>)}</div></div>
      <section className="contact-panel"><div><span className="kicker">PEDIDO LOCAL</span><h2>{count?'Tu pedido está listo':'Consultá por WhatsApp'}</h2><p>Disponibilidad, precios y servicios por WhatsApp.</p></div><a className="btn primary" href={count?wa:'https://wa.me/'+commerce.wa} target="_blank" rel="noreferrer"><MessageCircle size={18}/> {count?'Enviar pedido':'WhatsApp'}</a></section>
    </main><PublicFooter/>
    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="lead-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="kicker">PRODUCTO</span><h2>{selected.name}</h2></div><button className="icon-btn" onClick={()=>setSelected(null)}><X/></button></div><p>{selected.description}</p><strong>{selected.price||'Consultar precio'}</strong><div className="qty-row"><button className="icon-btn" onClick={()=>remove(selected.slug)}><Minus/></button><strong>{cart[selected.slug]||0}</strong><button className="icon-btn" onClick={()=>add(selected.slug)}><Plus/></button></div><button className="btn primary full" onClick={()=>add(selected.slug)}>Agregar al pedido</button></div></div>}
  </div>;
}