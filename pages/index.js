import { createClient } from "contentful";
import Config from "../config/index.js";

export async function getStaticProps() {
  const client = createClient(Config.contentful);
  const { items: recipes } = await client.getEntries({
    content_type: "recipe",
  });

  return { props: { recipes } };
}

export default function Recipes({ recipes }) {
  return <div className="recipe-list"> Recipe List</div>;
}
