import { createClient } from "contentful";

const options = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

export const cmsClient = createClient(options);
