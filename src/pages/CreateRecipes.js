
import { useState } from "react"
import axios from "axios"
import { toppings } from "../utils/toppings"

function CreateRecipes() {

    const[recipeName, setRecipeName] = useState('')
    const[ingredientes, setIngredientes] = useState([{amount: '', ingrediente: ''}])
    const[description, setDescription] = useState('')
    const[tags, setTags] = useState([])
    const[errorMessage, setErrorMessage] = useState(undefined);
    const [checkedTag, setCheckedTag] = useState([]
        // new Array(toppings.length).fill(false)
      );
    

    const handlePostSubmit = ((e) => {
        e.preventDefault()

        // checkedTag.map((tag, index)=>{
        //     if (tag === true){
        //         tags.push(toppings[index])
        //     }
        // })

        const requestBody = [recipeName, ingredientes, description, checkedTag]
        console.log(requestBody)

        axios.post(`${process.env.REACT_APP_SERVER_URL}/postrecipe`,
        requestBody,
        // { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        // .then(
        //     setRecipeName(''),
        //     setIngredientes(''),
        //     setDescription(''),
        //     setTags('')
        // )
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

    // let handleOnChange = (position) => {
    //     const updatedCheckedTag = checkedTag.map((item, index) =>
    //     index === position ? !item : item
    //     );

    //     setCheckedTag(updatedCheckedTag);
    // }
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

    function checkValue(e) {
        setTags([...tags, e.target.value]) 
        // console.log("You selected " + value);
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
            <input type="text" name="ingrediente" value={element.ingrediente || ""} onChange={e => handleChangeIngrediente(index, e)} ></input>
            <label>Amount: </label>
            <input type="text" name="amount" value={element.amount || ""} onChange={e => handleChangeIngrediente(index, e)} ></input>
           
            {
                index ? 
                <>
                  <button type="button"  className="button remove" onClick={() => removeIngredienteField(index)}>Remove</button> 
                  <br></br>
                  </>
                : null
              }
              <button className="button submit" type="submit">Submit</button>
              </div>
        )})}

        <div className="button-section">
              <button className="button add" type="button" onClick={() => addIngredienteField()}>Add</button>
          </div>

          <label>Description: </label>
            <input type="text" name="description" value={description} onChange={e=> setDescription(e.target.value)}></input>
            <br></br>


            {toppings.map(( name , index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedTag[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}

{/* <input>
type="checkbox" 
value={"dinner"} 
name="dinner" 
checked={checkedState[index]}
onChange={() => handleOnChange(index)}
</input>

<label>Dinner</label>
<input type="checkbox" value="breakfast" name="breackfast" onChange={e=>{checkValue(e)}}></input>
<label>Breakfast</label> */}

              {/* <form>
              <label>Tags</label>
              <input type="checkbox" value="Frühstück" name="tags" id="Frühstück"> Frühstück </input>
              <input type="checkbox" value="Mittag" name="tags" id="Mittag"> Mittag </input>
              <input type="checkbox" value="Dinner" name="tags" id="Dinner">  </input>
              <input type="checkbox" value="Snacks" name="tags" id="Snacks">  </input>
</form> */}
{/* {tags.map((element, index)=>{
    return(
        <div className="tag-box">
        <label>tags: </label>
            <input type="text" name="tags" value={element[0]} onChange={e => handleChangeTags(index, e)}></input>
            <br></br>
        </div>
    )
})} */}
            
         
        </form>

        </div>
    )
}

export default CreateRecipes