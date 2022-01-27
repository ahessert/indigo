require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("./scripts/tasks/balance");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;
const mnemonic = process.env.MNEMONIC;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    testnet: {
      url: 'https://testnet.aurora.dev',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161555,
      gasPrice: 10000000
    },
    mainnet: {
      url: 'https://mainnet.aurora.dev',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 1313161554,
    },
    local_aurora: {
      url: 'http://localhost:8545',
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 3,
    },
  },
};
