import { getLocalizedContent } from "@venuecms/sdk-next";
import { getEvents, getPage, getSite } from "@venuecms/sdk-next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { EventsList, ListEvent } from "@/components/EventList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "@/components/layout";

export async function EventsListContent({ locale }: { locale: string }) {
  await connection();

  const [{ data: events }, { data: page }, { data: site }] = await Promise.all([
    getEvents({ limit: 60, upcoming: true }),
    getPage({ slug: "events" }),
    getSite(),
  ]);

  if (!site) {
    notFound();
  }

  const pageTitle = page
    ? getLocalizedContent(page.localizedContent, locale).content.title
    : "upcoming events";

  return (
    <TwoColumnLayout>
      <ColumnFull className="pt-8">
        <div className="flex flex-row justify-between gap-12">
          <div className="text-xxl font-bold">{pageTitle}</div>
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

      <ColumnFull className="bg-darkgreen p-8">
        {events?.records.length ? (
          <EventsList className="gap-y-12">
            {events.records.map((event) => (
              <ListEvent key={event.id} event={event} site={site} withImage />
            ))}
          </EventsList>
        ) : (
          "No events found"
        )}
      </ColumnFull>
    </TwoColumnLayout>
  );
}
