import { useState, useEffect } from "react";
import { createOptions } from "../utils/api";

type ApiResponse<T> = {
  data?: T;
  error?: string;
  isLoading: boolean;
};

export const useApi = <T>(
  endpoint: string,
  accessToken?: string,
): ApiResponse<T> => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = createOptions("GET", accessToken);
        const response = await fetch(
          `${import.meta.env.VITE_NOROFF_BASE + endpoint}`,
          options,
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, error, isLoading };
};
