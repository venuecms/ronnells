import { Product, Site, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import {
  type ProductWithCustomFields,
  getProductSkick,
  getPublicationYear,
} from "../utils/Selectors/product.selectors";

export const ListProduct = ({
  product,
  site,
  featured,
  className,
}: {
  product: Product;
  site: Site;
  featured?: boolean;
  className?: string;
}) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(product?.localizedContent, locale);

  const skick = getProductSkick(product as ProductWithCustomFields);
  const publicationYear = getPublicationYear(
    product as ProductWithCustomFields,
  );

  return (
    <div
      className={cn(
        "flex break-inside-avoid flex-col gap-8 pb-8 sm:gap-0",
        className,
      )}
    >
      <div className="w-full pb-3 sm:w-auto sm:max-w-full">
        <Link href={`/shop/${product.slug}`}>
          <VenueImage image={product.image} />
        </Link>
      </div>
      <div className="flex flex-col">
        {product.author ? (
          <div className="text-center font-bold uppercase text-primary">
            {product.author}
          </div>
        ) : null}
        <div className="flex flex-col text-center text-secondary">
          <Link href={`/shop/${product.slug}`}>{content.title}</Link>

          <span>Utgivningsår: {publicationYear}</span>
          <span>Skick: {skick}</span>
        </div>
      </div>
    </div>
  );
};
