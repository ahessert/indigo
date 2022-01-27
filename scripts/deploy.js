const hre = require('hardhat');

async function main() {
  const signer = await hre.ethers.getSigner();
  console.log();
  console.log('Deploying contracts with the account: ',await signer.getAddress());
  console.log('account balance: ', hre.ethers.utils.formatEther(await signer.getBalance()));

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await hre.ethers.getContractFactory('Models');
  const gasToUse = await ethers.provider.estimateGas(contract.getDeployTransaction())
  console.log(hre.ethers.utils.formatEther(gasToUse))


  const indigo = await contract.deploy();
  await indigo.deployed();

  console.log('Contract deployed to address:', indigo.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
