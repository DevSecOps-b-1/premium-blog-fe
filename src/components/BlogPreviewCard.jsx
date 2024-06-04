import { deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";

export const BlogPreviewCard = ({ post, isAuthors, toggle, setToggle }) => {
    const navigate = useNavigate()

    // create a date to show to the post preview
    let postDate = post.createdAt.toDate().toString();
    postDate = postDate.split(' ').splice(1, 3).join(' ');

    // create a post content preview
    let contentPreview = post.content.split(" ");
    if (contentPreview.length > 35) contentPreview = contentPreview.slice(0, 35).join(" ");

    async function handleDelete() {
        const docRef = doc(db, 'blog-posts', post.id);
        deleteDoc(docRef).then(() => {
            setToggle(!toggle)
        })
    }

    function handleAuthorButton() {
        if (!auth.currentUser) {
            alert('You must be logged in to view this')
        } else {
            navigate(`/author/${post.author.id}`)
        }
    }

    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/blog/${post.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
            </Link>
            <p className="max-w-screen-md mb-3 font-normal text-gray-400 dark:text-gray-800">{postDate}</p>
            <p className="max-w-screen-md mb-7 font-normal text-gray-700 dark:text-gray-400">{contentPreview}...</p>
            <div className="flex w-full justify-between">
                <Link to={`/blog/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </Link>
                {isAuthors && (
                    <button onClick={handleDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                    </button>
                )}

                {!isAuthors && (
                    <span>
                        <span className="text-gray-400 text-xs md:text-sm">Author :</span>
                        <button onClick={handleAuthorButton} className={`ms-2 inline-flex items-center px-3 py-2 font-medium text-center text-white bg-gray-400 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-pointer`}>
                            {post.author.name}
                        </button>
                    </span>
                )}
            </div>
        </div>
    )
}
