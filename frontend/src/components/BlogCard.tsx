import { AiFillLike, AiTwotoneLike, AiOutlineComment } from "react-icons/ai";

interface BlogTypes {
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
  return (
    <>
      {/* Card starts */}

      <div className=" py-10 flex flex-col gap-3 border-b cursor-pointer">
        <div className=" flex gap-3 text-sm text-gray-600">
          <img
            src={profilePic}
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
            <div className=" mt-3 text-gray-600 flex items-center gap-5">
              <div className=" flex items-center gap-2 cursor-pointer hover:text-gray-800">
                {true ? <AiFillLike className=" text-blue-400" /> : <AiTwotoneLike />}
                Likes
              </div>
              <div className=" flex items-center gap-2 cursor-pointer hover:text-gray-800">
                <AiOutlineComment /> Comments
              </div>
              <div>Mar 24</div>
            </div>
          </div>
          <div className=" flex items-center">
            <div className=" w-40 h-28 bg-gray-300 rounded-xl">
              {profilePic}
            </div>
          </div>
        </div>
      </div>

      {/* card ends */}
    </>
  );
};
