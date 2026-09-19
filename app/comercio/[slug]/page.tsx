import {CommerceClient} from './CommerceClient';
import {getCommerce} from '@/lib/data';
import {notFound} from 'next/navigation';
export default async function CommercePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const commerce=getCommerce(slug);
  if(!commerce) notFound();
  return <CommerceClient commerce={commerce}/>;
}