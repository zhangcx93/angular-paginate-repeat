# angular-paginate-repeat

This is simplified ng-repeat along with paginate, use it like ng-repeat, and it'll add paginate for you.

## Install

Install with `bower`:

```shell
bower angular-paginate-repeat
```

## Module
```js
angular.module('yourApp', ['paginateRepeat'])
```

## Directive

```html
<div pg-repeat="item in items" limit=5>
  {{ item.name }} 
</div>

```

## Attributes

###pg-repeat:
item in items  
or  
whatever in whatevers
	
- *Note*: Don't add any filters here, filter your data first, everything will update automatically. Things get frustrated to use filter directly with pagniate.

###limit:  
item numbers per page  
defulat = 10

###max:
Max pages display, if more than this, paginate will look like 1 2 3 ... 60 61 62

	
## Contribute
Contact me at zhangcx93@gmail.com, feel free to report bugs and functions you need!


## License

The MIT License

Copyright (c) 2014 zhangcx93

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
