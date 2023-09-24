import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import { setDragging, setPosition, setSelected } from '../store/slices/common';
import { setNodes } from '../store/slices/blockchain';

import agent from '../agent';

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
        linkColor={(n: any) => '#252525'}
        enableNodeDrag={false}
      />
    </>
  );
}

export default InfiniteStage;
