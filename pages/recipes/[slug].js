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
      <div className="flex flex-col items-center">
        <h3 className="text-7xl font-bold mb-3 text-center">{title}</h3>
        <p className="text-xl font-bold mb-3 text-center">
          prepare around of {cookingTime} minutes
        </p>

        <Image
          className="rounded-xl "
          src={image}
          alt={title}
          width={600}
          height={250}
        />
      </div>

      <h4 className="text-3xl font-bold mb-3 mt-10 text-orange-700">
        Ingredients:
      </h4>

      <ul className="list-disc ml-10">
        {ingredients.map((ingredient) => (
          <li className="text-xl mb-3 mt-3" key={ingredient}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h5 className="text-3xl font-bold mb-3 mt-10 text-orange-700">Prepare Mode</h5>
      <RichText richText={method} />
    </>
  );
}
