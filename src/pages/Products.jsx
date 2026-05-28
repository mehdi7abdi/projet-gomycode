import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesData } from "../data/CategoriesData";
import { buildProductList, getCategoryById } from "../utils/products";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const sortOptions = [
  { value: "default", label: "Par défaut" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-asc", label: "Nom A → Z" },
  { value: "name-desc", label: "Nom Z → A" },
  { value: "discount", label: "Meilleures promos" },
];

export default function Products() {
  // ── État et paramétrage du filtre / tri ──
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("categorie");
  const selectedCategories = useMemo(
    () => (selectedCategoryId ? [selectedCategoryId] : []),
    [selectedCategoryId],
  );
  const selectedCategory = getCategoryById(selectedCategoryId);

  const [sortBy, setSortBy] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);

  // Réinitialiser le nombre de produits visibles quand les filtres changent
  useEffect(() => {
    setVisibleCount(15);
  }, [selectedCategoryId, sortBy, searchQuery]);

  // Fermer dropdowns au clic extérieur
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        setDropdownOpen(false);
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggleCategory = (catId) => {
    if (catId === selectedCategoryId) {
      setSearchParams({});
      setDropdownOpen(false);
      return;
    }

    setSearchParams({ categorie: catId });
    setDropdownOpen(false);
  };

  const clearFilters = () => {
    setSortBy("default");
    setSearchQuery("");
    setSearchParams({});
    setDropdownOpen(false);
    setSortDropdownOpen(false);
  };

  // ── Filtrer et trier la liste de produits affichée ──
  const filteredAndSorted = useMemo(
    () =>
      buildProductList({ categoryId: selectedCategoryId, searchQuery, sortBy }),
    [selectedCategoryId, searchQuery, sortBy],
  );

  const activeFiltersCount =
    (selectedCategoryId ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-main pt-28 pb-20 px-4 sm:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-bg/90  backdrop-blur-xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative z-10 max-w-7xl mx-auto mb-10">
            <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mb-2">
              Catalogue complet
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
              Tous nos produits
            </h1>
            <p className="text-text-muted font-medium max-w-2xl">
              {filteredAndSorted.length} produit
              {filteredAndSorted.length > 1 ? "s" : ""} disponible
              {filteredAndSorted.length > 1 ? "s" : ""}
              {selectedCategory && (
                <span>
                  {" "}
                  en{" "}
                  <span className="text-purple-400 font-semibold">
                    {selectedCategory.title}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Barre de filtres */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="relative z-9999 rounded-4xl border border-white/10 bg-surface/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                {/* Gauche : Catégorie + recherche */}
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:flex-1 overflow-visible">
                  <div
                    className="relative z-10000 w-full sm:w-auto overflow-visible"
                    data-dropdown
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                        setSortDropdownOpen(false);
                      }}
                      className={`
                      flex w-full items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${
                        selectedCategories.length > 0
                          ? "bg-purple-500/20 border-purple-500 text-purple-400"
                          : "bg-bg border-purple-500/30 text-text hover:border-purple-500/60"
                      }
                    `}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="icon-[mdi--filter-variant] w-4 h-4"
                        />
                        Catégories
                      </span>
                      <span className="flex items-center gap-2">
                        {selectedCategories.length > 0 && (
                          <span className="inline-flex items-center justify-center rounded-full bg-purple-500 px-2 py-0.5 text-[10px] font-bold text-white">
                            {selectedCategories.length}
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className={`icon-[mdi--chevron-down] w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-[calc(100%+2px)] z-10000 w-full sm:w-72 bg-bg border border-purple-500/80 rounded-[28px] shadow-[0_16px_48px_rgba(0,0,0,0.22)] overflow-hidden">
                        <div className="p-2">
                          {categoriesData.map((cat) => {
                            const isSelected = selectedCategories.includes(
                              cat.id,
                            );
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleCategory(cat.id)}
                                className={`
                                w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-150 cursor-pointer
                                ${
                                  isSelected
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "text-text hover:bg-white/5"
                                }
                              `}
                              >
                                <span
                                  className={`
                                flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-150
                                ${
                                  isSelected
                                    ? "bg-purple-500 border-purple-500"
                                    : "border-purple-500/30"
                                }
                              `}
                                >
                                  {isSelected && (
                                    <span
                                      aria-hidden="true"
                                      className="icon-[mdi--check] w-3.5 h-3.5 text-white"
                                    />
                                  )}
                                </span>
                                <span className="text-base">{cat.icon}</span>
                                <span className="flex-1 text-left">
                                  {cat.title}
                                </span>
                                <span className="text-[11px] text-text-muted">
                                  {cat.products.length}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {selectedCategories.length > 0 && (
                          <div className="border-t border-white/10 p-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSearchParams({});
                                setDropdownOpen(false);
                              }}
                              className="w-full rounded-2xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-colors"
                            >
                              Réinitialiser les filtres
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative flex-1 min-w-0">
                    <span
                      aria-hidden="true"
                      className="absolute left-3 top-1/2 -translate-y-1/2 icon-[mdi--magnify] w-4 h-4 text-text-muted"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un produit"
                      className="w-full rounded-2xl bg-bg border border-purple-500/30 pl-10 pr-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                      >
                        <span className="icon-[mdi--close] w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center overflow-visible">
                  <div
                    className="relative z-9999 w-full sm:w-auto overflow-visible"
                    data-dropdown
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSortDropdownOpen(!sortDropdownOpen);
                        setDropdownOpen(false);
                      }}
                      className={`
                      flex w-full items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer
                      ${
                        sortBy !== "default"
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-bg border-primary/30 text-text hover:border-primary/60"
                      }
                    `}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="icon-[mdi--sort-variant] w-4 h-4"
                        />
                        {sortOptions.find((o) => o.value === sortBy)?.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`icon-[mdi--chevron-down] w-4 h-4 transition-transform duration-200 ${sortDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {sortDropdownOpen && (
                      <div className="absolute right-0 top-[calc(100%+2px)] z-10000 w-full sm:w-64 bg-bg border border-primary/80 rounded-[28px] shadow-[0_16px_48px_rgba(0,0,0,0.22)] overflow-hidden">
                        <div className="p-1.5">
                          {sortOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSortBy(opt.value);
                                setSortDropdownOpen(false);
                              }}
                              className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-150 cursor-pointer
                              ${
                                sortBy === opt.value
                                  ? "bg-primary/20 text-primary"
                                  : "text-text hover:bg-white/5"
                              }
                            `}
                            >
                              <span
                                className={`
                              flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-150
                              ${
                                sortBy === opt.value
                                  ? "border-primary bg-primary"
                                  : "border-primary/30"
                              }
                            `}
                              >
                                {sortBy === opt.value && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </span>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                    >
                      <span className="icon-[mdi--close-circle] w-4 h-4" />
                      Effacer
                    </button>
                  )}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {selectedCategories.map((catId) => {
                    const cat = categoriesData.find((c) => c.id === catId);
                    return (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-semibold"
                      >
                        <span>{cat?.icon}</span>
                        {cat?.title}
                        <button
                          type="button"
                          onClick={() => toggleCategory(catId)}
                          className="ml-1 hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="icon-[mdi--close] w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                  {sortBy !== "default" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary text-xs font-semibold">
                      <span className="icon-[mdi--sort-variant] w-3 h-3" />
                      {sortOptions.find((o) => o.value === sortBy)?.label}
                      <button
                        type="button"
                        onClick={() => setSortBy("default")}
                        className="ml-1 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="icon-[mdi--close] w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
                      <span className="icon-[mdi--magnify] w-3 h-3" />"
                      {searchQuery}"
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="ml-1 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="icon-[mdi--close] w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
            {filteredAndSorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span
                  aria-hidden="true"
                  className="icon-[mdi--package-variant-closed] w-16 h-16 text-text-muted/30 mb-4"
                />
                <h3 className="text-lg font-bold text-text mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-sm text-text-muted max-w-md mb-6">
                  Essayez de modifier vos filtres ou votre recherche pour
                  trouver ce que vous cherchez.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/80 transition-all cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <ul
                  role="list"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6 gap-4 sm:gap-6"
                >
                  {filteredAndSorted.slice(0, visibleCount).map((product) => (
                    <li key={product.id} className="min-w-0 flex">
                      <CategoryCard
                        product={product}
                        category={{
                          id: product.categoryId,
                          title: product.categoryTitle,
                          icon: product.categoryIcon,
                        }}
                      />
                    </li>
                  ))}
                </ul>

                {visibleCount < filteredAndSorted.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((prev) =>
                          Math.min(prev + 15, filteredAndSorted.length),
                        )
                      }
                      className="px-8 py-2.5 rounded-full bg-transparent border border-purple-500 text-text font-semibold text-sm hover:bg-purple-500/50 transition-all duration-200 cursor-pointer"
                    >
                      Voir plus
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
