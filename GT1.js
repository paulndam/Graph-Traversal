class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Adding a vertex
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // takes in a starting node or vertex
  depthFirstSearchRecursive(startingVertex) {
    // create a list to store the result and it will be returned at the end
    const result = [];
    // create object to store visited vertex or nodes
    const visited = {};
    const adjacencyList = this.adjacencyList;
    // create helper function that accepts a vertex .
    (function dfsHelper(vertex) {
      // helper function return in early stage if vertex list is empty
      if (!vertex) {
        return null;
      }
      // place the vertex into the visited object and push it into the result array
      visited[vertex] = true;
      result.push(vertex);
      //loop thru all the values in the adjacencyList for that vertex
      adjacencyList[vertex].forEach((neighbor) => {
        // if any of that value or vertex have not been visited, recursively invoke the function on them so that they should be visited.

        if (!visited[neighbor]) {
          return dfsHelper(neighbor);
        }
      });
    })(startingVertex);
    console.log(result);
    return result;
  }

  // function should accept a startingVertex or node
  depthFirstSearchIterative(startingVertex) {
    // create a stake to keep track of the vertex(use a list or array)
    const stack = [startingVertex];
    // create a list to store the end result, then return that list at the end.
    const result = [];
    //create object to store visited vertex
    const visited = {};
    // add starting vertex to stack and mark them as visited
    visited[startingVertex] = true;
    // whille stack got something in it
    while (stack.length) {
      console.log(stack);
      //take out or pop the vertex from the stack
      let currentVertexToPopOut = stack.pop();
      //add it to the result list
      result.push(currentVertexToPopOut);
      this.adjacencyList[currentVertexToPopOut].forEach((neighbor) => {
        //if the vertex have not yet been visited, then mark it as visited
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          // push all of it neighbors into the stack
          stack.push(neighbor);
        }
      });
    }
    //return the result array
    console.log(result);
    return result;
  }

  //accepts a startingVertex
  breadthFirstSearch(startingVertex) {
    // create a Queue and place the startingVertex in it.
    const queue = [startingVertex];
    // make array to store visited nodes .
    const visitedResult = [];
    // create object to store visited nodes or vertex .
    const visitedVertex = {};
    //mark the startingVertex as visited .
    visitedResult[startingVertex] = true;
    //loop as long as there is anyting in the queue
    while (queue.length) {
      //remove the first vertex from queue and push it into array that stores the visited node or vertex.
      let currentVertexToPopOut = queue.shift();
      visitedResult.push(currentVertexToPopOut);
      //loop thru each vertex in the adjacencyList for the vertex you are visiting
      this.adjacencyList[currentVertexToPopOut]
        .slice()
        .reverse()
        .forEach((neighbor) => {
          //if it's not in the object that stores visted nodes,then mark it as visited and enqueue that vertex.
          if (!visitedVertex[neighbor]) {
            //mark the startingVertex as visited .
            visitedVertex[neighbor] = true;
            // enqueue or push it to the queue
            queue.push(neighbor);
          }
        });
    }
    //retur the array of the visited nodes.
    console.log(visitedResult);
    return visitedResult;
  }
}

let g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

//   g.addVertex("lisbon");
//   g.addVertex("venice");
//   g.addVertex("rome");
//   g.addVertex("Boston");
//   g.addVertex("arlington");
console.log(g);

console.log("=========== Adding Edge ==========");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

//   g.addEdge("lisbon", "venice");
//   g.addEdge("lisbon", "rome");
//   g.addEdge("venice", "rome");
//   g.addEdge("arlington", "lisbon");
//   g.addEdge("arlington", "Boston");
console.log(g);

//   console.log("=========== Removiong Edge ==========");
//   //g.removeEdge("foumban", "rome");
//   //g.removeEdge("foumban", "london");
//   //console.log(g);

//   console.log("=========== Removiong Vertex ==========");
//   g.removeVertex("lisbon");
//   console.log(g);

console.log("=========== Depth First Search Recursive ==========");
g.depthFirstSearchRecursive("A");
console.log(g);

console.log("=========== Depth First Search Iterative ==========");
g.depthFirstSearchIterative("A");
console.log(g);

console.log("=========== Breadth First Search ==========");
g.breadthFirstSearch("A");
console.log(g);
