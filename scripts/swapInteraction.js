const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const swapAddress = "0xf8E6AEE797Cc258affCC06852088CA4898E2E566"
  const swapApp = await ethers.getContractAt("PFSwap", swapAddress, deployer)

  try {
    const poolETH = await swapApp.depositETH({
      value: ethers.parseEther("1"),
    })
    await poolETH.wait()
    console.log("ETH P00led! at ", swapApp.target)
  } catch (error) {
    console.error("Failed to deposit ETH:", error)
  }

  // Define the POX token contract address
  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  // Define the amount of POX tokens to deposit
  const amountToDeposit = ethers.parseUnits("4000000", 18)

  try {
    // Approve the PFSwap contract to spend POX tokens on your behalf
    const approveTx = await poxContract.approve(swapAddress, amountToDeposit)
    await approveTx.wait()
    console.log("POX Approved for PFSwap")

    // Deposit POX tokens to the PFSwap contract 
    const poolPOX = await swapApp.depositPOX(amountToDeposit)
    await poolPOX.wait()
    console.log("POX P00led! at ", swapApp.target)
  } catch (error) {
    console.error("Failed to deposit POX:", error)
  }
  /*

  const amountPoxToSwap = ethers.parseUnits("50", 18)

  try {
    const approveTx = await poxContract.approve(swapAddress, amountPoxToSwap)
    await approveTx.wait()
    console.log("POX Approved for PFSwap")

    const swapPox = await swapApp.swapPOXtoETH(amountPoxToSwap)
    await swapPox.wait()
    console.log("POX Swapped To ETH :))")
  } catch (error) {
    console.error("Failed to swap POX!", error)
  }

  amountEthToSwap = ethers.parseEther("0.0025")

  try {
    const swapEth = await swapApp.swapETHtoPOX({ value: amountEthToSwap, })
    await swapEth.wait()
    console.log("ETH Swapped to POX :))")
  } catch (error) {
    console.error("Failed to swap ETH!", error)
  }

  const amountEth = ethers.parseEther("0.097")
  try {
   const withdrawETH = await swapApp.withdrawETH(amountEth)
    await withdrawETH.wait()
    console.log("ETH withdrawed!")
  } catch (error) {
    console.error("Failed to withdraw ETH!", error)
  }
  */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

