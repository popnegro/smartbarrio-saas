import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORY_CONFIG, getCategoryByPublicSlug } from '@/lib/categories';
import { DEMO_BUSINESSES } from '@/data/demo';
import { slugify } from '@/lib/slug';

const SITE_URL = 'https://smartbarrio.vercel.app';

type PageProps = {
  params: Promise<{ category: string; businessSlug: string }>;
};

function findBusiness(categorySlug: string, businessSlug: string) {
  const category = getCategoryByPublicSlug(categorySlug);
  if (!category) return undefined;
  return DEMO_BUSINESSES.find(
    (business) => business.key === category.key && slugify(business.name) === businessSlug,
  );
}

export async function generateStaticParams() {
  return DEMO_BUSINESSES.map((business) => ({
    category: CATEGORY_CONFIG[business.key].publicSlug,
    businessSlug: slugify(business.name),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, businessSlug } = await params;
  const business = findBusiness(categorySlug, businessSlug);
  if (!business) return {};
  return {
    title: `${business.name} | ${business.category} en Mendoza | SmartBarrio`,
    description: `${business.description} ${business.address}. Contactá por WhatsApp.`,
    alternates: { canonical: `${SITE_URL}/${categorySlug}/${businessSlug}` },
    openGraph: {
      title: business.name,
      description: business.description,
      url: `${SITE_URL}/${categorySlug}/${businessSlug}`,
      type: 'website',
    },
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { category: categorySlug, businessSlug } = await params;
  const business = findBusiness(categorySlug, businessSlug);
  if (!business) notFound();

  const category = getCategoryByPublicSlug(categorySlug);
  if (!category) notFound();

  const whatsappUrl = `https://wa.me/${business.wa}?text=${encodeURIComponent(`Hola ${business.name}, vi su página en SmartBarrio y quiero hacer una consulta.`)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    telephone: business.phone,
    url: `${SITE_URL}/${categorySlug}/${businessSlug}`,
    address: { '@type': 'PostalAddress', streetAddress: business.address, addressLocality: 'Mendoza', addressCountry: 'AR' },
    openingHours: business.hours,
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2] text-[#302D28]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7F203D]">
          {category.label} · Mendoza
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{business.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 opacity-80">{business.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-full bg-[#7F203D] px-6 py-3 font-semibold text-white" href={whatsappUrl} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
          <a className="rounded-full border border-[#302D28]/20 px-6 py-3 font-semibold" href={`tel:${business.phone}`}>Llamar</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-2 lg:px-10">
        <article className="rounded-3xl border border-[#302D28]/10 bg-white p-7">
          <h2 className="text-xl font-bold">Productos</h2>
          <ul className="mt-5 space-y-3">{business.products.map((item) => <li key={item} className="rounded-xl bg-[#FFF8F2] px-4 py-3">{item}</li>)}</ul>
        </article>
        <article className="rounded-3xl border border-[#302D28]/10 bg-white p-7">
          <h2 className="text-xl font-bold">Servicios</h2>
          <ul className="mt-5 space-y-3">{business.services.map((item) => <li key={item} className="rounded-xl bg-[#FFF8F2] px-4 py-3">{item}</li>)}</ul>
        </article>
        <article className="rounded-3xl border border-[#302D28]/10 bg-white p-7 md:col-span-2">
          <h2 className="text-xl font-bold">Información</h2>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-3"><p><strong>Dirección</strong><br />{business.address}</p><p><strong>Horarios</strong><br />{business.hours}</p><p><strong>Teléfono</strong><br />{business.phone}</p></div>
          {business.special && <p className="mt-6 border-t border-[#302D28]/10 pt-5">{business.special}</p>}
        </article>
      </section>

      <footer className="border-t border-[#302D28]/10 px-6 py-8 text-center text-sm opacity-60">Presencia digital para comercios locales · SmartBarrio</footer>
    </main>
  );
}
