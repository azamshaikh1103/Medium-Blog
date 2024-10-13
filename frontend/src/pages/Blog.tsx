"use client";

import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import axios from "axios";
import { AiFillLike, AiTwotoneLike, AiOutlineComment } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import { useSetRecoilState } from "recoil";
import { isCommentPopupAtom } from "../store/atoms";

export const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const setIsCommentPopup = useSetRecoilState(isCommentPopupAtom);

  const fetchBlog = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/blog/read", {
        id: Number(id),
      });
      setBlog(res.data);
    } catch (error) {
      console.log("Try catch error", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      <CommentSection />
      <Navbar />
      <div className=" pt-14 flex justify-center">
        <div className=" px-10 w-1/2">
          <div className=" py-5 border-b">
            <div className=" font-sans py-5 text-4xl font-bold">
              {blog.headline}
            </div>
            <div className=" pb-5 text-2xl font-sans text-gray-600">
              {blog.headline}
            </div>
            <div className=" my-5 flex gap-3">
              <img
                src="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
                alt=""
                className=" bg-purple-300 rounded-full"
                width={50}
                height={50}
              />
              <div>
                <div className=" flex gap-5">
                  {blog.author ? (
                    <div className=" font-semibold">{blog.author.name}</div>
                  ) : (
                    <></>
                  )}
                  <div className=" text-[#1b8c17]">Follow</div>
                </div>
                <div className=" flex gap-5">
                  <div>Publish in self account</div>
                  <div className=" text-gray-500">8 min read</div>
                  <div className=" text-gray-500">26 Mar, 24</div>
                </div>
              </div>
            </div>
          </div>

          <div className=" pb-3 border-b flex items-end justify-between">
            <div className=" mt-3 text-gray-600 flex items-center gap-5">
              <div className=" flex items-center gap-2 cursor-pointer hover:text-gray-800">
                {true ? (
                  <AiFillLike className=" text-blue-400" />
                ) : (
                  <AiTwotoneLike />
                )}
                <span className=" text-sm">32</span>
              </div>
              <div
                onClick={() => setIsCommentPopup(true)}
                className=" flex gap-2 items-center cursor-pointer"
              >
                <AiOutlineComment />
                <span className=" text-sm">12</span>
              </div>
            </div>
            <IoBookmarkOutline
            //  onClick={handleBookmarkClick}
            />
          </div>

          {/* content from here */}

          <div className=" py-10 text-lg text-gray-700 font-serif">
            {blog.content}
          </div>
        </div>
      </div>
      <div className=" bg-slate-100 mt-10 pt-20 w-full">ad</div>
    </>
  );
};
