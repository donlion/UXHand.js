# UXHand.js

Include UXHand.js and it will run automatically on touch-devices.

##Options
```javascript
window.UXHandOptions = {
  certainty: 0.2, //certainty about left or right hand
  destroyClasses: true, //not doing anything yet
  destroyData: true, //not doing anything yet
  root: document.body, //define the root of the listener - be carefull
  threshold: 50 //how big should our data collection be, before doing measurements?
};
```

##How
When UXHand is able to determine if the user is left or right handed (measured from swipes, taps, scrolls etc), it'll add either "lefthand" or "righthand" to the HTML-element
