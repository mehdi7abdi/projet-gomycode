import { useState } from "react";

const socials = [
  {
    label: "Facebook",
    icon: "icon-[mdi--facebook]",
    href: "https://facebook.com/HcaTechdz",
    color: "hover:text-blue-500",
  },
  {
    label: "Instagram",
    icon: "icon-[mdi--instagram]",
    href: "https://instagram.com/HcaTechdz",
    color: "hover:text-pink-600",
  },
  {
    label: "TikTok",
    icon: "icon-[mdi--music-note]",
    href: "https://tiktok.com/@HcaTechdz",
    color: "hover:text-black",
  },
  {
    label: "YouTube",
    icon: "icon-[mdi--youtube]",
    href: "https://youtube.com/@HcaTechdz",
    color: "hover:text-red-500",
  },
  {
    label: "Twitter / X",
    icon: "icon-[mdi--twitter]",
    href: "https://twitter.com/HcaTechdz",
    color: "hover:text-sky-400",
  },
];

const infos = [
  {
    icon: "icon-[mdi--phone]",
    label: "Téléphone",
    value: "0555 055 066",
    href: "tel:+213555055066",
  },
  {
    icon: "icon-[mdi--email-outline]",
    label: "Email",
    value: "mehdihca@outlook.fr",
    href: "mailto:mehdihca@outlook.fr",
  },
  {
    icon: "icon-[mdi--map-marker-outline]",
    label: "Adresse",
    value: "Alger, Algérie",
    href: null,
  },
  {
    icon: "icon-[mdi--clock-outline]",
    label: "Horaires",
    value: "Sam – Jeu : 9h – 18h",
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      aria-label="Nous contacter"
      className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-10 lg:px-20"
    >
      {/* Titre */}
      <div className="w-full mx-auto pb-8 sm:pb-10 text-center">
        <p className="text-purple-500 text-base sm:text-xl font-extrabold uppercase tracking-[0.2em] mb-2">
          Contactez-nous
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text tracking-tight">
          On est là pour vous
        </h2>
        <p className="text-text-muted font-semibold mt-2 text-sm sm:text-base">
          Une question, une commande, un conseil ? Écrivez-nous.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        {/* Infos + Réseaux */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="rounded-2xl border-l border-t border-b-4 border-r-4 border-purple-500 bg-surface p-4 sm:p-6 flex flex-col gap-4">
            {infos.map((info) => (
              <div
                key={info.label}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <span
                    aria-hidden="true"
                    className={`${info.icon} w-4 h-4 sm:w-5 sm:h-5 text-primary`}
                  />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-text-muted uppercase tracking-wide">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm font-bold text-text hover:text-[#38bdf8] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-text">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-l border-t border-b-4 border-r-4 border-purple-500 bg-surface p-4 sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-text-muted mb-3 sm:mb-4">
              Suivez-nous
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs sm:text-sm font-semibold text-text-muted transition-all duration-200 hover:border-primary ${s.color}`}
                >
                  <span
                    aria-hidden="true"
                    className={`${s.icon} w-4 h-4 sm:w-5 sm:h-5`}
                  />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="rounded-2xl border-l border-t border-b-4 border-r-4 border-purple-500 bg-surface p-4 sm:p-6 md:p-8">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] text-text-muted mb-5 sm:mb-6">
            Envoyer un message
          </p>

          {sent && (
            <div
              role="alert"
              className="mb-4 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400"
            >
              <span
                aria-hidden="true"
                className="icon-[mdi--check-circle-outline] w-5 h-5"
              />
              Message envoyé ! On vous répond rapidement.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs font-semibold text-text-muted uppercase tracking-wide"
              >
                Nom complet
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Ex : Yacine Belarbi"
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-purple-500 bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold text-text-muted uppercase tracking-wide"
              >
                Adresse email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                className="rounded-xl border border-purple-500 bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs font-semibold text-text-muted uppercase tracking-wide"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Votre message..."
                value={form.message}
                onChange={handleChange}
                className="resize-none rounded-xl border border-purple-500 bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="icon-[mdi--send-outline] w-4 h-4"
              />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
