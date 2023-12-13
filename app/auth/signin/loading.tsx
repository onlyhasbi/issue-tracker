import Skeleton from '@/app/components/Skeleton';
import { Box, Card, Flex } from '@radix-ui/themes';

function SignInLoading() {
  return (
    <Flex className="h-[30rem]" justify="center" align="center">
      <Box>
        <Card className="w-[22rem]" size="3">
          <Flex
            className="text-center"
            direction="column"
            justify="center"
            gap="5"
          >
            <Skeleton width="7rem" height="1.6rem" className="mb-2" />
            <Skeleton height="2rem" count={4} />
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}

export default SignInLoading;
