<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1072/1072372.png" width="200" alt="Nest Logo" />
</p>

<p align="center">Nasa Space App Challenge</p>
<p align="center">


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Postman API
https://restless-meadow-610762.postman.co/workspace/Team-Workspace~6ffa7858-666c-4ba9-83f3-7e6d21a9dbc2/collection/5129081-01f9fe96-23bb-4fec-8c79-96eb3f8d8a8a?action=share&creator=5129081

## Endpoints 

```
GET {domain:port}/v1/test - API testing request
POST {domain:port}/v1/videos/all - Get all video data
POST {domain:port}/v1/videos/upload - Upload Video
  key -> file [formdata through body]
  value -> .mp4

PUT {domain:port}/v1/videos/status
  {
        "id": <postId>,
        "status": <status>
  }

POST {domain:port}/v1/videos/valid - Get verified valid videos

POST {dmain:port}/v1/videos/{video_name}

```


## Installation

```bash
$ pnpm install
```
## Todo
* Prisma model
* Endpoint for images
* Verification

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

@rjm @devadath @navaneeth @jerin

## License

Nest is [MIT licensed](LICENSE).
