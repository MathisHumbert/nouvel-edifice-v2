import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { toHTML } from "@portabletext/to-html";

const projectId = "i3cs0xuf";
const dataset = "production";

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2022-03-07",
});

const builder = imageUrlBuilder(client);

function urlFor(source, maxWidth = 1920) {
  return builder.image(source).width(maxWidth).format("webp").url();
}

function renderSanityText(blocks, separator = "") {
  if (!blocks) return "";

  if (Array.isArray(blocks)) {
    return blocks
      .map((block) => {
        if (block.children) {
          return block.children
            .map((child) => {
              let text = child.text;
              text = text.replace(/\n/g, "<br>");

              if (child.marks && child.marks.length > 0) {
                child.marks.forEach((mark) => {
                  if (mark === "strong") {
                    text = `<strong>${text}</strong>`;
                  }
                  if (mark === "underline") {
                    text = `<span class="text-colored">${text}</span>`;
                  }
                });
              }

              return text;
            })
            .join(separator);
        }
        return "";
      })
      .join("<br>");
  }

  if (blocks.children) {
    return blocks.children
      .map((block) => {
        let text = block.text;
        text = text.replace(/\n/g, "<br>");

        if (block.marks && block.marks.length > 0) {
          block.marks.forEach((mark) => {
            if (mark === "strong") {
              text = `<strong>${text}</strong>`;
            }
            if (mark === "underline") {
              text = `<span class="text-colored">${text}</span>`;
            }
          });
        }

        return text;
      })
      .join(separator);
  }

  return "";
}

function renderPortableText(blocks, separator = null) {
  if (!blocks) return "";

  const html = toHTML(blocks, {
    components: {
      marks: {
        strong: ({ children }) => `<strong>${children}</strong>`,
      },
      block: {
        normal: ({ children }) => {
          const text = children.replace(/\n/g, "<br>");
          return `<p>${text}</p>`;
        },
      },
    },
  });

  let cleanHtml = separator
    ? html.replace(/<p><\/p>/g, separator)
    : html.replace(/<p><\/p>/g, "<br>");

  return cleanHtml;
}

async function fecthHome() {
  const [home] = await client.fetch('*[_type == "homePage"]');

  return home;
}

async function fetchSanityData() {
  const [home] = await Promise.all([fecthHome()]);

  return { ...home, renderSanityText, renderPortableText, urlFor };
}

export default fetchSanityData;
