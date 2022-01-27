const hre = require("hardhat");

async function main() {
  //await deploy_contracts("MintBook");
  await deploy_contracts("BookToken");
  //await deploy_contracts("AthenaeumDAO");
}
async function deploy_contracts(contractName) {
  const [deployer] = await hre.ethers.getSigners();

  const factoryOutput = await hre.ethers.getContractFactory(contractName);
  const contract = await factoryOutput.deploy();

  await contract.deployed();
  console.log("Contract address:", contractName, " ", contract.address);

  saveFrontendFiles(contractName, contract.address);
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
