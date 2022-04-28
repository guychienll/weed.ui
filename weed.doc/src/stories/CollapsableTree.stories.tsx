import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { userEvent, within } from "@storybook/testing-library";

import CollapsableTree from "./CollapsableTree";
import { delay } from "weed.ui/util/timing";

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
  decorators: [(Story) => <Story />],
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
    backgroundColor: "#444",
    color: "white",
  },
  nodeActiveStyle: `
            font-weight:bold;
            font-size:18px;
           `,
  initialActiveNode: "",
  icons: {
    on: <div>+</div>,
    off: <div>-</div>,
  },
};

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Node_1"));
  await delay(500);
  await userEvent.click(canvas.getByText("Node_3"));
  await delay(500);
  await userEvent.click(canvas.getByText("Node_3_2"));
  await delay(500);
  await userEvent.click(canvas.getByText("Node_2"));
  await delay(500);
  await userEvent.click(canvas.getByText("Node_2"));
};
