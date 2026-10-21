## Gramee Delivery API (NestJS)

Run locally with Docker compose stack in project root. This service connects to Postgres, Redis, and Kafka using environment variables provided by the compose file.

### Scripts
- build: `npm run build`
- start: `npm start`

### Env variables
Reads from process env:
- DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
- REDIS_HOST, REDIS_PORT
- KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_GROUP_ID
- AUTH_SERVER_JWKS_URL (optional)
- PORT

### Endpoints
- GET `/orders`
- GET `/deliveries`


