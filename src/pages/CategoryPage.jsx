import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function CategoryPage() {
  const { categoryName } = useParams();
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  // add loading & error function connections
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <h1 className="mb-4">Categories</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.meals.map((meal) => (
          <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CategoryPage;
