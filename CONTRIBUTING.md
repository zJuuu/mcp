# Contributing to Akash MCP Server

Thank you for your interest in contributing to the Akash MCP Server project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be considerate in your interactions with other contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mcp.git
   cd mcp
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/akash-network/mcp.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes** and ensure they follow our coding standards.

3. **Run linting** to ensure code quality:

   ```bash
   npm run lint
   ```

4. **Format your code**:

   ```bash
   npm run format
   ```

5. **Commit your changes** with a clear descriptive message following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

   ```bash
   git commit -m "feat: add new sdl template tool"
   ```

6. **Pull latest changes** from upstream:

   ```bash
   git pull upstream main
   ```

7. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** from your fork to the main repository.

## Pull Request Guidelines

When submitting a Pull Request, please:

1. **Provide a clear description** of the changes and their purpose
2. **Reference any related issues** using GitHub's keyword references (e.g., "Fixes #123")
3. **Include any necessary documentation updates**
4. **Make sure the PR is up-to-date** with the main branch

## Adding New Tools

If you're adding a new tool to interact with the Akash Network:

1. Create a new tool class in the appropriate directory
2. Ensure it follows the MCP tool specification
3. Add proper type definitions
4. Document the tool's purpose and parameters in the tool class
5. Add the tool to the README.md

## Reporting Issues

When reporting issues, please:

1. **Use the issue template** provided
2. **Provide steps to reproduce** the issue
3. **Include relevant information** such as:
   - Node.js version
   - Operating system
   - Relevant logs or error messages
   - Expected vs actual behavior

## Documentation

Improvements to documentation are always welcome! Please ensure:

1. Documentation is clear and concise
2. Code examples are correct and follow best practices
3. Any new functionality is properly documented

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [Apache 2.0 License](LICENSE).

## Questions?

If you have any questions or need help with the contribution process, please open an issue marked as a question or contact the maintainers directly.

Thank you for contributing to make the Akash MCP Server better!
