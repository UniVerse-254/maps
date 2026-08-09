import type { Coordinates, RoutingGraph } from "../types";

// Haversine distance between two raw coordinates in meters
function haversineMeters(a: Coordinates, b: Coordinates): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

// Find the closest graph node to an arbitrary GPS coordinate
function getNearestNode(
  target: Coordinates,
  graph: RoutingGraph,
): string | null {
  let nearestId: string | null = null;
  let minDistance = Infinity;

  for (const [nodeId, data] of Object.entries(graph)) {
    const dist = haversineMeters(target, data.coords);
    if (dist < minDistance) {
      minDistance = dist;
      nearestId = nodeId;
    }
  }

  return nearestId;
}

export function findShortestPath(
  startPoint: Coordinates,
  endPoint: Coordinates,
  graph: RoutingGraph,
): Coordinates[] {
  const startNode = getNearestNode(startPoint, graph);
  const endNode = getNearestNode(endPoint, graph);

  if (!startNode || !endNode) return [startPoint, endPoint]; // Fallback to straight line

  // If they snap to the exact same node, just draw a straight line
  if (startNode === endNode) return [startPoint, endPoint];

  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  for (const nodeId of Object.keys(graph)) {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    unvisited.add(nodeId);
  }

  distances[startNode] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with the smallest known distance
    let currentNode: string | null = null;
    let shortestDist = Infinity;

    for (const nodeId of unvisited) {
      const nodeDist = distances[nodeId];
      if (nodeDist !== undefined && nodeDist < shortestDist) {
        shortestDist = nodeDist;
        currentNode = nodeId;
      }
    }

    // If no reachable nodes are left, or we've reached the target, stop.
    if (currentNode === null || currentNode === endNode) break;

    unvisited.delete(currentNode);

    // Evaluate neighbors
    const currentNodeData = graph[currentNode];
    if (!currentNodeData) continue;

    const currentDistance = distances[currentNode];
    if (currentDistance === undefined) continue;

    const neighbors = currentNodeData.neighbors;
    for (const [neighborId, weight] of Object.entries(neighbors)) {
      if (!unvisited.has(neighborId)) continue; // Already processed

      const currentNeighborDist = distances[neighborId];
      if (currentNeighborDist === undefined) continue;

      const newDist = currentDistance + weight;
      if (newDist < currentNeighborDist) {
        distances[neighborId] = newDist;
        previous[neighborId] = currentNode;
      }
    }
  }

  const pathNodes: string[] = [];
  let curr: string | null = endNode;

  // If no path was found (e.g. disconnected graph), fallback to straight line
  if (previous[curr] === null) return [startPoint, endPoint];

  while (curr !== null) {
    pathNodes.unshift(curr); // Push to front
    const prevNode: string | null = previous[curr] ?? null;
    curr = prevNode;
  }

  const finalCoordinates: Coordinates[] = [startPoint];
  for (const nodeId of pathNodes) {
    const nodeData = graph[nodeId];
    if (nodeData) {
      finalCoordinates.push(nodeData.coords);
    }
  }
  finalCoordinates.push(endPoint);

  return finalCoordinates;
}
