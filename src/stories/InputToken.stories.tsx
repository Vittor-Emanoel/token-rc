import { InputToken } from "@/components/token/components/InputToken";
import { generateRandomId } from "@/utils/generateRandomId";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/InputToken",
  component: InputToken,
  args: {
    onChangeValue: () => {},
    onInputChange: () => {},
    tokens: [
      {
        id: generateRandomId(),
        value: "Seu token",
      },
    ],
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputToken>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <InputToken {...args} />,
};
