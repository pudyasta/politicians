import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card(items) {
  const { name, slug, party, thumbnail } = items.items.fields;
  return (
    <>
      <Link href={"politician/" + slug}>
        <a className="card w-80 py-6 bg-gray-5 shadow-md m-4 px-4 fir hover:shadow-xl">
          <Image
            src={"https:" + thumbnail.fields.file.url}
            width={140}
            height={170}
          />
          <h2 className="font-medium">{name}</h2>
          <h3>{party}</h3>
        </a>
      </Link>
    </>
  );
}
