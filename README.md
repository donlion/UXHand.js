# UXHand.js
UXHand.js is a clever, ultra-light (~5kb) native JS-plugin for measuring your users touch-behaviour. Based on data saved locally, it'll determine, whether your user is more left- or right-handed.
UXHand.js _does not_ track user by default. Data is only stored in localStorage as point, not coordinates.

##Options
```javascript
window.UXHandOptions = {
  certainty: 0.2,
  /* certainty about left or right hand */
  root: document.body,
  /* define the root of the listener - be carefull */
  threshold: 50,
  /* how big should our data collection be, before doing measurements? */
  sessionThreshold: 3
  /* the count of swipes to be done before we can define left or right hand usage */
};
```

##How
###Basic classes
When UXHand is able to determine if the user is left or right handed (measured from swipes, taps, scrolls etc), it'll add either ```lefthand``` or ```righthand``` to the HTML-element

###Temporary classes
UXHand strives to meet the user expectations and adopt fluid to the users interactions. Therefore UXHand also carries temporary-classes. These classes are fired after ```window.UXHandOptions.sessionThreshold```events of the same kind. Say the user is right handed but temporary uses your website with his or hers left hand. After 3 scrolls we'll know what hand, they're probably using at the moment and we can therefore move simple and more fluid-designed elements around.
If the user uses left hand ```templeft``` will be added to HTML's classes.
Same goes with the right as: ```tempright```

##Usage
Run `bower install uxhand.js` to grap the latest or simply download it from the build-folder.
When UXHand.js is included through a script-tag to your DOM, it'll run automatically.

##Clearing
`UXHand.destroy()` will clear all recorded data saved to localStorage

#Demo
Visit [donlion.github.io/UXHand.js](http://donlion.github.io/UXHand.js) from a touch-device and start scrolling. The threshold is lowered to 10 for test purpose only.

##When is this useful?
It have always been possible through a `prompt()` or `confirm()` to ask the user, if they're left or right handed.
From our question we can smartly build/reorder our design according to either left or right hand.

Now. Say our user is right-handed, so of course he answers "Yes" to the question "Are you right handed?". But if the user visits our site more during coffee-breaks or cigarette-breaks, the user will (probably) use the opposite hand more. In this way the UXHand.js plugin comes in useful. Without prompting the user, we can determine, based on saved behavioural data, whether our user is left- or right-handed on our specific site.

Of course the metrics changes all the time, and by the time our user stops drinking coffee or smoking, UXHand will gently detect the opposite hand.
