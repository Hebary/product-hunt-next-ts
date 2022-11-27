import { Layout } from "../components/layout";
import { Product } from "../components/ui"
import { useProducts } from "../hooks/useProducts"
import { ProductProps } from "../interfaces";

export default function Home() : JSX.Element{

  const { products } = useProducts();

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              {products.map((product : any ) => (
                <Product
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}