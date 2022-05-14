import DraggableElement from "@src/structures/DraggableElement";
import Vector2 from "@src/structures/Vector2";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

export default [
    new DraggableElement({
        name: 'item1',
        size: new Vector2(260, 74),
        // initialPosition: new Vector2(240, 659),
        initialPosition: new Vector2(180, 752),
        targetPosition: new Vector2(900, 272),
        metadata: {
            text: "Muskuļi",
            callout: new CalloutConfigStructure({
                position: new Vector2(900, 272),
                size: new Vector2(0, 108),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 2,
        }
    }),
    new DraggableElement({
        name: 'item2',
        size: new Vector2(320, 74),
        // initialPosition: new Vector2(180, 752),
        initialPosition: new Vector2(259, 851),
        targetPosition: new Vector2(605, 302),
        metadata: {
            text: "Barības vads",   //Zarnas
            callout: new CalloutConfigStructure({
                position: new Vector2(605, 302),
                size: new Vector2(0, 205),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 1,
        }
    }),
    // new DraggableElement({
    //     name: 'item3',
    //     size: new Vector2(382, 74),
    //     initialPosition: new Vector2(259, 851),
    //     targetPosition: new Vector2(616, 253),
    //     metadata: {
    //         text: "Muguras aorta",
    //         callout: new CalloutConfigStructure({
    //             position: new Vector2(616, 253),
    //             size: new Vector2(0, 223),
    //             type: CalloutTypeEnum.TOP_LEFT
    //         }),
    //         group: 2,
    //     }
    // }),
    new DraggableElement({
        name: 'item4',
        size: new Vector2(352, 74),
        initialPosition: new Vector2(259, 952),
        targetPosition: new Vector2(1040, 750),
        metadata: {
            text: "Anālā atvere",
            callout: new CalloutConfigStructure({
                position: new Vector2(1040, 612),
                size: new Vector2(0, 138),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 3,
        }
    }),
    new DraggableElement({
        name: 'item5',
        size: new Vector2(273, 74),
        initialPosition: new Vector2(613, 871),
        targetPosition: new Vector2(547, 706),
        metadata: {
            text: "Žaunas",
            callout: new CalloutConfigStructure({
                position: new Vector2(547, 518),
                size: new Vector2(0, 190),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 0,
        }
    }),
    new DraggableElement({
        name: 'item6',
        size: new Vector2(241, 74),
        initialPosition: new Vector2(586, 969),
        targetPosition: new Vector2(605, 771),
        metadata: {
            text: "Sirds",
            callout: new CalloutConfigStructure({
                position: new Vector2(605, 581),
                size: new Vector2(0, 189),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 4,
        }
    }),
    new DraggableElement({
        name: 'item7',
        size: new Vector2(259, 74),
        initialPosition: new Vector2(909, 871),
        targetPosition: new Vector2(758, 223),
        metadata: {
            text: "Nieres",
            callout: new CalloutConfigStructure({
                position: new Vector2(758, 223),
                size: new Vector2(0, 249),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 5,
        }
    }),
    new DraggableElement({
        name: 'item8',
        size: new Vector2(318, 74),
        initialPosition: new Vector2(897, 969),
        targetPosition: new Vector2(1028, 247),
        metadata: {
            text: "Urīnpūslis",
            callout: new CalloutConfigStructure({
                position: new Vector2(1028, 247),
                size: new Vector2(0, 309),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 3,
        }
    }),
    new DraggableElement({
        name: 'item9',
        size: new Vector2(433, 74),
        initialPosition: new Vector2(1287, 871),
        targetPosition: new Vector2(761, 761),
        metadata: {
            text: "Piloriskie piedēkļi",
            callout: new CalloutConfigStructure({
                position: new Vector2(761, 572),
                size: new Vector2(0, 189),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 2,
        }
    }),
    new DraggableElement({
        name: 'item10',
        size: new Vector2(423, 74),
        initialPosition: new Vector2(1300, 969),
        targetPosition: new Vector2(960, 721),
        metadata: {
            text: "Dzimumdziedzeri",
            callout: new CalloutConfigStructure({
                position: new Vector2(960, 579),
                size: new Vector2(0, 143),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 4,
        }
    }),
    new DraggableElement({
        name: 'item11',
        size: new Vector2(331, 74),
        initialPosition: new Vector2(1653, 655),
        targetPosition: new Vector2(683, 223),
        metadata: {
            text: "Žultspūslis",
            callout: new CalloutConfigStructure({
                position: new Vector2(683, 223),
                size: new Vector2(0, 337),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 3,
        }
    }),
    new DraggableElement({
        name: 'item12',
        size: new Vector2(257, 74),
        initialPosition: new Vector2(1744, 753),
        targetPosition: new Vector2(683, 770),
        metadata: {
            text: "Aknas",
            callout: new CalloutConfigStructure({
                position: new Vector2(683, 607),
                size: new Vector2(0, 166),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 3,
        }
    }),
    new DraggableElement({
        name: 'item13',
        size: new Vector2(322, 74),
        initialPosition: new Vector2(1696, 852),
        targetPosition: new Vector2(829, 237),
        metadata: {
            text: "Peldpūslis",
            callout: new CalloutConfigStructure({
                position: new Vector2(829, 237),
                size: new Vector2(0, 254),
                type: CalloutTypeEnum.TOP_LEFT
            }),
            group: 4,
        }
    }),
    new DraggableElement({
        name: 'item14',
        size: new Vector2(270, 74),
        initialPosition: new Vector2(1678, 952),
        targetPosition: new Vector2(810, 747),
        metadata: {
            text: "Kunģis",
            callout: new CalloutConfigStructure({
                position: new Vector2(810, 532),
                size: new Vector2(0, 218),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 5,
        }
    }),
    new DraggableElement({
        name: 'item15',
        size: new Vector2(219, 74),
        initialPosition: new Vector2(1473, 754),
        targetPosition: new Vector2(853, 726),
        metadata: {
            text: "Zarnas",      //Liesa
            callout: new CalloutConfigStructure({
                position: new Vector2(853, 618),
                size: new Vector2(0, 106),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
            group: 0,
        }
    }),
];
