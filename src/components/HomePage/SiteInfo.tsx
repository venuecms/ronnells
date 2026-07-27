import {
  LocalizedContent,
  VenueContent,
  getEvents,
  getLocalizedContent,
  getSite,
} from "@venuecms/sdk-next";
import { renderedStyles } from "@venuecms/sdk-next/utils";
import { connection } from "next/server";

import { EventFeatured } from "@/components/EventFeatured";
import { VenueImage } from "@/components/VenueImage";

import { ColumnLeft, ColumnRight, TwoColumnLayout } from "../layout";

export async function SiteInfo({ locale }: { locale: string }) {
  await connection();

  const [{ data: site }] = await Promise.all([getSite()]);

  if (!site) return null;

  const templateSettings = (site?.settings?.publicSite?.template?.config ??
    {}) as { showHeroImage?: boolean; noHeroOverlay?: boolean };
  const { showHeroImage, noHeroOverlay } = templateSettings;
  const webSiteSettings = site.webSites ? site.webSites[0] : undefined;
  const { content: siteContent } = webSiteSettings?.localizedContent?.length
    ? getLocalizedContent(webSiteSettings.localizedContent, locale)
    : { content: { content: site.description } as LocalizedContent };
  return (
    <>
      {showHeroImage ? (
        <TwoColumnLayout className="lg:gap-12">
          <ColumnRight className="py-8">
            <VenueImage className="w-full" image={webSiteSettings?.image} />
          </ColumnRight>
          <ColumnLeft className="justify-center gap-6 p-4">
            <img
              className="hidden md:block"
              src="/logo.svg"
              alt="Rönnells Antikvariat Logo"
            />
            {siteContent ? (
              <VenueContent
                className="flex flex-col gap-6 text-center"
                content={siteContent}
                contentStyles={renderedStyles}
              />
            ) : null}
          </ColumnLeft>
        </TwoColumnLayout>
      ) : null}
    </>
  );
}
