import '../componen/Login/style.css'
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from  '../../firebase.config'
import { toast } from 'react-toastify';
import Helmet from "../componen/Helmet/Helmet";
import { Col } from 'reactstrap';


export default function () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);

    const signIn = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          email, 
          password)

        const user = userCredential.user;

        console.log(user);
        setLoading(false);
        toast.success("Successfull Login");
        navigate('/dashboard/add-donasi');
      }
      catch (error){
        setLoading(false)
        toast.error("Something wrong");
      }
    };

  return (
    <Helmet title="Login">
      {
        Loading ? <Col lg='12' className="text-center"><h5 className='fw-bold'>Loading....</h5></Col> : 
        <div className="form-container">
          <form className="form" onSubmit={signIn}>
            <div className="form-content">
              <h3 className="form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" href="#" onClick={() => navigate('/Regis')}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" href="#" >
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      }

    </Helmet>
  )
}