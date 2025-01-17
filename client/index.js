const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  // 3. get name you want to check
  const name = "Norman Block";

  // 4. get the index of it if it exists
  const index = niceList.findIndex((n) => n === name);

  // 5. create the proof
  const merkleTree = new MerkleTree(niceList)
  const proof = merkleTree.getProof(index);


  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    // 6. send proof and name to be verified
    proof,
    name
  });

  console.log({ gift });
}

main();
