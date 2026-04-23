import fs from "node:fs/promises";

const file = new URL("../events.json", import.meta.url);
const raw = JSON.parse(await fs.readFile(file, "utf8"));

console.log("Eventos disponíveis para import:", raw.events.length);
console.log("Próximo passo: conectar este script ao Supabase com service role key.");
