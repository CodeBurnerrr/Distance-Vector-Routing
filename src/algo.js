// JavaScript program to find single source shortest path Using Bellman
// -Ford algorithm

function bellmanFord(V, edges, src) {
  // Initially distance from source to all
  // other vertices is not known(Infinite).
  let dist = new Array(V).fill(1e8);
  dist[src] = 0;

  // Relaxation of all the edges V times, not (V - 1) as we
  // need one additional relaxation to detect negative cycle
  for (let i = 0; i < V; i++) {
    for (let edge of edges) {
      let u = edge[0];
      let v = edge[1];
      let wt = edge[2];
      if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
        // If this is the Vth relaxation, then there is
        // a negative cycle
        if (i === V - 1) return [-1];

        // Update shortest distance to node v
        dist[v] = dist[u] + wt;
      }
    }
  }

  return dist;
}

let V = 5;
let edges = [
  [1, 3, 2],
  [4, 3, 1],
  [2, 4, 1],
  [1, 2, 1],
  [0, 1, 5],
];

let src = 0;
let ans = bellmanFord(V, edges, src);
console.log(ans.join(" "));
