import {
  ComponentProps,
  createContext,
  ReactNode,
  RefObject,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  useContext,
  ElementType,
  forwardRef,
} from "react";

interface CollectionProps {
  addElement: (ref: RefObject<HTMLElement>, data: any) => void;
  removeElement: (ref: RefObject<HTMLElement>) => void;
}

const CollectionContext = createContext<CollectionProps | null>(null);

const RANDOM_ATTRIBUTE = "data-key-is-h765tJG";

export const Collection = forwardRef<unknown, { children: ReactNode[] }>(
  ({ children }, ref) => {
    const elementSet = useRef(new Set<{ el: HTMLElement; data: any }>());

    const api = useMemo(
      () =>
        ({
          addElement: (ref: RefObject<HTMLElement>, data: any) => {
            elementSet.current.add({ el: ref.current!, data });
          },
          removeElement: (ref: RefObject<HTMLElement>) => {
            elementSet.current.delete({ el: ref.current!, data: null });
          },
        } as CollectionProps),
      []
    );

    useImperativeHandle(ref, () => ({
      getElements: () => {
        const orderedElements = Array.from(
          document.querySelectorAll(`[${RANDOM_ATTRIBUTE}]`)
        );

        return Array.from(elementSet.current).sort(
          (a, b) =>
            orderedElements.indexOf(a.el) - orderedElements.indexOf(b.el)
        );
      },
    }));

    return (
      <CollectionContext.Provider value={api}>
        {children}
      </CollectionContext.Provider>
    );
  }
);

export function CollectionItem<E extends ElementType>(
  props: ComponentProps<E> & { as?: E; data: any }
) {
  const collectionApi = useContext(CollectionContext);
  const itemRef = useRef<HTMLDivElement>(null);

  if (!collectionApi)
    throw new Error("CollectionItem must be used within Collection");

  const { addElement, removeElement } = collectionApi;

  const { as: Element = "div", ...restProps } = props;

  useEffect(() => {

    restProps?.setRef(itemRef.current)

    addElement(itemRef, restProps.data);
    return () => removeElement(itemRef);

  }, []);

  return <Element ref=
  {itemRef} 
  {...restProps} 
  {...{ [RANDOM_ATTRIBUTE]: true }}
  />;
}
