import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

// console.log(__dirname); // instaclone/src 경로가 찍힘
// 즉 schema.js는 src하위에있는 모든 resolvers와 typeDefs파일들을 모아서 제공해주는 역할

// 해당 파일을 불러올때 export default를 기준으로 불러온다.
const loadedTypes = loadFilesSync(
  `${__dirname}/**/*.{typeDefs.js,typeDefs.ts}`
);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{resolvers.js,resolvers.ts}`
);

// 여러개의 종류를 등록하고 싶다면 아래와 같이 사용하면 된다.
// const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{mutations,query,resolvers}.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
/*
 - ref: https://www.graphql-tools.com/docs/schema-merging#print-merged-typedefs
   (필요한 모듈은 직접 설치해서 사용하면 됨)
   여러 merge 방법중 prin merged typeDefs 방법을 사용한다.
*/
export default schema;
