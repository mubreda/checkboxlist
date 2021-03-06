import React from 'react';

import { nodeHasChildren, allChildrensAreSelected, someChildrensAreSelected } from '../helpers/tree';

const TreeContext = React.createContext();

export const TreeContextProvider = ({ children }) => {
  const [selectedNodes, setSelectedNodes] = React.useState({});

  React.useEffect(() => {
    setSelectedNodes(JSON.parse(localStorage.getItem('selectedNodes')));
  }, []);

  const changeNode = (node, parent, status) => {
    let nodes = { ...selectedNodes };

    const nodeHasBeenSelected = status === 'selected';
    const nodeHasParent = node.level > 0;

    nodeHasBeenSelected
      ? nodes = { ...nodes, [node.id]: { ...node, status: 'selected' } }
      : delete nodes[node.id];

    if (nodeHasChildren(node)) {
      Object.values(node.children).forEach((children) => {
        nodes = {
          ...nodes,
          [children.id]: { ...children, status },
        };
      });
    }

    if (nodeHasParent) {
      const parentStatus = allChildrensAreSelected(parent.children, { ...nodes })
        ? 'selected'
        : someChildrensAreSelected(parent.children, { ...nodes })
          ? 'halfselected'
          : 'unselected';

      nodes = {
        ...nodes,
        [parent.id]: { ...parent, status: parentStatus },
      };
    }

    setSelectedNodes({ ...nodes });
    localStorage.setItem('selectedNodes', JSON.stringify({ ...nodes }));
  };

  return (
    <TreeContext.Provider value={{ selectedNodes, changeNode }}>
      { children }
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const context = React.useContext(TreeContext);
  const { selectedNodes, changeNode } = context;

  return { selectedNodes, changeNode };
};
