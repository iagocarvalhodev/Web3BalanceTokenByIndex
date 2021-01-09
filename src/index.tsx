const Web3 = require("web3");

const abi = require("./abi.json");

const urlRpc = "https://rinkeby.infura.io/v3/8dcc04acb3984f8bb5b3dff3cc2df132";

const web3 = new Web3(urlRpc);

const contractKIE = "0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3";

const rinkby = "0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3";

const myWallet = "0xbAb1d28d65A41f8dd469a8dEdf449a2F73da5D13";

const contract = new web3.eth.Contract(abi, contractKIE);

async function getBalanceOfContract(andress) {
  let index = 0;
  await contract.methods.balanceOf(andress).call((err, result) => {
    index = result;
    console.log("Qtd NFT:", index);
  });

  const promises = [];

  for (let i = 0; i < index; i++) {
    const promise = contract.methods
      .tokenOfOwnerByIndex(myWallet, i)
      .call((err, result) => {
        console.log("NFTid", result);
      });
    promises.push(promise);
  }
  await Promise.all(promises);
}

getBalanceOfContract(myWallet);
