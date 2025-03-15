import { getAllCategoriesApi } from "@/services/categoryServices";
import { getAllProductsApi } from "@/services/productServices";
import CategorySidebar from "./_components/CategorySidebar";
import queryString from "query-string";
import SingleProduct from "./[slug]/_components/SingleProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";

async function ProductsPage({ searchParams }) {
  const cookieStore = await cookies();
  const strCookie = toStringCookies(cookieStore);
  const { products } = await getAllProductsApi(
    queryString.stringify(await searchParams),
    strCookie
  );
  const { categories } = await getAllCategoriesApi();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
          {products &&
            products.map((product) => {
              return (
                <SingleProduct
                  className="row-span-1"
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
