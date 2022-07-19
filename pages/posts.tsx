import { NextPage } from "next";
import { useInfiniteQuery, useQuery } from "react-query";
import { gql, request } from "graphql-request";
import ItemCard from "../components/item-card";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

const PostsPage: NextPage = () => {
  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = null }) => {
      const res = await request(
        "http://localhost:4000/graphql",
        gql`
          query Query($cursor: String) {
            posts(cursor: $cursor) {
              nextId
              posts {
                id
                title
                createdAt
                content
                authorId
                author {
                  email
                  id
                  name
                }
              }
            }
          }
        `,
        { cursor: pageParam }
      );

      return res;
    },
    {
      getNextPageParam: (lastPage) => lastPage.posts.nextId ?? false,
    }
  );

  console.log(data);

  useEffect(() => {
    console.log(hasNextPage);
    if (inView && hasNextPage) {
      console.log(inView);
      fetchNextPage();
    }
  }, [inView]);

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
    <div className="p-6">
      <div className="mt-10 grid grid-cols-2 gap-6 px-4">
        {data?.pages.map((page) => (
          <React.Fragment key={page.posts.nextId ?? "last"}>
            {page.posts.posts.map((item: any) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                createAt={item.createAt}
                author={item.author}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && <div>...Loading</div>}
      <span ref={ref} className="invisible">
        intersection observer
      </span>
    </div>
  );
};

export default PostsPage;
