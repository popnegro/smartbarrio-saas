# SmartBarrio — Architecture

## Principle

SmartBarrio is a multi-tenant SaaS for local businesses. The category configures capabilities; it does not create a separate product implementation.

## Layers

```text
app/          Next.js App Router, routes and server entrypoints
components/   Presentation and reusable UI
lib/          Domain/application utilities and adapters
 data/        Seed/demo data only until persistence is connected
types/        Shared domain contracts
```

## Domain hierarchy

```text
Tenant
  └── Business
       ├── Category
       ├── Products
       ├── Services
       ├── Vehicles
       ├── Gallery
       ├── OpeningHours
       ├── Promotions
       └── Leads
```

Every tenant-owned record must carry a `business_id` directly or be reachable through a tenant-owned parent. Authorization must enforce the tenant boundary at the data-access layer, not only in the UI.

## Category model

Categories are declarative configurations in `lib/categories.ts`. A category exposes a set of modules such as products, services, vehicles, promotions, gallery, hours, WhatsApp and leads.

Adding a category should normally require configuration and content, not a new page implementation.

## Public routing target

```text
/
/[category]/[businessSlug]
```

Business pages should be Server Components, resolve the business from persistence, generate metadata from business data and return `notFound()` for unknown/inactive public businesses.

## Dashboard target

```text
/dashboard
/dashboard/business
/dashboard/products
/dashboard/services
/dashboard/vehicles
/dashboard/gallery
/dashboard/hours
/dashboard/promotions
/dashboard/whatsapp
/dashboard/leads
```

The dashboard is authenticated and tenant-scoped.

## Data rule

The current demo data is explicitly transitional. It exists to preserve the visual prototype while persistence is introduced. Production UI must not use hardcoded demo metrics, leads or business records as its source of truth.

## Non-goals for the foundation

Do not add ecommerce, marketplace functionality, AI chatbot behavior, advanced CRM, billing, campaigns or mobile applications until the core multi-tenant product is stable.
