import { Link } from "react-router-dom";

export default function Footer() {
  const socials = [
    { label: "Facebook",    icon: "icon-[mdi--facebook]",   href: "https://facebook.com/HcaTechdz",  color: "hover:text-blue-500 hover:border-blue-500/50" },
    { label: "Instagram",   icon: "icon-[mdi--instagram]",  href: "https://instagram.com/HcaTechdz", color: "hover:text-pink-700 hover:border-pink-500/50" },
    { label: "TikTok",      icon: "icon-[mdi--music-note]", href: "https://tiktok.com/@HcaTechdz",   color: "hover:text-black hover:border-black/30" },
    { label: "YouTube",     icon: "icon-[mdi--youtube]",    href: "https://youtube.com/@HcaTechdz",  color: "hover:text-red-500 hover:border-red-500/50" },
    { label: "Twitter / X", icon: "icon-[mdi--twitter]",    href: "https://twitter.com/HcaTechdz",   color: "hover:text-sky-400 hover:border-sky-400/50" },
  ];

  const links = [
    { label: "Catalogue",    href: "/#/produits",  isRoute: false },
    { label: "Avis clients", href: "#avis",      isRoute: false },
    { label: "Contact",      href: "#contact",   isRoute: false },
    { label: "CGV",          to: "/cgv",         isRoute: true  },
  ];

  const infos = [
    { icon: "icon-[mdi--phone]",              value: "0555 055 066",        href: "tel:+213555055066" },
    { icon: "icon-[mdi--email-outline]",      value: "mehdihca@outlook.fr", href: "mailto:mehdihca@outlook.fr" },
    { icon: "icon-[mdi--map-marker-outline]", value: "Alger, Algérie",      href: null },
  ];

  return (
    <footer aria-label="Pied de page" className="border-t border-border bg-surface">
      <div className="px-6 sm:px-10 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Colonne 1 — Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/" aria-label="HCA Tech — Retour à l'accueil" className="flex items-center gap-2.5 w-fit">
            <img src="/logo-hca-tech.png" alt="Logo HCA Tech" width="36" height="36" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold tracking-tight leading-none select-none">
              <span className="text-primary">Hca</span>
              <span className="text-text"> Tech</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-text-muted max-w-xs">
            Votre référence tech en Algérie. PC portables, moniteurs, accessoires gaming et équipements professionnels.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border border-border text-text-muted transition-all duration-200 ${s.color}`}>
                <span aria-hidden="true" className={`${s.icon} w-5 h-5`} />
              </a>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Liens */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-text-muted">Navigation</p>
          <ul className="flex flex-col gap-2 list-none">
            {links.map((l) => (
              <li key={l.label}>
                {l.isRoute ? (
                  <Link to={l.to} className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors duration-200">
                    <span aria-hidden="true" className="icon-[mdi--chevron-right] w-4 h-4 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.href} className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors duration-200">
                    <span aria-hidden="true" className="icon-[mdi--chevron-right] w-4 h-4 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Contact */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-text-muted">Contact</p>
          <ul className="flex flex-col gap-3 list-none">
            {infos.map((info) => (
              <li key={info.value} className="flex items-center gap-3">
                <span aria-hidden="true" className={`${info.icon} w-4 h-4 text-primary shrink-0`} />
                {info.href ? (
                  <a href={info.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <span className="text-sm text-text-muted">{info.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>© 2026 <span className="text-primary font-semibold">HCA Tech</span>. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Developed by <span className="text-purple-500">WinchLabs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

