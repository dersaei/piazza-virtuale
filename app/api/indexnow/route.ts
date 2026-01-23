export async function POST(request: Request) {
  const { urls } = await request.json();

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "piazzavirtuale.it",
      key: "3377fc8af72146d5ae48a3ae07dcbe1c",
      keyLocation:
        "https://piazzavirtuale.it/3377fc8af72146d5ae48a3ae07dcbe1c.txt",
      urlList: urls,
    }),
  });

  return Response.json({ status: response.status });
}
