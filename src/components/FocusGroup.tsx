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
    setActiveElement(elements[0].el);
  }, []);

  return (
    <FocusGroupContext.Provider value={{ activeElement }}>
      <Collection ref={collectionRef}>{children}</Collection>{" "}
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
      ref={setRef}
      as="button"
      tabIndex={isActive ? 0 : -1}
    >
      {props.children}
    </CollectionItem>
  );
};
