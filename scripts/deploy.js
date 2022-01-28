const { ethers } = require("hardhat");

async function main() {
  const mintBookAddress = await deploy_contracts("MintBook");
  const bookTokenAddress = await deploy_contracts("BookToken");
  const athenaeumDAOAddress = await deploy_contracts("AthenaeumDAO");

  const mintBookContract = await (
    await ethers.getContractFactory("MintBook")
  ).attach(mintBookAddress);

  const bookTokenContract = await (
    await ethers.getContractFactory("BookToken")
  ).attach(bookTokenAddress);

  const athenaeumDAOContract = await (
    await ethers.getContractFactory("AthenaeumDAO")
  ).attach(athenaeumDAOAddress);

  await mintBookContract.setBookTokenContract(bookTokenContract.address);
  await mintBookContract.setDaoContract(athenaeumDAOContract.address);
  await bookTokenContract.setDaoContract(athenaeumDAOContract.address);
  await bookTokenContract.setMintBookContract(mintBookContract.address);
  await athenaeumDAOContract.setBookMintContract(mintBookContract.address);
}
async function deploy_contracts(contractName) {
  const factoryOutput = await ethers.getContractFactory(contractName);
  const contract = await factoryOutput.deploy();

  await contract.deployed();
  console.log("Contract address:", contractName, " ", contract.address);

  saveFrontendFiles(contractName, contract.address);
  return contract.address;
}

function saveFrontendFiles(contractName, contractAddress) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/abis";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/" + contractName + "_address.json",
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );

  const artifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    contractsDir + "/" + contractName + "_abi.json",
    JSON.stringify(artifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
