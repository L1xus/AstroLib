const hre = require("hardhat");

async function main() {
  const pox = await hre.ethers.deployContract("PFBook");

  await pox.waitForDeployment();

  console.log(`PFBook contract deployed to ${pox.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
