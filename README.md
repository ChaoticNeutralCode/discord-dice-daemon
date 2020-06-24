# discord-dice-daemon
Open source dice roller for discord.

## Running

`docker build -t [name:tag] .`

You will need to provide the container a DISCORD_TOKEN environment variable with your bots authentication token. I just use a .env file not checked into git then use the `--env-file` command when I run the project. Regardless of how, the docker command might look like:

`docker run --rm --env-file .env [name:tag]`
