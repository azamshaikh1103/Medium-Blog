import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  titleAtom,
  descAtom,
  contentAtom,
  publishConfirmationAtom,
} from "../store/atoms";

export const PublishConfPopup = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useRecoilState(titleAtom);
  const [desc, setDesc] = useRecoilState(descAtom);
  const content = useRecoilValue(contentAtom);
  const isPublishConfPopup = useRecoilValue(publishConfirmationAtom);
  const setPublishConfPopup = useSetRecoilState(publishConfirmationAtom);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/blog/create",
        {
          headline: title,
          shortDesc: desc,
          content: content,
          published: true,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data)
        navigate(
          `/blog/${title.replace(/\s+/g, "-").toLowerCase()}/${res.data.id}`
        );
    } catch (error) {
      console.log("Catch error", error);
    }
  };

  return (
    <>
      <div
        onClick={() => setPublishConfPopup(false)}
        className={`fixed ${
          isPublishConfPopup ? "flex justify-center items-center" : "hidden"
        } h-screen w-full z-50 bg-white/[96%]`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" relative w-[80%] h-[90%] bg-white rounded-2xl outline outline-1 outline-slate-200 shadow-xl flex flex-col justify-evenly items-center"
        >
          <div className=" absolute top-5 right-10">X</div>
          <div className=" flex gap-10 px-20">
            <div className=" w-1/2">
              <div className=" py-3">Story Preview</div>
              <div className=" w-full h-[250px] bg-slate-100 rounded-lg">a</div>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className=" mt-2 text-lg font-semibold w-full border-b outline-none"
                value={title}
              />
              <input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                className=" py-1 text-gray-600 text-sm w-full border-b outline-none"
                value={desc}
              />
              <div className=" text-sm text-gray-500">
                <span className=" font-semibold">Note:</span> Changes here will
                affect how your story appears in public places like Medium's
                homepage and in subscribers' inboxes — not the contents of the
                story itself.
              </div>
            </div>
            <div className="">
              <div className=" py-3">Publishing to:</div>
              <div className=" text-sm text-gray-600 py-2">
                Add or change topics (up to 5) so readers know what your story
                is about
              </div>
              <div className=" w-full h-12 bg-gray-100 rounded-lg flex items-center px-3 text-sm text-gray-600">
                Add a topic...
              </div>
              <div className=" text-sm text-gray-600 py-2">
                Learn more about what happens to your post when you publish.
              </div>
              <button
                className=" text-white bg-[#1b8c17] hover:bg-[#156d12] px-4 py-1 my-3 rounded-full"
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
