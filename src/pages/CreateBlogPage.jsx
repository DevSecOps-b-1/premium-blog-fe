import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreateBlogRoute } from "../routes/APIRoutes";

export const CreateBlogPage = () => {
  const navigate = useNavigate();

  async function handleSubmitPost(e) {
    e.preventDefault();
    const blogData = {
      title: e.target.titleInput.value,
      content: e.target.contentInput.value,
      isPremium: e.target.isPremium.value,
    };
    try {
      const { response } = await axios.post(CreateBlogRoute, blogData);

      console.log("Post added successfully:", response.data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
    navigate("/");
  }

  return (
    <main className="sm:p-16">
      <div className="max-w-screen-lg m-auto text-xl">
        <h1 className="text-center text-3xl font-semibold mb-7">
          Create Blog Post
        </h1>
        <form onSubmit={handleSubmitPost} className="flex flex-col">
          <input
            type="text"
            id="titleInput"
            name="titleInput"
            placeholder="title here..."
            className="mb-5 text-3xl p-3 outline-none"
          />
          <textarea
            id="contentInput"
            name="contentInput"
            placeholder="content here..."
            className="p-3 mb-5 outline-none min-h-96"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPremium"
              id="isPremium"
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:ring-offset-0 dark:bg-gray-700 dark:focus:ring-blue-600"
            />
            <label htmlFor="isPremium" className="ml-2">
              Premium Post
            </label>
          </div>
          <button
            type="submit"
            className="w-fit self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Post
          </button>
        </form>
      </div>
    </main>
  );
};
