require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY
const INFURA_ID = process.env.INFURA_ID
const ETHERSCAN_ID = process.env.ETHERSCAN_ID

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_ID}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 4,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_ID}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 3,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 42,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      saveDeployments: true,
      chainId: 31337,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_ID
  }
};
