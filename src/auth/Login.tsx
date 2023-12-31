import { useContext, useState } from "react";
import Title from "../components/Title";
import FormLayout from "../layouts/FormLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../services/ApiServices";
import { setToken, setUser } from "./TokenManager";
import { UserContext } from "../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  function validate(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Email is required and must be valid.");
      return false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*"
      );
      return false;
    }
    return true;
  }
  function handleClick() {
    if (!validate()) {
      return;
    }

    login({
      email,
      password,
    })
      .then((user) => {
        if (user.token) {
          setToken(user.token);
          setUser(user);
          setUserData(user);
        }

        navigate("/");
        toast.success(`Welcome ${user?.user.firstName}`);
      })
      .catch((err) => {
        toast.error("cannot log in,please check again email/password ");
      });
  }

  const handleRefresh = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="mt-5">
        <FormLayout>
          <div style={{ padding: "5rem",backgroundColor:"#f5f5dc61" }}>
            <Title mainText="LOGIN" />

            <div className="mt-4">
              <div className="form-floating">
                <input
                  id="emailInput"
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailInput">Email: &#42;</label>
              </div>
            </div>

            <div className="mt-4">
              <div className="form-floating">
                <input
                  id="passwordInput"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="passwordInput">Password: &#42;</label>
              </div>
            </div>

            <div className="m-4 d-flex justify-content-center ">
              <button
                className="me-2 col-6 btn btn-outline-danger"
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </button>
              <button
                className="me-2 col-6 btn btn-outline-primary"
                onClick={handleRefresh}
              >
                <i className="bi bi-arrow-repeat"></i>
              </button>
            </div>

            <div className="d-flex justify-content-center">
              <button onClick={handleClick} className="col-12 btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </FormLayout>
      </div>
    </>
  );
}
export default Login;
