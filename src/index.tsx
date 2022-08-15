import React from "react";
import ReactDOM from "react-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Card } from "./card";
import "./globalStyles.css";
import "./hideScrollbar.css";
import "./firstItemMargin.css";
import "./lastItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const getId = (index: number) => `${index}`;
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (v, i) => start + i * step);

const getItems = () =>
  range(1990, 2022, 1).map((value) => ({ id: getId(value) }));

function App() {
  const [items] = React.useState(getItems);
  const [selectedItem, setSelectedItem] = React.useState("1990");

  const visibleItemsChangeHandler = (visibleItems) => {
    const maxValue = "2022";
    let middle = visibleItems[Math.floor(visibleItems.length / 2)];
    if (+middle > +maxValue) {
      middle = maxValue;
    }
    setSelectedItem(middle);
  };

  return (
    <>
      <div className="example" style={{ paddingTop: "100px" }}>
        <div style={{ margin: "10px", fontSize: "40px" }}>{selectedItem}</div>
        <div>
          <ScrollMenu onWheel={onWheel}>
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id}
                key={id}
                onChangeVisibleItems={visibleItemsChangeHandler}
                selectedItem={selectedItem}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
