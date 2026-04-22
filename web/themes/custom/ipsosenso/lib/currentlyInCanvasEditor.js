export default function currentlyInCanvasEditor() {
  try {
    return !!(window?.parent?.drupalSettings?.canvas
      && !window.parent.document.body.querySelector('[class^=_PagePreviewIframe]'));
  } catch (e) {
    return false;
  }
}

/**
 * Au chargement, détecte si on est dans l'iframe d'édition Canvas et marque le <html>.
 * Ça permet au CSS d'adapter le layout (désactiver min-height 100vh, position fixed, etc.).
 */
export function markCanvasEditor() {
  try {
    if (window?.parent?.drupalSettings?.canvas) {
      document.documentElement.classList.add('is-canvas-editor');
    }
  } catch (e) {
    // Origine cross-frame : probablement pas dans l'éditeur Canvas
  }
}
