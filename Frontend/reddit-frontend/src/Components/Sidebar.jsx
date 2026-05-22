import {
  Home,
  Bookmark,
  User
} from "lucide-react";

import {
  NavLink
} from "react-router-dom";

function Sidebar() {

  return (

    <div className="
      bg-white
      rounded-[32px]
      shadow-sm
      border
      border-gray-100
      p-7
      sticky
      top-28
    ">

      {/* MENU */}

      <div className="
        flex
        flex-col
        gap-5
      ">

        {/* HOME */}

        <NavLink
          to="/"
          className={({ isActive }) => `

            flex
            items-center
            gap-4
            px-6
            py-5
            rounded-2xl
            text-xl
            font-bold
            transition-all
            duration-300

            ${
              isActive
                ? `
                  bg-orange-500
                  text-white
                  shadow-lg
                `
                : `
                  text-gray-700
                  hover:bg-orange-50
                `
            }
          `}
        >

          <Home size={28} />

          Home

        </NavLink>

        {/* SAVED POSTS */}

        <NavLink
          to="/saved"
          className={({ isActive }) => `

            flex
            items-center
            gap-4
            px-6
            py-5
            rounded-2xl
            text-xl
            font-bold
            transition-all
            duration-300

            ${
              isActive
                ? `
                  bg-orange-500
                  text-white
                  shadow-lg
                `
                : `
                  text-gray-700
                  hover:bg-orange-50
                `
            }
          `}
        >

          <Bookmark size={28} />

          Saved Posts

        </NavLink>

        {/* PROFILE */}

        <NavLink
          to="/profile"
          className={({ isActive }) => `

            flex
            items-center
            gap-4
            px-6
            py-5
            rounded-2xl
            text-xl
            font-bold
            transition-all
            duration-300

            ${
              isActive
                ? `
                  bg-orange-500
                  text-white
                  shadow-lg
                `
                : `
                  text-gray-700
                  hover:bg-orange-50
                `
            }
          `}
        >

          <User size={28} />

          Profile

        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;