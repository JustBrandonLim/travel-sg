# TravelSG

## Environments

1. [Production](https://travel-sg.vercel.app)
2. [Development](https://dev-travel-sg.vercel.app)
3. [Proof Of Concepts](https://pocs-travel-sg.vercel.app)

## Local Set Up

1. Run `git clone https://github.com/JustBrandonLim/travel-sg.git`.
2. Create a `.env.local` file and provide the following secrets:
    1. `LTA_DATAMALL_ACCOUNT_KEY` - Used for calling LTA's DataMall API.
    2. `POSTGRES_URL` - Used for Database.
3. Run `npm install` to install all the dependencies.
4. Run `npm run dev` to start the development server.
5. Go to `localhost:3000` to access the website locally.

## Endpoints

1. `/api/external/bus-stops` - Fetches the latest list of Bus Stops from LTA's DataMall API.
2. `/api/external/bus-stop` - Fetches the latest information of the Bus Stop from LTA's DataMall API.