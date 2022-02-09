const shortenAddress = (address: string): string => {
  return address.slice(0, 4) + '.....' + address.slice(-4);
};

export default shortenAddress;
