import { breadcrumbList, type Crumb } from "@/lib/structured-data";

/** An inline JSON-LD script. "<" is escaped so the data can't close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The BreadcrumbList for an inner page. */
export function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  return <JsonLd data={breadcrumbList(trail)} />;
}
