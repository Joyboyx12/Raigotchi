const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
    parseUnits,
    N,
} = require("ethers");
const { ethers } = require("hardhat");
const JoyGotchiArtifact = require("../artifacts/contracts/JoyGotchiV2.sol/JoyGotchiV2.json");
const JOY_GOTCHI_ADDRESS = "0x330b482bf392a732a6EBe1bF3F622947D10c87FC"; //testnet

async function main() {
    const [deployer] = await ethers.getSigners();

    const joyGotchi = new Contract(
        JOY_GOTCHI_ADDRESS,
        JoyGotchiArtifact.abi,
        deployer
    );

    const owner = await joyGotchi.owner();

    console.log("Owner:", owner);

    await joyGotchi.createSpecies(
        [
            [
                "https://bafkreid32fvsd54vejrhsp26zebufsdqnx7jjgtg7j5odp6vyc3b4joecm.ipfs.nftstorage.link/",
                "1",
                20,
                1,
            ],
            [
                "https://bafkreiapb7ryik6hqe3hj2sd5fjfsexfvuumyxf7jhlzhv64zjmvdp456q.ipfs.nftstorage.link/",
                "2",
                25,
                2,
            ],
            [
                "https://bafkreig77ufvn7jmr4macehsuww7lz5xflwyb2e75esli6sz5ywfxzhsha.ipfs.nftstorage.link/",
                "3",
                30,
                3,
            ],
        ],
        50,
        true,
        0
    );

    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
