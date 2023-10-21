import { useState, useEffect } from 'react'
import axios from 'axios'


const MotivationComp = () => {

    const [quote, setQuote] = useState('')

    useEffect(()=> {

        const getQuote = async () => {

            let newQuote = await axios.get('https://api.goprogram.ai/inspiration')
            setQuote(newQuote.data)

        }
        getQuote()


    }, [])

console.log(quote.quote)

    return(quote)?(
        <div className="quote-container">
            <div className="quote-wrapper">
            <h2 className="quote-text">{quote.quote}</h2>
            <p className="quote-auth">- {quote.author}</p>
            </div>
        </div>
    ):(
        <div></div>
    )

}

export default MotivationComp