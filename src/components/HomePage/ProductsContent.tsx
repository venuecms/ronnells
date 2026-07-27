import { getProducts, getSite, getTags } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { ListProduct } from "@/components/ListProduct";

import { ColumnFull, TwoColumnLayout } from "../layout";

export async function ProductsContent() {
  await connection();

  const [{ data: products }, { data: site }] = await Promise.all([
    getProducts({ limit: 10, tags: "cms3agm7c001xjt04ufqoz5e1" }),
    getSite(),
  ]);

  if (!site) return null;

  const topProducts = products?.records.slice(0, 4);
  const moreProducts = products?.records.slice(4);

  return (
    <TwoColumnLayout>
      <ColumnFull className="py-20">
        <p className="pb-8 text-xl font-bold text-primary">
          <Link href="/shop">Boktips</Link>
        </p>

        <div className="grid grid-cols-2 gap-8 pb-20 sm:max-w-full sm:grid-cols-4 xl:grid-cols-4">
          {topProducts?.length
            ? topProducts.map((product) => (
                <ListProduct
                  key={product.slug}
                  featured={true}
                  product={product}
                  site={site}
                />
              ))
            : "No products found"}
        </div>
        {moreProducts?.length ? (
          <div className="grid grid-cols-2 gap-8 sm:max-w-full lg:grid-cols-[repeat(4,minmax(1rem,32rem))] xl:grid-cols-[repeat(6,minmax(1rem,32rem))]">
            {moreProducts.map((product) => (
              <ListProduct key={product.slug} product={product} site={site} />
            ))}
          </div>
        ) : null}
        <div className="w-full grid-cols-3 sm:grid">
          <span></span>
          <span></span>
          <Link className="flex w-full sm:relative sm:flex-row" href="/shop">
            → see all boktips
          </Link>
        </div>
      </ColumnFull>
    </TwoColumnLayout>
  );
}
