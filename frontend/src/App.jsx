import Header from './components/Header';
import Footer from './components/Footer';
import CustomerRoutes from './layouts/CustomerRoutes';
import SideCart from './components/SideCart'; // Import the SideCart

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CustomerRoutes />
      </main>
      <Footer />
      <SideCart /> {/* Render the SideCart here */}
    </div>
  );
}

export default App;