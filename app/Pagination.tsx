'use client';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  if (pageCount < 1) return null;

  return (
    <Flex gap="3" align="center">
      <Button
        onClick={() => onChangePage(1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <AiOutlineDoubleLeft />
      </Button>
      <Button
        onClick={() => onChangePage(currentPage - 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <AiOutlineLeft />
      </Button>
      <Text>
        Page {currentPage} of {pageSize}
      </Text>
      <Button
        onClick={() => onChangePage(currentPage + 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageSize}
      >
        <AiOutlineRight />
      </Button>
      <Button
        onClick={() => onChangePage(pageCount)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageSize}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
