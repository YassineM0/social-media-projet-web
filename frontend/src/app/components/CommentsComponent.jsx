import React from "react";

const CommentsComponent = ({ post,buffer, onClose }) => {
  const scrollbarStyles = {
    /* Hide scrollbar for Chrome, Safari and Opera */
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    WebkitScrollbar: {
      width: "8px" /* Width of the entire scrollbar */,
    },
  };
  let  comments = post.comments
  return (
    <>
      <button
        onClick={onClose}
        className=" text-darkBlue font-bold text-xl text-center w-[100%]"
      >
        Hide Comments
      </button>
      <div
        className="items-center justify-center flex flex-row border border-t-3 border-t-gray2 rounded-md p-1 pb-2 bg-silver  "
        
      >
        <div className="w-full overflow-y-auto max-h-6" style={scrollbarStyles}>
          <div className="flex flex-col gap-0.5 pl-1.15 pr-1.15">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex justify-start p-0.5 bg-white rounded-md"
              >
                <div className="w-full flex flex-start flex-col">
                  <div className="flex flex-row flex-start items-center">
                    <div className="">
                      <img
                        src={buffer(comment.userId.profilePicture.data.data)}
                        alt=""
                        className="w-1 h-1 rounded-full bg-black mt-0.5"
                      />
                    </div>
                    <div className="ml-1">
                      <p className="font-semibold ">
                        {comment.userId.firstName}{` `}
                        {comment.userId.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-gray-700  border-t-3 border-t-gray2  pt-1.5 pb-1">{comment.text}</p>
                    <p className="text-gray-500 text-xs">{comment.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsComponent;
