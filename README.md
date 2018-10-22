*_This project is no longer being maintained: see [JSX](https://reactjs.org/docs/introducing-jsx.html) as an alternative_
# HTMLparser
Turns an HTML string into an analogous JS Object
## Usage
To get HTML as an Object
``` js
foo = HTML2Obj(string);
```
To turn the object into a DOM element
``` js
bar = Obj2HTML(foo);
```
**Note**: Obj2HTML takes an additional argument of a DOM element. It will append to this element.
``` js
//appends foo to document.body
bar = Obj2HTML(foo,document.body);
```
