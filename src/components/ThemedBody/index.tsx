import { getSite } from "@venuecms/sdk-next";
import { ThemeProvider } from "next-themes";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

import { buildThemeColorOverrideCss } from "./colors";

// This site only uses Open Sans. Each next/font/google call is fetched at build
// time, so unused fonts are left out rather than kept for other sites.
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const ThemedBody = async ({ children }: { children: ReactNode }) => {
  const { data: site } = await getSite();

  const templateConfig = site?.settings?.publicSite?.template?.config ?? {};

  const themeId =
    typeof templateConfig.themeId === "string"
      ? templateConfig.themeId
      : "default";
  const colorOverrideCss = buildThemeColorOverrideCss(templateConfig, themeId);

  return (
    <ThemeProvider attribute="class" forcedTheme={themeId}>
      {/* Hoisted into <head> by React so the site's colors land with the rest
          of the stylesheets rather than flashing in mid-body. */}
      {colorOverrideCss && (
        <style href="venue-theme-colors" precedence="high">
          {colorOverrideCss}
        </style>
      )}
      <div className="flex min-h-screen flex-col" style={openSans.style}>
        {children}
      </div>
    </ThemeProvider>
  );
};
