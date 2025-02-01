import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const obj = {
        name: "", 
        price: "",
        category: "",
        author: "",
        publishingYear: "",
        coverImage: "",
        description: ""
    };

    // Navigation
    const navigate = useNavigate();

    const [formData, setFormData] = useState(obj);

    // Function to handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are populated
        if (!formData.name || !formData.price || !formData.category || !formData.author ||
            !formData.publishingYear || !formData.coverImage || !formData.description) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post(
                "https://frill-shard-licorice.glitch.me/books", 
                formData
            );

            console.log(response);
            navigate("/books");
        } catch (err) {
            alert("Failed to add book");
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Add Book</h1>

            <form onSubmit={handleSubmit}>
                <input  
                    type="text" 
                    placeholder="Enter book name" 
                    value={formData.name}
                    name="name"
                    onChange={handleChange} 
                />
                
                <input  
                    type="text" 
                    placeholder="Enter price" 
                    value={formData.price}  
                    name="price"
                    onChange={handleChange} 
                />

                <input  
                    type="text" 
                    placeholder="Enter category" 
                    value={formData.category} 
                    name="category" 
                    onChange={handleChange} 
                />

                <input  
                    type="text" 
                    placeholder="Enter author" 
                    value={formData.author} 
                    name="author" 
                    onChange={handleChange} 
                />

                <input  
                    type="number" 
                    placeholder="Enter publishing year" 
                    value={formData.publishingYear} 
                    name="publishingYear" 
                    onChange={handleChange} 
                />

                <input  
                    type="text" 
                    placeholder="Enter cover image URL" 
                    value={formData.coverImage} 
                    name="coverImage" 
                    onChange={handleChange} 
                />

                <textarea
                    placeholder="Enter description" 
                    value={formData.description} 
                    name="description" 
                    onChange={handleChange} 
                />

                <input type="submit" value="Add Book" />
            </form>
        </div>
    );
};

export default AddBook;
