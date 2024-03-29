import { Layout }from "../components/layout"
import { useRouter } from 'next/router'
import { Product } from "../components/ui";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";
import { NextPage } from "next";

const Searching: NextPage = () => {

  const { products }= useProducts();
  
  const [results, setResults] = useState<any>([])

  const router = useRouter();
  const { q }  = router.query
  
  useEffect(
    ()=>{
    const ref = q?.toString().toLowerCase();
    const filter = products.filter((product : any)=> {
      return(
        product.name.toLowerCase().includes(ref) || 
        product.description.toLowerCase().includes(ref)
      )
    })
  setResults(filter)
  },[q, products]);

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              {results.map((product :any)=>(
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
export default Searching