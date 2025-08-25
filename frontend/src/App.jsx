import Header from './components/Header';
import Footer from './components/Footer';
import CustomerRoutes from './layouts/CustomerRoutes';

function App() {
  return (
    // No Router component needed here anymore
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CustomerRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;