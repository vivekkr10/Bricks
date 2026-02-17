import React, { useState } from "react";
import Navbar from "../../components/header.jsx";

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    "All",
    "Interior",
    "Institutional",
    "Restaurant",
    "Commercial",
    "Residential",
  ];

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
      id: 3,
      title: "Riverside School",
      category: "Educational",
      location: "Ahmedabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      description:
        "Modern educational facility with open learning spaces and sustainable design.",
      details: {
        area: "65,000 sq ft",
        year: "2023",
        client: "Education Trust",
      },
    },
    {
      id: 4,
      title: "Green Valley Hospital",
      category: "Healthcare",
      location: "Bangalore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=800&q=80",
      description:
        "State-of-the-art healthcare facility with patient-centric design.",
      details: {
        area: "120,000 sq ft",
        year: "2022",
        client: "Healthcare Corp",
      },
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
      id: 7,
      title: "Heritage Museum",
      category: "Cultural",
      location: "Jaipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566125881251-f265414e5b60?w=800&q=80",
      description:
        "Cultural museum blending traditional Rajasthani architecture with modern design.",
      details: {
        area: "40,000 sq ft",
        year: "2022",
        client: "Heritage Foundation",
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
      id: 9,
      title: "Grand Hyatt Convention",
      category: "Hospitality",
      location: "Chennai",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      description:
        "Luxury convention center with grand ballroom and executive facilities.",
      details: { area: "95,000 sq ft", year: "2023", client: "Hyatt Hotels" },
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
      id: 14,
      title: "Sanskriti Cultural Center",
      category: "Cultural",
      location: "Varanasi",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&q=80",
      description:
        "Cultural center promoting traditional arts and performances.",
      details: {
        area: "25,000 sq ft",
        year: "2022",
        client: "Cultural Society",
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
      id: 16,
      title: "Marriott Executive Hotel",
      category: "Hospitality",
      location: "Kolkata",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      description:
        "Business hotel with premium accommodations and conference facilities.",
      details: {
        area: "110,000 sq ft",
        year: "2024",
        client: "Marriott International",
      },
    },
    {
      id: 17,
      title: "Knowledge Park Campus",
      category: "Educational",
      location: "Noida",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
      description:
        "Modern university campus with academic blocks and research centers.",
      details: {
        area: "250,000 sq ft",
        year: "2023",
        client: "Education Trust",
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
      id: 20,
      title: "Himalayan Retreat",
      category: "Hospitality",
      location: "Manali",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80",
      description:
        "Mountain resort with traditional architecture and modern comforts.",
      details: { area: "22,000 sq ft", year: "2024", client: "Resort Chain" },
    },
    {
      id: 21,
      title: "Medicity Hospital",
      category: "Healthcare",
      location: "Kochi",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      description: "Multi-specialty hospital with advanced medical facilities.",
      details: {
        area: "140,000 sq ft",
        year: "2023",
        client: "Medicity Group",
      },
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
      id: 24,
      title: "Pearl Academy",
      category: "Educational",
      location: "Coimbatore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      description: "Design academy with creative learning spaces and studios.",
      details: {
        area: "42,000 sq ft",
        year: "2023",
        client: "Education Foundation",
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
      id: 28,
      title: "Sunrise School",
      category: "Educational",
      location: "Mysore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      description:
        "Progressive school campus with innovative learning environments.",
      details: {
        area: "38,000 sq ft",
        year: "2022",
        client: "Education Society",
      },
    },
    {
      id: 29,
      title: "Palm Grove Resort",
      category: "Hospitality",
      location: "Kovalam",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      description: "Beachfront resort with traditional Kerala architecture.",
      details: {
        area: "32,000 sq ft",
        year: "2024",
        client: "Hospitality Group",
      },
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
      id: 32,
      title: "Heritage Inn",
      category: "Hospitality",
      location: "Jodhpur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      description:
        "Boutique hotel blending heritage architecture with modern luxury.",
      details: {
        area: "18,000 sq ft",
        year: "2022",
        client: "Heritage Hotels",
      },
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
      id: 34,
      title: "Rainbow Children's Hospital",
      category: "Healthcare",
      location: "Visakhapatnam",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=800&q=80",
      description:
        "Pediatric hospital with child-friendly design and facilities.",
      details: {
        area: "55,000 sq ft",
        year: "2023",
        client: "Healthcare Group",
      },
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
      id: 36,
      title: "Central Library",
      category: "Cultural",
      location: "Bhubaneswar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566125881251-f265414e5b60?w=800&q=80",
      description: "Modern library with digital resources and reading spaces.",
      details: { area: "35,000 sq ft", year: "2022", client: "Municipal Corp" },
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
      id: 40,
      title: "International School",
      category: "Educational",
      location: "Amritsar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      description:
        "World-class educational facility with international curriculum.",
      details: {
        area: "72,000 sq ft",
        year: "2024",
        client: "Education Trust",
      },
    },
    {
      id: 41,
      title: "Wellness Center",
      category: "Healthcare",
      location: "Pondicherry",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      description: "Holistic wellness center with spa and medical facilities.",
      details: { area: "22,000 sq ft", year: "2022", client: "Wellness Corp" },
    },
    {
      id: 42,
      title: "Coral Cove Resort",
      category: "Hospitality",
      location: "Andaman",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      description: "Island resort with beachfront villas and water activities.",
      details: { area: "38,000 sq ft", year: "2024", client: "Island Resorts" },
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
      id: 45,
      title: "Performing Arts Center",
      category: "Cultural",
      location: "Mysore",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&q=80",
      description: "Cultural venue for music and dance performances.",
      details: {
        area: "28,000 sq ft",
        year: "2022",
        client: "Arts Foundation",
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
      id: 47,
      title: "Medical College",
      category: "Educational",
      location: "Madurai",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
      description: "Medical education facility with teaching hospital.",
      details: { area: "220,000 sq ft", year: "2024", client: "Medical Trust" },
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
      id: 51,
      title: "Desert Resort",
      category: "Hospitality",
      location: "Jaisalmer",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      description: "Luxury resort with desert safari experiences.",
      details: { area: "30,000 sq ft", year: "2024", client: "Desert Hotels" },
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
      id: 53,
      title: "Greenfield School",
      category: "Educational",
      location: "Dehradun",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      description: "Boarding school with extensive campus facilities.",
      details: {
        area: "95,000 sq ft",
        year: "2024",
        client: "Education Society",
      },
    },
    {
      id: 54,
      title: "City Hospital",
      category: "Healthcare",
      location: "Ranchi",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1587351021759-3772687fe598?w=800&q=80",
      description: "Multi-specialty hospital with modern equipment.",
      details: { area: "88,000 sq ft", year: "2023", client: "Healthcare Ltd" },
    },
    {
      id: 55,
      title: "Lake Resort",
      category: "Hospitality",
      location: "Nainital",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80",
      description: "Lakefront resort with mountain views.",
      details: { area: "28,000 sq ft", year: "2022", client: "Resort Group" },
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
      id: 58,
      title: "Art Gallery",
      category: "Cultural",
      location: "Kochi",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1566125881251-f265414e5b60?w=800&q=80",
      description: "Modern art gallery with exhibition spaces.",
      details: { area: "18,000 sq ft", year: "2022", client: "Art Foundation" },
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
      id: 61,
      title: "Heritage Hotel",
      category: "Hospitality",
      location: "Udaipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      description: "Palace hotel with traditional architecture.",
      details: {
        area: "35,000 sq ft",
        year: "2024",
        client: "Heritage Hotels",
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
      id: 64,
      title: "University Campus",
      category: "Educational",
      location: "Patna",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80",
      description: "Modern university with academic buildings.",
      details: {
        area: "280,000 sq ft",
        year: "2023",
        client: "University Trust",
      },
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
      id: 66,
      title: "Ayurvedic Retreat",
      category: "Healthcare",
      location: "Kerala",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      description: "Wellness retreat with Ayurvedic treatments.",
      details: { area: "25,000 sq ft", year: "2022", client: "Wellness Group" },
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

    // Restaurant Projects

    {
      id: 68,
      title: "Spice Route Bistro",
      category: "Restaurant",
      location: "Vadodara",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1555992336-03a23c8f9e8b?w=800&q=80",
      description:
        "Modern bistro design inspired by Indian spices and warm interiors.",
      details: {
        area: "4,500 sq ft",
        year: "2024",
        client: "Hospitality",
      },
    },
    {
      id: 69,
      title: "Urban Tandoor",
      category: "Restaurant",
      location: "Ahmedabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      description: "Contemporary Indian restaurant with open kitchen concept.",
      details: {
        area: "3,800 sq ft",
        year: "2023",
        client: "Hospitality",
      },
    },
    {
      id: 70,
      title: "Olive & Thyme",
      category: "Restaurant",
      location: "Surat",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
      description:
        "Mediterranean-inspired restaurant with earthy tones and natural light.",
      details: {
        area: "4,200 sq ft",
        year: "2024",
        client: "Hospitality",
      },
    },
    {
      id: 71,
      title: "Midnight Café",
      category: "Restaurant",
      location: "Rajkot",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
      description:
        "Late-night café designed for cozy ambience and social interaction.",
      details: {
        area: "2,600 sq ft",
        year: "2022",
        client: "Hospitality",
      },
    },
    {
      id: 72,
      title: "Coastal Catch",
      category: "Restaurant",
      location: "Daman",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1559339355-6b5a51f55a55?w=800&q=80",
      description:
        "Seafood restaurant with coastal theme and relaxed dining experience.",
      details: {
        area: "5,000 sq ft",
        year: "2023",
        client: "Hospitality",
      },
    },
    {
      id: 73,
      title: "Firewood Grill",
      category: "Restaurant",
      location: "Vadodara",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
      description:
        "Rustic grill restaurant emphasizing firewood cooking and raw textures.",
      details: {
        area: "4,700 sq ft",
        year: "2024",
        client: "Hospitality",
      },
    },
    {
      id: 74,
      title: "Lotus Fine Dine",
      category: "Restaurant",
      location: "Gandhinagar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0a?w=800&q=80",
      description:
        "Luxury fine-dining restaurant with elegant Asian-inspired interiors.",
      details: {
        area: "6,200 sq ft",
        year: "2025",
        client: "Hospitality",
      },
    },
    {
      id: 75,
      title: "Brew & Bean",
      category: "Restaurant",
      location: "Ahmedabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
      description:
        "Specialty café designed for coffee culture and remote working.",
      details: {
        area: "2,400 sq ft",
        year: "2023",
        client: "Hospitality",
      },
    },
    {
      id: 76,
      title: "Royal Thali",
      category: "Restaurant",
      location: "Udaipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1604908554166-59f0a1d65c0d?w=800&q=80",
      description:
        "Traditional Rajasthani restaurant with royal architectural elements.",
      details: {
        area: "5,800 sq ft",
        year: "2022",
        client: "Hospitality",
      },
    },
    {
      id: 77,
      title: "Skyline Rooftop",
      category: "Restaurant",
      location: "Surat",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
      description: "Rooftop dining restaurant offering panoramic city views.",
      details: {
        area: "7,000 sq ft",
        year: "2025",
        client: "Hospitality",
      },
    },

    // institutional projects

    {
      id: 111,
      title: "Global Knowledge School",
      category: "Institutional",
      location: "Ahmedabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      description:
        "Modern school campus designed to encourage collaborative learning.",
      details: {
        area: "38,000 sq ft",
        year: "2024",
        client: "Educational Trust",
      },
    },
    {
      id: 112,
      title: "City Medical Institute",
      category: "Institutional",
      location: "Vadodara",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
      description:
        "Healthcare training institute with patient-focused design principles.",
      details: {
        area: "42,500 sq ft",
        year: "2023",
        client: "Healthcare Group",
      },
    },
    {
      id: 113,
      title: "Innovation Research Center",
      category: "Institutional",
      location: "Gandhinagar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      description:
        "Research facility supporting innovation, labs, and collaborative spaces.",
      details: {
        area: "50,000 sq ft",
        year: "2025",
        client: "Government",
      },
    },
    {
      id: 114,
      title: "Green Valley College",
      category: "Institutional",
      location: "Rajkot",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      description:
        "Eco-friendly college campus with courtyards and shaded walkways.",
      details: {
        area: "60,000 sq ft",
        year: "2022",
        client: "Educational Trust",
      },
    },
    {
      id: 115,
      title: "Future Minds Academy",
      category: "Institutional",
      location: "Surat",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&q=80",
      description: "Academy designed for digital learning and modern pedagogy.",
      details: {
        area: "32,000 sq ft",
        year: "2023",
        client: "Private Organization",
      },
    },
    {
      id: 116,
      title: "Civic Training Center",
      category: "Institutional",
      location: "Bhavnagar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      description:
        "Government training center with functional and durable architecture.",
      details: {
        area: "45,000 sq ft",
        year: "2024",
        client: "Government",
      },
    },
    {
      id: 117,
      title: "Harmony Arts Institute",
      category: "Institutional",
      location: "Udaipur",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=80",
      description:
        "Fine arts institute designed to nurture creativity and expression.",
      details: {
        area: "28,500 sq ft",
        year: "2022",
        client: "Cultural Trust",
      },
    },
    {
      id: 118,
      title: "Advanced Skill Development Center",
      category: "Institutional",
      location: "Vadodara",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1535909339361-9b31e8f6f40c?w=800&q=80",
      description:
        "Skill development institute focused on vocational and technical training.",
      details: {
        area: "36,000 sq ft",
        year: "2024",
        client: "NGO",
      },
    },
    {
      id: 119,
      title: "Wellness & Rehabilitation Institute",
      category: "Institutional",
      location: "Ahmedabad",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1580281657527-47d4f5e7c4a4?w=800&q=80",
      description:
        "Rehabilitation and wellness institute with calming spatial design.",
      details: {
        area: "40,000 sq ft",
        year: "2025",
        client: "Healthcare Trust",
      },
    },
    {
      id: 120,
      title: "National Sports Academy",
      category: "Institutional",
      location: "Gandhinagar",
      architect: "Modi Srivastava & Associates",
      image:
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&q=80",
      description:
        "Sports training academy with integrated indoor and outdoor facilities.",
      details: {
        area: "70,000 sq ft",
        year: "2025",
        client: "Government",
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
      <div className="mt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
        <div className="sticky top-15 z-40 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
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
                onClick={() => setSelectedProject(project)}
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

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-500 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative h-96">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-slate-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-3 inline-block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-4xl font-bold mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {selectedProject.location}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                    <div className="text-blue-600 mb-2">
                      <svg
                        className="w-8 h-8"
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
                    </div>
                    <p className="text-slate-600 text-sm font-medium mb-1">
                      Project Area
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedProject.details.area}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <div className="text-purple-600 mb-2">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-600 text-sm font-medium mb-1">
                      Completion Year
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedProject.details.year}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                    <div className="text-green-600 mb-2">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-600 text-sm font-medium mb-1">
                      Client Type
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {selectedProject.details.client}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      About Project
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Architect
                    </h3>
                    <p className="text-slate-600 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                      {selectedProject.architect}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Location
                    </h3>
                    <p className="text-slate-600 text-lg flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                      {selectedProject.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
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
