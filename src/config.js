const contractName = 'dev-1644794734544-65256558529213';

module.exports = function getConfig(isServer = false) {
  let config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    contractName,
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
      GAS: "200000000000000",
      DEFAULT_NEW_ACCOUNT_AMOUNT: "20",
      contractMethods: {
        changeMethods: ["new", "deposit",
          "play50", "play45", "play40",
          "play35", "play30", "play25",
          "play20", "play15", "play10"],
        viewMethods: ["get_credits"],
      },
    };
  }

  if (process.env.REACT_APP_ENV === "prod") {
    config = {
      ...config,
      networkId: "mainnet",
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      contractName: "near",
    };
  }

  return config;
};
