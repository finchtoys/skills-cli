# @finchtoys/skills

The official CLI for installing and managing Finch skills.

## Installation

Run the CLI directly with npm:

```bash
npx @finchtoys/skills add <source>
```

## Usage

```bash
# Install a skill from GitHub
npx @finchtoys/skills add owner/repository --skill skill-name

# Install from a GitHub URL
npx @finchtoys/skills add https://github.com/owner/repository/tree/main/skills/my-skill

# Install from a local directory
npx @finchtoys/skills add ./my-skill

# Install globally
npx @finchtoys/skills add owner/repository --global
```

Skills extend Finch with reusable instructions and workflows. See the [Finch documentation](https://finchwork.app/en/docs/skills) for authoring and usage guidance.

## License

MIT
