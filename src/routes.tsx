import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { PostDetail } from "./components/PostDetail";
import { NewPost } from "./components/NewPost";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "post/:id", Component: PostDetail },
      { path: "new", Component: NewPost },
      { path: "*", Component: NotFound },
    ],
  },
]);
