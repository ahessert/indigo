/**
 * @jest-environment jsdom
 */
import useMetamask from '../useMetamask';
import { renderHook} from '@testing-library/react-hooks';

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
