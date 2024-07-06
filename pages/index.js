import Card from "../components/Card/index.js";
import { cmsClient } from "../config/index.js";

export async function getStaticProps() {
  const { items: recipes } = await cmsClient.getEntries({
    content_type: "recipe",
  });

  const rec = [...recipes, ...recipes, ...recipes, ...recipes];

  return { props: { recipes: rec } };
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list flex flex-wrap gap-8 justify-center">
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
