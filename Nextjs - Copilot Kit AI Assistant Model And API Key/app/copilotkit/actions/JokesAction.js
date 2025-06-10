import { useCopilotAction } from "@copilotkit/react-core";

export default function PrintAIJokeAction() {
  useCopilotAction({
    name: "PrintJokeInConsole",
    description: "Prints a joke in the browser console.",
    parameters: [
      { name: "joke", type: "string", description: "The joke to print" }
    ],
    handler: async ({ joke }) => {
      console.group("😂 AI-Generated Joke:");
      console.log(joke);
      console.groupEnd();
      return "The AI-generated joke has been printed in the browser console.";
    }
  });
  return null;
}
