import { useState, useEffect } from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      className="dark-toggle"
      onClick={() => setIsDark(!isDark)}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="toggle-icon">{isDark ? "☀️" : "🌙"}</span>
      <span className="toggle-label">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
