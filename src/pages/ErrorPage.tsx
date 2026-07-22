import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist or may have been moved.</p>

      <Link to="/" className="error-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
