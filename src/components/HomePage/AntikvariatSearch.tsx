"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";

import { ColumnFull, TwoColumnLayout } from "../layout";

const SELLER_ID = "5574388";

/** The shop's listing on antikvariat.net, filtered to `term`. */
export const antikvariatSearchUrl = (term: string) =>
  `https://www.antikvariat.net/sv/actions/biblio-search/default/search?all_text=${encodeURIComponent(term)}&seller_id=${SELLER_ID}&`;

export function AntikvariatSearch() {
  const t = useTranslations("antikvariat");
  const [term, setTerm] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;

    window.open(antikvariatSearchUrl(trimmed), "_blank", "noopener,noreferrer");
  };

  return (
    <TwoColumnLayout className="lg:py-8">
      <ColumnFull className="w-full items-center gap-10 bg-darkgreen px-4 py-12 text-center text-white sm:mx-auto sm:w-2/3 md:px-8 md:py-16">
        <h2 className="text-2xl font-bold md:text-2xl">{t("title")}</h2>

        <form
          role="search"
          onSubmit={onSubmit}
          // The ring sits outside the black border, so it reads against the
          // green panel; the inset outline marks the field itself.
          className="group flex w-full max-w-[54rem] border-[6px] border-[#000] bg-[#000] ring-white ring-offset-0 transition-shadow focus-within:ring-1"
        >
          <label htmlFor="antikvariat-search" className="sr-only">
            {t("title")}
          </label>
          <div className="group-focus-within:outline-0.5 flex flex-1 items-center bg-white outline outline-0 -outline-offset-4 outline-darkgreen">
            <input
              id="antikvariat-search"
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder={t("title")}
              className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base text-primary caret-darkgreen placeholder:text-neutral-500 placeholder:transition-opacity focus:outline-none focus:placeholder:opacity-40 md:text-lg"
            />
            <SearchIcon
              aria-hidden
              className="mr-4 size-7 shrink-0 text-primary transition-colors group-focus-within:text-darkgreen md:size-9"
              strokeWidth={3}
            />
          </div>
          <button
            type="submit"
            className="px-6 text-lg text-white hover:underline focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white md:px-10 md:text-2xl"
          >
            {t("submit")}
          </button>
        </form>

        <p className="max-w-xl text-lg">
          {t("description_1")}
          <br />
          {t("description_2")}
        </p>
      </ColumnFull>
    </TwoColumnLayout>
  );
}
