import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({
  searchTerm = "",
  setSearchTerm = () => {}
}) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div className="
      bg-white
      border-b
      border-gray-200
      px-8
      py-4
      flex
      items-center
      justify-between
      sticky
      top-0
      z-50
    ">

      <div>

        <h1 className="
          text-3xl
          font-extrabold
          tracking-tight
          bg-gradient-to-r
          from-orange-500
          to-red-500
          bg-clip-text
          text-transparent
          cursor-pointer
        ">

          DevSphere

        </h1>

      </div>

      {/* SEARCH */}

      <div className="
        flex-1
        max-w-xl
        mx-10
      ">

        <div className="
          flex
          items-center
          bg-[#F6F7F8]
          rounded-full
          px-5
          py-3
          border
          border-gray-200
          hover:border-orange-400
          transition
        ">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="
              Search communities...
            "
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
              bg-transparent
              outline-none
              ml-3
              w-full
              text-base
              placeholder:text-gray-400
            "
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="
        flex
        items-center
        gap-4
      ">

        {/* PROFILE */}

        <div className="
          w-12
          h-12
          rounded-full
          bg-orange-500
          text-white
          flex
          items-center
          justify-center
          text-xl
          font-bold
          shadow-md
        ">

          A

        </div>


        <button
          onClick={handleLogout}
          className="
            bg-gradient-to-r
            from-orange-500
            to-red-500
            hover:opacity-90
            text-white
            px-6
            py-3
            rounded-xl
            text-base
            font-semibold
            transition
            shadow-md
          "
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;