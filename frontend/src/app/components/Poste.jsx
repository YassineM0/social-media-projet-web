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
  src,
  likes: initialLikes,
  commentList,
}) => {
  const toast = useToast();
  const { token, userId } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(caption);
  const [comments, setComments] = useState(commentList || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);

  const menuRef = useRef(null);

  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const imageSrc = src.data ? bufferToBase64(src.data) : "";

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

      if (onDelete) {
        onDelete(postId);
        
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
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      setComments([...comments, { user: "You", text: newComment }]);
      setNewComment("");
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

      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const handleCloseComments = () => {
    setShowComments(false);
  };

  return (
    <div className="flex flex-col border-3 border-gray2 rounded-mdd bg-white mb-1.5 w-10 overflow-hidden">
      <div className=" flex-row pt-1 pb-1 pl-2 bg-gray2 flex justify-between  items-center">
        <div className="flex items-center">
          <img
            src={profilePic}
            alt=""
            className="w-1.25 h-1.25 rounded-lg bg-blue mr-1"
          />
          <h6 className="text-base font-semibold">{name}</h6>
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
        <p className="pl-2 pt-2 pb-1">{description}</p>
      )}
      <div className="w-9 h-auto m-auto rounded-mdd border-b-2 mb-1.25">
        <img src={imageSrc} alt="" className="" />
      </div>
      <div className="flex flex-row items-center justify-between m-auto mb-1 w-9">
        <div className="flex items-center">
          <button onClick={handleLike}>
            <img src="/Add.png" width={20} height={20} className="mr-1" />
          </button>
          <div>
            <p className="">{likes} found this interesting</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <img src="/Comment.png" width={20} height={20} className="mr-1" />
          <div>
            <button onClick={toggleComments}>
              <p>{comments.length} comments</p>
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/Share.png" width={20} height={20} className="mr-1" />
          <div>
            <p>0 share</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-9">
        <div className=" flex-row pl-2 mb-1 flex justify-between">
          <img
            src={profilePic}
            alt=""
            className="w-1 h-1 rounded-lg mr-0.5 bg-blue object-center"
          />
          <input
            type="text"
            className="bg-silver  rounded-mdd pr-3  px-6 h-1 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Add your Comment!"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-[#538DD7] text-white font-semibold py-1.15 px-2 h-1 rounded-mdd focus:ring-2 focus:ring-blue-500"
          >
            Comment
          </button>
        </div>
        {showComments && (
          <CommentsComponent
            comments={commentList}
            onClose={handleCloseComments}
          />
        )}
      </div>
    </div>
  );
};

export default Poste;
