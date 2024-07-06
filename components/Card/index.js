import Image from "next/image";
import Link from "next/link";

export default function Card({ title, link, thumbnail, time }) {
  return (
    <Link
      className=" w-64 bg-white rounded-lg shadow-md hover:shadow-xl hover:z-1 hover:border-2 hover:border-orange-500"
      href={link}
    >
      <Image
        className="rounded-t-lg"
        src={thumbnail}
        alt={title}
        width={512}
        height={150}
        fetchPriority={undefined}
      />
      <div className="flex flex-col justify-between h-28 py-2 px-4">
        <h3 className="text-lg font-semibold text-center">{title}</h3>

        <span className="text-sm flex justify-end text-gray-500">
          Cook time: {time}
        </span>
      </div>
    </Link>
  );
}
