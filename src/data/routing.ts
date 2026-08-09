import type { RoutingGraph } from "../types";

export const routingGraph: RoutingGraph = {
  node_0: {
    coords: {
      lat: -1.308953117891286,
      lng: 36.81204819095864,
    },
    neighbors: {
      node_1: 66,
    },
  },
  node_1: {
    coords: {
      lat: -1.309480315819293,
      lng: 36.81232950785546,
    },
    neighbors: {
      node_0: 66,
      node_2: 41,
      node_5: 7,
    },
  },
  node_2: {
    coords: {
      lat: -1.309811538776721,
      lng: 36.81249848496076,
    },
    neighbors: {
      node_1: 41,
      node_3: 11,
    },
  },
  node_3: {
    coords: {
      lat: -1.309902433808414,
      lng: 36.81246076960345,
    },
    neighbors: {
      node_2: 11,
      node_4: 9,
    },
  },
  node_4: {
    coords: {
      lat: -1.309976521283523,
      lng: 36.81248350106618,
    },
    neighbors: {
      node_3: 9,
      node_8: 6,
    },
  },
  node_5: {
    coords: {
      lat: -1.309447135492327,
      lng: 36.81238680345832,
    },
    neighbors: {
      node_1: 7,
    },
  },
  node_6: {
    coords: {
      lat: -1.30985293239097,
      lng: 36.81405302447696,
    },
    neighbors: {
      node_7: 25,
      node_38: 11,
    },
  },
  node_7: {
    coords: {
      lat: -1.309779059992563,
      lng: 36.81426166985885,
    },
    neighbors: {
      node_6: 25,
      node_30: 31,
      node_39: 47,
    },
  },
  node_8: {
    coords: {
      lat: -1.310021423793622,
      lng: 36.81250495247259,
    },
    neighbors: {
      node_4: 6,
      node_9: 117,
    },
  },
  node_9: {
    coords: {
      lat: -1.309654567171331,
      lng: 36.81348817241609,
    },
    neighbors: {
      node_8: 117,
      node_10: 5,
    },
  },
  node_10: {
    coords: {
      lat: -1.309698050155713,
      lng: 36.8135019629378,
    },
    neighbors: {
      node_9: 5,
      node_11: 10,
    },
  },
  node_11: {
    coords: {
      lat: -1.30978220147156,
      lng: 36.81352931046814,
    },
    neighbors: {
      node_10: 10,
      node_12: 21,
      node_24: 18,
      node_76: 13,
    },
  },
  node_12: {
    coords: {
      lat: -1.30984829551378,
      lng: 36.81335361631341,
    },
    neighbors: {
      node_11: 21,
      node_13: 5,
      node_25: 19,
    },
  },
  node_13: {
    coords: {
      lat: -1.309807110802812,
      lng: 36.81333120686831,
    },
    neighbors: {
      node_12: 5,
      node_14: 28,
    },
  },
  node_14: {
    coords: {
      lat: -1.309921298436818,
      lng: 36.81310927909196,
    },
    neighbors: {
      node_13: 28,
      node_15: 8,
    },
  },
  node_15: {
    coords: {
      lat: -1.309890505786177,
      lng: 36.81304516196729,
    },
    neighbors: {
      node_14: 8,
      node_16: 24,
    },
  },
  node_16: {
    coords: {
      lat: -1.309970044981593,
      lng: 36.81284335559813,
    },
    neighbors: {
      node_15: 24,
      node_17: 45,
      node_23: 37,
    },
  },
  node_17: {
    coords: {
      lat: -1.310343376423135,
      lng: 36.81300294734879,
    },
    neighbors: {
      node_16: 45,
      node_18: 6,
      node_19: 6,
      node_72: 25,
    },
  },
  node_18: {
    coords: {
      lat: -1.310353190402682,
      lng: 36.81305681736576,
    },
    neighbors: {
      node_17: 6,
    },
  },
  node_19: {
    coords: {
      lat: -1.310383719510238,
      lng: 36.81296611703075,
    },
    neighbors: {
      node_17: 6,
      node_20: 7,
    },
  },
  node_20: {
    coords: {
      lat: -1.310434593594697,
      lng: 36.8129347715239,
    },
    neighbors: {
      node_19: 7,
      node_21: 8,
    },
  },
  node_21: {
    coords: {
      lat: -1.31050712485558,
      lng: 36.81295737274473,
    },
    neighbors: {
      node_20: 8,
      node_22: 15,
    },
  },
  node_22: {
    coords: {
      lat: -1.310565903729431,
      lng: 36.81283110627572,
    },
    neighbors: {
      node_21: 15,
      node_28: 39,
    },
  },
  node_23: {
    coords: {
      lat: -1.310088068933349,
      lng: 36.81253631139703,
    },
    neighbors: {
      node_16: 37,
    },
  },
  node_24: {
    coords: {
      lat: -1.309921975281395,
      lng: 36.81360318151464,
    },
    neighbors: {
      node_11: 18,
      node_25: 24,
      node_37: 18,
      node_73: 49,
    },
  },
  node_25: {
    coords: {
      lat: -1.310013167740043,
      lng: 36.81340674559053,
    },
    neighbors: {
      node_24: 24,
      node_12: 19,
    },
  },
  node_26: {
    coords: {
      lat: -1.310980751315178,
      lng: 36.81323496153365,
    },
    neighbors: {
      node_27: 19,
      node_81: 28,
      node_29: 28,
    },
  },
  node_27: {
    coords: {
      lat: -1.31094458112562,
      lng: 36.81306504568048,
    },
    neighbors: {
      node_26: 19,
      node_28: 14,
    },
  },
  node_28: {
    coords: {
      lat: -1.310889919825048,
      lng: 36.81295438040628,
    },
    neighbors: {
      node_27: 14,
      node_22: 39,
    },
  },
  node_29: {
    coords: {
      lat: -1.310901503961812,
      lng: 36.81346993803854,
    },
    neighbors: {
      node_79: 22,
      node_80: 15,
      node_26: 28,
    },
  },
  node_30: {
    coords: {
      lat: -1.310046340945685,
      lng: 36.81435495597878,
    },
    neighbors: {
      node_7: 31,
      node_31: 34,
      node_32: 29,
    },
  },
  node_31: {
    coords: {
      lat: -1.310160282326279,
      lng: 36.81407156489752,
    },
    neighbors: {
      node_30: 34,
      node_75: 28,
      node_38: 29,
    },
  },
  node_32: {
    coords: {
      lat: -1.31029114588039,
      lng: 36.81444888547666,
    },
    neighbors: {
      node_30: 29,
      node_33: 7,
      node_36: 17,
    },
  },
  node_33: {
    coords: {
      lat: -1.310272329983474,
      lng: 36.81451301554707,
    },
    neighbors: {
      node_32: 7,
      node_34: 6,
    },
  },
  node_34: {
    coords: {
      lat: -1.310268425742608,
      lng: 36.81456749481845,
    },
    neighbors: {
      node_33: 6,
      node_39: 74,
      node_40: 6,
    },
  },
  node_35: {
    coords: {
      lat: -1.310404598268604,
      lng: 36.81431792162913,
    },
    neighbors: {
      node_36: 6,
      node_75: 34,
      node_57: 42,
      node_78: 16,
    },
  },
  node_36: {
    coords: {
      lat: -1.310353938554992,
      lng: 36.81431280759236,
    },
    neighbors: {
      node_35: 6,
      node_32: 17,
    },
  },
  node_37: {
    coords: {
      lat: -1.309909063971727,
      lng: 36.81376855219457,
    },
    neighbors: {
      node_38: 23,
      node_24: 18,
    },
  },
  node_38: {
    coords: {
      lat: -1.309914277193897,
      lng: 36.81397709700353,
    },
    neighbors: {
      node_37: 23,
      node_6: 11,
      node_31: 29,
    },
  },
  node_39: {
    coords: {
      lat: -1.309605888586678,
      lng: 36.8146463752894,
    },
    neighbors: {
      node_7: 47,
      node_34: 74,
      node_77: 28,
    },
  },
  node_40: {
    coords: {
      lat: -1.310286512194454,
      lng: 36.8146217340924,
    },
    neighbors: {
      node_34: 6,
      node_41: 12,
    },
  },
  node_41: {
    coords: {
      lat: -1.31038999477162,
      lng: 36.81461510886273,
    },
    neighbors: {
      node_40: 12,
      node_42: 7,
    },
  },
  node_42: {
    coords: {
      lat: -1.310442997511931,
      lng: 36.81465022107967,
    },
    neighbors: {
      node_41: 7,
      node_43: 11,
    },
  },
  node_43: {
    coords: {
      lat: -1.310532783740395,
      lng: 36.81460325049792,
    },
    neighbors: {
      node_42: 11,
      node_44: 58,
      node_78: 27,
    },
  },
  node_44: {
    coords: {
      lat: -1.310613871151168,
      lng: 36.81511698506983,
    },
    neighbors: {
      node_43: 58,
      node_45: 7,
      node_46: 80,
    },
  },
  node_45: {
    coords: {
      lat: -1.31055094520294,
      lng: 36.81512203218448,
    },
    neighbors: {
      node_44: 7,
      node_52: 17,
    },
  },
  node_46: {
    coords: {
      lat: -1.310644993771818,
      lng: 36.8158340491949,
    },
    neighbors: {
      node_44: 80,
      node_47: 22,
      node_62: 33,
    },
  },
  node_47: {
    coords: {
      lat: -1.310451475030934,
      lng: 36.81580677612421,
    },
    neighbors: {
      node_46: 22,
      node_48: 25,
      node_53: 35,
    },
  },
  node_48: {
    coords: {
      lat: -1.310422135099039,
      lng: 36.81558205619947,
    },
    neighbors: {
      node_47: 25,
      node_49: 5,
    },
  },
  node_49: {
    coords: {
      lat: -1.31037953603634,
      lng: 36.81556684067803,
    },
    neighbors: {
      node_48: 5,
      node_50: 8,
      node_51: 32,
    },
  },
  node_50: {
    coords: {
      lat: -1.310368380058669,
      lng: 36.81564169370701,
    },
    neighbors: {
      node_49: 8,
    },
  },
  node_51: {
    coords: {
      lat: -1.310365407099796,
      lng: 36.81527890403698,
    },
    neighbors: {
      node_49: 32,
      node_52: 21,
    },
  },
  node_52: {
    coords: {
      lat: -1.310550764681492,
      lng: 36.81527459153972,
    },
    neighbors: {
      node_51: 21,
      node_45: 17,
    },
  },
  node_53: {
    coords: {
      lat: -1.310132943213315,
      lng: 36.81581891930561,
    },
    neighbors: {
      node_47: 35,
    },
  },
  node_54: {
    coords: {
      lat: -1.310531091500864,
      lng: 36.81581720306289,
    },
    neighbors: {
      node_55: 115,
    },
  },
  node_55: {
    coords: {
      lat: -1.31064812998225,
      lng: 36.81684054687376,
    },
    neighbors: {
      node_54: 115,
      node_56: 33,
    },
  },
  node_56: {
    coords: {
      lat: -1.31086037298945,
      lng: 36.81704376941764,
    },
    neighbors: {
      node_55: 33,
    },
  },
  node_57: {
    coords: {
      lat: -1.310777495723726,
      lng: 36.8142642567364,
    },
    neighbors: {
      node_58: 60,
      node_63: 16,
      node_35: 42,
    },
  },
  node_58: {
    coords: {
      lat: -1.310827623024056,
      lng: 36.81480549538131,
    },
    neighbors: {
      node_57: 60,
      node_59: 22,
    },
  },
  node_59: {
    coords: {
      lat: -1.310911276258251,
      lng: 36.81498132634491,
    },
    neighbors: {
      node_58: 22,
      node_60: 56,
    },
  },
  node_60: {
    coords: {
      lat: -1.31091113442256,
      lng: 36.81548355818963,
    },
    neighbors: {
      node_59: 56,
      node_61: 57,
    },
  },
  node_61: {
    coords: {
      lat: -1.310887312183723,
      lng: 36.81599644298007,
    },
    neighbors: {
      node_60: 57,
      node_62: 9,
    },
  },
  node_62: {
    coords: {
      lat: -1.310833600341628,
      lng: 36.81606286009277,
    },
    neighbors: {
      node_46: 33,
      node_61: 9,
    },
  },
  node_63: {
    coords: {
      lat: -1.310801086098447,
      lng: 36.81411994616607,
    },
    neighbors: {
      node_57: 16,
      node_64: 22,
    },
  },
  node_64: {
    coords: {
      lat: -1.310812015113174,
      lng: 36.81392651677838,
    },
    neighbors: {
      node_63: 22,
      node_65: 26,
    },
  },
  node_65: {
    coords: {
      lat: -1.310740769472632,
      lng: 36.81370490243643,
    },
    neighbors: {
      node_64: 26,
      node_66: 9,
      node_70: 24,
    },
  },
  node_66: {
    coords: {
      lat: -1.310670376064335,
      lng: 36.81374903523166,
    },
    neighbors: {
      node_65: 9,
      node_67: 15,
    },
  },
  node_67: {
    coords: {
      lat: -1.310537726889167,
      lng: 36.81371266744276,
    },
    neighbors: {
      node_66: 15,
      node_68: 10,
    },
  },
  node_68: {
    coords: {
      lat: -1.310500922314515,
      lng: 36.81363387601797,
    },
    neighbors: {
      node_67: 10,
      node_69: 20,
      node_73: 24,
    },
  },
  node_69: {
    coords: {
      lat: -1.31056278475947,
      lng: 36.81346089170656,
    },
    neighbors: {
      node_68: 20,
      node_70: 10,
      node_71: 10,
    },
  },
  node_70: {
    coords: {
      lat: -1.310639246190853,
      lng: 36.81351020762151,
    },
    neighbors: {
      node_69: 10,
      node_65: 24,
    },
  },
  node_71: {
    coords: {
      lat: -1.310585924034274,
      lng: 36.81337005727831,
    },
    neighbors: {
      node_69: 10,
      node_72: 37,
      node_79: 17,
    },
  },
  node_72: {
    coords: {
      lat: -1.31029030764725,
      lng: 36.81322515163509,
    },
    neighbors: {
      node_71: 37,
      node_17: 25,
    },
  },
  node_73: {
    coords: {
      lat: -1.310332734278199,
      lng: 36.81376880638845,
    },
    neighbors: {
      node_68: 24,
      node_24: 49,
      node_74: 12,
    },
  },
  node_74: {
    coords: {
      lat: -1.310398526691398,
      lng: 36.81385037726495,
    },
    neighbors: {
      node_73: 12,
      node_75: 18,
    },
  },
  node_75: {
    coords: {
      lat: -1.310405724107575,
      lng: 36.81400788796715,
    },
    neighbors: {
      node_74: 18,
      node_31: 28,
      node_35: 34,
    },
  },
  node_76: {
    coords: {
      lat: -1.309735180812187,
      lng: 36.81363473386591,
    },
    neighbors: {
      node_11: 13,
      node_77: 107,
    },
  },
  node_77: {
    coords: {
      lat: -1.309381093861715,
      lng: 36.81453333570385,
    },
    neighbors: {
      node_76: 107,
      node_39: 28,
    },
  },
  node_78: {
    coords: {
      lat: -1.310544695707317,
      lng: 36.81435804054107,
    },
    neighbors: {
      node_35: 16,
      node_43: 27,
    },
  },
  node_79: {
    coords: {
      lat: -1.310706926711657,
      lng: 36.81346545875334,
    },
    neighbors: {
      node_71: 17,
      node_29: 22,
    },
  },
  node_80: {
    coords: {
      lat: -1.311025199458391,
      lng: 36.81352781254127,
    },
    neighbors: {
      node_29: 15,
      node_81: 5,
    },
  },
  node_81: {
    coords: {
      lat: -1.311034119245623,
      lng: 36.81348144166414,
    },
    neighbors: {
      node_80: 5,
      node_26: 28,
    },
  },
};
