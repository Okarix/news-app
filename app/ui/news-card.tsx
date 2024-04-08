import { Card, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NewsCard({ title, description, urlToImage, url }: { title: string; description: string; urlToImage: string; url: string }) {
	return (
		<Card maxW='sm'>
			<CardBody>
				<Image
					src={urlToImage}
					alt={title}
					borderRadius='lg'
					width='344px'
					objectFit='cover'
					height='193px'
				/>
				<Stack
					mt='6'
					spacing='3'
				>
					<Heading size='md'>{title}</Heading>
					<Text>{description ? `${description.slice(0, 50)}...` : null}</Text>
				</Stack>
			</CardBody>
			<CardFooter>
				<Link
					href={url}
					className='rounded-md bg-[#3182ce] hover:bg-[#2b6cb0] px-2 py-2 text-white font-bold'
				>
					Открыть новость
				</Link>
			</CardFooter>
		</Card>
	);
}
