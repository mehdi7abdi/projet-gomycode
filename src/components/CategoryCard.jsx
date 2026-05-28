import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'%3E%3Crect width='320' height='200' fill='%2313131f'/%3E%3Crect x='120' y='65' width='80' height='55' rx='6' fill='%232563eb' opacity='0.2'/%3E%3Cpath d='M140 95 L160 72 L180 95Z' fill='%232563eb' opacity='0.45'/%3E%3Ccircle cx='174' cy='82' r='7' fill='%232563eb' opacity='0.45'/%3E%3Crect x='105' y='128' width='110' height='7' rx='3.5' fill='%232563eb' opacity='0.15'/%3E%3C/svg%3E`;

// Carte produit réutilisable dans plusieurs listes / sections
export default function CategoryCard({ product, category }) {
  const navigate = useNavigate();
  const { id, image, name, description, oldPrice, newPrice } = product;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = oldPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : null;

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleOpenProduct = () => navigate(`/produit/${id}`);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenProduct();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpenProduct}
      onKeyDown={handleKeyDown}
      className="
        group relative flex flex-col w-full overflow-hidden
        rounded-2xl cursor-pointer bg-bg
        border-l-2 border-t-2 border-r-4 border-b-4
        border-l-purple-500 border-t-purple-500
        border-r-text border-b-text
        transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:bg-glass-hover
        hover:border-l-purple-500 hover:border-t-purple-500
        hover:border-r-purple-500 hover:border-b-purple-500
        hover:shadow-(--shadow-card-hover)
      "
      aria-label={`Voir le produit ${name}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px z-10 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 bg-linear-to-br from-blue-500/10 via-transparent to-cyan-500/8 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Zone image */}
      <div className="relative flex items-center justify-center w-full h-40 sm:h-50 overflow-hidden bg-card-body border-b border-primary">
        {discount && (
          <span
            aria-label={`Promotion -${discount}%`}
            className="absolute top-1 left-1 z-20 rounded-lg bg-red-600 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-lg shadow-red-900/30"
          >
            -{discount}%
          </span>
        )}
        {category && (
          <span className="absolute top-1 right-1 z-20 flex items-center gap-1 rounded-lg bg-bg backdrop-blur-sm border border-purple-500 px-2 py-1 text-[16px] font-semibold text-purple-500">
            <span aria-hidden="true">{category.icon}</span>
          </span>
        )}
        <div className="relative z-0 flex h-full w-full items-center justify-center px-4 py-3">
          <img
            src={image || placeholderSvg}
            alt={image ? name : `Photo de ${name} à venir`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 bg-card-body">
        <h3 className="truncate text-[14px] sm:text-[15px] font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-purple-500">
          {name}
        </h3>
        <p className="mt-2 pb-2 flex-1 text-[12px] sm:text-[13px] font-semibold leading-relaxed text-text">
          {description}
        </p>

        {/* Prix */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 py-2 border-t border-purple-500/50">
          {oldPrice && (
            <span
              aria-label={`Ancien prix : ${oldPrice.toLocaleString("fr-DZ")} dinars`}
              className="text-[13px] text-red-500 line-through"
            >
              {oldPrice.toLocaleString("fr-DZ")} DA
            </span>
          )}
          <span
            aria-label={`Prix : ${newPrice.toLocaleString("fr-DZ")} dinars`}
            className="text-[15px] sm:text-[16px] font-extrabold text-text transition-colors duration-200 group-hover:text-purple-500"
          >
            {newPrice.toLocaleString("fr-DZ")} DA
          </span>
        </div>

        {/* Boutons */}
        <div className="mt-4 flex flex-row justify-center gap-2 items-center">
          <Link
            to={`/produit/${id}`}
            aria-label={`Voir le produit : ${name}`}
            className="btn-float inline-flex items-center justify-center rounded-xl bg-bg border border-purple-500 px-2 py-2 text-center text-[12px] font-semibold text-purple-500 hover:bg-linear-to-r from-purple-600 to-primary hover:text-white transition-all duration-300"
          >
            Voir le produit
          </Link>

          <button
            type="button"
            onClick={(event) => handleAddToCart(event)}
            aria-label={`Ajouter ${name} au panier`}
            className={`
              flex items-center justify-center gap-1 w-fit mx-auto
              rounded-xl px-2 py-2 text-xs font-bold text-white
              transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer
              ${
                added
                  ? "bg-green-600 shadow-[0_2px_12px_rgba(22,163,74,0.4)]"
                  : "bg-primary hover:bg-primary/80 shadow-[0_2px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)]"
              }
            `}
          >
            {added ? "Ajouté" : "+"}
            <span
              aria-hidden="true"
              className={`w-4 h-4 block transition-all duration-300 ${added ? "icon-[mdi--check]" : "icon-[mdi--cart-outline]"}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
