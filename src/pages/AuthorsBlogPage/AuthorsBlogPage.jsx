import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { BlogPreviewCard } from "../../components/BlogPreviewCard"
import { db, auth } from "../../firebase/config"

export const AuthorsBlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([])

    console.log(auth)

    useEffect(() => {
        async function fetchPosts() {
            let collRef = collection(db, 'blog-posts')
            const data = await getDocs(collRef)
            setBlogPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            console.log('---')
        }
        fetchPosts()
    }, [])

    return (
        <main className="py-10">
            <div className="max-w-screen-xl m-auto">
                <section className="h-fit p-5 rounded-lg shadow fixed justify-self-end">
                    <div>
                        <img className="mr-4 w-16 h-16 rounded-full" src={auth.currentUser.photoURL} alt="Jese Leos" />
                        <div className="p-3">
                            Name:
                            <p rel="author" className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.displayName}</p>
                            Email:
                            <p className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.email}</p>
                        </div>
                    </div>
                    <div className="p-3 text-lg font-semibold text-gray-900 dark:text-white border rounded-md shadow">Total post: 2</div>
                </section>
                <ul className="ms-72 flex flex-col gap-5">
                    {blogPosts && blogPosts.map(post => (
                        <BlogPreviewCard key={post.id} post={post} authors={true} />
                    ))}
                </ul>
            </div>
        </main>
    )
}
