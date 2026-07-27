import removeMarkdown from "remove-markdown";

// rendered styles for rendered content
export const renderedStyles = {
  p: "text-white",
  h2: "text-xl text-white",
  h3: "text-sm font-bold text-white uppercase",
  ol: "list-decimal pl-8 text-white",
  ul: "list-disc pl-4 text-white",
  a: "underline text-white",
};

export const getExcerpt = (content?: string | null) => {
  if (!content) {
    return "";
  }

  const text = removeMarkdown(content);

  if (text.length > 300) {
    return `${text.slice(0, 300)}...`;
  }

  return text;
};
