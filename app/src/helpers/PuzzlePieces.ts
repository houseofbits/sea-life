import DraggableElement from "@src/structures/DraggableElement";
import Vector2 from "@src/structures/Vector2";
import {PuzzleLayersEnum} from "@src/helpers/PuzzleConstants";
import TextCalloutConfigStructure from "@src/structures/TextCalloutConfigStructure";
import {TextCalloutTypeEnum} from "@src/helpers/TextCalloutTypeEnum";

export default [
    new DraggableElement({
        name: 'item1',
        size: new Vector2(247, 179),
        initialPosition: new Vector2(830, 770),
        targetPosition: new Vector2(337, 422),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        initialScale: 0.6,
        image: 'Galva.png',
        mask: 'M174 1L1 78V102L15 147L116 180H171L225 148L248 105V40L215 1H174Z',
        calloutConfig: new TextCalloutConfigStructure({
            size: new Vector2(300, 400),
            position: new Vector2(500, 500),
            type: TextCalloutTypeEnum.BOTTOM_LEFT,
        })
    }),
    new DraggableElement({
        name: 'item2',
        size: new Vector2(967, 298),
        initialPosition: new Vector2(10, 720),
        targetPosition: new Vector2(472, 366),
        layer: PuzzleLayersEnum.LAYER1,
        initialScale: 0.5,
        finalLayer: PuzzleLayersEnum.LAYER0,
        image: 'Veders.png',
        mask: 'M65.5 198L1 225V247L150 277L264 299H499L690 259L834 203L967.953 175L968 95L709 40L415 1H226L109 26L49.5 51V63L86.5 95.5L95 147L65.5 198Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item3',
        size: new Vector2(216, 190),
        initialPosition: new Vector2(1470, 758),
        targetPosition: new Vector2(1366, 401),
        layer: PuzzleLayersEnum.LAYER1,
        finalLayer: PuzzleLayersEnum.LAYER1,
        initialScale: 0.7,
        image: 'Aste.png',
        mask: 'M80 37L1 64.0466V133L16 137L99 180L134 191H193L208 165L217 128V48L206 14L193 1H157L80 37Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item4',
        size: new Vector2(188, 90),
        initialPosition: new Vector2(710, 744),
        targetPosition: new Vector2(1170, 548),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Apaksa_Tresa_Spura.png',
        mask: 'M1 53L148 1H173L189 13V48L124 91H78L1 65V53Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item5',
        size: new Vector2(55, 54),
        initialPosition: new Vector2(642, 912),
        targetPosition: new Vector2(422, 465),
        layer: PuzzleLayersEnum.LAYER2,
        initialScale: 1,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Acs.png',
        mask: 'M17 1L1 19V42L14 55H41L56 44V15L42 1H17Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item6',
        size: new Vector2(198, 82),
        initialPosition: new Vector2(700, 906),
        targetPosition: new Vector2(689, 294),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Augsa_Pirma_Spura.png',
        mask: 'M7 69L1 75.5V83H199V56L171 22L139.5 6L124 1H94L59.5 23L31 51.5L7 69Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item7',
        size: new Vector2(211, 104),
        initialPosition: new Vector2(1017, 895),
        targetPosition: new Vector2(961, 611),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Apaksa_Videja_Spura.png',
        mask: 'M10.5 36L1 39V51L38 75.5L69 98L83 105H116L138.5 89.5L170 59.5L205.5 44L212 36V19L202.5 9L189 1H169L98.5 18L10.5 36Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item8',
        size: new Vector2(146, 85),
        initialPosition: new Vector2(1073, 746),
        targetPosition: new Vector2(652, 497),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Videja_Spura.png',
        mask: 'M8.5 25L1 26V64L17 77L33 86H78L94 78L108.5 65L126.5 55L147 32V7L135 1H97L66 8L25.5 19L8.5 25Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item9',
        size: new Vector2(165, 126),
        initialPosition: new Vector2(1181, 843),
        targetPosition: new Vector2(581, 623),
        layer: PuzzleLayersEnum.LAYER2,
        initialScale: 1,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Apakseja_Pirma_Spura_.png',
        mask: 'M1 1V9L18 18L81 81L112 106L144 127H166V116L156 107V88.5L117 49L101 18.5L82 9L52 1H1Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item10',
        size: new Vector2(174, 95),
        initialPosition: new Vector2(1300, 728),
        targetPosition: new Vector2(1168, 357),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Augsa_Tresa_Spura.png',
        mask: 'M13 43L1 53V61L20 67L46 69L124.5 88L147 96H167L175 84V67L169 54L151 33L127 8.5L114 1H84L13 43Z',
        calloutConfig: null
    }),
    new DraggableElement({
        name: 'item11',
        size: new Vector2(216, 92),
        initialPosition: new Vector2(1367, 893),
        targetPosition: new Vector2(918, 317),
        initialScale: 1,
        layer: PuzzleLayersEnum.LAYER2,
        finalLayer: PuzzleLayersEnum.LAYER2,
        image: 'Augsa_Videja_Spura.png',
        mask: 'M37 25L1 55V66L43 72L109 86L187 93H217V83L178 43L146 22L123 8L103 1H73L37 25Z',
        calloutConfig: null
    }),
];