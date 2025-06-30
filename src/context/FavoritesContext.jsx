import { createContext, useContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favoriteRecipes", []);

  const addToFavorites = useCallback(
    (id) => {
      setFavorites((prev) => [...new Set([...prev, id])]);
    },
    [setFavorites]
  );

  const removeFromFavorites = useCallback(
    (id) => {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  const contextFavs = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider
      value={contextFavs}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used withing a FavoritesProvider');
    }

    return context;
}
