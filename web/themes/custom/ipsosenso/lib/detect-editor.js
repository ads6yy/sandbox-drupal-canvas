/**
 * Marquage du document s'il est chargé dans l'iframe de l'éditeur Canvas.
 * Ce script est chargé comme library globale du thème.
 */

try {
  if (window?.parent?.drupalSettings?.canvas) {
    document.documentElement.classList.add('is-canvas-editor');
  }
} catch (e) {
  /* cross-origin : pas dans l'éditeur */
}
