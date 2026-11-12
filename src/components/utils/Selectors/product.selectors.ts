import { Product } from "@venuecms/sdk-next";

export interface ProductCustomFields {
  skick?: string;
}

export interface ProductWithCustomFields extends Omit<Product, "custom"> {
  custom?: {
    slug: string;
    data: ProductCustomFields;
  }[];
}

function getCustomFields(
  product: ProductWithCustomFields,
): ProductCustomFields | undefined {
  return product.custom?.[0]?.data;
}

export function getProductSkick(
  product: ProductWithCustomFields,
): string | undefined {
  const skick = getCustomFields(product)?.skick;

  if (skick) return skick;
}

export function getPublicationYear(
  product: ProductWithCustomFields,
): string | undefined {
  const publicationDate = product.variants?.[0]?.publicationDate as
    | string
    | undefined;

  if (publicationDate)
    return new Date(publicationDate).getFullYear().toString();
}
