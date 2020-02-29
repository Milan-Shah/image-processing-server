# Udagram Image Filtering Microservice

A Node-Express application in AWS to filter requested image!

Here's an endpoint URL for a running EB:
http://udagram-image-processing-server-dev.us-east-2.elasticbeanstalk.com/filteredimage?image_url=https://i.pinimg.com/originals/1b/6a/de/1b6ade076c494d9d7f82c32206d8488d.jpg

## EB Dashboard

![Elastic Beanstalk Dashboard](https://github.com/Milan-Shah/image-processing-server/blob/develop/deployment_screenshots/Udagram-image-processing-server.png)

## Development

Within the project directly, you can initialize a new project using `npm i` and run the deployment server locally using `npm run dev` using your terminal. 

All the code related to image processing server is in *filter_image* branch and merged back into *develop* and develop into *master*

### Postman Collection

A Postman collection to test different scenarios can be found within the project directory.

### Unit Test

You can find Chai/Mocha test cases under `../src/tests/test.js` have been setup to test the `/filteredimage` endpoint.

## Deployment

A production build is created under folder /www and this is configured
in `.elasticbeanstalk/config.yml` under the `deploy.artifact` property.

```sh
npm run clean
npm run build
eb deploy
```

