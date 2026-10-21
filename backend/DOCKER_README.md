## Grameen Delivery Backend - Docker Stack

This brings up the core infrastructure from the architecture doc: Postgres (TimescaleDB + PostGIS), Redis, Kafka (with Zookeeper), Kafka UI, and an Nginx API gateway. The `api` service is a placeholder; replace it with your NestJS app image when ready.

### Prerequisites
- Docker Desktop (Windows/macOS) or Docker Engine (Linux)

### Services and Ports
- Nginx Gateway: http://localhost:8080
- API (placeholder): http://localhost:3000
- Postgres (TimescaleDB + PostGIS): localhost:5432
- Redis: localhost:6379
- Kafka Broker: kafka:9092 (inside network), localhost:9092 (mapped)
- Kafka UI: http://localhost:8081

### First-time Setup
1. (Optional) Review environment examples at `docker/env.example.txt`.
2. Bring the stack up:

```bash
docker compose up -d
```

3. Verify:
   - `curl http://localhost:8080/health` → `ok`
   - `docker logs gramee_postgres` shows extensions created
   - Kafka UI at http://localhost:8081

### Using Postgres
Default credentials (override by env if needed):
- user: `postgres`
- password: `postgres`
- db: `gramee_delivery`

Connect:
```bash
psql -h localhost -p 5432 -U postgres -d gramee_delivery
```

### Replace API placeholder with your NestJS app
Option A: Build your app image and reference it in `docker-compose.yml`:
```yaml
  api:
    build: ./api   # add your Dockerfile here
    image: gramee-api:latest
    environment:
      - PORT=3000
      - DATABASE_HOST=postgres
      - REDIS_HOST=redis
      - KAFKA_BROKERS=kafka:9092
    depends_on:
      - postgres
      - redis
      - kafka
```

Option B: Use a published image:
```yaml
  api:
    image: your-registry/gramae-api:tag
    environment:
      - PORT=3000
      - DATABASE_HOST=postgres
      - REDIS_HOST=redis
      - KAFKA_BROKERS=kafka:9092
```

Nginx gateway already proxies `http://localhost:8080` → `api:3000`.

### Common Commands
```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs for a service
docker compose logs -f postgres

# Rebuild API (if you add a Dockerfile)
docker compose build api && docker compose up -d api
```

### Notes
- Postgres includes TimescaleDB and PostGIS; initialization runs from `docker/db/init/01_extensions.sql`.
- Kafka advertised listener is internal (`kafka:9092`). For external producers/consumers on host, use `localhost:9092` but adjust `KAFKA_ADVERTISED_LISTENERS` if needed for multi-host setups.
- For production, move secrets to a real `.env` and set strong passwords.


