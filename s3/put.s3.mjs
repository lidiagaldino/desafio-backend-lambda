import {PutObjectCommand } from "@aws-sdk/client-s3";

export async function putS3Object(dstBucket, dstKey, content, client) {
    try {
      const putCommand = new PutObjectCommand({
        Bucket: dstBucket,
        Key: dstKey,
        Body: content,
        ContentType: "application/json"
      });
    
      const putResult = await client.send(putCommand);
  
      return putResult;
    
    } catch (error) {
      console.log(error);
      return;
    }
}
