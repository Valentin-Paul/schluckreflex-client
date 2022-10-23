import "./css/AllRecipes.css"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { toppings } from "../utils/toppings"


function AllRecipes(props){
    
const [filter, setFilter] = useState([])
const [buttonClicked, setButtonClicked] = useState([])
const [filteredRecipes, setFilteredRecipes] = useState([])


// useEffect(()=>{
// filter.map((filterElement)=>{
// return props.recipes.map((recipe)=>{
//     return ((recipe.tags.includes(filterElement) === true && filteredRecipes.includes(recipe) === false)? filteredRecipes.push(recipe) : null)
// })
// })
// console.log(filteredRecipes)
// }, [filter])


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

const handleTag = (event) => {
  filter.includes(event)
    ? setFilter([...filter.filter((tag) => tag != event)])
    : setFilter([...filter, event]);
  console.log(filter);
};

const handleButton = (event) => {
  buttonClicked.includes(event)
    ? setButtonClicked([...buttonClicked.filter((button) => button != event)])
    : setButtonClicked([...buttonClicked, event]);
};

return (
  <div className="allrecipes-page">
    <p className="tabs tabs-tags">
      {toppings.map((tag, num) => {
        return (
          <button
            value={tag}
            onClick={(e) => {
              handleTag(e.target.value);
              handleButton(num);
            }}
            style={{
              backgroundColor:
                buttonClicked.includes(num) === true ? "#425F57" : "grey",
              color: buttonClicked.includes(num) === true ? "white" : "black",
            }}
            className="button is-primary is-light m-1 mt-2 button-toppings"
          >
            {tag}
          </button>
        );
      })}
    </p>

    {   filter[0] === undefined?
    ( props.recipes.map((element) => {
      return (
        <NavLink to={`/recipes/${element._id}`} className="recipe-link">
          <div className="recipe-box">
            <div className="shadow">
              <div className="recipe-top">
                {getDate(element)}
                <h3>{element.recipeName}</h3>
              </div>

              {element.ingredientes.map((items, index) => {
                return (
                  <div className="ingredientes">
                    {items.slice(0,3).map((subItems, sIndex) => {
                      return <h5>{subItems.ingrediente}</h5>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </NavLink>
      );
    }))
    :
    (
        <>
     
        {filter.map((filterElement)=>{
           return  props.recipes.map((element)=>{
            return element.tags.includes(filterElement) === true? (
        <NavLink to={`/recipes/${element._id}`} className="recipe-link">
          <div className="recipe-box">
            <div className="shadow">
              <div className="recipe-top">
                {getDate(element)}
                <h3>{element.recipeName}</h3>
              </div>

              {element.ingredientes.map((items, index) => {
                return (
                  <div className="ingredientes">
                    {items.slice(0,3).map((subItems, sIndex) => {
                      return <h5>{subItems.ingrediente}</h5>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </NavLink>
      ) : null
           })
        })}
  
    </>
    )
       
    }
  </div>
);
}

export default AllRecipes