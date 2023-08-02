import { useState, useContext } from "react";
import StandardButtonsContainer from "./StandardButtonsContainer";
import essayFrameworkContext from "./EssayFrameworkContext";
import { RegurgitatorCore as RegurgitationCore } from "components/Regurgitator";

function Regurgitate({}: any) {
  const { essay, setRegurgitation, regurgitation }: any = useContext(
    essayFrameworkContext
  );
  return (
    <>
      <h2 className="stepName">Regurgitate Essay</h2>
      <p className="step_instructions regurgitate_instructions">
        Its time to avoid plagiarism and regurgitate your essay. Don't overthink
        this step. Play some music and rewrite each sentence in your own words.
      </p>
      <RegurgitationCore
        target={essay ? essay.split(".") : []}
        onRegurgitationChange={(newRegurgitation: string[]) => {
          if (newRegurgitation.length === 0) return; // Hack to prevent infinite loop
          const oldRegurgitation = JSON.stringify(regurgitation);
          const newRegurgitationString = JSON.stringify(newRegurgitation);

          if (oldRegurgitation !== newRegurgitationString)
            setRegurgitation(newRegurgitation);
        }}
        overideRegurgitation={regurgitation}
      >
        <h5>Regurgitated Text below</h5>
      </RegurgitationCore>
      <StandardButtonsContainer></StandardButtonsContainer>
    </>
  );
}

export default Regurgitate;
