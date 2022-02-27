import { useCallback, useState } from "react";

export const useFetch = (applyDataFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        await applyDataFn(...args);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [applyDataFn]
  );

  return [isLoading, error, sendRequest];
};