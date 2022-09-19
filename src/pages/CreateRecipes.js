
import { useState } from "react"
import axios from "axios"

function CreateRecipes() {

    const[recipeName, setRecipeName] = useState('')
    const[ingredientes, setIngredientes] = useState([{amount: '', ingrediente: ''}])
    const[description, setDescription] = useState('')
    const[tags, setTags] = useState('')
    const[errorMessage, setErrorMessage] = useState(undefined);

    const handlePostSubmit = ((e) => {
        e.preventDefault()

        const requestBody = [recipeName, ingredientes, description, tags]
        console.log(requestBody)

        axios.post(`${process.env.REACT_APP_SERVER_URL}/postrecipe`,
        requestBody,
        // { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(
            setRecipeName(''),
            setIngredientes(''),
            setDescription(''),
            setTags('')
        )
        .catch((error) => {
            const errorDescription = error.response.data;
            setErrorMessage(errorDescription);
        })
    })

    let handleChange = (i, e) => {
        let newIngrediente = [...ingredientes];
        newIngrediente[i][e.target.name] = e.target.value;
        setIngredientes(newIngrediente);
      }
    
    let addFormFields = () => {
        setIngredientes([...ingredientes, {amount: '', ingrediente: ''}])
      }
    
    let removeFormFields = (i) => {
        let newIngrediente = [...ingredientes];
        newIngrediente.splice(i, 1);
        setIngredientes(newIngrediente)
    }
    
    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(ingredientes));
    // }


    return(

        <div className="create-recipes-page">
        {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
        <form onSubmit={handlePostSubmit}>
            <label>Name: </label>
            <input type="text" name="recipeName" value={recipeName} onChange={e=>setRecipeName(e.target.value)}></input>
            <br></br>

        {ingredientes.map((element, index)=> {
            return(
            <div className="ingrediente-box">
            <label>Ingredients: </label>
            <input type="text" name="ingrediente" value={element.ingrediente || ""} onChange={e => handleChange(index, e)} ></input>
            <label>Amount: </label>
            <input type="text" name="amount" value={element.amount || ""} onChange={e => handleChange(index, e)} ></input>
           
           
            {
                index ? 
                <>
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                  <br></br>
                  </>
                : null

              }
              <button className="button submit" type="submit">Submit</button>
              </div>
              
        )})}

        <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
          </div>

          <label>Description: </label>
            <input type="text" name="description" value={description} onChange={e=> setDescription(e.target.value)}></input>
            <br></br>

         
        </form>

        </div>
    )
}

export default CreateRecipes