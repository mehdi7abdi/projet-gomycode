// Bannière principale de la page d'accueil
export default function Hero() {
  return (
    <section
      aria-label="Bannière principale HCA Tech"
      className="relative isolate w-full min-h-screen overflow-hidden bg-hero"
    >
      <div className="relative z-10 flex items-center w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
          <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center gap-5 pt-28 pb-16 sm:pt-24 md:pt-10 md:pb-0">
            {/* Badge */}
            <div>
              <p className="inline-flex items-center gap-3 rounded-full border border-blue-400/30 bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-text shadow-lg shadow-blue-500/10">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
                </span>
                Nouveau stock disponible
              </p>
            </div>

            {/* Titre */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-text">
              Le Matériel
              <br />
              <span className="text-purple-500">Tech Premium</span>
              <br />
              <span className="text-text">en Algérie</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-desc font-semibold max-w-md">
              PC portables, moniteurs, accessoires gaming et équipements
              professionnels — les meilleures marques au meilleur prix.
            </p>

            {/* Stats */}
            <div
              role="list"
              aria-label="Chiffres clés"
              className="grid grid-cols-3 gap-2 sm:gap-3 max-w-sm"
            >
              {[
                { value: "50+", label: "Produits" },
                { value: "2j", label: "Livraison" },
                { value: "4.9★", label: "Avis clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  role="listitem"
                  className="flex flex-col items-center text-center rounded-2xl border border-white/20 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-3 sm:py-4 transition-all duration-300 hover:bg-white/25 hover:border-primary/40"
                >
                  <span className="text-lg sm:text-2xl font-extrabold text-purple-500 leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 text-[10px] sm:text-xs text-text font-medium leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Boutons CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-1">
              <a
                href="/produits"
                className="btn-float group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 sm:px-7 sm:py-4 font-bold text-text/90 transition-all duration-300 hover:scale-[1.02] border border-purple-500/40 bg-white/20 backdrop-blur-sm hover:border-purple-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Voir le catalogue</span>
                  <span
                    aria-hidden="true"
                    className="icon-[mdi--arrow-right] w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <a
                href="#contact"
                className="btn-float inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-text/90 border border-white/10 bg-white/20 backdrop-blur-sm transition-all duration-300 hover:text-white hover:border-white/25 hover:bg-white/10"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fondu bas */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-22 bg-linear-to-t from-black to-transparent"
      />
    </section>
  );
}
