import { useState, useEffect } from "react";
import axios from "axios";
import "./css/createRecipe.css";
import { uploadImage } from "../components/UploadImage/UploadImage";
import { useNavigate, useParams } from "react-router-dom"
import { toppings } from "../utils/toppings"


function UpdateRecipe() {

    const {recipeId} = useParams();
    // const [recipeDetails, setRecipeDetails] = useState(null)
    const[recipeName, setRecipeName] = useState('')
    const[ingredientes, setIngredientes] = useState([{amount: '', ingrediente: ''}])
    const[description, setDescription] = useState([''])
    const[errorMessage, setErrorMessage] = useState(null);
    const [checkedTag, setCheckedTag] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate()


    const setAllInputs = (data) =>{
        setRecipeName(data.recipeName);
        setIngredientes(data.ingredientes[0]);
        setDescription(data.description);
        setCheckedTag(data.tags);
        setImageUrl(data.imageUrl)
    }


    const getRecipeDetails = ()=>{
        axios
        .get(`${process.env.REACT_APP_SERVER_URL}/recipes/${recipeId}`)
        .then((response)=>  {
            setAllInputs(response.data)
        })
        .catch((e)=>{console.log("error getting recipe details --->", e)})
    }

    useEffect(()=>{
        getRecipeDetails()
    }, [])
   
   

    const handlePostSubmit = ((e) => {
        e.preventDefault()

        const requestBody = [recipeName, ingredientes, description, checkedTag, imageUrl]
        console.log(requestBody)

        axios.put(`${process.env.REACT_APP_SERVER_URL}/recipes/${recipeId}`,
        requestBody,
        // { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(
          navigate("/recipes")
        )
        .catch((error) => {
            const errorDescription = error.response.data;
            setErrorMessage(errorDescription);
        })
    })



    let handleOnChange = (position) =>{
        if(checkedTag.includes(toppings[position]) === false ) {
            checkedTag.push(toppings[position])
        }
        else if(checkedTag.includes(toppings[position]) === true){
            console.log("true")
            setCheckedTag([...checkedTag].filter(e => e !== toppings[position]))
            
        }

        console.log(checkedTag)
    }

   
    let handleChangeIngrediente = (i, e) => {
        let newIngrediente = [...ingredientes];
        newIngrediente[i][e.target.name] = e.target.value;
        setIngredientes(newIngrediente);
      }
    
    let addIngredienteField = () => {
        setIngredientes([...ingredientes, {amount: '', ingrediente: ''}])
      }
    
    let removeIngredienteField = (i) => {
        let newIngrediente = [...ingredientes];
        newIngrediente.splice(i, 1);
        setIngredientes(newIngrediente)
    }


    let handleChangeDescription = (i, e) => {

      let newDescription = [...description];
      newDescription[i] = e.target.value;
      setDescription(newDescription);
      console.log(description)
    }

    let addDescriptionField = () => {
      setDescription([...description, []])
    }

    let removeDescriptionField = (i) => {
      let newDescription = [...description];
      newDescription.splice(i, 1);
      setDescription(newDescription)
  }

    
 
  const handleFileUpload = (e) => {

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
        .then(response => {
            console.log("response is: ", response);
            setImageUrl(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
};

    return(

        <div className="create-recipes-page">
        {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
        <form onSubmit={handlePostSubmit} encType="multipart/form-data" >
        <div className="ingrediente-box">
        <label className="label ">Name: </label>
            <input className="input name-input" type="text" name="recipeName" value={recipeName} onChange={e=>setRecipeName(e.target.value)}></input>
            
        </div>

        <div className="ingrediente-box">
      <h3 className="label">Bild:</h3>
      <input type="file" onChange={(e) => handleFileUpload(e)} id="file-upload-button" />
        </div>
      

            <div className="ingrediente-box field">
        {ingredientes.map((element, index)=> {
            return(
           <>
            <label className="label">Ingrediente: </label>
            <input className="input" type="text" name="ingrediente" value={element.ingrediente || ""} onChange={e => handleChangeIngrediente(index, e)} ></input>
            <label className="label">Amount: </label>
            <input className="input" type="text" name="amount" value={element.amount || ""} onChange={e => handleChangeIngrediente(index, e)} ></input>
            
            {
                index ? 
                <>
                  <button type="button"  className="button remove" onClick={() => removeIngredienteField(index)}>Remove</button> 
                  <br></br>
                  </>
                : null
              }
             <hr></hr>
             </>
        )})}
        <div className="button-section">
              <button className="button add" type="button" onClick={() => addIngredienteField()}>Add Ingrediente</button>
          </div>
        </div>

       
              <div className="ingrediente-box">
              {description.map((step, index)=>{
                return(
                  <>
                 
                <label className="label">Schritt {index + 1}: </label>
            <input className="textarea" type="textarea" name="description" value={step || ""} onChange={e=> handleChangeDescription(index,e)}></input>
               
            {
                index ? 
                <>
                  <button type="button"  className="button remove" onClick={() => removeDescriptionField(index)}>Remove</button> 
                 
                  </>
                : null
              }
              <hr></hr>

            </>
                )
              })}

                <div className="button-section">
              <button className="button add" type="button" onClick={() => addDescriptionField()}>Add Description</button>
          </div>
              </div>
              
         

          
            <br></br>

              <div className="toppings">
              {toppings.map(( name , index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                  className="checkbox"
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedTag[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label className="checkbox" htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}

       
        
       

              </div>
            

        <button className="button submit" type="submit" >Submit</button>

            
        </form>

        </div>
    )
}

export default UpdateRecipe