import { useRecoilState, useSetRecoilState } from "recoil";
import { currentSignupTabAtom, openTabAtom, popUpAtom } from "../store/atoms";
import { useState, useRef } from "react";
import axios from "axios";

export const Signup = () => {
  const setOpenTab = useSetRecoilState(openTabAtom);
  const setPopUp = useSetRecoilState(popUpAtom);
  const [currentSignupTab, setCurrentSignupTab] =
    useRecoilState(currentSignupTabAtom);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[600px] h-[700px] bg-white rounded-2xl outline outline-1 outline-slate-200 shadow-xl flex flex-col justify-evenly items-center"
    >
      <div className=" text-3xl">Join Medium</div>
      <div className=" flex flex-col items-center gap-10">
        {currentSignupTab === "form" ? <SignForm /> : <ProviderOptions />}
        <div className=" font-semibold">
          Already have an account?{" "}
          <span
            onClick={() => {
              setOpenTab("signin");
              setPopUp(true);
              setCurrentSignupTab("");
            }}
            className=" text-[#1b8c17] hover:text-[#156d12] cursor-pointer"
          >
            Sign in
          </span>
        </div>
      </div>
      <div className=" text-center px-16 text-sm text-gray-600">
        Click “Sign up” to agree to Medium's Terms of Service and acknowledge
        that Medium's Privacy Policy applies to you.
      </div>
    </div>
  );
};

const ProviderOptions = () => {
  const setCurrentSignupTab = useSetRecoilState(currentSignupTabAtom);
  return (
    <>
      <div className=" flex flex-col gap-3">
        <div className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5">
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
            alt=""
            className=""
            width={30}
            height={30}
          />
          <div className=" w-3/5 font-semibold">Sign up with Google</div>
        </div>
        <div className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5">
          <img
            src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png"
            alt=""
            className=""
            width={30}
            height={30}
          />
          <div className=" w-3/5 font-semibold">Sign up with Github</div>
        </div>
        <div
          onClick={() => setCurrentSignupTab("form")}
          className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5"
        >
          <img
            src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/mail_email_e-mail_letter-512.png"
            alt=""
            className=""
            width={30}
            height={30}
          />
          <div className=" w-3/5 font-semibold">Sign up with Email</div>
        </div>
      </div>
    </>
  );
};

const SignForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);
  const signupButtonRef = useRef(null);

  const handleSubmit = async () => {
    if (password != confPassword) return console.log("Password didn't match");

    await axios.post("http://localhost:8000/api/v1/auth/signup", {
      email,
      password,
    });
  };

  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <input
          ref={emailRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //@ts-ignore
              passwordRef.current.focus();
            }
          }}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          autoFocus
          className="w-[300px] py-2 px-5 outline-none rounded-full border border-gray-200 "
        />
        <input
          ref={passwordRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //@ts-ignore
              confPasswordRef.current.focus();
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-[300px] py-2 px-5 outline-none rounded-full border border-gray-200 "
        />
        <input
          ref={confPasswordRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //@ts-ignore
              signupButtonRef.current.focus();
            }
          }}
          onChange={(e) => setConfPassword(e.target.value)}
          type="password"
          placeholder="Confirm password"
          className="w-[300px] py-2 px-5 outline-none rounded-full border border-gray-200 "
        />
        <button
          ref={signupButtonRef}
          onClick={handleSubmit}
          className="w-[250px] py-2 px-2 outline-none rounded-full border text-white bg-[#1b8c17] hover:bg-[#156d12] "
        >
          Sign up
        </button>
      </div>
    </>
  );
};
