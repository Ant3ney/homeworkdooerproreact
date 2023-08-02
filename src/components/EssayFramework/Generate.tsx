import { useContext } from "react";
import essayFrameworkContext from "./EssayFrameworkContext";
import { ThreeCircles } from "react-loader-spinner";
import StandardButtonsContainer from "./StandardButtonsContainer";

function Generate({}: any) {
  const { essay }: any = useContext(essayFrameworkContext);
  const stepName = !essay ? "Generating Essay..." : "Generate";

  console.log("In generate view", essay);
  return (
    <>
      <h2 className="stepName">{stepName}</h2>
      {!essay ? <LoadingDesign /> : <></>}
      {essay ? <p className="generated_essay">{essay}</p> : <></>}
      <StandardButtonsContainer>
        <ManageEssayButtonSet />
      </StandardButtonsContainer>
    </>
  );

  function ManageEssayButtonSet() {
    return (
      <>
        <button>Regurgitate</button>
        <button>Regenerate</button>
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
