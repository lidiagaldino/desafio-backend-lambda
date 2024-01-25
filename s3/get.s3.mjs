import { GetObjectCommand } from "@aws-sdk/client-s3";
import {streamToString} from '../utils/stream-string.mjs'
export async function getS3Object(bucket, key, client) {
    const getCommand = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });

    try {
      const response = await client.send(getCommand);
  
      // Lendo o stream e convertendo para string
      return streamToString(response.Body);

    } catch (error) {
      throw new Error('Error getting object from bucket');
    }
}
