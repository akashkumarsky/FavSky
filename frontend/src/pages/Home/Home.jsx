import MainCarousel from "../../components/MainCarousel";
import ProductCarousel from "../../components/ProductCarousel";

const Home = () => {
    return (
        <div>
            <MainCarousel />
            <div className="container mx-auto px-4">
                <ProductCarousel />
            </div>
        </div>
    );
};

export default Home;