import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCotegory] = useState([]);
    const [company, setCompany] = useState("");
    const [error, setError] = useState("");

    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getProduct()
    })
    const getProduct = async () => {
        let result = await fetch(`http://localhost:5000/product_list_one/${params.id}`, {
            headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}` }
        })
        result = await result.json();
        console.warn(result)
        setName(result.name)
        setPrice(result.price)
        setCotegory(result.category)
        setCompany(result.company)
    }

    const handleAddProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }
        const userId = JSON.parse(localStorage.getItem("user"));
        console.warn(userId._id)
        let result = await fetch(` http://localhost:5000/updateProduct/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}`
            },

        });
        result = await result.json();
        console.warn(result)
        navigate("/")

    }

    return (
        <div className='App'>
            <h1>Update Product</h1>
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
            <button type='button' onClick={handleAddProduct} className='AppButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct

