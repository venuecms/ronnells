import {
  type Profile as VenueProfile,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";

import { VenueImage } from "@/components/VenueImage";

import { renderedStyles } from "../utils";

export const ProfileStaff = ({ profile }: { profile: VenueProfile }) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(profile?.localizedContent, locale);

  return (
    <div className="grid-col-1 m-auto grid aspect-square h-full place-content-center gap-2 rounded-full bg-primary p-8 text-center">
      <Link
        className="flex flex-col gap-0 text-white hover:brightness-125"
        href={`/artists/${profile.slug}`}
      >
        <div className="font-bold">{content?.title}</div>
        <div>({content?.shortContent})</div>
      </Link>
      <VenueContent
        className="flex flex-col gap-6 pb-0"
        content={content}
        contentStyles={renderedStyles}
      />
    </div>
  );
};
