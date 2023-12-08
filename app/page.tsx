import Pagination from './Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <main>
      <p>Issue Tracker</p>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page) || 1}
      />
    </main>
  );
}
