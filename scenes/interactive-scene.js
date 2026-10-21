/* =====================================================================
   YOKA LINGALA — COMPOSANT « InteractiveDialogueScene »
   ---------------------------------------------------------------------
   Affiche une illustration et pose, par-dessus chaque bulle, une zone
   cliquable transparente qui joue l'audio de la bulle.
   - Un seul audio à la fois (le précédent est arrêté).
   - Re-cliquer sur la bulle en cours de lecture l'arrête.
   - Positions en pourcentage : les zones suivent l'image à toutes les tailles.
   - Aucun son au chargement : les fichiers ne sont chargés qu'au clic.

   Utilisation :
     InteractiveDialogueScene.mount(élémentConteneur, scène)
     InteractiveDialogueScene.mountAll()   // toutes les balises
                                           // <div data-dialogue-scene="maison">
   ===================================================================== */
(function () {
  "use strict";

  var current = null; // { audio, zone }

  /* Le fichier .m4a est utilisé en priorité. Si le navigateur ne sait pas
     le lire, on prend automatiquement le .mp3 du même nom (même dossier). */
  var probe = document.createElement("audio");
  var CAN_M4A = !!(probe.canPlayType && probe.canPlayType('audio/mp4; codecs="mp4a.40.2"'));
  function source(path) {
    /* Version « tout-en-un » : les sons sont intégrés dans la page (window.YOKA_AUDIO) */
    var emb = window.YOKA_AUDIO && window.YOKA_AUDIO[path];
    if (emb) return CAN_M4A ? emb.m4a : emb.mp3;
    return (!CAN_M4A && /\.m4a$/i.test(path)) ? path.replace(/\.m4a$/i, ".mp3") : path;
  }

  function stopCurrent() {
    if (!current) return;
    try { current.audio.pause(); current.audio.currentTime = 0; } catch (e) {}
    setState(current.zone, "idle");
    current = null;
  }

  function setState(zone, state) {
    zone.classList.toggle("is-playing", state === "playing");
    zone.classList.toggle("is-loading", state === "loading");
    zone.classList.toggle("is-error", state === "error");
    zone.setAttribute("aria-pressed", state === "playing" ? "true" : "false");
    if (state === "error") setTimeout(function () { zone.classList.remove("is-error"); }, 1600);
  }

  function play(zone, bubble) {
    if (current && current.zone === zone) { stopCurrent(); return; } // toggle
    stopCurrent();

    var audio = zone._audio || (zone._audio = new Audio(source(bubble.audio)));
    audio.preload = "auto";
    current = { audio: audio, zone: zone };
    setState(zone, "loading");

    audio.onplaying = function () { if (current && current.zone === zone) setState(zone, "playing"); };
    audio.onended = function () { if (current && current.zone === zone) { setState(zone, "idle"); current = null; } };
    audio.onerror = function () { if (current && current.zone === zone) { setState(zone, "error"); current = null; } };

    try { audio.currentTime = 0; } catch (e) {}
    var p = audio.play();
    if (p && p.catch) p.catch(function () { if (current && current.zone === zone) { setState(zone, "error"); current = null; } });
  }

  function pct(v, total) { return (v / total * 100).toFixed(3) + "%"; }

  function mount(container, scene) {
    if (!container || !scene) return;
    var W = scene.image.width, H = scene.image.height;

    var stage = document.createElement("div");
    stage.className = "ids-stage";
    stage.style.aspectRatio = W + " / " + H;

    var img = document.createElement("img");
    img.className = "ids-img";
    img.src = scene.image.src;
    img.alt = scene.image.alt || "";
    img.width = W; img.height = H;
    img.loading = "lazy";
    img.decoding = "async";
    stage.appendChild(img);

    scene.bubbles.forEach(function (b) {
      var zone = document.createElement("button");
      zone.type = "button";
      zone.className = "ids-zone";
      zone.style.left = pct(b.box.x, W);
      zone.style.top = pct(b.box.y, H);
      zone.style.width = pct(b.box.w, W);
      zone.style.height = pct(b.box.h, H);
      zone.setAttribute("aria-label", "Écouter : " + b.text + (b.translation ? " (" + b.translation + ")" : ""));
      zone.setAttribute("aria-pressed", "false");
      zone.dataset.bubble = b.id;
      zone.innerHTML = '<span class="ids-badge" aria-hidden="true"><span class="ids-ico">🔊</span>' +
                       '<span class="ids-wave"><i></i><i></i><i></i></span></span>';
      zone.addEventListener("click", function () { play(zone, b); });
      stage.appendChild(zone);
    });

    container.innerHTML = "";
    container.classList.add("ids");
    container.appendChild(stage);
  }

  function mountAll(scenes) {
    scenes = scenes || window.YOKA_SCENES || [];
    document.querySelectorAll("[data-dialogue-scene]").forEach(function (el) {
      var id = el.getAttribute("data-dialogue-scene");
      var scene = scenes.filter(function (s) { return s.id === id; })[0];
      if (scene) mount(el, scene);
    });
  }

  // Arrêter le son si l'onglet passe en arrière-plan
  document.addEventListener("visibilitychange", function () { if (document.hidden) stopCurrent(); });

  window.InteractiveDialogueScene = { mount: mount, mountAll: mountAll, stop: stopCurrent, source: source };
})();
