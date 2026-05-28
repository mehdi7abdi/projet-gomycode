// sections/Testimonials.jsx

const testimonials = [
  {
    id: 1,
    name: "Yacine Belarbi",
    city: "Alger",
    rating: 5,
    text: "Livraison rapide, packaging soigné et le laptop correspond exactement à la description. Je recommande HCA Tech sans hésiter !",
    product: "ASUS ROG Zephyrus G16",
    avatar: "YB",
  },
  {
    id: 2,
    name: "Rania Khelifi",
    city: "Oran",
    rating: 5,
    text: "J'ai commandé un moniteur gaming et il est arrivé en parfait état en 2 jours. Le service client a répondu en moins d'une heure. Excellent !",
    product: "LG UltraGear 27GR95QE",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Anis Meziane",
    city: "Constantine",
    rating: 5,
    text: "Prix imbattables comparé aux autres boutiques. Le clavier Keychron est authentique et de qualité. Mon go-to pour tout achat tech.",
    product: "Keychron Q3 Pro",
    avatar: "AM",
  },
  {
    id: 4,
    name: "Lina Hadjadj",
    city: "Blida",
    rating: 4,
    text: "Très bonne expérience d'achat. Le site est clair et la commande facile. J'aurais aimé plus de photos produit mais la qualité est au rendez-vous.",
    product: "HyperX Cloud Alpha Wireless",
    avatar: "LH",
  },
  {
    id: 5,
    name: "Karim Boudiaf",
    city: "Sétif",
    rating: 5,
    text: "Commande reçue rapidement. La souris Logitech est 100% originale, rien à redire. HCA Tech c'est la référence tech en Algérie.",
    product: "Logitech G Pro X Superlight 2",
    avatar: "KB",
  },
  {
    id: 6,
    name: "Sarah Tlemçani",
    city: "Tizi Ouzou",
    rating: 5,
    text: "Parfait du début à la fin. Produit conforme, prix honnête et support réactif. Je reviendrai certainement pour mon prochain achat.",
    product: "Samsung Odyssey G7",
    avatar: "ST",
  },
];

const avatarColors = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-sky-600",
  "bg-blue-700",
  "bg-cyan-700",
  "bg-indigo-700",
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Avis clients"
      className="py-20 px-6 sm:px-10 lg:px-20 "
    >
      {/* ── Titre ── */}
      <div className="w-full mx-auto pb-10 text-center">
        <p className="text-purple-500 text-xl font-extrabold uppercase tracking-[0.2em] mb-2">
          Ce qu'ils disent
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-text tracking-tight">
          Avis de nos clients
        </h2>
        <p className="text-text font-semibold mt-2">
          Des centaines de clients satisfaits à travers toute l'Algérie.
        </p>
      </div>

      {/* ── Grille ── */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <article
            key={t.id}
            className="relative flex flex-col gap-4 rounded-2xl border-l-2 border-t-2 border-b-6 border-r-8 border-purple-500/50 bg-bg  p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-card"
          >
            {/* Quote icon */}
            <span
              aria-hidden="true"
              className="icon-[mdi--format-quote-open] w-8 h-8 text-purple-500/80 absolute top-4 right-5"
            />

            {/* Stars */}
            <div className="flex gap-1" aria-label={`Note : ${t.rating} sur 5`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <span
                  key={s}
                  aria-hidden="true"
                  className={`icon-[mdi--star] w-4 h-4 ${
                    s < t.rating ? "text-yellow-400" : "text-border"
                  }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm leading-relaxed text-text-muted flex-1">
              "{t.text}"
            </p>

            {/* Product badge */}
            <span className="inline-flex items-center gap-1.5 self-start rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
              <span
                aria-hidden="true"
                className="icon-[mdi--shopping] w-3 h-3"
              />
              {t.product}
            </span>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <div
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]} text-xs font-extrabold text-white select-none`}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-text">{t.name}</p>
                <p className="text-xs text-text-muted">{t.city}, Algérie</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
