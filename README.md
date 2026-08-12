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

# Install into the current project
npx @finchtoys/skills add owner/repository --cwd

# Install globally for the current Finch runtime
npx @finchtoys/skills add owner/repository --global
```

## Install scopes

- Default: personal scope at `<FINCH_AGENT_HOME>/.finch/skills/`.
- `--cwd [path]`: project scope at `<path>/.finch/skills/`.
- `--global`: runtime-global scope at `<FINCH_RUNTIME_HOME>/skills/` (normally `~/.finch/skills/`).

When Finch launches the CLI, it supplies `FINCH_AGENT_HOME` and `FINCH_RUNTIME_HOME` so custom Agent homes and Dev/Prod runtimes remain isolated. Run `npx @finchtoys/skills where` to inspect the resolved paths.

Skills extend Finch with reusable instructions and workflows. See the [Finch documentation](https://finchwork.app/en/docs/skills) for authoring and usage guidance.

## License

MIT
