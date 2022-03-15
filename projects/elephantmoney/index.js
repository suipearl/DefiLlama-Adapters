const sdk = require("@defillama/sdk");
const { pool2s } = require("../helper/pool2");
const { stakings } = require("../helper/staking");

const contracts = {
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  TRUNK: '0xdd325C38b12903B727D16961e61333f4871A70E0',
  treasury: '0xCb5a02BB3a38e92E591d323d6824586608cE8cE4',
  LP: '0xf15A72B15fC4CAeD6FaDB1ba7347f6CCD1E0Aede',
  staking: '0xAF0980A0f52954777C491166E7F40DB2B6fBb4Fc',
  ELEPHANT: '0xE283D0e3B8c102BAdF5E8166B73E02D96d92F688'
};

async function tvl(timestamp, block, chainBlocks) {
  return { [`bsc:${contracts.BUSD}`] : (await sdk.api.erc20.balanceOf({
    target: contracts.BUSD,
    owner: contracts.treasury,
    block: chainBlocks.bsc,
    chain: 'bsc'
  })).output };
};

module.exports = {
  name: 'Elephant Money',
  token: 'ELEPHANT',
  website: 'https://elephant.money/',
  bsc: {
    pool2: pool2s([contracts.TRUNK], [contracts.LP], "bsc"),
    tvl: tvl,
    staking: stakings([contracts.staking], contracts.ELEPHANT, 'bsc')
  }
};