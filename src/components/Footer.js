import React from "react"
import { Link } from "react-router-dom"
import {
	Phone,
	Mail,
	MapPin,
	Clock,
} from "lucide-react"

const Footer = () => {
	return (
		<footer className="footer-bg relative overflow-hidden">
			{/* Soft overlay pattern */}
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Practice Info */}
					<div>
						<Link to="/" className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02] mb-8">
							<div className="relative">
								<img
									src="/logo.png"
									alt="NutriEd Logo"
									className="h-12 w-12 object-contain rounded-full shadow-lg shadow-black/20 group-hover:shadow-black/30 transition-shadow duration-300 bg-white"
								/>
							</div>
							<div className="flex flex-col">
								<h1 className="text-2xl font-black tracking-tighter leading-none text-white">
									Dr. Mariya <span className="text-primary-200">U.</span>
								</h1>
								<div className="flex items-center space-x-2 mt-1">
									<span className="h-[1px] w-4 bg-primary-300"></span>
									<span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-100 leading-none">
										Diet & Nutrition
									</span>
								</div>
							</div>
						</Link>
						<p className="text-primary-100/80 mb-6 leading-relaxed">
							Providing exceptional nutrition and dietetics services with compassion and
							expertise.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-6 text-white border-b border-primary-400/30 pb-2 inline-block">Quick Links</h3>
						<ul className="space-y-3">
							<li><Link to="/" className="text-primary-100 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Home</Link></li>
							<li><Link to="/services" className="text-primary-100 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Services</Link></li>
							<li><Link to="/about" className="text-primary-100 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About Us</Link></li>
							<li><Link to="/contact" className="text-primary-100 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Contact</Link></li>
							<li><Link to="/appointment" className="text-primary-100 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Book Appointment</Link></li>
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="text-lg font-semibold mb-6 text-white border-b border-primary-400/30 pb-2 inline-block">Expertise</h3>
						<ul className="space-y-3 text-primary-100">
							<li>Diet Consultation</li>
							<li>Weight Management</li>
							<li>Diabetes Diet Plan</li>
							<li>Sports Nutrition</li>
							<li>Pediatric Nutrition</li>
							<li className="text-accent-300 font-medium">Online Consultation Available</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold mb-6 text-white border-b border-primary-400/30 pb-2 inline-block">Contact Info</h3>
						<div className="space-y-4 text-primary-100">
							<div className="flex items-start">
								<MapPin className="w-5 h-5 text-accent-300 mt-0.5 mr-3 flex-shrink-0" />
								<div>
									<p>123 Medical Center Dr</p>
									<p>Suite 100</p>
									<p>New York, NY 10001</p>
								</div>
							</div>
							<div className="flex items-center">
								<Phone className="w-5 h-5 text-accent-300 mr-3 flex-shrink-0" />
								<span>(555) 123-4567</span>
							</div>
							<div className="flex items-center">
								<Mail className="w-5 h-5 text-accent-300 mr-3 flex-shrink-0" />
								<span>info@mariya-nutrition.com</span>
							</div>
							<div className="flex items-start">
								<Clock className="w-5 h-5 text-accent-300 mt-0.5 mr-3 flex-shrink-0" />
								<div>
									<p>Mon-Fri: 8:00 AM - 6:00 PM</p>
									<p>Sat: 9:00 AM - 2:00 PM</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-primary-800/50 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-200/60">
						<p>
							© 2025 Dr. Mariya Udaipurwala Nutrition Practice. All rights reserved.
						</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
							<Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
