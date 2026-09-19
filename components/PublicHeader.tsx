import Link from 'next/link';
import {LogIn} from 'lucide-react';

export function PublicHeader() {
  return <header className="public-nav">
    <Link className="brand" href="/"><span className="brand-mark">SB</span><span>SmartBarrio</span></Link>
    <nav className="public-menu" aria-label="Navegación principal">
      <Link href="/#top">Inicio</Link>
      <Link href="/#beneficios">Beneficios</Link>
      <Link href="/#categorias-negocios">Categorías de negocios</Link>
      <Link href="/#inversion">Inversión</Link>
      <a href="https://socios.pedidosya.com.ar/es#faq" target="_blank" rel="noreferrer">Preguntas frecuentes</a>
      <a href="https://socios.pedidosya.com.ar/es" target="_blank" rel="noreferrer">Registrá tu negocio</a>
    </nav>
    <div className="public-nav-right"><Link className="login-cta" href="/admin"><LogIn size={15}/> Login</Link></div>
  </header>;
}