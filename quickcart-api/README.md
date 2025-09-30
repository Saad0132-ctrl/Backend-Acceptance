# QuickCart API - QA Testing Project

Mock shopping cart API with intentional bugs for QA testing practice.

## Quick Start

```bash
# Install dependencies
npm install
pip install tavern

# Start server
npm start

# Run tests
tavern-ci tests/
```

## Project Structure

```
quickcart-api/
├── server/server.js           # Express API with bugs
├── tests/                     # Tavern test files
│   ├── products_tests.tavern.yaml
│   ├── orders_tests.tavern.yaml
│   └── workflows.tavern.yaml
├── docs/                      # QA documentation
│   ├── Bug_Report.md
│   └── QA_Execution_Guide.md
└── package.json
```

## API Endpoints

**Products:** GET, POST, PUT, DELETE `/products`  
**Orders:** GET, POST, PUT, DELETE `/orders`

## Identified Bugs

1. **POST /products** - Returns 200 instead of 201
2. **DELETE /orders** - Returns 200+JSON instead of 204

## Test Results Summary

| Test ID | Endpoint | Expected | Actual | Bug |
| --- | --- | --- | --- | --- |
| **P-GET-01** | GET /products | **200 OK** | 200 OK → `[{"id":1,"name":"Laptop","price":1200},{"id":2,"name":"Headphones","price":150}]` | ✅ Works |
| **P-GET-02** | GET /products/1 | **200 OK** | 200 OK → `{"id":1,"name":"Laptop","price":1200}` | ✅ Works |
| **P-GET-03** | GET /products/999 | **404 Not Found** | 404 Not Found → `{"error":"Product not found"}` | ✅ Works |
| **P-POST-04** | POST /products | **201 Created** | 200 OK → `{"id":3,"name":"Smartphone","price":800}` | ❌ Wrong status code |
| **P-LIFE-05** | Product Lifecycle (POST → GET → PUT → DELETE) | **201, 200, 200, 204** | POST returned **200** instead of **201** | ❌ Wrong status code |
| **O-NEG-01** | POST /orders (empty items) | **400 Bad Request** with `{ "error": "..." }` | 201 Created → `{"id":2,"items":[],"status":"pending"}` | ❌ Validation missing |
| **O-POS-02** | POST /orders (valid items) | **201 Created** with order details | 201 Created → `{"id":1,"items":[{"productId":1,"quantity":2}],"status":"pending"}` | ✅ Works |

## Test Coverage

- ✅ All CRUD operations tested
- ✅ Error scenarios covered  
- ✅ Workflow integration tests
- ❌ 3 bugs detected (2 status codes + 1 validation)