import AWS from "aws-sdk";

const INDIGO_BUCKET = 'indigo-db-node';
const AWS_REGION = 'us-east-1';

export class S3Handler {
  s3 : AWS.S3;
  indigoBucket : string = INDIGO_BUCKET;

  constructor() {
    this.s3 = new AWS.S3({region: AWS_REGION});
  }

  createS3 = async (key: string, data: string) => {
    const params = { Bucket: this.indigoBucket, Key: key, Body: data };
  
    this.s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  };

  getIfExists = async (key: string): Promise<AWS.S3.GetObjectOutput | null> => {
    let s3Object : AWS.S3.GetObjectOutput | null;
    const params = { Bucket: this.indigoBucket, Key: key };
    try {
      s3Object = await this.s3.getObject(params).promise()
    } catch (err) {
      if (err.code === "NoSuchKey") {
        console.log(`S3 file not found:\n\t- ${params.Bucket}/${key}`);
        s3Object = null;
      } else {
        throw err;
      }
    }
    return s3Object
  }

  private _handleS3Error = (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
    if (err) {
      if (err.code === "NoSuchKey") console.log(true);
      console.log(err);
    }
  };
}
