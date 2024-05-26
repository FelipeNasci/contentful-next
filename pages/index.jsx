import Card from "../components/Card/index.js";
import { cmsClient } from "../config/index.js";

export async function getStaticProps() {
  const { items: recipes } = await cmsClient.getEntries({
    content_type: "recipe",
  });

  return { props: { recipes } };
}

export default function Recipes({ recipes }) {
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
