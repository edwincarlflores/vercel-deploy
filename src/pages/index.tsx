import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { site_key: siteKey } = router.query;

  const pageTitle =
    process.env.NEXT_PUBLIC_PAGE_TITLE || "Deploy Vercel Project";
  const buttonText = process.env.NEXT_PUBLIC_BUTTON_TEXT || "Deploy";
  const successMessage =
    process.env.NEXT_PUBLIC_SUCCESS_MESSAGE || "Deployed Successfully!";

  const deploy = async () => {
    setSuccess(false);

    const response = await fetch(
      `/api/deploy?api_key=${process.env.NEXT_PUBLIC_DEPLOY_API_KEY || ""}`,
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Deploy vercel app manually" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {siteKey === process.env.NEXT_PUBLIC_SITE_KEY ? (
          <>
            <button onClick={deploy}>{buttonText}</button>
            {success && <div>{successMessage}</div>}
          </>
        ) : (
          <h2>You are not authorized to access this page</h2>
        )}
      </main>
    </div>
  );
};

export default Home;
