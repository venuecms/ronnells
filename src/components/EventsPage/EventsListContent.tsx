import { getLocalizedContent } from "@venuecms/sdk-next";
import { getEvents, getPage, getSite } from "@venuecms/sdk-next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import {
  EventsListSimple,
  ListEventSimple,
} from "@/components/EventListSimple";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "@/components/layout";

import { EventFeatured } from "../EventFeatured";

export async function EventsListContent({ locale }: { locale: string }) {
  await connection();

  const [{ data: events }, { data: page }, { data: site }] = await Promise.all([
    getEvents({ limit: 99, upcoming: true }),
    getPage({ slug: "events" }),
    getSite(),
  ]);

  const [{ data: featuredEvents }] = await Promise.all([
    getEvents({ limit: 99, featured: true }),
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
      <ColumnFull className="flex flex-row justify-between gap-12 bg-darkgreen p-8">
        <div className="flex flex-col gap-8 sm:grid sm:grid-flow-row md:grid-cols-3">
          {featuredEvents?.records.map((event) => (
            <EventFeatured
              key={event.id}
              event={event}
              site={site}
              className="gap-y-12"
            />
          ))}
        </div>
      </ColumnFull>
      <ColumnFull className="bg-darkgreen p-8">
        <div className="pb-16 pt-8 font-bold text-white">
          <h2 className="pb-4 text-xl">Kommande evenemang</h2>
          <p>
            (Kan inte förhandsbokas eller köpas biljetter till; vänta tills det
            skapas ett evenemang ovan.)
          </p>
        </div>

        {events?.records.length ? (
          <EventsListSimple className="gap-2">
            {events.records.map((event) => (
              <ListEventSimple key={event.id} event={event} site={site} />
            ))}
          </EventsListSimple>
        ) : (
          "No events found"
        )}

        <div className="py-8">
          <p className="font-bold text-white">
            Klockslag kan ändras, datum flyttas, evenemang ställas in och nya
            dyka upp. Allt är liksom i rörelse.
          </p>
        </div>
      </ColumnFull>
    </TwoColumnLayout>
  );
}
