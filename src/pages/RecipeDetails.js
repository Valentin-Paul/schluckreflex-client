import axios, { Axios } from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./css/RecipeDetails.css"


function RecipeDetails(){

    const {recipeId} = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null)
    
    

    useEffect(()=>{
        getRecipeDetails()
            window.scrollTo(0, 0)
    }, [recipeId])

    const getRecipeDetails = ()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/recipes/${recipeId}`)
        .then((response)=> setRecipeDetails(response.data))
        .catch((e)=>{console.log("error getting recipe details --->", e)})
    }

    const getDate = (element) => {
        let months = [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ];
        return (
          <p>
            {months[~~element.updatedAt.slice(5, 7) - 2]}{" "}
            {element.updatedAt.slice(0, 4)}
          </p>
        );
      };

    
    return(
        <div className="is-family-sans-serif container">
        {recipeDetails === null? null 
        : (
            <div>
            <h1 className="section is-size-3-touch is-size-3-desktop has-text-centered is-uppercase pt-3">{recipeDetails.recipeName}</h1>
            <div className="align-center">
            <img className="recipe-image" src={recipeDetails.imageUrl}></img>
            </div>
            <div className="align-infos">
            <div className="minor-infos">
            {getDate(recipeDetails)} 
            <p>Küche: {recipeDetails.tags[0]}</p>
            </div>
            </div>
         
            
           
            <section className="is-medium section-ingredientes">
            <div className="box box-ingredientes">
            <h4 className="is-size-4-touch is-size-3-desktop zutaten">Zutaten:</h4>
            <hr className="hr"/>
            <div className="ingrediente-details">
             <h3 className="is-size-5-touch is-size-3-desktop">{recipeDetails.ingredientes.map((items,index)=>{    
                
                return(
            <div className="">
                {items.map((subItems, sIndex)=>{
                    return(
                        <div className="ingrediente-line ingrediente-line-left"> 
                        <h5 className="mr-3 is-size-5-touch is-size-6-desktop">{subItems.amount}</h5>
                        </div>
                    )
                })}
            </div>
        )}
        )}
               </h3>
               <h3 className="is-5">{recipeDetails.ingredientes.map((items,index)=>{    
                
                return(
            <div className="">
                {items.map((subItems, sIndex)=>{
                    return(
                        <div className="ingrediente-line"> 
                       
                        <h5 className="is-size-5-touch is-size-6-desktop">{subItems.ingrediente}</h5>
                        </div>
                    )
                })}
            </div>
        )}
        )}
               </h3>
            </div>
            </div>
            </section>
            {
                recipeDetails.description.map((step, index)=>{
                    return (
                        <div className="section-step">
                        <p className="">Schritt {index + 1}:</p>
                        <div className="section-step-description">
                        <p>{step}</p>
                        </div>
                        </div>
                            )
                })
            }
            </div>
        )}
        </div>
        
    
    )
}

export default RecipeDetails