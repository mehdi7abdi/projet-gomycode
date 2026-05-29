import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import MobileMenu from "./components/MobileMenu";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const normalizedHash = hash.startsWith("#/") ? `#${hash.slice(2)}` : hash;
    const targetId = normalizedHash.startsWith("#")
      ? normalizedHash.slice(1)
      : normalizedHash;

    if (!targetId) return;

    const element = document.getElementById(targetId);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [hash]);

  return null;
}

export default function App() {
  return (
    // Le composant racine configure le routeur et le contexte global du panier.
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/commande" element={<Order />} />
        </Routes>

        {/* Composants globaux qui sont visibles depuis toutes les pages */}
        <CartDrawer />
        <MobileMenu />
      </CartProvider>
    </BrowserRouter>
  );
}
