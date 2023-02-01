import RegurgitatorCore from "./RegurgitatorCore";
import "./regurgitator.scss";
import { useState, useEffect } from "react";
import { Content, SavesModel } from "components/Saves";
import { SaveButton } from "components/Saves";
import {
  contentRetrieval,
  saveContentToLocalStorage,
} from "components/utilities";
import ClearButton from "components/ClearButton";

const featureType = "regurgitator";

function Regurgitator({}: any) {
  const [target, setTarget] = useState<string | undefined>();
  const [regurgitation, setRegurgitation]: any = useState([]);
  const [initialRegurgitation, setInitialRegurgitation]: any = useState([]);
  const [showSaveModel, setShowSaveModel] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const content: Content = {
    type: featureType,
    name: null,
    target: target,
    regurgitation,
  };

  useEffect(initialize, []);

  useEffect(() => {
    if (!initialized) return;
    saveContentToLocalStorage(content);
  }, [content]);

  return (
    <div className="regurgitator_container">
      {showSaveModel ? (
        <SavesModel
          onExit={() => {
            setShowSaveModel(false);
          }}
          content={{
            type: "regurgitator",
            name: null,
            target: target,
            regurgitation,
          }}
        />
      ) : (
        <></>
      )}
      <h5>Regurgitator (Plagiarism Protection)</h5>
      <p>
        Enter the text you would like to base your writhing on and we will map
        out each sentence with a corresponding text box that you will
        regurgitate in you own words. This will result in a plagiarism free pice
        of content.
      </p>
      <label htmlFor="text">Target Text</label>
      <textarea
        id="text"
        rows={4}
        onChange={(e) => {
          const text = e?.target?.value;
          setTarget(text);
        }}
        defaultValue={target ? target : ""}
      />
      {target ? (
        <RegurgitatorCore
          target={target ? target.split(".") : []}
          onRegurgitationChange={(newRegurgitation: string[]) => {
            setRegurgitation(newRegurgitation);
          }}
          overideRegurgitation={initialRegurgitation}
        >
          <h5>Regurgitated Text below</h5>
        </RegurgitatorCore>
      ) : (
        <></>
      )}
      <ClearButton
        onClick={() => {
          setTarget("");
          setRegurgitation([]);
        }}
      ></ClearButton>
      <SaveButton
        onClick={() => {
          setShowSaveModel(true);
        }}
      ></SaveButton>
    </div>
  );

  function initialize() {
    setTarget(contentRetrieval.getString("target", featureType) || undefined);
    const regurgitation = contentRetrieval.getStringArray(
      "regurgitation",
      featureType
    );
    setRegurgitation(regurgitation);
    setInitialRegurgitation(regurgitation);
    setInitialized(true);
  }
}

export default Regurgitator;
