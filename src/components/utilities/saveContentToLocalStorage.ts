import { Content } from "components/Saves";

const saveContentToLocalStorage = (content: Content) => {
  const type = content.type;
  const contentBuffer = JSON.parse(JSON.stringify(content));
  delete contentBuffer.type;
  delete contentBuffer.name;
  for (let string in contentBuffer) {
    let saveItem = null;
    if (Array.isArray(contentBuffer[string]))
      saveItem = contentBuffer[string].join("---split-me---");
    else saveItem = "" + contentBuffer[string];
    localStorage.setItem(`${string}Content${type}`, JSON.stringify(saveItem));
  }
};

export default saveContentToLocalStorage;
