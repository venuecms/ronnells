import { ReactNode } from "react";

import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";

export const SiteHeaderDesktop = async ({
  logo,
  nav,
}: {
  logo: ReactNode;
  nav: ReactNode;
}) => {
  return (
    <header className="sticky top-0 hidden min-h-20 items-center bg-background text-nav sm:flex lg:gap-40">
      <TwoColumnLayout className="py-0 pt-7 md:py-7 lg:items-center lg:pt-1">
        <ColumnFull className="items-center border-b border-primary pb-4">
          {nav}
        </ColumnFull>
      </TwoColumnLayout>
    </header>
  );
};
