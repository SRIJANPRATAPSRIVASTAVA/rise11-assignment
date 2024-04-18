import './App.css';
import { RouterProvider, createBrowserRouter, } from "react-router-dom"
import SignUp from "./components/SignUp.js"
import Login from "./components/Login.js"
import Todos from "./components/Todos.js"
import PageNotFound from "./components/PageNotFound.js"

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/todos",
    element: <Todos />
  },
  {
    path: "*",
    element: <PageNotFound />
  },
])

function App() {
  return (
    <main className="m-0 min-h-[100vh] flex justify-center items-center bg-[#040b1b]">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
