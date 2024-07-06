import { Application, Router, Context, send } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { exists, ensureDir, remove } from "https://deno.land/std/fs/mod.ts";

const app = new Application();
const router = new Router();
const IMAGE_DIR = "./images";

await ensureDir(IMAGE_DIR);

async function deleteImage(imagePath: string) {
  setTimeout(async () => {
    if (await exists(imagePath)) {
      await remove(imagePath);
      console.log(`Deleted image: ${imagePath}`);
    }
  }, 120 * 1000);
}

router.get("/generate", async (context: Context) => {
  const prompt = context.request.url.searchParams.get("p");
  if (!prompt) {
    context.response.status = 400;
    context.response.body = { error: "No prompt provided" };
    return;
  }

  const url = "https://ai-api.magicstudio.com/api/ai-art-generator";

  const headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    "Origin": "https://magicstudio.com",
    "Referer": "https://magicstudio.com/ai-art-generator/",
  });

  const data = {
    prompt: prompt,
    output_format: "bytes",
    user_profile_id: "null",
    anonymous_user_id: "a584e30d-1996-4598-909f-70c7ac715dc1",
    request_timestamp: String(Date.now() / 1000),
    user_is_subscribed: "false",
    client_id: "pSgX7WgjukXCBoYwDM8G8GLnRRkvAoJlqa5eAVvj95o"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const blob = await response.blob();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const imagePath = `${IMAGE_DIR}/${timestamp}.png`;
      const buffer = await blob.arrayBuffer();
      await Deno.writeFile(imagePath, new Uint8Array(buffer));
      deleteImage(imagePath);
      context.response.body = { url: `/images/${timestamp}.png` };
    } else {
      context.response.status = 500;
      context.response.body = { error: `Failed to fetch image. Status code: ${response.status}` };
    }
  } catch (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
  }
});

router.get("/images/:filename", async (context: Context) => {
  await send(context, context.params.filename, {
    root: IMAGE_DIR,
    contentType: "image/png",
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

await app.listen({ port: 8000 });
