import { cn } from "@/lib/utils";

export const ColumnFull = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("col-span-3 flex flex-col", className)} {...props} />
  );
};
