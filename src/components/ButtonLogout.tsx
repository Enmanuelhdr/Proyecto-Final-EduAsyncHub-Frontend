import { Link } from "react-router-dom"
import Cookies from "universal-cookie"


function ButtonLogout() {
  const cookies=new Cookies()
    const logout=()=>{
        cookies.remove("token")
        cookies.remove("userRole")
        cookies.remove("userId")
        window.localStorage.removeItem("youare")
        
    }
    
  return (
    <>
  <Link to={"/"} onClick={()=>{logout();location.reload()} }className="dropdown-item text-light" style={{backgroundColor: 'transparent'}}>Log Out</Link>


  </>
  )
}

export default ButtonLogout