import { useRef } from "react"
import { auth } from "../../firebase/config";
import { serverTimestamp } from "firebase/firestore";

export const CreateBlogPage = () => {

    const contentTextArea = useRef(null)

    function handleTextAreaHeight() {
        // contentTextArea.current.style.height = calcHeight(contentTextArea.current.value) + "px";
        console.log(contentTextArea.current.height)
    }

    const calcHeight = (value) => {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        let newHeight = 80 + numberOfLineBreaks * 28 + 12 + 2; // min-height + lines x line-height + padding + border
        return newHeight;
    }

    function handleSubmitPost(e) {
        e.preventDefault();

        const postData = {
            title: e.target.titleInput.value,
            content: e.target.contentInput.value,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        console.log(postData);
    }

    return (
        <main className="p-16">
            <div className="max-w-screen-lg m-auto text-xl">
                <h1 className="text-center text-3xl font-semibold mb-7">Create Blog Post</h1>
                <form onSubmit={handleSubmitPost} className="flex flex-col">
                    <input type="text" id="titleInput" name="titleInput" placeholder="title here..." className="mb-5 text-3xl p-3 outline-none" />
                    <textarea ref={contentTextArea} onChange={handleTextAreaHeight} id="contentInput" name="contentInput" placeholder="content here..." className="p-3 mb-5 outline-none min-h-96 h-fit" />
                    <button type="submit" className="w-fit self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Post</button>
                </form>
            </div>
        </main>
    )
}
