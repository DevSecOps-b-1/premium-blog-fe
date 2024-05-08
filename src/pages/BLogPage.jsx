import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const BlogPage = () => {
    const { id } = useParams() // get post id from  url
    const [post, setPost] = useState()
    const [date, setDate] = useState('')

    useEffect(() => {
        async function getPost() {
            const docRef = doc(db, 'blog-posts', id)
            getDoc(docRef).then((document) => {
                setPost(document.data())

                let dateBuffer = document.data().createdAt.toDate().toString()
                dateBuffer = dateBuffer.split(' ').splice(1, 3).join(' ');
                setDate(dateBuffer);
            })
        }
        getPost()
    }, [id])

    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-lg">
                <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full border" src={post && post.author.photo} alt="Profile" />
                                <div>
                                    <Link to={`author/arif`} rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post && post.author.name}</Link>
                                    <p className="text-base text-gray-500 dark:text-gray-400"><time dateTime="2022-02-08" title="February 8th, 2022">{date}</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post && post.title}</h1>
                    </header>
                    <section className="text-lg">
                        <p>{post && post.content}</p>
                    </section>
                </article>
            </div>
        </main>
    )
}
