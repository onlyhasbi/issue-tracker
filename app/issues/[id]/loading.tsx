import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

function LoadingDetailIssue() {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}

export default LoadingDetailIssue;
