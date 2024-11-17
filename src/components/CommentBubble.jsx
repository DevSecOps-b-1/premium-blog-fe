import React from "react";
import { convertDate } from "../lib/postHelper";
import InnerHTML from "dangerously-set-html-content";

export const CommentBubble = ({ comment }) => {
  const date = convertDate(comment.created_at);

  return (
    <li className="flex items-start gap-2.5 mt-5">
      <img
        className="w-8 h-8 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"
        alt="User"
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
        <div>
          <InnerHTML html={`${comment.comment_text}`} />
        </div>
      </div>
    </li>
  );
};
