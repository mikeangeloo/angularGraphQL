# AnguarGrapQl


First clone the pr

npx apollo-codegen introspect-schema http://localhost:3000/graphql --output ./src/app/types
npx apollo-codegen generate **/*.ts --schema ./src/app/types/schema.json --target typescript --output ./src/app/types/operation-result-types.ts