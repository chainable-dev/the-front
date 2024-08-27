# Work Tracking App

## Overview
This app is designed to help teams track their work efficiently, similar to Jira or Trello. It includes features such as task creation, assignment, and status tracking.

## Features

- Task creation with essential fields (title, description, priority, status, assignee, due date)
- Drag-and-drop functionality to move tasks between different statuses
- User authentication and task assignment
- Real-time updates and notifications

## Demo

You can view a fully working demo at [the-front-gjqyzg9oc-khaosans-projects.vercel.app/login](https://the-front-gjqyzg9oc-khaosans-projects.vercel.app/login).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fwork-tracking-app&project-name=work-tracking-app&repository-name=work-tracking-app&demo-title=work-tracking-app&demo-description=This%20app%20helps%20teams%20track%20their%20work%20efficiently%20with%20task%20creation%2C%20assignment%2C%20and%20status%20tracking.&demo-url=https%3A%2F%2Fthe-front-gjqyzg9oc-khaosans-projects.vercel.app%2Flogin&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fwork-tracking-app&demo-image=https%3A%2F%2Fthe-front-gjqyzg9oc-khaosans-projects.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
