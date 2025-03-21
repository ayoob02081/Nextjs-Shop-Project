import {
  getAllProductsApi,
  getProductBySlugApi,
} from "@/services/productServices";
import CartEvents from "./_components/CartEvents";

export const dynamic = "force-static"; //ssg or {cache: force-cache}
export const dynamicParams = false;

async function page({ params }) {
  const { slug } = params;
  const { product } = await getProductBySlugApi(slug);
  console.log(slug);
  console.log(product);

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {!!product.discount && (
        <div>
          <p>{product.offPrice}</p>
          <div>{product.discount}</div>
        </div>
      )}
      <CartEvents product={product} />
    </div>
  );
}

export default page;

export async function generateStaticParams() {
  const { products } = await getAllProductsApi();

  return products?.map((product) => ({
    slug: product.slug,
  }));
}
