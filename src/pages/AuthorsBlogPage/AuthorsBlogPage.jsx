import { useEffect, useState } from "react";
import { BlogPreviewCard } from "../../components/BlogPreviewCard";
import { AuthorProfile } from "./components/AuthorProfile";
import axios from "axios";
import { getAllPostsRoute } from "../../routes/APIRoutes";

export const AuthorsBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]); // set authors blog posts
  const [toggle, setToggle] = useState(false); // toggle used in the useEffect dependencies to re-render after deletion
  const userStatus = {
    is_premium: true,
    is_author: true,
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(getAllPostsRoute);
      if (data.success) {
        const posts = Object.keys(data) // Convert only the post items to an array
          .filter((key) => !isNaN(key)) // Keep only numeric keys
          .map((key) => data[key]); // Map the numeric keys to get post objects
        setBlogPosts(posts);
      }
    };

    fetchPosts();
  }, [toggle]);

  return (
    <main className="py-10">
      <div className="max-w-screen-xl m-auto">
        <AuthorProfile blogPosts={blogPosts.length} />

        <ul className={`sm:ms-72 flex flex-col gap-5`}>
          {blogPosts &&
            blogPosts.map((post) => (
              <BlogPreviewCard
                key={post.id}
                post={post}
                userStatus={userStatus}
                toggle={toggle}
                setToggle={setToggle}
              />
            ))}
        </ul>
      </div>
    </main>
  );
};
