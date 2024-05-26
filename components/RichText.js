import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export function RichText({ richText }) {
  return documentToReactComponents(richText);
}
