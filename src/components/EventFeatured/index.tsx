import {
  type Site,
  type Event as VenueEvent,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { LocationLink } from "../LocationLink";
import { TicketList } from "../TicketList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";
import { formatDateRange } from "../utils";
import { renderedStyles } from "../utils/styles";

export const EventFeatured = ({
  event,
  site,
  className,
}: {
  event: VenueEvent;
  site: Site;
  className?: string;
}) => {
  const locale = useLocale();
  const { location } = event;

  const { content } = getLocalizedContent(event?.localizedContent, locale);
  const isCancelled = event.publishState === "CANCELLED";

  return (
    <>
      <div
        className={cn(
          "flex w-full break-inside-avoid flex-col items-center gap-8 bg-background p-8 sm:gap-0",
          className,
        )}
      >
        <div className={cn("w-full pb-3 sm:w-80 sm:max-w-full")}>
          <Link href={`/events/${event.slug}`}>
            <VenueImage
              className="w-full"
              aspect="square"
              image={event.image}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-center uppercase text-primary">
            <Link href={`/events/${event.slug}`}>
              {formatDateRange({
                start: event.startDate,
                end: event.endDate,
                withTime: event.hasTime,
                timeZone: site.timeZone!,
              })}
            </Link>
          </div>
          <div className="text-balance text-center font-bold uppercase text-primary">
            <Link href={`/events/${event.slug}`}>{content.title}</Link>
            {event.location && !event.location.isDefault ? (
              <LocationLink location={event.location} />
            ) : null}
          </div>
          {isCancelled ? <div className="text-secondary">Cancelled</div> : null}
        </div>
      </div>
    </>
  );
};
