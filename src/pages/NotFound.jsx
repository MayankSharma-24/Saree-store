import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="page-container">
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "80px", margin: "0" }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ fontSize: "18px", color: "#666", marginTop: "20px" }}>
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
          style={{ marginTop: "30px", display: "inline-block" }}
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
