export const bleadContractAbi = [
  {
    type: "function",
    name: "USD_CONTRACT_ADDRESS",
    stateMutability: "view",
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "MONTHLY_PRICE_USD",
    stateMutability: "view",
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "ANNUAL_PRICE_USD",
    stateMutability: "view",
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "getSubscriptionEndTimestamp",
    stateMutability: "view",
    inputs: [{ name: "userEmailHash", type: "bytes32" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "updateSubscription",
    inputs: [
      { name: "userEmailHash", type: "bytes32", internalType: "bytes32" },
      {
        name: "plan",
        type: "uint8",
        internalType: "enum Blead.SubscriptionPlan",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const usdContractAbi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
] as const;
