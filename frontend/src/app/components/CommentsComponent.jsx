import React from "react";

const CommentsComponent = ({ comments, profilePic, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg w-2/3 max-h-2/3 overflow-y-auto z-60">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          X
        </button>
        <h2 className="text-lg font-semibold">Comments</h2>
        <div className="grid grid-cols-1 ">
          {Object.keys(comments).map((key) => (
            <div key={key} className="flex justify-end">
              <div>
                <p className="font-semibold">{comments[key].userId}</p>
                <p className="text-gray-700">{comments[key].text}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(comments[key].createdAt).toLocaleString()}
                </p>
              </div>
              <img
                src={profilePic}
                alt=""
                className="w-10 h-10 rounded-full ml-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsComponent;
