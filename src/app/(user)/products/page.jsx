import { getAllCategoriesApi } from "@/services/categoryServices";
import { getAllProductsApi } from "@/services/productServices";
import CategorySidebar from "./_components/CategorySidebar";
import queryString from "query-string";
import SingleProduct from "./[slug]/_components/SingleProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";

export const dynamic = "force-dynamic";

async function ProductsPage({ searchParams }) {
  const cookieStore = cookies();
  const strCookie = toStringCookies(cookieStore);
  const productsPromise = getAllProductsApi(
    queryString.stringify(await searchParams),
    strCookie
  );
  const categoryPromise = getAllCategoriesApi();

  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);

  return (
    <div className="w-full">
      <h1 className="flex items-center justify-center text-xl font-bold mb-1 text-primary-900 border-b border-primary-800 pb-2">
        محصولات
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 p-4 gap-y-10">
        <CategorySidebar categories={categories} />
        <div className="col-span-2 xl:col-span-4 grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
          {products.map((product) => {
            return (
              <SingleProduct
                className="row-span-1 container max-w-[330px]"
                key={product._id}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
