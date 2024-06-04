import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useToast } from "@chakra-ui/react";

const PostFeature = ({curentUserProfil, buffer}) => {
  const { userId, token } = useAuthContext();
  const [image, selectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const toast = useToast();

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    selectedImage(file);
  };
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("userId", userId);
      if (image) {
        formData.append("postPicture", image);
      }

      console.log("userId:", userId);
      console.log("token:", token);
      const response = await fetch("http://localhost:4001/api/posts/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Post created.',
          description: "Your post has been created successfully.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        console.log("Post created successfully");
      } else {
        toast({
          title: 'Failed to create post.',
          description: "There was an error creating your post.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error("Failed to create post");
      }
  
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="border-3 w-full max-w-10 border-gray2 max-h-4 mt-1.5 rounded-mdd bg-white mb-1">
      <div className="flex flex-row items-center p-2 border-b-2 justify-between">
        <div className="w-[5%]">
          <img src={curentUserProfil} alt="" className=" size-1 rounded-lg" />  
        </div>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          className="bg-silver rounded-mdd pl-2 w-[75%] h-1 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="whats on your mind?"
        />
        <button
          onClick={handlePost}
          className="bg-[#538DD7] text-white font-semibold w-[17%] h-1 rounded-mdd focus:ring-2 focus:ring-blue-500 "
        >
          Share
        </button>
      </div>
      <div className="flex flex-row p-2 pb-1.5 pt-1.5">
        <div className="flex flex-row mr-1.25 hover:bg-blueHover rounded-md p-1">
          <label
            htmlFor="image-upload"
            className="flex items-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="hidden"
            />
            <img src="/Image.png" width={20} height={20} className="mr-0.7" />
            <p>Image</p>
          </label>
        </div>
        <div className="flex flex-row mr-1.25 hover:bg-blueHover rounded-md p-1">
          <img src="/Video.png" width={20} height={20} className="mr-0.7 " />
          <p>video</p>
        </div>
        <div className="flex flex-row hover:bg-blueHover rounded-md p-1">
          <img src="/File.png" width={15} height={15} className="mr-0.7" />
          <p>attachement</p>
        </div>
      </div>
    </div>
  );
};

export default PostFeature;
