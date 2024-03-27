
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Icon,
	Progress,
	SimpleGrid,
	Spacer,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react';
import { getAuthors } from 'Redux-Toolkit/authortableSlice';
import { getProjectdata } from 'Redux-Toolkit/projecttableSlice';
import medusa from 'assets/img/cardimgfree.png';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon } from 'components/Icons/Icons.js';
// Tables
import DashboardTableRow from 'components/Tables/DashboardTableRow';
import TimelineRow from 'components/Tables/TimelineRow';
import React, { useEffect, useState } from 'react';
// Styles for the circular bar
import { AiFillCheckCircle, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BiHappy } from 'react-icons/bi';
// icons
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoCheckmarkDoneCircleSharp, IoEllipsisHorizontal } from 'react-icons/io5';
import { SiAuth0 } from 'react-icons/si';
import { useDispatch } from 'react-redux';
// Data
import {
	barChartDataDashboard,
	barChartOptionsDashboard,
	lineChartDataDashboard,
	lineChartOptionsDashboard
} from 'variables/charts';
import { dashboardTableData, timelineData } from 'variables/general';

export default function Dashboard() {
	const dispatch = useDispatch()
	let user = localStorage.getItem("User")
	let userType = localStorage.getItem("userType")
	const [authordata, setAuthorData] = useState(0)
	const [projectdata, setProjectData] = useState(0)
	const [onlineStatus, setOnlineStatus] = useState(0)
	const [budget, setBudget] = useState(0)
	const [data, setData] = useState([])
	const [data2, setData2] = useState([])
	const [loading, setLoading] = useState(false)

	const GetDashboard = () => {
		dispatch(getAuthors()).then((res) => {
			setData2(res?.payload?.data)
			setAuthorData(res?.payload?.data?.length);
			const onlineAuthorsCount = res?.payload?.data?.filter(
				(item) => item.status === "online"
			).length;
			setOnlineStatus(onlineAuthorsCount);
		});
	};

	const GetProject = () => {
		setLoading(true)
		dispatch(getProjectdata()).then((res) => {
			if (res?.payload?.msg === "Project data!") {
				setData(res?.payload?.data)
				setProjectData(res?.payload?.data?.length)
				const totalBudget = res?.payload?.data?.reduce(
					(accumulator, item) => accumulator + item.budget,
					0
				);
				setBudget(totalBudget)
				setTimeout(() => {
					setLoading(false)
				}, 5000)
			}
		})
	}

	useEffect(() => {
		GetDashboard()
		GetProject()
	}, [])
	return (
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
		<SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
			<Card>
				<CardBody>
					<Flex flexDirection='row' align='center' justify='center' w='100%'>
						<Stat me='auto'>
							<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
								Author's Table
							</StatLabel>
							<Flex>
								<StatNumber fontSize='lg' color='#fff'>
									{authordata}
								</StatNumber>
								{/* <StatHelpText
									alignSelf='flex-end'
									justifySelf='flex-end'
									m='0px'
									color='green.400'
									fontWeight='bold'
									ps='3px'
									fontSize='md'>
									{authordata}
								</StatHelpText> */}
							</Flex>
						</Stat>
						<IconBox as='box' h={'45px'} w={'45px'} fontSize='20px' bg='brand.200'>
							<SiAuth0 h={'24px'} w={'24px'} color='#fff' />
						</IconBox>
					</Flex>
				</CardBody>
			</Card>
			<Card minH='83px'>
				<CardBody>
					<Flex flexDirection='row' align='center' justify='center' w='100%'>
						<Stat me='auto'>
							<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
								Project Table
							</StatLabel>
							<Flex>
								<StatNumber fontSize='lg' color='#fff'>
									{projectdata}
								</StatNumber>
								{/* <StatHelpText
									alignSelf='flex-end'
									justifySelf='flex-end'
									m='0px'
									color='green.400'
									fontWeight='bold'
									ps='3px'
									fontSize='md'>
									+5%
								</StatHelpText> */}
							</Flex>
						</Stat>
						<IconBox as='box' h={'45px'} w={'45px'} fontSize="20px" bg='brand.200'>
							<AiOutlineFundProjectionScreen h={'24px'} w={'24px'} color='#fff' />
						</IconBox>
					</Flex>
				</CardBody>
			</Card>

			<Card>
				<CardBody>
					<Flex flexDirection='row' align='center' justify='center' w='100%'>
						<Stat>
							<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
								Online Author
							</StatLabel>
							<Flex>
								<StatNumber fontSize='lg' color='#fff'>
									{onlineStatus}
								</StatNumber>
								{/* <StatHelpText
									alignSelf='flex-end'
									justifySelf='flex-end'
									m='0px'
									color='red.500'
									fontWeight='bold'
									ps='3px'
									fontSize='md'>
									-14%
								</StatHelpText> */}
							</Flex>
						</Stat>
						<Spacer />
						<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
							<DocumentIcon h={'24px'} w={'24px'} color='#fff' />
						</IconBox>
					</Flex>
				</CardBody>
			</Card>
			{/* MiniStatistics Card */}
			<Card>
				<CardBody>
					<Flex flexDirection='row' align='center' justify='center' w='100%'>
						<Stat me='auto'>
							<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
								Total Budget
							</StatLabel>
							<Flex>
								<StatNumber fontSize='lg' color='#fff' fontWeight='bold'>
									$ {budget}
								</StatNumber>
								{/* <StatHelpText
									alignSelf='flex-end'
									justifySelf='flex-end'
									m='0px'
									color='green.400'
									fontWeight='bold'
									ps='3px'
									fontSize='md'>
									+8%
								</StatHelpText> */}
							</Flex>
						</Stat>
						<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
							<CartIcon h={'24px'} w={'24px'} color='#fff' />
						</IconBox>
					</Flex>
				</CardBody>
			</Card>
		</SimpleGrid>
		<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', '2xl': '2fr 1.2fr 1.5fr' }} my='26px' gap='18px'>
			{/* Welcome Card */}
			<Card
				p='0px'
				gridArea={{ md: '1 / 1 / 2 / 3', '2xl': 'auto' }}
				bgImage="https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/UUID-cl90fopfn753495vmqyba9mrv1k/public"

				bgSize='cover'
				bgPosition='50%'>
				<CardBody w='100%' h='100%'>
					<Flex flexDirection={{ sm: 'column', lg: 'row' }} w='100%' h='100%'>
						<Flex flexDirection='column' h='100%' p='22px' minW='60%' lineHeight='1.6'>
							<Text fontSize='sm' color='gray.400' fontWeight='bold'>
								Welcome back,
							</Text>
							<Text fontSize='28px' color='#fff' fontWeight='bold' mb='18px'>
								{user} <span>({userType})</span>
							</Text>
						
							<Text fontSize='md' color='gray.400' fontWeight='normal' mb='auto'>
								Glad to see you again! <br />
								Ask me anything.
							</Text>
							<Spacer />
							<Flex align='center'>
								<Button
									p='0px'
									variant='no-hover'
									bg='transparent'
									my={{ sm: '1.5rem', lg: '0px' }}>
									<Text
										fontSize='sm'
										color='#fff'
										fontWeight='bold'
										cursor='pointer'
										transition='all .3s ease'
										my={{ sm: '1.5rem', lg: '0px' }}
										_hover={{ me: '4px' }}>
										Tab to record
									</Text>
									<Icon
										as={BsArrowRight}
										w='20px'
										h='20px'
										color='#fff'
										fontSize='2xl'
										transition='all .3s ease'
										mx='.3rem'
										cursor='pointer'
										pt='4px'
										_hover={{ transform: 'translateX(20%)' }}
									/>
								</Button>
							</Flex>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
			{/* Satisfaction Rate */}
			<Card gridArea={{ md: '2 / 1 / 3 / 2', '2xl': 'auto' }}>
				<CardHeader mb='24px'>
					<Flex direction='column'>
						<Text color='#fff' fontSize='lg' fontWeight='bold' mb='4px'>
							Satisfaction Rate
						</Text>
						<Text color='gray.400' fontSize='sm'>
							From all projects
						</Text>
					</Flex>
				</CardHeader>
				<Flex direction='column' justify='center' align='center'>
					<Box zIndex='-1'>
						<CircularProgress
							size={200}
							value={80}
							thickness={6}
							color='#582CFF'
							variant='vision'
							rounded>
							<CircularProgressLabel>
								<IconBox mb='20px' mx='auto' bg='brand.200' borderRadius='50%' w='48px' h='48px'>
									<Icon as={BiHappy} color='#fff' w='30px' h='30px' />
								</IconBox>
							</CircularProgressLabel>
						</CircularProgress>
					</Box>
					<Stack
						direction='row'
						spacing={{ sm: '42px', md: '68px' }}
						justify='center'
						maxW={{ sm: '270px', md: '300px', lg: '100%' }}
						mx={{ sm: 'auto', md: '0px' }}
						p='18px 22px'
						bg='linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgba(10, 14, 35) 91.2%)'
						borderRadius='20px'
						position='absolute'
						bottom='5%'>
						<Text fontSize='xs' color='gray.400'>
							0%
						</Text>
						<Flex direction='column' align='center' minW='80px'>
							<Text color='#fff' fontSize='28px' fontWeight='bold'>
								{projectdata}%
							</Text>
							<Text fontSize='xs' color='gray.400'>
								Based on likes
							</Text>
						</Flex>
						<Text fontSize='xs' color='gray.400'>
							100%
						</Text>
					</Stack>
				</Flex>
			</Card>
			{/* Referral Tracking */}
			<Card gridArea={{ md: '2 / 2 / 3 / 3', '2xl': 'auto' }}>
				<Flex direction='column'>
					<Flex justify='space-between' align='center' mb='40px'>
						<Text color='#fff' fontSize='lg' fontWeight='bold'>
							Referral Tracking
						</Text>
						<Button borderRadius='12px' w='38px' h='38px' bg='#22234B' _hover='none' _active='none'>
							<Icon as={IoEllipsisHorizontal} color='#7551FF' />
						</Button>
					</Flex>
					<Flex direction={{ sm: 'column', md: 'row' }}>
						<Flex direction='column' me={{ md: '6px', lg: '52px' }} mb={{ sm: '16px', md: '0px' }}>
							<Flex
								direction='column'
								p='22px'
								pe={{ sm: '22e', md: '8px', lg: '22px' }}
								minW={{ sm: '220px', md: '140px', lg: '220px' }}
								// bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
								borderRadius='20px'
								mb='20px'>
								<Text color='gray.400' fontSize='sm' mb='4px'>
									Invited
								</Text>
								<Text color='#fff' fontSize='lg' fontWeight='bold'>
									{authordata}
								</Text>
							</Flex>
							<Flex
								direction='column'
								p='22px'
								pe={{ sm: '22px', md: '8px', lg: '22px' }}
								minW={{ sm: '170px', md: '140px', lg: '170px' }}
								// bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
								borderRadius='20px'>
								<Text color='gray.400' fontSize='sm' mb='4px'>
									Bonus
								</Text>
								<Text color='#fff' fontSize='lg' fontWeight='bold'>
									{budget*5/100}
								</Text>
							</Flex>
						</Flex>
						<Box mx={{ sm: 'auto', md: '0px' }}>
							<CircularProgress
								size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
								value={70}
								thickness={6}
								color='#05CD99'
								variant='vision'>
								<CircularProgressLabel>
									<Flex direction='column' justify='center' align='center'>
										<Text color='gray.400' fontSize='sm'>
											Safety
										</Text>
										<Text
											color='#fff'
											fontSize={{ md: '36px', lg: '50px' }}
											fontWeight='bold'
											mb='4px'>
											{authordata}
										</Text>
										<Text color='gray.400' fontSize='sm'>
											Total Score
										</Text>
									</Flex>
								</CircularProgressLabel>
							</CircularProgress>
						</Box>
					</Flex>
				</Flex>
			</Card>
		</Grid>
		<Grid
			templateColumns={{ sm: '1fr', lg: '1.7fr 1.3fr' }}
			maxW={{ sm: '100%', md: '100%' }}
			gap='24px'
			mb='24px'>
			{/* Sales Overview */}
			<Card p='28px 0px 0px 0px'>
				<CardHeader mb='20px' ps='22px'>
					<Flex direction='column' alignSelf='flex-start'>
						<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
							Sales Overview
						</Text>
						<Text fontSize='md' fontWeight='medium' color='gray.400'>
							<Text as='span' color='green.400' fontWeight='bold'>
								(+5%) more
							</Text>{' '}
							in 2021
						</Text>
					</Flex>
				</CardHeader>
				<Box w='100%' minH={{ sm: '300px' }}>
					<LineChart
						lineChartData={lineChartDataDashboard}
						lineChartOptions={lineChartOptionsDashboard}
					/>
				</Box>
			</Card>

			<Card p='16px'>
				<CardBody>
					<Flex direction='column' w='100%'>
						<Box
							// bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
							borderRadius='20px'
							display={{ sm: 'flex', md: 'block' }}
							justify={{ sm: 'center', md: 'flex-start' }}
							align={{ sm: 'center', md: 'flex-start' }}
							minH={{ sm: '180px', md: '220px' }}
							p={{ sm: '0px', md: '22px' }}>
							<BarChart
								barChartOptions={barChartOptionsDashboard}
								barChartData={barChartDataDashboard}
							/>
						</Box>
						<Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
								Active Users
							</Text>
							<Text fontSize='md' fontWeight='medium' color='gray.400'>
								<Text as='span' color='green.400' fontWeight='bold'>
									(+23%)
								</Text>{' '}
								than last week
							</Text>
						</Flex>
						{loading ? (
							<Flex flexDirection='column' color='white' alignItems='center' justifyContent='center' width='100%'>
								<Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width='200px' height='100px' />
								<Text mt={5}>Api is Loading...</Text>
							</Flex>
						) : (
							<SimpleGrid gap={{ sm: '12px' }} columns={4}>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<WalletIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Authors
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										{authordata}
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={20} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<RocketIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Projects
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										{projectdata}
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={90} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<CartIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Activity
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										{onlineStatus}
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={30} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<StatsIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Budget
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										$ {budget}
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={50} />
								</Flex>
							</SimpleGrid>
						)}

					</Flex>
				</CardBody>
			</Card>
		</Grid>
		<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }} gap='24px'>
			{/* Projects */}
			<Card p='16px' overflowX={{ sm: 'scroll', xl: 'hidden' }}>
				<CardHeader p='12px 0px 28px 0px'>
					<Flex direction='column'>
						<Text fontSize='lg' color='#fff' fontWeight='bold' pb='8px'>
							Projects
						</Text>
						<Flex align='center'>
							<Icon as={IoCheckmarkDoneCircleSharp} color='teal.300' w={4} h={4} pe='3px' />
							<Text fontSize='sm' color='gray.400' fontWeight='normal'>
								<Text fontWeight='bold' as='span'>
									30 done
								</Text>{' '}
								this month.
							</Text>
						</Flex>
					</Flex>
				</CardHeader>
				{loading ? (
					<Flex flexDirection='column' color='white' alignItems='center' justifyContent='center' width='100%'>
						<Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width='200px' height='200px' />
						<Text mt={5}>Api is Loading...</Text>
					</Flex>
				) : (
					<Table variant='simple' color='#fff'>
						<Thead>
							<Tr my='.8rem' ps='0px'>
								<Th
									ps='0px'
									color='gray.400'
									fontFamily='Plus Jakarta Display'
									borderBottomColor='#56577A'>
									Companies
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Status
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Budget
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Completion
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data?.length > 0 && data?.map((row, index, arr) => {
								return (
									<DashboardTableRow
										name={row.name}
										logo={row.logo}
										members={row.status}
										budget={row.budget}
										progression={row.completion}
										lastItem={index === arr.length - 1 ? true : false}
									/>
								);
							})}
						</Tbody>
					</Table>
				)}

			</Card>
			{/* Orders Overview */}
			<Card>
				<CardHeader mb='32px'>
					<Flex direction='column'>
						<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
							Overview
						</Text>
						<Flex align='center'>
							<Icon as={AiFillCheckCircle} color='green.500' w='15px' h='15px' me='5px' />
							<Text fontSize='sm' color='gray.400' fontWeight='normal'>
								<Text fontWeight='bold' as='span' color='gray.400'>
									+30%
								</Text>{' '}
								this month
							</Text>
						</Flex>
					</Flex>
				</CardHeader>
				{loading ? (
					<Flex flexDirection='column' color='white' alignItems='center' justifyContent='center' width='100%'>
						<Avatar src="https://i.pinimg.com/originals/13/ed/b3/13edb3ccfceecfb23a77f74418232244.gif" width='200px' height='200px' />
						<Text mt={5}>Api is Loading...</Text>
					</Flex>
				) : (
					<CardBody>
						<Flex direction='column' lineHeight='21px'>
							{data2?.map((row, index, arr) => {
								return (
									<TimelineRow
										logo={row.logo}
										title={row.name}
										date={row.date}
										color={row.color}
										index={index}
										arrLength={arr.length}
									/>
								);
							})}
							{data?.map((row, index, arr) => {
								return (
									<TimelineRow
										logo={row.logo}
										title={row.name}
										date={row.date}
										color={row.color}
										index={index}
										arrLength={arr.length}
									/>
								);
							})}
						</Flex>
					</CardBody>
				)}

			</Card>
		</Grid>
	</Flex>
	);
}
