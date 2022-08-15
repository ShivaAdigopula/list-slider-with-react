import React, { useEffect } from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({
  title,
  itemId,
  onChangeVisibleItems,
  selectedItem
}: {
  title: string;
  itemId: string;
  onChangeVisibleItems: (visibleItems) => void;
  selectedItem: string;
}) {
  const isDivisible = +itemId % 6 === 0;
  const visibility = React.useContext(VisibilityContext);
  const visibleItems = visibility.visibleItemsWithoutSeparators;

  useEffect(() => {
    onChangeVisibleItems(visibleItems);
  }, [visibleItems, onChangeVisibleItems]);

  return (
    <div
      role="button"
      style={{
        // border: "1px solid",
        display: "inline-block",
        margin: "0 10px",
        width: "30px",
        //height: "300px",
        userSelect: "none"
      }}
      tabIndex={0}
      className="card"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <div
          style={{
            width: "2px",
            height: isDivisible ? "40px" : "15px",
            backgroundColor: itemId === selectedItem ? "red" : "grey"
          }}
        ></div>
        {isDivisible && (
          <div style={{ height: "50%", color: "grey" }}>{itemId}</div>
        )}
      </div>
    </div>
  );
}
