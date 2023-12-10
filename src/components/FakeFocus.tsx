import React, { useState, useEffect, createContext, useContext } from "react";
import { Collection, CollectionItem } from "./Collection";
import { ComponentProps } from "react";

const FakeFocusContext = createContext(null);

export function FakeFocus({children}){

    const [inputRef, setInputRef] = useState(null);
    const [collectionItemRef, setCollectionItemRef] = useState(null);

    useEffect(() => {
        if (!inputRef) return;
    
        const handleKeyDown = (event) => {

            console.log(collectionItemRef);
            
          if (event.code === "ArrowUp" || event.code === "ArrowDown") {
            // move fake focus
    
            if (!collectionItemRef) return;

            
            event.preventDefault();
          }
        };
    
        inputRef.addEventListener("keydown", handleKeyDown);
        return () => inputRef.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inputRef]);

    return (
        <FakeFocusContext.Provider value={{inputRef, setInputRef, collectionItemRef, setCollectionItemRef}}>
            {children}
        </FakeFocusContext.Provider>
    )
}

export function FakeFocusInput(props){
    const context = useContext(FakeFocusContext);
    
    if(!context) throw new Error("You may not pass.You must use FakeFocusInput within a FakeFocus.");

    const {setInputRef} = context;

    return <input ref={setInputRef} {...props} />
}


export const FakeFocusList = (props) => {
  
    const context = useContext(FakeFocusContext);
    
  
    if (!context) throw new Error("You may not pass. You must use FakeFocusList within a FakeFocus.");

    const { setCollectionItemRef } = context;

    return <Collection 
        ref={setCollectionItemRef} 
        {...props} 
        />;
};

export function FakeFocusListItem(props) {
    const [ref, setRef] = useState(null);
    
    return <CollectionItem
    setRef={setRef}
    {...props} 
     ref={ref}
     />;
}