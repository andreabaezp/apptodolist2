import "./NavBar.css"
import  rocket from "./../../img/rocket.png"


 function NavBar(){
return(
<div className="wrapNavBar">
    <img className="imgNavBar" src={rocket} alt="Logo" />
    <p className="titleNavBar">Track your tasks = Reach your goal</p>
</div>

)
}

export default NavBar 
