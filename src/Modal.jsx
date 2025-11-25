import {useEffect} from "react";
import {createPortal} from "react-dom";

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

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}>
      {/* Backdrop avec animation */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(4px)"
        }}
        aria-hidden="true"
      />

      {/* Modal Content avec animation */}
      <div
        className="relative rounded-3xl max-w-lg w-full p-8 md:p-10 transform transition-all duration-300 ease-out"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "white",
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxWidth: "32rem",
          width: "100%",
          padding: "2rem"
        }}
        onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1.5 transition-all duration-200 flex items-center justify-center w-8 h-8 hover:scale-110 active:scale-95 cursor-pointer group"
          aria-label="Fermer la modale">
          <svg className="h-4 w-4 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="text-center">
          {title && (
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              {title}
            </h2>
          )}
          <div className="mt-2 text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
