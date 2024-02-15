interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <div>{params.groupId}</div>;
};
export default Page;
