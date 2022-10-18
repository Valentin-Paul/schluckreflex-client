
import "../App.css";
import "./css/Homepage.css"
import MovingText from "react-moving-text"
import { useEffect, useState } from "react";
import background from "../images/herbs-homepage.jpg"


function HomePage() {

  useEffect(()=>{
    handleAnimationName()
  },[])

  const [animationSchluck, setAnimationSchluck] = useState("")
  const [animationReflex, setAnimationReflex] = useState("")

  const handleAnimationName = () => {
    setTimeout(()=>{
      setAnimationSchluck(["Schluck"])
    }, 800)
    setTimeout(()=>{
      setAnimationReflex("reflex")
    }, 1400)
    

  }
  return (
    <div className="App">
      <header className="App-header">
      <div className="animation-header" style={{ backgroundImage: `url(${background})` }}>
      <div className="schluckreflex">
      <div className="schluck ">
      <MovingText
      type="slideInFromBottom"
      duration="600ms"
      delay="0.8s"
      direction="normal"
      timing="ease"
      iteration="1"
      fillMode="none">
      {animationSchluck}
      </MovingText>
      </div>
      <div className="reflex ">
      <MovingText
      type="slideInFromBottom"
      duration="900ms"
      delay="1.4s"
      direction="normal"
      timing="ease-in"
      iteration="1"
      fillMode="none">
     {animationReflex}
    </MovingText>
      </div>
      </div>
      
      <p className="headline">Feinste Rezepte die dich schlucken lassen</p>

      <button className="button is-primary is-light rezepte-button center">Zu den Rezepten</button>
      </div>

      <p className="homepage-description">Schluckreflex ist ein Food-Kollektiv aus Graz & Wien, dass euch in die Welt unseres Essens-Ateliers mitnimmt. Unser Ziel ist es, unsere kullinarischen Kreationen in die Welt zu tragen und dadurch euren Alltag zu versüßen. </p>
      <div className="align-center">
      <button className=" button is-primary button-überuns">Über uns</button>
      </div>
      

        
      </header>
    </div>
  );
}

export default HomePage;
