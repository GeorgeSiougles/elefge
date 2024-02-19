interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <div>TODO chatting interface{params.groupId}</div>;
};
export default Page;
