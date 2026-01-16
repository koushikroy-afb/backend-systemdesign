# Notification System

## Description
Users subscribe to be notified when out-of-stock items are restocked.

## APIs
- POST /subscribe
- POST /restock

## Workflow
1. User subscribes via HTTP API
2. Subscription saved
3. Inventory restocked
4. Notifications generated
5. Written to JSON
6. Subscription marked NOTIFIED

## Edge Cases
- No duplicate notifications
- Channel preference supported
- Multiple restocks need re-subscription
