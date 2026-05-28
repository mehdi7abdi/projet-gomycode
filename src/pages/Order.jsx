import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { allProducts } from "../utils/products";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

// ─────────────────────────────────────────────
// DONNÉES WILAYAS + TARIFS LIVRAISON
// ─────────────────────────────────────────────
const WILAYAS = [
  { id: 1, name: "Adrar", domicile: 1100, stopdesk: 750 },
  { id: 2, name: "Chlef", domicile: 680, stopdesk: 400 },
  { id: 3, name: "Laghouat", domicile: 880, stopdesk: 550 },
  { id: 4, name: "Oum El Bouaghi", domicile: 700, stopdesk: 350 },
  { id: 5, name: "Batna", domicile: 700, stopdesk: 400 },
  { id: 6, name: "Béjaïa", domicile: 700, stopdesk: 400 },
  { id: 7, name: "Biskra", domicile: 950, stopdesk: 620 },
  { id: 8, name: "Béchar", domicile: 1100, stopdesk: 720 },
  { id: 9, name: "Blida", domicile: 500, stopdesk: 350 },
  { id: 10, name: "Bouira", domicile: 700, stopdesk: 520 },
  { id: 11, name: "Tamanrasset", domicile: 1600, stopdesk: 1120 },
  { id: 12, name: "Tébessa", domicile: 900, stopdesk: 570 },
  { id: 13, name: "Tlemcen", domicile: 900, stopdesk: 570 },
  { id: 14, name: "Tiaret", domicile: 850, stopdesk: 520 },
  { id: 15, name: "Tizi Ouzou", domicile: 630, stopdesk: 400 },
  { id: 16, name: "Alger", domicile: 450, stopdesk: 200 },
  { id: 17, name: "Djelfa", domicile: 950, stopdesk: 570 },
  { id: 18, name: "Jijel", domicile: 900, stopdesk: 520 },
  { id: 19, name: "Sétif", domicile: 690, stopdesk: 400 },
  { id: 20, name: "Saïda", domicile: 900, stopdesk: 570 },
  { id: 21, name: "Skikda", domicile: 900, stopdesk: 520 },
  { id: 22, name: "Sidi Bel Abbès", domicile: 900, stopdesk: 520 },
  { id: 23, name: "Annaba", domicile: 700, stopdesk: 400 },
  { id: 24, name: "Guelma", domicile: 900, stopdesk: 520 },
  { id: 25, name: "Constantine", domicile: 680, stopdesk: 400 },
  { id: 26, name: "Médéa", domicile: 800, stopdesk: 520 },
  { id: 27, name: "Mostaganem", domicile: 900, stopdesk: 520 },
  { id: 28, name: "M'Sila", domicile: 850, stopdesk: 570 },
  { id: 29, name: "Mascara", domicile: 900, stopdesk: 520 },
  { id: 30, name: "Ouargla", domicile: 950, stopdesk: 670 },
  { id: 31, name: "Oran", domicile: 580, stopdesk: 380 },
  { id: 32, name: "El Bayadh", domicile: 1100, stopdesk: 670 },
  { id: 33, name: "Illizi", domicile: 1700, stopdesk: 1200 },
  { id: 34, name: "Bordj Bou Arréridj", domicile: 800, stopdesk: 520 },
  { id: 35, name: "Boumerdès", domicile: 550, stopdesk: 350 },
  { id: 36, name: "El Tarf", domicile: 850, stopdesk: 520 },
  { id: 37, name: "Tindouf", domicile: 1350, stopdesk: 900 },
  { id: 38, name: "Tissemsilt", domicile: 900, stopdesk: 520 },
  { id: 39, name: "El Oued", domicile: 950, stopdesk: 670 },
  { id: 40, name: "Khenchela", domicile: 900, stopdesk: 520 },
  { id: 41, name: "Souk Ahras", domicile: 900, stopdesk: 520 },
  { id: 42, name: "Tipaza", domicile: 550, stopdesk: 350 },
  { id: 43, name: "Mila", domicile: 900, stopdesk: 520 },
  { id: 44, name: "Aïn Defla", domicile: 900, stopdesk: 520 },
  { id: 45, name: "Naâma", domicile: 1100, stopdesk: 670 },
  { id: 46, name: "Aïn Témouchent", domicile: 900, stopdesk: 520 },
  { id: 47, name: "Ghardaïa", domicile: 950, stopdesk: 620 },
  { id: 48, name: "Relizane", domicile: 900, stopdesk: 520 },
  { id: 49, name: "Timimoun", domicile: 1400, stopdesk: 1000 },
  { id: 50, name: "Bordj Badji Mokhtar", domicile: 0, stopdesk: 0 },
  { id: 51, name: "Ouled Djellal", domicile: 950, stopdesk: 620 },
  { id: 52, name: "Béni Abbès", domicile: 1100, stopdesk: 970 },
  { id: 53, name: "In Salah", domicile: 1600, stopdesk: 1100 },
  { id: 54, name: "In Guezzam", domicile: 0, stopdesk: 0 },
  { id: 55, name: "Touggourt", domicile: 950, stopdesk: 670 },
  { id: 56, name: "Djanet", domicile: 2400, stopdesk: 1750 },
  { id: 57, name: "M'Ghair", domicile: 950, stopdesk: 0 },
  { id: 58, name: "El Méniaa", domicile: 1000, stopdesk: 550 },
];

