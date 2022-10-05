import "./css/AllRecipes.css"
import { NavLink } from "react-router-dom";


function AllRecipes(props){
    console.log(props.recipes)
  


const getDate = (element)=>{
let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "August", "September", "Oktober", "November", "Dezember"]
return <p>{months[~~element.updatedAt.slice(5,7)-2]} {element.updatedAt.slice(0,4)}</p>
}

return(
<>
  {props.recipes.map((element)=>{

   return( 
    
    <NavLink to={`/recipes/${element._id}`} className="recipe-link">
    <div className="recipe-box">
    <div className="shadow">
    <div className="recipe-top">
    {getDate(element)}
    <h3>{element.recipeName}</h3>
    </div>
   
    {element.ingredientes.map((items,index)=>{
       
        return(
            <div className="ingredientes">
                {items.map((subItems, sIndex)=>{
                    return(
                        <h5>{subItems.ingrediente}</h5>
                    )
                })}
            </div>
        )
        
    })}
    </div>
    </div>
    </NavLink>
 
    
    )
  })}
</>   
    )
}

export default AllRecipes