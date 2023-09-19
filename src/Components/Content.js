
import React, { useState } from 'react';
import { ItemTypes } from './ItemTypes';
import { useDrop } from 'react-dnd';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import RGL, { WidthProvider } from "react-grid-layout";
//  import css -- IMP!!!
import '../../node_modules/react-grid-layout/css/styles.css';

import './Content.css';

const ReactGridLayout = WidthProvider(RGL);

const Content = (props) => {
  const [row, setRow] = useState([]);

  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    { i: '4', x: 3, y: 0, w: 1, h: 1 },
    { i: '5', x: 4, y: 0, w: 1, h: 1 },
    { i: '6', x: 5, y: 0, w: 1, h: 1 },

  ]);
  const [resizeplotly, setResizePlotly] = useState(false);

  const onLayoutChange = (layout) => {

  };

  const onResize = (layouts) => {

  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const itemsInCurrentRow = layout.filter(item => item.y === 0);

      if (itemsInCurrentRow.length < 12) {
        const nextX = itemsInCurrentRow.length;
        setRow(old => {
          props.change([...old, { name: item.name, id: item.id }]);
          return ([...old, { name: item.name, id: item.id }]);
        });
        setLayout(oldLayout => [
          ...oldLayout,
          {
            i: item.id,
            x: nextX,
            y: 0,
            w: 1,
            h: 1,

          },
        ]);
      } else {
        alert("La fila está llena, no se pueden agregar más elementos horizontalmente.");
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div>
      <div ref={drop} style={{ height: "400" }}>
        <ReactGridLayout
          compactType="horizontal"
          cols={6} // Una sola fila y seis columnas

          layout={layout}

          onLayoutChange={onLayoutChange}
          draggableCancel=".MyDragCancel"
          isBounded={true}
        >
          {row.length !== 0
            ? row.map((ele, index) => {
              console.log(index);
              return (
                <div key={index + 1}>
                  {ele.name === "Line" ? (
                    <LineChart factor={index + 1}></LineChart>
                  ) : ele.name === "Bar" ? (
                    <BarChart></BarChart>
                  ) : (
                    <PieChart></PieChart>
                  )}
                </div>
              );
            })
            : <div style={{ height:"  200"  }}></div>}
        </ReactGridLayout>
      </div>
    </div>
  );
}

export default Content;