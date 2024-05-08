import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config"

export const BlogPage = () => {
    const { id } = useParams() // get post id from  url
    const [post, setPost] = useState()
    const [date, setDate] = useState('')

    const [showModal, setShowModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [renderToggle, setRenderToggle] = useState(false);

    useEffect(() => {
        async function getPost() {
            const docRef = doc(db, 'blog-posts', id)
            getDoc(docRef).then((document) => {
                setPost(document.data())
                setEditTitle(document.data().title)
                setEditContent(document.data().content)

                let dateBuffer = document.data().createdAt.toDate().toString()
                dateBuffer = dateBuffer.split(' ').splice(1, 3).join(' ');
                setDate(dateBuffer);
            })
        }
        getPost()
    }, [id, renderToggle])

    function handleEdit(e) {
        e.preventDefault();

        const editedPost = {
            title: e.target.titleEdit.value,
            content: e.target.contentEdit.value,
            updatedAt: serverTimestamp()
        }

        const docRef = doc(db, 'blog-posts', id)
        updateDoc(docRef, editedPost).then(() => {
            setRenderToggle(!renderToggle);
            setShowModal(false);
        })
    }

    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            {/* <!-- Main modal --> */}
            <div id="deleteModal" className={`${showModal ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full backdrop-blur`}>
                <div className="relative p-2 sm:p-4 w-full max-w-screen-md h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="max-w-screen-lg m-auto text-xl">
                            <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <h1 className="text-center text-3xl font-semibold mb-7">Edit Blog Post</h1>
                            <form onSubmit={handleEdit} className="flex flex-col sm:p-10">
                                <input onChange={(e) => setEditTitle(e.target.value)} value={editTitle} type="text" id="titleEdit" name="titleEdit" placeholder="title here..." className="mb-5 text-3xl p-3 outline-none" />
                                <textarea onChange={(e) => setEditContent(e.target.value)} value={editContent} id="contentEdit" name="contentEdit" placeholder="content here..." className="p-3 mb-5 outline-none min-h-96" />
                                <button type="submit" className="w-fit self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-4 mx-auto max-w-screen-lg">
                <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full border" src={post && post.author.photo} alt="Profile" />
                                <div>
                                    <Link to={post && `/author/${post.author.id}`} rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{post && post.author.name}</Link>
                                    <p className="text-base text-gray-500 dark:text-gray-400">{date}</p>
                                </div>
                            </div>
                        </address>
                        <h1 className="flex justify-between items-center mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                            {post && post.title}
                            {post && auth.currentUser && post.author.id === auth.currentUser.uid && (
                                <button onClick={() => setShowModal(true)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    Edit
                                    <svg className="ms-2 w-6 h-6 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                    </svg>
                                </button>
                            )}
                        </h1>
                    </header>
                    <section className="text-lg whitespace-pre-wrap text-justify">
                        <p>{post && post.content}</p>
                    </section>

                </article>
            </div>
        </main>
    )
}
