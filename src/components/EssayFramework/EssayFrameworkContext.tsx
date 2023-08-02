import { createContext, useState, useEffect, useRef } from "react";
import { authRoute } from "components/utilities";
import Notes from "./Notes";
import Generate from "./Generate";
import Regurgitate from "./Regurgitate";
import { Content, SavesModel } from "components/Saves";
import {
  contentRetrieval,
  saveContentToLocalStorage,
} from "components/utilities";
const featureType = "essayFramework";

const essayFrameworkContext: any = createContext<any>(null);

export function EssayFrameworkProvider({ children }: any) {
  const [step, setStep] = useState<string>("notes");
  const [notes, setNotes] = useState<string>("");
  const [essay, setEssay] = useState<string>("");
  const [generatingEssay, setGeneratingEssay] = useState<boolean>(false);
  const [showSaveModel, setShowSaveModel] = useState<boolean>(false);
  const [regurgitation, setRegurgitation]: any = useState([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  const content: Content = {
    type: featureType,
    name: null,
    step,
    notes,
    essay,
    regurgitation,
  };

  const steps: any = {
    notes: {
      View: Notes,
      onStep: () => {},
      title: "Notes",
      step: "notes",
      hasPrerequisites: () => {
        return true;
      },
    },
    generate: {
      View: Generate,
      onStep: () => {
        console.log("onStep generate");
      },
      title: "Generate",
      step: "generate",
      hasPrerequisites: () => {
        return notes?.length;
      },
    },
    regurgitate: {
      View: Regurgitate,
      title: "Regurgitate",
      step: "regurgitate",
      hasPrerequisites: () => {
        return essay?.length;
      },
    },
  };

  useEffect(initialize, []);
  useEffect(saveContent, [content]);

  useEffect(() => {
    steps[step].onStep?.();
    scrollToTop();
  }, [step]);
  return (
    <essayFrameworkContext.Provider
      value={{
        step,
        setStep,
        steps,
        notes,
        essay,
        setEssay,
        setNotes,
        onGenerateEssay,
        generatingEssay,
        setGeneratingEssay,
        onClickedRegurgitate,
        onForceStepChange,
        onClickResetContent,
        showModel,
        regurgitation,
        setRegurgitation,
      }}
    >
      <>
        {showSaveModel ? (
          <SavesModel onExit={hideModel} content={content} />
        ) : (
          <></>
        )}
        {children}
      </>
    </essayFrameworkContext.Provider>
  );

  function onGenerateEssay() {
    setGeneratingEssay(true);
    console.log("Generating essay", authRoute);
    setStep("generate");
    fetch(`${authRoute}/generateEssay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    })
      .then(async (res) => {
        if (!res.ok) return Promise.reject(await res.text());
        return res.text();
      })
      .then((essay) => {
        console.log("essay:", essay);
        setEssay(essay);
        setGeneratingEssay(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error generating essay");
        setStep("notes");
        setGeneratingEssay(false);
      });
  }

  function onClickedRegurgitate() {
    if (!essay) return alert("No essay to regurgitate");
    else if (generatingEssay) return alert("Please wait for essay to generate");
    setStep("regurgitate");
  }

  function onForceStepChange(step: string) {
    if (!steps[step].hasPrerequisites())
      return alert(`Can not change to step ${step}`);
    setStep(step);
  }

  function onClickResetContent() {
    setStep("notes");
    setNotes("");
    setEssay("");
    setGeneratingEssay(false);
    setRegurgitation([]);
    window.history.replaceState({}, "", `/${featureType}`);
  }

  function showModel() {
    setShowSaveModel(true);
  }

  function hideModel() {
    setShowSaveModel(false);
  }

  function initialize() {
    const step = contentRetrieval.getString("step", featureType) || undefined;
    const notes = contentRetrieval.getString("notes", featureType) || undefined;
    const essay = contentRetrieval.getString("essay", featureType) || undefined;
    const regurgitation = contentRetrieval.getStringArray(
      "regurgitation",
      featureType
    );
    if (step) setStep(step);
    if (notes) setNotes(notes);
    if (essay) setEssay(essay);
    if (regurgitation) setRegurgitation(regurgitation);
    setInitialized(true);
  }

  function saveContent() {
    if (!initialized) return;
    console.log("saving content", content);
    saveContentToLocalStorage(content);
    // save content to URL params
    const url = new URL(window.location.href);
    url.searchParams.set("step", step);
    url.searchParams.set("notes", notes);
    url.searchParams.set("essay", essay);
    url.searchParams.set("regurgitation", regurgitation.join("---split-me---"));
    window.history.replaceState({}, "", url.toString());
  }
}

export default essayFrameworkContext;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
