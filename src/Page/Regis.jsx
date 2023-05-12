import '../componen/Login/stRegis.css'
import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { setDoc, doc} from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {auth} from '../../firebase.config'
import {db} from  '../../firebase.config'
import {storage} from  '../../firebase.config'
import {toast} from 'react-toastify';

export default function () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);



    const signup = async(e) => {
      e.preventDefault()
      setLoading(true);

      try{
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email, 
          password
        );
        const user = await userCredential.user;

        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error)=>{
          toast.error(error.messege)
        }, 
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            //update profil
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            //store user data
          await setDoc(doc(db,'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        }); 
      });
      setLoading(false)
      toast.success("Account created");
      navigate('/login')
      console.log(user)
      }catch(error){
        setLoading(false)
        toast.error("Something wrong");
      }
    };

  return (
    <div className="form-container">
      {
      <form className="form" onSubmit={signup}>
        <div className="form-content">
          <h3 className="form-title" >Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" href="#" onClick={() => navigate('/Login')}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <label>Password</label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          </div>
          <div className="form-group mt-3">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <label>Confirm Password</label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Foto Profil</Form.Label>
            <Form.Control 
            type="file" 

            onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" 
            
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          </p>
        </div>
      </form>
      }
    </div>
  )
}