const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const libraryAddress= "0xca0D7896EA09bc72cA491E4c0DC3f1d7eebEaBA3"
  const libraryContract = await ethers.getContractAt("PFLibrary", libraryAddress, deployer)

  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  const tokenUri = "https://peach-manual-antlion-839.mypinata.cloud/ipfs/QmRM8yN5B5xdxH4sG7oaFWpHKdL499MqEbH4Bd86s4w4aR"
  const authorAddress= "0x22fFf0f96BdEAe4a5308E0Fb20aCec5faEe1011D"
  const mintPrice = ethers.parseUnits("50", 18)

/*
  try {
    const addBook = await libraryContract.addBook(authorAddress, tokenUri)
    await addBook.wait()
    console.log("Book added to ", libraryAddress)
  } catch (error) {
    console.error("Failed to add the book!:", error)
  }
*/
  try {
    // Approve the PFBook contract to spend POX tokens
    const approveTx = await poxContract.approve(libraryAddress, mintPrice)
    await approveTx.wait()
    console.log("POX Approved for PFLibrary")

    const mintBook = await libraryContract.mintBook('1', deployer, mintPrice)
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

