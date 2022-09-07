const hre = require("hardhat");
// const { ethers } = require("hardhat");

async function main() {

  const ethers = hre.ethers;

  // ****** get params *******************
  const network = process.env.HARDHAT_NETWORK;
  console.log(`params network: ${network}\n`)

  // ****** get provider *****************

  const provider = ethers.provider;

  const networkInfo = await provider.getNetwork();
  console.log(`networkInfo: ${JSON.stringify(networkInfo)}`);

  const curBlockHeight = await provider.getBlockNumber();
  console.log(`current block height: ${curBlockHeight}`);

  const myAddr = "0x945e9704D2735b420363071bB935ACf2B9C4b814"
  const myAddrBalance = await provider.getBalance(myAddr)
  console.log(`native token balance: ${myAddr} - ${ethers.utils.formatEther(myAddrBalance)} ETH\n`);

  // ******* get signer *******************
  const signer = await ethers.getSigner();
  console.log(`connected wallet: ${signer.address}`);
  const signers = await ethers.getSigners();
  console.log(`connected wallets:`);
  for (let signer of signers) {
    console.log(signer.address);
  }
  console.log('');

  // ******** get contract ****************
  const Counter = await ethers.getContractFactory("Counter", signer);
  const counter = await Counter.deploy();
  await counter.deployed();
  console.log(`Counter deployed at address ${counter.address} in tx ${counter.deployTransaction.hash} with gasLimit ${counter.deployTransaction.gasLimit.toString()}`);

  // const counter = await ethers.getContractAt("Counter", counter.address, signer);

  tx = await counter.inc();
  confirm = await tx.wait();
  console.log(`tx was successful in ${confirm.transactionHash} with gasUsed ${confirm.gasUsed.toString()}`);
  console.log(`count: ${await counter.count()}\n`);

  // ********* contract storage layout ***********
  for (let slot = 0; slot < 10; slot++) {
    value = await provider.getStorageAt(counter.address, slot);
    console.log(value);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
