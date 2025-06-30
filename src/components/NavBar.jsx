import {
  RectangleGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <nav className="flex justify-between items-center gap-3">
      <div className="flex items-center justify-center gap-1">
        <RectangleGroupIcon className="w-100% h-6" />
        <h6 className="text-xs">Recipe App</h6>
      </div>

      <ul className="flex justify-between gap-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>

      <div>
        <form
          onSubmit={handleSearch}
          className="search-form border flex content-center"
        >
          <input
            className="p-2 border-fit"
            type="text"
            placeholder="Search Bar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            style={{
              border: "none",
              backgroundColor: "slateblue",
              borderRadius: "1px",
            }}
            type="submit"
          >
            <MagnifyingGlassIcon className="w-100% h-5 px-1" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
