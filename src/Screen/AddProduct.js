import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCotegory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate()
    const handleAddProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }
        const userId = JSON.parse(localStorage.getItem("user"));
        console.warn(userId._id)
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ userId, name, price, category, company }),
            headers: { "Content-Type": "application/json", authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}` }
        });
        result = await result.json();
        console.warn(result)
        navigate("/")
        if (result.name) {
            // localStorage.setItem("user", JSON.stringify(result))
            // navigate("/")
        } else {
            alert("Please Enter Correct Details ")
        }
    }

    return (
        <div className='App'>
            <h1>Add Product</h1>
            <input type='text' className='inputBox' placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)} value={name}
            />

            {error && !name && <span className='Error_txt'>Please Enter Valid Name</span>}
            <input type='text' className='inputBox' placeholder='Enter Your price'
                onChange={(e) => setPrice(e.target.value)} value={price}
            />
            {error && !price && <span className='Error_txt'>Please Enter Valid Price</span>}


            <input type='text' className='inputBox' placeholder='Enter Your Category'
                onChange={(e) => setCotegory(e.target.value)} value={category}
            />
            {error && !category && <span className='Error_txt'>Please Enter Valid Category</span>}
            <input type='text' className='inputBox' placeholder='Enter Your Company'
                onChange={(e) => setCompany(e.target.value)} value={company}
            />
            {error && !company && <span className='Error_txt'>Please Enter Valid company</span>}
            <button type='button' onClick={handleAddProduct} className='AppButton'>Add Product</button>
        </div>
    )
}

export default AddProduct