import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CollapsableTree from "./CollapsableTree";

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
        },
      ],
    },
  ],
};

export default {
  title: "資料呈現/折疊樹 ( CollapsableTree )",
  component: CollapsableTree,
  argTypes: {
    tree: {
      description: "",
      table: {
        defaultValue: {
          summary: [],
        },
      },
    },
  },
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CollapsableTree>;

const Template: ComponentStory<typeof CollapsableTree> = (args) => (
  <CollapsableTree {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  tree: defaultTree,
  onToggleOn: () => 0,
  onToggleOff: () => 0,
  treeStyle: {
    border: "2px solid #444",
    padding: "10px",
    overflowX: "auto",
    backgroundColor: "#ccc",
  },
  nodeStyle: {
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
  nodeActiveStyle: `
            font-weight:bold;
            font-size:18px;
            border: 4px solid #444;
           `,
  initialActiveNode: "",
  icons: {
    on: <div>+</div>,
    off: <div>-</div>,
  },
};
