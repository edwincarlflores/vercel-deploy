import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  job: Job;
};

type Job = {
  id: string;
  state: string;
  createdAt: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL || "";
  const { api_key: apiKey } = req.query;

  if (!url) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_DEPLOY_API_KEY) {
    res.status(403).json({ message: "Forbidden" });
  }

  const response = await fetch(url, {
    method: "POST",
  });

  if (response.status > 201) {
    res.status(response.status).json({ message: response.statusText });
  }

  const data: Data = await response.json();
  res.status(200).json({ message: response.statusText, data });
}
