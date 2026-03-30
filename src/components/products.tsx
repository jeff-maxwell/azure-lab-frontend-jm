import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

const Products = () => {
    const url = "https://wa-ocu-azure-demo-hcdnahbmbfhudtdh.centralus-01.azurewebsites.net/products";
    const [products, setProducts] = useState<Product[]>();
    const titleRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const res = await axios.get<Product[]>(url);
        setProducts(res.data);
    }

    const onDelete = async (id: number) => {
        const res = await axios.delete(url + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'X-JeffMaxwell': 'Hello'
            }
        });
        console.log(res);
        getProducts();
    }

    const onAdd = async () => {
        var productData = {
            title: titleRef.current?.value,
            price: priceRef.current?.value,
            quantity: quantityRef.current?.value
        };

        const res = await axios.post(url, productData, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        console.log(res);
        getProducts();
    }

    return (
        <div>
            <h2>Products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                    <tr key={product.id}>
                        <td></td>
                        <td><button className="btn btn-danger" onClick={ () => onDelete(product.id) }>Delete</button></td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="card" style={{width: 400}}>
                <div className="card-body">
                    <h5 className="card-title">Add Product</h5>
                    <p className="card-text">
                    <form>
                        <label className="form-label">Title:</label>
                        <input className="form-control" ref={titleRef} type="text" id="inputTitle" />
                        <label className="form-label">Price:</label>
                        <input  className="form-control" ref={priceRef} type="number" id="inputPrice" />
                        <label className="form-label">Quantity:</label>
                        <input className="form-control" ref={quantityRef} type="number" id="inputQuanity" />
                        <button className="btn btn-primary" type="submit" onClick={() => onAdd()}>Add</button>
                    </form>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Products;


