import Pagination from './Pagination';

export default function Home() {
  return (
    <main>
      <p>Issue Tracker</p>
      <Pagination itemCount={100} pageSize={10} currentPage={10} />
    </main>
  );
}
