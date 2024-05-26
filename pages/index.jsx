import { createClient } from "contentful";
import Config from "../config/index.js";
import Card from "../components/Card/index.js";

export async function getStaticProps() {
  const client = createClient(Config.contentful);
  const { items: recipes } = await client.getEntries({
    content_type: "recipe",
  });

  return { props: { recipes } };
}

export default function Recipes({ recipes, assets }) {
  return (
    <div className="recipe-list">
      {recipes.map(({ fields, sys }) => (
        <Card
          key={sys.id}
          title={fields.title}
          link={`/recipes/${fields.slug}`}
          thumbnail={`https:${fields.thumbnail.fields.file.url}`}
          time={fields.cookingTime}
        />
      ))}
    </div>
  );
}
