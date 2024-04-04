const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const libraryAddress= "0x5a99dEFD8e0F1cD7fa20c318B93617De61F0A413"
  const libraryContract = await ethers.getContractAt("PFLibrary", libraryAddress, deployer)

  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  const tokenUri = "https://peach-manual-antlion-839.mypinata.cloud/ipfs/QmQJ84aFtyUNwsKpmFAPWDPFZDSPLaLnZPP74yH8qCNSUW"
  const authorAddress= "0x22fFf0f96BdEAe4a5308E0Fb20aCec5faEe1011D"
  const mintPrice = ethers.parseUnits("1500", 18)

  /*
  try {
    const addBook = await libraryContract.addBook(authorAddress, tokenUri, mintPrice)
    await addBook.wait()
    console.log("Book added to ", libraryAddress)
  } catch (error) {
    console.error("Failed to add the book!:", error)
  }*/

  try {
    // Approve the PFBook contract to spend POX tokens
    const approveTx = await poxContract.approve(libraryAddress, mintPrice)
    await approveTx.wait()
    console.log("POX Approved for PFLibrary")
    console.log(deployer)

    const mintBook = await libraryContract.mintBook('1', deployer)
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

