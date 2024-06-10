import { useLoaderData } from "react-router-dom";

const PastSets = () => {
  const sets = useLoaderData();
  return <div>{sets.map((set) => <div key={set.id}>{set.id}</div>)}</div>;
};

export default PastSets;
