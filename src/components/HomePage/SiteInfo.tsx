import {
  LocalizedContent,
  type SearchParams,
  VenueContent,
  getLocalizedContent,
  getSite,
} from "@venuecms/sdk-next";
import { renderedStyles } from "@venuecms/sdk-next/utils";
import { connection } from "next/server";

import { contentComponents } from "@/components/ListingBlock";
import { VenueImage } from "@/components/VenueImage";

import { ColumnLeft, ColumnRight, TwoColumnLayout } from "../layout";

// The site description can hold listing blocks; keep the SDK's prose classes
// for the hero text and add the template's listing renderers on top.
const siteInfoStyles = { ...contentComponents, ...renderedStyles };

export async function SiteInfo({
  locale,
  searchParams,
}: {
  locale: string;
  /** Awaited here (after `connection()`) so the home route doesn't wait on it. */
  searchParams: Promise<SearchParams>;
}) {
  await connection();

  const [{ data: site }, resolvedSearchParams] = await Promise.all([
    getSite(),
    searchParams,
  ]);

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
        <TwoColumnLayout className="gap-0 md:gap-12">
          <ColumnRight className="py-2 md:py-8">
            <VenueImage className="w-full" image={webSiteSettings?.image} />
          </ColumnRight>
          <ColumnLeft className="justify-center gap-6 p-4">
            <img
              className="hidden w-4/5 self-center md:block"
              src="/logo.svg"
              alt="Rönnells Antikvariat Logo"
            />
            {siteContent ? (
              <VenueContent
                className="flex flex-col gap-6 text-center"
                content={siteContent}
                contentStyles={siteInfoStyles}
                searchParams={resolvedSearchParams}
              />
            ) : null}
          </ColumnLeft>
        </TwoColumnLayout>
      ) : null}
    </>
  );
}
