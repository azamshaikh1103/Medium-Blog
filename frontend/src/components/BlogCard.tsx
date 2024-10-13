"use client";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import axios from "axios";
// import { useRoutes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiTwotoneLike, AiOutlineComment } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { isCommentPopupAtom } from "../store/atoms";

interface BlogTypes {
  id: number;
  profilePic: string;
  name: string;
  headline: string;
  shortDesc: string;
  //   thumbnail: string;
  //   likes: string;
  //   comments: string;
  //   publishedOn: string;
  //   bookmark: string;
}

export const BlogCard = ({
  id,
  profilePic,
  name,
  headline,
  shortDesc,
}: //   thumbnail,
//   likes,
//   comments,
//   publishedOn,
//   bookmark,
BlogTypes) => {
  const handleBookmarkClick = async () => {
    await axios.post("http://localhost:8000/api/v1/bookmark", { id: id });
  };

  const navigate = useNavigate();
  const setIsCommentPopup = useSetRecoilState(isCommentPopupAtom);

  return (
    <>
      {/* Card starts */}

      <div
        onClick={() =>
          navigate(`/blog/${headline.replace(/\s+/g, "-").toLowerCase()}/${id}`)
        }
        className=" py-10 flex flex-col gap-3 border-b cursor-pointer"
      >
        <div className=" flex gap-3 text-sm text-gray-600">
          <img
            src={
              profilePic ||
              "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
            }
            alt=""
            className=" bg-purple-300 rounded-full"
            width={20}
            height={20}
          />
          <div>{name}</div>
        </div>
        <div className=" flex gap-5">
          <div className=" w-4/5 ">
            <div className=" text-2xl font-bold">{headline}</div>
            <div className=" mt-2">{shortDesc}</div>
            <div className=" flex items-end justify-between">
              <div className=" mt-3 text-gray-600 flex items-center gap-5">
                <div className=" flex items-center gap-2 cursor-pointer hover:text-gray-800">
                  {true ? (
                    <AiFillLike className=" text-blue-400" />
                  ) : (
                    <AiTwotoneLike />
                  )}
                  Likes
                </div>
                <div
                  onClick={() => setIsCommentPopup(true)}
                  className=" flex items-center gap-2 cursor-pointer hover:text-gray-800"
                >
                  <AiOutlineComment /> Comments
                </div>
                <div>Mar 24</div>
              </div>
              <IoBookmarkOutline onClick={handleBookmarkClick} />
            </div>
          </div>
          <div className=" flex items-center">
            <div className=" w-40 h-28 overflow-hidden bg-gray-300 rounded-xl">
              <img
                src={
                  "https://fastly.picsum.photos/id/58/1280/853.jpg?hmac=YO3QnOm9TpyM5DqsJjoM4CHg8oIq4cMWLpd9ALoP908"
                }
                className=" h-full"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* card ends */}
    </>
  );
};
