import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/AuthContext.jsx';
import UserRoutes from "../src/routes/UserRoutes.jsx"
import AuthRoutes from "../src/routes/AuthRoutes.jsx"
import DotSpinner from "./components/DotSpinner.jsx"

const App = () => {
  const { user , isloading } = useContext(AuthContext)

  if(isloading){
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <DotSpinner />
      </div>
    )
  }

  return (
    <>
     { user ? <UserRoutes /> : <AuthRoutes />}
     <ToastContainer />
    </>
  )
}

export default App;