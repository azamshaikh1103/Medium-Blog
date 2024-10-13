import { useSetRecoilState } from "recoil";
import { openTabAtom, popUpAtom, searchTermAtom } from "../store/atoms";
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

interface userData {
  id: number;
  userId: number;
  name: string;
  profilePic: string;
  shortBio: string;
  about: string;
  createdOn: string;
}

export const Navbar = () => {
  const navigate = useNavigate();
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

  const setOpenTab = useSetRecoilState(openTabAtom);
  const setPopUp = useSetRecoilState(popUpAtom);
  const [user, setUser] = useState<userData | null>();

  const fetchUser = async () => {
    try {
      await axios
        .get<userData>("http://localhost:8000/api/v1/auth/seeme", {
          withCredentials: true,
        })
        .then((res) => {
          const temp: userData = res.data;
          setUser(temp);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className=" fixed z-10 w-full px-10 h-14 bg-white border-b flex items-center justify-between">
        <div className=" gap-5 flex items-center">
          <div
            onClick={() => navigate("/")}
            className=" font-charter text-3xl font-semibold cursor-pointer"
          >
            NotMedium
          </div>
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

        {!user ? (
          <div className=" flex gap-6 items-center">
            <div
              onClick={() => {
                setOpenTab("signin");
                setPopUp(true);
              }}
              className=" text-gray-600 hover:text-gray-800 cursor-pointer flex items-center gap-8"
            >
              <div
                onClick={() => navigate("/new-story")}
                className=" flex gap-2 items-center"
              >
                <PiNotePencilThin className=" text-2xl" />
                Write
              </div>
            </div>

            <div className="  flex items-center gap-5">
              <button
                className=" text-white bg-[#1b8c17] hover:bg-[#156d12] px-4 py-1 rounded-full"
                onClick={() => {
                  setOpenTab("signin");
                  setPopUp(true);
                }}
              >
                Login
              </button>
              <button
                className=" text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setOpenTab("signup");
                  setPopUp(true);
                }}
              >
                Signup
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex gap-6 items-center">
            <div className=" text-gray-600 hover:text-gray-800 cursor-pointer flex items-center gap-8">
              <div
                onClick={() => navigate("/new-story")}
                className=" flex gap-2 items-center"
              >
                <PiNotePencilThin className=" text-2xl" />
                Write
              </div>
            </div>

            <IoNotificationsOutline className=" text-2xl text-gray-500 hover:text-gray-800 cursor-pointer" />

            <img
              src={
                user.profilePic ||
                "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
              }
              alt=""
              className=" bg-purple-300 rounded-full cursor-pointer"
              width={45}
              height={45}
            />
          </div>
        )}
      </div>
    </>
  );
};
