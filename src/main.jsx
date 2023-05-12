import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom' 
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from './Redux/store';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          theme="light"
          />
        <ToastContainer />
        <App />
       </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
