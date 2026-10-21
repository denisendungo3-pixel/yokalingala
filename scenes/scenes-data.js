/* =====================================================================
   YOKA LINGALA — DONNÉES DES SCÈNES INTERACTIVES
   ---------------------------------------------------------------------
   Pour ajouter une scène : copier un bloc { ... } ci-dessous et remplir
   - image  : chemin du fichier + taille réelle en pixels (largeur, hauteur)
   - bubbles: une entrée par bulle :
       text        : le texte lingala, tel qu'il est écrit sur l'image
       translation : la traduction affichée sur l'image
       audio       : le fichier audio à jouer (.m4a ; un .mp3 du même nom
                     sert de secours pour les navigateurs qui ne lisent pas le .m4a)
       box         : la position de la bulle EN PIXELS DE L'IMAGE D'ORIGINE
                     x, y = coin haut-gauche ; w, h = largeur, hauteur
   Les zones s'adaptent toutes seules à la taille de l'écran.
   ===================================================================== */
window.YOKA_SCENES = [
  {
    id: "maison",
    title: "Le matin, à la maison",
    image: {
      src: "scenes/images/scene-maison.webp",
      width: 1536,
      height: 1024,
      alt: "Une maman et son fils disent au revoir au papa qui part au travail"
    },
    bubbles: [
      { id: "na-komi-kokende",    text: "Na-komi kokende.",     translation: "J'y vais.",            audio: "scenes/audio/maison/01-na-komi-kokende.m4a",    box: { x: 926,  y: 55,  w: 390, h: 117 } },
      { id: "ozo-kende-wapi",     text: "O-zo kende wapi ?",    translation: "Tu vas où ?",          audio: "scenes/audio/maison/02-ozo-kende-wapi.m4a",     box: { x: 438,  y: 121, w: 368, h: 111 } },
      { id: "na-keyi-musala",     text: "Na-keyi musala",       translation: "Je vais au travail.",  audio: "scenes/audio/maison/03-na-keyi-musala.m4a",     box: { x: 1163, y: 217, w: 318, h: 111 } },
      { id: "na-pokwa",           text: "Na pokwa.",            translation: "À ce soir.",           audio: "scenes/audio/maison/04-na-pokwa.m4a",           box: { x: 1316, y: 363, w: 210, h: 113 } },
      { id: "tambola-malamu",     text: "Tambola malamu !",     translation: "Fais bonne route !",   audio: "scenes/audio/maison/05-tambola-malamu.m4a",     box: { x: 525,  y: 425, w: 355, h: 113 } },
      { id: "kende-malamu-tata",  text: "Kende malamu tata !",  translation: "Au revoir papa !",     audio: "scenes/audio/maison/06-kende-malamu-tata.m4a",  box: { x: 459,  y: 652, w: 289, h: 148 } }
    ]
  },
  {
    id: "marche",
    title: "Au marché",
    image: {
      src: "scenes/images/scene-marche.webp",
      width: 1536,
      height: 1024,
      alt: "Un client achète des mikate à une vendeuse au marché"
    },
    bubbles: [
      { id: "mbote-papa",         text: "Mbote Papa !",                        translation: "Bonjour, papa !",                 audio: "scenes/audio/marche/01-mbote-papa.m4a",                     box: { x: 450,  y: 105, w: 288, h: 123 } },
      { id: "mbote-mama",         text: "Mbote Mama.",                         translation: "Bonjour, maman.",                 audio: "scenes/audio/marche/02-mbote-mama.m4a",                     box: { x: 830,  y: 92,  w: 290, h: 100 } },
      { id: "mikate-eza-talo",    text: "Mikate e-za talo nini ?",             translation: "Les beignets, c'est combien ?",   audio: "scenes/audio/marche/03-mikate-eza-talo-nini.m4a",           box: { x: 762,  y: 265, w: 382, h: 125 } },
      { id: "ee-ezali-1000",      text: "Ee, mikate mitano, e-zali 1 000 FC.", translation: "Oui, les 5 beignets, c'est 1 000 FC.", audio: "scenes/audio/marche/04-ee-ezali-1000-fc-mikate-mitano.m4a", box: { x: 480,  y: 398, w: 358, h: 168 } },
      { id: "pesa-ngai",          text: "Pesa ngai mikate zomi.",              translation: "Donne-moi 10 beignets.",          audio: "scenes/audio/marche/05-pesa-ngai-mikate-zomi.m4a",          box: { x: 840,  y: 548, w: 394, h: 120 } },
      { id: "ee-esali-2000",      text: "Ee, e-sali 2 000 FC.",                translation: "Oui, ça fait 2 000 FC.",          audio: "scenes/audio/marche/06-ee-esali-2000-fc.m4a",               box: { x: 505,  y: 722, w: 365, h: 103 } },
      { id: "matondo-mingi",      text: "Matondo mingi !",                     translation: "Merci beaucoup !",                audio: "scenes/audio/marche/07-matondo-mingi.m4a",                  box: { x: 1028, y: 756, w: 326, h: 110 } }
    ]
  }
];
