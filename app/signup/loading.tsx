import { Flex, Box, Card } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

function SignUpLoading() {
  return (
    <Flex className="h-[30rem]" justify="center" align="center">
      <Box>
        <Card className="w-[22rem]" size="3">
          <Flex
            className="text-center"
            direction="column"
            justify="center"
            gap="4"
          >
            <Skeleton width="6rem" height="2rem" />
            <Skeleton height="2rem" count={5} />
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}

export default SignUpLoading;
