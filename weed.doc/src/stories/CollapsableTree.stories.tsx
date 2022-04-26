import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CollapsableTree from "./CollapsableTree";

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

Primary.args = {};
