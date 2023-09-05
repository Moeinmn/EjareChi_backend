dokcer pull postgres


docker volume create newVol

# Postgres run
docker run --name pg -e POSTGRES_PASSWORD=lol -v /pgdata:/var/lib/postgresql/data --restart unless-stopped -p 5432:5432 -d postgres

docker exec -u postgres -it pg psql

# Redis
 docker run -d --name my-redis-container --restart unless-stopped -p 6379:6379 redis