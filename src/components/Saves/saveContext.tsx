import { createContext, useState, useEffect } from "react";

const saveContext = createContext<any>(null);
export type ReadThenAnswer = {
  text?: string;
  question?: string;
  answer?: string;
  regurgitation?: string[];
  name: string | null;
  type: "readTextAndAnswerQuestion";
};

export type Regurgitator = {
  target?: string;
  regurgitation?: string[];
  name: string | null;
  type: "regurgitator";
};

export type Content = ReadThenAnswer | Regurgitator;

export function SaveProvider({ children }: any) {
  const [saves, setSaves] = useState<Content[]>();
  useEffect(() => {
    const savesJSON = localStorage.getItem("contentSaves");
    if (savesJSON && savesJSON !== "undefined") {
      const parsedSavesJSON = JSON.parse(savesJSON);
      const saves = parsedSavesJSON || [];
      setSaves(saves);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("contentSaves", JSON.stringify(saves));
  }, [saves]);
  return (
    <saveContext.Provider
      value={{ saves, setSaves, saveContent, deleteContent }}
    >
      {children}
    </saveContext.Provider>
  );

  /**
   * If the content is not in the saves array, add it. If it is, replace it.
   * @param {Content} content - Content = {
   */
  function deleteContent(index: number) {
    const savesBuffer = JSON.parse(JSON.stringify(saves || []));
    savesBuffer.splice(index, 1);
    setSaves(savesBuffer);
  }
  function saveContent(content: Content) {
    const index = saves?.findIndex((save) => save.name === content.name);
    if (index === -1 || (!index && index !== 0)) {
      const savesBuffer = JSON.parse(JSON.stringify(saves || []));
      savesBuffer.push(content);
      setSaves(savesBuffer);
    } else if (index !== undefined && index !== null) {
      const savesBuffer = JSON.parse(JSON.stringify(saves || []));
      savesBuffer[index] = content;
      setSaves(savesBuffer);
    }
  }
}

export default saveContext;
