const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("counter", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployCounterFixture() {
    const [admin, testUser, ...addrs] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter", admin);
    const counter = await Counter.deploy();
    await counter.deployed();

    return { admin, testUser, addrs, counter };
  }

  describe("Deployment", function () {
    it("initial count should equals 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.count()).to.equal(0);
    });
  });

  describe("Functions", function () {
    it("inc increase current state count by 1", async function () {
      const { admin, counter } = await loadFixture(deployCounterFixture);

      // catch event
      await expect(counter.inc()).to.emit(counter, "CountUpdated").withArgs("1", admin.address);

      expect(await counter.count()).to.equal(1);
    });

    it("dec decrease current state count by 1", async function () {
      const { admin, counter } = await loadFixture(deployCounterFixture);

      await counter.inc();
      // await counter.dec();
      await expect(counter.dec()).to.emit(counter, "CountUpdated").withArgs("0", admin.address);
      expect(await counter.count()).to.equal(0);
    });

    it("cannot call dec when count is 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.count()).to.equal(0);
      await expect(counter.dec()).to.be.revertedWith("Count is alrealdy 0");
    })
  });
});
