import React from 'react';
import styled from 'styled-components';
import ArrowIcon from '../../icons/ArrowIcon';
import Checkbox from '../Checkbox';
import { useTreeContext } from '../../context/tree';


const Tree = {
  Body: styled.div`
    height: 100%;
    cursor: pointer;
`,

  Expandable: styled.div`
    display: flex;
    height: 50px;
    &:hover{ background-color: #dbdbe3;};
`,

  Leftside: styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
`,

  Checkboxarea: styled.div`
    margin: 0 20px 0 20px;
`,

  Rightside: styled.div`
    width: 20%;
    max-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`,

  Childrens: styled.div`
    transition: 0.5s;
`,
};

export default function TreeItem({ node, parent }) {
  const { selectedNodes, changeNode } = useTreeContext();
  const [childrensOpen, setChildrensOpen] = React.useState(false);
  const [checkboxStatus, setCheckboxStatus] = React.useState('unselected');
  const childrenIsEmpty = node.children && Object.keys(node.children).length === 0;

  const toggleChildrensOpen = React.useCallback(() => {
    let childrensOpenIds = JSON.parse(localStorage.getItem('childrensOpenIds')) || [];
    if (childrensOpen) {
      childrensOpenIds = childrensOpenIds.filter((id) => id !== node.id);
      localStorage.setItem('childrensOpenIds', JSON.stringify(childrensOpenIds));
    } else {
      childrensOpenIds.push(node.id);
      localStorage.setItem('childrensOpenIds', JSON.stringify(childrensOpenIds));
    }
    setChildrensOpen(() => !childrensOpen);
  }, [childrensOpen, node.id]);

  const changeCurrentCheckboxStatus = () => {
    if (checkboxStatus === 'unselected' || checkboxStatus === 'halfselected') {
      setCheckboxStatus('selected');
      changeNode(node, parent, 'selected');
    } else {
      setCheckboxStatus('unselected');
      changeNode(node, parent, 'unselected');
    }
  };

  React.useEffect(() => {
    if (selectedNodes && selectedNodes[node.id]) {
      setCheckboxStatus(selectedNodes[node.id].status);
    } else {
      setCheckboxStatus('unselected');
    }
  }, [node.id, selectedNodes]);

  React.useEffect(() => {
    const childrensOpenIds = JSON.parse(localStorage.getItem('childrensOpenIds')) || [];
    const open = childrensOpenIds.find((id) => id === node.id);
    open && setChildrensOpen(() => open);
  }, [node.id]);

  return (
    <Tree.Body>
      <Tree.Expandable>
        <Tree.Leftside onClick={() => changeCurrentCheckboxStatus()}>
          <Tree.Checkboxarea style={{ paddingLeft: `${node.level * 25}px` }}>
            <Checkbox status={checkboxStatus} />
          </Tree.Checkboxarea>
          <span>{node.name}</span>
        </Tree.Leftside>
        {!childrenIsEmpty
                    && (
                    <Tree.Rightside>
                      <div onClick={() => toggleChildrensOpen()}>
                        <ArrowIcon open={childrensOpen} />
                      </div>
                    </Tree.Rightside>
                    )}
      </Tree.Expandable>
      {childrensOpen && !childrenIsEmpty && (
        <Tree.Childrens>
          { Object.values(node.children).map((value, index) => (
            <TreeItem key={index} node={value} parent={node} />
          ))}
        </Tree.Childrens>
      )}
    </Tree.Body>
  );
}
