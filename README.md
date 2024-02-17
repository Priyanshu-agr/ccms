yarn add typescript
npx tsc --init
yarn add ts-node-dev typescript @types/node --dev
"scripts":{
    "dev": "tsnd --respawn --transpile-only --exit-child src/app.ts"
  },

npx prisma init --datasource-provider postgresql