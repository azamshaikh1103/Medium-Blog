"use client";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { openTabAtom, popUpAtom } from "../store/atoms";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { useRef, useState } from "react";
// import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import {
  titleAtom,
  descAtom,
  contentAtom,
  publishConfirmationAtom,
} from "../store/atoms";
import { PublishConfPopup } from "../components/PublishPopup";

// interface userData {
//   id: number;
//   userId: number;
//   name: string;
//   profilePic: string;
//   shortBio: string;
//   about: string;
//   createdOn: string;
// }

export default function NewStory() {
  const titleareaRef = useRef(null);
  const contentareaRef = useRef(null);
  const descareaRef = useRef(null);

  const setTitle = useSetRecoilState(titleAtom);
  const setDesc = useSetRecoilState(descAtom);
  const setContent = useSetRecoilState(contentAtom);

  const handleInput = () => {
    const titlearea = titleareaRef.current;
    titlearea.style.height = "auto";
    titlearea.style.height = `${titlearea.scrollHeight}px`;
  };

  const handleDesc = () => {
    const descarea = descareaRef.current;
    descarea.style.height = "auto";
    descarea.style.height = `${descarea.scrollHeight}px`;
  };

  const handleContent = () => {
    const contentarea = contentareaRef.current;
    contentarea.style.height = "auto";
    contentarea.style.height = `${contentarea.scrollHeight}px`;
  };

  return (
    <>
      <PublishConfPopup />
      <Navbar />
      <div className=" pt-24 w-screen flex justify-center">
        {/* Form start here */}
        <div className=" w-2/3 flex flex-col justify-start">
          <div className=" flex">
            <div className=" w-20 flex justify-center items-center text-sm text-gray-600">
              Title
            </div>
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  //@ts-ignore
                  descareaRef.current.focus();
                }
              }}
              ref={titleareaRef}
              className="w-full px-3 outline-none border-l h-auto text-4xl font-serif resize-none overflow-hidden"
              onInput={handleInput}
              rows="1"
              placeholder="Title"
              autoFocus
            ></textarea>
          </div>

          <div className=" mt-5 flex">
            <div className=" w-20 flex justify-center items-center text-sm text-gray-600">
              Descrption
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  //@ts-ignore
                  contentareaRef.current.focus();
                }
              }}
              ref={descareaRef}
              className="w-full px-3 outline-none border-l h-auto text-xl font-serif resize-none overflow-hidden text-gray-600"
              onInput={handleDesc}
              rows="1"
              placeholder="Upto 10 words description"
            ></textarea>
          </div>

          <div className=" mt-5 flex">
            <div className=" w-20 flex justify-center items-center text-sm text-gray-600">
              Content
            </div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              ref={contentareaRef}
              className="w-full px-3 outline-none border-l h-auto text-2xl font-serif resize-none overflow-hidden"
              onInput={handleContent}
              rows="1"
              placeholder="Tell your story..."
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export const Navbar = () => {
  const navigate = useNavigate();
  const setPublishConfPopup = useSetRecoilState(publishConfirmationAtom);

  return (
    <>
      <div className=" fixed z-10 w-full px-60 h-14 bg-white border-b flex items-center justify-between">
        <div className=" flex gap-3 items-center">
          <div
            className=" font-charter text-3xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            NotMedium
          </div>
          <div className=" pt-2 text-xs text-gray-400 font-semibold">
            Draft in azamshaikh1103
          </div>
          <div className=" pt-2 text-xs text-gray-400">Saved</div>
        </div>

        <div className=" flex gap-6 items-center">
          <button
            className=" text-white bg-[#1b8c17] hover:bg-[#156d12] px-4 py-1 rounded-full"
            onClick={() => {
              setPublishConfPopup(true);
            }}
          >
            Publish
          </button>

          <IoNotificationsOutline className=" text-2xl text-gray-600 hover:text-gray-800 cursor-pointer" />

          <img
            src={
              //   user.profilePic ||
              "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            }
            alt=""
            className=" bg-purple-300 rounded-full cursor-pointer"
            width={35}
            height={35}
          />
        </div>
      </div>
    </>
  );
};
