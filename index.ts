import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { mkdir, writeFile, rename } from "node:fs/promises";
import { prompt } from "./prompt.ts";

const { LLM_BASE_URL, LLM_API_KEY, LLM_MODEL } = process.env;

if (!LLM_BASE_URL || !LLM_API_KEY || !LLM_MODEL) {
  throw new Error("Задай LLM_BASE_URL, LLM_API_KEY и LLM_MODEL");
}

const provider = createOpenAICompatible({
  name: "configured-provider",
  baseURL: LLM_BASE_URL,
  apiKey: LLM_API_KEY,
});

const { text, finishReason } = await generateText({
  model: provider(LLM_MODEL),
  prompt: prompt(process.argv[2] ?? "Минималистичный сайт о фотографии"),
});

const html = text.match(/<!doctype html>[\s\S]*<\/html>/i)?.[0] ?? "";

if (
  finishReason !== "stop" ||
  !/^<!doctype html>/i.test(html) ||
  !/<\/html>$/i.test(html)
) {
  throw new Error(
    `Не получен завершённый HTML-документ: finishReason=${finishReason}, символов=${text.length}. ` +
    `Начало: ${JSON.stringify(text.slice(0, 200))}. Конец: ${JSON.stringify(text.slice(-200))}`,
  );
}

await mkdir("./dist", { recursive: true });
await writeFile("./dist/index.html.tmp", html, "utf8");
await rename("./dist/index.html.tmp", "./dist/index.html");

console.log("Готово: dist/index.html");