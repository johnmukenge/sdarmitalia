/**
 * @file ErrorBoundary.jsx
 * @description Componente per visualizzare errori con opzione di retry
 * @version 1.0
 */

import { AlertCircle, RotateCw } from "lucide-react";

export const ErrorDisplay = ({
  error,
  onRetry,
  showRetryButton = true,
  customMessage = null,
}) => {
  if (!error) return null;

  const errorMessage = typeof error === "string" ? error : error.message;
  const isNetworkError = errorMessage?.includes("Failed to fetch");
  const isTimeoutError = errorMessage?.includes("timeout");

  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={28} />
        <div className="flex-1">
          <h3 className="text-red-800 font-bold text-lg mb-2">
            Errore nel caricamento dei dati
          </h3>
          <p className="text-red-700 mb-3">{customMessage || errorMessage}</p>

          {isNetworkError && (
            <p className="text-red-600 text-sm mb-3">
              💡 Assicurati che il server backend sia avviato su{" "}
              <code className="bg-red-100 px-2 py-1 rounded">
                http://localhost:5000
              </code>
            </p>
          )}

          {isTimeoutError && (
            <p className="text-red-600 text-sm mb-3">
              ⏱️ La richiesta ha impiegato troppo tempo. Il server potrebbe
              essere occupato. Prova di nuovo.
            </p>
          )}

          {showRetryButton && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            >
              <RotateCw size={18} />
              Riprova
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Componente LoadingSpinner
 */
export const LoadingSpinner = ({ size = "md", message = "Caricamento..." }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
      {message && <p className="mt-4 text-gray-600 text-lg">{message}</p>}
    </div>
  );
};

/**
 * Componente EmptyState
 */
export const EmptyState = ({
  title = "Nessun elemento trovato",
  message = "Prova a modificare i filtri di ricerca",
  icon: Icon = null,
  actionButton = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && <Icon size={48} className="text-gray-400 mb-4" />}
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6">{message}</p>
      {actionButton && actionButton}
    </div>
  );
};
