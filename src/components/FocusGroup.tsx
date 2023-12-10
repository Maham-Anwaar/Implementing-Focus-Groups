import {
  ComponentProps,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Collection, CollectionItem } from "./Collection";

const FocusGroupContext = createContext<{ activeElement?: HTMLElement } | null>(
  null
);

export const FocusGroup = ({ children }: { children?: ReactNode }) => {
  const collectionRef = useRef<any>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement | undefined>(
    undefined
  );

  useEffect(() => {
    const elements = collectionRef.current.getElements();
    console.log('>> Elements', elements)
    setActiveElement(elements[0].el);
  }, []);

  // useEffect(() => {
  //   console.log(">> Elements", collectionRef.current.getElements());
  //   collectionRef.current
  //     .getElements()
  //     .slice(1)
  //     .array.forEach((e: HTMLElement) => {
  //       e.setAttribute("tabindex", "-1");
  //     });
  // }, []);

  return (
    <FocusGroupContext.Provider value={{ activeElement }}>
      <Collection ref={collectionRef}>
        <div
          onKeyDown={(event) => {
            if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
              const elements = collectionRef.current.getElements();

              // from elements find index of element where tab index in 0



              const currFocusIdx = elements.findIndex((e) =>
                ["0"].includes(e.el.getAttribute("tabIndex"))              
              );
              const nextFocusIdx = event.code === "ArrowRight" ? 1 : -1;
              
              elements[currFocusIdx + nextFocusIdx].el.tabIndex = 5;
              elements[currFocusIdx].el.tabIndex = 7;
            }
          }}
        >
          {children}
        </div>
      
      </Collection>{" "}
    </FocusGroupContext.Provider>
  );
};

export const FocusItem = (props: ComponentProps<"button">) => {
  const { activeElement } = useContext(FocusGroupContext);
  const [ref, setRef] = useState<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref) return;

    if (ref === activeElement) {
      ref.focus();
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeElement, ref]);

  return (
    <CollectionItem
      {...props}
      setRef={setRef}
      as="button"
      // tabIndex={isActive ? 0 : -1}
    >
      {props.children}
    </CollectionItem>
  );
};
