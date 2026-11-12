import { getLocalizedMetadata } from "@/lib";
import { Params } from "@/types";
import { type SearchParams, getSite } from "@venuecms/sdk-next";

import { FeaturedEventsSection } from "@/components/HomePage/FeaturedEventsSection";
import { ProductsSection } from "@/components/HomePage/ProductsSection";
import { SiteInfo } from "@/components/HomePage/SiteInfo";
import { setupSSR } from "@/components/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { locale } = await params;
  await setupSSR({ params });

  const { data: site } = await getSite();
  if (!site) {
    return {};
  }

  const metadata = getLocalizedMetadata({
    locale,
    site,
    overrides: {
      content: site.description ?? undefined,
    },
  });

  return metadata;
};

const Home = async ({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  // Handed down unawaited: the site description can hold a listing block, and
  // its pager needs the URL. Awaiting here would pull the whole home page out
  // of the prerendered shell, so the wait happens inside SiteInfo instead.
  searchParams: Promise<SearchParams>;
}) => {
  await setupSSR({ params });
  const { locale } = await params;

  return (
    <>
      <SiteInfo locale={locale} searchParams={searchParams} />
      <FeaturedEventsSection locale={locale} />
      <ProductsSection />
    </>
  );
};

export default Home;
