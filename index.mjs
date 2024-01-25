import {S3Client } from "@aws-sdk/client-s3";
import {updateOrAddItem} from './utils/update-add.mjs'
import {putS3Object} from './s3/put.s3.mjs'
import {getS3Object} from './s3/get.s3.mjs'

const client = new S3Client({region: "us-east-2"});

export const handler = async (event) => {
  try {
    for(const record of event.Records) {      
      const rawBody = JSON.parse(record.body)
      const body = JSON.parse(rawBody.Message)
      const ownerId = body.ownerId;
      
      try {
        var bucketName = "products-catalog-marketplace"
        var filename = `${ownerId}-catalog.json`
        const catalog = await getS3Object(bucketName, filename, client);
        const catalogData = JSON.parse(catalog)
      
        if(body.type == "product") {
          updateOrAddItem(catalogData.products, body)
        } else {
          updateOrAddItem(catalogData.categories, body)
        }
        
        await putS3Object(bucketName, filename, JSON.stringify(catalogData), client);
      
      } catch (error) {
        if(error.message == "Error getting object from bucket") {
          const newCatalog = { products: [], categories: [] }
          if(body.type == "product") {
            newCatalog.products.push(body);
          } else {
            newCatalog.categories.push(body);
          }
          
          await putS3Object(bucketName, filename, JSON.stringify(newCatalog), client)
        }
        else {
          throw error;
        }
      }
  }
    
    return { status: 'success' }
  } catch (err) {
    throw new Error("error processing message: " + err.message);
  }
};
