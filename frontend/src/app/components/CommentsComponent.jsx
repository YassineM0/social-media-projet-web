import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useToast } from "@chakra-ui/react";

const CommentsComponent = ({ post, buffer, onClose, currentUser, handleDeleteComment ,postId, token, setComments, setIsOpenComment, isOpenComment }) => {
  const scrollbarStyles = {
    /* Hide scrollbar for Chrome, Safari and Opera */
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    WebkitScrollbar: {
      width: "8px" /* Width of the entire scrollbar */,
    },
  };
  const commentRef = useRef(null);
  
  
  const toast = useToast();
  
  const toggle = () => {
    setIsOpenComment(!isOpenComment);
  };

  const handleClickOutsideComment = (e) => {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
        setIsOpenComment(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideComment);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideComment);
    };
  }, [isOpenComment]);


  const isMyComment = (whoCommentId) => {
    const userid = currentUser.user._id;
    if (whoCommentId._id === userid) {
      return true;
    } else {
      return false;
    }
  };
  
  let comments = post.comments;


  return (
    <>
      <button
        onClick={onClose}
        className=" text-darkBlue font-bold text-xl text-center w-[100%]"
      >
        Hide Comments
      </button>
      <div className="items-center justify-center flex flex-row border border-t-3 border-t-gray2 rounded-md p-1 pb-2 bg-silver  ">
        <div className="w-full overflow-y-auto max-h-6" style={scrollbarStyles}>
          <div className="flex flex-col gap-0.5 pl-1.15 pr-1.15">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex justify-start p-0.5 bg-white rounded-md"
              >
                <div className="w-full flex flex-start flex-col">
                  <div className="flex flex-row flex-start items-center justify-between">
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
                          {comment.userId.firstName}
                          {` `}
                          {comment.userId.lastName}
                        </p>
                      </div>
                    </div>
                    {isMyComment(comment.userId) && (
                      <div ref={commentRef} className="relative">
                        <button
                          className="text-2xl focus:outline-none"
                          onClick={toggle}
                        >
                          <CiMenuKebab size={25} />
                        </button>
                        {isOpenComment && (
                          <ul className="menu absolute right-0 mt-1.25 w-68 bg-white border-3 border-gray2 rounded-mdd shadow-lg z-10">
                            <li
                              className="menu-item px-4 py-2 hover:bg-gray-100 hover:rounded-mdd cursor-pointer"
                              //onClick={handleModify}
                            >
                              Modify
                            </li>
                            <li
                              className="menu-item px-4 py-2 hover:bg-gray-100 hover:rounded-mdd cursor-pointer"
                              onClick={()=>handleDeleteComment(comment._id, comment)}
                            >
                              Delete
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="text-gray-700  border-t-3 border-t-gray2  pt-1.5 pb-1">
                      {comment.text}
                    </p>
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
