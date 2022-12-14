import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import axios from "axios";
import * as PATHS from "./utils/paths";


import Homepage from './pages/HomePage'
import CreateRecipes from "./pages/CreateRecipes";
import AllRecipes from "./pages/AllRecipes"
import RecipeDetails from "./pages/RecipeDetails";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import UpdateRecipe from "./pages/UpdateRecipe"




export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = ()=>{
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/recipes`)
      .then((response)=>{
        console.log(`${process.env.REACT_APP_SERVER_URL}/recipes`)
        setRecipes(response.data)
      })
      .catch((e)=>{console.log("error getting recipes from API ->>>", e)})
  }


  useEffect(() => {

    fetchRecipes();

    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }

    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });

  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }


  


  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      <div className="pages">
      <Routes >
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
          

         
        <Route path="/" element={<Homepage />} />
        <Route path="/postrecipe" element={<CreateRecipes />} />
        <Route path="/recipes" element={<AllRecipes recipes={recipes} callbackFetch={fetchRecipes}/>} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails callbackFetch={fetchRecipes}/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/recipes/:recipeId/update" element={user? <UpdateRecipe/> : <Navigate to={PATHS.LOGINPAGE} replace />} />
       
      </Routes>
       </div>
    </div>
  );
}
