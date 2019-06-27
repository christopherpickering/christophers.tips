
## Build an Image

```sh
# to build an image of the current directories docker file
docker build -t <name> .
```

## List Images

```sh
docker images
```

## Run Image

```sh
docker run <name>
```

## Inspect Image

```sh 
docker inspect <repo:tag or id>

## Clean Up

### Remove everything

```sh
docker prune
```

### Remove Images by Name

```sh
# get image id
docker images
# delete image
docker rmi -f <image id>
```

# Docker Composer

## Run a Docker Image

```sh
# add -d flag for daemon mode
docker-compose up
```

## What is Running

```sh
docker-compose ps
```

## Stop Running

```sh
docker-compose stop
```
