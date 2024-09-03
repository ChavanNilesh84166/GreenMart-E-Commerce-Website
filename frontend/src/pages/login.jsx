import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/user";
import { toast } from "react-toastify";
import "../css/Login.css"; // Ensure you have this CSS file for additional styles

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const result = await login(email, password);
      if (result) {
        const { token, data: name } = result;
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("name", name);
        if (result.role === "SELLER") {
          sessionStorage.setItem("sellerid", result.id);
          sessionStorage.setItem("role", result.role);
          toast.success("Login successful");
          navigate("/SellerDashboard");
        } else if (result.role === "ADMIN") {
          sessionStorage.setItem("customerid", result.id);
          sessionStorage.setItem("role", result.role);
          console.log(result);
          toast.success("Admin logged in successfully");
          navigate("/AdminDashboardPage");
        } else if (result.role === "CUSTOMER") {
          sessionStorage.setItem("customerid", result.id);
          toast.success("Customer logged in successfully");
          navigate("/home");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Authentication failed. Please check your credentials.");
      } else {
        toast.error("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>
            <div className="form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-3 text-center">
                <div className="mb-2">
                  Don't have an account yet?{" "}
                  <Link to="/registerSeller">Register as Seller</Link>
                  <br />
                  Don't have an account yet?{" "}
                  <Link to="/registerCustomer">Register as Customer</Link>
                </div>
                <button onClick={onLogin} className="btn btn-success">
                  <span className="label">LOGIN</span>
                </button>
                <div className="guest-link">
                  <Link to="/home"> Guest</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
