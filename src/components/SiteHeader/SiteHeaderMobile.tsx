import { ReactNode } from "react";

export const SiteHeaderMobile = async ({
  logo,
  nav,
}: {
  logo: ReactNode;
  nav: ReactNode;
}) => {
  return (
    <header className="top-0 flex w-full items-center justify-between px-4 py-2 text-nav md:hidden">
      {logo}
      {nav}
    </header>
  );
};
