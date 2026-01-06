export interface Stadium {
  id?: string;
  name: string;
  club?: string;
  latitude: number;
  longitude: number;
  capacity?: number | null;
  country: string;
  city?: string;
  stadium?: string | null;
}

export const exampleStadiums: Stadium[] = [
  // {
  //   id: '1',
  //   name: 'Camp Nou',
  //   club: 'FC Barcelona',
  //   latitude: 41.3809,
  //   longitude: 2.1228,
  //   capacity: 99354,
  //   country: 'Spain'
  // },
  // {
  //   id: '2',
  //   name: 'Santiago Bernabéu',
  //   club: 'Real Madrid',
  //   latitude: 40.4531,
  //   longitude: -3.6883,
  //   capacity: 81044,
  //   country: 'Spain'
  // },
  // {
  //   id: '3',
  //   name: 'Old Trafford',
  //   club: 'Manchester United',
  //   latitude: 53.4631,
  //   longitude: -2.2913,
  //   capacity: 74879,
  //   country: 'England'
  // },
  // {
  //   id: '4',
  //   name: 'Anfield',
  //   club: 'Liverpool FC',
  //   latitude: 53.4308,
  //   longitude: -2.9608,
  //   capacity: 53394,
  //   country: 'England'
  // },
  // {
  //   id: '5',
  //   name: 'Allianz Arena',
  //   club: 'Bayern Munich',
  //   latitude: 48.2188,
  //   longitude: 11.6247,
  //   capacity: 75024,
  //   country: 'Germany'
  // },
  // {
  //   id: '6',
  //   name: 'San Siro',
  //   club: 'AC Milan / Inter Milan',
  //   latitude: 45.4781,
  //   longitude: 9.1240,
  //   capacity: 75817,
  //   country: 'Italy'
  // },
  // {
  //   id: '7',
  //   name: 'Parc des Princes',
  //   club: 'Paris Saint-Germain',
  //   latitude: 48.8414,
  //   longitude: 2.2530,
  //   capacity: 47929,
  //   country: 'France'
  // },
  // {
  //   id: '8',
  //   name: 'Maracanã',
  //   club: 'Flamengo / Fluminense',
  //   latitude: -22.9122,
  //   longitude: -43.2302,
  //   capacity: 78838,
  //   country: 'Brazil'
  // },
  // {
  //   id: '9',
  //   name: 'La Bombonera',
  //   club: 'Boca Juniors',
  //   latitude: -34.6354,
  //   longitude: -58.3649,
  //   capacity: 49000,
  //   country: 'Argentina'
  // },
  // {
  //   id: '10',
  //   name: 'Stamford Bridge',
  //   club: 'Chelsea FC',
  //   latitude: 51.4817,
  //   longitude: -0.1910,
  //   capacity: 40341,
  //   country: 'England'
  // },
  // {
  //   id: '11',
  //   name: 'Signal Iduna Park',
  //   club: 'Borussia Dortmund',
  //   latitude: 51.4925,
  //   longitude: 7.4517,
  //   capacity: 81365,
  //   country: 'Germany'
  // },
  // {
  //   id: '12',
  //   name: 'Emirates Stadium',
  //   club: 'Arsenal FC',
  //   latitude: 51.5549,
  //   longitude: -0.1084,
  //   capacity: 60704,
  //   country: 'England'
  // },

  {
    "id": "afc-ajax",
    "name": "Ajax",
    "latitude": 52.313889,
    "longitude": 4.941944,
    "country": "Netherlands",
    "city": "Amsterdam",
    "stadium": "Johan Cruyff Arena",
    "capacity": 55000
  },
  {
    "id": "az-alkmaar",
    "name": "AZ Alkmaar",
    "latitude": 52.6375,
    "longitude": 4.757778,
    "country": "Netherlands",
    "city": "Alkmaar",
    "stadium": "AFAS Stadium",
    "capacity": 19500
  },
  {
    "id": "excelsior-rotterdam",
    "name": "Excelsior",
    "latitude": 51.954722,
    "longitude": 4.516111,
    "country": "Netherlands",
    "city": "Rotterdam",
    "stadium": "Van Donge & De Roo Stadion",
    "capacity": 4500
  },
  {
    "id": "fc-groningen",
    "name": "FC Groningen",
    "latitude": 53.206667,
    "longitude": 6.586667,
    "country": "Netherlands",
    "city": "Groningen",
    "stadium": "Euroborg Stadium",
    "capacity": 22550
  },
  {
    "id": "fc-twente",
    "name": "FC Twente",
    "latitude": 52.2218,
    "longitude": 6.8953,
    "country": "Netherlands",
    "city": "Enschede",
    "stadium": "De Grolsch Veste",
    "capacity": 30205
  },
  {
    "id": "fc-utrecht",
    "name": "FC Utrecht",
    "latitude": 52.078889,
    "longitude": 5.1275,
    "country": "Netherlands",
    "city": "Utrecht",
    "stadium": "Stadion Galgenwaard",
    "capacity": 23750
  },
  {
    "id": "fc-volendam",
    "name": "FC Volendam",
    "latitude": 52.485,
    "longitude": 5.093333,
    "country": "Netherlands",
    "city": "Volendam",
    "stadium": "Kras Stadion",
    "capacity": 6000
  },
  {
    "id": "feyenoord",
    "name": "Feyenoord",
    "latitude": 51.893889,
    "longitude": 4.523056,
    "country": "Netherlands",
    "city": "Rotterdam",
    "stadium": "Stadion Feijenoord (De Kuip)",
    "capacity": 51117
  },
  {
    "id": "fortuna-sittard",
    "name": "Fortuna Sittard",
    "latitude": 50.985,
    "longitude": 5.83,
    "country": "Netherlands",
    "city": "Sittard",
    "stadium": "Fortuna Sittard Stadion",
    "capacity": 12800
  },
  {
    "id": "go-ahead-eagles",
    "name": "Go Ahead Eagles",
    "latitude": 52.2475,
    "longitude": 6.164167,
    "country": "Netherlands",
    "city": "Deventer",
    "stadium": "De Adelaarshorst",
    "capacity": 10400
  },
  {
    "id": "heracles-almelo",
    "name": "Heracles Almelo",
    "latitude": 52.361944,
    "longitude": 6.671389,
    "country": "Netherlands",
    "city": "Almelo",
    "stadium": "Asito Stadion",
    "capacity": 12080
  },
  {
    "id": "nac-breda",
    "name": "NAC Breda",
    "latitude": 51.579167,
    "longitude": 4.757222,
    "country": "Netherlands",
    "city": "Breda",
    "stadium": "Rat Verlegh Stadium",
    "capacity": 19000
  },
  {
    "id": "nec-nijmegen",
    "name": "N.E.C. Nijmegen",
    "latitude": 51.815833,
    "longitude": 5.845556,
    "country": "Netherlands",
    "city": "Nijmegen",
    "stadium": "Goffertstadion",
    "capacity": 12500
  },
  {
    "id": "pec-zwolle",
    "name": "PEC Zwolle",
    "latitude": 52.511389,
    "longitude": 6.111667,
    "country": "Netherlands",
    "city": "Zwolle",
    "stadium": "MAC³PARK stadion",
    "capacity": 14000
  },
  {
    "id": "psv-eindhoven",
    "name": "PSV Eindhoven",
    "latitude": 51.4416,
    "longitude": 5.4697,
    "country": "Netherlands",
    "city": "Eindhoven",
    "stadium": "Philips Stadion",
    "capacity": 35119
  },
  {
    "id": "sc-heerenveen",
    "name": "sc Heerenveen",
    "latitude": 52.9567,
    "longitude": 5.9244,
    "country": "Netherlands",
    "city": "Heerenveen",
    "stadium": "Abe Lenstra Stadion",
    "capacity": 27224
  },
  {
    "id": "sparta-rotterdam",
    "name": "Sparta Rotterdam",
    "latitude": 51.916667,
    "longitude": 4.414722,
    "country": "Netherlands",
    "city": "Rotterdam",
    "stadium": "Sparta Stadion Het Kasteel",
    "capacity": 11000
  },
  {
    "id": "sc-telstar",
    "name": "SC Telstar",
    "latitude": 52.476111,
    "longitude": 4.646111,
    "country": "Netherlands",
    "city": "Velsen-Zuid",
    "stadium": "BUKO stadium",
    "capacity": 3625
  },

   {
    "id": "ado-den-haag",
    "name": "ADO Den Haag",
    "latitude": 52.0537,
    "longitude": 4.3414,
    "country": "Netherlands",
    "city": "Den Haag",
    "stadium": "WerkTalent Stadion",
    "capacity": 15000
  },
  {
    "id": "almere-city-fc",
    "name": "Almere City FC",
    "latitude": 52.3482,
    "longitude": 5.2281,
    "country": "Netherlands",
    "city": "Almere",
    "stadium": "Yanmar Stadion",
    "capacity": 4501
  },
  {
    "id": "sc-cambuur",
    "name": "SC Cambuur",
    "latitude": 53.2045,
    "longitude": 5.8078,
    "country": "Netherlands",
    "city": "Leeuwarden",
    "stadium": "Kooi Stadion",
    "capacity": 15000
  },
  {
    "id": "fc-den-bosch",
    "name": "FC Den Bosch",
    "latitude": 51.7061,
    "longitude": 5.3961,
    "country": "Netherlands",
    "city": "'s-Hertogenbosch",
    "stadium": "Stadion De Vliert",
    "capacity": 8713
  },
  {
    "name": "FC Dordrecht",
    "latitude": 51.8123,
    "longitude": 4.6756,
    "country": "Netherlands",
    "city": "Dordrecht",
    "stadium": "M-Scores Stadion",
    "capacity": 4235
  },
  {
    "name": "FC Eindhoven",
    "latitude": 51.4255,
    "longitude": 5.4855,
    "country": "Netherlands",
    "city": "Eindhoven",
    "stadium": "Jan Louwers Stadion",
    "capacity": 4600
  },
  {
    "id": "fc-emmen",
    "name": "FC Emmen",
    "latitude": 52.7667,
    "longitude": 6.891,
    "country": "Netherlands",
    "city": "Emmen",
    "stadium": "De Oude Meerdijk",
    "capacity": 8600
  },
  {
    "name": "De Graafschap",
    "latitude": 51.96,
    "longitude": 6.3075,
    "country": "Netherlands",
    "city": "Doetinchem",
    "stadium": "Stadion De Vijverberg",
    "capacity": 12600
  },
  {
    "id": "helmond-sport",
    "name": "Helmond Sport",
    "latitude": 51.484,
    "longitude": 5.6669,
    "country": "Netherlands",
    "city": "Helmond",
    "stadium": "GS Staalwerken Stadion",
    "capacity": 3600
  },
  {
    "id": "jong-ajax",
    "name": "Jong Ajax",
    "latitude": 52.308,
    "longitude": 4.887,
    "country": "Netherlands",
    "city": "Duivendrecht",
    "stadium": "Sportpark De Toekomst",
    "capacity": 2250
  },
  {
    "id": "jong-az",
    "name": "Jong AZ",
    "latitude": 52.518,
    "longitude": 4.832,
    "country": "Netherlands",
    "city": "Wijdewormer",
    "stadium": "AFAS Trainingscomplex",
    "capacity": 1000
  },
  {
    "id": "jong-psv",
    "name": "Jong PSV",
    "latitude": 51.4583,
    "longitude": 5.4417,
    "country": "Netherlands",
    "city": "Eindhoven",
    "stadium": "PSV Campus De Herdgang",
    "capacity": 2500
  },
  {
    "id": "jong-fc-utrecht",
    "name": "Jong FC Utrecht",
    "latitude": 52.083,
    "longitude": 5.146,
    "country": "Netherlands",
    "city": "Utrecht",
    "stadium": "Sportcomplex Zoudenbalch",
    "capacity": 450
  },
  {
    "name": "MVV Maastricht",
    "latitude": 50.8653,
    "longitude": 5.7153,
    "country": "Netherlands",
    "city": "Maastricht",
    "stadium": "Stadion De Geusselt",
    "capacity": 9500
  },
  {
    "id": "rkc-waalwijk",
    "name": "RKC Waalwijk",
    "latitude": 51.684,
    "longitude": 5.045,
    "country": "Netherlands",
    "city": "Waalwijk",
    "stadium": "Mandemakers Stadion",
    "capacity": 7508
  },
  {
    "id": "roda-jc-kerkrade",
    "name": "Roda JC Kerkrade",
    "latitude": 50.887,
    "longitude": 5.9928,
    "country": "Netherlands",
    "city": "Kerkrade",
    "stadium": "Parkstad Limburg Stadion",
    "capacity": 19979
  },
  {
    "name": "TOP Oss",
    "latitude": 51.761,
    "longitude": 5.534,
    "country": "Netherlands",
    "city": "Oss",
    "stadium": "Frans Heesen Stadion",
    "capacity": 4560
  },
  {
    "id": "vitesse",
    "name": "Vitesse",
    "latitude": 51.968,
    "longitude": 5.894,
    "country": "Netherlands",
    "city": "Arnhem",
    "stadium": "GelreDome",
    "capacity": 21248
  },
  {
    "id": "vvv-venlo",
    "name": "VVV-Venlo",
    "latitude": 51.3656,
    "longitude": 6.155,
    "country": "Netherlands",
    "city": "Venlo",
    "stadium": "Covebo Stadion - De Koel -",
    "capacity": 8000
  },
  {
    "id": "willem-ii",
    "name": "Willem II",
    "latitude": 51.542,
    "longitude": 5.068,
    "country": "Netherlands",
    "city": "Tilburg",
    "stadium": "Koning Willem II Stadion",
    "capacity": 14700
  },

  {
    "name": "ACV Assen",
    "latitude": 52.9972,
    "longitude": 6.5594,
    "country": "Nederland",
    "city": "Assen",
    "stadium": "Sportpark Asser Boys",
    "capacity": null
  },
  {
    "id": "afc-amsterdamsche-fc",
    "name": "AFC (Amsterdamsche FC)",
    "latitude": 52.338,
    "longitude": 4.862,
    "country": "Nederland",
    "city": "Amsterdam",
    "stadium": "Sportpark Goed Genoeg",
    "capacity": null
  },
  {
    "name": "BVV Barendrecht",
    "latitude": 51.8596,
    "longitude": 4.5428,
    "country": "Nederland",
    "city": "Barendrecht",
    "stadium": "Sportpark Nieuw Vosseveld",
    "capacity": null
  },
  {
    "name": "De Treffers",
    "latitude": 51.785,
    "longitude": 5.867,
    "country": "Nederland",
    "city": "Groesbeek",
    "stadium": "Sportpark Zuid",
    "capacity": null
  },
  {
    "name": "Excelsior Maassluis",
    "latitude": 51.916,
    "longitude": 4.238,
    "country": "Nederland",
    "city": "Maassluis",
    "stadium": "Sportpark Dijkpolder",
    "capacity": null
  },
  {
    "id": "gvvv-veenendaal",
    "name": "GVVV Veenendaal",
    "latitude": 52.025,
    "longitude": 5.561,
    "country": "Nederland",
    "city": "Veenendaal",
    "stadium": "Sportpark Panhuis",
    "capacity": null
  },
  {
    "name": "HHC Hardenberg",
    "latitude": 52.5714,
    "longitude": 6.6186,
    "country": "Nederland",
    "city": "Hardenberg",
    "stadium": "De Boshoek",
    "capacity": 4500
  },
  {
    "name": "HSV Hoek",
    "latitude": 51.3404,
    "longitude": 3.6558,
    "country": "Nederland",
    "city": "Hoek",
    "stadium": "Sportpark Denoek",
    "capacity": null
  },
  {
    "name": "IJsselmeervogels",
    "latitude": 52.238,
    "longitude": 5.352,
    "country": "Nederland",
    "city": "Spakenburg",
    "stadium": "Sportpark De Westmaat",
    "capacity": 6000
  },
  {
    "id": "jong-almere-city-fc",
    "name": "Jong Almere City FC",
    "latitude": 52.3482,
    "longitude": 5.2281,
    "country": "Nederland",
    "city": "Almere",
    "stadium": "Yanmar Stadion (Trainingsveld)",
    "capacity": 4501
  },
  {
    "id": "jong-sparta-rotterdam",
    "name": "Jong Sparta Rotterdam",
    "latitude": 51.916667,
    "longitude": 4.414722,
    "country": "Nederland",
    "city": "Rotterdam",
    "stadium": "Sparta Stadion Het Kasteel (Trainingsveld)",
    "capacity": 11000
  },
  {
    "id": "koninklijke-hfc",
    "name": "Koninklijke HFC",
    "latitude": 52.368,
    "longitude": 4.636,
    "country": "Nederland",
    "city": "Haarlem",
    "stadium": "Sportpark Spanjaard",
    "capacity": 1500
  },
  {
    "name": "Kozakken Boys",
    "latitude": 51.811,
    "longitude": 4.908,
    "country": "Nederland",
    "city": "Werkendam",
    "stadium": "Sportpark De Zwaaier",
    "capacity": null
  },
  {
    "name": "Quick Boys",
    "latitude": 52.193,
    "longitude": 4.408,
    "country": "Nederland",
    "city": "Katwijk aan Zee",
    "stadium": "Sportpark Nieuw Zuid",
    "capacity": 6000
  },
  {
    "name": "Rijnsburgse Boys",
    "latitude": 52.181,
    "longitude": 4.437,
    "country": "Nederland",
    "city": "Rijnsburg",
    "stadium": "Sportpark Middelmors",
    "capacity": null
  },
  {
    "id": "rkav-volendam",
    "name": "RKAV Volendam",
    "latitude": 52.484,
    "longitude": 5.064,
    "country": "Nederland",
    "city": "Volendam",
    "stadium": "Sportpark Kras Stadion (Trainingsveld)",
    "capacity": null
  },
  {
    "name": "SV Spakenburg",
    "latitude": 52.238,
    "longitude": 5.352,
    "country": "Nederland",
    "city": "Spakenburg",
    "stadium": "Sportpark De Westmaat",
    "capacity": null
  },
  {
    "id": "vv-katwijk",
    "name": "VV Katwijk",
    "latitude": 52.193,
    "longitude": 4.408,
    "country": "Nederland",
    "city": "Katwijk aan Zee",
    "stadium": "Sportpark Panbos",
    "capacity": null
  },

  // brasileirao a
  {
    "name": "Athletico Paranaense",
    "latitude": -25.4517,
    "longitude": -49.2778,
    "country": "Brazil",
    "city": "Curitiba",
    "stadium": "Arena da Baixada",
    "capacity": 40502
  },
  {
    "name": "Atlético Mineiro",
    "latitude": -19.9299,
    "longitude": -43.9529,
    "country": "Brazil",
    "city": "Belo Horizonte",
    "stadium": "Arena MRV",
    "capacity": 47465
  },
  {
    "name": "Bahia",
    "latitude": -12.9714,
    "longitude": -38.5103,
    "country": "Brazil",
    "city": "Salvador",
    "stadium": "Casa de Apostas Arena Fonte Nova",
    "capacity": 47915
  },
  {
    "name": "Botafogo",
    "latitude": -22.9142,
    "longitude": -43.2308,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Estádio Nilton Santos",
    "capacity": null
  },
  {
    "name": "Chapecoense",
    "latitude": -27.1008,
    "longitude": -52.6186,
    "country": "Brazil",
    "city": "Chapecó",
    "stadium": "Arena Condá",
    "capacity": null
  },
  {
    "name": "Corinthians",
    "latitude": -23.5456,
    "longitude": -46.5451,
    "country": "Brazil",
    "city": "São Paulo",
    "stadium": "Neo Química Arena",
    "capacity": 47252
  },
  {
    "name": "Coritiba",
    "latitude": -25.4208,
    "longitude": -49.2647,
    "country": "Brazil",
    "city": "Curitiba",
    "stadium": "Estádio Major Antônio Couto Pereira",
    "capacity": 40502
  },
  {
    "name": "Cruzeiro",
    "latitude": -19.8942,
    "longitude": -43.9733,
    "country": "Brazil",
    "city": "Belo Horizonte",
    "stadium": "Estádio Governador Magalhães Pinto (Mineirão)",
    "capacity": 66658
  },
  {
    "name": "Flamengo",
    "latitude": -22.9122,
    "longitude": -43.2302,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Maracanã",
    "capacity": 78838
  },
  {
    "name": "Fluminense",
    "latitude": -22.9122,
    "longitude": -43.2302,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Maracanã",
    "capacity": 78838
  },
  {
    "name": "Grêmio",
    "latitude": -30.0211,
    "longitude": -51.1947,
    "country": "Brazil",
    "city": "Porto Alegre",
    "stadium": "Arena do Grêmio",
    "capacity": null
  },
  {
    "name": "Internacional",
    "latitude": -30.0656,
    "longitude": -51.2358,
    "country": "Brazil",
    "city": "Porto Alegre",
    "stadium": "Estádio Beira-Rio",
    "capacity": 49055
  },
  {
    "name": "Mirassol",
    "latitude": -20.8122,
    "longitude": -49.5167,
    "country": "Brazil",
    "city": "Mirassol",
    "stadium": "Estádio José Maria de Campos Maia",
    "capacity": null
  },
  {
    "name": "Palmeiras",
    "latitude": -23.5262,
    "longitude": -46.6858,
    "country": "Brazil",
    "city": "São Paulo",
    "stadium": "Allianz Parque",
    "capacity": null
  },
  {
    "name": "Red Bull Bragantino",
    "latitude": -22.9038,
    "longitude": -46.5458,
    "country": "Brazil",
    "city": "Bragança Paulista",
    "stadium": "Nabi Abi Chedid Stadium",
    "capacity": null
  },
  {
    "name": "Remo",
    "latitude": -1.4589,
    "longitude": -48.4878,
    "country": "Brazil",
    "city": "Belém",
    "stadium": "Football stadium Evandro Almeida (Baenão)",
    "capacity": null
  },
  {
    "name": "Santos",
    "latitude": -23.953,
    "longitude": -46.3308,
    "country": "Brazil",
    "city": "Santos",
    "stadium": "Urbano Caldeira Stadium (Vila Belmiro)",
    "capacity": null
  },
  {
    "name": "São Paulo",
    "latitude": -23.585,
    "longitude": -46.7225,
    "country": "Brazil",
    "city": "São Paulo",
    "stadium": "MorumBIS",
    "capacity": null
  },
  {
    "name": "Vasco da Gama",
    "latitude": -22.8856,
    "longitude": -43.1539,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Estádio São Januário",
    "capacity": null
  },
  {
    "name": "Vitória",
    "latitude": -12.9128,
    "longitude": -38.4147,
    "country": "Brazil",
    "city": "Salvador",
    "stadium": "Estadio Manoel Barradas (Barradão)",
    "capacity": null
  },

  // brasileirao b
  {
    "name": "América Mineiro",
    "latitude": -19.919,
    "longitude": -43.9288,
    "country": "Brazil",
    "city": "Belo Horizonte",
    "stadium": "Arena Independência",
    "capacity": 23018
  },
  {
    "name": "Athletic FC",
    "latitude": -21.1214,
    "longitude": -44.2619,
    "country": "Brazil",
    "city": "São João del-Rei",
    "stadium": "Arena Sicredi",
    "capacity": 6000
  },
  {
    "name": "Atlético Goianiense",
    "latitude": -16.6925,
    "longitude": -49.2783,
    "country": "Brazil",
    "city": "Goiânia",
    "stadium": "Antônio Accioly",
    "capacity": 12500
  },
  {
    "name": "Avaí",
    "latitude": -27.6014,
    "longitude": -48.5147,
    "country": "Brazil",
    "city": "Florianópolis",
    "stadium": "Ressacada",
    "capacity": 17826
  },
  {
    "name": "Botafogo-SP",
    "latitude": -21.1717,
    "longitude": -47.8183,
    "country": "Brazil",
    "city": "Ribeirão Preto",
    "stadium": "Estádio Santa Cruz",
    "capacity": 29292
  },
  {
    "name": "Ceará",
    "latitude": -3.7319,
    "longitude": -38.5267,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Castelão",
    "capacity": 57876
  },
  {
    "name": "CRB",
    "latitude": -9.6647,
    "longitude": -35.7331,
    "country": "Brazil",
    "city": "Maceió",
    "stadium": "Rei Pelé",
    "capacity": 17126
  },
  {
    "name": "Criciúma",
    "latitude": -28.6756,
    "longitude": -49.37,
    "country": "Brazil",
    "city": "Criciúma",
    "stadium": "Heriberto Hülse",
    "capacity": 19225
  },
  {
    "name": "Cuiabá",
    "latitude": -15.6025,
    "longitude": -56.0967,
    "country": "Brazil",
    "city": "Cuiabá",
    "stadium": "Arena Pantanal",
    "capacity": 44000
  },
  {
    "name": "Ferroviária",
    "latitude": -21.7583,
    "longitude": -48.1364,
    "country": "Brazil",
    "city": "Araraquara",
    "stadium": "Arena Fonte Luminosa",
    "capacity": null
  },
  {
    "name": "Fortaleza",
    "latitude": -3.7319,
    "longitude": -38.5267,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Castelão",
    "capacity": 57876
  },
  {
    "name": "Goiás",
    "latitude": -16.7161,
    "longitude": -49.2678,
    "country": "Brazil",
    "city": "Goiânia",
    "stadium": "Estádio da Serrinha",
    "capacity": 14450
  },
  {
    "name": "Juventude",
    "latitude": -29.1764,
    "longitude": -51.1569,
    "country": "Brazil",
    "city": "Caxias do Sul",
    "stadium": "Alfredo Jaconi",
    "capacity": 19924
  },
  {
    "name": "Londrina",
    "latitude": -23.33,
    "longitude": -51.1611,
    "country": "Brazil",
    "city": "Londrina",
    "stadium": "Estádio do Café",
    "capacity": 31000
  },
  {
    "name": "Náutico",
    "latitude": -8.0322,
    "longitude": -34.8969,
    "country": "Brazil",
    "city": "Recife",
    "stadium": "Aflitos",
    "capacity": 22856
  },
  {
    "name": "Novorizontino",
    "latitude": -21.4111,
    "longitude": -49.3242,
    "country": "Brazil",
    "city": "Novo Horizonte",
    "stadium": "Doutor Jorge Ismael de Biasi",
    "capacity": 16000
  },
  {
    "name": "Operário Ferroviário",
    "latitude": -25.095,
    "longitude": -50.1581,
    "country": "Brazil",
    "city": "Ponta Grossa",
    "stadium": "Germano Krüger",
    "capacity": null
  },
  {
    "name": "Ponte Preta",
    "latitude": -23.5706,
    "longitude": -47.0506,
    "country": "Brazil",
    "city": "Campinas",
    "stadium": "Estádio Moisés Lucarelli",
    "capacity": null
  },
  {
    "name": "São Bernardo FC",
    "latitude": -23.693,
    "longitude": -46.5517,
    "country": "Brazil",
    "city": "São Bernardo do Campo",
    "stadium": "Estádio Primeiro de Maio",
    "capacity": null
  },
  {
    "name": "Sport Recife",
    "latitude": -8.064167,
    "longitude": -34.908056,
    "country": "Brazil",
    "city": "Recife",
    "stadium": "Estádio Ilha do Retiro",
    "capacity": null
  },
  {
    "name": "Vila Nova",
    "latitude": -16.6975,
    "longitude": -49.2558,
    "country": "Brazil",
    "city": "Goiânia",
    "stadium": "Estádio Onésio Brasileiro Alvarenga",
    "capacity": null
  },

  // brasileirao c
  {
    "name": "ABC",
    "latitude": -5.8364,
    "longitude": -35.255,
    "country": "Brazil",
    "city": "Natal",
    "stadium": "Frasqueirão",
    "capacity": 18000
  },
  {
    "name": "Aparecidense",
    "latitude": -16.828,
    "longitude": -49.2486,
    "country": "Brazil",
    "city": "Aparecida de Goiânia",
    "stadium": "Annibal Batista de Toledo",
    "capacity": 11700
  },
  {
    "name": "Athletic FC",
    "latitude": -21.1214,
    "longitude": -44.2619,
    "country": "Brazil",
    "city": "São João del-Rei",
    "stadium": "Arena Sicredi",
    "capacity": 6000
  },
  {
    "name": "Brusque",
    "latitude": -27.0983,
    "longitude": -48.9197,
    "country": "Brazil",
    "city": "Brusque",
    "stadium": "Augusto Bauer",
    "capacity": 5088
  },
  {
    "name": "Caxias",
    "latitude": -29.155,
    "longitude": -51.1092,
    "country": "Brazil",
    "city": "Caxias do Sul",
    "stadium": "Estádio Centenário",
    "capacity": 22132
  },
  {
    "name": "Confiança",
    "latitude": -10.9161,
    "longitude": -37.0858,
    "country": "Brazil",
    "city": "Aracaju",
    "stadium": "Batistão",
    "capacity": 15586
  },
  {
    "name": "CSA",
    "latitude": -9.6647,
    "longitude": -35.7331,
    "country": "Brazil",
    "city": "Maceió",
    "stadium": "Rei Pelé",
    "capacity": 17126
  },
  {
    "name": "Ferroviário",
    "latitude": -3.7319,
    "longitude": -38.5267,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Castelão",
    "capacity": 57876
  },
  {
    "name": "Figueirense",
    "latitude": -27.592,
    "longitude": -48.5638,
    "country": "Brazil",
    "city": "Florianópolis",
    "stadium": "Orlando Scarpelli",
    "capacity": 19908
  },
  {
    "name": "Floresta",
    "latitude": -3.7891,
    "longitude": -38.5833,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Presidente Vargas",
    "capacity": 20000
  },
  {
    "name": "Goiânia",
    "latitude": -16.6975,
    "longitude": -49.2558,
    "country": "Brazil",
    "city": "Goiânia",
    "stadium": "Estádio Olímpico Pedro Ludovico Teixeira",
    "capacity": 13500
  },
  {
    "name": "Imperatriz",
    "latitude": -5.526,
    "longitude": -47.4616,
    "country": "Brazil",
    "city": "Imperatriz",
    "stadium": "Estádio Frei Epifânio D'Abadia",
    "capacity": 12000
  },
  {
    "name": "Ituano",
    "latitude": -23.3339,
    "longitude": -47.2917,
    "country": "Brazil",
    "city": "Itu",
    "stadium": "Novelli Júnior",
    "capacity": 18560
  },
  {
    "name": "Londrina",
    "latitude": -23.33,
    "longitude": -51.1611,
    "country": "Brazil",
    "city": "Londrina",
    "stadium": "Estádio do Café",
    "capacity": 31000
  },
  {
    "name": "Paysandu",
    "latitude": -1.4589,
    "longitude": -48.4878,
    "country": "Brazil",
    "city": "Belém",
    "stadium": "Curuzu",
    "capacity": 16200
  },
  {
    "name": "Remo",
    "latitude": -1.4589,
    "longitude": -48.4878,
    "country": "Brazil",
    "city": "Belém",
    "stadium": "Evandro Almeida (Baenão)",
    "capacity": 13792
  },
  {
    "name": "São José-RS",
    "latitude": -30.015,
    "longitude": -51.1711,
    "country": "Brazil",
    "city": "Porto Alegre",
    "stadium": "Passo D'Areia",
    "capacity": 14000
  },
  {
    "name": "Tombense",
    "latitude": -21.0372,
    "longitude": -42.5975,
    "country": "Brazil",
    "city": "Tombos",
    "stadium": "Almeidão",
    "capacity": 6550
  },
  {
    "name": "Volta Redonda",
    "latitude": -22.518,
    "longitude": -44.1133,
    "country": "Brazil",
    "city": "Volta Redonda",
    "stadium": "Raulino de Oliveira",
    "capacity": 20000
  },
  {
    "name": "Ypiranga",
    "latitude": -27.6325,
    "longitude": -52.2747,
    "country": "Brazil",
    "city": "Erechim",
    "stadium": "Colosso da Lagoa",
    "capacity": 22000
  },

  // brasileirao d
  {
    "name": "ABECAT Ouvidorense",
    "latitude": -18.2,
    "longitude": -47.9833,
    "country": "Brazil",
    "city": "Ouvidor",
    "stadium": null,
    "capacity": null
  },
  {
    "name": "ABC FC",
    "latitude": -5.8364,
    "longitude": -35.255,
    "country": "Brazil",
    "city": "Natal",
    "stadium": "Frasqueirão",
    "capacity": 18000
  },
  {
    "name": "ACV Assen",
    "latitude": 52.9972,
    "longitude": 6.5594,
    "country": "Netherlands",
    "city": "Assen",
    "stadium": "Sportpark Asser Boys",
    "capacity": null
  },
  {
    "name": "Água Santa",
    "latitude": -23.7088,
    "longitude": -46.5658,
    "country": "Brazil",
    "city": "Diadema",
    "stadium": "Distrital do Jardim Inamar",
    "capacity": null
  },
  {
    "name": "Águia de Marabá",
    "latitude": -5.3333,
    "longitude": -47.6667,
    "country": "Brazil",
    "city": "Marabá",
    "stadium": "Zinho de Oliveira",
    "capacity": null
  },
  {
    "name": "Altos",
    "latitude": -4.8143,
    "longitude": -42.4633,
    "country": "Brazil",
    "city": "Altos",
    "stadium": "Felipão",
    "capacity": null
  },
  {
    "name": "América-RN",
    "latitude": -5.875,
    "longitude": -35.25,
    "country": "Brazil",
    "city": "Natal",
    "stadium": "Arena das Dunas",
    "capacity": 31375
  },
  {
    "name": "Anápolis",
    "latitude": -16.3267,
    "longitude": -48.9511,
    "country": "Brazil",
    "city": "Anápolis",
    "stadium": "Estádio Jonas Duarte",
    "capacity": null
  },
  {
    "name": "Aparecidense",
    "latitude": -16.828,
    "longitude": -49.2486,
    "country": "Brazil",
    "city": "Aparecida de Goiânia",
    "stadium": "Annibal Batista de Toledo",
    "capacity": 11700
  },
  {
    "name": "ASA",
    "latitude": -9.6647,
    "longitude": -35.7331,
    "country": "Brazil",
    "city": "Arapiraca",
    "stadium": "Estádio Municipal Coaracy da Mata Fonseca",
    "capacity": null
  },
  {
    "name": "Atlético Acreano",
    "latitude": -9.9667,
    "longitude": -67.8,
    "country": "Brazil",
    "city": "Rio Branco",
    "stadium": "Arena da Floresta",
    "capacity": null
  },
  {
    "name": "Atlético Cearense",
    "latitude": -3.7319,
    "longitude": -38.5267,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Estádio Presidente Vargas",
    "capacity": null
  },
  {
    "name": "Azuriz",
    "latitude": -25.795,
    "longitude": -52.6667,
    "country": "Brazil",
    "city": "Pato Branco",
    "stadium": "Estádio Os Pioneiros",
    "capacity": null
  },
  {
    "name": "Barra FC (SC)",
    "latitude": -26.9089,
    "longitude": -48.6756,
    "country": "Brazil",
    "city": "Balneário Camboriú",
    "stadium": "Estádio das Nações",
    "capacity": null
  },
  {
    "name": "Betim Futebol",
    "latitude": -19.965,
    "longitude": -44.2003,
    "country": "Brazil",
    "city": "Betim",
    "stadium": "Arena Vera Cruz",
    "capacity": null
  },
  {
    "name": "Brasil de Pelotas",
    "latitude": -31.7761,
    "longitude": -52.3481,
    "country": "Brazil",
    "city": "Pelotas",
    "stadium": "Estádio Bento Freitas",
    "capacity": null
  },
  {
    "name": "Brasiliense",
    "latitude": -15.8267,
    "longitude": -47.9158,
    "country": "Brazil",
    "city": "Taguatinga (DF)",
    "stadium": "Boca do Jacaré",
    "capacity": null
  },
  {
    "name": "Capital-DF",
    "latitude": -15.7725,
    "longitude": -47.785,
    "country": "Brazil",
    "city": "Brasília",
    "stadium": "Mané Garrincha",
    "capacity": null
  },
  {
    "name": "Ceilândia",
    "latitude": -15.8078,
    "longitude": -48.1069,
    "country": "Brazil",
    "city": "Ceilândia (DF)",
    "stadium": "Abadião",
    "capacity": null
  },
  {
    "name": "Central SC",
    "latitude": -8.2833,
    "longitude": -35.9667,
    "country": "Brazil",
    "city": "Caruaru",
    "stadium": "Estádio Luiz José de Lacerda",
    "capacity": null
  },
  {
    "name": "Cianorte",
    "latitude": -23.6667,
    "longitude": -52.6167,
    "country": "Brazil",
    "city": "Cianorte",
    "stadium": "Estádio Municipal Olímpico",
    "capacity": null
  },
  {
    "name": "CRAC",
    "latitude": -17.7289,
    "longitude": -47.6256,
    "country": "Brazil",
    "city": "Catalão",
    "stadium": "Estádio Genervino da Fonseca",
    "capacity": null
  },
  {
    "name": "CSA",
    "latitude": -9.6647,
    "longitude": -35.7331,
    "country": "Brazil",
    "city": "Maceió",
    "stadium": "Rei Pelé",
    "capacity": 17126
  },
  {
    "name": "CSE",
    "latitude": -9.3875,
    "longitude": -36.5775,
    "country": "Brazil",
    "city": "Palmeira dos Índios",
    "stadium": "Juca Sampaio",
    "capacity": null
  },
  {
    "name": "Democrata GV",
    "latitude": -18.8681,
    "longitude": -41.9547,
    "country": "Brazil",
    "city": "Governador Valadares",
    "stadium": "Mamudão",
    "capacity": null
  },
  {
    "name": "FC Cascavel",
    "latitude": -24.9575,
    "longitude": -53.5139,
    "country": "Brazil",
    "city": "Cascavel",
    "stadium": "Estádio Olímpico Regional Arnaldo Busatto",
    "capacity": null
  },
  {
    "name": "Ferroviário Atlético Clube",
    "latitude": -3.7319,
    "longitude": -38.5267,
    "country": "Brazil",
    "city": "Fortaleza",
    "stadium": "Estádio Presidente Vargas",
    "capacity": null
  },
  {
    "name": "Fluminense-PI",
    "latitude": -5.0889,
    "longitude": -42.8244,
    "country": "Brazil",
    "city": "Teresina",
    "stadium": "Albertão",
    "capacity": null
  },
  {
    "name": "Galvez EC",
    "latitude": -9.9667,
    "longitude": -67.8,
    "country": "Brazil",
    "city": "Rio Branco",
    "stadium": "Arena da Floresta",
    "capacity": null
  },
  {
    "name": "Gama",
    "latitude": -15.9858,
    "longitude": -48.0642,
    "country": "Brazil",
    "city": "Gama (DF)",
    "stadium": "Bezerrão",
    "capacity": null
  },
  {
    "name": "GAS (Grêmio Atlético Sampaio)",
    "latitude": 2.8222,
    "longitude": -60.6722,
    "country": "Brazil",
    "city": "Boa Vista",
    "stadium": "Canarinho",
    "capacity": null
  },
  {
    "name": "Goiatuba EC",
    "latitude": -18.0167,
    "longitude": -49.35,
    "country": "Brazil",
    "city": "Goiatuba",
    "stadium": "Divino Garcia Rosa",
    "capacity": null
  },
  {
    "name": "Guarany de Bagé",
    "latitude": -50.53,
    "longitude": -54.1,
    "country": "Brazil",
    "city": "Bagé",
    "stadium": "Estrela D'Alva",
    "capacity": null
  },
  {
    "name": "Hercílio Luz",
    "latitude": -28.47,
    "longitude": -49.0067,
    "country": "Brazil",
    "city": "Tubarão",
    "stadium": "Aníbal Costa",
    "capacity": null
  },
  {
    "name": "Humaitá",
    "latitude": -9.9667,
    "longitude": -67.8,
    "country": "Brazil",
    "city": "Porto Acre",
    "stadium": "Arena da Floresta",
    "capacity": null
  },
  {
    "name": "IAPE",
    "latitude": -2.5333,
    "longitude": -44.3,
    "country": "Brazil",
    "city": "São Luís",
    "stadium": "Castelão (MA)",
    "capacity": null
  },
  {
    "name": "Iguatu",
    "latitude": -6.3536,
    "longitude": -39.3083,
    "country": "Brazil",
    "city": "Iguatu",
    "stadium": "Mirandão",
    "capacity": null
  },
  {
    "name": "Imperatriz",
    "latitude": -5.526,
    "longitude": -47.4616,
    "country": "Brazil",
    "city": "Imperatriz",
    "stadium": "Estádio Frei Epifânio D'Abadia",
    "capacity": 12000
  },
  {
    "name": "Independência FC",
    "latitude": -9.9667,
    "longitude": -67.8,
    "country": "Brazil",
    "city": "Rio Branco",
    "stadium": "Arena da Floresta",
    "capacity": null
  },
  {
    "name": "Inhumas EC",
    "latitude": -16.5822,
    "longitude": -49.4975,
    "country": "Brazil",
    "city": "Inhumas",
    "stadium": "Zico Brandão",
    "capacity": null
  },
  {
    "name": "Inter de Limeira",
    "latitude": -22.5639,
    "longitude": -47.4111,
    "country": "Brazil",
    "city": "Limeira",
    "stadium": "Estádio Major José Levy Sobrinho",
    "capacity": null
  },
  {
    "name": "Itabaiana",
    "latitude": -10.686,
    "longitude": -37.4208,
    "country": "Brazil",
    "city": "Itabaiana",
    "stadium": "Etelvino Mendonça",
    "capacity": null
  },
  {
    "name": "Jacuipense",
    "latitude": -11.6667,
    "longitude": -39.0,
    "country": "Brazil",
    "city": "Riachão do Jacuípe",
    "stadium": "Valfredão",
    "capacity": null
  },
  {
    "name": "Joinville EC",
    "latitude": -26.3044,
    "longitude": -48.8683,
    "country": "Brazil",
    "city": "Joinville",
    "stadium": "Arena Joinville",
    "capacity": null
  },
  {
    "name": "Juazeirense",
    "latitude": -9.4169,
    "longitude": -40.5,
    "country": "Brazil",
    "city": "Juazeiro",
    "stadium": "Adauto Moraes",
    "capacity": null
  },
  {
    "name": "Lagarto FC",
    "latitude": -10.9161,
    "longitude": -37.0858,
    "country": "Brazil",
    "city": "Lagarto",
    "stadium": "Barretão",
    "capacity": null
  },
  {
    "name": "Londrina",
    "latitude": -23.33,
    "longitude": -51.1611,
    "country": "Brazil",
    "city": "Londrina",
    "stadium": "Estádio do Café",
    "capacity": 31000
  },
  {
    "name": "Luverdense",
    "latitude": -13.067,
    "longitude": -56.096,
    "country": "Brazil",
    "city": "Lucas do Rio Verde",
    "stadium": "Passo das Emas",
    "capacity": null
  },
  {
    "name": "Madureira EC",
    "latitude": -22.8681,
    "longitude": -43.3458,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Estádio Conselheiro Galvão",
    "capacity": null
  },
  {
    "name": "Maguary",
    "latitude": -8.05,
    "longitude": -34.8833,
    "country": "Brazil",
    "city": "Recife",
    "stadium": "Arena de Pernambuco",
    "capacity": null
  },
  {
    "name": "Manaus FC",
    "latitude": -3.1194,
    "longitude": -60.0217,
    "country": "Brazil",
    "city": "Manaus",
    "stadium": "Arena da Amazônia",
    "capacity": null
  },
  {
    "name": "Manauara EC",
    "latitude": -3.1194,
    "longitude": -60.0217,
    "country": "Brazil",
    "city": "Manaus",
    "stadium": "Arena da Amazônia",
    "capacity": null
  },
  {
    "name": "Maranhão Atlético Clube",
    "latitude": -2.5333,
    "longitude": -44.3,
    "country": "Brazil",
    "city": "São Luís",
    "stadium": "Castelão (MA)",
    "capacity": null
  },
  {
    "name": "Marcílio Dias",
    "latitude": -26.9089,
    "longitude": -48.6756,
    "country": "Brazil",
    "city": "Itajaí",
    "stadium": "Estádio Hercílio Luz",
    "capacity": null
  },
  {
    "name": "Maricá FC",
    "latitude": -22.9103,
    "longitude": -42.8169,
    "country": "Brazil",
    "city": "Maricá",
    "stadium": "Estádio Alzirão",
    "capacity": null
  },
  {
    "name": "Mixto EC",
    "latitude": -15.6025,
    "longitude": -56.0967,
    "country": "Brazil",
    "city": "Cuiabá",
    "stadium": "Arena Pantanal",
    "capacity": null
  },
  {
    "name": "Moto Club",
    "latitude": -2.5333,
    "longitude": -44.3,
    "country": "Brazil",
    "city": "São Luís",
    "stadium": "Castelão (MA)",
    "capacity": null
  },
  {
    "name": "Nacional FC (AM)",
    "latitude": -3.1194,
    "longitude": -60.0217,
    "country": "Brazil",
    "city": "Manaus",
    "stadium": "Arena da Amazônia",
    "capacity": null
  },
  {
    "name": "Noroeste",
    "latitude": -22.3167,
    "longitude": -49.0667,
    "country": "Brazil",
    "city": "Bauru",
    "stadium": "Estádio Alfredo de Castilho",
    "capacity": null
  },
  {
    "name": "Nova Iguaçu FC",
    "latitude": -22.7533,
    "longitude": -43.4864,
    "country": "Brazil",
    "city": "Nova Iguaçu",
    "stadium": "Estádio Laranjão",
    "capacity": null
  },
  {
    "name": "Operário FC (MT)",
    "latitude": -15.6025,
    "longitude": -56.0967,
    "country": "Brazil",
    "city": "Várzea Grande",
    "stadium": "Arena Pantanal",
    "capacity": null
  },
  {
    "name": "Operário FC (MS)",
    "latitude": -20.4428,
    "longitude": -54.6464,
    "country": "Brazil",
    "city": "Campo Grande",
    "stadium": "Estádio Morenão",
    "capacity": null
  },
  {
    "name": "Oratório RC",
    "latitude": 0.0,
    "longitude": -51.05,
    "country": "Brazil",
    "city": "Macapá",
    "stadium": "Zerão",
    "capacity": null
  },
  {
    "name": "Parnahyba SC",
    "latitude": -2.904,
    "longitude": -41.751,
    "country": "Brazil",
    "city": "Parnaíba",
    "stadium": "Pedro Alelaf",
    "capacity": null
  },
  {
    "name": "Piauí EC",
    "latitude": -5.0889,
    "longitude": -42.8244,
    "country": "Brazil",
    "city": "Teresina",
    "stadium": "Albertão",
    "capacity": null
  },
  {
    "name": "Porto Velho EC",
    "latitude": -8.7619,
    "longitude": -63.9039,
    "country": "Brazil",
    "city": "Porto Velho",
    "stadium": "Afonso de Carvalho",
    "capacity": null
  },
  {
    "name": "Portuguesa-RJ",
    "latitude": -22.8122,
    "longitude": -43.1678,
    "country": "Brazil",
    "city": "Rio de Janeiro",
    "stadium": "Estádio Luso Brasileiro",
    "capacity": null
  },
  {
    "name": "Pouso Alegre FC",
    "latitude": -22.2858,
    "longitude": -45.9281,
    "country": "Brazil",
    "city": "Pouso Alegre",
    "stadium": "Manduzão",
    "capacity": null
  },
  {
    "name": "Primavera EC",
    "latitude": -22.9056,
    "longitude": -47.2197,
    "country": "Brazil",
    "city": "Indaiatuba",
    "stadium": "Estádio Ítalo Limongi",
    "capacity": null
  },
  {
    "name": "Real Noroeste",
    "latitude": -18.7303,
    "longitude": -40.6975,
    "country": "Brazil",
    "city": "Águia Branca",
    "stadium": "José Olímpio da Rocha",
    "capacity": null
  },
  {
    "name": "Retrô FC Brasil",
    "latitude": -8.0322,
    "longitude": -34.8969,
    "country": "Brazil",
    "city": "Camaragibe",
    "stadium": "Arena Pernambuco",
    "capacity": null
  },
  {
    "name": "Rio Branco-ES",
    "latitude": -20.3167,
    "longitude": -40.2833,
    "country": "Brazil",
    "city": "Vitória",
    "stadium": "Estádio Kléber Andrade",
    "capacity": null
  },
  {
    "name": "Sampaio Corrêa-RJ",
    "latitude": -22.2133,
    "longitude": -42.8197,
    "country": "Brazil",
    "city": "Saquarema",
    "stadium": "Estádio Lourival Gomes de Almeida",
    "capacity": null
  },
  {
    "name": "Santa Catarina FC",
    "latitude": -26.9089,
    "longitude": -48.6756,
    "country": "Brazil",
    "city": "Balneário Camboriú",
    "stadium": "Estádio das Nações",
    "capacity": null
  },
  {
    "name": "Santa Cruz FC",
    "latitude": -8.0322,
    "longitude": -34.8969,
    "country": "Brazil",
    "city": "Recife",
    "stadium": "Arruda",
    "capacity": 60044
  },
  {
    "name": "São José-RS",
    "latitude": -30.015,
    "longitude": -51.1711,
    "country": "Brazil",
    "city": "Porto Alegre",
    "stadium": "Passo D'Areia",
    "capacity": 14000
  },
  {
    "name": "São Joseense",
    "latitude": -25.5303,
    "longitude": -49.2064,
    "country": "Brazil",
    "city": "São José dos Pinhais",
    "stadium": "Estádio do Pinhão",
    "capacity": null
  },
  {
    "name": "São Luiz",
    "latitude": -28.2464,
    "longitude": -54.5517,
    "country": "Brazil",
    "city": "Ijuí",
    "stadium": "19 de Outubro",
    "capacity": null
  },
  {
    "name": "São Raimundo-RR",
    "latitude": 2.8222,
    "longitude": -60.6722,
    "country": "Brazil",
    "city": "Boa Vista",
    "stadium": "Canarinho",
    "capacity": null
  },
  {
    "name": "Sergipe",
    "latitude": -10.9161,
    "longitude": -37.0858,
    "country": "Brazil",
    "city": "Aracaju",
    "stadium": "Batistão",
    "capacity": 15586
  },
  {
    "name": "Sousa EC",
    "latitude": -6.78,
    "longitude": -38.232,
    "country": "Brazil",
    "city": "Sousa",
    "stadium": "Marizão",
    "capacity": null
  },
  {
    "name": "Tocantinópolis EC",
    "latitude": -6.297,
    "longitude": -47.419,
    "country": "Brazil",
    "city": "Tocantinópolis",
    "stadium": "João Ribeiro (Chapadinha)",
    "capacity": null
  },
  {
    "name": "Treze FC",
    "latitude": -7.2289,
    "longitude": -35.8825,
    "country": "Brazil",
    "city": "Campina Grande",
    "stadium": "Amigão",
    "capacity": 35000
  },
  {
    "name": "Trem DC",
    "latitude": 0.0,
    "longitude": -51.05,
    "country": "Brazil",
    "city": "Macapá",
    "stadium": "Zerão",
    "capacity": null
  },
  {
    "name": "Tuna Luso Brasileira",
    "latitude": -1.4589,
    "longitude": -48.4878,
    "country": "Brazil",
    "city": "Belém",
    "stadium": "Estádio do Souza",
    "capacity": null
  },
  {
    "name": "Uberlândia EC",
    "latitude": -18.915,
    "longitude": -48.275,
    "country": "Brazil",
    "city": "Uberlândia",
    "stadium": "Parque do Sabiá",
    "capacity": null
  },
  {
    "name": "União Rondonópolis",
    "latitude": -16.4639,
    "longitude": -50.4128,
    "country": "Brazil",
    "city": "Rondonópolis",
    "stadium": "Estádio Engenheiro Luthero Lopes",
    "capacity": null
  },
  {
    "name": "Velo Clube",
    "latitude": -22.411,
    "longitude": -47.5756,
    "country": "Brazil",
    "city": "Rio Claro",
    "stadium": "Estádio Benito Agnelo Castellano",
    "capacity": null
  },
  {
    "name": "Vitória-ES",
    "latitude": -20.3167,
    "longitude": -40.2833,
    "country": "Brazil",
    "city": "Vitória",
    "stadium": "Estádio Kléber Andrade",
    "capacity": null
  }
];
