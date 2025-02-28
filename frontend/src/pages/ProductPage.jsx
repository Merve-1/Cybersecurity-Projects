import "../styles/ProductPage.css"; // Import CSS
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [product, setProduct] = useState({ id: "", name: "", price: "" });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            alert("Please log in first!");
            navigate("/"); // Redirect back to login if not logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        setError("");

        if (!product.id || !product.name || !product.price) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Product added successfully!");
                setProducts([...products, product]); // Update UI
                setProduct({ id: "", name: "", price: "" }); // Clear input
            } else {
                setError(data.message); // Show error (e.g., duplicate ID)
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product. Make sure the backend is running.");
        }
    };

    const viewProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="product-container">
            <h2>🛒 Product Management</h2>

            <input type="text" name="id" placeholder="Product ID" value={product.id} onChange={handleChange} />
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />

            <button onClick={addProduct}>Add Product</button>
            <button onClick={viewProducts}>View Products</button>

            {error && <p className="error">{error}</p>}

            <ul className="product-list">
                {products.map((prod) => (
                    <li key={prod.id}><strong>ID:</strong> {prod.id} | {prod.name} - ${prod.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
