import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3-force';

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import { setDragging, setPosition, setSelected } from '../store/slices/common';
import { setNodes } from '../store/slices/blockchain';

import agent from '../agent';

const WIDTH = 90;
const HEIGHT = 90;

const grid = [
  ['#1A1A1A', '#1A1A1A'],
  ['#1A1A1A', '#1A1A1A'],
];

const [CRIMINAL, SUSPICIOUS, NORMAL, OFFICIAL] = [
  '#BC3326',
  '#CE762A',
  '#9ABB53',
  '#0070D8',
];

function InfiniteStage() {
  const blockchain = useSelector((state: any) => state.blockchain);
  const stagePos = useSelector((state: any) => state.common.canvas);

  const blockchainClone = structuredClone(blockchain);

  const dispatch = useDispatch();

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

  const nodeColorHandler = (n: any): string => {
    if (n.flag === 'Normal') {
      if (n.rating >= 8.0) {
        return NORMAL;
      } else {
        return SUSPICIOUS;
      }
    } else if (n.flag === 'Criminal') {
      return CRIMINAL;
    } else if (n.flag === 'Official') {
      return OFFICIAL;
    } else {
      return NORMAL;
    }
  };

  const linkColorHandler = (link: any): string => {
    // console.log(link);
    if (link.source.flag === 'Normal') {
      if (link.source.rating >= 8.0) {
        return NORMAL;
      } else {
        return SUSPICIOUS;
      }
    } else if (link.source.flag === 'Criminal') {
      return CRIMINAL;
    } else if (link.source.flag === 'Official') {
      return OFFICIAL;
    } else {
      return NORMAL;
    }
  };

  const nodeOnClickHanlder = (node: any) => {
    const clone = JSON.parse(JSON.stringify(node));
    console.log('SELECTED NODE');
    console.log(clone);
    dispatch(setSelected(clone));
  };

  React.useEffect(() => {
    dispatch(setPosition({ x: stagePos.x, y: stagePos.y }));
    dispatch(setDragging(stagePos.dragging));
  }, [stagePos]);

  return (
    <>
      <ForceGraph2D
        graphData={blockchainClone}
        nodeColor={nodeColorHandler}
        onNodeClick={nodeOnClickHanlder}
        nodeRelSize={6}
        linkWidth={2}
        backgroundColor="#1a1a1a"
        linkColor={'#ced4da'}
        enableNodeDrag={false}
      />
    </>
  );
}

export default InfiniteStage;
