#Web Wallet API

This web Wallet API creates a web wallet for the user who signs up and airdrops 2000 ERC-20 tokens to that users newly created wallet address.User can transfer this ERC-20 token using this api. API uses ethers.js package to create a new wallet by using Randomly generated private key.When users transfers tokens they will be notified through email about that particular transaction.    

Documentation for the API : https://documenter.getpostman.com/view/19121870/UVz1PsRm

ERC20 contract used for transaction : 0x4b3489207200dEF687F504a836233055B3bcC9A6

How to Use :

1). Clone this Repo with command : git clone https://github.com/Maverick9081/Web-Wallet.git

2). Install required dependencies using  : npm install --save

3). Setup your .env file as described in env.example file
