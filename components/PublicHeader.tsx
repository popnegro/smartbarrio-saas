import Link from 'next/link';
import {Store} from 'lucide-react';

export function PublicHeader() {
  return <header className="public-nav">
    <Link className="brand" href="/">
      <span className="brand-mark">SB</span>
      <span>SmartBarrio</span>
    </Link>
    <nav className="public-menu" aria-label="Navegación principal">
      <Link href="/">Inicio</Link>
      <Link href="/categoria/kioscos">Categorías</Link>
      <Link href="/#comercios">Comercios</Link>
    </nav>
    <div className="public-nav-right">
      <Link className="admin-link" href="/admin"><Store size={15}/> Administrar</Link>
    </div>
  </header>;
}