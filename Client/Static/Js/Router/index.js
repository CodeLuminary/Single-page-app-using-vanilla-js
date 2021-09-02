import Dashboard from "../views/Dashboard.js";
import Posts from "../views/Posts.js";
import PostView from "../views/PostView.js";
import Settings from "../views/Settings.js";

const routes=[
    /* Put your routes here */
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings }
]

export default routes;