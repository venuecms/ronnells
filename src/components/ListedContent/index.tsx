import { LocalizedContent, MediaItem } from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";
import { renderedStyles } from "@/components/utils/styles";

export const ListedContent = ({
  image,
  title,
  shortcontent,
  titleLink,
  content,
  className,
}: {
  image?: Partial<MediaItem>;
  title?: string | null;
  shortcontent?: string | null;
  titleLink?: string;
  content: LocalizedContent | string;
  className?: string;
}) => {
  return (
    <>
      <article
        className={cn(
          "flex w-full flex-col gap-6 bg-primary p-4 md:p-8",
          className,
        )}
      >
        <div>
          {title && <h2 className="font-bold uppercase text-white">{title}</h2>}
          {shortcontent && (
            <div className="text-base text-secondary">{shortcontent}</div>
          )}
        </div>
        {image && (
          <div className="-z-50 mx-auto w-full">
            {titleLink ? (
              <Link href={titleLink}>
                <VenueImage image={image} aspect="video" />
              </Link>
            ) : (
              <VenueImage image={image} aspect="video" />
            )}
          </div>
        )}

        {typeof content === "string" && (
          <p className="text-primary">{content}</p>
        )}

        {typeof content === "object" && (
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        )}
      </article>
    </>
  );
};
