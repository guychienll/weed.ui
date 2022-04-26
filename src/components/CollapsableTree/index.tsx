import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type ICollapsableTree = {
  onToggleOn?: (node: string, hasChildren: boolean) => void;
  onToggleOff?: (node: string, hasChildren: boolean) => void;
  tree: any;
  nodeStyle?: any;
};

const defaultTree = {
  name: "root",
  display: "Root",
  children: [
    {
      name: "1",
      display: "Node_1",
      children: [
        {
          name: "1-1",
          display: "Node_1_1",
        },
      ],
    },
    {
      name: "2",
      display: "Node_2",
      children: [
        { name: "2-1", display: "Node_2_1" },
        { name: "2-2", display: "Node_2_2" },
        { name: "2-3", display: "Node_2_3" },
        { name: "2-4", display: "Node_2_4" },
        { name: "2-5", display: "Node_2_5" },
        { name: "2-6", display: "Node_2_6" },
      ],
    },
    {
      name: "3",
      display: "Node_3",
      children: [
        { name: "3-1", display: "Node_3_1" },
        {
          name: "3-2",
          display: "Node_3_2",
          children: [
            { name: "3-2-1", display: "Node_3-2-1" },
            { name: "3-2-2", display: "Node_3-2-2" },
            { name: "3-2-3", display: "Node_3-2-3" },
            { name: "3-2-4", display: "Node_3-2-4" },
            { name: "3-2-5", display: "Node_3-2-5" },
            { name: "3-2-6", display: "Node_3-2-6" },
          ],
        },
      ],
    },
  ],
};

function CollapsableTree({
  onToggleOn = () => 0,
  onToggleOff = () => 0,
  tree = defaultTree,
  nodeStyle = {},
}: ICollapsableTree) {
  const [activeNode, setActiveNode] = useState("");

  useEffect(() => {
    setActiveNode("");
  }, []);

  const getCategoriesElem = useCallback(
    (tree: any, isShow: boolean) => {
      return tree.children.map((node: any, index: number) => {
        const level = node.name.split("-").length - 1;
        const hasChildren = (node.children?.length || 0) > 0;
        const getIsActive = () => {
          const results: any = [];
          for (let i = 0; i <= level; i++) {
            results.push(node.name.split("-")[i] === activeNode.split("-")[i]);
          }
          return results.every((active: boolean) => active);
        };
        const off = hasChildren && !getIsActive();
        const on = hasChildren && getIsActive();
        const handleNodeClick = () => {
          if (getIsActive()) {
            if (!hasChildren) {
              return;
            }
            const parentNode = activeNode.split("-").slice(0, level).join("-");
            setActiveNode(parentNode);
            onToggleOff(parentNode, hasChildren);
          } else {
            setActiveNode(node.name);
            onToggleOn(node, hasChildren);
          }
        };
        return (
          <StyledTreeNode
            level={level}
            isShow={isShow}
            isActive={getIsActive()}
            key={index}>
            <div
              className="content"
              onClick={handleNodeClick}
              style={nodeStyle}>
              {node.display}
              {off && <div>+</div>}
              {on && <div>-</div>}
            </div>
            {hasChildren && getCategoriesElem(node, on)}
          </StyledTreeNode>
        );
      });
    },
    [activeNode, nodeStyle, onToggleOff, onToggleOn],
  );

  return (
    <StyledCollapsableTree>
      <div className="tree">{getCategoriesElem(tree, true)}</div>
    </StyledCollapsableTree>
  );
}

const StyledCollapsableTree = styled.div`
  width: 100%;
  //not-need
  box-sizing: border-box;
  background-color: #ccc;
  padding: 20px;
  border-radius: 15px;
`;

type typeStyledTreeNode = {
  level: number;
  isShow: boolean;
  isActive: boolean;
};

const StyledTreeNode = styled.div<typeStyledTreeNode>`
  padding-left: ${({ level }) => `${level * 25}px`};
  & > .content {
    background-color: #7a8f47;
    margin: ${({ isShow }) => (isShow ? `10px 0` : 0)};
    padding: ${({ isShow }) => (isShow ? `20px` : 0)};
    height: ${({ isShow }) => (isShow ? `20px` : 0)};
    border-radius: 15px;
    // no need
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transform: ${({ isShow }) => (isShow ? `scale(1)` : `scale(0)`)};
    visibility: ${({ isShow }) => (isShow ? "visible" : "hidden")};
    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    transform-origin: 50% 50%;
    //transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
    transition: all 600ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
    font-size: ${({ isActive }) => (isActive ? "18px" : "unset")};
    font-style: ${({ isActive }) => (isActive ? "italic" : "unset")};
    letter-spacing: ${({ isActive }) => (isActive ? "1.5px" : "unset")};
    color: orange;
    user-select: none;
  }
`;

export default CollapsableTree;
