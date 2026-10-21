-- Enable required extensions for the architecture
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()

-- Ensure default privileges for public schema objects if needed
ALTER SCHEMA public OWNER TO postgres;


