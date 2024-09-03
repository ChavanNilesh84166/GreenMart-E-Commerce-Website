import { useState } from 'react'
import Product from '../components/Product1'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { getProducts } from '../services/getproducts'

function ProductList() {
  const [properties, setProperties] = useState([])

  const loadProducts = async () => {
   
    const result = await getProducts()
    // console.log(`result - `, result)
    setProperties(result)
  }

  return (
    <div>
      <Navbar/>
      <h3>Product List</h3>
      <button onClick={loadProducts} className='btn btn-success'>
        Load Products
      </button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>price</th>
            <th>category</th>
            <th>desciption</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => {
            return (
              <Product
                id={property.id}
                title={property.title}
                price={property.price}
                category={property.category}
                description={property.description}
                image={property.image}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList