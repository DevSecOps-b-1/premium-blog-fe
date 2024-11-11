import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { EditFormModal } from "./components/EditFormModal";
import axios from "axios";
import { getPostRoute } from "../../routes/APIRoutes";

export const BlogPage = () => {
  const { id } = useParams(); // get post id from  url
  const [post, setPost] = useState(); // set post
  const [date, setDate] = useState(""); // set date

  const [showModal, setShowModal] = useState(false);
  const [renderToggle, setRenderToggle] = useState(false); // to update if the post is edited

  useEffect(() => {
    async function getPost() {
      const { data } = await axios.post(getPostRoute, {
        postId: id,
        isPremiumUser: true,
      });
      console.log(data);
      setPost(data);
    }

    getPost();
  }, [id, renderToggle]);

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      {post && (
        <EditFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          post={post}
          id={id}
          setRenderToggle={setRenderToggle}
          renderToggle={renderToggle}
        />
      )}

      <div className="flex justify-between px-4 mx-auto max-w-screen-lg">
        <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                {/* <img
                  className="mr-4 w-16 h-16 rounded-full border"
                  src={post && post.author.photo}
                  alt="Profile"
                /> */}
                <div>
                  {/* <Link
                    to={post && `/author/${post.author.id}`}
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {post && post.author.name}
                  </Link> */}
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {date}
                  </p>
                </div>
              </div>
            </address>
            <h1 className="flex justify-between items-center mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {post && post.title}
              {/* {post &&
                auth.currentUser &&
                post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Edit
                    <svg
                      className="ms-2 w-6 h-6 text-white dark:text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </button>
                )} */}
            </h1>
          </header>
          <section className="text-lg whitespace-pre-wrap text-justify">
            <p>{post && post.content}</p>
          </section>

          {/* comment section */}
          <section className="md:mt-32 mt-20">
            <form>
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <textarea
                    id="comment"
                    rows="4"
                    className="w-full p-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Post comment
                  </button>
                </div>
              </div>
            </form>
          </section>
        </article>
      </div>
    </main>
  );
};