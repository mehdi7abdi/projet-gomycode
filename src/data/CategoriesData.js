// data/categoriesData.js

export const categoriesData = [
  // ─────────────────────────────────────────────
  // 1. PC PORTABLES
  // ─────────────────────────────────────────────
  {
    id: "pc-portables",
    title: "PC Portables",
    icon: "💻",
    products: [
      {
        id: "pc-1",
        name: "ASUS ROG Zephyrus G16",
        description: "RTX 4080 · Intel Core i9 · 32 Go RAM · 1 To SSD",
        oldPrice: 389000,
        newPrice: 349000,
        image: "/Asus-rog-zephyrus-rtx-4080.png",
        fullDescription:
          "Le ASUS ROG Zephyrus G16 redéfinit le gaming portable avec sa carte graphique NVIDIA RTX 4080 et son processeur Intel Core i9 de dernière génération. Équipé de 32 Go de RAM et d'un SSD de 1 To, ce laptop offre des performances exceptionnelles pour le gaming 4K, le montage vidéo et le streaming. Son écran 16 pouces haute fréquence garantit une fluidité optimale, tandis que son châssis fin et léger en fait un compagnon idéal pour les gamers nomades. Le système de refroidissement ROG Intelligent Cooling maintient des températures optimales même lors des sessions les plus intenses.",
      },
      {
        id: "pc-2",
        name: "MSI Raider GE78 HX",
        description: "RTX 4070 Ti · Core i7-14700HX · 16 Go · 512 Go SSD",
        oldPrice: 265000,
        newPrice: 239000,
        image: "/msi-raider-i7-4070ti.png",
        fullDescription:
          "Le MSI Raider GE78 HX est une bête de course conçue pour les gamers exigeants. Propulsé par un Intel Core i7-14700HX et une RTX 4070 Ti, ce portable 17 pouces délivre des performances de niveau desktop. Ses 16 Go de RAM et son SSD de 512 Go assurent des chargements ultra-rapides et une multitâche fluide. Le clavier SteelSeries RGB par touche, le système audio Dynaudio et le refroidissement avancé Cooler Boost 5 en font un choix premium pour les compétitions esport et le gaming immersif.",
      },
      {
        id: "pc-3",
        name: "Lenovo IdeaPad Gaming 3",
        description: "RTX 3060 · Ryzen 5 7535HS · 16 Go RAM · 512 Go SSD",
        oldPrice: 165000,
        newPrice: 149000,
        image: "/lenovo-ideapad-gaming-3.png",
        fullDescription:
          "Le Lenovo IdeaPad Gaming 3 offre le meilleur rapport qualité-prix pour entrer dans l'univers du gaming. Avec son AMD Ryzen 5 7535HS et sa NVIDIA RTX 3060, il fait tourner la majorité des jeux AAA en haute qualité. Ses 16 Go de RAM et son SSD de 512 Go offrent suffisamment d'espace pour votre bibliothèque de jeux. L'écran 15,6 pouces FHD 120 Hz assure une expérience fluide, tandis que le design épuré et le clavier rétroéclairé bleu lui confèrent une allure gaming discrète mais efficace.",
      },
      {
        id: "pc-4",
        name: "HP Victus 15",
        description: "GTX 1650 · AMD Ryzen 5 · 8 Go RAM · 512 Go SSD",
        oldPrice: 115000,
        newPrice: 99000,
        image: "/hp-victus-15.png",
        fullDescription:
          "Le HP Victus 15 est la porte d'entrée idéale vers le gaming portable accessible. Équipé d'une NVIDIA GTX 1650 et d'un AMD Ryzen 5, il gère parfaitement les jeux esport et les titres AAA en paramètres moyens. Ses 8 Go de RAM et son SSD de 512 Go garantissent des temps de réponse rapides. Le design moderne avec touches WASD mises en évidence, le système de refroidissement amélioré et le port USB-C en font un choix intelligent pour les étudiants et les gamers débutants.",
      },
      {
        id: "pc-5",
        name: "Acer Aspire 5",
        description: "Intel Core i5-1235U · 8 Go RAM · 256 Go SSD · Écran FHD",
        oldPrice: 89000,
        newPrice: 79000,
        image: "/acer-aspire-5.png",
        fullDescription:
          "L'Acer Aspire 5 est un ultrabook polyvalent parfait pour le travail, les études et le divertissement quotidien. Son Intel Core i5-1235U, ses 8 Go de RAM et son SSD de 256 Go offrent une réactivité exemplaire pour la bureautique, le streaming et la navigation web. L'écran Full HD IPS de 15,6 pouces délivre des couleurs fidèles et des angles de vision larges. Fin, léger et élégant, il vous accompagne partout avec une autonomie de plus de 8 heures. Idéal pour les professionnels et étudiants en quête de performance et de mobilité.",
      },
      {
        id: "pc-6",
        name: "Dell Inspiron 15 Gaming",
        description: "RTX 3050 · Intel Core i5-12500H · 16 Go RAM · 512 Go SSD",
        oldPrice: 98000,
        newPrice: 89000,
        image: "/dell-inspiron-15-gaming.png",
        fullDescription:
          "Le Dell Inspiron 15 Gaming combine performance gaming et polyvalence quotidienne. Sa NVIDIA RTX 3050 et son Intel Core i5-12500H offrent une expérience gaming satisfaisante sur les jeux récents. Avec 16 Go de RAM et un SSD de 512 Go, il gère aisément la multitâche et le stockage de vos applications. L'écran 15,6 pouces FHD 120 Hz, le clavier rétroéclairé et les haut-parleurs Nahimic 3D Audio créent une expérience immersive. Son châssis robuste et son excellente connectivité en font un allié fiable pour le gaming et le travail.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. MONITEURS
  // ─────────────────────────────────────────────
  {
    id: "moniteurs",
    title: "Moniteurs",
    icon: "🖥️",
    products: [
      {
        id: "mon-1",
        name: "LG UltraGear 27GR95QE",
        description: '27" QHD OLED · 240 Hz · 0.03ms · G-Sync Compatible',
        oldPrice: 185000,
        newPrice: 169000,
        image: "/lg-ultragear-27gr95qe.png",
        fullDescription:
          "Le LG UltraGear 27GR95QE révolutionne votre expérience gaming avec sa technologie OLED QHD de 27 pouces. La fréquence de rafraîchissement de 240 Hz et le temps de réponse de 0,03 ms offrent une fluidité et une réactivité sans précédent, parfaits pour les jeux compétitifs. Compatible G-Sync, il élimine le tearing et le stuttering. Les noirs parfaits de l'OLED, le contraste infini et la couverture colorimétrique DCI-P3 98,5% plongent vos jeux dans des visuels d'une richesse exceptionnelle. Le design sans bordures et l'ergonomie ajustable complètent ce moniteur haut de gamme.",
      },
      {
        id: "mon-2",
        name: "Samsung Odyssey G7",
        description: '32" 4K UHD · 144 Hz · 1ms · Dalle VA incurvée',
        oldPrice: 145000,
        newPrice: 129000,
        image: "/samsung-odyssey-g7.png",
        fullDescription:
          "Le Samsung Odyssey G7 de 32 pouces vous immerge dans l'action avec sa dalle VA incurvée 1000R et sa résolution 4K UHD. La fréquence de 144 Hz et le temps de réponse de 1 ms garantissent une expérience gaming fluide et réactive. La technologie Quantum Dot offre des couleurs éclatantes et un contraste élevé, tandis que le HDR600 enrichit les détails dans les zones sombres et lumineuses. L'éclairage CoreSync à l'arrière crée une ambiance immersive, et l'ergonomie complète (inclinaison, pivot, hauteur) assure un confort optimal pendant les longues sessions.",
      },
      {
        id: "mon-3",
        name: "AOC C27G2ZE",
        description: '27" FHD · 240 Hz · 0.5ms · Dalle VA · FreeSync',
        oldPrice: null,
        newPrice: 69000,
        image: "/aoc-c27g2ze.png",
        fullDescription:
          "L'AOC C27G2ZE est le choix parfait pour les gamers compétitifs à la recherche de performance et de valeur. Son écran incurvé de 27 pouces FHD offre une immersion optimale, tandis que la fréquence de 240 Hz et le temps de réponse de 0,5 ms garantissent un avantage compétitif dans les jeux rapides. La technologie FreeSync élimine les saccades, et la dalle VA assure un contraste élevé avec des noirs profonds. Le design sans bordures, le pied réglable et le rétroéclairage rouge discret en font un moniteur gaming performant et élégant.",
      },
      {
        id: "mon-4",
        name: "Acer Nitro XV252Q",
        description: '24.5" FHD · 165 Hz · IPS · AMD FreeSync Premium',
        oldPrice: 59000,
        newPrice: 52000,
        image: "/acer-nitro-xv252q.png",
        fullDescription:
          "L'Acer Nitro XV252Q est un moniteur gaming 24,5 pouces conçu pour la précision et la vitesse. Sa dalle IPS FHD 165 Hz offre des couleurs précises et des angles de vision larges, idéale pour les jeux compétitifs et le travail créatif. La technologie AMD FreeSync Premium assure une synchronisation parfaite avec votre carte graphique AMD. Le temps de réponse de 1 ms VRB minimise le flou de mouvement, tandis que les technologies Acer VisionCare protègent vos yeux pendant les longues sessions. Compact et performant, c'est le choix des gamers esport.",
      },
      {
        id: "mon-5",
        name: "Philips 243V7",
        description: '24" FHD · 75 Hz · IPS · Pied réglable en hauteur',
        oldPrice: 38000,
        newPrice: 32000,
        image: "/philips-243v7.png",
        fullDescription:
          "Le Philips 243V7 est un moniteur professionnel 24 pouces Full HD qui allie qualité d'image et ergonomie. Sa dalle IPS offre des couleurs naturelles et des angles de vision de 178°, parfaite pour le travail de bureau, la retouche photo et la navigation web. La fréquence de 75 Hz apporte une fluidité supérieure à la moyenne. Le pied réglable en hauteur, l'inclinaison et la fonction pivot permettent de trouver la position idéale. Les technologies Flicker-Free et LowBlue Mode réduisent la fatigue oculaire. Élégant et fonctionnel, il s'intègre parfaitement dans tout environnement de travail.",
      },
      {
        id: "mon-6",
        name: "BenQ MOBIUZ EX2510S",
        description: '24.5" FHD · 165 Hz · IPS · HDRi · 1ms MPRT',
        oldPrice: 55000,
        newPrice: 47000,
        image: "/benq-mobiuz-ex2510s.png",
        fullDescription:
          "Le BenQ MOBIUZ EX2510S est un moniteur gaming 24,5 pouces qui mise sur l'immersion visuelle et sonore. Sa dalle IPS FHD 165 Hz offre des images fluides et colorées, tandis que la technologie HDRi de BenQ optimise automatiquement les images selon le contenu. Les haut-parleurs treVolo intégrés délivrent un son riche et immersif, éliminant le besoin d'enceintes externes. Le temps de réponse de 1 ms MPRT, la compatibilité FreeSync Premium et les modes jeu spécifiques (FPS, RPG, Racing) en font un compagnon gaming complet et polyvalent.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. CLAVIERS
  // ─────────────────────────────────────────────
  {
    id: "claviers",
    title: "Claviers",
    icon: "⌨️",
    products: [
      {
        id: "clav-1",
        name: "Wooting 60HE+",
        description: "Switches magnétiques Hall Effect · Tenkeyless · RGB",
        oldPrice: 45000,
        newPrice: 42000,
        image: "/wooting-60he+.png",
        fullDescription:
          "Le Wooting 60HE+ est le clavier gaming le plus avancé du marché grâce à ses switches magnétiques Hall Effect analogiques. Contrairement aux switches mécaniques traditionnels, ils détectent la distance d'appui avec une précision millimétrique, offrant un contrôle analogique dans les jeux (comme une manette) et une activation réglable de 0,1 à 4,0 mm. Le format 60% compact libère de l'espace pour votre souris, tandis que le RGB par touche personnalisable et le châssis robuste en font un outil de compétition ultime pour les gamers exigeants.",
      },
      {
        id: "clav-2",
        name: "Keychron Q3 Pro",
        description: "TKL mécanique · Switch Gateron G Pro · Aluminium · RGB",
        oldPrice: 29000,
        newPrice: 25000,
        image: "/keychron-q3-pro.png",
        fullDescription:
          "Le Keychron Q3 Pro est un clavier mécanique TKL haut de gamme entièrement personnalisable. Fabriqué en aluminium massif, il offre une solidité et un feeling premium incomparables. Les switches Gateron G Pro pré-lubrifiés assurent une frappe fluide et silencieuse. Le RGB per-key, la connectivité Bluetooth et filaire, ainsi que la compatibilité QMK/VIA pour la reprogrammation complète des touches en font un clavier adaptable à tous les usages. Le montage gasket et les foam layers intégrés réduisent les vibrations pour un son et une sensation de frappe optimaux.",
      },
      {
        id: "clav-3",
        name: "Logitech G Pro X TKL",
        description: "Switches GX Blue · TKL compact · RGB LIGHTSYNC",
        oldPrice: null,
        newPrice: 19500,
        image: "/logitech-g-pro-x-tkl.png",
        fullDescription:
          "Le Logitech G Pro X TKL est le clavier officiel des pros de l'esport. Son format TKL compact offre plus d'espace pour les mouvements de souris, crucial en compétition. Les switches mécaniques GX Blue offrent un retour tactile et sonore satisfaisant, parfaits pour le gaming et la frappe. Le système LIGHTSYNC RGB synchronise l'éclairage avec vos jeux, tandis que la technologie anti-ghosting et le rapporteur de frappes 1 ms garantissent une exécution parfaite de vos commandes. Conçu avec les feedbacks des pros, c'est un outil de compétition pur et performant.",
      },
      {
        id: "clav-4",
        name: "Redragon K552 Kumara",
        description: "Mécanique compact · Switch Red · RGB · Anti-ghosting",
        oldPrice: 8500,
        newPrice: 6900,
        image: "/redragon-k552-kumara.png",
        fullDescription:
          "Le Redragon K552 Kumara prouve que la qualité mécanique n'a pas à coûter cher. Ce clavier compact 60% équipé de switches Red linéaires offre une frappe rapide et silencieuse, idéale pour le gaming. Le RGB personnalisable avec 18 modes d'éclairage, l'anti-ghosting complet et la construction en métal brossé lui confèrent une allure et des performances supérieures à son prix. Résistant aux éclaboussures et doté de keycaps double-injection durables, c'est le choix parfait pour les gamers débutants souhaitant découvrir le mécanique sans se ruiner.",
      },
      {
        id: "clav-5",
        name: "HP K10G Gaming",
        description: "Membrane gaming · Anti-ghosting · RGB · 26 touches",
        oldPrice: 4200,
        newPrice: 3500,
        image: "/hp-k10g-gaming.png",
        fullDescription:
          "Le HP K10G Gaming est un clavier membrane abordable qui ne fait pas de compromis sur l'essentiel. Ses 26 touches anti-ghosting garantissent que vos combinaisons de touches sont toujours enregistrées, même dans les moments intenses. Le rétroéclairage RGB arc-en-ciel crée une ambiance gaming, tandis que la conception ergonomique avec repose-poignet intégré assure un confort prolongé. Les keycaps en ABS et la structure robuste offrent une durabilité satisfaisante. Idéal pour les gamers occasionnels et les configurations de début.",
      },
      {
        id: "clav-6",
        name: "Corsair K70 RGB MK.2",
        description: "Cherry MX Red · Full-size · RGB · Repose-poignet inclus",
        oldPrice: 22000,
        newPrice: 18500,
        image: "/corsair-k70-rgb-mk2.png",
        fullDescription:
          "Le Corsair K70 RGB MK.2 est une référence dans le monde des claviers gaming full-size. Équipé de switches Cherry MX Red réputés pour leur fluidité et leur silence, il offre une frappe rapide et précise parfaite pour le gaming et la saisie. Le RGB per-key iCUE offre une personnalisation illimitée des effets lumineux. La construction en aluminium brossé, le repose-poignet amovible en mousse à mémoire de forme, et les touches multimédia dédiées avec molette de volume en font un clavier premium complet et confortable pour les longues sessions.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. SOURIS
  // ─────────────────────────────────────────────
  {
    id: "souris",
    title: "Souris",
    icon: "🖱️",
    products: [
      {
        id: "sou-1",
        name: "Logitech G Pro X Superlight 2",
        description: "Hero 25K · 60g · Sans fil 2.4 GHz · Endurance 95h",
        oldPrice: 25000,
        newPrice: 22500,
        image: "/logitech-g-pro-x-superlight-2.png",
        fullDescription:
          "La Logitech G Pro X Superlight 2 représente l'excellence en matière de souris gaming sans fil. Pesant seulement 60g, elle offre une maniabilité extrême pour les mouvements rapides et précis. Le capteur HERO 25K assure un tracking pixel-parfait jusqu'à 25 600 DPI, tandis que la technologie LIGHTSPEED garantit une latence inférieure à 1 ms, indiscernable du filaire. L'autonomie exceptionnelle de 95 heures et la compatibilité POWERPLAY pour la recharge sans fil en font une souris sans compromis. Conçue avec les pros de l'esport, c'est la référence absolue pour la compétition.",
      },
      {
        id: "sou-2",
        name: "Razer DeathAdder V3 HyperSpeed",
        description: "Focus X 26K · Ergonomique · Sans fil · 90h d'autonomie",
        oldPrice: 16000,
        newPrice: 13500,
        image: "/razer-deathadder-v3-hyperspeed.png",
        fullDescription:
          "La Razer DeathAdder V3 HyperSpeed allie l'ergonomie légendaire de la série DeathAdder à des performances sans fil de pointe. Le capteur Focus X 26K offre une précision chirurgicale, tandis que le poids optimisé et la forme ergonomique droitier réduisent la fatigue. La technologie HyperSpeed Wireless assure une connexion ultra-stable et une latence minimale. L'autonomie de 90 heures et les switches optiques Razer 3rd Gen garantissent une durabilité de 90 millions de clics. Les patins 100% PTFE et le design sans fil ultra-léger en font une arme redoutable.",
      },
      {
        id: "sou-3",
        name: "Steelseries Rival 3",
        description: "TrueMove Core · 8500 DPI · 6 boutons · RGB",
        oldPrice: null,
        newPrice: 6500,
        image: "/steelseries-rival-3.png",
        fullDescription:
          "La SteelSeries Rival 3 est une souris gaming légère et précise qui punch bien au-dessus de son prix. Le capteur TrueMove Core de 8500 DPI, développé avec PixArt, offre un tracking 1:1 sans interpolation ni filtrage. Sa construction légère et durable en polymère de haute qualité résiste à des millions de clics. L'éclairage RGB PrismSync sur 3 zones, les 6 boutons programmables via SteelSeries Engine, et les patins en polymère à haute densité en font une souris fiable et performante pour les gamers compétitifs et les utilisateurs quotidiens.",
      },
      {
        id: "sou-4",
        name: "Redragon M711 Cobra",
        description: "10000 DPI · 7 boutons · RGB 16,8M couleurs · Filaire",
        oldPrice: 3800,
        newPrice: 2900,
        image: "/redragon-m711-cobra.png",
        fullDescription:
          "La Redragon M711 Cobra offre des performances gaming impressionnantes à un prix défiant toute concurrence. Son capteur optique ajustable jusqu'à 10 000 DPI s'adapte à tous les styles de jeu, des FPS rapides aux MOBA stratégiques. Les 7 boutons programmables, dont 2 pour le DPI, permettent des commandes rapides. L'éclairage RGB Chroma avec 16,8 millions de couleurs et effets personnalisables crée une ambiance unique. La construction robuste, le câble tressé et les patins Teflon assurent une durabilité et une glisse optimale. Le choix malin pour les budgets serrés.",
      },
      {
        id: "sou-5",
        name: "HP M150 Gaming",
        description: "4000 DPI · 6 boutons · RGB · Design ergonomique",
        oldPrice: 2500,
        newPrice: 1900,
        image: "/hp-m150-gaming.png",
        fullDescription:
          "La HP M150 Gaming est une souris d'entrée de gamme qui couvre tous les besoins essentiels du gamer. Son capteur optique 4000 DPI offre une précision suffisante pour la majorité des jeux, ajustable en 4 niveaux selon vos besoins. Les 6 boutons incluant deux latéraux facilitent la navigation et les macros simples. Le design ergonomique droitier avec revêtement anti-dérapant assure une prise en main confortable, tandis que l'éclairage RGB multicolore ajoute une touche gaming à votre setup. Fiable et abordable, c'est la souris parfaite pour débuter.",
      },
      {
        id: "sou-6",
        name: "Razer Basilisk V3",
        description: "HyperScroll · 26K DPI · 11 boutons · Chroma RGB",
        oldPrice: 14500,
        newPrice: 12000,
        image: "/razer-basilisk-v3.png",
        fullDescription:
          "La Razer Basilisk V3 est une souris gaming polyvalente conçue pour les joueurs qui veulent tout contrôler. Le capteur Focus Pro 26K offre une précision extrême, tandis que la molette HyperScroll intelligente passe automatiquement du mode tactile au mode free-spin selon votre vitesse de défilement. Les 11 boutons programmables, incluant le paddle multifonction signature, offrent une infinité de possibilités de commandes. L'éclairage Chroma RGB sous le châssis crée une ambiance immersive, et les switches optiques 3rd Gen assurent une réactivité et une durabilité exceptionnelles.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. CASQUES
  // ─────────────────────────────────────────────
  {
    id: "casques",
    title: "Casques",
    icon: "🎧",
    products: [
      {
        id: "cas-1",
        name: "SteelSeries Arctis Nova Pro",
        description: "Hi-Res Audio · ANC · Double DAC · Multi-système",
        oldPrice: 72000,
        newPrice: 65000,
        image: "/steelseries-arctis-nova-pro.png",
        fullDescription:
          "Le SteelSeries Arctis Nova Pro est le summum des casques gaming sans fil. Sa certification Hi-Res Audio et ses drivers personnalisés offrent une qualité sonore audiophile. Le double système DAC (un pour le jeu, un pour le chat) permet un mixage audio parfait. L'ANC active réduit les bruits extérieurs pour une immersion totale. Compatible PC, PlayStation, Xbox et Switch, il s'adapte à tous vos appareils. L'autonomie de 22 heures avec les batteries interchangeables, le micro AI ClearCast NC rétractable, et le confort du bandeau suspendu en font le casque ultime pour les gamers exigeants.",
      },
      {
        id: "cas-2",
        name: "HyperX Cloud Alpha Wireless",
        description: "Drivers 50mm · 300h autonomie · Son surround 7.1",
        oldPrice: 35000,
        newPrice: 29000,
        image: "/hyperx-cloud-alpha-wireless.png",
        fullDescription:
          "Le HyperX Cloud Alpha Wireless révolutionne l'autonomie des casques gaming avec une batterie record de 300 heures. Les drivers 50mm à double chambre séparent les basses des médiums/aigus pour un son clair et détaillé. Le son surround 7.1 spatial offre une précision de localisation parfaite dans les jeux compétitifs. La construction légère en aluminium, les coussinets en mousse à mémoire de forme et le bandeau rembourré assurent un confort exceptionnel même après des heures d'utilisation. Le micro détachable certifié Discord et TeamSpeak complète ce casque sans fil haut de gamme.",
      },
      {
        id: "cas-3",
        name: "Logitech G435 Lightspeed",
        description: "Bluetooth + 2.4GHz · 165g ultraléger · 18h batterie",
        oldPrice: null,
        newPrice: 16500,
        image: "/logitech-g435-lightspeed.png",
        fullDescription:
          "Le Logitech G435 Lightspeed est un casque sans fil ultra-léger de 165g conçu pour le confort et la liberté. La double connectivité 2,4 GHz LIGHTSPEED et Bluetooth 5.2 vous permettent de basculer instantanément entre votre PC et votre smartphone. L'autonomie de 18 heures couvre plusieurs sessions de jeu. Les transducteurs 40mm offrent un son équilibré, tandis que les micros intégrés à faisceau double assurent une communication claire. Fabriqué avec 22% de plastique recyclé, c'est aussi un choix éco-responsable sans compromis sur la performance.",
      },
      {
        id: "cas-4",
        name: "Redragon H510 Zeus",
        description: "7.1 Surround · Micro détachable · Coussinets mousse",
        oldPrice: 6500,
        newPrice: 4900,
        image: "/redragon-h510-zeus.png",
        fullDescription:
          "Le Redragon H510 Zeus offre une expérience gaming immersive à prix mini. Le son surround 7.1 virtuel crée une scène sonore spatiale précise pour localiser vos ennemis. Le micro flexible détachable avec suppression du bruit assure une communication cristalline avec votre équipe. Les coussinets en mousse à mémoire de forme et le bandeau ajustable offrent un confort durable. La construction robuste, le câble tressé de 2m et la compatibilité universelle (PC, PS4, Xbox, Switch) en font un casque polyvalent et fiable pour les gamers débutants.",
      },
      {
        id: "cas-5",
        name: "Havit H2002d",
        description: "Stéréo · Micro intégré · Prise jack 3.5mm · Léger",
        oldPrice: 3200,
        newPrice: 2400,
        image: "/havit-h2002d.png",
        fullDescription:
          "Le Havit H2002d est un casque stéréo léger et confortable pour le gaming quotidien. Les transducteurs de 50mm délivrent un son clair avec des basses présentes, parfait pour les jeux casual et la musique. Le micro flexible intégré capture votre voix clairement, tandis que la prise jack 3,5mm universelle assure une compatibilité totale avec PC, consoles et mobiles. Le design léger avec coussinets respirants réduit la fatigue pendant les longues sessions. Un choix économique et pratique pour les gamers occasionnels et les appels en ligne.",
      },
      {
        id: "cas-6",
        name: "Corsair HS80 RGB Wireless",
        description:
          "Dolby Atmos · Sans fil · 20h autonomie · Micro détachable",
        oldPrice: 28000,
        newPrice: 23500,
        image: "/corsair-hs80-rgb-wireless.png",
        fullDescription:
          "Le Corsair HS80 RGB Wireless combine audio haute fidélité et esthétique gaming. La technologie Dolby Atmos offre un son 3D immersif qui place vous au centre de l'action. La connexion sans fil SLIPSTREAM garantit une latence ultra-faible et une portée de 18m. L'autonomie de 20 heures et le micro omnidirectionnel détachable avec technologie de suppression du bruit assurent des sessions prolongées et des communications claires. L'éclairage RGB dynamique synchronisé avec votre setup iCUE et la construction en aluminium renforcé complètent ce casque premium.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. ACCESSOIRES
  // ─────────────────────────────────────────────
  {
    id: "accessoires",
    title: "Accessoires",
    icon: "🔌",
    products: [
      {
        id: "acc-1",
        name: "Elgato Stream Deck MK.2",
        description: "15 touches LCD · Personnalisable · USB-C · OBS, Discord",
        oldPrice: 38000,
        newPrice: 33000,
        image: "/elgato-stream-deck-mk.2.png",
        fullDescription:
          "L'Elgato Stream Deck MK.2 est le contrôleur de création de contenu indispensable. Ses 15 touches LCD entièrement personnalisables affichent des icônes et des fonctions que vous configurez selon vos besoins. Contrôlez OBS, Discord, Spotify, les lumières Philips Hue et des centaines d'autres applications en un seul toucher. La fonction Multi Actions permet d'enchaîner plusieurs commandes d'une seule pression. L'interface intuitive et la compatibilité Windows/Mac en font l'outil ultime pour les streamers, vidéastes et créatifs qui veulent professionnaliser leur workflow.",
      },
      {
        id: "acc-2",
        name: "Corsair MM700 RGB",
        description: "Tapis XXL 930x400mm · Surface lisse · USB passthrough",
        oldPrice: 15000,
        newPrice: 12000,
        image: "/corsair-mm700-rgb.png",
        fullDescription:
          "Le Corsair MM700 RGB est un tapis de souris XXL de 930x400mm qui transforme votre bureau en cockpit gaming. Sa surface lisse en tissu micro-texturé offre un glissement précis et contrôlé pour tous les types de capteurs. Le bord RGB dynamique avec 12 zones d'éclairage personnalisables via iCUE crée une ambiance immersive. Le hub USB intégré avec 2 ports supplémentaires résout vos problèmes de connectivité. La base en caoutchouc antidérapante et les bords cousus renforcés assurent une durabilité exceptionnelle. Le tapis ultime pour les setups complets clavier + souris.",
      },
      {
        id: "acc-3",
        name: "Webcam Logitech C920s HD",
        description: "Full HD 1080p · 30fps · Micro stéréo · Privacy shutter",
        oldPrice: null,
        newPrice: 19000,
        image: "/logitech-c920s-hd.png",
        fullDescription:
          "La webcam Logitech C920s HD est la référence des streamers et télétravailleurs. Elle capture en Full HD 1080p à 30fps avec une netteté et une fluidité professionnelles. Le autofocus et la correction automatique de la lumière HD assurent une image parfaite dans toutes les conditions. Les deux microphones stéréo intégrés captent votre voix de manière naturelle et claire. Le volet de confidentialité coulissant protège votre vie privée quand vous ne l'utilisez pas. Compatible avec tous les logiciels de visioconférence et de streaming, c'est la webcam fiable par excellence.",
      },
      {
        id: "acc-4",
        name: "Hub USB-C 7-en-1 Ugreen",
        description: "HDMI 4K · 3× USB3.0 · PD 100W · SD/TF · Aluminium",
        oldPrice: 6500,
        newPrice: 4800,
        image: "/ugreen-hub-usb-c.png",
        fullDescription:
          "Le Hub USB-C 7-en-1 Ugreen est le compagnon indispensable de votre laptop moderne. Il transforme un seul port USB-C en 7 connexions essentielles : HDMI 4K@60Hz pour un écran externe, 3 ports USB 3.0 pour vos périphériques, lecteur de cartes SD/TF pour vos transferts photo, et port PD 100W pour charger votre ordinateur en même temps. Le boîtier en aluminium assure une dissipation thermale optimale et une durabilité premium. Compact et léger, il glisse facilement dans votre sac pour une productivité maximale où que vous soyez.",
      },
      {
        id: "acc-5",
        name: "Nettoyant PC Kit Pro",
        description: "Soufflette · Lingettes LCD · Bombe air · 10 pièces",
        oldPrice: 2000,
        newPrice: 1500,
        image: "/nettoyant-pc-kit-pro.png",
        fullDescription:
          "Le Kit Pro de nettoyage PC contient tout le nécessaire pour maintenir votre matériel en parfait état. La soufflette manuelle à double valve déloge la poussière des zones inaccessibles sans risque pour les composants électroniques. Les lingettes microfibre spéciales écran nettoient sans rayures vos moniteurs et écrans. La bombe d'air comprimé permet un nettoyage en profondeur des ventilateurs et radiateurs. Les brosses antistatiques, les cotons-tiges de précision et les chiffons en complètent cet ensemble complet de 10 pièces pour un entretien professionnel de votre setup.",
      },
      {
        id: "acc-6",
        name: "Support PC Portable Réglable",
        description: 'Aluminium · 6 hauteurs · Pliable · Compatible 10–17"',
        oldPrice: 3500,
        newPrice: 2800,
        image: "/support-pc-portable-reglable.png",
        fullDescription:
          "Le Support PC Portable Réglable en aluminium transforme n'importe quel bureau en station de travail ergonomique. Ses 6 niveaux de hauteur ajustables permettent d'adopter la posture idéale, réduisant les douleurs de cou et de dos. La construction en aluminium aéronautique supporte jusqu'à 20kg et dissipe la chaleur de votre ordinateur. Le design pliable et léger (seulement 260g) le rend parfaitement transportable. Compatible avec les laptops de 10 à 17 pouces, les bandes antidérapantes et les bords arrondis protègent votre appareil des rayures. Un investissement santé indispensable.",
      },
    ],
  },
];
