import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Product() {
    const [product, setProduct] = useState([]);
    console.warn(product)
    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}` }
        });
        result = await result.json();
        setProduct(result);
    }

    const deleteapi = async (id) => {
        let result = await fetch(`http://localhost:5000/deleteproduct/${id}`, {
            method: "Delete",

            headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}` }

        });
        result = await result.json()
        if (result) {
            getProduct();
        }

    }
    const searchHandle = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/searchProduct/${key}`, {
                headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem('U_Token'))}` }
            })
            result = await result.json();
            if (result) {
                setProduct(result)
            }
        } else {
            getProduct();
        }

    }
    return (
        <div className='product-List'>
            <h3>Product Component</h3>
            <input type='text' className='search-Product-box' placeholder='Search Product'
                onChange={searchHandle} />
            <ul>
                <li>Serial Number </li>
                <li>Name </li>
                <li>Price </li>
                <li>Category</li>
                <li>Company Name</li>
                <li>Operation</li>
            </ul>


            {
                product.length > 0 ? product.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index}</li>
                        <li>{item.name} </li>
                        <li>{item.price} </li>
                        <li>{item.category} </li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteapi(item._id)}>Delete</button>
                            <Link to={`/Update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ) : <l1>No Record Found</l1>
            }
        </div>
    )
}

export default Product