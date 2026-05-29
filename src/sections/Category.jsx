import { categoriesData } from "../data/CategoriesData";
import CategorySection from "../components/CategorySection";

export default function Category() {
  return (
    <section
      id="produits"
      aria-label="Catalogue produits par catégorie"
      className="relative overflow-hidden py-10 sm:py-12 lg:py-16 mb-16 px-2 sm:px-8 lg:px-10"
    >
      {/* Titre */}
      <div className="relative z-10 w-full mx-auto pb-10 sm:pb-14 text-center px-4 sm:px-6">
        <p className="text-purple-500 text-xs sm:text-xl font-bold uppercase tracking-widest mb-2 sm:mb-3">
          Notre catalogue
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text tracking-tight mb-4 sm:mb-6 text-center">
          Explorez nos catégories
        </h2>
        <p className="text-text-muted font-medium text-xs sm:text-sm md:text-base text-center">
          Du gaming haut de gamme aux essentiels bureautique, trouvez le
          matériel qu'il vous faut.
        </p>
      </div>

      {/* Sections */}
      <div className="relative z-10 flex flex-col gap-14 sm:gap-18 lg:gap-20">
        {categoriesData.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
