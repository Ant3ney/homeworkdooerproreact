import { useContext } from "react";
import "./essayFramework.scss";
import essayFrameworkContext from "./EssayFrameworkContext";
import { EssayFrameworkProvider } from "./EssayFrameworkContext";

function EssayFramework({}: any) {
  const { step, steps, onForceStepChange }: any = useContext(
    essayFrameworkContext
  );
  const StepView = steps[step].View;
  const stepArray = Object.keys(steps);
  return (
    <div className="essay_framework">
      <h1 className="service_type">Essay Framework</h1>
      <section className="progression_container">
        {stepArray.map((stepKey, i) => {
          return (
            <>
              <button
                key={i}
                className={`${
                  step === steps[stepKey].step ? "current_step" : ""
                }`}
                onClick={() => {
                  onForceStepChange(steps[stepKey].step);
                }}
              >
                {steps[stepKey].title}
              </button>
              {i + 1 < stepArray.length ? <hr /> : <></>}
            </>
          );
        })}
      </section>
      <StepView />
    </div>
  );
}

function EssayFrameworkContainer({}: any) {
  return (
    <EssayFrameworkProvider>
      <EssayFramework />
    </EssayFrameworkProvider>
  );
}

export default EssayFrameworkContainer;
