/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Possible network values
const TEST_NETWORK = "TEST_NETWORK";
const LOCAL_NETWORK = "LOCAL_NETWORK";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const NETWORK = process.env?.NETWORK || LOCAL_NETWORK;

let networks = {};
if (NETWORK == LOCAL_NETWORK) {
  // ALCHEMY_API_KEY is the complete alchemy http url
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
  networks = {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: ALCHEMY_API_KEY,
      accounts: [WALLET_PRIVATE_KEY],
    },
  };
} else if (NETWORK == TEST_NETWORK) {
  networks = {
    rinkeby: {
      url: ALCHEMY_API_KEY,
      accounts: [WALLET_PRIVATE_KEY],
    },
  };
}

module.exports = {
  solidity: "0.8.0",
  networks: networks,
};
