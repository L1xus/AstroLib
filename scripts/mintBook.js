const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const bookAddress= "0x54eaab01D6F4cBc9968FaBe1Bcc3d970a2714380"
  const bookContract = await ethers.getContractAt("PFBook", bookAddress, deployer)

  const tokenUri = "https://peach-manual-antlion-839.mypinata.cloud/ipfs/QmRM8yN5B5xdxH4sG7oaFWpHKdL499MqEbH4Bd86s4w4aR"

  try {
    const mintBook = await bookContract.mintNFT(deployer, tokenUri)
    await mintBook.wait()
    console.log("Book minted to ", deployer)
  } catch (error) {
    console.error("Failed to mint the book!:", error)
  }

 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

