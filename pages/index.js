import styles from "../styles/Home.module.css";
import { createClient } from "contentful";
import Card from "../components/Card";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_TOKEN,
  });

  const res = await client.getEntries({ content_type: "politicians" });

  return {
    props: { politicians: res.items },
    revalidate: 1,
  };
};

export default function Home({ politicians }) {
  return (
    <>
      <div className="flex flex-wrap max-w-6xl justify-center ">
        {politicians.map((politician) => (
          <Card items={politician} key={politician.fields.slug} />
        ))}
      </div>
    </>
  );
}
