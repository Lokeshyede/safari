export interface Destination {
  id: string
  number: string
  title: string
  state: string
  country: string
  coordinates: string
  shortDescription: string
  overview: string
  landscape: string
  wildlifeTags: string[]
  seasonInfo: string
  monsoonStatus: string
  gates: string[]
  officialInfoUrl: string
  officialBookingUrl: string
  bookingPortalName: string
  secondaryBookingUrl?: string
  secondaryBookingName?: string
  stateSideNote?: string
  image: string
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'kanha',
    number: '01',
    title: 'Kanha National Park',
    state: 'Madhya Pradesh',
    country: 'India',
    coordinates: "22°20'00\"N 80°37'00\"E",
    shortDescription:
      'Explore the sal forests, open meadows, and rich wildlife of Kanha Tiger Reserve.',
    overview:
      'Spanning over 940 square kilometers of core protected area in the Maikal Range of the Satpuras, Kanha Tiger Reserve is celebrated for reviving the endangered Hard-ground Barasingha (Swamp Deer) from near extinction. Its rolling grasslands, dense sal groves, and pristine riverbanks host flourishing populations of Royal Bengal tigers, Indian leopards, and herds of massive Indian gaur.',
    landscape: 'Sal forest, bamboo groves, grasslands, misty forest trails',
    wildlifeTags: ['Bengal Tiger', 'Hard-ground Barasingha', 'Indian Leopard', 'Gaur'],
    seasonInfo: '15 October — 30 June (Core Gates) | Buffer open year-round',
    monsoonStatus: 'Core zones closed during monsoon (July to mid-October) for habitat rejuvenation and wildlife breeding. Buffer zones remain accessible year-round.',
    gates: ['Khatia Gate (Core)', 'Mukki Gate (Core)', 'Sarhi Gate (Core)', 'Khatiya Buffer'],
    officialInfoUrl: 'https://www.mptourism.com/destination-kanha-national-park.php',
    officialBookingUrl: 'https://forest.mponline.gov.in/Search.aspx?park=2',
    bookingPortalName: 'MP Online Forest Department Portal',
    image: '/images/forest-canopy.jpg',
  },
  {
    id: 'pench',
    number: '02',
    title: 'Pench National Park',
    state: 'Madhya Pradesh',
    country: 'India',
    coordinates: "21°42'00\"N 79°18'00\"E",
    shortDescription:
      'Discover teak forests, winding river landscapes, and the remarkable wildlife of Pench.',
    overview:
      'Straddling the southern slopes of the Satpura hills along the Pench River, this teak-rich forest provided the backdrop for Rudyard Kipling’s classic The Jungle Book. The reserve boasts an open forest canopy that offers exceptional game viewing opportunities for Bengal tigers, leopards, packs of Asiatic wild dogs (dholes), and massive herds of Indian gaur.',
    landscape: 'Teak forest, Pench River, woodland trails, forest clearings',
    wildlifeTags: ['Bengal Tiger', 'Indian Leopard', 'Gaur', 'Dhole'],
    seasonInfo: '15 October — 30 June (MP Core Gates) | State-side schedules apply',
    monsoonStatus: 'Core zones closed July to mid-October. Buffer zones open year-round subject to weather.',
    gates: ['Turia Gate (MP Core)', 'Karmajhiri Gate (MP Core)', 'Jamtara Gate (MP Core)', 'Sillari Gate (MH Side)'],
    officialInfoUrl: 'https://penchtiger.org/',
    officialBookingUrl: 'https://forest.mponline.gov.in/Search.aspx?park=2',
    bookingPortalName: 'MP Online Forest Portal (Madhya Pradesh Gates)',
    secondaryBookingUrl: 'https://mytadoba.mahaforest.gov.in/',
    secondaryBookingName: 'MahaForest Portal (Maharashtra / Sillari Gate)',
    stateSideNote: 'Important: Pench spans across Madhya Pradesh (Seoni & Chhindwara) and Maharashtra (Nagpur). MP side gates (Turia, Karmajhiri, Jamtara) are booked exclusively via MP Online Forest portal, while Maharashtra side gates (Sillari, Khursapar) are booked via MahaForest. Please do not confuse the two state booking portals.',
    image: '/images/forest-river.jpg',
  },
  {
    id: 'tadoba',
    number: '03',
    title: 'Tadoba-Andhari Tiger Reserve',
    state: 'Maharashtra',
    country: 'India',
    coordinates: "20°14'00\"N 79°24'00\"E",
    shortDescription:
      'Experience the dry deciduous forests, bamboo thickets, and diverse wildlife of Tadoba.',
    overview:
      'Maharashtra’s oldest and largest national park, Tadoba-Andhari encompasses 625 square kilometers of rich dry deciduous forests, ancient bamboo thickets, and permanent perennial waterbodies including Tadoba Lake and Irai Dam. Renowned as the "Jewel of Vidarbha," it offers some of India’s highest tiger densities and frequent big cat sightings, alongside sloth bears, leopards, marsh crocodiles, and Indian wild dogs.',
    landscape: 'Teak forest, bamboo groves, forest lakes, woodland trails',
    wildlifeTags: ['Bengal Tiger', 'Indian Leopard', 'Sloth Bear', 'Gaur'],
    seasonInfo: '1 October — 30 June (Core Gates) | Buffer gates open year-round',
    monsoonStatus: 'Core gates closed July to September for monsoon. Designated buffer zones remain operational year-round subject to rain.',
    gates: ['Moharli Gate (Core)', 'Kolara Gate (Core)', 'Navegaon Gate (Core)', 'Khutwanda Gate (Core)', 'Agorzari Buffer'],
    officialInfoUrl: 'https://maharashtratourism.gov.in/wildlife/tadoba-andhari-tiger-reserve/',
    officialBookingUrl: 'https://mytadoba.mahaforest.gov.in/',
    bookingPortalName: 'MahaForest MyTadoba Official Portal',
    image: '/images/wildlife-tiger.jpg',
  },
]
