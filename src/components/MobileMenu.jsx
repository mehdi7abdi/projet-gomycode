import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { categoriesData } from "../data/CategoriesData";

const NAV_LINKS = [
  {
    label: "Accueil",
    to: "/",
    icon: "icon-[mdi--home-outline]",
  },
  {
    label: "Produits",
    to: "/produits",
    icon: "icon-[mdi--tag-outline]",
  },
  {
    label: "Avis Clients",
    to: "/#testimonials",
    icon: "icon-[mdi--star-outline]",
  },
  {
    label: "Contact",
    to: "/#contact",
    icon: "icon-[mdi--email-outline]",
  },
];

export default function MobileMenu() {
  // Menu mobile glissant : navigation et accès rapide aux catégories
  const { menuOpen, setMenuOpen } = useCart();
  const menuRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) menuRef.current?.focus();
  }, [menuOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-10110 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer — depuis la droite */}
      <aside
        ref={menuRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`
          fixed top-0 right-0 z-[10120]
          h-full w-full sm:w-[50vw] lg:w-[35vw] 
          flex flex-col
          bg-bg/90 border-l border-purple-500/30
          transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          outline-none overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
            aria-label="HCA Tech — Accueil"
          >
            <img src="/logo-hca-tech.png" alt="" width="32" height="32" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold">
              <span className="text-primary">Hca</span>
              <span className="text-text"> Tech</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="p-2 rounded-xl border border-transparent hover:bg-white/8 hover:border-white/15 transition-all duration-200 cursor-pointer"
          >
            <span aria-hidden="true" className="icon-[mdi--close] w-5 h-5 text-text-muted block" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Navigation principale" className="px-4 pt-5 pb-2 shrink-0">
          <p className="text-[18px] font-bold uppercase tracking-widest text-primary mb-3 px-1">
            Navigation
          </p>
          <ul className="space-y-1">
  {NAV_LINKS.map(({ label, to, icon }) => (
    <li key={label}>
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text text-[16px] font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-200"
      >
        <span
          aria-hidden="true"
          className={`${icon} w-4.5 h-4.5 shrink-0`}
        />
        {label}
      </Link>
    </li>
  ))}
</ul>
        </nav>

        <div className="mx-4 my-3 h-px bg-white/8" />

        {/* Catégories */}
        <nav aria-label="Catégories produits" className="px-4 pb-6">
          <p className="text-[18px] font-bold uppercase tracking-widest text-purple-500 mb-3 px-1">
            Catégories
          </p>
          <ul className="space-y-1">
            {categoriesData.map(({ id, title, icon }) => (
              <li key={id}>
                <Link
                  to={`/produits?categorie=${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text text-[16px] font-semibold hover:bg-purple-500/10 hover:text-purple-400 transition-all duration-200"
                >
                  <span aria-hidden="true" className="text-base leading-none w-5 text-center shrink-0">
                    {icon}
                  </span>
                  {title}
                  <span aria-hidden="true" className="icon-[mdi--chevron-right] w-6 h-6 ml-auto text-purple-500" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

