import { Nitro } from 'nitropack';
import { mongoose } from 'mongoose';

export default async (_nitroApp: Nitro ) => {
   const config = useRuntimeConfig();
   const uri = config.mongodbUri;

  try {
     await mongoose.connect(uri)
         console.log("Connected to MongoDB");
      }catch(e) {
         console.log("Log the error", e);
      }
};
