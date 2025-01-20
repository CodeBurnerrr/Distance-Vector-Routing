import { useState } from "react";

function App() {
  const [nodeCount, setNodeCount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const handleNodeCountSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(nodeCount, 10);

    if (count > 1) {
      setErrorMessage("");
      console.log(`Number of nodes: ${count}`);
      setCheck1(false);
      setCheck2(true);
    } else {
      setErrorMessage("Please enter a valid number of nodes. (>1)");
    }
  };

  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [weight, setWeight] = useState("");
  const [edgeDetails, setEdgeDetails] = useState([]);
  const [mapEdgeDetails, setMapEdgeDetails] = useState([]);

  const handleEdgeDetails = () => {
    const totalPossibleEdges = (nodeCount * (nodeCount - 1)) / 2;

    if (mapEdgeDetails.length >= totalPossibleEdges) {
      setErrorMessage("Max possible edges reached");
      return;
    }

    if (!node1 || !node2 || !weight) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (parseInt(node1, 10) < 0 || parseInt(node2, 10) < 0) {
      setErrorMessage("Please enter a valid positive number for Node");
      return;
    }

    if (weight < 0) {
      setErrorMessage("Negative weights not allowed");
      return;
    }

    setErrorMessage("");

    const newEdge = [
      parseInt(node1, 10),
      parseInt(node2, 10),
      parseInt(weight, 10),
    ];

    const reverseEdge = [
      parseInt(node2, 10),
      parseInt(node1, 10),
      parseInt(weight, 10),
    ];

    setMapEdgeDetails([...mapEdgeDetails, newEdge]);

    setEdgeDetails([...edgeDetails, newEdge, reverseEdge]);

    setNode1("");
    setNode2("");
    setWeight("");

    console.log(edgeDetails);
  };

  const handleFirstBack = () => {
    setCheck2(false);
    setCheck1(true);
    setNode1("");
    setNode2("");
    setWeight("");
    setEdgeDetails([]);
    setMapEdgeDetails([]);
    setErrorMessage("");
  };

  const handleReset1 = () => {
    setNode1("");
    setNode2("");
    setWeight("");
    setEdgeDetails([]);
    setMapEdgeDetails([]);
    setErrorMessage("");
  };

  const handleNext = () => {
    setCheck2(false);
    setCheck3(true);
  };

  const [source, setSource] = useState();
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Bellman ford algorithm

  const handleCalculate = async () => {
    let dist = new Array(parseInt(nodeCount, 10)).fill(1e8);
    console.log(dist);
    dist[source] = 0;

    for (let i = 0; i < nodeCount; i++) {
      setCount((prevCount) => prevCount + 1);
      for (let edge of edgeDetails) {
        let u = edge[0];
        let v = edge[1];
        let wt = edge[2];
        if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
          if (i === nodeCount - 1) return [-1];

          dist[v] = dist[u] + wt;
        }
      }

      setResult([...dist]);
      await sleep(2000);
    }

    console.log(dist);

    setResult(dist);
  };

  const handleSecondBack = () => {
    setCheck2(true);
    setCheck3(false);
    setSource("");
    setResult([]);
  };

  const handleReset2 = () => {
    setSource("");
    setResult([]);
    setCount(0);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col sm:flex-row">
      {check1 && (
        <>
          <div className="h-3/2 sm:w-1/2 sm:h-screen bg-blue-500 flex items-center justify-center text-white p-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">
                Distance vector routing
              </h1>
              <p className="text-lg">
                This app uses the Bellman-Ford algorithm to determine the
                shortest path for data packets between nodes in a network. To
                begin, you'll input the number of nodes in your network to start
                the routing process.
              </p>
            </div>
          </div>

          <div className="h-1/2 sm:w-1/2 sm:h-screen flex items-center justify-center p-10">
            <form
              onSubmit={handleNodeCountSubmit}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-96"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                Graph Nodes Input
              </h1>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                How many nodes are there?
              </label>
              <input
                type="number"
                value={nodeCount}
                onChange={(e) => setNodeCount(e.target.value)}
                className="border border-gray-300 px-4 py-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of nodes"
                required
              />

              {errorMessage && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
              )}
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      {check2 && (
        <>
          <button
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-800 transition duration-300 shadow-lg"
            style={{ zIndex: 500 }}
            onClick={handleReset1}
          >
            Reset
          </button>
          <div className="relative h-3/6 sm:w-1/2 sm:h-screen flex items-center justify-center bg-blue-500">
            <button
              className="absolute top-4 left-4 bg-white text-black py-2 px-6 rounded-lg hover:bg-gray transition duration-300"
              onClick={handleFirstBack}
            >
              Back
            </button>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full sm:m-[90px] m-[20px] mt-[130px] ">
              <h1 className="text-2xl font-semibold  mb-2 sm:mb-4 text-center text-gray-800">
                Give Edge details
              </h1>

              <div className="flex items-center justify-center gap-4 mt-4 sm:mb-6 sm:mt-8 ">
                <input
                  type="text"
                  value={node1}
                  onChange={(e) => setNode1(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-1/6 sm:w-1/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder="Node 1"
                  required
                />
                <div className="text-2xl font-bold text-gray-600">
                  &lt;--&gt;
                </div>
                <input
                  type="text"
                  value={node2}
                  onChange={(e) => setNode2(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-1/6 sm:w-1/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder="Node 2"
                  required
                />
                <div className="text-2xl font-bold text-gray-600">=</div>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-1/6 sm:w-1/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder="Weight"
                  required
                />
              </div>
              {errorMessage && (
                <div className="flex justify-center">
                  <span className="text-red-500 text-sm">{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-center mt-4 sm:mt-8">
                <button
                  type="submit"
                  onClick={handleEdgeDetails}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="h-1/2 sm:w-1/2 sm:h-full bg-white-600 flex items-center justify-center text-white p-10 ">
            <div className="overflow-x-auto overflow-y-auto bg-white p-6 rounded-lg shadow-lg w-full h-full sm:max-h-[500px] ">
              <table className="w-full table-auto text-sm border-separate border-spacing-2 ">
                <thead>
                  <tr className="bg-blue-500 text-white rounded-md">
                    <th className="py-3 px-4 text-center rounded-tl-lg">
                      Node 1
                    </th>
                    <th className="py-3 px-4 text-center">Node 2</th>
                    <th className="py-3 px-4 text-center rounded-tr-lg">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mapEdgeDetails.map((edge, index) => (
                    <tr key={index} className="hover:bg-blue-100 text-black">
                      <td className="py-3 px-4 bg-blue-50 rounded-lg text-center">
                        {edge[0]}
                      </td>
                      <td className="py-3 px-4 bg-blue-50 rounded-lg text-center">
                        {edge[1]}
                      </td>
                      <td className="py-3 px-4 bg-blue-50 rounded-lg text-center">
                        {edge[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="absolute top-4 right-4 sm:bg-blue-500 bg-white sm:text-white text-black py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {check3 && (
        <>
          <button
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-800 transition duration-300 shadow-lg"
            style={{ zIndex: 500 }}
            onClick={handleReset2}
          >
            Reset
          </button>
          <div className="relative h-3/6 sm:w-1/2 sm:h-screen flex items-center justify-center h-screen bg-blue-500">
            <button
              className="absolute top-4 left-4 bg-white text-black py-2 px-6 rounded-lg hover:bg-gray transition duration-300"
              onClick={handleSecondBack}
            >
              Back
            </button>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full sm:m-[90px] m-[20px] mt-[130px]">
              <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                Enter the source node
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6 mt-4 sm:mt-8">
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="border border-gray-300 px-4 py-2 w-1/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  placeholder="Source"
                  required
                />
              </div>
              {errorMessage && (
                <div className="flex justify-center">
                  <span className="text-red-500 text-sm">{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-center mt-4 sm:mt-8">
                <button
                  type="submit"
                  onClick={handleCalculate}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Calcuate
                </button>
              </div>
            </div>
          </div>

          <div className="h-1/2 sm:w-1/2 sm:h-full bg-white-600 flex items-center justify-center text-white p-10 ">
            <div className=" overflow-x-auto overflow-y-auto bg-white p-6 rounded-lg shadow-lg w-full h-full sm:max-h-[500px]">
              <div className="flex justify-center">
                <span className="text-black text-lg">
                  Minimum distance from Node {source}
                </span>
              </div>
              <div className="flex justify-center">
                <span className="text-black text-lg">Iteration {count}</span>
              </div>
              <table className="w-full table-auto text-sm border-separate border-spacing-2">
                <thead>
                  <tr className="bg-blue-500 text-white rounded-md">
                    <th className="py-3 px-4 text-center rounded-tl-lg">
                      Node
                    </th>

                    <th className="py-3 px-4 text-center rounded-tr-lg">
                      Minimum Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((result, index) => (
                    <tr key={index} className="hover:bg-blue-100 text-black">
                      <td className="py-3 px-4 bg-blue-50 rounded-lg text-center">
                        {index}
                      </td>
                      <td className="py-3 px-4 bg-blue-50 rounded-lg text-center">
                        {result == 100000000 ? "∞" : result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
