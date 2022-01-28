import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
declare let window: any;

function useMetamask() {
  const [provider, setProvider] = useState<any>();
  const [userAddress, setUserAddress] = useState<any>();
  const [signer, setSigner] = useState<any>();

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner();

    setUserAddress(await signer.getAddress());
    setProvider(provider);
    setSigner(signer);
  }


  async function disconnect() {
    // Prompt user for account connections
		const signer = await provider.getSigner();
    console.log('Account:', await signer.getAddress());
    console.log(await signer.getBalance());
    console.log(await provider.getNetwork());
	}

	return {provider, signer, connect, disconnect, userAddress};
}

export default useMetamask;
