import { useEffect, useState } from "react";
import { BlogPreviewCard } from "../components/BlogPreviewCard";
import axios from "axios";
import { getAllPostsRoute } from "../routes/APIRoutes";
import { getCookie } from "../lib/cookieHelper";

export const HomePage = ({ setIsAuth, userStatus }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(getAllPostsRoute);
      if (data.success) {
        const posts = Object.keys(data) // Convert only the post items to an array
          .filter((key) => !isNaN(key)) // Keep only numeric keys
          .map((key) => data[key]); // Map the numeric keys to get post objects
        setBlogPosts(posts);
      }
      setIsAuth(getCookie("userId")); // check authentication
    };

    fetchPosts();
  }, []);

  return (
    <main className="py-10">
      <ul className="max-w-screen-xl flex flex-col gap-5 m-auto">
        {blogPosts &&
          blogPosts.map((post) => (
            <BlogPreviewCard
              key={post.id}
              post={post}
              isHome={true}
              userStatus={userStatus}
            />
          ))}
      </ul>
    </main>
  );
};
