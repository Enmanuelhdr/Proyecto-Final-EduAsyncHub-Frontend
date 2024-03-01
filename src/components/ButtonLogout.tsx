import { Link } from "react-router-dom"
import Cookies from "universal-cookie"


function ButtonLogout() {
  const cookies=new Cookies()
    const logout=()=>{
        cookies.remove("token")
        cookies.remove("userRole")
        window.localStorage.removeItem("youare")
        
    }
    
  return (
    <>
  <Link to={"/"} onClick={logout} className="text-white bg-primary p-2 rounded-sm">logout</Link>


  </>
  )
}

export default ButtonLogout