import { useSetRecoilState, useRecoilState } from "recoil";
import { openTabAtom, popUpAtom, currentSigninTabAtom } from "../store/atoms";
import { useState, useRef } from "react";
import axios from "axios";

export const Signin = () => {
  const setOpenTab = useSetRecoilState(openTabAtom);
  const setPopUp = useSetRecoilState(popUpAtom);
  const [currentSigninTab, setCurrentSigninTab] =
    useRecoilState(currentSigninTabAtom);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[600px] h-[700px] bg-white rounded-2xl outline outline-1 outline-slate-200 shadow-xl flex flex-col justify-evenly items-center"
    >
      <div className=" text-3xl">Welcome back to Medium</div>
      <div className=" flex flex-col items-center gap-10">
        {currentSigninTab === "" ? <LoginProviderOptions /> : <SignForm />}

        <div className=" font-semibold">
          Don't have an account?{" "}
          <span
            onClick={() => {
              setOpenTab("signup");
              setPopUp(true);
              setCurrentSigninTab("");
            }}
            className=" text-[#1b8c17] hover:text-[#156d12] cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </div>
      <div className=" text-center px-16 text-sm text-gray-600">
        Click “Sign in” to agree to Medium's Terms of Service and acknowledge
        that Medium's Privacy Policy applies to you.
      </div>
    </div>
  );
};

const LoginProviderOptions = () => {
  const setCurrentSigninTab = useSetRecoilState(currentSigninTabAtom);
  return (
    <div className=" flex flex-col gap-3">
      <div className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5">
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
          alt=""
          className=""
          width={30}
          height={30}
        />
        <div className=" w-3/5 font-semibold">Sign in with Google</div>
      </div>
      <div className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5">
        <img
          src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png"
          alt=""
          className=""
          width={30}
          height={30}
        />
        <div className=" w-3/5 font-semibold">Sign in with Github</div>
      </div>
      <div
        onClick={() => setCurrentSigninTab("form")}
        className=" w-[300px] py-1 px-2 rounded-full outline outline-1 cursor-pointer flex items-center justify-start gap-5"
      >
        <img
          src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/mail_email_e-mail_letter-512.png"
          alt=""
          className=""
          width={30}
          height={30}
        />
        <div className=" w-3/5 font-semibold">Sign in with Email</div>
      </div>
    </div>
  );
};

const SignForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signinButtonRef = useRef(null);

  const handleSubmit = async () => {
    try {
      console.log(email);
      console.log(password);

      const temp = await axios.post(
        "http://localhost:8000/api/v1/auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(temp);
    } catch (error) {
      console.log(error);
    }
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
              signinButtonRef.current.focus();
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-[300px] py-2 px-5 outline-none rounded-full border border-gray-200 "
        />
        <button
          ref={signinButtonRef}
          onClick={handleSubmit}
          className="w-[250px] py-2 px-2 outline-none rounded-full border text-white bg-[#1b8c17] hover:bg-[#156d12] "
        >
          Sign in
        </button>
      </div>
    </>
  );
};
