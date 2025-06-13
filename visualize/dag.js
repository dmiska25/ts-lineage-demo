fetch("./edges.json")
  .then((res) => res.json())
  .then((edges) => {
    const nodesSet = new Set();
    const parents = new Set();
    const elements = [];

    edges.forEach(({ from, to }) => {
      const fromParts = from.split(".");
      const toParts = to.split(".");

      const fromParent = fromParts[0];
      const toParent = toParts[0];

      parents.add(fromParent);
      parents.add(toParent);

      nodesSet.add(from);
      nodesSet.add(to);

      elements.push({
        data: {
          id: from + "->" + to,
          source: from,
          target: to,
        },
      });
    });

    parents.forEach((parentId) => {
      elements.push({ data: { id: parentId, label: parentId } });
    });

    nodesSet.forEach((nodeId) => {
      const parent = nodeId.split(".")[0];
      elements.push({
        data: { id: nodeId, parent },
      });
    });

    cytoscape({
      container: document.getElementById("cy"),
      elements,
      layout: { name: "breadthfirst" },
      style: [
        {
          selector: "node",
          style: {
            content: "data(id)",
            "text-valign": "center",
            "background-color": "#88f",
            color: "#fff",
            "text-outline-color": "#000",
            "text-outline-width": 1,
          },
        },
        {
          selector: "node[parent]",
          style: {
            "background-opacity": 0.9,
            "text-valign": "top",
            shape: "roundrectangle",
            "background-color": "#444",
            "font-size": "10px",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
          },
        },
      ],
    });
  });
