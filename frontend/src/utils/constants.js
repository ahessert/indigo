export const CHAIN_ID = 1313161555;
export const CHAIN_ID_0x = '0x4e454153';

export const blockExplorerUrl = 'https://explorer.mainnet.aurora.dev/';
export const developerDocUrl =
  'https://github.com/ahessert/indigo_developer_template/blob/main/README.md';
export const githubUrl = 'https://github.com/ahessert/indigo';

export function getTransactionUrl(txHash) {
  return `${blockExplorerUrl}/tx/${txHash}`;
}
