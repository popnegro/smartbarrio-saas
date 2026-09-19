import Link from 'next/link';

export function PublicFooter() {
  return <footer className="public-footer">
    <div>
      <Link className="footer-brand" href="/">SmartBarrio</Link>
      <p>Marketplace local para descubrir comercios, productos y servicios.</p>
    </div>
    <nav aria-label="Navegación del pie">
      <Link href="/">Inicio</Link>
      <Link href="/categoria/kioscos">Categorías</Link>
      <Link href="/#zonas">Zonas</Link>
      <Link href="/admin">Administrar</Link>
    </nav>
    <small>PMV · Mendoza</small>
  </footer>;
}