import React, { useEffect, useState } from "react"
import SEO from "../components/SEO"
import CtaIllustration from "../components/CtaIllustration"
import MultiReviewSlider from "../components/MultiReviewSlider"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
	Calendar,
	Phone,
	Heart,
	Stethoscope,
	Shield,
	Activity,
	Eye,
	ArrowRight,
	CheckCircle,
	Apple,
	Scale,
	Dumbbell,
	Baby,
	Leaf,
	Briefcase,
	Clock,
	Users
} from "lucide-react"
import { getAllServicesAsync } from "../data/services"
import { getAllReviewsAsync } from "../data/reviews"

const Home = () => {
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		let mounted = true
		const iconMap = {
			Heart: Heart,
			Stethoscope: Stethoscope,
			Shield: Shield,
			Syringe: Shield,
			Activity: Activity,
			Eye: Eye,
			Apple: Apple,
			Scale: Scale,
			Dumbbell: Dumbbell,
			Baby: Baby,
		}

		const fetchServices = async () => {
			try {
				const list = await getAllServicesAsync()
				if (!mounted) return
				const mapped = list.slice(0, 3).map((s) => ({
					icon: React.createElement(iconMap[s.icon] || Heart, {
						className: "w-8 h-8",
					}),
					title: s.title,
					description: s.description,
				}))
				setServices(mapped)
			} catch (_) {
				setServices([])
			}
		}

		const fetchReviews = async () => {
			try {
				const reviewList = await getAllReviewsAsync()
				if (mounted) {
					const reviewsWithRating = reviewList.map((r) => ({
						...r,
						rating: 5,
					}))
					setReviews(reviewsWithRating)
				}
			} catch (error) {
				console.error("Failed to fetch reviews:", error)
				setReviews([])
			}
		}

		fetchServices()
		fetchReviews()

		return () => {
			mounted = false
		}
	}, [])

	return (
		<>
			<SEO
				title="Dr. Mariya Udaipurwala - Registered Dietitian Nutritionist"
				description="Compassionate and professional nutrition counseling services for all ages. Mariya Udaipurwala is a certified Dietitian with over 25 years of experience."
			/>
			<div className="min-h-screen selection:bg-primary-200 selection:text-primary-900">

				{/* Hero Section - Magazine Style Center Layout */}
				< section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20" >
					{/* Background Glows (Sunlight) */}
					< div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-100/40 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none" ></div >
					<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/30 blur-[80px] -z-10 rounded-full pointer-events-none"></div>

					<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="flex flex-col items-center"
						>
							{/* Premium Badge */}
							<div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-medical-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
								<Leaf className="w-4 h-4 text-primary-600" />
								<span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
									Registered Dietitian Nutritionist
								</span>
							</div>

							{/* Headline */}
							<h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-medical-800 mb-6 leading-[1.1] tracking-tight text-balance">
								Nourish Your Body,<br />
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-accent-700 filter drop-shadow-md">
									Fuel Your Life.
								</span>
							</h1>

							{/* Subheadline - Centered & Clean */}
							<p className="text-xl md:text-2xl text-medical-600 mb-10 leading-relaxed max-w-2xl mx-auto text-balance font-light">
								Evidence-based nutrition counseling tailored to your unique biology and lifestyle.
							</p>

							{/* CTAs */}
							<div className="flex flex-col sm:flex-row gap-5">
								<Link
									to="/appointment"
									className="btn-primary flex items-center justify-center group text-lg min-w-[200px]">
									<Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
									Book Consultation
								</Link>
								<Link
									to="/services"
									className="btn-outline flex items-center justify-center group text-lg min-w-[200px] bg-white/50 backdrop-blur-sm">
									Explore Services
								</Link>
							</div>

							{/* Social Proof / Trust Indicators */}
							<div className="mt-16 pt-8 border-t border-medical-200/50 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5 text-primary-500" />
									<span className="font-semibold text-medical-700">25+ Years Experience</span>
								</div>
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5 text-primary-500" />
									<span className="font-semibold text-medical-700">Certified Specialist</span>
								</div>
								<div className="flex items-center space-x-2">
									<CheckCircle className="w-5 h-5 text-primary-500" />
									<span className="font-semibold text-medical-700">1000+ Happy Patients</span>
								</div>
							</div>

						</motion.div>
					</div>
				</section >

				{/* Services Overview - Glass Cards */}
				< section className="section-padding relative" >
					<div className="max-w-7xl mx-auto relative z-10">
						<div className="flex flex-col md:flex-row justify-between items-end mb-12">
							<div className="max-w-2xl">
								<h2 className="text-4xl font-bold text-medical-800 mb-4 tracking-tight">
									Holistic Nutrition Services
								</h2>
								<p className="text-lg text-medical-600">
									Comprehensive care designed to meet your health needs at every stage of life.
								</p>
							</div>
							<Link to="/services" className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
								View all services <ArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{services.map((service, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="group relative bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-medical-200 hover:border-primary-200 hover:shadow-[0_20px_40px_-15px_rgba(127,183,126,0.15)] transition-all duration-300">
									<div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
										{service.icon}
									</div>
									<h3 className="text-2xl font-bold text-medical-800 mb-3">
										{service.title}
									</h3>
									<p className="text-medical-600 leading-relaxed mb-6">{service.description}</p>
									<div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
										<ArrowRight className="w-6 h-6 text-primary-500" />
									</div>
								</motion.div>
							))}
						</div>

						<div className="mt-8 text-center md:hidden">
							<Link to="/services" className="btn-secondary inline-flex items-center">
								View all services <ArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</div>
					</div>
				</section >

				{/* About Section - Split with Image */}
				< section className="section-padding overflow-hidden" >
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
							<div className="relative order-2 lg:order-1">
								{/* Abstract Image Representation */}
								<div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-medical-200">
									{/* Placeholder for Doctor Image - Using a gradient placeholder if image missing, or actual image */}
									<div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-medical-50 flex items-center justify-center">
										<Users className="w-32 h-32 text-primary-300 opacity-50" />
									</div>
									{/* Overlay Content */}
									<div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-md p-8 border-t border-white/50">
										<div className="flex justify-between items-end">
											<div>
												<p className="text-sm uppercase tracking-wider font-bold text-primary-600 mb-1">Dr. Mariya U.</p>
												<h3 className="text-2xl font-bold text-medical-800">Your Partner in Health</h3>
											</div>
											<div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-white">
												<Heart className="w-6 h-6" />
											</div>
										</div>
									</div>
								</div>
								{/* Decorative blob */}
								<div className="absolute -z-10 top-10 -left-10 w-full h-full bg-accent-100 rounded-full blur-3xl opacity-40"></div>
							</div>

							<div className="order-1 lg:order-2">
								<h2 className="text-4xl md:text-5xl font-bold text-medical-800 mb-6 leading-tight">
									Evidence-Based Care, <br />
									<span className="text-primary-500 italic">Personalized for You.</span>
								</h2>
								<p className="text-xl text-medical-600 mb-8 leading-relaxed">
									Nutrition isn't one-size-fits-all. We don't believe in fad diets. Instead, we focus on sustainable lifestyle changes grounded in medical science and tailored to your personal goals.
								</p>

								<div className="space-y-6 mb-10">
									<div className="flex items-start">
										<div className="w-12 h-12 rounded-full bg-white border border-medical-200 flex items-center justify-center mr-5 flex-shrink-0 shadow-sm text-primary-600">
											<Clock className="w-5 h-5" />
										</div>
										<div>
											<h3 className="text-lg font-bold text-medical-800 mb-1">Flexible Scheduling</h3>
											<p className="text-medical-600">Evening and weekend appointments available.</p>
										</div>
									</div>
									<div className="flex items-start">
										<div className="w-12 h-12 rounded-full bg-white border border-medical-200 flex items-center justify-center mr-5 flex-shrink-0 shadow-sm text-primary-600">
											<Users className="w-5 h-5" />
										</div>
										<div>
											<h3 className="text-lg font-bold text-medical-800 mb-1">All Ages Welcome</h3>
											<p className="text-medical-600">Pediatric, adult, and geriatric nutrition therapy.</p>
										</div>
									</div>
								</div>

								<Link to="/about" className="text-primary-600 font-bold hover:text-primary-700 underline decoration-2 underline-offset-4 transition-colors">
									Learn more about our approach
								</Link>
							</div>
						</div>
					</div>
				</section >

				{/* Testimonials - Clean Slider */}
				< section className="section-padding bg-white relative" >
					<div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-medical-50 to-white pointer-events-none"></div>
					<div className="max-w-7xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-medical-800 mb-4">
								Patient Success Stories
							</h2>
							<p className="text-xl text-medical-600 max-w-2xl mx-auto">
								Real results from real people who have transformed their lives through better nutrition.
							</p>
						</div>
						<div className="mt-12">
							<MultiReviewSlider reviews={reviews} />
						</div>
					</div>
				</section >

				{/* CTA Section - Floating Glass Card */}
				< section className="py-24 px-4 sm:px-6 relative overflow-hidden" >
					{/* Background abstract */}
					< div className="absolute inset-0 bg-primary-50/50" ></div >
					<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-100/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

					<div className="max-w-5xl mx-auto relative z-10">
						<div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 md:p-16 text-center shadow-[0_20px_60px_-15px_rgba(79,111,82,0.15)] border border-white">
							<h2 className="text-4xl md:text-5xl font-black text-medical-800 mb-6">
								Start Your Journey Today
							</h2>
							<p className="text-xl md:text-2xl text-medical-600 mb-10 max-w-3xl mx-auto">
								Expert guidance tailored to your health goals is just an appointment away.
							</p>
							<div className="flex flex-col sm:flex-row gap-5 justify-center">
								<Link
									to="/appointment"
									className="btn-primary inline-flex items-center justify-center text-lg min-w-[200px] shadow-xl shadow-accent-500/20">
									<Calendar className="w-5 h-5 mr-2" />
									Book Now
								</Link>
								<Link
									to="/contact"
									className="btn-outline bg-white inline-flex items-center justify-center text-lg min-w-[200px]">
									<Phone className="w-5 h-5 mr-2" />
									Contact Us
								</Link>
							</div>
						</div>
					</div>
				</section >
			</div >
		</>
	)
};

export default Home;
