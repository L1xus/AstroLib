const hre = require("hardhat");

async function main() {
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8" 
  const authorAddress = "0x22fFf0f96BdEAe4a5308E0Fb20aCec5faEe1011D"

  const pox = await hre.ethers.deployContract("PFBook", [poxAddress, authorAddress])

  await pox.waitForDeployment()

  console.log(`PFBook contract deployed to ${pox.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
