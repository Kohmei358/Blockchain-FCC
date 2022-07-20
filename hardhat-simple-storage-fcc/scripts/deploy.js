//imports -> main -> call main
const { ethers, run, network } = require("hardhat");

async function main() {
  console.log("Deploying Contract...");
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed Contract to: ${simpleStorage.address}`);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    //If on Rinkbey and key exists
    console.log("Waiting for block confirmation...");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
    console.log("Done");
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value: ${currentValue}`);

  const res = await simpleStorage.store(707);
  await res.wait(1);
  const newValue = await simpleStorage.retrieve();
  console.log(`New Value: ${newValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    console.log(e.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
