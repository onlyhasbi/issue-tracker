import { Flex, Text, Button } from '@radix-ui/themes';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { AiOutlineRight } from "react-icons/ai";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount < 1) return null;

  return (
    <Flex gap="3" align="center">
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <AiOutlineDoubleLeft />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <AiOutlineLeft />
      </Button>
      <Text>
        Page {currentPage} of {pageSize}
      </Text>
      <Button variant="soft" color="gray" disabled={currentPage === pageSize}>
        <AiOutlineRight />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageSize}>
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
