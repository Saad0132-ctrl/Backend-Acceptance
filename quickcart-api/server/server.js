const express = require("express");
const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Headphones", price: 150 },
];

let orders = [
  { id: 1, items: [1, 2], status: "pending" },
];

// ===== Products Endpoints =====
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Name and Price required" });

  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);

  // BUG: Should return 201
  res.status(200).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.status(204).send();
});

// ===== Orders Endpoints =====
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

app.post("/orders", (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Items array required" });
  }

  const newOrder = { id: orders.length + 1, items, status: "pending" };
  orders.push(newOrder);

  res.status(201).json(newOrder);
});

app.put("/orders/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = req.body.status || order.status;
  res.json(order);
});

app.delete("/orders/:id", (req, res) => {
  orders = orders.filter(o => o.id != req.params.id);

  // BUG: Should return 204, but returning 200
  res.status(200).json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log("QuickCart API running on http://localhost:3000");
});