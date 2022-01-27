task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async ({account}) => {
    const balance = await hre.ethers.provider.getBalance(account)

    console.log(hre.ethers.utils.formatEther(balance), "ETH");
  });

module.exports = {};