import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NewsCardPage() {
	return (
		<Card>
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
		</Card>
	);
}
