import { Link } from "react-router-dom";

export const BlogPreviewCard = ({ post }) => {
    let { content } = post

    let postDate = post.createdAt.toDate().toString()
    postDate = postDate.split(' ').splice(1, 3).join(' ');

    let contentPreview = content.split(" ");
    if (contentPreview.length > 35) contentPreview = contentPreview.slice(0, 35).join(" ");

    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`blog/${post.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
            </Link>
            <p className="max-w-screen-md mb-3 font-normal text-gray-400 dark:text-gray-800">{postDate}</p>
            <p className="max-w-screen-md mb-7 font-normal text-gray-700 dark:text-gray-400">{contentPreview}...</p>
            <div className="flex w-full justify-between">
                <Link to={`blog/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </Link>
                <span>
                    <span className="text-gray-400">Author :</span>
                    <Link to={`author/arif`} className="ms-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700">
                        {post.author.name}
                    </Link>
                </span>
            </div>
        </div>
    )
}
