import { createContext, ReactNode, useState } from "react";
import jsonData from '../epro.json';

interface EproInterface {
  name: string;
  img: string;
  isShowingChildren?: boolean;
  children?: EproInterface[];
}

interface EproStructureProps {
  data: EproInterface;
  first?: boolean;
}

interface EproContextData {
  data: EproInterface;
  changeIsShowingChildren: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface EproProviderProps {
  children: ReactNode;
}

export const EproContext = createContext({} as EproContextData);

export function EproProvider ( { children }: EproProviderProps ){
  const [data, setData] = useState(jsonData);

  function changeIsShowingChildren(event: React.MouseEvent<HTMLElement, MouseEvent>){
    const buttonKey = (event.target as HTMLButtonElement).getAttribute('data-key');
    let isChanged = false;
    do{
      if(data.name == buttonKey){
        setData({ ...data, isShowingChildren: !data.isShowingChildren});
        isChanged = true;
      } else {
        
      }
    } while(!isChanged);
    
    console.log(data);
  }

  return(
    <EproContext.Provider value={{
      data,
      changeIsShowingChildren
    }}>
      {children}
    </EproContext.Provider>
  );

}