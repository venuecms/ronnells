import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const TwoSubColumnLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={cn("grid max-w-fit gap-8 sm:grid-cols-3", className)}>
    {children}
  </div>
);
