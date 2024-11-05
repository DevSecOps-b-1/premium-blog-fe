// import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { db } from "../firebase/config";
import { BlogPreviewCard } from "../components/BlogPreviewCard";

export const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  // useEffect(() => {
  //     async function fetchPosts() {
  //         const collRef = collection(db, 'blog-posts')
  //         const data = await getDocs(collRef)
  //         setBlogPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  //     }
  //     fetchPosts()
  // }, [])

  return (
    <main className="py-10">
      <ul className="max-w-screen-xl flex flex-col gap-5 m-auto">
        {blogPosts &&
          blogPosts.map((post) => (
            <BlogPreviewCard key={post.id} post={post} />
          ))}
      </ul>
    </main>
  );
};
