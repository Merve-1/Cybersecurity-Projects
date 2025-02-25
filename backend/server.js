const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt"); // For password hashing

const app = express();
app.use(express.json());
app.use(cors());

const usersFile = path.join(__dirname, "users.json");


// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]", "utf8");
}
// ✅ Register (Sign Up) Endpoint
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    fs.readFile(usersFile, "utf8", async (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading users file" });

        let users = JSON.parse(data);
        if (!Array.isArray(users)) users = [];

        // Check if username already exists
        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8", (err) => {
            if (err) return res.status(500).json({ message: "Error saving user" });
            res.json({ message: "User registered successfully!" });
        });
    });
});

// ✅ Login Endpoint
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFile, "utf8", async (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading users file" });

        let users = JSON.parse(data);
        if (!Array.isArray(users)) users = [];

        const user = users.find(user => user.username === username);
        if (!user) return res.status(400).json({ message: "Invalid username or password" });

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid username or password" });

        res.json({ message: "Login successful!" });
    });
});

const productsFile = path.join(__dirname, "products.json");

// Ensure products.json exists before starting
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, "[]", "utf8");
}

// Endpoint to add a product with duplicate ID check
app.post("/products", (req, res) => {
    const newProduct = req.body;

    if (!newProduct.id || !newProduct.name || !newProduct.price) {
        return res.status(400).json({ message: "Missing required fields: id, name, or price" });
    }

    fs.readFile(productsFile, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            return res.status(500).json({ message: "Error reading products file" });
        }

        let products = [];
        try {
            products = data ? JSON.parse(data) : [];
        } catch (parseError) {
            console.error("Error parsing products file:", parseError);
            return res.status(500).json({ message: "Error parsing products file" });
        }

        // Check if a product with the same ID already exists
        const productExists = products.some(product => product.id === newProduct.id);
        if (productExists) {
            return res.status(400).json({ message: "Product with this ID already exists!" });
        }

        products.push(newProduct);

        fs.writeFile(productsFile, JSON.stringify(products, null, 2), "utf8", (err) => {
            if (err) {
                console.error("Error saving product:", err);
                return res.status(500).json({ message: "Error saving product" });
            }
            console.log("✅ Product added:", newProduct);
            res.json({ message: "Product added successfully!" });
        });
    });
});

// Endpoint to get all products
app.get("/products", (req, res) => {
    fs.readFile(productsFile, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            return res.status(500).json({ message: "Error reading products file" });
        }

        let products = [];
        try {
            products = data ? JSON.parse(data) : [];
        } catch (parseError) {
            console.error("Error parsing products file:", parseError);
            return res.status(500).json({ message: "Error parsing products file" });
        }

        res.json(products);
    });
});

app.listen(8080, () => console.log("🚀 Server running on port 8080"));
