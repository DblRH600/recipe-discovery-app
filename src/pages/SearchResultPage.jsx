import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import BackButton from "../components/BackButton";

function SearchResultPage() {
  const [params] = useSearchParams();
  const query = params.get("query");
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  if (!data.meals) return <p>No results found.</p>;

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <BackButton />
        <h1 className="my-3">Search Results</h1>
      </div>

      <div>
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

export default SearchResultPage;
