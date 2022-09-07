import { useQuery } from "react-query";
import { gql, request } from "graphql-request";
import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "pages/_app";
import Layout from "components/layout";
import { graphQLClient } from "libs/gql/request";
import { getRecoil } from "recoil-nexus";
import { authAtom } from "libs/recoil/auth";
import { useRouter } from "next/router";
import ItemCard from "components/item-card";
import { useRecoilValue } from "recoil";

interface IItemCard {
  id: number;
  title: string;
  content: string;
  createAt: string;
  author: IAuthor;
}

interface IAuthor {
  id: number;
  email: string;
  name: string;
}

const PostDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const auth = useRecoilValue(authAtom);
  const {
    query: { id },
  } = router;

  const strId = id as string;

  const { data, isLoading } = useQuery(
    "postDetail",
    async () => {
      return await graphQLClient.request(
        gql`
          query Post($postId: Int!) {
            post(id: $postId) {
              id
              author {
                email
                id
                name
              }
              content
              createdAt
            }
          }
        `,
        { postId: +strId }
      );
    },
    { enabled: !!strId && !!auth?.accessToken }
  );

  // const { data, isLoading } = useQuery<{ posts: IItemCard[] }>("posts1", () => {
  //   return request(
  //     "http://localhost:4000/graphql",
  //     gql`
  //       query Posts {
  //         posts {
  //           author {
  //             email
  //             id
  //             name
  //           }
  //           createdAt
  //           content
  //           id
  //           title
  //         }
  //       }
  //     `
  //   );
  // });

  console.log(data);

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="p-6 ">
      <p>{data?.post?.id}</p>
      <p>{data?.post?.content}</p>
      <p>{data?.post?.createdAt}</p>
    </div>
  );
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

PostDetailPage.authentication = {
  loginOnly: true,
};

export default PostDetailPage;
