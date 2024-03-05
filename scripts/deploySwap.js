const hre = require("hardhat");

async function main() {
  const poxAddress = "0xF425cABc522b0ED80FB9AeF32EA5F8090b1BF026" 

  const swapContract = await hre.ethers.deployContract("PFSwap", [poxAddress]);

  await swapContract.waitForDeployment();

  console.log(`The Swap contract is deployed to ${swapContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
