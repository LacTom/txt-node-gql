# txt-node-gql

# node on docker
docker pull mongodb/mongodb-community-server
docker run --name mongo -p 27017:27017 -d mongodb/mongodb-community-server:latest
connect to mongodb://localhost:27017/