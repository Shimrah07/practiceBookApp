import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const BookDetail = () => {

// for retrieving id
const {id} = useParams();

// /error handles
const [error, setError] = useState(null);

// loading
const [loading, setLoading] = useState(false);

//book set
const [books, setBooks] = useState([]);

const navigate = useNavigate();



// url
let baseUrl = `https://political-spot-nyala.glitch.me`;

useEffect(() => {

    const fetchBook =  async () => {
        
    setLoading((true))
        try{

            let response = await axios.get(`${baseUrl}/books/${id}`)
            setBooks(response.data)
            console.log(books)


        }catch(err){
            setError(err)

        }finally{
            setLoading(false)
        }



    }

    fetchBook()
}, [])


// forloading
if(loading) return <p>Loading....</p>

// for error
if(error) return <p>{error}</p>




  return (
    <div>
      <h1>book detail page</h1>



      <div key= {books.id}>
        <h1>{books.name}</h1>
        <img src = {books.coverImage} alt = {books.title} />
        <p>{books.author}</p>
        <p>{books.category}</p>
        <p>{books.price}</p>
        <button onClick={()=> navigate("/books")}>Go Back</button>
       </div>

    </div>
  )
}

export default BookDetail
