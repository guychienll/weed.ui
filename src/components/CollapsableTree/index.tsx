import React, { useCallback, useState } from "react";
import styled from "styled-components";

interface RecursiveTree {
  name: string;
  display: string;
  children?: RecursiveTree[];
}

interface ICollapsableTree {
  tree: RecursiveTree;
  onToggleOn?: (node: string, hasChildren: boolean) => void;
  onToggleOff?: (node: string, hasChildren: boolean) => void;
  nodeStyle?: any;
  treeStyle?: any;
  nodeActiveStyle?: any;
  initialActiveNode?: string;
  icons?: {
    on?: React.ReactElement | null;
    off?: React.ReactElement | null;
  };
}

function CollapsableTree({
  tree = {
    name: "root",
    display: "Root",
    children: [
      {
        name: "1",
        display: "Node_1",
        children: [],
      },
      {
        name: "2",
        display: "Node_2",
        children: [{ name: "2-1", display: "Node_2_1" }],
      },
    ],
  },
  onToggleOn = () => 0,
  onToggleOff = () => 0,
  treeStyle = {
    border: "2px solid #444",
    padding: "10px",
    overflowX: "auto",
    backgroundColor: "#ccc",
  },
  nodeStyle = {
    margin: "10px 0",
    padding: "20px 10px",
    height: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
    backgroundColor: "#7a8f47",
    color: "orange",
  },
  nodeActiveStyle = {
    fontWeight: "bold",
    fontSize: "18px",
  },
  initialActiveNode = "",
  icons = {
    on: <div>+</div>,
    off: <div>-</div>,
  },
}: ICollapsableTree) {
  const [activeNode, setActiveNode] = useState(initialActiveNode || "");

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
            activeStyle={styleString(nodeActiveStyle)}
            key={index}>
            <div
              className="content"
              onClick={handleNodeClick}
              style={nodeStyle}>
              {node.display}
              {off && icons.on}
              {on && icons.off}
            </div>
            {hasChildren && getCategoriesElem(node, on)}
          </StyledTreeNode>
        );
      });
    },
    [activeNode, nodeStyle, onToggleOff, onToggleOn],
  );

  return (
    <StyledCollapsableTree style={treeStyle}>
      {getCategoriesElem(tree, true)}
    </StyledCollapsableTree>
  );
}

type typeStyledTree = { style: any };

const StyledCollapsableTree = styled.div<typeStyledTree>`
  width: 100%;
`;

type typeStyledTreeNode = {
  level: number;
  isShow: boolean;
  isActive: boolean;
  activeStyle: string;
};
const styleString = (styleObject: any) =>
  Object.entries(styleObject)
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${v}`,
    )
    .join(";");

const StyledTreeNode = styled.div<typeStyledTreeNode>`
  padding-left: ${({ level }) => `${level * 25}px`};
  & > .content {
    cursor: pointer;
    transform-origin: 0 0;
    transition: all 300ms ease;
    user-select: none;

    ${({ isShow }) =>
      isShow
        ? `
    transform: scale(1);
    visibility: visible;
    opacity: 1;
    `
        : `
    transform: scale(0);
    visibility: hidden;
    opacity: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    height: 0 !important;
    `}

    ${({ isActive, activeStyle }) =>
      isActive
        ? activeStyle
        : `font-style:unset;
            font-weight:unset;
            font-size:unset;
            letter-spacing:unset;`}
  }
`;

export default CollapsableTree;
