import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "../styles/Books.css"
import { useNavigate } from 'react-router-dom';

const Books = () => {
    //url
    let baseUrl = `https://political-spot-nyala.glitch.me`;

    // navigation
    const navigate = useNavigate();

    // state for books data
    const [books, setBooks] = useState([]);

    // state for loading
    const [loading, setLoading] = useState(false);

    // state for error
    const [error, setError] = useState(null);

    // state for sort a to z
    const [sort, setSort] = useState("")

    //state for filter by category
    const [category, setCategory] = useState("");

    // for pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5);



useEffect(() => {

    const fetchBooks = async () =>{
        try{
            setLoading(true);

            let response = await axios({
                method: "GET",
                url: `${baseUrl}/books?sort=${sort}&category=${category}&page=${page}&limit=${limit}`})

            // destructuring the response and setting pages
            const {books, currentPage, totalPages } = response.data;
            setBooks(books);
            setPage(currentPage);
            setTotalPages(totalPages);

            console.log(response.data.books)
            // console.log(books.length)



        }catch(err){
            setError(err)
            console.log(error)

        }finally{setLoading(false)}
    }

    fetchBooks()

}, [sort, category, page, limit]);


// for pagination
const handlePrev = () => {
    setPage((prev) => prev-1)

}

const handleNext = () => {
    setPage((prev) => prev+1)
}


// for view more
const handleViewBooks = (id) => {
    navigate(`/books/${id}`);
    console.log(id);
}


// for delete
const handleDeleteBooks = async (id)=>{
    try{
        console.log(id);

        let response = await axios.delete(`${baseUrl}/books/${id}`);
        setBooks(books.filter((book) => book.id !== id));

    }catch(err){
        setError(err)
    }


}




// forloading
if(loading) return <p>Loading....</p>

// for error
if(error) return <p>{error}</p>


  return (
    <div>
      <h1>books page</h1>



      {/* for sorting */}
      <div className="book-sort">
        <select name="sort" value={sort} onChange={(e)=> {setSort(e.target.value)}}  >
            <option value="">All</option>
            <option value="name_asc">A to Z</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>

        </select>
      </div>


      {/* filtering by category */}
      <div className="filtering">
      <select name="category" value={category} onChange={(e)=> {setCategory(e.target.value)}}  >
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Productivity">Productivity</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Psychology">Psychology</option>
        </select>

      </div>


        {/* for aadding new book */}

        <button onClick={() => navigate("/add-book")}  >Add book</button>




    <div className='books-card'>
    {/* book card */}
      {books.map((book) => {
          return <div className="book-box" key= {book.id}> 
        <h1>{book.name}</h1>
        <img src={book.coverImage}  />
        <h2>{book.author}</h2>
        <h3>{book.category}</h3>
        <h3>Price: {book.price}</h3>

        {/* buttons */}
        {/* view books */}
        <button onClick={()=> handleViewBooks(book.id)}>View Details</button>

        {/* add books */}
        {/* <button onClick={}>Add Books</button> */}

        {/* edit books */}
        <button onClick={() => navigate(`/edit-book/${book.id}`)}>Edit Book</button>

        {/* delete books */}
        <button onClick={()=> handleDeleteBooks(book.id)}>Delete BoOk</button>

      </div>})}
    </div>

    {/* for pagination */}
    <div className="pagination">
        <button onClick={handlePrev} disabled={page== 1} >Prev</button>
        <p>{page} of {totalPages} </p>
        <button onClick={handleNext} disabled={page== totalPages}>Next</button>
    </div>

        {/* <select name="limit" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} >
            <option value={totalPages} >All Books</option>
            <option value={3}>3 Books per page</option>
            <option value={5}>5 Books per page</option>
        </select> */}

    </div>
  )
}

export default Books
