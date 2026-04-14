/**
 * Property Data
 * Contains property listings and agent information
 * 
 * Add your real property and agent data here following the structure below
 */

window.PROPERTY_DATA = {
  // Array of real estate agents/brokers
  agents: [
    {
      id: "agent-pi-group",
      name: "PI group",
      company: "PI group",
      phone: "+91-9795993631",
      email: "contact@pigroup.com",
      website: "https://www.pigroup.com",
      location: "Gomti Nagar, Lucknow",
      propertiesForSale: 1,
      propertiesForRent: 0,
      rating: 4.8,
      reviewCount: 0,
      verified: true,
      reraStatus: false,
      ownerName: "Prince Dwivedi",
      experience: "10+ Years of Experience",
      teamSize: "Professional team of experts",
      description: "Located in Gomti Nagar, Lucknow, PI group has established a standing for supreme quality construction, achieving project excellence and delivering customer satisfaction. At PI group, we take pride in creating and delivering landmark projects since our inception like residential plots, apartments, duplex houses, independent houses, commercial complexes, shops. Our long-standing commitment to delivering innovative designs and craftsmanship, in-depth knowledge, great experience in construction, and extraordinary customer service has earned us the respect and trust of our customers year after year. We provide the highest levels of quality, integrity, and safety to our customers. For more details about our company and services, contact us on the provided numbers.",
      areasOfOperation: [
        "Lucknow",
        "Gomti Nagar",
        "Barabanki",
        "Rasauli"
      ],
      propertyDeals: [
        "Flats / Apartments",
        "Independent House",
        "Builder Floor",
        "Residential Land / Plots"
      ],
      services: [
        "Builders",
        "Real Estate Agents"
      ]
    }
  ],
  
  // Array of property listings
  properties: [
    {
      id: "property-1",
      title: "3 BHK Independent House for Sale in Rasauli",
      type: "Independent House",
      price: "₹ 65 Lac",
      size: "1500 Sq.ft.",
      location: "Rasauli, Barabanki",
      project: "PI Group",
      society: "Sandauli",
      agentId: "agent-pi-group",
      images: [
        "property/assets/property-1/1_1.jpg",
        "property/assets/property-1/1_2.jpg",
        "property/assets/property-1/1_3.jpg"
      ],
      description: "Independent House is available for sale. This is 3.0 BHK with Super Area 2200 Sq.ft. Independent House is located at Sandauli, Barabanki at a price of Rs. 65 Lac.\n\nJila panchayat approval\nAll bank Finance",
      amenities: [
        "Car Parking",
        "24 x 7 Security",
        "Maintenance Staff"
      ],
      landmarks: [
        "Airport",
        "School",
        "Shopping Mall",
        "Bank",
        "Bus Stop"
      ],
      features: [
        "Reputed Builder",
        "Vastu compliant",
        "Spacious",
        "Gated Society",
        "Tasteful Interiors",
        "Prime Location",
        "Luxury lifestyle",
        "Well Maintained",
        "Plenty of Sunlight",
        "Width of facing Road",
        "Corner Property"
      ],
      propertyDetails: {
        bedrooms: "3 BHK",
        bathrooms: "3 Baths",
        builtUpArea: "1500 Sq.ft.",
        carpetArea: "1100 Sq.ft.",
        superArea: "2200 Sq.ft.",
        ownership: "Builder",
        saleType: "New",
        propertyType: "House",
        floor: "Ground",
        totalFloors: "2",
        bookingAmount: "2 Lac",
        status: "Under Construction"
      },
      projectDetails: {
        name: "PI Group",
        description: "PI Group is a reputed builder in Gomti Nagar, Lucknow. The project offers Vastu compliant homes with modern amenities.",
        reraApproved: false,
        builderPhone: "+91-97959xxxxx",
        builderLocation: "Gomti Nagar, Lucknow",
        facilities: ["Jila Panchayat Approval", "All Bank Finance"]
      }
    }
  ]
};
