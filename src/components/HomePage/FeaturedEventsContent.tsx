import { getEvents, getSite } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { EventFeatured } from "@/components/EventFeatured";
import { VenueImage } from "@/components/VenueImage";

import { ColumnFull, TwoColumnLayout } from "../layout";

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
        <TwoColumnLayout>
          <ColumnFull className="flex flex-row justify-between gap-12 bg-darkgreen p-8">
            <div className="flex flex-col gap-8 sm:grid sm:grid-flow-row md:grid-cols-3">
              {featuredEvents.records.map((event) => (
                <EventFeatured
                  key={event.id}
                  event={event}
                  site={site}
                  className="gap-y-12"
                />
              ))}
            </div>
          </ColumnFull>
        </TwoColumnLayout>
      ) : null}
    </>
  );
}
