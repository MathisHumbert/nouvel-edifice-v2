import { createClient } from "@sanity/client";

const projectId = "i3cs0xuf";
const dataset = "production";

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2022-03-07",
});

function renderSanityText(blocks) {
  if (blocks && blocks.children)
    return blocks.children
      .map((block) => {
        let text = block.text;

        text = text.replace(/\n/g, "<br>");

        if (block.marks && block.marks.length > 0) {
          block.marks.forEach((mark) => {
            if (mark === "strong") {
              text = `<strong>${text}</strong>`;
            }
          });
        }

        return text;
      })
      .join("");
}

async function fecthHome() {
  const [home] = await client.fetch('*[_type == "homePage"]');

  return home;
}

async function fetchSanityData() {
  const [home] = await Promise.all([fecthHome()]);

  return { ...home, renderSanityText };
}

export default fetchSanityData;
