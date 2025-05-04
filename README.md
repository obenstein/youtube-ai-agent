Here is the updated and cleaned-up version of the README.md file with proper formatting and corrections applied:

```markdown
# YouTube AI Agent

This is a [Next.js](https://nextjs.org) project that integrates AI-powered tools to assist with various tasks, including processing YouTube transcripts, retrieving data, and interacting with external APIs. The project leverages LangChain, wxflows, and other AI frameworks to create a dynamic and interactive experience.

## Features

- **AI-Powered Conversations**: Uses AI models like Ollama's `llama3.1` for generating responses.
- **Tool Integration**: Supports tools for processing YouTube transcripts, Google Books, and more.
- **State Management**: Implements a state graph for managing conversation flow.
- **Streaming Responses**: Provides real-time streaming of AI responses.
- **Caching**: Adds caching headers to optimize message handling.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- pnpm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/youtube-ai-agent.git
   cd youtube-ai-agent
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   WXFLOW_ENDPOINT=<your-wxflow-endpoint>
   WXFLOW_API_KEY=<your-wxflow-api-key>
   ```

### Running the Development Server

Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- **`/app`**: Contains the Next.js application files, including global styles and layout components.
- **`/lib`**: Includes core logic for AI workflows, state management, and tool integration.
- **`/constants`**: Stores system messages and other constants.
- **`/components`**: Reusable React components for the UI.
- **`/convex`**: Handles database queries and mutations.

## Key Files

- **`lib/langgraph.ts`**: Defines the AI workflow, state graph, and message handling logic.
- **`constants/systemMessge.ts`**: Contains the system message template for AI interactions.
- **`app/layout.tsx`**: Sets up the global layout and styles for the app.

## Usage

### Submitting a Question

The `submitQuestion` function in `lib/langgraph.ts` handles user queries by:

1. Adding caching headers to messages.
2. Creating a workflow using the state graph.
3. Streaming AI responses back to the user.

### Workflow

The workflow is defined using LangChain's `StateGraph` and includes nodes for:
- **Agent**: Handles AI responses.
- **Tools**: Executes external tool calls.

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com). Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Deploy the app with a single click.

For more details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Technologies Used

- **Next.js**: Framework for building the web application.
- **LangChain**: For managing AI workflows and state graphs.
- **wxflows**: For integrating external tools.
- **Ollama**: AI model for generating responses.
- **Convex**: For database queries and mutations.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [LangChain Documentation](https://docs.langchain.com/)
- [Ollama Documentation](https://ollama.ai/)
- [wxflows Documentation](https://wxflows.com/)

Feel free to reach out if you have any questions or need assistance!
```

### Changes Made:
1. Fixed inconsistent formatting in the **Installation** section.
2. Removed redundant or duplicate content.
3. Improved readability and structure for better clarity.
4. Ensured proper Markdown syntax and indentation.