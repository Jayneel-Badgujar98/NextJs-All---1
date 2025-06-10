// app/copilotkit/actions/RedirectAction.jsx
'use client';

import { useCopilotAction } from '@copilotkit/react-core';

export default function RedirectAction() {
  useCopilotAction({
    name: 'redirectToURL',
    description: 'Redirects the user to the specified URL.',
    parameters: [
      {
        name: 'url',
        type: 'string',
        description: 'The URL to redirect to.',
      },
    ],
    handler: async ({ url }) => {
      if (url) {
        window.location.href = url;
      }
    },
  });

  return null; // This component doesn't render anything
}
