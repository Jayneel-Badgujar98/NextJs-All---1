// path - app/copilotkit/actions/ConsoleEssay.js
// "use client";

// import { useCopilotAction } from "@copilotkit/react-core";

// export default function ConsoleEssay() {
//   useCopilotAction({
//     name: "WriteAnEssayInConsole",
//     description: "Writes a detailed essay on a given topic to the browser console.",
//     parameters: [
//       {
//         name: "essay",
//         type: "string",
//         description: "The topic to write the essay on",
//       },
//     ],
//     handler: async ({ essay }) => {
//       // 🔹 Step 1: Create an essay manually or using a template

//       // 🔹 Step 2: Log the full essay
//       console.log(essay);

//       // Optional: Add toast or feedback later if needed
//     },
//   });

//   return null;
// }
import { useCopilotAction } from "@copilotkit/react-core";

export default function PrintEssayInConsole() {
  useCopilotAction({
    name: "PrintEssayInConsole",
    description: "Prints an AI-generated essay in the browser console.",
    parameters: [
      { name: "essay", type: "string", description: "The essay to print in the console." }
    ],
    handler: async ({ essay }) => {
      console.group("📝 AI-Generated Essay:");
      console.log(essay);
      console.groupEnd();
      return "The AI-generated essay has been printed in the browser console.";
    }
  });
  return null;
}
