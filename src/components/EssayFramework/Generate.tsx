import { useContext } from "react";
import essayFrameworkContext from "./EssayFrameworkContext";
import { ThreeCircles } from "react-loader-spinner";
import StandardButtonsContainer from "./StandardButtonsContainer";

function Generate({}: any) {
  const { essay, onGenerateEssay, generatingEssay, onClickedRegurgitate }: any =
    useContext(essayFrameworkContext);
  const stepName = generatingEssay ? "Generating Essay..." : "Generate";

  console.log("In generate view", essay);
  return (
    <>
      <h2 className="stepName">{stepName}</h2>
      {generatingEssay ? <LoadingDesign /> : <></>}
      {!generatingEssay ? <p className="generated_essay">{essay}</p> : <></>}
      <StandardButtonsContainer>
        <ManageEssayButtonSet />
      </StandardButtonsContainer>
    </>
  );

  function ManageEssayButtonSet() {
    return (
      <>
        <button onClick={onClickedRegurgitate}>Regurgitate</button>
        <button onClick={onGenerateEssay}>
          Regenerate <img src="icons/refresh.svg" alt="refresh" />
        </button>
      </>
    );
  }
}

function LoadingDesign() {
  return (
    <div className="loading_design_container">
      <ThreeCircles height="100" width="100" color="#8FB7A5" />
    </div>
  );
}

export default Generate;
