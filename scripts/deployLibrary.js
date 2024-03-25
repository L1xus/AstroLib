const hre = require("hardhat");

async function main() {
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8" 

  const lib = await hre.ethers.deployContract("PFLibrary", [poxAddress])

  await lib.waitForDeployment()

  console.log(`PFLibrary contract deployed to ${lib.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