// ─────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function Order() {
  const { items, updateQty, removeFromCart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Formulaire
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    wilaya: "",
    adresse: "",
    remarque: "",
  });
  const [livraisonType, setLivraisonType] = useState("domicile"); // "domicile" | "stopdesk"
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Recherche produit (état vide)
  const [searchOpen, setSearchOpen] = useState(false);
  const addBtnRef = useRef(null); // ancre portal dropdown (bouton ajouter)

  // Tarif livraison
  const selectedWilaya = WILAYAS.find((w) => w.id === parseInt(form.wilaya));
  const fraisLivraison = selectedWilaya
    ? livraisonType === "domicile"
      ? selectedWilaya.domicile
      : selectedWilaya.stopdesk
    : null;

  const sousTotalProduits = items.reduce((s, i) => s + i.newPrice * i.qty, 0);
  const totalCommande = sousTotalProduits + (fraisLivraison ?? 0);

  // Validation
  const validate = () => {
    const e = {};
    if (!form.prenom.trim()) e.prenom = "Requis";
    if (!form.nom.trim()) e.nom = "Requis";
    if (!form.telephone.trim()) e.telephone = "Requis";
    else if (!/^(0[5-7]\d{8})$/.test(form.telephone.replace(/\s/g, "")))
      e.telephone = "Numéro invalide (ex: 0551234567)";
    if (!form.wilaya) e.wilaya = "Choisissez une wilaya";
    if (!form.adresse.trim()) e.adresse = "Requis";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }

    // Simulation envoi
    console.log("=== NOUVELLE COMMANDE ===", {
      client: form,
      livraison: {
        type: livraisonType,
        wilaya: selectedWilaya?.name,
        frais: fraisLivraison,
      },
      produits: items,
      total: totalCommande,
    });

    setSubmitted(true);
    clearCart();
  };

  // ─────────────── ÉTAT SUCCÈS ───────────────
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-main flex items-center justify-center px-4 pt-24 pb-20">
          <div className="max-w-md w-full text-center flex flex-col items-center gap-6 rounded-3xl border border-green-500/30 bg-bg p-10 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30">
              <span className="icon-[mdi--check-circle] w-10 h-10 text-green-400 block" />
            </div>
            <h1 className="text-2xl font-black text-text">
              Commande envoyée !
            </h1>
            <p className="text-text-muted text-sm leading-relaxed">
              Merci pour votre commande. Notre équipe vous contactera bientôt au{" "}
              <span className="text-green-400 font-semibold">
                {form.telephone}
              </span>{" "}
              pour confirmer la livraison.
            </p>
            <Link
              to="/produits"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/80 transition-all"
            >
              <span className="icon-[mdi--arrow-left] w-4 h-4" />
              Continuer mes achats
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ─────────────── PANIER VIDE ───────────────
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-hero pt-28 pb-20 px-4 sm:px-10 lg:px-20">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-bg/80 backdrop-blur-xl p-8 sm:p-12 flex flex-col items-center text-center gap-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20">
                <span className="icon-[mdi--cart-off] w-10 h-10 text-text-muted/60 block" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-text mb-2">
                  Votre panier est vide
                </h1>
                <p className="text-text-muted text-sm">
                  Recherchez un produit pour commencer votre commande.
                </p>
              </div>

              {/* Barre de recherche */}
              <div className="relative w-full max-w-md">
                <button
                  ref={addBtnRef}
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-purple-500/50 bg-surface text-sm text-text-muted hover:border-purple-500 transition-all cursor-pointer"
                >
                  <span className="icon-[mdi--magnify] w-5 h-5 shrink-0" />
                  Ex : ASUS ROG, souris, clavier...
                </button>
                {searchOpen && (
                  <AddProductPortal
                    anchorRef={addBtnRef}
                    onAdd={(product) => {
                      addToCart(product);
                    }}
                    onClose={() => setSearchOpen(false)}
                  />
                )}
              </div>

              <Link
                to="/produits"
                className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Ou parcourir le catalogue →
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ─────────────── PAGE PRINCIPALE ───────────────
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-hero pt-28 pb-20 px-4 sm:px-6 lg:px-14">
        {/* Header */}
        <div className="mb-8">
          <p className="text-purple-500 text-sm font-bold uppercase tracking-widest mb-1">
            Finaliser
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
            Ma commande
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start pt-4">
          {/* ── COLONNE GAUCHE ── */}
          <div className="flex flex-col gap-6">
            {/* Produits sélectionnés */}
            <section className="rounded-3xl border border-white/10 bg-bg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-text flex items-center gap-2">
                  <span className="icon-[mdi--cart-variant] w-5 h-5 text-primary" />
                  Produits ({items.reduce((s, i) => s + i.qty, 0)})
                </h2>
                {/* Ajouter un autre produit */}
                <div className="relative">
                  <button
                    ref={addBtnRef}
                    type="button"
                    onClick={() => setSearchOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/40 text-xs font-semibold text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer"
                  >
                    <span className="icon-[mdi--plus] w-3.5 h-3.5" />
                    Ajouter un produit
                  </button>
                  {searchOpen && (
                    <AddProductPortal
                      anchorRef={addBtnRef}
                      onAdd={(product) => {
                        addToCart(product);
                      }}
                      onClose={() => setSearchOpen(false)}
                    />
                  )}
                </div>
              </div>

              <ul className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    onQtyChange={updateQty}
                    onRemove={removeFromCart}
                  />
                ))}
              </ul>
            </section>

            {/* Formulaire */}
            <section className="rounded-3xl border border-white/10 bg-bg p-6">
              <h2 className="text-base font-bold text-text flex items-center gap-2 mb-6">
                <span className="icon-[mdi--account-outline] w-5 h-5 text-primary" />
                Informations de livraison
              </h2>

              <form
                id="order-form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 py-4"
              >
                {/* Prénom + Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Prénom" error={errors.prenom}>
                    <input
                      name="prenom"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Ex : Yacine"
                      value={form.prenom}
                      onChange={handleChange}
                      className={inputCls(errors.prenom)}
                    />
                  </Field>
                  <Field label="Nom" error={errors.nom}>
                    <input
                      name="nom"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Ex : Belarbi"
                      value={form.nom}
                      onChange={handleChange}
                      className={inputCls(errors.nom)}
                    />
                  </Field>
                </div>

                {/* Téléphone + Wilaya */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Numéro de téléphone" error={errors.telephone}>
                    <input
                      name="telephone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Ex : 0551234567"
                      value={form.telephone}
                      onChange={handleChange}
                      className={inputCls(errors.telephone)}
                    />
                  </Field>
                  <Field label="Wilaya" error={errors.wilaya}>
                    <select
                      name="wilaya"
                      value={form.wilaya}
                      onChange={handleChange}
                      className={selectCls(errors.wilaya)}
                    >
                      <option value="">-- Choisir une wilaya --</option>
                      {WILAYAS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.id} - {w.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Adresse */}
                <Field label="Adresse complète" error={errors.adresse}>
                  <input
                    name="adresse"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rue, quartier, numéro..."
                    value={form.adresse}
                    onChange={handleChange}
                    className={inputCls(errors.adresse)}
                  />
                </Field>

                {/* Remarque */}
                <Field label="Remarque (optionnel)">
                  <textarea
                    name="remarque"
                    rows={3}
                    placeholder="Précisions sur la commande ou la livraison..."
                    value={form.remarque}
                    onChange={handleChange}
                    className="resize-none w-full rounded-xl border border-purple-500/40 bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </Field>
              </form>
            </section>
          </div>

          {/* ── COLONNE DROITE — RÉSUMÉ ── */}
          <div className="flex flex-col gap-6 xl:sticky xl:top-28">
            {/* Box résumé produits */}
            <section className="rounded-3xl border border-purple-500/30 bg-bg p-6">
              <h2 className="text-base font-bold text-text flex items-center gap-2 mb-5">
                <span className="icon-[mdi--receipt-text-outline] w-5 h-5 text-purple-400" />
                Récapitulatif
              </h2>

              {/* Liste produits résumé */}
              <ul className="flex flex-col gap-3 mb-5 py-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-contain rounded-lg bg-surface border border-white/8 shrink-0 p-1"
                      />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-text truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-text-muted">
                          <span className="text-purple-400 font-bold">
                            ×{item.qty}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-text shrink-0">
                      {(item.newPrice * item.qty).toLocaleString("fr-DZ")} DA
                    </span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-white/8 mb-4" />

              {/* Sous-total */}
              <div className="flex items-center justify-between text-sm mb-3 py-4">
                <span className="text-text-muted">Sous-total produits</span>
                <span className="font-bold text-text">
                  {sousTotalProduits.toLocaleString("fr-DZ")} DA
                </span>
              </div>

              {/* Choix livraison */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
                  Mode de livraison
                </p>
                <div className="flex flex-col gap-2 py-4">
                  <LivraisonOption
                    type="domicile"
                    selected={livraisonType === "domicile"}
                    onSelect={() => setLivraisonType("domicile")}
                    price={selectedWilaya?.domicile}
                    label="À domicile"
                    icon="icon-[mdi--home-outline]"
                    description="Livraison à votre adresse"
                  />
                  <LivraisonOption
                    type="stopdesk"
                    selected={livraisonType === "stopdesk"}
                    onSelect={() => setLivraisonType("stopdesk")}
                    price={selectedWilaya?.stopdesk}
                    label="Bureau de livraison"
                    icon="icon-[mdi--store-outline]"
                    description="Retrait au stopdesk"
                  />
                </div>
                {!form.wilaya && (
                  <p className="text-[11px] text-text-muted mt-2 flex items-center gap-1 py-2">
                    <span className="icon-[mdi--information-outline] w-3.5 h-3.5" />
                    Sélectionnez une wilaya pour voir les tarifs
                  </p>
                )}
              </div>

              <div className="h-px bg-white/8 mb-4" />

              {/* Total final */}
              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-semibold text-text-muted">
                  Total commande
                </span>
                <div className="text-right">
                  <span className="text-2xl font-black text-text">
                    {form.wilaya
                      ? totalCommande.toLocaleString("fr-DZ")
                      : sousTotalProduits.toLocaleString("fr-DZ")}{" "}
                    DA
                  </span>
                  {!form.wilaya && (
                    <p className="text-[10px] text-text-muted">
                      + frais de livraison
                    </p>
                  )}
                </div>
              </div>

              {/* Livraison détail */}
              {form.wilaya && fraisLivraison !== null && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-text-muted flex items-center gap-1.5">
                    <span
                      className={`w-4 h-4 ${livraisonType === "domicile" ? "icon-[mdi--home-outline]" : "icon-[mdi--store-outline]"}`}
                    />
                    Livraison ({selectedWilaya?.name})
                  </span>
                  <span className="font-bold text-purple-400">
                    {fraisLivraison === 0
                      ? "Gratuit"
                      : `${fraisLivraison.toLocaleString("fr-DZ")} DA`}
                  </span>
                </div>
              )}
            </section>

            {/* Bouton envoyer */}
            <button
              type="submit"
              form="order-form"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary hover:bg-primary/80 text-white font-black text-base shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.55)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span className="icon-[mdi--send] w-5 h-5" />
              Envoyer la commande
            </button>

            {/* Garanties */}
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: "icon-[mdi--shield-check]",
                  label: "Paiement à la livraison",
                },
                { icon: "icon-[mdi--truck-fast]", label: "Livraison 24-48h" },
                {
                  icon: "icon-[mdi--lock-outline]",
                  label: "Données sécurisées",
                },
                { icon: "icon-[mdi--headset]", label: "Support réactif" },
              ].map((g) => (
                <div
                  key={g.label}
                  className="flex items-center gap-2 rounded-xl border border-white/8 bg-bg px-3 py-2.5"
                >
                  <span className={`${g.icon} w-4 h-4 text-primary shrink-0`} />
                  <span className="text-[11px] font-medium text-text-muted leading-tight">
                    {g.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────
// SOUS-COMPOSANTS
// ─────────────────────────────────────────────

function OrderItem({ item, onQtyChange, onRemove }) {
  const { id, name, image, newPrice, oldPrice, qty, categoryIcon } = item;
  const discount = oldPrice
    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
    : null;

  return (
    <li className="flex gap-4 p-4 rounded-2xl bg-surface border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200">
      {/* Image */}
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-bg border border-white/8 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-1.5"
        />
      </div>

      {/* Infos */}
      <div className="flex flex-1 flex-col min-w-0 gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-text truncate">{name}</p>
            <span className="text-[11px] text-purple-400 font-semibold">
              {categoryIcon}
            </span>
          </div>
          {discount && (
            <span className="shrink-0 rounded-md bg-red-600/20 border border-red-600/30 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Prix */}
          <div className="flex flex-col">
            <span className="text-[11px] text-text-muted py-1">
              {newPrice.toLocaleString("fr-DZ")} DA / unité
            </span>
            {oldPrice && (
              <span className="text-[11px] text-red-400 line-through">
                {oldPrice.toLocaleString("fr-DZ")} DA
              </span>
            )}
            <span className="text-[14px] font-black text-text">
              {(newPrice * qty).toLocaleString("fr-DZ")} DA
            </span>
          </div>

          {/* Contrôles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-purple-500/40 overflow-hidden">
              <button
                type="button"
                onClick={() => onQtyChange(id, qty - 1)}
                disabled={qty <= 1}
                className="px-2.5 py-1.5 text-text-muted hover:text-text hover:bg-white/8 transition-all text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                −
              </button>
              <span className="px-2.5 text-[13px] font-bold text-text min-w-6 text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onQtyChange(id, qty + 1)}
                className="px-2.5 py-1.5 text-text-muted hover:text-text hover:bg-white/8 transition-all text-sm font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => onRemove(id)}
              aria-label={`Supprimer ${name}`}
              className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <span className="icon-[mdi--trash-can-outline] w-4 h-4 block" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function LivraisonOption({
  type,
  selected,
  onSelect,
  price,
  label,
  icon,
  description,
}) {
  const unavailable = price === 0;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={unavailable}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer
        ${
          unavailable
            ? "opacity-40 cursor-not-allowed border-white/10 bg-transparent"
            : selected
              ? "border-purple-500 bg-purple-500/10"
              : "border-white/15 bg-surface/60 hover:border-purple-500/40"
        }
      `}
    >
      <div
        className={`
        flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all
        ${selected ? "border-purple-500 bg-purple-500" : "border-white/30"}
      `}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
      </div>

      <span
        className={`${icon} w-4 h-4 shrink-0 ${selected ? "text-purple-400" : "text-text-muted"}`}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold ${selected ? "text-purple-300" : "text-text"}`}
        >
          {label}
        </p>
        <p className="text-[11px] text-text-muted">{description}</p>
      </div>

      <span
        className={`text-sm font-black shrink-0 ${selected ? "text-purple-400" : "text-text-muted"}`}
      >
        {price === undefined ? (
          <span className="text-[11px] font-medium">—</span>
        ) : price === 0 ? (
          "N/D"
        ) : (
          `${price.toLocaleString("fr-DZ")} DA`
        )}
      </span>
    </button>
  );
}

// Dropdown portal pour le cas "panier vide" — ancré sur l'input de recherche
function SearchResultsDropdown({ results, query, onAdd, anchorRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!anchorRef?.current) return;
    const update = () => {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef, query]);

  if (query.trim().length < 1) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: Math.max(pos.width, 320),
        zIndex: 99999,
      }}
      className="rounded-2xl border border-purple-500/60 bg-bg shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      <ProductList results={results} query={query} onAdd={onAdd} />
    </div>,
    document.body,
  );
}

// Portal pour le bouton "Ajouter un produit" — contient son propre input + résultats
function AddProductPortal({ anchorRef, onAdd, onClose }) {
  const [q, setQ] = useState("");
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const inputRef = useRef(null);

  const results =
    q.trim().length < 1
      ? []
      : allProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.description.toLowerCase().includes(q.toLowerCase()) ||
              p.categoryTitle.toLowerCase().includes(q.toLowerCase()),
          )
          .slice(0, 8);

  useEffect(() => {
    if (!anchorRef?.current) return;
    const update = () => {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY + 6,
        right: window.innerWidth - rect.right,
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchorRef]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Fermer au clic extérieur
  useEffect(() => {
    const handler = (e) => {
      if (anchorRef.current?.contains(e.target)) return;
      if (inputRef.current?.closest("[data-portal-add]")?.contains(e.target))
        return;
      onClose();
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [onClose, anchorRef]);

  return createPortal(
    <div
      data-portal-add
      style={{
        position: "absolute",
        top: pos.top,
        right: pos.right,
        width: 320,
        zIndex: 99999,
      }}
      className="rounded-2xl border border-purple-500/60 bg-bg shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      <div className="p-3 border-b border-white/8">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 icon-[mdi--magnify] w-4 h-4 text-text-muted pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full rounded-xl border border-purple-500/30 bg-surface pl-9 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>
      </div>
      <ProductList
        results={results}
        query={q}
        onAdd={(p) => {
          onAdd(p);
          setQ("");
          onClose();
        }}
      />
    </div>,
    document.body,
  );
}

// Liste de résultats partagée
function ProductList({ results, query, onAdd }) {
  if (query.trim().length < 1) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 px-4 text-center">
        <span className="icon-[mdi--magnify] w-7 h-7 text-text-muted/30" />
        <p className="text-xs text-text-muted">
          Tapez pour rechercher un produit
        </p>
      </div>
    );
  }
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 px-4 text-center">
        <span className="icon-[mdi--magnify-close] w-7 h-7 text-text-muted/40" />
        <p className="text-sm text-text-muted">
          Aucun résultat pour{" "}
          <span className="text-text font-semibold">"{query}"</span>
        </p>
      </div>
    );
  }
  return (
    <ul className="divide-y divide-white/6 max-h-80 overflow-y-auto">
      {results.map((product) => (
        <li key={product.id}>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/8 transition-all text-left cursor-pointer"
          >
            <div className="w-12 h-12 shrink-0 rounded-xl bg-surface border border-white/8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-purple-400 font-semibold">
                {product.categoryIcon} {product.categoryTitle}
              </p>
              <p className="text-[13px] font-bold text-text truncate">
                {product.name}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[13px] font-black text-text">
                {product.newPrice.toLocaleString("fr-DZ")} DA
              </span>
              <span className="icon-[mdi--plus-circle] w-5 h-5 text-primary mt-0.5" />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wide text-text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <span className="icon-[mdi--alert-circle-outline] w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(error) {
  return `w-full rounded-xl border ${error ? "border-red-500/60" : "border-purple-500/40"} bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`;
}

function selectCls(error) {
  return `w-full rounded-xl border ${error ? "border-red-500/60" : "border-purple-500/40"} bg-surface px-4 py-3 text-sm text-text focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer`;
}
