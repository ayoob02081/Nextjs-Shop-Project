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
  console.log(await searchParams);

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
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
          {!!products ? (
            <span className="flex items-center justify-center font-bold text-rose-500 text-2xl">!!No Products Yet</span>
          ) : (
            products.map((product) => {
              return (
                <SingleProduct
                  className="row-span-1"
                  key={product._id}
                  product={product}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
