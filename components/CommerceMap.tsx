'use client';

import {useMemo,useState} from 'react';
import {ExternalLink,MapPin,Search} from 'lucide-react';
import type {Commerce} from '@/lib/data';

export function CommerceMap({commerces}:{commerces:Commerce[]}){
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(commerces[0]?.slug ?? '');

  const filtered=useMemo(()=>{
    const q=query.trim().toLocaleLowerCase('es');
    if(!q)return commerces;
    return commerces.filter(c=>[c.name,c.categoryLabel,c.zoneLabel,c.address,c.description].join(' ').toLocaleLowerCase('es').includes(q));
  },[query,commerces]);

  const active=filtered.find(c=>c.slug===selected) ?? filtered[0];
  const mapQuery=active?.mapQuery || 'Las Heras, Mendoza';
  const embedUrl='https://www.google.com/maps?q='+encodeURIComponent(mapQuery)+'&output=embed';
  const externalUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mapQuery);

  return <section className="commerce-map-section" aria-labelledby="mapa-comercios">
    <div className="section-head map-section-head">
      <div>
        <span className="kicker">EXPLORÁ CERCA TUYO</span>
        <h2 id="mapa-comercios">Encontrá comercios en el mapa.</h2>
        <p className="map-context">Buscá por comercio, categoría, ubicación o dirección. Seleccioná un resultado para centrar el mapa.</p>
      </div>
      <span className="section-note">{filtered.length} {filtered.length===1?'comercio':'comercios'}</span>
    </div>
    <div className="map-explorer">
      <div className="map-panel">
        <iframe title={active ? `Ubicación de ${active.name}` : 'Mapa de comercios'} src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        {active && <div className="map-location-card">
          <span className="map-pin"><MapPin size={16}/></span>
          <div><strong>{active.name}</strong><span>{active.address}</span></div>
          <a href={externalUrl} target="_blank" rel="noreferrer" aria-label={`Abrir ubicación de ${active.name} en Google Maps`}><ExternalLink size={15}/></a>
        </div>}
      </div>
      <div className="map-results">
        <label className="context-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="¿Qué buscás cerca tuyo?" aria-label="Buscar comercios, categorías o ubicaciones"/></label>
        <div className="map-result-list" aria-live="polite">
          {filtered.map(c=><button type="button" className={c.slug===active?.slug?'map-result active':'map-result'} key={c.slug} onClick={()=>setSelected(c.slug)}>
            <span className={'commerce-thumb '+c.accent}>{c.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span>
            <span><strong>{c.name}</strong><small>{c.categoryLabel} · {c.zoneLabel}</small><small>{c.address}</small></span>
            <MapPin size={14}/>
          </button>)}
          {!filtered.length && <div className="map-empty"><strong>No encontramos comercios.</strong><span>Probá con otra categoría, localidad o dirección.</span></div>}
        </div>
      </div>
    </div>
  </section>
}