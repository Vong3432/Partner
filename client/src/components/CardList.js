import React, {useState, useEffect} from 'react'
import Card from './Card'

const CardList = ({cards}) => {           
    return (       
        <> 
        {cards.map(card => <Card key={card.jobID} jobID={card.jobID} company={card.company} title={card.title} logo={card.logo} description={card.description} />)}        
        </>
    )
}

export default CardList
