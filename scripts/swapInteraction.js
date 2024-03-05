const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const swapAddress = "0x1CA39c277115a763eE7db2e64C1DCdd109cE14Ae"
  const swapApp = await ethers.getContractAt("PFSwap", swapAddress, deployer)

  try {
    const poolETH = await swapApp.depositETH({
      value: ethers.parseEther("0.05"),
    })
    await poolETH.wait()
    console.log("ETH P00led! at ", swapApp.target)
  } catch (error) {
    console.error("Failed to deposit ETH:", error)
  }

  // Define the POX token contract address
  const poxAddress = "0xF425cABc522b0ED80FB9AeF32EA5F8090b1BF026"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  // Define the amount of POX tokens to deposit
  const amountToDeposit = ethers.parseUnits("1000", 18)

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
  /*
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

