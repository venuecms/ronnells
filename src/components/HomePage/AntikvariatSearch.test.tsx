import { NextIntlClientProvider } from "next-intl";
import { renderToReadableStream } from "react-dom/server";
import { describe, expect, it } from "vitest";

import messages from "@/lib/i18n/dictionaries/sv.json";

import { AntikvariatSearch, antikvariatSearchUrl } from "./AntikvariatSearch";

describe("antikvariatSearchUrl", () => {
  it("searches the shop's own listing", () => {
    expect(antikvariatSearchUrl("strindberg")).toBe(
      "https://www.antikvariat.net/sv/actions/biblio-search/default/search?all_text=strindberg&seller_id=5574388&",
    );
  });

  it("encodes the term so it can't break out of all_text", () => {
    // An unencoded `&seller_id=` in the term would swap in another seller.
    expect(antikvariatSearchUrl("röda rummet & co")).toContain(
      "all_text=r%C3%B6da%20rummet%20%26%20co&seller_id=5574388&",
    );
  });
});

describe("AntikvariatSearch", () => {
  it("renders the Swedish copy", async () => {
    const stream = await renderToReadableStream(
      <NextIntlClientProvider locale="sv" messages={messages}>
        <AntikvariatSearch />
      </NextIntlClientProvider>,
    );
    await stream.allReady;
    const html = await new Response(stream).text();

    expect(html).toContain("Sök i vår katalog på antikvariat.net");
    expect(html).toContain("Övriga hittar du i våra hyllor.");
    expect(html).toContain('role="search"');
  });
});
