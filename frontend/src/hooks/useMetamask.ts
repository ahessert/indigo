import { useState } from 'react';
import { ethers } from 'ethers';
import { CHAIN_ID, CHAIN_ID_0x } from 'utils/constants';
declare let window: any;

function useMetamask() {
  const [provider, setProvider] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();
  const [signer, setSigner] = useState<any>();

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any',
    );
    const signer = newProvider.getSigner();

    newProvider.on('network', async (newNetwork) => {
      // trigger network change if not on Near network
      if (newNetwork.chainId !== CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID_0x }],
        });
        window.location.reload();
      }
    });

    setUserAddress(await signer.getAddress());
    setProvider(newProvider);
    setSigner(signer);
  }

  async function disconnect() {
    // Prompt user for account connections
    const signer = await provider.getSigner();
    console.log('Account:', await signer.getAddress());
    console.log(await signer.getBalance());
    console.log(await provider.getNetwork());
  }

  return { provider, signer, connect, disconnect, userAddress };
}

export default useMetamask;
