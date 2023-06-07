# txt-node-gql

# node on docker
docker pull mongodb/mongodb-community-server
docker run --name mongo -p 27017:27017 -d mongodb/mongodb-community-server:latest
connect to mongodb://localhost:27017/

# jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOiJyb2xlIn0.BeiOyCi22ii6re8EUcSoBCwwkGAiiU21tn59Km4ztvg