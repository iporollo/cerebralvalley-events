<p align="center">
  <a href="https://github.com/cerebralvalley//">
    <img width="150px" height="150px" src="https://avatars.githubusercontent.com/u/135695649?s=200&v=4"/>
  </a>
</p>

<h1 align="center">Cerebral Valley Events</h1>

This is the repository for the Cerebral Valley <a href="https://events.cerebralvalley.ai/">events page</a>.

# Installation

## Prerequisites

You will need an [Airtable account](https://airtable.com/developers/web/api/introduction) to use the Airtable API.

You will also need need a [Pusher account](https://pusher.com/) to use the Pusher API.

If you want recreate authentication locally, you will need Twitter API access from a [Twitter developer account](https://developer.twitter.com/).

## Project install

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Set environment variables

```
# NEXTAUTH
NEXTAUTH_URL=http://localhost:3000/api/auth
NEXTAUTH_SECRET=

# Airtable
NEXT_PUBLIC_AIRTABLE_PERSONAL_TOKEN=

# Twitter
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=

# Pusher
NEXT_PUBLIC_PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
NEXT_PUBLIC_PUSHER_APP_SECRET=
NEXT_PUBLIC_PUSHER_APP_CLUSTER=
```

> Note that the NEXTAUTH_SECRET is a random string

4. Run `yarn dev`
5. Navigate to http://localhost:3000

# Contributing

Fork the project, make your changes, then open a PR with your changes and we'll review it as soon as possible. Tag [@iporollo](https://github.com/iporollo) or [@HowieG](https://github.com/howieg) for review.

<br />

<p align="center">
  <a href="https://cerebralvalley.beehiiv.com/">Newsletter</a>
  |
  <a href="https://cerebralvalley.ai">Home</a>
  |
  <a href="https://events.cerebralvalley.ai">Events</a>
  |
  <a href="https://cerebralvalley.ai/slack">Slack</a>
</p>
