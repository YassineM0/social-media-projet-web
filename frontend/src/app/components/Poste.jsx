import React, { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useAuthContext } from "../context/authContext";
import CommentsComponent from "./CommentsComponent";
import { useToast } from "@chakra-ui/react";

const Poste = ({
  postId,
  name,
  caption,
  profilePic,
  postPicture,
  likes,
  setLikes,
  post,
  commentList,
  currentUser,
  buffer,
  curentUserProfil,
  src
}) => {
  const toast = useToast();
  const { token, userId } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(caption);
  const [comments, setComments] = useState(commentList || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const menuRef = useRef(null);

  
  const imgProfile = profilePic ? buffer(profilePic) : "";
  const imgPost = src.data ? buffer(src.data) : "";
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModify = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the post");
      }

      if (response.ok){
        toast({
          title: 'Post has been Updated.',
          description: "Your Post has been updated successfuly.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }

      const data = await response.json();
      setDescription(data.description);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }
      if (response.ok){
        toast({
          title: 'Post has been deleted.',
          description: "Your Post has been deleted successfuly.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };
  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}/${userId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );
      if (!response.ok) {
        toast({
          title: 'Failed to add your comment.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        throw new Error("Failed to add comment");
      }
      if (response.ok){
        toast({
          title: 'Comment has been Aded.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        console.log(comments);
        const data = await response.json();
        setComments([...comments,data.newComment]);
        setNewComment("");
      }

    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like the post");
      }
      if (response.ok){
        const data = await response.json();
        setLikes(likes);
        toast({
          title: `${data.message}`,
          status: 'info',
          duration: 9000,
          isClosable: true,
          position: 'bottom-left',
        });

      }
      
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  const toggleComments = () => {
    setShowComments(!showComments);
    console.log(comments);
  };
  const handleCloseComments = () => {
    setShowComments(false);
  };

  return (
    <div className="flex flex-col border-3 border-gray2 rounded-mdd bg-white mb-1.5 w-full max-w-10 overflow-hidden">
      <div className=" flex-row pt-1 pb-1 pl-2 bg-gray2 flex justify-between  items-center">
        <div className="flex items-center">
            <div className="bg-black w-1 h-1 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={imgProfile}
                alt=""
                className="object-center w-full"
              />
            </div>
          <h6 className="text-base font-semibold ml-1">{name}</h6>
        </div>
        <div
          className="menu-container relative inline-block mr-1"
          ref={menuRef}
        >
          <button className="text-2xl focus:outline-none" onClick={toggleMenu}>
            <CiMenuKebab size={25} />
          </button>
          {isOpen && (
            <ul className="menu absolute right-0 mt-1.25 w-68 bg-white border-3 border-gray2 rounded-mdd shadow-lg z-10">
              <li
                className="menu-item px-4 py-2 hover:bg-gray-100 hover:rounded-mdd cursor-pointer"
                onClick={handleModify}
              >
                Modify
              </li>
              <li
                className="menu-item px-4 py-2 hover:bg-gray-100 hover:rounded-mdd cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="p-2">
        {isEditing ? (
          <div className="flex p-2 items-center">
            <textarea
              className="border p-2 mr-1 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-[#538DD7] text-white font-semibold py-1.15 px-2 h-1 rounded-mdd focus:ring-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <p className="pb-1">{description}</p>
        )}
        <div className="h-auto max-h-9 m-auto rounded-mdd border-b-2 mb-1.25 overflow-hidden flex justify-center items-center">
          <img src={imgPost} alt="" className="w-full" />
        </div>
        <div className="flex flex-row items-center justify-between m-auto mb-1">
          <div className="flex items-center">
            <button onClick={handleLike}>
              <img src="/Add.png" width={30} height={30} className="mr-1" />
            </button>
            <div>
              <p className="">{likes}</p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <img src="/Comment.png" width={30} height={30} className="mr-1" />
            <div>
              <button onClick={toggleComments}>
                <p>{comments.length}</p>
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <img src="/Share.png" width={30} height={30} className="mr-1" />
            <div>
              <p></p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" flex-row mb-1 flex justify-between">
            <div className="bg-black w-1 h-1 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={curentUserProfil}
                alt=""
                className="object-center"
              />
            </div>
            <div className="w-[75%]">
              <input
                type="text"
                className="bg-silver rounded-mdd h-1 p-2 w-[100%] focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Add your Comment!"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className=" w-[17%]">
              <button
                onClick={handleAddComment}
                className="bg-[#538DD7] text-white font-semibold w-[100%] h-1 rounded-mdd focus:ring-2 focus:ring-blue-500"
              >
                Comment
              </button>
            </div>
          </div>
          {showComments && (
            <CommentsComponent
              comments={comments}
              onClose={handleCloseComments}
              post={post}
              buffer={buffer}
              currentUser={currentUser}
              postId={postId}
              token={token}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Poste;
