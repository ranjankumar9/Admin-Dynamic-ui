
import {
	Avatar,
	AvatarBadge,
	AvatarGroup,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	DarkMode,
	Flex,
	Grid,
	Icon,
	Image,
	Link,
	Switch,
	Text
} from '@chakra-ui/react';
import avatar11 from 'assets/img/avatars/avatar11.png';
// Images
import bgProfile from 'assets/img/bgProfile.png';
import { GrUserAdmin } from "react-icons/gr";
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { CarIcon, FulgerIcon, FulgerWhiteIcon } from 'components/Icons/Icons';
import { Separator } from 'components/Separator/Separator';
import Cookies from 'js-cookie';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaCube, FaFacebook, FaInstagram, FaPencilAlt, FaPenFancy, FaTwitter } from 'react-icons/fa';
// Icons
import { IoDocumentsSharp } from 'react-icons/io5';
// Data
import {
	lineChartDataProfile1,
	lineChartDataProfile2,
	lineChartOptionsProfile1,
	lineChartOptionsProfile2
} from 'variables/charts';

function Profile() {
	let user =  Cookies.get("User")
	let email =  Cookies.get("Email")
	let userType =  Cookies.get("userType")
	return (
		<Flex direction='column' mt={{ sm: '25px', md: '0px' }}>
			<Box
				mb={{ sm: '24px', md: '50px', xl: '20px' }}
				borderRadius='15px'
				px='0px'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				align='center'>
				{/* Header */}
				<Card
					direction={{ sm: 'column', md: 'row' }}
					mx='auto'
					maxH='330px'
					w={{ sm: '90%', xl: '100%' }}
					justifyContent={{ sm: 'center', md: 'space-between' }}
					align='center'
					p='24px'
					borderRadius='20px'
					mt='100px'>
					<Flex align='center' direction={{ sm: 'column', md: 'row' }}>
						<Flex
							align='center'
							mb={{ sm: '10px', md: '0px' }}
							direction={{ sm: 'column', md: 'row' }}
							w={{ sm: '100%' }}
							textAlign={{ sm: 'center', md: 'start' }}>
							<Icon me={{ md: '22px' }} as={GrUserAdmin} color={'whiteAlpha.800'} w='80px' h='80px' borderRadius='15px' />
								
							<Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
								<Text
									fontSize={{ sm: 'lg', lg: 'xl' }}
									color='#fff'
									fontWeight='bold'
									ms={{ sm: '8px', md: '0px' }}>
									{user}
								</Text>
								<Text fontSize={{ sm: 'sm', md: 'md' }} color='gray.400'>
									{email}
								</Text>
							</Flex>
						</Flex>
						<Flex direction={{ sm: 'column', lg: 'row' }} w={{ sm: '100%', md: '50%', lg: 'auto' }}>
							<Link href='#/admin/dashboard'>
								<Button
									borderRadius='12px'
									bg='brand.200'
									_hover={{ opacity: '0.8' }}
									_active={{ opacity: '0.9' }}
									me={{ base: 'none', lg: '20px' }}
									leftIcon={<Icon color='white' as={FaCube} me='6px' />}>
									<Text fontSize='xs' color='#fff' fontWeight='bold'>
										OVERVIEW
									</Text>
								</Button>
							</Link>
							<Link href='#/admin/author/table'>
								<Button
									borderRadius='12px'
									bg='transparent'
									_hover={{
										bg: 'brand.200'
									}}
									_active={{
										bg: 'brand.200'
									}}
									me={{ base: 'none', lg: '20px' }}
									leftIcon={<Icon color='white' as={IoDocumentsSharp} me='6px' />}>
									<Text fontSize='xs' color='#fff' fontWeight='bold'>
										TEAMS
									</Text>
								</Button>
							</Link>
							<Link href='#/admin/project/table'>
								<Button
									borderRadius='12px'
									bg='transparent'
									_hover={{
										bg: 'brand.200'
									}}
									_active={{
										bg: 'brand.200'
									}}
									leftIcon={<Icon color='white' as={FaPenFancy} me='6px' />}>
									<Text fontSize='xs' color='#fff' fontWeight='bold'>
										PROJECTS
									</Text>
								</Button>
							</Link>
						</Flex>
					</Flex>
				</Card>
			</Box>
			<Grid
				templateColumns={{
					sm: '1fr',
					xl: 'repeat(2, 1fr)',
					'2xl': '1fr 2fr 1.2fr'
				}}
				gap='22px'
				mb='24px'>
				{/* Welcome Card */}
				<Card
					bgImage={bgProfile}
					bgSize='cover'
					maxW={{ sm: '325px', md: '725px', lg: '980px' }}
					h={{ sm: '270px', lg: '350px', xl: '410px' }}
					gridArea={{ xl: '1 / 1 / 2 / 2', '2xl': 'auto' }}>
					<Flex direction='column' h='100%'>
						<Text color='#fff' fontSize='30px' fontWeight='bold' mb='3px'>
							Welcome back!
						</Text>
						<Text color='#fff' fontSize='sm' mb='auto'>
							Nice to see you, {user} !
						</Text>
						<Button alignSelf='flex-start' variant='no-hover' bg='transparent' p='0px'>
							<Text
								fontSize='xs'
								color='#fff'
								me='5px'
								cursor='pointer'
								transition='all .3s ease'
								_hover={{ me: '6px' }}>
								Tab to record
							</Text>
							<Icon
								as={BsArrowRight}
								w='13px'
								h='13px'
								color='#fff'
								transition='all .3s ease'
								cursor='pointer'
								_hover={{ transform: 'translateX(20%)' }}
							/>
						</Button>
					</Flex>
				</Card>
				{/* Car Informations */}
				<Card
					p='16px'
					maxH={{ lg: '410px' }}
					maxW={{ sm: '325px', md: '725px', lg: '980px', xl: '100%' }}
					gridArea={{ xl: '2 / 1 / 3 / 3', '2xl': 'auto' }}>
					<CardHeader p='12px 5px' mb='12px'>
						<Flex direction='column'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
								User Informations
							</Text>
							<Text fontSize='sm' color='gray.400'>
								Hello, {user}! Your Project is ready.
							</Text>
						</Flex>
					</CardHeader>
					<CardBody w='100%'>
						<Flex w='100%' direction={{ sm: 'column', md: 'row' }}>
							<Flex
								direction='column'
								align='center'
								me={{ md: '16px', lg: '50px' }}
								mb={{ sm: '12px', md: '0px' }}>
								<CircularProgress
									size={200}
									value={68}
									thickness={6}
									color='green.400'
									variant='vision'>
									<CircularProgressLabel>
										<Flex direction='column' justify='center' align='center'>
											{/* <LightningIcon w='14px' h='22px' mb='8px' /> */}
											<Text color='#fff' fontSize='36px' fontWeight='bold' mb='6px'>
												98%
											</Text>
											<Text color='gray.400' fontSize='sm'>
												Current load
											</Text>
										</Flex>
									</CircularProgressLabel>
								</CircularProgress>
								<Flex direction='column' mt='18px' align='center'>
									<Text color='#fff' fontSize='lg' fontWeight='bold' mb='2px'>
										0h 58 min
									</Text>
									<Text color='gray.500' fontSize='sm'>
										Time to full charge
									</Text>
								</Flex>
							</Flex>
							<Grid
								templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}
								gap='24px'
								w='100%'
								alignSelf='flex-start'>
								<Flex
									align='center'
									p='18px'
									justify='space-between'
									bg='linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)'
									borderRadius='20px'>
									<Flex direction='column' me='auto'>
										<Text fontSize='xs' color='gray.400' mb='3px'>
											User Profits
										</Text>
										<Text color='#fff' fontSize='22px' fontWeight='bold'>
											76%
										</Text>
									</Flex>
									<IconBox bg='brand.200' w='56px' h='56px' direction='column'>
										<CarIcon w='28px' h='28px' />
										<FulgerWhiteIcon w='8px' h='11px' transform='rotate(90deg)' />
									</IconBox>
								</Flex>
								<Flex
									align='center'
									p='18px'
									pe='0px'
									justify='space-between'
									bg='linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)'
									borderRadius='20px'>
									<Flex direction='column' me='auto'>
										<Text fontSize='xs' color='gray.400' mb='3px'>
											Efficiency
										</Text>
										<Text color='#fff' fontSize='22px' fontWeight='bold'>
											+80%
										</Text>
									</Flex>
									<Box maxH='75px'>
										<LineChart
											lineChartData={lineChartDataProfile1}
											lineChartOptions={lineChartOptionsProfile1}
										/>
									</Box>
								</Flex>
								<Flex
									align='center'
									p='18px'
									justify='space-between'
									bg='linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)'
									borderRadius='20px'>
									<Flex direction='column' me='auto'>
										<Text fontSize='xs' color='gray.400' mb='3px'>
											Consumption
										</Text>
										<Text color='#fff' fontSize='22px' fontWeight='bold'>
											163W/km
										</Text>
									</Flex>
									<IconBox bg='brand.200' w='56px' h='56px'>
										<FulgerWhiteIcon w='24px' h='24px' color='#fff' />
									</IconBox>
								</Flex>
								<Flex
									align='center'
									p='18px'
									pe='0px'
									justify='space-between'
									bg='linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)'
									borderRadius='20px'>
									<Flex direction='column' me='auto'>
										<Text fontSize='xs' color='gray.400' mb='3px'>
											This Week
										</Text>
										<Text color='#fff' fontSize='22px' fontWeight='bold'>
											145 Projects
										</Text>
									</Flex>
									<Box maxH='75px'>
										<LineChart
											lineChartData={lineChartDataProfile2}
											lineChartOptions={lineChartOptionsProfile2}
										/>
									</Box>
								</Flex>
							</Grid>
						</Flex>
					</CardBody>
				</Card>
				{/* Profile Information */}
				<Card
					p='16px'
					maxH={{ md: '410px' }}
					maxW={{ sm: '325px', md: '725px', lg: '980px' }}
					gridArea={{ xl: '1 / 2 / 2 / 3', '2xl': 'auto' }}>
					<CardHeader p='12px 5px' mb='12px'>
						<Text fontSize='lg' color='#fff' fontWeight='bold'>
							Profile Information
						</Text>
					</CardHeader>
					<CardBody px='5px'>
						<Flex direction='column'>
							<Text fontSize='sm' color={'gray.400'} fontWeight='400' mb='15px'>
								Hi, I’m {user}, Decisions: If you can’t decide, the answer is no. If two equally
								difficult paths, choose the one more painful in the short term (pain avoidance is
								creating an illusion of equality).
							</Text>
							<Separator mb='30px' />
							<Flex align='center' mb='18px'>
								<Text fontSize='sm' color={'gray.400'} me='10px'>
									Full Name:{' '}
								</Text>
								<Text fontSize='sm' color='#fff' fontWeight='400'>
									{user}
								</Text>
							</Flex>
							<Flex align='center' mb='18px'>
								<Text fontSize='sm' color={'gray.400'} me='10px'>
									userType:{' '}
								</Text>
								<Text fontSize='sm' color='#fff' fontWeight='400'>
									{userType}
								</Text>
							</Flex>
							<Flex align='center' mb='18px'>
								<Text fontSize='sm' color={'gray.400'} me='10px'>
									Email:{' '}
								</Text>
								<Text fontSize='sm' color='#fff' fontWeight='400'>
									{email}
								</Text>
							</Flex>
							<Flex align='center' mb='18px'>
								<Text fontSize='sm' color={'gray.400'} me='10px'>
									Location:{' '}
								</Text>
								<Text fontSize='sm' color='#fff' fontWeight='400'>
									United States
								</Text>
							</Flex>
							<Flex align='center' mb='18px'>
								<Text fontSize='sm' color={'gray.400'} me='10px'>
									Social Media:{' '}
								</Text>
								<Flex>
									<Link
										href='#'
										color='teal.300'
										fontSize='lg'
										me='10px'
										_hover={{ color: 'teal.300' }}>
										<Icon color='white' as={FaFacebook} w='12px' h='12px' />
									</Link>
									<Link
										href='#'
										color='teal.300'
										fontSize='lg'
										me='10px'
										_hover={{ color: 'teal.300' }}>
										<Icon color='white' as={FaInstagram} w='12px' h='12px' />
									</Link>
									<Link
										href='#'
										color='teal.300'
										fontSize='lg'
										me='10px'
										_hover={{ color: 'teal.300' }}>
										<Icon color='white' as={FaTwitter} w='12px' h='12px' />
									</Link>
								</Flex>
							</Flex>
						</Flex>
					</CardBody>
				</Card>
			</Grid>
			
		</Flex>
	);
}

export default Profile;
