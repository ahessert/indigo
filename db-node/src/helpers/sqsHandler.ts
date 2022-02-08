import  AWS from "aws-sdk";

const SQS_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/754091198799/Indigo"
const SQS_REGION = 'us-east-1'

export class SqsHandler {
    sqs: AWS.SQS;

    constructor() {
        this.sqs = new AWS.SQS({region: SQS_REGION})
    }

    sendLastBlockMessage(blockNumber: number) {
        const messageName : string = "lastBlock"

        const params : AWS.SQS.SendMessageRequest = {
            DelaySeconds: 0,
            MessageAttributes: {
                name: {
                    DataType: "String",
                    StringValue: messageName,
                },
                blockNumber: {
                    DataType: "Number",
                    StringValue: `${blockNumber}`,
                }
            },
            MessageBody: `Checked up to block ${blockNumber}`,
            QueueUrl: SQS_QUEUE_URL
        };
        
        console.log(`Checked up to block ${blockNumber}`)
        this.sendMessage(params);
    }

    private sendMessage(params: AWS.SQS.SendMessageRequest) {
        this.sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error in sendNewModelMessage:", err);
            }
            else {
                console.log("Success, message sent. MessageID:", data.MessageId);
            }
        });
    }
  
    getLastBlockMessages = async () : Promise<AWS.SQS.Message[] | []> => {
        const params = {
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["name", "blockNumber"],
            QueueUrl: SQS_QUEUE_URL,
            VisibilityTimeout: 0,
            WaitTimeSeconds: 0,
        };
        const data = await this.sqs.receiveMessage(params).promise();

        if (!data.Messages) {
            return []
        }

        const lastBlockMessages : AWS.SQS.Message[] = data.Messages.filter(
            message => message.MessageAttributes!.name.StringValue === "lastBlock"
        )

        return lastBlockMessages;
    };

    deleteMessages = async (messages : AWS.SQS.Message[]) => {
        let uniqueMessageIds : string[] = [];
        let uniqueEntries : {Id: string, ReceiptHandle: string}[] = [];

        const batchDeleteEntries = messages.map( function(msg) {
            return {Id: msg.MessageId!, ReceiptHandle: msg.ReceiptHandle!}
        });

        for (let i=0; i < batchDeleteEntries.length; i++) {
            if (uniqueMessageIds.includes(batchDeleteEntries[i].Id)) {
                continue
            } 
            uniqueEntries.push(batchDeleteEntries[i]);
            uniqueMessageIds.push(batchDeleteEntries[i].Id);
        }

        if (batchDeleteEntries.length > 0) {
            this.sqs.deleteMessageBatch(
                {QueueUrl: SQS_QUEUE_URL, 
                Entries: uniqueEntries},
                (err, data) => {
                    if (err) {
                        console.log("Error: Delete SQS Message: ", err);
                    } else {
                        console.log("Messages deleted", data);
                    }
                })
        } else {
            console.log("No messages to delete");
        }
        
    }
}
