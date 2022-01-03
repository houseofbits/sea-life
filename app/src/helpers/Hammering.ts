
export default (swipeLeftCallback: CallableFunction, swipeRightCallback: CallableFunction, selectItemCallback: CallableFunction) => {

    const Hammer = require('hammerjs');

    const elements = document.querySelector('.detail-list');
    const manager = new Hammer.Manager(elements);

    manager.add(new Hammer.Swipe());
    manager.add(new Hammer.Press());
    manager.add(new Hammer.Tap());

    manager.on('swipe', function (e: any) {
        if (e.offsetDirection === 4) {
            swipeLeftCallback();
        }
        if (e.offsetDirection === 2) {
            swipeRightCallback();
        }
    });

    manager.on('press', function (e: any) {
        const id = e.srcEvent?.target?.getAttribute('data-item-id') || null;
        if (id !== null) {
            selectItemCallback(id);
        }
    });

    manager.on('tap', function (e: any) {
        const id = e.srcEvent?.target?.getAttribute('data-item-id') || null;
        if (id !== null) {
            selectItemCallback(id);
        }
    });

}