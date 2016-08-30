import { UXHand } from './UXHand';

requestAnimationFrame(() => {
    console.log(new UXHand({root: document.body}));
});