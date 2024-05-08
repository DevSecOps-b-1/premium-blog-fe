export const AuthorProfile = ({ auth, blogPosts }) => {
    return (
        <section className="h-fit p-5 rounded-lg shadow sm:fixed mb-5 justify-self-end">
            <div>
                <img className="mr-4 w-16 h-16 rounded-full border" src={auth.currentUser.photoURL} alt="Profile" />
                <div className="p-3">
                    Name:
                    <p rel="author" className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.displayName}</p>

                    Email:
                    <p className="text-lg mb-3 ms-2 font-semibold text-gray-900 dark:text-white">{auth.currentUser.email}</p>
                </div>
            </div>
            <div className="p-3 text-lg font-semibold text-gray-900 dark:text-white border rounded-md shadow">Total post: {blogPosts}</div>
        </section>
    )
}
