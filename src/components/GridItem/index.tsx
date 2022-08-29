import React from "react";
import { GridItemType } from "../../types/GridItemsType";
import b7svg from "../../assets/svgs/b7.svg";
import * as C from "./styles";
import items from "../../data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container showBackground={item.permanentShow || item.show} onClick={onClick}>
      {item.permanentShow === false && item.show === false && (
        <C.Icon src={b7svg} alt="" opacity={.1} />
      )}

      {(item.permanentShow || item.show) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt="" />
      )}
    </C.Container>
  );
};

export default GridItem;
