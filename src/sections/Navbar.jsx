import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { categoriesData } from "../data/CategoriesData";

const allProducts = categoriesData.flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    categoryId: cat.id,
    categoryTitle: cat.title,
    categoryIcon: cat.icon,
  })),
);

function getInitialTheme() {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.documentElement.classList.add("light");
    return false;
  }
  document.documentElement.classList.remove("light");
  return true;
}

function useSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results =
    query.trim().length < 1
      ? []
      : allProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase()) ||
              p.categoryTitle.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 6);

  return { query, setQuery, results, open, setOpen };
}

export default function Navbar() {
  const { cartCount, setCartOpen, setMenuOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [spinning, setSpinning] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const desktopSearch = useSearch();
  const mobileSearch = useSearch();
  const { setOpen: setDesktopOpen } = desktopSearch;
  const { setOpen: setMobileOpen } = mobileSearch;

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  /* scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ferme la recherche mobile si on passe en desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setSearchOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ferme les dropdowns au clic extérieur */
  useEffect(() => {
    const onClickOutside = (e) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target))
        setDesktopOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onClickOutside);
    return () => document.removeEventListener("pointerdown", onClickOutside);
  }, [setDesktopOpen, setMobileOpen]);

  const toggleTheme = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", !next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-[10050] px-3 sm:px-4 pt-1"
    >
      <nav
        aria-label="Navigation principale"
        className={`
          relative flex flex-col rounded-2xl
          backdrop-blur-sm border transition-all duration-300
          ${
            isDark
              ? scrolled
                ? "bg-purple-500/20 border-purple-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              : scrolled
                ? "bg-white/90 border-purple-500 shadow-[0_8px_32px_rgba(26,111,255,0.12)]"
                : "bg-white/10 border-white/10 shadow-[0_8px_32px_rgba(26,111,255,0.12)]"
          }
        `}
      >
        {/* Reflet haut */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/5 to-transparent" />

        {/* ── BARRE PRINCIPALE ── */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-3">
          {/* Logo */}
          <Link
            to="/"
            aria-label="HCA Tech — Retour à l'accueil"
            className="flex items-center gap-2 shrink-0 relative z-10"
          >
            <img
              src="/logo-hca-tech.png"
              alt="Logo HCA Tech"
              width="36"
              height="36"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight leading-none select-none">
              <span className="text-primary">Hca</span>
              <span className="text-text"> Tech</span>
            </span>
          </Link>

          {/* Recherche desktop */}
          <div
            ref={desktopRef}
            className="relative z-[10050] flex-1 max-w-sm hidden sm:block"
          >
            <label htmlFor="search-navbar" className="sr-only">
              Rechercher un produit
            </label>
            <span
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 icon-[mdi--magnify] w-4 h-4 text-white pointer-events-none"
            />
            <input
              id="search-navbar"
              type="search"
              value={desktopSearch.query}
              onChange={(e) => {
                desktopSearch.setQuery(e.target.value);
                desktopSearch.setOpen(true);
              }}
              onFocus={() => desktopSearch.setOpen(true)}
              placeholder="Rechercher un produit..."
              autoComplete="off"
              className="
                w-full rounded-xl bg-primary/10 border border-purple-500/50
                pl-9 pr-4 py-2 text-sm text-white
                placeholder:text-white/60
                focus:outline-none focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/20
                focus:bg-purple-500/10 transition-all duration-200
              "
            />
            <SearchDropdown
              results={desktopSearch.results}
              query={desktopSearch.query}
              open={desktopSearch.open}
              onClose={() => {
                desktopSearch.setOpen(false);
                desktopSearch.setQuery("");
              }}
            />
          </div>

          {/* ── ACTIONS ── */}
          {/* Conteneur actions : on garde tous les boutons serrés mais lisibles */}
          <div className="flex items-center shrink-0 relative z-10">
            {/* Loupe mobile */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Rechercher"
              aria-expanded={searchOpen}
              className="sm:hidden p-2 rounded-xl border border-transparent text-text hover:bg-white/10 hover:border-primary/25 transition-all duration-200 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className={`w-5 h-5 block transition-all duration-200 ${
                  searchOpen ? "icon-[mdi--close]" : "icon-[mdi--magnify]"
                }`}
              />
            </button>

            {/* Thème */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Passer en mode clair" : "Passer en mode sombre"
              }
              className="relative p-2 rounded-xl border border-transparent text-text hover:bg-white/10 hover:border-primary/25 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span
                aria-hidden="true"
                className={`icon-[mdi--weather-night] w-5 h-5 block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isDark
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-50"
                } ${spinning ? "animate-spin" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`icon-[mdi--white-balance-sunny] w-5 h-5 block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isDark
                    ? "opacity-0 -rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100 text-yellow-500"
                } ${spinning ? "animate-spin" : ""}`}
              />
              {/* Placeholder pour la taille */}
              <span
                aria-hidden="true"
                className="icon-[mdi--weather-night] w-5 h-5 opacity-0 block"
              />
            </button>

            {/* Panier */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={
                cartCount > 0
                  ? `Panier — ${cartCount} article${cartCount > 1 ? "s" : ""}`
                  : "Panier vide"
              }
              className="relative p-2 rounded-xl border border-transparent text-text hover:bg-white/10 hover:border-primary/25 transition-all duration-200 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="icon-[mdi--cart-variant] w-5 h-5 block"
              />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-purple-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none shadow-[0_2px_6px_rgba(139,92,246,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="p-2 rounded-xl border border-transparent text-text hover:bg-white/10 hover:border-primary/25 transition-all duration-200 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="icon-[mdi--hamburger-menu] w-5 h-5 block"
              />
            </button>
          </div>
        </div>

        {/* ── RECHERCHE MOBILE DÉPLIABLE ── */}
        <div
          className={`
            sm:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${searchOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-3 pb-3 border-t border-white/10">
            <div ref={mobileRef} className="relative z-[10050] mt-3">
              <label htmlFor="search-mobile" className="sr-only">
                Rechercher un produit
              </label>
              <span
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 icon-[mdi--magnify] w-4 h-4 text-text-muted pointer-events-none z-10"
              />
              <input
                id="search-mobile"
                type="search"
                value={mobileSearch.query}
                onChange={(e) => {
                  mobileSearch.setQuery(e.target.value);
                  mobileSearch.setOpen(true);
                }}
                onFocus={() => mobileSearch.setOpen(true)}
                onClick={() => mobileSearch.setOpen(true)}
                placeholder="Rechercher un produit..."
                autoComplete="off"
                className="
                  w-full rounded-xl bg-primary/10 border border-purple-500/30
                  pl-9 pr-4 py-2.5 text-sm text-text
                  placeholder:text-text-muted
                  focus:outline-none focus:border-purple-500
                  focus:ring-2 focus:ring-purple-500/20 transition-all duration-200
                "
              />
              <SearchDropdown
                results={mobileSearch.results}
                query={mobileSearch.query}
                open={mobileSearch.open}
                onClose={() => {
                  mobileSearch.setOpen(false);
                  mobileSearch.setQuery("");
                  setSearchOpen(false);
                }}
                mobile
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ── Dropdown résultats ── */
function SearchDropdown({ results, query, open, onClose }) {
  if (!open || query.trim().length < 1) return null;

  return (
    <div
      className="
      absolute left-0 right-0 top-[calc(100%+4px)] z-[10100]
      bg-bg border border-purple-500
      rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.6)]
      overflow-hidden
    "
    >
      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center px-4">
          <span
            aria-hidden="true"
            className="icon-[mdi--magnify-close] w-8 h-8 text-text-muted/40"
          />
          <p className="text-sm text-text-muted">
            Aucun résultat pour{" "}
            <span className="text-text font-semibold">"{query}"</span>
          </p>
        </div>
      ) : (
        <ul
          role="listbox"
          aria-label="Résultats de recherche"
          className="divide-y divide-white/6 max-h-80 overflow-y-auto"
        >
          {results.map((product) => (
            <SearchResult
              key={product.id}
              product={product}
              onClose={onClose}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchResult({ product, onClose }) {
  const { addToCart } = useCart();
  const {
    name,
    description,
    image,
    newPrice,
    oldPrice,
    categoryTitle,
    categoryIcon,
  } = product;

  const discount = oldPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : null;

  return (
    <Link
      to={`/produit/${product.id}`}
      onClick={onClose}
      aria-label={name}
      className="group flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-all duration-150"
    >
      <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-card-body border border-white/8 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-1.5"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0 gap-0.5">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 uppercase tracking-wide">
          <span>{categoryIcon}</span>
          {categoryTitle}
        </span>
        <p className="text-[13px] font-bold text-text truncate">{name}</p>
        <p className="text-[11px] text-text-muted truncate">{description}</p>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className="flex flex-col items-end">
          {oldPrice && (
            <span className="text-[11px] text-red-400 line-through">
              {oldPrice.toLocaleString("fr-DZ")} DA
            </span>
          )}
          <span className="text-[13px] font-black text-text">
            {newPrice.toLocaleString("fr-DZ")} DA
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            onClose();
          }}
          aria-label={`Ajouter ${name} au panier`}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary hover:bg-primary/80 text-white text-[11px] font-bold transition-all duration-200 cursor-pointer"
        >
          <span className="icon-[mdi--cart-plus] w-3.5 h-3.5" />
          Ajouter
        </button>
      </div>
    </Link>
  );
}
