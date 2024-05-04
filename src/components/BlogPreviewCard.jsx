export const BlogPreviewCard = ({ post }) => {
    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}1</h5>
            </a>
            <p className="max-w-screen-lg mb-5 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
            <div className="flex w-full justify-between">
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a>
                <span>
                    <span className="text-gray-400">Author :</span>
                    <a href="#" className="ms-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700">
                        {post.author}
                    </a>
                </span>
            </div>
        </div>

    )
}
