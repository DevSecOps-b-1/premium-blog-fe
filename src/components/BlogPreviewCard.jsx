import { Link, useNavigate } from "react-router-dom";
import { convertDate, createExcerpt } from "../lib/postHelper";
import { deleteBlogRoute } from "../routes/APIRoutes";
import axios from "axios";

export const BlogPreviewCard = ({
  post,
  isHome,
  userStatus,
  toggle,
  setToggle,
}) => {
  const navigate = useNavigate();

  // create a date to show to the post preview
  let postDate = convertDate(post.created_at);

  // create a post content preview
  let contentPreview = createExcerpt(post.content);

  async function handleDelete() {
    const { data } = await axios.post(deleteBlogRoute, { postId: post.id });
    console.log(data);
    setToggle(!toggle);
  }

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/blog/${post.id}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
      </Link>
      <p className="max-w-screen-md mb-3 font-normal text-gray-400 dark:text-gray-800">
        {postDate}
      </p>
      <p className="max-w-screen-md mb-7 font-normal text-gray-700 dark:text-gray-400">
        {contentPreview}...
      </p>
      <div className="flex w-full justify-between">
        <Link
          to={
            post.is_premium && !userStatus.is_premium ? `/` : `/blog/${post.id}`
          }
          className={`${
            post.is_premium && !userStatus.is_premium
              ? "cursor-not-allowed bg-gray-500"
              : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          } inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg`}
        >
          {isHome ? "Read more" : "Edit"}
        </Link>
        {post.is_premium && (
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-400 font-medium rounded-lg text-sm p-1 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
          </button>
        )}

        {!isHome && userStatus.is_author && (
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
