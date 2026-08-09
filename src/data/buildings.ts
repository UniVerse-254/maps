import type { Building } from "@/types";

export const buildings: Building[] = [
  {
    id: "oval-building",
    code: "OB",
    name: "Oval Building",
    phase: "phase2",
    homeSchool: "",
    description: "",
    floors: ["Basement", "Ground Floor", "First Floor"],
    coordinates: {
      lat: -1.310471249091984,
      lng: 36.8140122605563,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "oval-building-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310471249091984,
          lng: 36.8140122605563,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310560697232641,
        lng: 36.81389223576589,
      },
      {
        lat: -1.310699013299373,
        lng: 36.81388727146305,
      },
      {
        lat: -1.310709638162781,
        lng: 36.8141193080084,
      },
      {
        lat: -1.310568149394577,
        lng: 36.81413387447989,
      },
      {
        lat: -1.310538881508411,
        lng: 36.81413272688319,
      },
      {
        lat: -1.310509642025265,
        lng: 36.81410595281741,
      },
      {
        lat: -1.310488930791782,
        lng: 36.81407303934446,
      },
      {
        lat: -1.310476760025531,
        lng: 36.81403044802031,
      },
      {
        lat: -1.310488941234375,
        lng: 36.81397076940416,
      },
      {
        lat: -1.310499912892632,
        lng: 36.81392707131788,
      },
      {
        lat: -1.310526690948192,
        lng: 36.81390296827937,
      },
      {
        lat: -1.310560697232641,
        lng: 36.81389223576589,
      },
    ],
    keywords: [],
  },
  {
    id: "admin-block",
    code: "AB",
    name: "Admin Block",
    phase: "phase1",
    homeSchool: "School of Computing",
    description: "",
    floors: ["Offices", "Central Building", "Lecture Theatres"],
    coordinates: {
      lat: -1.30943563435293,
      lng: 36.81238885439198,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "admin-block-entrance-main",
        label: null,
        coordinates: {
          lat: -1.30943563435293,
          lng: 36.81238885439198,
        },
      },
    ],
    footprint: [
      {
        lat: -1.309736666418359,
        lng: 36.81260223732473,
      },
      {
        lat: -1.309333974808019,
        lng: 36.81334234002663,
      },
      {
        lat: -1.309036945039136,
        lng: 36.81342414482003,
      },
      {
        lat: -1.308689632851001,
        lng: 36.81324632472222,
      },
      {
        lat: -1.308774153814788,
        lng: 36.81304613332578,
      },
      {
        lat: -1.308697216866084,
        lng: 36.81300485503118,
      },
      {
        lat: -1.308871976730479,
        lng: 36.8126867963541,
      },
      {
        lat: -1.308751914367013,
        lng: 36.81262221920645,
      },
      {
        lat: -1.308822196208714,
        lng: 36.81250543355696,
      },
      {
        lat: -1.308937271492451,
        lng: 36.81256781704739,
      },
      {
        lat: -1.309102389203703,
        lng: 36.81226673389459,
      },
      {
        lat: -1.309736666418359,
        lng: 36.81260223732473,
      },
    ],
    keywords: [],
  },
  {
    id: "sbs",
    code: "SBS",
    name: "SBS",
    phase: "phase2",
    homeSchool: "School of Business",
    description: "",
    floors: ["Basement", "Ground Floor", "First Floor", "Second Floor"],
    coordinates: {
      lat: -1.310121748554326,
      lng: 36.81256203135325,
    },
    entrance: "Entrances A, B",
    entrances: [
      {
        id: "sbs-entrance-a",
        label: "A",
        coordinates: {
          lat: -1.310121748554326,
          lng: 36.81256203135325,
        },
      },
      {
        id: "sbs-entrance-b",
        label: "B",
        coordinates: {
          lat: -1.310591332431599,
          lng: 36.81282130179297,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310217623773902,
        lng: 36.81237006503455,
      },
      {
        lat: -1.310611489190125,
        lng: 36.81254401009001,
      },
      {
        lat: -1.310576324790042,
        lng: 36.81266969081889,
      },
      {
        lat: -1.310643337685956,
        lng: 36.81270710134703,
      },
      {
        lat: -1.310582377536092,
        lng: 36.81281533913686,
      },
      {
        lat: -1.310535112584626,
        lng: 36.8127955796537,
      },
      {
        lat: -1.310470220630864,
        lng: 36.81294303136771,
      },
      {
        lat: -1.31016616294813,
        lng: 36.81282068872038,
      },
      {
        lat: -1.310158351720257,
        lng: 36.81285793593197,
      },
      {
        lat: -1.310048860500943,
        lng: 36.8127911220581,
      },
      {
        lat: -1.310217623773902,
        lng: 36.81237006503455,
      },
    ],
    keywords: [],
  },
  {
    id: "stc",
    code: "STC",
    name: "STC",
    phase: "phase2",
    homeSchool: "",
    description: "",
    floors: [
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Third Floor",
      "Fourth Floor",
    ],
    coordinates: {
      lat: -1.309971718023035,
      lng: 36.81341105303441,
    },
    entrance: "Entrances A, B, C",
    entrances: [
      {
        id: "stc-entrance-a",
        label: "A",
        coordinates: {
          lat: -1.309971718023035,
          lng: 36.81341105303441,
        },
      },
      {
        id: "stc-entrance-b",
        label: "B",
        coordinates: {
          lat: -1.309907331638507,
          lng: 36.81309192530397,
        },
      },
      {
        id: "stc-entrance-c",
        label: "C",
        coordinates: {
          lat: -1.310275524419068,
          lng: 36.81321797118538,
        },
      },
    ],
    footprint: [
      {
        lat: -1.309965053970394,
        lng: 36.81295469308782,
      },
      {
        lat: -1.310299905867783,
        lng: 36.81307560715891,
      },
      {
        lat: -1.310269692370116,
        lng: 36.81312673600733,
      },
      {
        lat: -1.310296309114507,
        lng: 36.81314949538515,
      },
      {
        lat: -1.310241533466538,
        lng: 36.81329550769676,
      },
      {
        lat: -1.310247313189821,
        lng: 36.81333921969094,
      },
      {
        lat: -1.31012055062285,
        lng: 36.81363267515277,
      },
      {
        lat: -1.309955266823922,
        lng: 36.8135827408632,
      },
      {
        lat: -1.310016027504826,
        lng: 36.81341123211882,
      },
      {
        lat: -1.309822968585038,
        lng: 36.8133179468116,
      },
      {
        lat: -1.309893135152537,
        lng: 36.81317960833501,
      },
      {
        lat: -1.309944261386753,
        lng: 36.81307368436249,
      },
      {
        lat: -1.309965053970394,
        lng: 36.81295469308782,
      },
    ],
    keywords: [],
  },
  {
    id: "stmb",
    code: "STMB",
    name: "STMB",
    phase: "phase2",
    homeSchool: "",
    description: "",
    floors: [
      "Basement",
      "Ground Floor",
      "First Floor",
      "Second Floor",
      "Third Floor",
      "Fourth Floor",
      "Fifth Floor",
    ],
    coordinates: {
      lat: -1.310576242973425,
      lng: 36.81339991346479,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "stmb-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310576242973425,
          lng: 36.81339991346479,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310680151097315,
        lng: 36.81343145682303,
      },
      {
        lat: -1.310487711644408,
        lng: 36.8133564428743,
      },
      {
        lat: -1.310505854809376,
        lng: 36.81332135675279,
      },
      {
        lat: -1.310468358844824,
        lng: 36.81330925815259,
      },
      {
        lat: -1.310580531660261,
        lng: 36.81305892281932,
      },
      {
        lat: -1.310643341731273,
        lng: 36.81308061884342,
      },
      {
        lat: -1.310648167522117,
        lng: 36.81305407031313,
      },
      {
        lat: -1.310723179331788,
        lng: 36.81308420703868,
      },
      {
        lat: -1.310717221133872,
        lng: 36.81311319927423,
      },
      {
        lat: -1.310764831632711,
        lng: 36.81313620534706,
      },
      {
        lat: -1.310660705940458,
        lng: 36.81337838663585,
      },
      {
        lat: -1.310700958123447,
        lng: 36.81339390229724,
      },
      {
        lat: -1.310680151097315,
        lng: 36.81343145682303,
      },
    ],
    keywords: [],
  },
  {
    id: "msb",
    code: "MSB",
    name: "MSB",
    phase: "phase2",
    homeSchool: "School of Management",
    description: "",
    floors: ["First Floor", "Second Floor", "Third Floor", "Fourth Floor"],
    coordinates: {
      lat: -1.310802844234549,
      lng: 36.81433770019686,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "msb-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310802844234549,
          lng: 36.81433770019686,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310848041618613,
        lng: 36.81456290515004,
      },
      {
        lat: -1.310836798403148,
        lng: 36.8142782515391,
      },
      {
        lat: -1.310831668812677,
        lng: 36.81412179336083,
      },
      {
        lat: -1.311023111531041,
        lng: 36.81410472488506,
      },
      {
        lat: -1.311031448563272,
        lng: 36.8142172874043,
      },
      {
        lat: -1.311085773670368,
        lng: 36.81421989078491,
      },
      {
        lat: -1.31109329387054,
        lng: 36.81443416133985,
      },
      {
        lat: -1.311036284562998,
        lng: 36.8144378613304,
      },
      {
        lat: -1.31104246482337,
        lng: 36.81455349160844,
      },
      {
        lat: -1.310848041618613,
        lng: 36.81456290515004,
      },
    ],
    keywords: [],
  },
  {
    id: "eng-labs",
    code: "ENGL",
    name: "ENG LABS",
    phase: "phase2",
    homeSchool: "School of Engineering",
    description: "",
    floors: ["Ground Floor", "First Floor"],
    coordinates: {
      lat: -1.310378295998449,
      lng: 36.81559906692188,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "eng-labs-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310378295998449,
          lng: 36.81559906692188,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310359226832568,
        lng: 36.8155734242328,
      },
      {
        lat: -1.310379806275887,
        lng: 36.81571940092113,
      },
      {
        lat: -1.310182399754605,
        lng: 36.81571764350571,
      },
      {
        lat: -1.310177992475991,
        lng: 36.81557852724093,
      },
      {
        lat: -1.310359226832568,
        lng: 36.8155734242328,
      },
    ],
    keywords: [],
  },
  {
    id: "serc-forge",
    code: "SERC",
    name: "SERC FORGE",
    phase: "phase2",
    homeSchool: "School of Engineering",
    description: "",
    floors: ["Ground Floor", "First Floor"],
    coordinates: {
      lat: -1.310381342582331,
      lng: 36.81543409101904,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "serc-forge-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310381342582331,
          lng: 36.81543409101904,
        },
      },
    ],
    footprint: [
      {
        lat: -1.310357424059609,
        lng: 36.81527139470011,
      },
      {
        lat: -1.310361696654879,
        lng: 36.81557097218211,
      },
      {
        lat: -1.310181669545941,
        lng: 36.81556996863936,
      },
      {
        lat: -1.310165895043305,
        lng: 36.81527386698125,
      },
      {
        lat: -1.310357424059609,
        lng: 36.81527139470011,
      },
    ],
    keywords: [],
  },
  {
    id: "forge",
    code: "FG",
    name: "Forge",
    phase: "phase2",
    homeSchool: "School of Engineering",
    description: "",
    floors: ["Ground Floor", "First Floor", "Second Floor"],
    coordinates: {
      lat: -1.310528560342512,
      lng: 36.81512203851072,
    },
    entrance: "Main entrance",
    entrances: [
      {
        id: "forge-entrance-main",
        label: null,
        coordinates: {
          lat: -1.310528560342512,
          lng: 36.81512203851072,
        },
      },
    ],
    footprint: [
      {
        lat: -1.3101621725309,
        lng: 36.81502453141909,
      },
      {
        lat: -1.31050082651984,
        lng: 36.81502085701507,
      },
      {
        lat: -1.310510121474719,
        lng: 36.81526970346048,
      },
      {
        lat: -1.31016787153047,
        lng: 36.81527279497958,
      },
      {
        lat: -1.3101621725309,
        lng: 36.81502453141909,
      },
    ],
    keywords: [],
  },
];
