import { useEffect, useState } from "react";

import logoIMage from "./assets/devmemory_logo.png";
import RestartIcon from "./assets/svgs/restart.svg";
import InfoItem from "./components/InfoItem/index";
import Btn from "./components/Btn/";
import GridItem from "./components/GridItem";

import items from "./data/items";
import { GridItemType } from "./types/GridItemsType";
import * as C from "./Styles/AppStyle";
import formatTimeElapsed from "./helpers/formatTimeElapsed";

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(
    () => resetAndCreateGrid(),

    []
  );

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((items) => items.show === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].show) {
              tmpGrid[i].permanentShow = true;
              tmpGrid[i].show = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].show = false;
            }
            setGridItems(tmpGrid);
            setShowCount(0);
          }, 1000);
        }
        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShow === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItems(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];
      if (
        tmpGrid[index].permanentShow === false &&
        tmpGrid[index].show === false
      ) {
        tmpGrid[index].show = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  return (
    <C.Container className="App">
      <C.Info>
        <C.LogoLink href="">
          <img src={logoIMage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Btn
          label="Reiniciar "
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, i) => (
            <GridItem key={i} item={item} onClick={() => handleItemClick(i)} />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
