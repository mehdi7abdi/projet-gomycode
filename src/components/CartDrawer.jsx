import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function CartDrawer() {
  const {
    items,
    cartTotal,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    clearCart,
  } = useCart();

  const drawerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    if (cartOpen) drawerRef.current?.focus();
  }, [cartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setCartOpen(false)}
        className={`
          fixed inset-0 z-10110 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Panier d'achat"
        className={`
          fixed top-0 right-0 z-10120
          h-full w-full sm:w-[50vw] lg:w-[35vw]
          flex flex-col
          bg-bg/90 border-l border-purple-500
          backdrop-blur-xl
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${cartOpen ? "translate-x-0" : "translate-x-full"}
          outline-none
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="icon-[mdi--cart-variant] w-5 h-5 text-primary"
            />
            <h2 className="text-base font-bold text-text">Mon panier</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Fermer le panier"
            className="p-2 rounded-xl border border-transparent hover:bg-white/8 hover:border-white/15 transition-all duration-200 cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="icon-[mdi--close] w-5 h-5 text-text-muted block"
            />
          </button>
        </div>

        {/* Liste articles */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <span
                aria-hidden="true"
                className="icon-[mdi--cart-off] w-16 h-16 text-text-muted/40"
              />
              <p className="text-text-muted text-sm font-medium">
                Votre panier est vide
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/80 transition-all duration-200 cursor-pointer"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 list-none m-0 p-0">
              {items.map((item) => (
                <li key={item.id}>
                  <CartItem
                    item={item}
                    onRemove={removeFromCart}
                    onQtyChange={updateQty}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-purple-500/30 px-4 sm:px-5 py-5 shrink-0">
            <div className="flex flex-col gap-3">
              {/* Résumé articles */}
              <div className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-[12px]"
                  >
                    <span className="text-text-muted truncate max-w-[60%]">
                      {item.name}{" "}
                      <span className="text-purple-400">×{item.qty}</span>
                    </span>
                    <span className="text-text font-semibold shrink-0">
                      {(item.newPrice * item.qty).toLocaleString("fr-DZ")} DA
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted font-medium">
                  Total
                </span>
                <span className="text-xl font-black text-text">
                  {cartTotal.toLocaleString("fr-DZ")} DA
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  navigate("/commande");
                }}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/80 text-white text-sm font-bold shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.5)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Passer la commande
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="text-xs p-2 text-text border border-red-400 rounded-2xl hover:text-red-500 transition-colors duration-200 cursor-pointer"
              >
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItem({ item, onRemove, onQtyChange }) {
  const { id, name, image, newPrice, qty } = item;

  return (
    <article className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-bg border border-purple-500/50 hover:border-purple-500/30 transition-all duration-200">
      <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-xl overflow-hidden bg-bg flex items-center justify-center border border-white/8">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-1"
        />
      </div>

      <div className="flex flex-1 flex-col min-w-0 gap-1.5">
        <p className="text-[12px] sm:text-[13px] font-semibold text-text truncate">
          {name}
        </p>
        <p className="text-[11px] sm:text-[12px] text-text-muted">
          Unitaire :{" "}
          <span className="text-primary font-semibold">
            {newPrice.toLocaleString("fr-DZ")} DA
          </span>
        </p>
        <p className="text-[12px] sm:text-[13px] font-bold text-text">
          Sous-total :{" "}
          <span className="text-purple-400">
            {(newPrice * qty).toLocaleString("fr-DZ")} DA
          </span>
        </p>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1 rounded-2xl border border-purple-500/50 overflow-hidden">
            <button
              type="button"
              onClick={() => onQtyChange(id, qty - 1)}
              aria-label="Diminuer"
              className="px-2 py-1.5 text-text-muted hover:text-text hover:bg-white/8 transition-all duration-150 cursor-pointer text-sm font-bold"
            >
              −
            </button>
            <span className="px-2 text-[12px] font-bold text-text min-w-5 text-center">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => onQtyChange(id, qty + 1)}
              aria-label="Augmenter"
              className="px-2 py-1.5 text-text-muted hover:text-text hover:bg-white/8 transition-all duration-150 cursor-pointer text-sm font-bold"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(id)}
            aria-label={`Supprimer ${name} du panier`}
            className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="icon-[mdi--trash-can-outline] w-4 h-4 block"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
