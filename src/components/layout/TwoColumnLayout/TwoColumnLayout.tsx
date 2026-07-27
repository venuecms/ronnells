import { cn } from "@/lib/utils";

export const TwoColumnLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "m-auto flex w-full grid-cols-3 flex-col justify-between gap-8 px-4 py-6 md:px-6 lg:grid lg:w-10/12 lg:flex-row lg:gap-8 lg:py-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
