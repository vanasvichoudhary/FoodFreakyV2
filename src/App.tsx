import { useApp } from './context/AppContext';
import { Navbar } from './components/Common/Navbar';
import { Footer } from './components/Common/Footer';
import { ToastContainer } from './components/Common/ToastContainer';
import { LiveChatWidget } from './components/Common/LiveChatWidget';
import { FoodDetailsModal } from './components/Details/FoodDetailsModal';

// Home Sections
import { Hero } from './components/Home/Hero';
import { CategoriesGrid } from './components/Home/CategoriesGrid';
import { PopularDishes } from './components/Home/PopularDishes';
import { SpecialOffers } from './components/Home/SpecialOffers';
import { FeaturedRestaurants } from './components/Home/FeaturedRestaurants';
import { Reviews } from './components/Home/Reviews';
import { AppPromotion } from './components/Home/AppPromotion';

// Other Pages
import { MenuPage } from './components/Menu/MenuPage';
import { CartPage } from './components/Cart/CartPage';
import { CheckoutPage } from './components/Checkout/CheckoutPage';
import { DashboardPage } from './components/Dashboard/DashboardPage';

function App() {
  const { activePage } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'home':
      default:
        return (
          <div className="animate-fade-in-up">
            <Hero />
            <CategoriesGrid />
            <PopularDishes />
            <SpecialOffers />
            <FeaturedRestaurants />
            <Reviews />
            <AppPromotion />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      <Footer />

      {/* Global Overlays */}
      <FoodDetailsModal />
      <ToastContainer />
      <LiveChatWidget />
    </div>
  );
}

export default App;
