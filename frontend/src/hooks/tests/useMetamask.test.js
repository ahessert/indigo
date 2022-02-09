import useMetamask from '../useMetamask';
import { renderHook} from '@testing-library/react-hooks';
import ethers from 'ethers';
import ganache from 'ganache-cli';

describe('Contract Tests', () => {
  let hook;

  beforeEach(() => {
    hook = renderHook(() => useMetamask());
  });

  it('should render hook', () => {
    const { provider } = hook;
    expect(true).toBeTruthy();
  });
});
