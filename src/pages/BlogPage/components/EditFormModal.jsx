import { useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const EditFormModal = ({ showModal, setShowModal, post, id, setRenderToggle, renderToggle }) => {
    const [editTitle, setEditTitle] = useState(post.title); // title value for title edit input
    const [editContent, setEditContent] = useState(post.content); // content value for content edit input

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
    )
}
