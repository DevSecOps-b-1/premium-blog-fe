import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, auth } from "../../firebase/config"
import { useParams } from "react-router-dom"
import { BlogPreviewCard } from "../../components/BlogPreviewCard"
import { AuthorProfile } from "./components/AuthorProfile"

export const AuthorsBlogPage = () => {
    const { id } = useParams() // get post id from  url
    const [blogPosts, setBlogPosts] = useState([]);
    const [toggle, setToggle] = useState(false);

    const isAuthors = auth.currentUser.uid === id;

    useEffect(() => {
        async function fetchPosts() {
            let collRef = collection(db, 'blog-posts')
            if (id) {
                collRef = query(collRef, where('author.id', "==", id))
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
                        <BlogPreviewCard key={post.id} post={post} authors={id} toggle={toggle} setToggle={setToggle} />
                    ))}
                </ul>
            </div>
        </main>
    )
}
