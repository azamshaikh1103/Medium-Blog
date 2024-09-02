import { useSetRecoilState } from "recoil";
import { searchTermAtom } from "../store/atoms";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import { useCallback } from "react";
import debounce from "lodash.debounce";

export const Navbar = () => {
  const setSearchTerm = useSetRecoilState(searchTermAtom);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 1000),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <>
      <div className=" fixed z-10 w-full px-10 h-14 bg-white border-b flex items-center justify-between">
        <div className=" gap-5 flex items-center">
          <div className=" text-3xl font-semibold">LogoHere</div>
          <div className=" py-2 px-4 flex items-center text-gray-600 hover:text-gray-800 bg-slate-50 rounded-full">
            <IoSearchOutline className=" text-2xl" />
            <input
              type="text"
              className="px-4 flex items-center bg-slate-50 text-black rounded-full outline-none"
              placeholder="Search"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" flex gap-6 items-center">
          <div className=" text-gray-600 hover:text-gray-800 cursor-pointer flex items-center gap-2">
            <PiNotePencilThin className=" text-2xl" />
            Write
          </div>
          <IoNotificationsOutline className=" text-2xl text-gray-600 hover:text-gray-800" />
          <img
            src=""
            alt=""
            className=" bg-purple-300 rounded-full"
            width={45}
            height={45}
          />
        </div>
      </div>
    </>
  );
};
