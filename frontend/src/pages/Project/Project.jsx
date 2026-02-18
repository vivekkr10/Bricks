import React, { useState } from "react";
import Navbar from "../../components/header.jsx";
import { useNavigate } from "react-router-dom";

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const filters = ["All", "Industrial", "Commercial", "Residential"];

  const BrickWall = ({ opacity = 0.06, color = "#8B4513" }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id={`bwall-${color.replace("#", "")}`}
        x="0"
        y="0"
        width="88"
        height="44"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="2"
          y="2"
          width="84"
          height="20"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="46"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="2"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill={`url(#bwall-${color.replace("#", "")})`}
      opacity={opacity}
    />
  </svg>
);

  const projects = [
    {
      id: 1,
      title: "Crystal Heights Tower",
      category: "Commercial",
      location: "Mumbai",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description:
        "Premium office tower with sustainable design features and smart building technology.",
      details: { area: "85,000 sq ft", year: "2024", client: "Crystal Group" },
    },
    {
      id: 2,
      title: "Serenity Villas",
      category: "Residential",
      location: "Pune",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      description:
        "Luxury villa community with modern architecture and landscaped gardens.",
      details: { area: "45,000 sq ft", year: "2023", client: "Private Client" },
    },

    {
      id: 5,
      title: "Sunset Residences",
      category: "Residential",
      location: "Goa",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      description:
        "Beachfront apartments with panoramic ocean views and tropical architecture.",
      details: {
        area: "55,000 sq ft",
        year: "2024",
        client: "Coastal Developers",
      },
    },
    {
      id: 6,
      title: "Tech Park One",
      category: "Commercial",
      location: "Hyderabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6a72?w=800&q=80",
      description:
        "IT office complex with collaborative workspaces and green building certification.",
      details: {
        area: "200,000 sq ft",
        year: "2023",
        client: "Tech Parks Ltd",
      },
    },

    {
      id: 8,
      title: "Lotus Valley Apartments",
      category: "Residential",
      location: "Delhi NCR",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      description:
        "High-rise residential tower with premium amenities and sky gardens.",
      details: { area: "150,000 sq ft", year: "2024", client: "Urban Living" },
    },

    {
      id: 10,
      title: "Innovation Hub",
      category: "Commercial",
      location: "Gurugram",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      description:
        "Startup incubator space with flexible offices and community areas.",
      details: {
        area: "35,000 sq ft",
        year: "2024",
        client: "Innovation Foundation",
      },
    },
    {
      id: 11,
      title: "Seaside Promenade",
      category: "Commercial",
      location: "Mangalore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
      description:
        "Beachfront retail and dining destination with stunning coastal views.",
      details: { area: "28,000 sq ft", year: "2022", client: "Coastal Retail" },
    },
    {
      id: 12,
      title: "Maple Woods Township",
      category: "Residential",
      location: "Chandigarh",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description:
        "Integrated township with villas, apartments, and community facilities.",
      details: {
        area: "500,000 sq ft",
        year: "2024",
        client: "Township Developers",
      },
    },
    {
      id: 13,
      title: "Business Bay Tower",
      category: "Commercial",
      location: "Navi Mumbai",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80",
      description: "Premium commercial tower with cutting-edge office spaces.",
      details: {
        area: "180,000 sq ft",
        year: "2023",
        client: "Business Bay Corp",
      },
    },

    {
      id: 15,
      title: "Orchid Residency",
      category: "Residential",
      location: "Bhopal",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      description:
        "Luxury apartment complex with modern amenities and green spaces.",
      details: {
        area: "75,000 sq ft",
        year: "2023",
        client: "Urban Developers",
      },
    },

    {
      id: 18,
      title: "Vertex Plaza",
      category: "Commercial",
      location: "Surat",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      description: "Retail and office plaza with contemporary glass facade.",
      details: { area: "18,500 sq ft", year: "2023", client: "Corporate" },
    },
    {
      id: 19,
      title: "Infinity Trade Center",
      category: "Commercial",
      location: "Vadodara",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      description:
        "Mixed-use commercial complex with efficient circulation planning.",
      details: { area: "30,000 sq ft", year: "2022", client: "Developer" },
    },

    {
      id: 22,
      title: "Cypress Court",
      category: "Residential",
      location: "Lucknow",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      description: "Premium residential development with modern apartments.",
      details: { area: "65,000 sq ft", year: "2024", client: "Housing Corp" },
    },
    {
      id: 23,
      title: "Steel City Corporate Park",
      category: "Commercial",
      location: "Jamshedpur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Corporate office park with sustainable design features.",
      details: {
        area: "90,000 sq ft",
        year: "2022",
        client: "Industrial Corp",
      },
    },

    {
      id: 25,
      title: "Lakeview Club",
      category: "Commercial",
      location: "Udaipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80",
      description:
        "Premium clubhouse with recreational facilities and lake views.",
      details: { area: "15,000 sq ft", year: "2024", client: "Club Corp" },
    },
    {
      id: 26,
      title: "Garden Heights",
      category: "Residential",
      location: "Indore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      description: "Eco-friendly residential towers with vertical gardens.",
      details: {
        area: "85,000 sq ft",
        year: "2023",
        client: "Green Developers",
      },
    },
    {
      id: 27,
      title: "City Square Mall",
      category: "Commercial",
      location: "Nagpur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80",
      description:
        "Urban shopping center with entertainment and dining options.",
      details: { area: "150,000 sq ft", year: "2024", client: "Retail Corp" },
    },

    {
      id: 30,
      title: "Spectrum Business Park",
      category: "Commercial",
      location: "Thane",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      description: "Modern business park with flexible office solutions.",
      details: {
        area: "115,000 sq ft",
        year: "2023",
        client: "Business Parks Ltd",
      },
    },
    {
      id: 31,
      title: "Silver Oak Residences",
      category: "Residential",
      location: "Agra",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=800&q=80",
      description: "Luxury apartments with panoramic city views.",
      details: { area: "48,000 sq ft", year: "2023", client: "Realty Group" },
    },

    {
      id: 33,
      title: "Tech Valley Campus",
      category: "Commercial",
      location: "Trivandrum",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      description: "IT campus with collaborative workspaces and amenities.",
      details: { area: "175,000 sq ft", year: "2024", client: "Tech Parks" },
    },

    {
      id: 35,
      title: "Royal Meadows",
      category: "Residential",
      location: "Rajkot",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "Premium township with modern villas and apartments.",
      details: { area: "280,000 sq ft", year: "2024", client: "Township Ltd" },
    },
    {
      id: 37,
      title: "Corporate Centre",
      category: "Commercial",
      location: "Faridabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Premium office space with modern amenities.",
      details: {
        area: "68,000 sq ft",
        year: "2023",
        client: "Corporate Group",
      },
    },
    {
      id: 38,
      title: "Valley View Apartments",
      category: "Residential",
      location: "Shimla",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      description: "Hill station apartments with valley views.",
      details: {
        area: "25,000 sq ft",
        year: "2024",
        client: "Hill Developers",
      },
    },
    {
      id: 39,
      title: "Convention Centre",
      category: "Commercial",
      location: "Aurangabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      description: "Modern convention facility with multiple event spaces.",
      details: {
        area: "45,000 sq ft",
        year: "2023",
        client: "Convention Bureau",
      },
    },

    {
      id: 43,
      title: "Metro Square",
      category: "Commercial",
      location: "Gwalior",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      description: "Mixed-use development with retail and office spaces.",
      details: {
        area: "52,000 sq ft",
        year: "2023",
        client: "Urban Developers",
      },
    },
    {
      id: 44,
      title: "Emerald Heights",
      category: "Residential",
      location: "Nashik",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      description: "Luxury villas with wine valley views.",
      details: {
        area: "42,000 sq ft",
        year: "2024",
        client: "Villa Developers",
      },
    },

    {
      id: 46,
      title: "Trade Tower",
      category: "Commercial",
      location: "Ludhiana",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      description: "Commercial tower with modern office spaces.",
      details: { area: "62,000 sq ft", year: "2023", client: "Trade Corp" },
    },
    {
      id: 48,
      title: "Sapphire Plaza",
      category: "Commercial",
      location: "Raipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Shopping plaza with retail and entertainment.",
      details: { area: "48,000 sq ft", year: "2023", client: "Retail Group" },
    },
    {
      id: 49,
      title: "Riverside Apartments",
      category: "Residential",
      location: "Haridwar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "Apartments with Ganges river views.",
      details: {
        area: "35,000 sq ft",
        year: "2024",
        client: "River Developers",
      },
    },
    {
      id: 50,
      title: "Business Centre",
      category: "Commercial",
      location: "Kolhapur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "Modern business center with co-working spaces.",
      details: { area: "25,000 sq ft", year: "2022", client: "Business Hub" },
    },
    {
      id: 52,
      title: "Tech Hub",
      category: "Commercial",
      location: "Mohali",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      description: "Technology incubator and startup space.",
      details: {
        area: "45,000 sq ft",
        year: "2023",
        client: "Tech Foundation",
      },
    },
    {
      id: 56,
      title: "Corporate Tower",
      category: "Commercial",
      location: "Ghaziabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Premium corporate office tower.",
      details: { area: "78,000 sq ft", year: "2024", client: "Corporate Ltd" },
    },
    {
      id: 57,
      title: "Mountain Villas",
      category: "Residential",
      location: "Darjeeling",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=800&q=80",
      description: "Luxury villas with tea garden views.",
      details: {
        area: "22,000 sq ft",
        year: "2023",
        client: "Hill Developers",
      },
    },

    {
      id: 59,
      title: "Business Park",
      category: "Commercial",
      location: "Bhopal",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      description: "Integrated business park with amenities.",
      details: {
        area: "135,000 sq ft",
        year: "2024",
        client: "Business Parks",
      },
    },
    {
      id: 60,
      title: "Sports Complex",
      category: "Commercial",
      location: "Guwahati",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      description: "Indoor sports facility with multiple courts.",
      details: {
        area: "42,000 sq ft",
        year: "2023",
        client: "Sports Authority",
      },
    },

    {
      id: 62,
      title: "Tech Park",
      category: "Commercial",
      location: "Bhubaneswar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "IT park with modern infrastructure.",
      details: {
        area: "160,000 sq ft",
        year: "2023",
        client: "Tech Parks Ltd",
      },
    },
    {
      id: 63,
      title: "Golf Course Residences",
      category: "Residential",
      location: "Kolkata",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      description: "Luxury apartments overlooking golf course.",
      details: { area: "68,000 sq ft", year: "2024", client: "Realty Corp" },
    },

    {
      id: 65,
      title: "Retail Plaza",
      category: "Commercial",
      location: "Meerut",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80",
      description: "Shopping plaza with branded stores.",
      details: { area: "52,000 sq ft", year: "2024", client: "Retail Corp" },
    },
    {
      id: 67,
      title: "City Centre",
      category: "Commercial",
      location: "Jabalpur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      description: "Mixed-use urban development.",
      details: {
        area: "72,000 sq ft",
        year: "2024",
        client: "Urban Developers",
      },
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div>
      <Navbar />
      <div className="mt-17 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <BrickWall opacity={0.07} color="#8B4513" />
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight animate-fade-in">
                Projects
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Showcasing excellence in architecture and design
              </p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className=" z-40 bg-white/75 backdrop-blur-sm border-b border-slate-200">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? `
                    bg-orange-50 text-orange-700
                    border border-orange-300
                    shadow-sm
                  `
                  : `
                    bg-white text-slate-700
                    border border-slate-200
                    hover:bg-orange-50
                    hover:border-orange-200
                  `
              }
            `}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() =>
                  navigate(`/projects/${project.id}`, { state: project })
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 rounded-full text-sm font-semibold shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-white space-y-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm">{project.architect}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <span>{project.details.area}</span>
                    </div>
                    <button className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
