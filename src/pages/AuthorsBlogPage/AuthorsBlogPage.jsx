import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, auth } from "../../firebase/config"
import { useParams } from "react-router-dom"
import { BlogPreviewCard } from "../../components/BlogPreviewCard"
import { AuthorProfile } from "./components/AuthorProfile"

export const AuthorsBlogPage = () => {
    const { id } = useParams() // get authors id from  url
    const [blogPosts, setBlogPosts] = useState([]); // set authors blog posts
    const [toggle, setToggle] = useState(false); // toggle used in the useEffect dependencies to re-render after deletion
    const isAuthors = auth.currentUser.uid === id; // check if current user is the author in the authors post page

    useEffect(() => {
        async function fetchPosts() {
            let collRef = collection(db, 'blog-posts')
            if (id) {
                collRef = query(collRef, where('author.id', "==", id)) // query if author is owner of authors blog post
            }
            const data = await getDocs(collRef)
            setBlogPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchPosts()
    }, [id, toggle])

    return (
        <main className="py-10">
            <div className="max-w-screen-xl m-auto">
                {isAuthors && (
                    <AuthorProfile auth={auth} blogPosts={blogPosts.length} />
                )}

                <ul className={`${isAuthors ? 'sm:ms-72' : ''} flex flex-col gap-5`}>
                    {blogPosts && blogPosts.map(post => (
                        <BlogPreviewCard key={post.id} post={post} isAuthors={isAuthors} toggle={toggle} setToggle={setToggle} />
                    ))}
                </ul>
            </div>
        </main>
    )
}
