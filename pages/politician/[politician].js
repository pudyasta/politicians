import React from "react";
import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "politicians" });

  const paths = res.items.map((item) => {
    return { params: { politician: item.fields.slug } };
  });
  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  const { items } = await client.getEntries({
    content_type: "politicians",
    "fields.slug": context.params.politician,
  });

  if (!items) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { politician: items[0] },
    revalidate: 1,
  };
};

export default function Politician({ politician }) {
  if (!politician) return <Skeleton />;

  const {
    featuredImage,
    formerPosition,
    name,
    party,
    position,
    shortSummary,
    otherPosition,
  } = politician.fields;
  return (
    <div className="w-full text-center">
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={400}
        height={250}
        className="rounded "
      />
      <h1 className="capitalize text-2xl font-medium mt-5">{name}</h1>
      <h3>{position}</h3>
      <h3 className="font-medium">{party}</h3>

      <div className="flex justify-center mt-8 text-left flex-wrap">
        <div className="other-position md:mr-8">
          <h2>Other Positions</h2>
          {otherPosition.map((pos) => (
            <p key={pos} className="bg-gray-200 my-2 p-3 rounded w-64 md:w-96 ">
              {pos}
            </p>
          ))}
        </div>
        <div className="former-position">
          <h2>Former Positions</h2>
          {formerPosition.map((pos) => (
            <p
              key={pos}
              className="bg-gray-200 my-2 p-3 rounded w-64 md:w-96  "
            >
              {pos}
            </p>
          ))}
        </div>
      </div>
      <div className="w-4/5 text-left m-auto mt-8">
        {documentToReactComponents(shortSummary)}
      </div>
    </div>
  );
}
