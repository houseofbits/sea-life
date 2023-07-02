import DraggableElement from "@src/structures/DraggableElement";
import Vector2 from "@src/structures/Vector2";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

export default [
    new DraggableElement({
        name: 'item1',
        size: new Vector2(246, 74),
        initialPosition: new Vector2(598, 969),
        targetPosition: new Vector2(281, 305),
        metadata: {
            text: "puzzle.outer.item1",
            callout: new CalloutConfigStructure({
                position: new Vector2(281, 305),
                size: new Vector2(0, 190),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item2',
        size: new Vector2(350, 74),
        initialPosition: new Vector2(269, 842),
        targetPosition: new Vector2(735, 696),
        metadata: {
            text: "puzzle.outer.item2",
            callout: new CalloutConfigStructure({
                position: new Vector2(735, 508),
                size: new Vector2(0, 190),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item3',
        size: new Vector2(365, 74),
        initialPosition: new Vector2(253, 952),
        targetPosition: new Vector2(603, 771),
        metadata: {
            text: "puzzle.outer.item3",
            callout: new CalloutConfigStructure({
                position: new Vector2(603, 654),
                size: new Vector2(0, 118),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item4',
        size: new Vector2(345, 74),
        initialPosition: new Vector2(665, 871),
        targetPosition: new Vector2(1291, 707),
        metadata: {
            text: "puzzle.outer.item4",
            callout: new CalloutConfigStructure({
                position: new Vector2(1291, 598),
                size: new Vector2(0, 109),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item5',
        size: new Vector2(322, 74),
        initialPosition: new Vector2(1030, 871),
        targetPosition: new Vector2(1175, 292),
        metadata: {
            text: "puzzle.outer.item5",
            callout: new CalloutConfigStructure({
                position: new Vector2(1175, 292),
                size: new Vector2(0, 189),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item6',
        size: new Vector2(338, 74),
        initialPosition: new Vector2(930, 969),
        targetPosition: new Vector2(546, 303),
        metadata: {
            text: "puzzle.outer.item6",
            callout: new CalloutConfigStructure({
                position: new Vector2(546, 303),
                size: new Vector2(0, 186),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item7',
        size: new Vector2(235, 74),
        initialPosition: new Vector2(1349, 871),
        targetPosition: new Vector2(355, 722),
        metadata: {
            text: "puzzle.outer.item7",
            callout: new CalloutConfigStructure({
                position: new Vector2(355, 534),
                size: new Vector2(0, 188),
                type: CalloutTypeEnum.BOTTOM_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item8',
        size: new Vector2(391, 74),
        initialPosition: new Vector2(1335, 969),
        targetPosition: new Vector2(1055, 249),
        metadata: {
            text: "puzzle.outer.item8",
            callout: new CalloutConfigStructure({
                position: new Vector2(1055, 249),
                size: new Vector2(0, 91),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item9',
        size: new Vector2(345, 74),
        initialPosition: new Vector2(1680, 842),
        targetPosition: new Vector2(1617, 252),
        metadata: {
            text: "puzzle.outer.item9",
            callout: new CalloutConfigStructure({
                position: new Vector2(1617, 252),
                size: new Vector2(0, 189),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),
    new DraggableElement({
        name: 'item10',
        size: new Vector2(219, 74),
        initialPosition: new Vector2(1680, 949),
        targetPosition: new Vector2(388, 279),
        metadata: {
            text: "puzzle.outer.item10",
            callout: new CalloutConfigStructure({
                position: new Vector2(388, 279),
                size: new Vector2(0, 189),
                type: CalloutTypeEnum.TOP_LEFT
            }),
        }
    }),

];