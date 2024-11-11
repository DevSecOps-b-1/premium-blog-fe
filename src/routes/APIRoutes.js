// auth routes
export const loginRoute = `${process.env.REACT_APP_SERVER_HOST}/login`;
export const registerRoute = `${process.env.REACT_APP_SERVER_HOST}/register`;

// posts routes
export const getAllPostsRoute = `${process.env.REACT_APP_SERVER_HOST}/get-posts`;
export const getPostRoute = `${process.env.REACT_APP_SERVER_HOST}/view-post`;
export const getCommentsRoute = `${process.env.REACT_APP_SERVER_HOST}/get-comments`;

// user
export const getUserStatusRoute = `${process.env.REACT_APP_SERVER_HOST}/get-userstatus`;
export const addCommentRoute = `${process.env.REACT_APP_SERVER_HOST}/add-comment`;

// autthor
export const CreateBlogRoute = `${process.env.REACT_APP_SERVER_HOST}/add-post`;
export const updateBlogRoute = `${process.env.REACT_APP_SERVER_HOST}/edit-post`;
