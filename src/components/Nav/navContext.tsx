import { createContext, useEffect, useState } from "react";

const navContext = createContext<any>(null);
export default navContext;

export function NavProvider({ children }: any) {
  const [extend, setExtend] = useState<boolean>(false);

  useEffect(() => {
    if (extend) document.querySelector(".body")?.classList.add(`nav_extended`);
    else document.querySelector(".body")?.classList.remove(`nav_extended`);
  }, [extend]);
  return (
    <navContext.Provider value={{ extend, setExtend }}>
      {children}
    </navContext.Provider>
  );
}
