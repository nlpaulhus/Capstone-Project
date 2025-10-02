import routes from "./routes/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../src/index.css";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
