export const nodeHasChildren = (node) => node.children && Object.keys(node.children).length !== 0;

export const allChildrensAreSelected = (childrens, selectedNodes) => Object.values(childrens).every((children) => selectedNodes[children.id]?.status === 'selected');

export const someChildrensAreSelected = (childrens, selectedNodes) => Object.values(childrens).some((children) => selectedNodes[children.id]?.status === 'selected');
