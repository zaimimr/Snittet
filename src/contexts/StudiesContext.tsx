import * as React from "react";
import { IStudies } from "utils/types";

type Context = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSetStudies: any;
};

const StudyContext = React.createContext<Context>({
  // eslint-disable-next-line
  useSetStudies: [[], () => {}],
});

export const useSetStudies = () => React.useContext(StudyContext).useSetStudies;

export function StudieProvider({ children }: { children: React.ReactNode }) {
  const [studies, setStudiesState] = React.useState<IStudies[]>([]);

  const setStudies = (studies: IStudies[]) => {
    localStorage.setItem("studies", JSON.stringify(studies))

    setStudiesState(studies)
  }

  const studyContext = {
    useSetStudies: [studies, setStudies],
  };

  return (
    <StudyContext.Provider value={studyContext}>
      {children}
    </StudyContext.Provider>
  );
}
