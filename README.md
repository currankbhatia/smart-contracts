

### Running the front end:
`npm start`
`node_modules/.bin/ganache-cli`


Disclaimer:
Did not actually use SimpleStorage.sol contract, simply took abi and bytecode from: https://docs.ethers.io/v4/api-contract.html

To run DeployNumbers.js
Add
`"type": "module",` to package.json and do: node DeployNumbers.js
But remove to call `npm start` because it will break it. TODO: Fix this

npm install:
ganache-cli