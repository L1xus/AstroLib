const hre = require("hardhat");

async function main() {
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8" 

  const swapContract = await hre.ethers.deployContract("PFSwap", [poxAddress]);

  await swapContract.waitForDeployment();

  console.log(`The Swap contract is deployed to ${swapContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
