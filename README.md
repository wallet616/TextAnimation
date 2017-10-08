# TextAnimation

A JavaScript library that allows you to easily center vertically html elements.

### Prerequisites

The library does not require jQuery.

### Installing

`Add` downloaded version of `TextAnimation` library.

```
<script src="TextAnimation.js"></script>
```

Everything is ready.

### Usage

The `constructor` doesnt not accept any elements, all options are provided in `.init()` method.

Basic call can be achieved by typing in a `<script>` section or `.js` file:

```
var example_1 = new TextAnimation();
example_1.init({
    // Elements ID.
    id: "example_1",

    // Array of messages.
    messages: ["Message 1", "Another message"]
});
```

However, it is strongly recommended to customise all the available options.

This example shows all avaliable options:

```
var example_2 = new TextAnimation();
example_2.init({
    // Elements ID.
    id: "example_2",
        
    // Array of messages.
    messages: ["Sample text", "Another sample"],

    // Dealy in [ms] between changing the message.
    dealy: 600,

    // First message, display only at the beginning.
    start_message: "Start message",

    // Dealy between single character change.
    change_time_per_char: 4,

    // Maximal and minimal attempts that will be taken to fit character for its place.
    attemps_max: 6,
    attemps_min: 3,

    // Allows to skip first dealy, after .init() method is called.
    force_start: false
});
```

Examples of method usage: 

```
// Stops playing the animation.
example_3.stop();

// Starts playing the animation.
example_3.start();


// Change the messages to be displayed, with possible arguments:
// 1. new_messages - array - array of messages.
// 2. force_start - bolean (default: flase) - force new messages to be displayed instantly.
example_3.set_messages(["Yes or no", "No, I am not sure"], false);

// Stop playing animation and remove the element from DOM.
example_3.remove();
```

Since the content of element is pure `text node` there is no need to assign `reload` method on viewport size change.

**For more examples of custiomisation options and usage of methods see the [example.html](example.html) file.**

##### Options description

| Name                     	| Type    	| Accepted values            	| Default     	| Description                                                                                                                     	|
|--------------------------	|---------	|----------------------------	|-------------	|---------------------------------------------------------------------------------------------------------------------------------	|
| **id**                   	| String  	| **id of existing element** 	| undefined   	| ID of element that will be used to display text.                                                                                	|
| **messages**             	| Array   	| **array of Strings**       	| empty array 	| Array of messages that will be displayed cyclically. <br>Array cannot be empty.                                                 	|
| **dealy**                	| Number  	| **[0, inf.)**              	| 700         	| Dealy in [ms] between changing the message.                                                                                     	|
| **start_message**        	| String  	| **string**                 	| undefined   	| First message, display only at the beginning. <br>It it not defined, animation will start with the first message of `messages`. 	|
| **change_time_per_char** 	| Number  	| **[0, inf.)**              	| 9           	| Dealy between single character change.                                                                                          	|
| **attemps_max**          	| Number  	| **[0, inf.)**              	| 5           	| Maximal attempts that will be taken to fit character for its place.                                                             	|
| **attemps_min**          	| Number  	| **[0, inf.)**              	| 3           	| Minimal attempts that will be taken to fit character for its place.                                                             	|
| **force_start**          	| Boolean 	| **true** <br>**false**     	| false       	| Allows to skip first `dealy`, after `.init()` method is called.             

##### Methods description

| Name             	| Arguments description                                                                    	| Description                                                     	|
|------------------	|------------------------------------------------------------------------------------------	|-----------------------------------------------------------------	|
| **stop**         	| No arguments                                                                             	| Stops playing the animation.                                    	|
| **start**        	| No arguments                                                                             	| Starts playing the animation.                                   	|
| **set_messages** 	| 1. **new_messages** - Array of strings <br> 2. **force_start** - Bolean (default: false) 	| Change the messages to be displayed, with possible arguments.   	|
| **remove**       	| No arguments                                                                             	| Stop playing animation and remove the element from DOM.         	|

### Known issues

* None.

#### Versioning and changelog

* v. 1.0
    - Creation of project and developing basic functions. 
    - Added basic options and methods support. 

#### Authors

* **Piotr Bartela** - *Creator* - [wallet616](https://github.com/wallet616)

#### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.