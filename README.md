# Building a simple "Hello World" Node.js app and using AWS Fargate

This is a very simple "Hello World" Node.js app that uses the Express framework, Docker and AWS Fargate.

### What You Will learn?
- How to create a simple Node.js application with Express
- Run the Node.js app locally
- Build the Docker image and run the container locally
- Push the docker image to Amazon ECR (EC2 Container Registry)
- Use Amazon Fargate to run the container on AWS

 
## Building the project's folder structure and installing the project's dependencies

Create a directory for the project. In the terminal, we're going to create a folder and navigate to it.
```
mkdir node-helloworld
cd node-helloworld
```

Now we're going to initiate a new npm project by typing the following command, and leaving blank the inputs by pressing enter:
```
npm init
```

Now we can install Express for our project with the Node Package Manager (npm). We'll need to install the following dependencies by using the following commands:
```
npm install express
```

If we take a look at the directory, we can see a new file named `package.json`. This file will be responsible for the management of our project's dependencies.


## Running the application locally
In the directory `node-helloworld/` type the following code to run our application:
```
node index.js
```
You should see a message like the following in your terminal window:

`Running on http://localhost:80`

If you open a browser and go to localhost:80 you will see the following: 

`Hello world, Node.js app running on Docker`


## Building your Docker image
Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command:

```
docker build -t node-helloworld .
```
Your image will now be listed by Docker:
```
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node-helloworld    latest     d64d3505b0d2    1 minute ago
```
## Run the Docker image locally
The -p flag redirects a public port to a private port inside the container. In this case 80 is the port you use on the browser and it will map to port 2000 which the app is running in the container. Running your image with -d runs the container in detached mode, leaving the container running in the background.

```
docker run -p 80:80 -d node-helloworld
```

If you open a browser and go to localhost you will see the following in your browser: 

`Hello world, Node.js app running on Docker`


## Deploy the application on AWS ECS Fargate
We are using GitHub Actions to build the docker container and deploy it in to the AWS ECS Fargate.
Before you run the GitHub action you need to visit the AWS Management Console and get the Key and secret of your user id which we have to confiugre as secrets in the repository.

In GitHub actions we have configured to perfomr the below actions:
1.Build the Docker image
2.tag your image so you can push the image to this repository
3.push this image to AWS ECR
4.Update the task-definition with the container information
5.Deploy the updated task-definition to ECS service
## Run the Docker image using AWS Fargate
When all the AWS resources are created goto EC2 Load Balancers and fine the load balancer that was just created and select the DNS name and enter that into a browser window. It should show the following:

`
Hello world, Node.js app running on Docker
`

## Updating the app
If you make changes to the app locally, then you will have to just commit the changes which automatically deploy the changes to the ECS