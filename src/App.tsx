import { FocusGroup, FocusItem } from "./components/FocusGroup";
import { FakeFocus, FakeFocusInput, FakeFocusListItem, FakeFocusList} from "./components/FakeFocus";

function App() {
  return (
    <>
      {/* <button>Get Items</button> */}
      {/* <FocusGroup> */}
        {/* <FocusItem>1</FocusItem> */}
        {/* <FocusItem>2</FocusItem> */}
        {/* <FocusItem>3</FocusItem>
        <FocusItem>4</FocusItem>
        <FocusItem>5</FocusItem> */}
      {/* </FocusGroup> */}
      {/* <button>State 1</button> */}
      {/* <button>State 2</button> */}
    
    
    <FakeFocus>
      <FakeFocusInput />

      <FakeFocusList>
        <FakeFocusListItem>1</FakeFocusListItem>
        <FakeFocusListItem>2</FakeFocusListItem>
        <FakeFocusListItem>3</FakeFocusListItem>
      </FakeFocusList>
    </FakeFocus>
    
    </>


  );
}

export default App;
