import React, { useState } from 'react';
import c from "../Dashboard-main/card-db/cards-d.json";
import './Cards.css'
function Cards() {
    let [cards, setCards] = useState(c);
    
    return (
        <div className="main-card">
            <div >
            {cards.map((i) => (
                <div key={i.name} className='card'> 
                    <h3>{i.name}</h3>
                    <p>{i.description}</p>
                    <p>{i.fees}</p> 
                    <img src={i.image} alt={i.name} />
                </div>
            ))}
           </div>
        </div>
       
    );
}

export default Cards;
