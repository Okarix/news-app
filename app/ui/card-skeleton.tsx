import { Card, CardBody, CardFooter, Stack, Skeleton } from '@chakra-ui/react';

export default function CardSkeleton() {
	return (
		<Card maxW='sm'>
			<CardBody>
				<Skeleton
					width='344px'
					height='193px'
				/>
				<Stack
					mt='6'
					spacing='3'
				>
					<Skeleton height='15px' />
					<Skeleton height='15px' />
					<Skeleton height='15px' />
				</Stack>
			</CardBody>
			<CardFooter>
				<Skeleton
					height='40px'
					width='160px'
				/>
			</CardFooter>
		</Card>
	);
}
