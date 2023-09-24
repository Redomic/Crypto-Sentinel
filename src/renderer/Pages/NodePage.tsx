import React from 'react';
import NodeInformation from '../components/NodeInformation';
import agent from '../agent';
import { useParams } from 'react-router-dom';

const NodePage = () => {
  const id: any = useParams().id;
  React.useEffect(() => {
    agent.blockchain
      .getNode(id)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <NodeInformation />
      <h5>Hh</h5>
    </>
  );
};

export default NodePage;
