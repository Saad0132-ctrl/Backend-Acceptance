# QuickCart API Bug Report

**Date:** December 2024  
**Tester:** QA Team  
**Environment:** Local Development (http://localhost:3000)

## Summary
During testing of the QuickCart API, **2 critical bugs** were identified related to incorrect HTTP status codes being returned.

## Bug #1: POST /products Returns Wrong Status Code

**Severity:** Medium  
**Priority:** High  

**Description:**  
When creating a new product via POST /products, the API returns status code 200 instead of the expected 201 Created.

**Steps to Reproduce:**
1. Start the QuickCart API server
2. Send POST request to /products with valid product data
3. Observe the response status code

**Expected Result:** 201 Created  
**Actual Result:** 200 OK  

**Test Evidence:**
```yaml
# Tavern test showing the bug
- name: Create new product - BUG DETECTED
  request:
    url: http://localhost:3000/products
    method: POST
    json:
      name: "Mouse"
      price: 25
  response:
    status_code: 200  # BUG: Should be 201
```

**Impact:** Violates REST API conventions and may cause client applications to misinterpret the response.

---

## Bug #2: DELETE /orders Returns Wrong Status Code

**Severity:** Medium  
**Priority:** High  

**Description:**  
When deleting an order via DELETE /orders/:id, the API returns status code 200 with a JSON message instead of the expected 204 No Content.

**Steps to Reproduce:**
1. Create an order via POST /orders
2. Delete the order via DELETE /orders/:id
3. Observe the response status code and body

**Expected Result:** 204 No Content (empty body)  
**Actual Result:** 200 OK with {"message": "Deleted"}  

**Test Evidence:**
```yaml
# Tavern test showing the bug
- name: Delete existing order - BUG DETECTED
  request:
    url: http://localhost:3000/orders/1
    method: DELETE
  response:
    status_code: 200  # BUG: Should be 204
    json:
      message: "Deleted"
```

**Impact:** Inconsistent with DELETE /products behavior and REST standards.

---

## Additional Observations

### Potential Issue: Empty Orders Allowed
The API allows creation of orders with empty items arrays, which may not be business-logically correct:

```yaml
- name: Create order with empty items array
  request:
    url: http://localhost:3000/orders
    method: POST
    json:
      items: []
  response:
    status_code: 201  # Succeeds - is this intended?
```

**Recommendation:** Consider adding validation to prevent empty orders.

---

## Test Coverage Summary

✅ **Passed Tests:**
- GET /products (all products)
- GET /products/:id (valid/invalid IDs)
- PUT /products/:id (update existing/non-existent)
- DELETE /products/:id (correct 204 status)
- GET /orders (all orders)
- GET /orders/:id (valid/invalid IDs)
- POST /orders (valid creation)
- PUT /orders/:id (status updates)

❌ **Failed Tests:**
- POST /products (wrong status code)
- DELETE /orders/:id (wrong status code)

---

## Recommendations

1. **Fix POST /products:** Change `res.status(200)` to `res.status(201)` in server.js line 28
2. **Fix DELETE /orders:** Change `res.status(200).json({message: "Deleted"})` to `res.status(204).send()` in server.js line 78
3. **Consider business logic validation** for empty orders
4. **Add integration tests** for edge cases and error scenarios