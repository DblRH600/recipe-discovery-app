import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  //  set the variables used for fetching
  const { data, loading, error } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  // add loading & error function connections
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <h1 className="mb-4">Home Page</h1>
      <div className="grid grid-cols-2 gap-3">
        {data.categories.map((cat) => (
          <Link key={cat.idCategory} to={`/category/${cat.strCategory}`}>
            <h3 className="text-xl">{cat.idCategory}: {cat.strCategory}</h3>
          </Link>
        ))}
      </div>

    </>
  );
}

export default HomePage;
