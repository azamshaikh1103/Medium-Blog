import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { searchTermAtom } from "../store/atoms";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
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

  return (
    <>
      <Navbar />
      <div className=" grid grid-cols-12">
        <div className=" pl-44 h-screen overflow-y-scroll no-scrollbar pr-28 col-span-8 border-r">
          <div className=" pt-20 pb-4 border-b text-gray-600 flex gap-5 overflow-x-scroll no-scrollbar items-center">
            {tags.map((tag) => (
              <Link
                to={`/tag/${tag}`}
                className={` ${
                  tag == slug ? "text-black font-medium cursor-default" : ""
                } hover:text-black flex-shrink-0`}
                key={tag}
              >
                {tag}
              </Link>
            ))}
          </div>

          {blogs.map((blog) => (
            <BlogCard
              profilePic={blog.author.profilePic}
              name={blog.author.name}
              headline={blog.headline}
              shortDesc={blog.shortDesc}
            />
          ))}
        </div>

        <div className=" pt-16 col-span-4 h-screen overflow-y-scroll no-scrollbar  pl-5 pr-32">
          <div className=" w-full font-semibold py-2 border-b">Staff Picks</div>
          <div className="mt-5">
            {topPicks.map((blog) => (
              <TopPicks
                dp={blog.author.profilePic}
                name={blog.author.name}
                headline={blog.headline}
              />
            ))}
          </div>

          <div className=" mt-2 w-full font-semibold py-2 border-b">
            Recommended Topics
          </div>
          <div className=" mt-5 w-full flex flex-wrap gap-3">
            {recommendedTags.map((tag) => (
              <div className=" px-5 py-2 rounded-full bg-slate-100 cursor-pointer text-sm font-medium">
                {tag}
              </div>
            ))}
          </div>

          <div className=" mt-3 w-full font-semibold py-2 border-b">
            Who to follow
          </div>

          <div className="mt-5">
            {topPicks.map((blog) => (
              <div className=" my-4 w-full cursor-pointer flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <img
                    src={blog.author.profilePic}
                    alt=""
                    className=" bg-purple-300 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className=" text-lg font-semibold">
                      {blog.author.name}
                    </div>
                    <div className=" font-medium text-sm text-gray-600">
                      {blog.author.shortBio}
                    </div>
                  </div>
                </div>
                <div className=" cursor-pointer outline outline-1 px-3 py-2 rounded-full text-xs">
                  Follow
                </div>
              </div>
            ))}
          </div>

          <div className=" mt-2 w-full font-semibold py-2 border-b">
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

const TopPicks = ({
  dp,
  name,
  headline,
}: {
  dp: string;
  name: string;
  headline: string;
}) => {
  return (
    <>
      <div className=" my-3 bg-slate-50 px-3 py-2 rounded-xl cursor-pointer">
        <div className=" flex gap-2 text-xs font-semibold text-gray-600">
          <img
            src={dp}
            alt=""
            className=" bg-purple-300 rounded-full"
            width={20}
            height={20}
          />
          <div>{name}</div>
        </div>
        <div className=" mt-1 font-bold">{headline}</div>
      </div>
    </>
  );
};
