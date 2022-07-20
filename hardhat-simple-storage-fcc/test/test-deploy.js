const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a fav num of 0", async function () {
    // assert(); vs expect();
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should update when store is called", async function () {
    // assert(); vs expect();
    const expectedValue = "707";
    const res = await simpleStorage.store(expectedValue);
    await res.wait(1);

    assert.equal(await simpleStorage.retrieve(), expectedValue);
  });
});
