import {MetadataRoute} from 'next';
import {categories,commerces} from '@/lib/catalog';
export default function sitemap():MetadataRoute.Sitemap{const base='https://smartbarrio.vercel.app';return [{url:base,changeFrequency:'weekly',priority:1},{url:`${base}/#categorias`,priority:.8},...categories.map(c=>({url:`${base}/categoria/${c.slug}`,changeFrequency:'weekly' as const,priority:.8})),...commerces.map(c=>({url:`${base}/comercio/${c.slug}`,changeFrequency:'weekly' as const,priority:.7}))]}
