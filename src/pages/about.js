import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="mx-4 md:mx-64 text-center my-24">
        <p className="text-xl text-gray-700">
          <em>Infection House</em> was a litmag documenting the early days of
          COVID-19. It was founded in mid-March 2020 by Cameron Lovejoy, Joe
          Holmes, and many of their friends. By the time the magazine ended its
          run, we published writers both pro and untrained from all over the
          world. <em>Infection House</em> is archived here for your enjoyment--
          and maybe for the sake of posterity.
        </p>
      </div>
    </Layout>
  );
}
