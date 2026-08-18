import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const outputPath = resolve("public", "ads.txt");

if (!client) {
  writeFileSync(outputPath, "# AdSense nincs aktiválva ezen a builden.\n", "utf8");
  process.exit(0);
}

const match = client.match(/^ca-(pub-\d+)$/);
if (!match) {
  throw new Error("A NEXT_PUBLIC_ADSENSE_CLIENT értéke ca-pub- kezdetű azonosító legyen.");
}

writeFileSync(outputPath, `google.com, ${match[1]}, DIRECT, f08c47fec0942fa0\n`, "utf8");
