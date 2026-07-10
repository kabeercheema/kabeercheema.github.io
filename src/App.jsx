import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
