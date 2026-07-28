import subprocess
import sys

COMMANDS = (
    ("black", "--check", "."),
    ("isort", "--check-only", "."),
    ("ruff", "check", "."),
    ("mypy",),
    ("pytest",),
)


def main() -> int:
    for command in COMMANDS:
        completed = subprocess.run(command, check=False)
        if completed.returncode:
            return completed.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())
