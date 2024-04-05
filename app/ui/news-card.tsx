import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NewsCard() {
	return (
		<Card maxW='sm'>
			<CardBody>
				<Image
					src='https://tengrinews.kz/userdata/news/2024/news_531275/thumb_m/photo_467765.jpeg'
					alt='Green double couch with wooden legs'
					borderRadius='lg'
				/>
				<Stack
					mt='6'
					spacing='3'
				>
					<Heading size='md'>Сайт для подачи онлайн-петиций заработал в Казахстане</Heading>
					<Text>Официальную онлайн-платформу для подачи петиций запустили в Казахстане. В Министерстве цифрового развития, инноваций и аэрокосмической промышленности</Text>
				</Stack>
			</CardBody>
			<CardFooter>
				<Link
					href='/id'
					className='rounded-md bg-[#3182ce] hover:bg-[#2b6cb0] px-2 py-2 text-white font-bold'
				>
					Открыть новость
				</Link>
			</CardFooter>
		</Card>
	);
}
