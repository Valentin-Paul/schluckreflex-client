import "./css/contact.css"
import contactImage from "../images/contactImage.jpg"
import insta from "../images/instagram.png"
import mail from "../images/email.png"

function Contact (){

    return(
        <div style={{ backgroundImage: `url(${contactImage})` }} className="contact-background">
        <h1>Kontakt</h1>
        <p>Wenn du mehr über Schluckreflex, das Team oder Rezepte hast, bzw. du uns Fragen, Anmerkungen, Kritik, Rezeptwünsche oder Fanpost schicken möchtest, kontaktiere uns einfach über Instagram oder Mail. Wir freuen uns über Eure Nachrichten.</p>
        <div className="contact-icons">
        <a href="https://www.instagram.com/schluck_reflex/">
            <img className="icon" src={insta}></img>
        </a>

        <a href= "mailto:abc@example.com">
        <img className="icon" src={mail}></img>
        </a>
        </div>
    
        </div>
    )
}

export default Contact