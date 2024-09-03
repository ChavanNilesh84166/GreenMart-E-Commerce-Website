import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import Product from './Product';
import '../css/ProductList.css'; // Ensure this CSS file is imported

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const result = await getProducts();
    setProducts(result);
    console.log(result);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='product-list'>
      {products.map((product) => (
        <Product key={product.productId} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
