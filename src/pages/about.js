import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="mx-4 md:mx-64 text-center my-24">
        <p className="text-xl text-gray-700">
          <em>Infection House</em> was a litmag documenting the early days of
          COVID-19. It was founded by Cameron Lovejoy, Joe Holmes, and many of
          their friends in mid-March 2020. The magazine ended its run that
          October after publishing writers from all over the world. We have
          archived it here for your enjoyment and maybe for the sake of
          posterity.
        </p>
      </div>
    </Layout>
  );
}
