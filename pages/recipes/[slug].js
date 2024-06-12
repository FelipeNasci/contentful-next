import Image from "next/image";
import { cmsClient } from "../../config/index.js";
import { RichText } from "../../components/RichText.js";
import { redirect } from "next/dist/server/api-utils/index.js";

export async function getStaticPaths() {
  const { items: recipes } = await cmsClient.getEntries({
    content_type: "recipe",
  });

  const paths = recipes.map(({ fields }) => `/recipes/${fields.slug}`);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { items: recipes } = await cmsClient.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });
  const [recipe] = recipes;

  if (!recipe) return { redirect: { destination: "/", permanent: false } };

  return { props: { recipe }, revalidate: 10 };
}

export default function RecipeDetails({ recipe }) {

  if (!recipe) return null;

  const { title, featureImage, cookingTime, method, ingredients } =
    recipe.fields;

  const image = `https:${featureImage.fields.file.url}`;

  return (
    <>
      <h3>{title}</h3>
      <p>prepare around of {cookingTime} minutes</p>

      <Image src={image} alt={title} width={400} height={250} />

      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <h5>Prepare Mode</h5>
      <RichText richText={method} />
    </>
  );
}
