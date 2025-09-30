# QuickCart API - QA Execution Guide

## Setup Instructions

### 1. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python testing tools
pip install tavern
```

### 2. Start the API Server
```bash
npm start
# Server will run on http://localhost:3000
```

### 3. Run Tests
```bash
# Run all Tavern tests
tavern-ci tests/

# Run specific test file
tavern-ci tests/products_tests.tavern.yaml
tavern-ci tests/orders_tests.tavern.yaml
tavern-ci tests/workflows.tavern.yaml
```

## Test Execution Results

### Expected Output
When running the tests, you'll see:
- ✅ Most tests pass
- ❌ 2 tests fail due to status code bugs
- Detailed error messages showing expected vs actual responses

### Manual Testing Commands
```bash
# Test GET products
curl http://localhost:5000/products

# Test POST product (observe bug)
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99}'

# Test DELETE order (observe bug)
curl -X DELETE http://localhost:5000/orders/1
```

## Key Findings
1. **POST /products** returns 200 instead of 201
2. **DELETE /orders** returns 200 with JSON instead of 204 empty
3. All other endpoints work correctly
4. Error handling is properly implemented