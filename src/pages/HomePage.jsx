
import "../App.css";
import "./css/Homepage.css"
import MovingText from "react-moving-text"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

import * as PATHS from "../utils/paths";
import background from "../images/herbs-homepage.jpg"
import walnut from "../images/walnut.jpeg"
import arrow from "../images/up-arrow.png"
import chilli from "../images/chili.png"


function HomePage() {

  useEffect(()=>{
    handleAnimationName()
  },[])



  const [animationSchluck, setAnimationSchluck] = useState("")
  const [animationReflex, setAnimationReflex] = useState("")
  const FadeUp = batch( MoveIn(),FadeIn());

  const handleAnimationName = () => {
    setTimeout(()=>{
      setAnimationSchluck(["Schluck"])
    }, 500)
    setTimeout(()=>{
      setAnimationReflex("reflex")
    }, 1200)
    
   

  }
  return (
<div className="App">
    <ScrollContainer>
    <ScrollPage> 
    <a name="top"></a>
    <div className="animation-header" style={{ backgroundImage: `url(${background})` }}>
    
    <div className="schluckreflex future-cop">
    <div className="schluck cop">
    <MovingText
    type="slideInFromBottom"
    duration="600ms"
    delay="0.5s"
    direction="normal"
    timing="ease"
    iteration="1"
    fillMode="none">
    {animationSchluck}
    </MovingText>
    </div>
    <div className="reflex future">
    <MovingText
    type="slideInFromBottom"
    duration="900ms"
    delay="1.2s"
    direction="normal"
    timing="ease-in"
    iteration="1"
    fillMode="none">
   {animationReflex}
  </MovingText>
    </div>
    </div>
    
    <p className="headline">Unsere feinsten Rezepte für dich</p>
    <Link
          to={PATHS.RECIPES}
          className="button is-primary is-light rezepte-button center"
          width="100%"
        >
          Zu den Rezepten
        </Link>
    </div>
     </ScrollPage>
    
    <ScrollPage>
    <Animator animation={FadeUp}>
    
      <div className="section-description align-center">
      <h3 className="über-uns-header">Über uns</h3>
    <p className="homepage-description">Schluckreflex ist ein Food-Kollektiv aus Graz & Wien, dass euch in die Welt unseres Essens-Ateliers mitnimmt. Unser Ziel ist es, unsere kullinarischen Kreationen in die Welt zu tragen und dadurch euren Alltag zu versüßen. Zusammen als Team arbeiten wir täglich in unseren Food-Studio daran die Geschmäcker aus allen Teilen der Welt zu kombinieren und neue Essens-Kompositionen zu gestalten  </p>
     <img src={chilli} className="chilli"></img>
      <div className="align-center">
     
      <Link to={PATHS.ABOUTUS} className=" button is-primary button-überuns">
        mehr
      </Link>
     
      </div>
    </div>
  
      
    </Animator>
    </ScrollPage>
     <ScrollPage>
     <Animator animation={Fade()}>
   
     <div className="contact-homepage" style={{ backgroundImage: `url(${walnut})` }}>
     <h3 className="kontakt-header">Kontakt</h3>
      <p className="homepage-description homepage-contact">Wir freuen und über Fragen, Anmerkungen, Kritik, Rezeptwünsche oder eigens kreiirte Rezepte die wir ausprobieren sollen oder einfach eine nette Nachricht. Folge uns gerne auf Instagram und empfehle uns deinen Freunden, Verwandten und Bekannten weiter. </p>
      <div className="align-center">

      <Link to={PATHS.CONTACT} className=" button is-primary is-light button-contact" >
        Nachricht
      </Link>
      </div>
      </div>
  
      </Animator>
     
     </ScrollPage>
     <Animator animation={MoveOut()}>
  
 
  </Animator>
   
  <a href="#top">
  <div className="to-top">
  <img src={arrow}></img>
  </div>
 
  </a>
  




    </ScrollContainer>


    
      <header className="App-header">
     

   
 
    

  
    
      

        
      </header>
    </div>
  );
}

export default HomePage;
