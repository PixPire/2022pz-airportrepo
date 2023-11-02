import React from "react";
import questions from "../../faqComponents/faq.json";
import Banner from "../../faqComponents/Banner";
import {useState} from 'react';


export default function Faq()
 {
  
  const [isShown, setIsShown] = useState(false);
  const handleClick = event => 
  {
    setIsShown(current => !current);
  }


  return (

    <Banner>
      <h1>Najczęściej Zadawane Pytania (FAQ)</h1>
      {questions.map((question) => 
      (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answer}</Banner.Text>
        </Banner.Entity>
      ))}
      <div class ="divFaq">
      <h3>
        Nie ma pytania na liście?
      </h3>      
      <div id="klik1">
        <button onClick={handleClick} class="buttonPilot">Skontaktuj się z nami!</button>
        {isShown &&
          (
            <form>
              <br></br>
              <select id="mySelect" required>       
                <option disabled selected value="">Wybierz temat</option>   
                <option>Pomoc techniczna</option>
                <option>Reklamacje</option>
                <option>Zmiana biletu</option>
                <option>Inne</option>
              </select>
              <br></br>     
              <textarea
                rows="2"
                cols="16"
                placeholder="wpisz tutaj swoja wiadomosc" required>
              </textarea>
              <br></br>
              <button type="submit" class="buttonPilot">Wyslij</button>
            </form>
          )
        }
      </div>

      <div id="klik2">
        <form method="get" action="https://www.google.com/maps/place/Aeroklub+Bialystok+Krywlany/@53.103625,23.1628299,15z/data=!4m5!3m4!1s0x0:0xf76567eea08c352d!8m2!3d53.103625!4d23.1628299">
            <br></br>
            <button type="submit" class="buttonPilot">Lokalizacja naszego lotniska</button>
        </form>
      </div>
    </div>

    </Banner>
    
    
    
  );
}