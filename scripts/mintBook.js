const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  const libraryAddress= "0x719De6c0f3F0B9B7895f381b0115B614a30857a7"
  const libraryContract = await ethers.getContractAt("PFLibrary", libraryAddress, deployer)

  const poxAddress = "0x7bEea9EAb0610008605ce9ad3C10BD2608646AB8"
  const poxContract = new ethers.Contract(poxAddress, ["function approve(address spender, uint256 amount) external returns (bool)"], deployer)

  const tokenUri = "https://peach-manual-antlion-839.mypinata.cloud/ipfs/QmcLTrvedJutCScnRMVWeorjwobWmZoHqdezZ25hHxmhms"
  const authorAddress= "0x22fFf0f96BdEAe4a5308E0Fb20aCec5faEe1011D"
  const mintPrice = ethers.parseUnits("700", 18)

  /*
  try {
    const addBook = await libraryContract.addBook(authorAddress, tokenUri, mintPrice)
    await addBook.wait()
    console.log("Book added to ", libraryAddress)
  } catch (error) {
    console.error("Failed to add the book!:", error)
  }

  try {
    // Approve the PFBook contract to spend POX tokens
    const approveTx = await poxContract.approve(libraryAddress, mintPrice)
    await approveTx.wait()
    console.log("POX Approved for PFLibrary")

    const mintBook = await libraryContract.mintBook('2', deployer)
    await mintBook.wait()
    console.log("Book minted to ", deployer.address)
  } catch (error) {
    console.error("Failed to mint the book!:", error)
  }
  */
  try {
    const getBook = await libraryContract.getBook('2')
    console.log('Book: ', getBook)

    const getMintedBooks = await libraryContract.getOwnedBooks('0xc7F9Ce0D017fB37738a78fF1Ac5993b2D10498Ab')
    console.log('MintedBooks: ', getMintedBooks)

    const book = await libraryContract.tokenURI('1')
    console.log('BookByID: ', book)
  } catch (error) {
    console.error("Failed to fetch books!:", error)
  }

 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

