import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { openTabAtom, popUpAtom } from "../store/atoms";

export const AuthPopup = () => {
  const isPopupActive = useRecoilValue(popUpAtom);
  const setPopUp = useSetRecoilState(popUpAtom);
  const openTab = useRecoilValue(openTabAtom);

  return (
    <>
      <div
        onClick={() => setPopUp(false)}
        className={`fixed ${
          isPopupActive ? "flex justify-center items-center" : "hidden"
        } h-screen w-full z-50 bg-white/[96%]`}
      >
        {openTab === "signup" ? <Signup /> : <Signin />}
      </div>
    </>
  );
};
