import { categoriesData } from "../data/CategoriesData";
import CategorySection from "../components/CategorySection";

export default function Category() {
  return (
    <section
      id="produits"
      aria-label="Catalogue produits par catégorie"
      className="relative overflow-hidden py-12 sm:py-12 lg:py-16 mb-20 px-2 sm:px-10 "
    >
      {/* ── Titre ── */}
      <div className="relative z-10 w-full mx-auto pb-14 sm:pb-16 md:pb-18 text-center px-4 sm:px-6">
        <p className="text-purple-500 text-xs sm:text-xl font-bold uppercase tracking-widest mb-2 sm:mb-3">
          Notre catalogue
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text tracking-tight mb-4 sm:mb-6">
          Explorez nos catégories
        </h2>

        <div className="w-full px-2 sm:px-0 flex justify-center">
          <p className="text-text-muted font-medium text-xs sm:text-sm md:text-base text-center max-w-3xl">
            Du gaming haut de gamme aux essentiels bureautique, trouvez le
            matériel qu'il vous faut.
          </p>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-0 sm:px-3 lg:px-4">
        <div className="w-full max-w-full flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {categoriesData.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
