"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface LoadingContextProps {
  isLoading: boolean;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = useCallback(() => {
    setLoadingCount((prevCount) => prevCount + 1);
  }, []);

  const decrementLoading = useCallback(() => {
    setLoadingCount((prevCount) => Math.max(prevCount - 1, 0));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider
      value={{ isLoading, incrementLoading, decrementLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
