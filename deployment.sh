# Building service docker image
#First cd to the folder of service exp : booking
docker build -t booking -f . ../.. 

# Running all docker images
docker compose up

# Building whole backend in one image