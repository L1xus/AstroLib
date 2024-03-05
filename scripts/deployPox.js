const hre = require("hardhat");

async function main() {
  const pox = await hre.ethers.deployContract("PFToken");

  await pox.waitForDeployment();

  console.log(`Pox Token deployed to ${pox.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
