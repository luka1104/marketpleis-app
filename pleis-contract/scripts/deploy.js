const { ethers } = require("hardhat")

async function main() {
  const RIGHTTICKET = await ethers.getContractFactory("RightTicket")

  const RightTicket = await RIGHTTICKET.deploy()
  await RightTicket.deployed()
  console.log("Contract deployed to address:", RightTicket.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
