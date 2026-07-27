import {
  type Page as VenuePage,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { PageWithParent } from "@/lib/utils/tree";

import { ProfileStaff } from "../ProfileStaff";
import { ColumnFull, TwoColumnLayout, TwoSubColumnLayout } from "../layout";
import { renderedStyles } from "../utils";

export const Page = ({
  page,
  pages,
}: {
  page: VenuePage;
  pages: Array<PageWithParent>;
}) => {
  const locale = useLocale();
  const { artists = [] } = page;
  const { content } = getLocalizedContent(page?.localizedContent, locale);

  return (
    <TwoColumnLayout>
      <ColumnFull className="pt-8">
        <div className="flex flex-row justify-between gap-12">
          <div className="text-xxl font-bold">{content.title}</div>
          <Link href="../">
            {" "}
            <img
              className="hidden md:block"
              src="/logo.svg"
              alt="Rönnells Antikvariat Logo"
            />
          </Link>
        </div>
      </ColumnFull>

      <ColumnFull className="pt-0">
        <div className="bg-darkgreen p-8">
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        </div>

        {artists.length ? (
          <>
            <h2 className="py-12 text-xl">Personal</h2>
            <TwoSubColumnLayout>
              {artists.map(({ profile }) => (
                <ProfileStaff key={profile.slug} profile={profile} />
              ))}
            </TwoSubColumnLayout>
          </>
        ) : null}
      </ColumnFull>
    </TwoColumnLayout>
  );
};
