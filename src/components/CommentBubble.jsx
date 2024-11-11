import React from "react";
import { convertDate } from "../lib/postHelper";

export const CommentBubble = ({ comment }) => {
  const date = convertDate(comment.created_at);

  return (
    <div className="flex items-start gap-2.5 mt-5">
      <img
        className="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
      />
      <div className="flex flex-col w-full max-w-xl leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {comment.username}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {date}
          </span>
        </div>
        <p className="text-md font-normal py-2.5 text-gray-900 dark:text-white">
          {comment.comment_text}
        </p>
      </div>
    </div>
  );
};