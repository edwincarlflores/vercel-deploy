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
          <div className="grid place-items-center mt-6">
            {success && (
              <div
                className="alert bg-teal-100 border-t-4 border-teal-500 rounded-b rounded-lg py-5 px-6 mb-3 text-base text-teal-900 inline-flex items-center"
                role="alert"
              >
                <strong className="mr-1">{successMessage}</strong>
                <button
                  onClick={() => {
                    setSuccess(false);
                  }}
                  className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              onClick={deploy}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {buttonText}
            </button>
          </div>
        ) : (
          <h2>You are not authorized to access this page</h2>
        )}
      </main>
    </div>
  );
};

export default Home;
