/**
 * @file useFetch.js
 * @description Custom hook per gestire fetch con loading, error e retry
 * @version 1.0
 */

import { useState, useEffect, useCallback } from "react";
//import { useAPI } from "../context/APIContext";

/**
 * Custom hook per fetch dati con gestione automatica dello stato
 * @param {Function} fetchFunction - Funzione API da eseguire
 * @param {Array} dependencies - Array di dipendenze per useEffect
 * @returns {Object} { data, loading, error, retry }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const executeQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error("Errore nel fetch:", err);
      setError({
        message: err.message,
        type: err.name,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    executeQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeQuery, retryCount, ...dependencies]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return { data, loading, error, retry };
};

/**
 * Custom hook per paginated fetch
 * @param {Function} fetchFunction - Funzione API che accetta { page, limit }
 * @param {number} initialPage - Pagina iniziale (default: 1)
 * @param {number} pageSize - Dimensione pagina (default: 10)
 * @returns {Object} { items, page, pageSize, totalPages, loading, error, goToPage }
 */
export const usePaginatedFetch = (
  fetchFunction,
  initialPage = 1,
  pageSize = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction({ page, limit: pageSize });
        setItems(result.data?.items || result.items || []);
        setTotalPages(result.data?.pages || result.pages || 1);
        setError(null);
      } catch (err) {
        console.error("Errore nel fetch paginato:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, fetchFunction]);

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    items,
    page,
    pageSize,
    totalPages,
    loading,
    error,
    goToPage,
    nextPage: () => goToPage(page + 1),
    prevPage: () => goToPage(page - 1),
  };
};
