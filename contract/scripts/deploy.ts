import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const Vote = await ethers.deployContract("Vote", [["刘能", "赵四", "王五", "张三"]])
  await Vote.waitForDeployment()
  console.log(`Vote address: ${Vote.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
