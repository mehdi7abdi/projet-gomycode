import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

// Section de produits par catégorie, utilisée sur la page d'accueil
export default function CategorySection({ category }) {
  const { id, title, icon, products } = category;

  const mobileProducts = products.slice(0, 6);

  return (
    <section
      id={id}
      aria-labelledby={`titre-${id}`}
      className="
        relative w-full rounded-2xl overflow-hidden
        bg-bg sm:bg-card-body
        shadow-card-hover
        sm:shadow-(--shadow-card)
        py-6 px-3 sm:px-4
      "
    >
      {/* ── Header ── */}
      <div className="relative flex flex-row items-center gap-3 mb-6">
        <div className="flex min-w-0 items-center gap-2.5 py-4">
          <span
            aria-hidden="true"
            className="
              flex items-center justify-center shrink-0
              w-9 h-9 rounded-xl text-base leading-none
              bg-primary/15 border border-primary/25
            "
          >
            {icon}
          </span>
          <h2
            id={`titre-${id}`}
            className="truncate text-lg sm:text-xl font-extrabold text-text tracking-tight"
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
            group shrink-0 inline-flex items-center gap-1.5
            px-3 py-1.5 rounded-lg
            bg-transparent border border-purple-500/30
            text-xs font-semibold text-purple-500
            transition-all duration-200
            hover:border-3 hover:font-black
          "
        >
          Voir plus
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
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

      {/* ── Grille ── */}
      <ul
        role="list"
        aria-label={`Produits ${title}`}
        className="
          grid list-none
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-5
          gap-3 sm:gap-8
        "
      >
        {mobileProducts.map((product, index) => (
          <li
            key={product.id}
            className={`min-w-0 flex ${index >= 5 ? "xl:hidden" : ""}`}
          >
            <CategoryCard product={product} category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
