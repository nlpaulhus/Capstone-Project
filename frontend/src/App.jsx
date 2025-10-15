import routes from "./routes/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../src/index.css";

const router = createBrowserRouter(routes);

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  return <RouterProvider router={router} />;
}

export default App;
