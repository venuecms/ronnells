import { getEvents, getSite } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { EventFeatured } from "@/components/EventFeatured";
import { VenueImage } from "@/components/VenueImage";

export async function FeaturedEventsContent({ locale }: { locale: string }) {
  await connection();

  const [{ data: featuredEvents }, { data: site }] = await Promise.all([
    getEvents({ limit: 6, featured: true }),
    getSite(),
  ]);

  if (!site) return null;

  const templateSettings = (site?.settings?.publicSite?.template?.config ??
    {}) as { showHeroImage?: boolean; noHeroOverlay?: boolean };
  const { showHeroImage, noHeroOverlay } = templateSettings;
  const webSiteSettings = site.webSites ? site.webSites[0] : undefined;

  return (
    <>
      {featuredEvents?.records.length ? (
        <div className="flex flex-col pb-16">
          {featuredEvents.records.map((event) => (
            <EventFeatured
              key={event.id}
              event={event}
              site={site}
              className="lg:pb-64"
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
