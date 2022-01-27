import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
declare let window: any;

function useMetamask() {
  const [provider, setProvider] = useState<any>();

  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    setProvider(new ethers.providers.Web3Provider(window.ethereum, 'any'));
  }

  async function disconnect() {
    // Prompt user for account connections
		const signer = await provider.getSigner();
    console.log('Account:', await signer.getAddress());
    console.log(await signer.getBalance());
    console.log(await provider.getNetwork());
	}

	return {provider, connect, disconnect};
}

export default useMetamask;
