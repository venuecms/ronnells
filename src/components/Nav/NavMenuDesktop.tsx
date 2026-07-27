"use client";

import { ReactNode } from "react";

import { SearchInput } from "../Search/SearchInput";
import { useSearchQuery } from "../Search/provider";

export const NavMenuDesktop = ({
  showSearch,
  children,
}: {
  showSearch: boolean;
  children: ReactNode;
}) => {
  const { isActive } = useSearchQuery();

  return (
    <nav className="relative hidden w-full items-center justify-between md:flex">
      {!isActive ? (
        <ol className="flex w-full items-center justify-between text-nav">
          {children}
        </ol>
      ) : null}
      {showSearch ? <SearchInput /> : null}
    </nav>
  );
};
