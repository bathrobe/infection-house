import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="mx-4 md:mx-64 text-center my-24">
        <p className="text-xl text-gray-700">
          <em>Infection House</em> is a litmag about the early days of the
          Coronavirus. It was founded by Cameron Lovejoy and Joe Holmes in
          mid-March 2020 and ended its run that October. We have archived it
          here for your enjoyment.
        </p>
      </div>
    </Layout>
  );
}
