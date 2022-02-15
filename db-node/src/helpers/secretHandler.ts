import AWS from "aws-sdk";
import { AWS_REGION, WALLET_PRIVATE_KEY } from '../environment'

const secretName_WALLET_PRIVATE_KEY = "test/dbNode/WALLET_PRIVATE_KEY"

class SecretManager {
    client: AWS.SecretsManager;
    setUpComplete: Promise<void>;
    WALLET_PRIVATE_KEY: string;

    constructor() {
        this.client = new AWS.SecretsManager({region: AWS_REGION})
        this.setUpComplete = this._setSecrets()
    }

    private _setSecrets = async () => {
        const walletSecret  = await this.client.getSecretValue(
            {SecretId: secretName_WALLET_PRIVATE_KEY}
        ).promise();
        this.WALLET_PRIVATE_KEY = walletSecret.SecretString;
    }
}

export const getWalletPrivateKey = async () : Promise<string> => {
    // Return if included in environment
    if (WALLET_PRIVATE_KEY) {
        return WALLET_PRIVATE_KEY
    }

    const secretClient = new SecretManager()
    await secretClient.setUpComplete
    return secretClient.WALLET_PRIVATE_KEY
}
