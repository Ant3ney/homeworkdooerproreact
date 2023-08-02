import { useState, useContext } from "react";
import StandardButtonsContainer from "./StandardButtonsContainer";
import essayFrameworkContext from "./EssayFrameworkContext";

function Notes({}: any) {
  const { onGenerateEssay, notes, setNotes }: any = useContext(
    essayFrameworkContext
  );
  return (
    <>
      <h2 className="stepName">Enter notes</h2>
      <p className="step_instructions">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor
        lacus nisi, at accumsan enim tempus a. Nulla accumsan eget neque in
        vulputate. Proin quis lectus ac libero hendrerit posuere. Quisque et
        lacus sit amet risus rutrum egestas non nec augue.
      </p>
      <textarea
        className="notes_textarea"
        rows={10}
        defaultValue={""}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      <StandardButtonsContainer>
        <button onClick={onGenerateEssay}>Generate Answer</button>
      </StandardButtonsContainer>
    </>
  );
}

export default Notes;
