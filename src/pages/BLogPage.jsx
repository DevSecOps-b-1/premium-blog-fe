import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const BlogPage = () => {
    const { id } = useParams() // get post id from  url
    const [post, setPost] = useState('')

    useEffect(() => {
        async function getPost() {
            const docRef = doc(db, 'blog-posts', id)
            getDoc(docRef).then((document) => {
                console.log(document.data())
                setPost(document.data())
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
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post.author.name}</a>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
                                    <p className="text-base text-gray-500 dark:text-gray-400"><time dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post.title}</h1>
                    </header>
                    <section className="text-lg">
                        <p>{post.content}</p>
                    </section>
                </article>
            </div>
        </main>
    )
}
