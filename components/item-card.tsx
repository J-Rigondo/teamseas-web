import { useRouter } from "next/router";

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

const ItemCard = ({ id, title, content, createAt, author }: IItemCard) => {
  const router = useRouter();
  return (
    <div
      className=" shadow-md p-4 rounded-lg cursor-pointer hover:border-teal-600 hover:border-2"
      onClick={() => router.push(`/posts/${id}`)}
    >
      <div className="w-full h-[200px] bg-slate-500" />
      <div className="p-3">
        <div className="flex items-center mb-1">
          <div className="rounded-full w-5 h-5 bg-slate-500 mr-2" />
          <span>{author?.name}</span>
        </div>
        <span>{author?.email}</span>
      </div>
      <div>
        <h3>
          <span className="text-lg font-bold">{id}. </span>
          {title}
        </h3>
        <p>{content}</p>
        <p>{createAt}</p>
      </div>
    </div>
  );
};

export default ItemCard;
