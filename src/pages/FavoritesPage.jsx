import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const res = await Promise.all(
          favorites.map((id) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          )
        );

        const jsonData = await Promise.all(
          res.map((resp) => {
            if (!resp.ok) throw new Error("Failed to fetch recipe");
            return resp.json();
          })
        );

        const meals = jsonData.map((data) => data.meals?.[0]).filter(Boolean);
        setRecipes(meals);
      } catch (err) {
        console.error("Error fetching favorite recipes: ", err);
        setError("Failed to load favorites.");
      }
    };

    if (favorites.length > 0) {
      fetchFavs();
    } else {
      setRecipes([]); // clear if no favroites have been saved
    }

  }, [favorites]);

  if (error) return <p>{error}</p>;
  if (!favorites.length) return <p className="text-xl m-4 text-red-500">No Favorites Captured. Please Add Some!</p>

  return (
    <>
    <div className="flex justify-center items-center gap-4">
      <BackButton />
      <h1 className="mb-3">Favorites</h1>
    </div>
      

      <div className="grid grid-cols-2 gap-2">
        {recipes.map((meal) => (
          <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default FavoritesPage;
