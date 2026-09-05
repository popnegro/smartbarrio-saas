import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'SmartBarrio — Presencia digital para comercios locales', description: 'PMV SmartBarrio: sitios profesionales para comercios locales de Mendoza.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
