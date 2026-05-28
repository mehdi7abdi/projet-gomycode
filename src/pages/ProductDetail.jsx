import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/useCart";
import { categoriesData } from "../data/CategoriesData";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const allProducts = categoriesData.flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    categoryId: cat.id,
    categoryTitle: cat.title,
    categoryIcon: cat.icon,
  })),
);

function getProductById(id) {
  return allProducts.find((p) => p.id === id);
}

function getDiscountPercent(oldPrice, newPrice) {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return null;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

// Parse la description courte en specs clés (ex: "RTX 4080 · Intel Core i9 · 32 Go RAM")
function parseSpecs(description) {
  if (!description) return [];
  return description
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const heroRef = useRef(null);
  const descriptionRef = useRef(null);

  const product = getProductById(id);

  // Observer pour sticky bar mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-main pt-28 pb-20 px-4 flex flex-col items-center justify-center text-center">
          <span
            aria-hidden="true"
            className="icon-[mdi--package-variant-closed] w-20 h-20 text-[var(--color-text-muted)]/30 mb-6"
          />
          <h1 className="text-2xl font-black text-[var(--color-text)] mb-3">
            Produit introuvable
          </h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            Ce produit n\'existe pas ou a été retiré du catalogue.
          </p>
          <Link
            to="/produits"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition-all"
          >
            Voir le catalogue
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const {
    name,
    description,
    fullDescription,
    image,
    oldPrice,
    newPrice,
    categoryTitle,
    categoryIcon,
    categoryId,
  } = product;

  const discount = getDiscountPercent(oldPrice, newPrice);
  const specs = parseSpecs(description);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    addToCart(product);
    navigate("/commande");
  };

  const relatedProducts = allProducts
    .filter((p) => p.categoryId === categoryId && p.id !== id)
    .slice(0, 4);

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-main pt-15 pb-5">
        {/* ═══════════════════════════════════════════
            HERO SECTION — Image + Infos principales
            ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative px-4 sm:px-6 lg:px-14 pt-8 pb-6 lg:pb-16"
        >
          <div>
            {/* Breadcrumb élégant */}
            <nav
              aria-label="Fil d\'Ariane"
              className="flex items-center gap-2 text-sm font-bold text-text mb-8 flex-wrap p-4"
            >
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Accueil
              </Link>
              <span
                aria-hidden="true"
                className="icon-[mdi--chevron-right] w-4 h-4 opacity-50"
              />
              <Link
                to="/produits"
                className="hover:text-primary transition-colors duration-200"
              >
                Produits
              </Link>
              <span
                aria-hidden="true"
                className="icon-[mdi--chevron-right] w-4 h-4 opacity-50"
              />
              <Link
                to={`/produits?categorie=${categoryId}`}
                className="hover:text-primary transition-colors duration-200"
              >
                {categoryTitle}
              </Link>
              <span
                aria-hidden="true"
                className="icon-[mdi--chevron-right] w-4 h-4 opacity-100"
              />
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start bg-bg border border-purple-500/50 rounded-4xl p-6 lg:p-12 shadow-xl shadow-black/10">
              {/* ─── Colonne Image (5/12) ─── */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="relative group rounded-4xl bg-linear-to-br from-card-body to-surface border border-purple-500/50 overflow-hidden shadow-2xl shadow-black/20 ">
                  {/* Zone image avec effet de profondeur */}
                  <div className="relative aspect-square flex items-center justify-center p-8 lg:p-12 bg-linear-to-b from-transparent via-transparent to-black/5">
                    <div
                      className={`absolute inset-0 bg-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <img
                      src={image}
                      alt={name}
                      onLoad={() => setImageLoaded(true)}
                      className={`relative z-10 w-full h-full object-contain transition-all duration-700 ${
                        imageLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      } group-hover:scale-110 group-hover:drop-shadow-[0_20px_40px_rgba(37,99,235,0.15)]`}
                    />
                  </div>
                </div>

                {/* Mini gallery / thumbnails (placeholder pour futur) */}
                <div className="flex gap-3 mt-4 justify-start lg:justify-start py-2">
                  <div className="w-18 h-18 rounded-xl bg-card-body border-2 border-purple-500/30 flex items-center justify-center p-2 cursor-pointer">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-surface border border-purple-500/30 flex items-center justify-center p-2 cursor-pointer hover:border-white/20 transition-colors opacity-50">
                    <span className="icon-[mdi--image-multiple] w-6 h-6 text-text" />
                  </div>
                </div>
              </div>

              {/* ─── Colonne Infos (7/12) ─── */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* En-tête produit */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-muted leading-[1.1] tracking-tight py-2">
                    {name}
                  </h1>

                  {/* Rating / trust mini */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="icon-[mdi--star] w-4 h-4 text-amber-400"
                        />
                      ))}
                      <span className="text-sm font-semibold text-amber-400 ml-1">
                        4.9
                      </span>
                    </div>
                    <span className="text-sm text-text/70">
                      128 avis vérifiés
                    </span>
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-text/30" />
                    <span className="inline-block rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1  text-sm text-green-400 font-medium">
                      En stock
                    </span>
                  </div>
                </div>

                {/* Prix premium */}
                <div className="flex flex-wrap items-baseline gap-4 py-2">
                  {oldPrice && (
                    <span className="text-lg text-red-500/70 line-through font-medium">
                      {oldPrice.toLocaleString("fr-DZ")} DA
                    </span>
                  )}
                  <span className="text-2xl sm:text-4xl font-black text-text-muted">
                    {newPrice.toLocaleString("fr-DZ")}{" "}
                    <span className="text-lg font-semibold text-[var(--color-text-muted)]">
                      DA
                    </span>
                  </span>
                  {discount && (
                    <span className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm font-bold text-green-400">
                      Économisez {(oldPrice - newPrice).toLocaleString("fr-DZ")}{" "}
                      DA
                    </span>
                  )}
                </div>

                {/* Specs rapides — chips */}
                {specs.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-white/5 px-3 py-1.5 text-xs font-medium text-text-muted"
                      >
                        <span className="icon-[mdi--check-circle] w-3.5 h-3.5 text-primary/70" />
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Séparateur */}
                <div className="h-px bg-linear-to-r from-purple-500/70 via-white/5 to-transparent" />

                {/* CTA principaux */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`
                      flex-1 flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 active:scale-[0.97] cursor-pointer
                      ${
                        added
                          ? "bg-green-600 shadow-[0_8px_30px_rgba(22,163,74,0.35)]"
                          : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-[0_8px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.35)]"
                      }
                    `}
                  >
                    <span
                      className={`w-5 h-5 block transition-transform duration-300 ${added ? "scale-110" : ""}`}
                    >
                      {added ? (
                        <span className="icon-[mdi--check-circle] w-5 h-5" />
                      ) : (
                        <span className="icon-[mdi--cart-plus] w-5 h-5" />
                      )}
                    </span>
                    {added ? "Ajouté au panier !" : "Ajouter au panier"}
                  </button>

                  <button
                    type="button"
                    onClick={handleOrderNow}
                    className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.4)] transition-all duration-300 active:scale-[0.97] cursor-pointer"
                  >
                    <span className="icon-[mdi--lightning-bolt] w-5 h-5 block" />
                    Commander maintenant
                  </button>
                </div>

                {/* Trust bar horizontale */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      icon: "icon-[mdi--truck-fast]",
                      label: "Livraison 24-48h",
                      color: "text-blue-400",
                    },
                    {
                      icon: "icon-[mdi--shield-check]",
                      label: "Garantie 1 an",
                      color: "text-emerald-400",
                    },
                    {
                      icon: "icon-[mdi--certificate]",
                      label: "100% Authentique",
                      color: "text-amber-400",
                    },
                    {
                      icon: "icon-[mdi--refresh]",
                      label: "Retour 7 jours",
                      color: "text-rose-400",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-xl bg-[var(--color-surface)]/50 border border-white/5 px-3 py-3 hover:bg-[var(--color-surface)] transition-colors duration-200"
                    >
                      <span
                        className={`${item.icon} w-5 h-5 ${item.color} shrink-0`}
                      />
                      <span className="text-xs font-medium text-[var(--color-text-muted)] leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bouton scroll vers description */}
                <button
                  onClick={scrollToDescription}
                  className="self-start flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors cursor-pointer group"
                >
                  <span className="icon-[mdi--text-box] w-4 h-4" />
                  Voir la description complète
                  <span className="icon-[mdi--chevron-down] w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            DESCRIPTION RICHE — Section éditoriale
            ═══════════════════════════════════════════ */}
        <section
          ref={descriptionRef}
          className="relative px-4 sm:px-6 lg:px-14 py-10 lg:py-2"
        >
          <div className=" bg-bg rounded-4xl border-t border-text/10 p-2 sm:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Contenu principal */}
              <div className="lg:col-span-8">
                {/* Tabs navigation */}
                <div className="flex items-center justify-start gap-1 py-2">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "description"
                        ? "bg-purple-500 text-white shadow-lg shadow-primary/20"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "specs"
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    Spécifications
                  </button>
                  <button
                    onClick={() => setActiveTab("livraison")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      activeTab === "livraison"
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    Livraison
                  </button>
                </div>

                {/* Tab: Description */}
                {activeTab === "description" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative rounded-4xl bg-bg/20 border border-text/20 p-8 lg:p-12 shadow-xl shadow-black/10">
                      <h2 className="text-xl lg:text-3xl font-black text-[var(--color-text)] mb-6 flex items-center gap-3 pb-4">
                        <span className="icon-[mdi--information-box] w-7 h-7 text-primary" />
                        À propos de ce produit
                      </h2>

                      <div className="prose prose-invert max-w-none">
                        <p className="text-sm lg:text-lg text-[var(--color-text-muted)] leading-[1.8] first-letter:text-4xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                          {fullDescription}
                        </p>
                      </div>

                      {/* Highlights visuels */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/5">
                        {[
                          {
                            icon: "icon-[mdi--trophy]",
                            title: "Performance",
                            desc: "Optimisé pour le gaming compétitif",
                          },
                          {
                            icon: "icon-[mdi--cog-sync]",
                            title: "Compatibilité",
                            desc: "Fonctionne avec tous les setups",
                          },
                          {
                            icon: "icon-[mdi--thumb-up]",
                            title: "Qualité",
                            desc: "Matériaux premium et durables",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                          >
                            <span
                              className={`${item.icon} w-8 h-8 text-primary`}
                            />
                            <h3 className="text-sm font-bold text-[var(--color-text)]">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Specs */}
                {activeTab === "specs" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="rounded-[32px] bg-bg/20 border border-text/20 p-8 lg:p-12 shadow-xl shadow-black/10">
                      <h2 className="text-2xl lg:text-3xl font-black text-[var(--color-text)] mb-8 flex items-center gap-3">
                        <span className="icon-[mdi--clipboard-list] w-7 h-7 text-primary" />
                        Spécifications techniques
                      </h2>
                      <div className="space-y-3">
                        {specs.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="icon-[mdi--check-circle-outline] w-5 h-5 text-primary/60" />
                              <span className="text-sm font-medium text-[var(--color-text)]">
                                {spec}
                              </span>
                            </div>
                            <span className="icon-[mdi--star-four-points] w-4 h-4 text-[var(--color-text-muted)]/20" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Livraison */}
                {activeTab === "livraison" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="rounded-[32px] bg-bg/20 border border-text/20 p-8 lg:p-12 shadow-xl shadow-black/10">
                      <h2 className="text-2xl lg:text-3xl font-black text-[var(--color-text)] mb-8 flex items-center gap-3">
                        <span className="icon-[mdi--truck-delivery] w-7 h-7 text-primary" />
                        Livraison & Retours
                      </h2>
                      <div className="space-y-6">
                        {[
                          {
                            icon: "icon-[mdi--truck-fast]",
                            title: "Livraison express",
                            desc: "Votre commande est expédiée sous 24h et livrée en 24 à 48h ouvrables dans toute l'Algérie.",
                          },
                          {
                            icon: "icon-[mdi--package-check]",
                            title: "Emballage sécurisé",
                            desc: "Chaque produit est soigneusement protégé dans un emballage anti-choc et étanche.",
                          },
                          {
                            icon: "icon-[mdi--cash-refund]",
                            title: "Paiement à la livraison",
                            desc: "Payez en espèces à la réception de votre colier. Aucun paiement en ligne requis.",
                          },
                          {
                            icon: "icon-[mdi--arrow-u-left-top]",
                            title: "Retour facile 7 jours",
                            desc: "Vous disposez de 7 jours après réception pour retourner le produit si vous n'êtes pas satisfait.",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                          >
                            <span
                              className={`${item.icon} w-6 h-6 text-primary shrink-0 mt-0.5`}
                            />
                            <div>
                              <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar sticky */}
              <div className="grid gap-4 lg:col-span-4 lg:sticky lg:top-28 space-y-6 ">
                {/* Carte récap prix */}
                <div className="rounded-3xl bg-bg/20 border border-text/20 p-6">
                  <h3 className="text-md font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                    Récapitulatif
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">
                        Prix unitaire
                      </span>
                      <span className="font-semibold text-[var(--color-text)]">
                        {newPrice.toLocaleString("fr-DZ")} DA
                      </span>
                    </div>
                    {oldPrice && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">
                          Ancien prix
                        </span>
                        <span className="text-red-400 line-through">
                          {oldPrice.toLocaleString("fr-DZ")} DA
                        </span>
                      </div>
                    )}
                    {discount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-text-muted)]">
                          Réduction
                        </span>
                        <span className="text-green-400 font-semibold">
                          -{discount}%
                        </span>
                      </div>
                    )}
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text)] font-semibold">
                        Total
                      </span>
                      <span className="text-xl font-black text-primary">
                        {newPrice.toLocaleString("fr-DZ")} DA
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleOrderNow}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/20 transition-all duration-200 active:scale-[0.97] cursor-pointer"
                  >
                    <span className="icon-[mdi--lightning-bolt] w-5 h-5" />
                    Commander
                  </button>
                </div>

                {/* Carte aide */}
                <div className="rounded-3xl bg-bg/20 border border-text/20 p-6">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider ">
                    Besoin d\'aide ?
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+213"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <span className="icon-[mdi--phone] w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">
                          Appeler maintenant
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Disponible 9h-18h
                        </p>
                      </div>
                    </a>
                    <Link
                      to="/contact"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <span className="icon-[mdi--message-text] w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">
                          Nous écrire
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Réponse sous 2h
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PRODUITS SIMILAIRES — Carrousel horizontal
            ═══════════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <section className="relative px-4 sm:px-6 lg:px-14 py-16">
            <div className="rounded-4xl bg-bg border border-text/20 p-6 lg:p-12 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between mb-10 ">
                <div>
                  <h2 className="text-xl lg:text-3xl font-black text-[var(--color-text)] flex items-center gap-3 pb-2">
                    <span className="icon-[mdi--tag-multiple] w-7 h-7 text-primary shrink-0" />
                    Dans la même catégorie
                  </h2>
                  <p className="text-sm text-text py-2 ">
                    Vous pourriez aussi aimer ces produits :
                  </p>
                </div>
                <Link
                  to={`/produits?categorie=${categoryId}`}
                  className="flex rounded-2xl border border-primary justify-center items-center p-2 gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
                >
                  Voir tout
                  <span className="icon-[mdi--arrow-right] w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((p, idx) => (
                  <Link
                    key={p.id}
                    to={`/produit/${p.id}`}
                    className="group relative flex flex-col  rounded-2xl cursor-pointer bg-bg
                      border-l-2 border-t-2 border-r-4 border-b-4
                    border-l-purple-500 border-t-purple-500
                    border-r-text border-b-text
                    transition-all duration-500 ease-out
                    hover:-translate-y-1.5 hover:bg-glass-hover
                    hover:border-l-purple-500 hover:border-t-purple-500
                    hover:border-r-purple-500 hover:border-b-purple-500
                    hover:shadow-card-hover"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Image container */}
                    <div className="relative flex items-center justify-center rounded-t-2xl w-full h-40 sm:h-50 overflow-hidden bg-card-body border-b border-primary">
                      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 bg-linear-to-br from-blue-500/10 via-transparent to-cyan-500/8 transition-opacity duration-500 group-hover:opacity-100" />
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2.5">
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">
                        {categoryTitle}
                      </span>
                      <h3 className="text-sm font-bold text-[var(--color-text)] line-clamp-1 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-base font-black text-[var(--color-text)]">
                          {p.newPrice.toLocaleString("fr-DZ")} DA
                        </span>
                        <span className="icon-[mdi--arrow-right] w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ═══════════════════════════════════════════
          STICKY BAR MOBILE — CTA flottante
          ═══════════════════════════════════════════ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
          isStickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[var(--color-card-body)]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                {name}
              </p>
              <p className="text-lg font-black text-[var(--color-text)]">
                {newPrice.toLocaleString("fr-DZ")} DA
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all active:scale-95 cursor-pointer ${
                added ? "bg-green-600" : "bg-primary"
              }`}
            >
              <span
                className={`w-4 h-4 block ${added ? "icon-[mdi--check]" : "icon-[mdi--cart-plus]"}`}
              />
              {added ? "Ajouté" : "Panier"}
            </button>
            <button
              onClick={handleOrderNow}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-purple-600 active:scale-95 transition-all cursor-pointer"
            >
              <span className="icon-[mdi--lightning-bolt] w-4 h-4 block" />
              Commander
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
