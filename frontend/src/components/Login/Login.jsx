import {Link,useNavigate} from "react-router-dom"
import './login.css'
import { useState } from "react";
import {auth} from "../../utils/firebase-config"



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
const handelRegister = async (e) => {
  e.preventDefault();
  try {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    await auth.createUserWithEmailAndPassword(email, password);
    navigate("/");
  } catch (error) {
    console.log(error)
  }
  }
 

const signIn = async (e) => {
  e.preventDefault();
  try {
    await auth.signInWithEmailAndPassword(email, password);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
 










  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          onClick={handelRegister}
          type="submit"
          className="login__registerButton"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login