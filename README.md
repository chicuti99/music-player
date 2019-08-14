# GoLedger Challenge

In this challenge you will create a web interface to a blockchain application. This application is responsible to manage the pilots of air companies.

## Instructions

- Fork the repository https://github.com/goledgerdev/goledger-challenge-web

  - Fork it, do **NOT** clone it, since you will need to send us your forked repository

- Create an web application using a framework that you wish.

- Provide a page that the user will put their credentials to login.

- If the login succeeds, show a list of pilots filtering by its air company name (field `operadorAereoRef`). The server does not have support to filters, you need to filter in the application.

- You don't need to show all the fields of an aeronaut. The fields `nome`, `cpf`, `canac` are enough.

- Improve your application with a beautiful UI.

## Server

The data are obtained using a rest server in this address: `ec2-18-223-158-118.us-east-2.compute.amazonaws.com:3000`

The access is restrict by a authentication token. To obtain this token you have to do a POST request to `api/login` with username and passowrd. The following credentials are provided for you to use in this challenge:

```
username: user
password: user
```

Here is the `curl` command for the login:

```
curl -k -X POST  http://ec2-18-223-158-118.us-east-2.compute.amazonaws.com:3000/api/login \
-d 'username=user&password=user'
```

To get the pilots list, you need to send a GET request to `/api/mainchannel/airlog-backend/Aeronauta?resolve=true`. The following example demonstrates how to execute this transaction:

```
curl -k -X GET  'http://ec2-18-223-158-118.us-east-2.compute.amazonaws.com:3000/api/mainchannel/airlog-backend/Aeronauta?resolve=true' -H "Authorization: Bearer $TOKEN"
```

Notice that the `$TOKEN` should be modified by the token obtained in login.

To complete the challenge, you must send us the link to your forked repository with the code of your application. Please, provide instructions to execute the code.
