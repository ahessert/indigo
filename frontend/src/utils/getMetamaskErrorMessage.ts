type MetamaskError = {
  code: number;
  message: string;
  stack: string;
};

function getMetamaskErrorMessage(error: MetamaskError): string {
  try {
    const msg = error.message;
    const errorString = msg.slice(msg.indexOf('{'), -1);
    const errorJSON = JSON.parse(errorString);
    return errorJSON.value.data.message;
  } catch (e) {
    return 'check aurora error formatting';
  }
}

export default getMetamaskErrorMessage;
