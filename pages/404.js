import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>

      <p>
        please check the URL or <Link href="/">go back to the homepage</Link>.
      </p>
    </>
  );
}
