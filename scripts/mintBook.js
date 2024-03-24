const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const bookAddress= "0xaA6d7a693574cc8cD5D64965CE50379403fc435d"
  const bookContract = await ethers.getContractAt("PFBook", bookAddress, deployer)

  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  const tokenUri = "https://peach-manual-antlion-839.mypinata.cloud/ipfs/QmRM8yN5B5xdxH4sG7oaFWpHKdL499MqEbH4Bd86s4w4aR"
  const mintPrice = ethers.parseUnits("50", 18)

  try {
    // Approve the PFBook contract to spend POX tokens
    const approveTx = await poxContract.approve(bookAddress, mintPrice)
    await approveTx.wait()
    console.log("POX Approved for PFBook")

    const mintBook = await bookContract.mintBook(deployer, tokenUri, mintPrice)
    await mintBook.wait()
    console.log("Book minted to ", deployer.address)
  } catch (error) {
    console.error("Failed to mint the book!:", error)
  }

 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

