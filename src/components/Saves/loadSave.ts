import { Content } from "./saveContext";

function loadSave(content: Content, navigate: any) {
  switch (content.type) {
    case "readTextAndAnswerQuestion":
      return () => {
        navigate(
          `/?text=${content.text}&question=${content.question}&answer=${
            content.answer ? content.answer : ""
          }${
            content.regurgitation
              ? `&regurgitation=${content.regurgitation.join("---split-me---")}`
              : ""
          }&name=${content.name}`
        );
      };
    case "regurgitator":
      return () => {
        navigate(
          `/regurgitator?target=${content.target}&regurgitation=${
            content.regurgitation
              ? `${content.regurgitation.join("---split-me---")}`
              : ""
          }&name=${content.name}`
        );
      };
    case "essayFramework":
      return () => {
        navigate(
          `/essayFramework?step=${content.step}&name=${content.name}&essay=${
            content.essay
          }&regurgitation=${content?.regurgitation?.join(
            "---split-me---"
          )}&notes=${content.notes}`
        );
      };
    default:
      return () => {
        //@ts-ignore
        console.error("Error: Unknown save type:", content.type);
      };
  }
}

export default loadSave;
