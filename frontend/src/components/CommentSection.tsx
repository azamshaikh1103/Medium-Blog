import { useRef } from "react";
import { useRecoilState } from "recoil";
import { isCommentPopupAtom } from "../store/atoms";

export default function CommentSection() {
  const [isCommentPopup, setIsCommentPopup] =
    useRecoilState(isCommentPopupAtom);

  const commentareaRef = useRef(null);

  const handleInput = () => {
    const commentarea = commentareaRef.current;
    commentarea.style.height = "auto";
    commentarea.style.height = `${commentarea.scrollHeight}px`;
  };

  return (
    <>
      <div
        onClick={() => setIsCommentPopup(false)}
        className={`fixed ${
          isCommentPopup ? " flex justify-end" : "hidden"
        } h-screen w-screen z-50 bg-white/[25%]`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" relative w-1/3 h-full bg-white rounded-2xl outline outline-1 outline-slate-200 shadow-xl flex flex-col"
        >
          <div
            onClick={() => setIsCommentPopup(false)}
            className=" absolute top-5 right-10 cursor-pointer"
          >
            X
          </div>
          <div className=" p-10 text-lg font-semibold">Response (15)</div>
          <div className=" mx-5 shadow-md outline-slate-200 outline outline-1 rounded-lg">
            <div className=" text-sm font-semibold font-quicksand p-5 flex gap-3 items-center">
              <div className=" bg-orange-300 rounded-full h-8 w-8">lo</div>
              <div>Azam</div>
            </div>
            <textarea
              //   onChange={(e) => setTitle(e.target.value)}
              ref={commentareaRef}
              className="w-full px-5 outline-none border-l h-auto text-sm font-sans resize-none overflow-hidden"
              onInput={handleInput}
              rows="1"
              placeholder="What are your thoughts?"
              autoFocus
            ></textarea>
            <div className=" px-5 py-2 text-xs flex items-center justify-end">
              <button
                className=" px-4 py-1 rounded-full text-gray-700"
                onClick={() => {
                  //   setPublishConfPopup(true);
                }}
              >
                Cancel
              </button>
              <button
                className=" text-white bg-[#1b8c17] hover:bg-[#156d12] px-4 py-2 rounded-full"
                onClick={() => {
                  //   setPublishConfPopup(true);
                }}
              >
                Respond
              </button>
            </div>
          </div>

          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </>
  );
}

const CommentCard = () => {
  return (
    <>
      <div className=" mx-5 py-5 border-b border-gray-200">
        <div className=" flex gap-5 items-center">
          <div className=" h-8 w-8 bg-red-200 rounded-full">Lo</div>
          <div className=" text-sm">
            <div>Azam Ali Shaikh</div>
            <div className=" text-gray-600">2 days ago</div>
          </div>
        </div>
        <div className=" py-4 text-sm">Comment will me here</div>
        <div className=" flex items-center justify-between text-sm">
          <div>like</div>
          <div>Reply</div>
        </div>
      </div>
    </>
  );
};
