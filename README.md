# `watson-ui`

A generic user interface for Watson Conversation

## Prerequisites

You'll need a Bluemix account with an instance of Watson Conversation.

## Running locally

1. Clone or download this repository.

2. `cd` into the directory.

3. Create a `.env` file in the root folder with your service credentials.

   ```
   CONVERSATION_USERNAME=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   CONVERSATION_PASSWORD=xxxxxxxxxxxx
   WORKSPACE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

4. Run `npm install`.

5. Run `npm start`.

## Deploying to Bluemix

1. Clone or download this repository.

2. `cd` into the directory.

3. Create a `manifest.yml` file like the one below.

   ```
   applications:
   - path: .
     memory: 256M
     instances: 1
     domain: mybluemix.net
     name: your_app_name_goes_here
     host: your_app_name_goes_here
     disk_quota: 256M
     services:
       - your_service_name_goes_here
     env:
       WORKSPACE_ID: your_workspace_id_goes_here
   ```

4. Run `cf login -a api.ng.bluemix.net`.
5. Run `cf push`.
