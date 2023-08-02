import { useState, useEffect } from "react";
import "./regurgitator.scss";

export default function RegurgitatorCore({
  target,
  children,
  onRegurgitationChange,
  overideRegurgitation,
}: {
  target: string[];
  children: any;
  onRegurgitationChange?: Function;
  overideRegurgitation?: string[];
}) {
  const [regurgitation, setRegurgitation]: any = useState([]);
  const safeSetRegurgitation: Function = function (
    index: number,
    value: string
  ) {
    const regurgitationBuffer = JSON.parse(JSON.stringify(regurgitation));
    regurgitationBuffer[index] = value;
    setRegurgitation(regurgitationBuffer);
  };

  useEffect(() => {
    if (onRegurgitationChange) {
      onRegurgitationChange(regurgitation);
    }
  }, [regurgitation]);

  useEffect(() => {
    setRegurgitation(overideRegurgitation || []);
  }, [overideRegurgitation]);

  return (
    <>
      {target.map((targetChunk: string, index: number) => {
        const id = `target_chunk_${index}`;
        return (
          <div key={index} className="reg_core_item_map">
            <label htmlFor={id}>Please regurgitate the following text</label>
            <p>{targetChunk}</p>
            <textarea
              style={{
                width: "100%",
              }}
              id={id}
              onChange={(e) => {
                safeSetRegurgitation(index, e.target.value);
              }}
              defaultValue={regurgitation[index]}
            />
          </div>
        );
      })}
      {children}
      <textarea
        className="regurgitator_output"
        defaultValue={regurgitation.join(". ")}
        rows={4}
        readOnly={false}
      />
    </>
  );
}
