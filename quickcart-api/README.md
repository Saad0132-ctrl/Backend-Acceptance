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

## Test Coverage

- ✅ All CRUD operations tested
- ✅ Error scenarios covered  
- ✅ Workflow integration tests
- ❌ 2 status code bugs detected