import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { StarIcon } from "@heroicons/react/24/outline";
import BackButton from "../components/BackButton";

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const recipe = data.meals && data.meals[0];
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <BackButton />
        <h1 className="my-3">Recipe Details</h1>
      </div>

      <div className="flex flex-col">
        <h2 className="mb-2 text-lg italic">{recipe.strMeal}</h2>
        <img className="mb-2" src={recipe.strMealThumb} alt={recipe.strMeal} />
        <button
          style={{
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() =>
            isFavorite(recipeId)
              ? removeFromFavorites(recipeId)
              : addToFavorites(recipeId)
          }
        >
          <StarIcon className="w-100% h-7 mx-3" />
          {isFavorite(recipeId) ? "Remove from Favorites" : "Add to Favorites"}
          <StarIcon className="w-100% h-7 mx-3" />
        </button>
        <h3 className="underline underline-offset-3 text-lg font-semibold mb-2">
          Ingredients
        </h3>
        <ul className="grid grid-cols-3 mb-3 w-100% h-100%">
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <p className="text-sm/6 text-left">{recipe.strInstructions}</p>
      </div>
    </>
  );
}

export default RecipeDetailPage;
