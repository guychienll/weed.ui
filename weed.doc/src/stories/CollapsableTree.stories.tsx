import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { userEvent, within } from "@storybook/testing-library";

import CollapsableTree from "./CollapsableTree";
import { delay } from "weed.ui/util/timing";
import styled from "styled-components";
import {
  ArgsTable,
  Description,
  Preview,
  PRIMARY_STORY,
  Stories,
  Story,
  Subtitle,
  Title,
} from "@storybook/addon-docs";

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
  parameters: {
    docs: {
      page: () => {
        return (
          <DocWrapper>
            <Title />
            <Subtitle />
            {/*@ts-ignore*/}
            <Preview isExpanded withToolbar={true}>
              <div className="story">
                <Story id="資料呈現-折疊樹-collapsabletree--primary" />
              </div>
            </Preview>
            <Description />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </DocWrapper>
        );
      },
    },
  },
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
  nodeActiveStyle: {
    fontWeight: "bold",
    fontSize: "18px",
  },
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

const DocWrapper = styled.div`
  max-width: 1000px;
  overflow-x: auto;
  & thead > tr > th:nth-child(3) {
    display: none;
  }
  & tbody > tr > td:nth-child(3) {
    display: none;
  }
  & .sbdocs-expandable {
    & > span {
      line-height: 1.5rem;
      white-space: pre-line;
      max-width: 200px;
      width: 200px;
      word-break: break-all;
    }
  }
  & .story {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
