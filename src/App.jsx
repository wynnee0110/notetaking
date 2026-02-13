import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EditorPage from "./pages/EditorPage";

export default function App() {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <main className="flex-1 bg-white ml-80">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/note/:id" element={<EditorPage />} />
        </Routes>
      </main>

    </div>
  );
}
