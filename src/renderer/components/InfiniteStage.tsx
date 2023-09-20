import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Stage, Layer, Rect, Circle, Line } from 'react-konva';

import { setDragging, setPosition } from '../store/slices/common';

function InfiniteStage() {
  const dispatch = useDispatch();

  const WIDTH = 90;
  const HEIGHT = 90;

  const grid = [
    ['#1A1A1A', '#1A1A1A'],
    ['#1A1A1A', '#1A1A1A'],
  ];

  const [DANGER, SUSPICIOUS, SAFE] = ['#BC3326', '#CE762A', '#9ABB53'];

  const [nodes, setNodes] = React.useState([
    {
      id: 1,
      x: 0,
      y: 0,
      color: DANGER,
      transactions: [{ to: 3 }, { to: 2 }],
    },
    {
      id: 4,
      x: 300,
      y: 100,
      color: SAFE,
      transactions: [{ to: 3 }, { to: 2 }],
    },
    {
      id: 2,
      x: 200,
      y: -200,
      color: SUSPICIOUS,
      transactions: [{ to: 4 }, { to: 3 }],
    },
    {
      id: 3,
      x: 100,
      y: 200,
      color: SAFE,
      transactions: [{ to: 1 }, { to: 3 }],
    },
  ]);

  const [stagePos, setStagePos] = React.useState(
    useSelector((state: any) => {
      return state.common.canvas;
    }),
  );

  const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
  const endX =
    Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  const gridComponents: any = [];
  var i = 0;
  for (var x = startX; x < endX; x += WIDTH) {
    for (var y = startY; y < endY; y += HEIGHT) {
      if (i === 4) {
        i = 0;
      }

      const indexX = Math.abs(x / WIDTH) % grid.length;
      const indexY = Math.abs(y / HEIGHT) % grid[0].length;

      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill={grid[indexX][indexY]}
          stroke="#393939"
          strokeWidth={4}
        />,
      );
    }
  }

  const lines: any = [];
  nodes.map((node) => {
    node.transactions.map((transaction) => {
      const toNode = nodes.find((n) => n.id === transaction.to);

      if (toNode) {
        lines.push(
          <Line
            key={`${node.id}-${toNode.id}`}
            points={[node.x, node.y, toNode.x, toNode.y]}
            closed={true}
            strokeLinearGradientStartPoint={{ x: node.x, y: node.y }} // Start point of the gradient
            strokeLinearGradientEndPoint={{ x: toNode.x, y: toNode.y }} // End point of the gradient
            strokeLinearGradientColorStops={[0, node.color, 1, toNode.color]} // Gradient color stops
            stroke="white"
            strokeWidth={3}
            strokePriority="strokeLinearGradientColorStops"
          />,
        );
      } else {
        return null;
      }
    });
  });

  React.useEffect(() => {
    dispatch(setPosition({ x: stagePos.x, y: stagePos.y }));
    dispatch(setDragging(stagePos.dragging));
  }, [stagePos]);

  return (
    <Stage
      x={stagePos.x}
      y={stagePos.y}
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onDragStart={(e) => {
        setStagePos({ ...e.currentTarget.position(), dragging: true });
      }}
      onDragEnd={(e) => {
        setStagePos({ ...e.currentTarget.position(), dragging: false });
      }}
    >
      <Layer>{gridComponents}</Layer>
      <Layer>{lines}</Layer>
      <Layer>
        {nodes.map((node: any) => (
          <Circle
            x={node.x}
            y={node.y}
            width={50}
            height={50}
            fill={node.color}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default InfiniteStage;
