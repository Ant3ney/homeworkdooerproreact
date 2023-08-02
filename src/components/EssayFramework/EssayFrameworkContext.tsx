import { createContext, useState, useEffect } from "react";
import { authRoute } from "components/utilities";
import Notes from "./Notes";
import Generate from "./Generate";

const essayFrameworkContext: any = createContext<any>(null);

export function EssayFrameworkProvider({ children }: any) {
  const [step, setStep] = useState<string>("notes");
  const [notes, setNotes] = useState<string>("");
  const [essay, setEssay] = useState<string>("");

  const steps: any = {
    notes: {
      View: Notes,
      onStep: () => {
        setEssay("");
      },
      title: "Notes",
      step: "notes",
    },
    generate: {
      View: Generate,
      onStep: () => {
        console.log("onStep generate");
      },
      title: "Generate",
      step: "generate",
    },
    regurgitate: {
      title: "Regurgitate",
      step: "regurgitate",
    },
  };

  useEffect(() => {
    steps[step].onStep?.();
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
      }}
    >
      {children}
    </essayFrameworkContext.Provider>
  );

  function onGenerateEssay() {
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
      })
      .catch(console.error);
  }
}

export default essayFrameworkContext;
