import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import Carousel from '../components/Carousel';
import BarNav from '../components/BarNav';
import FeatureProductsCard from '../components/FeatureProductsCard';
import '../css/Home.css';

function Home() {
  return (
    <div className='container-fluid p-0'>
     <div><BarNav /></div> 
      
      <div className='container-fluid mt-5 mb-5 p-0'>
        <Carousel />
      </div>

      <div className='container-fluid my-5 p-0'>
        <h1 className="display-4 text-center">TOP CATEGORIES</h1>
        <FeatureProductsCard />
      </div>

      <div className='container-fluid my-5 p-0'>
        <ProductList />
      </div>

      <Footer />
    </div>
  );
}

export default Home;

