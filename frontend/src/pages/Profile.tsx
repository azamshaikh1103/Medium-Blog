"use client";

import { IoBookmarkOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { searchTermAtom } from "../store/atoms";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [blogs, setBloga] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  const { slug } = useParams();

  const searchTerm = useRecoilValue(searchTermAtom);
  const tags = [
    "For you",
    "Following",
    "Programming",
    "Web Development",
    "Humor",
    "Artificial Intelligence",
    "Software Development",
    "Self Improvement",
    "Psychology",
    "Science",
    "Startup",
    "Money",
  ];
  const recommendedTags = [
    "Humor",
    "Artificial Intelligence",
    "Software Development",
    "Self Improvement",
    "Psychology",
    "Science",
    "Startup",
  ];

  const getBlogs = async () => {
    if (slug) {
      await axios
        .post("http://localhost:8000/api/v1/blog/search", { slug })
        .then((res) => {
          const result: any = res.data;
          setBloga(result);
        });
    }

    await axios
      .post("http://localhost:8000/api/v1/blog/search", { searchTerm })
      .then((res) => {
        const result: any = res.data;
        setBloga(result);
      });
    await axios.get("http://localhost:8000/api/v1/blog/random4").then((res) => {
      const result: any = res.data;
      setTopPicks(result);
    });
  };

  useEffect(() => {
    getBlogs();
  }, [searchTerm, slug]);

  // const handleFollowBtn = async () => {
  //   await axios.post("http://localhost:8000/api/v1/bookmark", { id: id });
  // };

  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <>
      <Navbar />

      {/* <AuthPopup /> */}

      <div className=" grid grid-cols-12">
        <div className=" pt-14 pl-44 h-screen overflow-y-scroll no-scrollbar pr-28 col-span-8 border-r">
          <div className=" my-10 text-4xl font-semibold">Azam Ali Shaikh</div>
          <div className=" text-sm font-semibold flex gap-10 text-gray-500 border-b">
            <div
              onClick={() => setSelectedTab("home")}
              className={`pb-3 transition-all ease-in-out delay-100 ${
                selectedTab == "home"
                  ? " border-b border-black text-black"
                  : " cursor-pointer hover:text-black"
              }`}
            >
              Home
            </div>
            <div
              onClick={() => setSelectedTab("about")}
              className={`pb-3 transition-all ease-in-out delay-100 ${
                selectedTab == "about"
                  ? " border-b border-black text-black"
                  : " cursor-pointer hover:text-black"
              }`}
            >
              About
            </div>
          </div>

          {selectedTab == "home" ? (
            <>
              {blogs.map((blog) => (
                <BlogCard
                  profilePic={blog.author.profilePic}
                  name={blog.author.name}
                  headline={blog.headline}
                  shortDesc={blog.shortDesc}
                />
              ))}
            </>
          ) : (
            <>
              <div className=" py-16 w-full border-b-2">
                <div className=" mb-7 text-sm font-semibold text-gray-500">
                  Medium member since February 2023
                </div>
                <div className=" flex gap-5 text-sm font-semibold text-[#1b8c17]">
                  <div>699 Followers</div>
                  <div>12 Following</div>
                </div>
              </div>
              <div className=" flex justify-between">
                <div className=" my-5 text-xl font-semibold flex flex-col gap-5">
                  <span>Get an email whenever Azam Ali Shaikh publishes.</span>
                  <span className=" text-xs text-gray-500 ">
                    Emails will be sent to sazamx100@gmail.com
                  </span>
                </div>
                <div className=" my-4 h-fit w-fit text-white font-semibold bg-[#1b8c17] hover:bg-[#156d12] px-7 py-2 rounded-full cursor-pointer">
                  Follow
                </div>
              </div>
            </>
          )}
        </div>

        <div className=" pt-16 col-span-4 h-screen overflow-y-scroll no-scrollbar  pl-5 pr-32">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            alt=""
            className=" bg-purple-300 rounded-full"
            width={100}
            height={100}
          />
          <div className=" mt-3 w-full font-semibold text-gray-700">
            Azam Ali Shaikh
          </div>
          <div className=" w-full py-1 text-gray-500">699 Followers</div>
          <div className=" w-full py-1 text-sm text-gray-500">
            Software Developer, writer and entrepreneur
          </div>

          <div className=" my-4 w-fit text-white text-sm font-semibold bg-[#1b8c17] hover:bg-[#156d12] px-4 py-2 rounded-full cursor-pointer">
            Follow
          </div>

          <div className=" w-full font-semibold py-2 border-b">Following</div>

          <div className="mt-5">
            {topPicks.map((blog, index) => (
              <div
                key={index}
                className=" my-4 w-full cursor-pointer flex items-center justify-between"
              >
                <div className=" flex items-center gap-3">
                  <img
                    src={
                      blog.author.profilePic ||
                      "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
                    }
                    alt=""
                    className=" bg-purple-300 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className=" font-semibold">{blog.author.name}</div>
                    <div className=" font-medium text-xs text-gray-600">
                      {blog.author.shortBio}
                    </div>
                  </div>
                </div>
                <div
                  onClick={async () => {
                    await axios.post("http://localhost:8000/api/v1/bookmark", {
                      id: blog.author.id,
                    });
                  }}
                  className=" cursor-pointer outline outline-1 px-3 py-2 rounded-full text-xs"
                >
                  Follow
                </div>
              </div>
            ))}
            <div className=" my-1 text-gray-500 text-sm font-semibold">
              see all (12)
            </div>
          </div>

          <div className=" mt-3 w-full font-semibold py-2 border-b">
            Reading list
          </div>

          <div className=" mt-2 w-full py-2 font-medium text-gray-600 text-sm">
            Click the <IoBookmarkOutline className=" inline-block" /> on any
            story to easily add it to your reading list or a custom list that
            you can share.
          </div>
        </div>
      </div>
    </>
  );
};
