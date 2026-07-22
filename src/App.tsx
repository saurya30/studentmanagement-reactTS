import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ViewProfile from "./pages/ViewProfile";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="edit-student/:id" element={<AddStudent />} />
            <Route path="student/:id" element={<ViewProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
