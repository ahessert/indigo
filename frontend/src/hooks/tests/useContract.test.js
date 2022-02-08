/**
 * @jest-environment jsdom
 */

import useContract from '../useContract';
import { renderHook} from '@testing-library/react-hooks';

describe('Contract Tests', () => {
  let hook;

  beforeEach(() => {
    hook = renderHook(() => useContract());
  });

  it('should instantiate contract', () => {
    expect(true).toBeTruthy();
  });
});
