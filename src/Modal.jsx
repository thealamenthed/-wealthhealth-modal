import {useEffect} from "react";

/**
 * Composant Modal réutilisable pour afficher des dialogues modaux
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isOpen - Indique si la modale est ouverte
 * @param {Function} props.onClose - Fonction appelée pour fermer la modale
 * @param {React.ReactNode} props.children - Contenu de la modale
 * @param {string} [props.title] - Titre de la modale (optionnel)
 * @returns {JSX.Element|null} Une modale avec backdrop ou null si fermée
 */
export default function Modal({isOpen, onClose, children, title}) {
  /**
   * Ferme la modale en appuyant sur Échap
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Empêche le scroll du body quand la modale est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}>
      {/* Backdrop avec animation */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300" aria-hidden="true" />

      {/* Modal Content avec animation */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-12 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-800  hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-2 transition-all duration-200 flex items-center justify-center w-9 h-9 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Fermer la modale">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="text-center">
          {title && (
            <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              {title}
            </h2>
          )}
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
