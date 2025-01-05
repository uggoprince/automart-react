import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = ({ children }: any) => {
  const [openNav, setOpenNav] = useState(false);
  const hidden = openNav ? "" : "translate-x-full";
  return (
    <nav className="flex place-content-end z-40">
      <ul
        id="navMenu"
        className={`${hidden}
        sm:translate-x-0
        align-middle
        w-40
        top-0
        right-0
        fixed
        bg-white
        sm:relative
        sm:right-0
        sm:top-0 
        sm:flex
        sm:w-auto
        inset-y-0
        transition
        duration-300
        ease-in-out
        transform
        sm:transform-none
        border-l z-50
        sm:border-l-0`}
      >
        <div className="place-content-end flex px-8 h-16 sm:py-0 sm:hidden">
          <div className="border sm:border-0 border-slate-400 rounded my-auto">
            <FiX
              className="sm:hidden cursor-pointer text-xl font-bold"
              onClick={() => setOpenNav(!openNav)}
            />
          </div>
        </div>
        {children}
      </ul>
      <div
        className="
          inline-block my-auto align-bottom
          content-center sm:mr-0 mr-3 border sm:border-0 border-slate-400 rounded"
        id="navMenuButton"
        onClick={() => setOpenNav(!openNav)}
      >
        <FiMenu className="sm:hidden cursor-pointer text-xl font-bold text-blue-600" />
      </div>
    </nav>
  );
};

export default Navbar;
