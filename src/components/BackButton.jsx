// creating a custom to to go back to the previous page
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button 
      className="flex justiy-center items-center gap-1"
      style={{background: 'none'}}
      onClick={() => navigate(-1)}>
        <ArrowLeftEndOnRectangleIcon className="w-100% h-8" />
        Back
      </button>
    </div>
  );
}

export default BackButton;
