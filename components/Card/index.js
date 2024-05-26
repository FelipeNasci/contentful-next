import Image from "next/image";
import Link from "next/link";

export default function Card({ title, link, thumbnail, time }) {
  return (
    <>
      <Link href={link}>
        <a>
          <Image
            src={thumbnail}
            placeholder={title}
            alt={title}
            width={200}
            height={150}
          />
          <h3>{title}</h3>
          <span>Cook time: {time}</span>
        </a>
      </Link>
    </>
  );
}
