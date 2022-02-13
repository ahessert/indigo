const shortenAddress = (address: string): string => {
  if (typeof address !== 'string') {
    return '';
    // throw new Error('invalid input to address shortener');
  }
  return address.slice(0, 5) + '.....' + address.slice(-5);
};

export default shortenAddress;
