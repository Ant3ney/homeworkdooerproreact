const contentRetrieval = {
  getString: (string: string, type: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get(string);
    console.log();
    if (urlParam && urlParam !== "" && typeof urlParam === "string")
      return urlParam;

    const storage = localStorage.getItem(`${string}Content${type}`);
    if (storage && storage !== "" && storage !== "undefined")
      return JSON.parse(storage);
    else return null;
  },
  getStringArray: (string: string, type: string): string[] | [] => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get(string);
    if (
      urlParam &&
      urlParam !== "" &&
      urlParam.split &&
      urlParam.split("---split-me---").length
    )
      return urlParam.split("---split-me---");
    const storage = localStorage.getItem(`${string}Content${type}`);
    if (storage && storage !== "" && storage !== "undefined") {
      const parsedRegurgitation = JSON.parse(storage);
      if (
        parsedRegurgitation &&
        parsedRegurgitation.split &&
        parsedRegurgitation.split("---split-me---").length
      )
        return parsedRegurgitation.split("---split-me---");
      else return [];
    } else return [];
  },
};

export default contentRetrieval;
