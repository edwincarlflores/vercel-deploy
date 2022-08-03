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
  const subSuccessMessage = process.env.NEXT_PUBLIC_SUB_SUCCESS_MESSAGE || "";

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
          <div className="grid place-items-center mt-6">
            <button
              onClick={deploy}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {buttonText}
            </button>
            {success && (
              <div
                className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4"
                role="alert"
              >
                <div className="flex">
                  <div>
                    <p className="font-bold">{successMessage}</p>
                    {subSuccessMessage && (
                      <p className="text-sm">{subSuccessMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h2>You are not authorized to access this page</h2>
        )}
      </main>
    </div>
  );
};

export default Home;
