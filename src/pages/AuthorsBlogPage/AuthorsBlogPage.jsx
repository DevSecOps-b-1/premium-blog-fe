import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { BlogPreviewCard } from "../../components/BlogPreviewCard"
import { db, auth } from "../../firebase/config"
import { useParams } from "react-router-dom"

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
                    <section className="h-fit p-5 rounded-lg shadow fixed justify-self-end">
                        <div>
                            <img className="mr-4 w-16 h-16 rounded-full border" src={auth.currentUser.photoURL} alt="Profile" />
                            <div className="p-3">
                                Name:
                                <p rel="author" className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.displayName}</p>

                                Email:
                                <p className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.email}</p>
                            </div>
                        </div>
                        <div className="p-3 text-lg font-semibold text-gray-900 dark:text-white border rounded-md shadow">Total post: {blogPosts.length}</div>
                    </section>
                )}

                <ul className={`${isAuthors ? 'ms-72' : ''} flex flex-col gap-5`}>
                    {blogPosts && blogPosts.map(post => (
                        <BlogPreviewCard key={post.id} post={post} authors={id} toggle={toggle} setToggle={setToggle} />
                    ))}
                </ul>
            </div>
        </main>
    )
}
