export const AuthorProfile = ({ isAuth, blogPosts }) => {
  return (
    <section className="h-fit p-5 rounded-lg shadow sm:fixed mb-5 justify-self-end">
      <div className="p-3 text-lg font-semibold text-gray-900 dark:text-white border rounded-md shadow">
        Total post: {blogPosts}
      </div>
    </section>
  );
};
