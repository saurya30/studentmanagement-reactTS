import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();

const handleSignIn = () => {

  localStorage.setItem("isLoggedIn", "true");
  navigate("/");
}

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to manage student records securely.</p>

        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
};

export default LoginPage;