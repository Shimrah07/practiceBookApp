import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {

    const initData = {
        name: "",
        price: "",
        author: "",
        category: "",
        description: "",
        coverImage: ""
    };
    
        
    let baseUrl = `https://political-spot-nyala.glitch.me`;
        
    
    // states to maintain
    const [formData, setFormData] = useState(initData);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();


    // on mount

    useEffect(()=> {


        const fetchBook = async ()=> {

            try{
            let response =  await axios.get(`${baseUrl}/books/${id}`)
            setFormData(response.data);
            setLoading(false);
			console.log(response.data);


            }catch(err){
                setError(err)
            }finally{(setLoading(false))}
        }

        fetchBook()

    }, [id])




    // handlke change
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})

    }
    

    // handle submkit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`${baseUrl}/books/${id}`, formData);
            navigate('/books');  // Redirect after successful update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }




    
// forloading
if(loading) return <p>Loading....</p>

// for error
if(error) return <p>{error}</p>


  return (
    <div>
        <h1>edit book</h1>
        <form onSubmit={handleSubmit} >
            <input  
            type= "text" 
            placeholder='enter book name' 
            value={formData.name}
            name="name"
            onChange={handleChange}/>

            <input  
            type= "text" 
            placeholder='enter price' 
            value={formData.price}  
            name="price"
            onChange={handleChange} />

            <input  
            type= "text" 
            placeholder='enter author' 
            value={formData.author} 
            name="author" 
            onChange={handleChange}/>

            <input  
            type= "text" 
            placeholder='enter category' 
            value={formData.category} 
            name="category"
            onChange={handleChange}
            />

            <input  
            type= "text" 
            placeholder='enter book poster url' 
            value={formData.coverImage}  
            name="coverImage"
            onChange={handleChange} />


            <textarea 
            type="text" 
            placeholder='enter description' 
            value={formData.description} 
            name="description"
            onChange={handleChange} />


            <input type="submit" value="Edit Book"
            />
        </form>
      
    </div>
  )
}

export default EditBook
