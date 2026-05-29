import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ category }) {
  const { id, title, icon, products } = category;

  // On affiche max 6 produits sur mobile, tous sur desktop (la grille gère)
  const displayProducts = products.slice(0, 6);

  return (
    <section
      id={id}
      aria-labelledby={`titre-${id}`}
      className="
        relative w-full rounded-2xl overflow-hidden
        bg-bg sm:bg-card-body
        py-5 px-3 sm:px-5
        shadow-card-hover
      "
    >
      {/* ── Header ── */}
      <div className="flex flex-row items-center gap-2 sm:gap-3 mb-5">
        <div className="flex min-w-0 items-center gap-2 py-2 sm:py-3">
          <span
            aria-hidden="true"
            className="flex items-center justify-center shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm sm:text-base leading-none bg-primary/15 border border-primary/25"
          >
            {icon}
          </span>
          <h2
            id={`titre-${id}`}
            className="truncate text-base sm:text-xl font-extrabold text-text tracking-tight"
          >
            {title}
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="h-px flex-1 bg-linear-to-r from-primary to-transparent"
        />

        <Link
          to={`/produits?categorie=${id}`}
          aria-label={`Voir tous les produits : ${title}`}
          className="
            group shrink-0 inline-flex items-center gap-1
            px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg
            border border-purple-500/30
            text-[11px] sm:text-xs font-semibold text-purple-500
            transition-all duration-200 hover:border-purple-500 hover:font-black
            whitespace-nowrap
          "
        >
          Voir plus
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* ── Grille produits ── */}
      <ul
        role="list"
        aria-label={`Produits ${title}`}
        className="grid list-none grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5"
      >
        {displayProducts.map((product, index) => (
          <li
            key={product.id}
            className={`min-w-0 flex ${index >= 4 ? "hidden sm:flex" : ""} ${index >= 5 ? "xl:hidden" : ""}`}
          >
            <CategoryCard product={product} category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
