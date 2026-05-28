document.addEventListener('DOMContentLoaded', () => {

  const state = {
    user: {
      name: '',
      school: '',
      department: '',
      email: '',
      address: '',
      avatar: ''
    },
    quiz: {
      subject: 'all', 
      totalQuestions: 25, 
      questions: [],
      answers: [], 
      isUnlocked: false,
      isSubmitted: false,
      startTime: null,
      endTime: null
    },
    timer: {
      duration: 1080, 
      timeLeft: 1080,
      intervalId: null
    }
  };

  
  initParticles();

  function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 25;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
        }
      }
      draw() {
        const color = document.body.classList.contains('dark-mode') ? '#3B82F6' : '#2563EB';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }


  const staticQuestions = [
    {
      category: 'html',
      q: 'What is the primary semantic purpose of the <main> HTML element?',
      options: ['To contain site-wide navigation links', 'To define the dominant, core content area of a document', 'To display site branding information', 'To contain auxiliary sidebar or advertising slots'],
      correct: 1
    },
    {
      category: 'html',
      q: 'Which HTML5 element is designed to display self-contained content like images, code snippets, or diagrams?',
      options: ['<section>', '<article>', '<figure>', '<aside>'],
      correct: 2
    },
    {
      category: 'html',
      q: 'Which tag is used to embed an independent HTML document inside the current document?',
      options: ['<embed>', '<object>', '<iframe>', '<canvas>'],
      correct: 2
    },
    {
      category: 'html',
      q: 'What does the target="_blank" attribute on a hyperlinked anchor tag accomplish?',
      options: ['Opens the link in the same window frame', 'Opens the link in a new tab or browser window', 'Downloads the linked resource directly', 'Creates a bookmark in active memory'],
      correct: 1
    },
    {
      category: 'html',
      q: 'Which HTML5 form input type provides a slider control to select a numeric value within a defined range?',
      options: ['number', 'range', 'slider', 'progress'],
      correct: 1
    },
    {
      category: 'html',
      q: 'What is the primary purpose of the "alt" attribute on an <img> tag?',
      options: ['Specifies alternative dimension values', 'Provides a descriptive text fallback for screen readers and SEO', 'Defines the alignment of the graphic', 'Triggers a tooltip hover display'],
      correct: 1
    },
    {
      category: 'html',
      q: 'Which HTML element represents an ordered (numbered) list of items?',
      options: ['<ul>', '<li>', '<ol>', '<list>'],
      correct: 2
    },
    {
      category: 'html',
      q: 'Which HTML tag is used to define a cell in a table header?',
      options: ['<td>', '<th>', '<tr>', '<thead>'],
      correct: 1
    },
    {
      category: 'html',
      q: 'What is the correct HTML element for creating a standard line break?',
      options: ['<break>', '<lb>', '<br>', '<hr>'],
      correct: 2
    },
    {
      category: 'html',
      q: 'Which semantic element represents introductory content, typically containing headers, logo, or author information?',
      options: ['<section>', '<header>', '<nav>', '<intro>'],
      correct: 1
    },
    {
      category: 'html',
      q: 'Which HTML5 element represents content that is tangentially related to the content around it, like sidebars?',
      options: ['<aside>', '<section>', '<article>', '<footer>'],
      correct: 0
    },
    {
      category: 'html',
      q: 'What does the "download" attribute in a hyperlinked anchor (<a>) tag trigger?',
      options: ['Instructs the browser to download the target URL instead of navigating to it', 'Forces the browser to scan for malware', 'Streams the media payload in binary chunks', 'Encrypts the transfer protocol of the target resource'],
      correct: 0
    },
    {
      category: 'html',
      q: 'Which HTML5 tag specifies a pre-defined set of options for an <input> element using an autocomplete drop-down?',
      options: ['<select>', '<datalist>', '<option>', '<choices>'],
      correct: 1
    },
    {
      category: 'html',
      q: 'Which HTML5 attribute is added to <script> elements to execute the script asynchronously without blocking DOM parsing?',
      options: ['async', 'defer', 'wait', 'onload'],
      correct: 0
    },
    {
      category: 'html',
      q: 'What is the purpose of the HTML5 <noscript> tag?',
      options: ['Specifies that the browser does not support security variables', 'Defines an alternate content block for users who have disabled JavaScript', 'Compresses local cookies', 'Stops loading styling elements'],
      correct: 1
    },

    // --- CSS ---
    {
      category: 'css',
      q: 'What is the primary difference between the margin and padding properties?',
      options: ['Margin adds space inside the border; padding adds space outside', 'Margin adds space outside the border; padding adds space inside', 'Margin applies to inline elements only; padding applies to blocks', 'Margin changes element colors; padding shifts text positions'],
      correct: 1
    },
    {
      category: 'css',
      q: 'Which CSS selector targets all elements that are direct children of a specified parent element?',
      options: ['div p (descendant selector)', 'div > p (child selector)', 'div + p (adjacent sibling)', 'div ~ p (general sibling)'],
      correct: 1
    },
    {
      category: 'css',
      q: 'Which CSS property specifies the stack order of positioned elements, indicating which layers display on top?',
      options: ['z-index', 'display', 'position', 'float'],
      correct: 0
    },
    {
      category: 'css',
      q: 'In CSS Flexbox, which property controls the alignment of flex items along the main axis?',
      options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
      correct: 1
    },
    {
      category: 'css',
      q: 'What does the box-sizing: border-box property accomplish?',
      options: ['Adds border dimensions outside the element width', 'Includes padding and border dimensions within the element\'s declared width and height', 'Sets margins inside the border box', 'Removes padding outlines completely'],
      correct: 1
    },
    {
      category: 'css',
      q: 'Which CSS length unit is relative to the font-size of the root element (typically the <html> tag)?',
      options: ['em', 'rem', 'px', 'vh'],
      correct: 1
    },
    {
      category: 'css',
      q: 'What is the default value of the "position" property in standard CSS?',
      options: ['relative', 'absolute', 'static', 'fixed'],
      correct: 2
    },
    {
      category: 'css',
      q: 'Which CSS property is used to create smooth transitions between property value changes over time?',
      options: ['animation', 'transition', 'transform', 'duration'],
      correct: 1
    },
    {
      category: 'css',
      q: 'In CSS Grid, which property is used to define the vertical columns of a grid container?',
      options: ['grid-template-columns', 'grid-column-gap', 'grid-auto-flow', 'grid-columns-count'],
      correct: 0
    },
    {
      category: 'css',
      q: 'Which CSS rule is used to define keyframes for animations?',
      options: ['@media', '@keyframes', '@keyframes-rule', '@animate'],
      correct: 1
    },
    {
      category: 'css',
      q: 'What is the specificity score of a single ID selector in CSS rules?',
      options: ['1', '10', '100', '1000'],
      correct: 2
    },
    {
      category: 'css',
      q: 'Which CSS function allows you to perform basic mathematical operations to calculate property values dynamically?',
      options: ['calc()', 'math()', 'var()', 'eval()'],
      correct: 0
    },
    {
      category: 'css',
      q: 'Which media query feature detects if the user\'s system is configured to prefer a dark color scheme?',
      options: ['(prefers-color-scheme: dark)', '(color-scheme: dark)', '(theme: dark)', '(dark-mode: true)'],
      correct: 0
    },
    {
      category: 'css',
      q: 'In CSS Flexbox, which property determines whether flex items wrap onto multiple lines if space is restricted?',
      options: ['flex-wrap', 'flex-direction', 'flex-flow', 'flex-shrink'],
      correct: 0
    },
    {
      category: 'css',
      q: 'Which CSS property controls the opacity of an element, including its child elements?',
      options: ['opacity', 'rgba-opacity', 'filter-opacity', 'visibility'],
      correct: 0
    },

    // --- JAVA ---
    {
      category: 'java',
      q: 'In Java, what is a key difference between an interface and an abstract class?',
      options: ['Abstract classes cannot contain methods; interfaces can', 'Interfaces cannot have instance variables or constructors; abstract classes can have both', 'Interfaces support single inheritance; abstract classes support multiple', 'Abstract classes are final; interfaces are dynamic'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which Java memory area is allocated for garbage collection of dynamic object instances?',
      options: ['Stack Memory', 'Heap Memory', 'JVM Register Area', 'Method Area'],
      correct: 1
    },
    {
      category: 'java',
      q: 'What is the purpose of the finally block in a Java try-catch statement?',
      options: ['To catch uncaught runtime exceptions', 'To execute code regardless of whether an exception is thrown or caught', 'To terminate execution of the JVM thread', 'To retry the block transactionally'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which keyword is used in Java to define a subclass that inherits properties from a parent class?',
      options: ['implements', 'extends', 'inherits', 'subclass'],
      correct: 1
    },
    {
      category: 'java',
      q: 'What is the default value of an uninitialized boolean instance variable in a Java class?',
      options: ['true', 'false', 'null', '0'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which Collection framework class provides a storage structure based on a hash table with no duplicate elements?',
      options: ['ArrayList', 'HashSet', 'HashMap', 'LinkedList'],
      correct: 1
    },
    {
      category: 'java',
      q: 'What is the primary function of the JVM (Java Virtual Machine)?',
      options: ['Compiling Java source code into bytecode (.class)', 'Executing compiled Java bytecode (.class) on physical hardware', 'Managing relational databases', 'Creating the UI layouts'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which Java access modifier restricts visibility strictly to the declaring class itself?',
      options: ['public', 'protected', 'private', 'default (package)'],
      correct: 2
    },
    {
      category: 'java',
      q: 'What is the main advantage of Generics in Java?',
      options: ['Faster bytecode compilation speed', 'Compile-time type safety and elimination of explicit typecasting', 'Support for multiple inheritance', 'Dynamic polymorphism at runtime'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which class is the ultimate superclass of all other classes in the Java programming language?',
      options: ['Object', 'Class', 'System', 'String'],
      correct: 0
    },
    {
      category: 'java',
      q: 'What does the static keyword represent when applied to a method in Java?',
      options: ['The method\'s output is immutable', 'The method belongs to the class itself rather than instances of the class', 'The method executes asynchronously', 'The method cannot be overloaded'],
      correct: 1
    },
    {
      category: 'java',
      q: 'Which exception class in Java is thrown when an application attempts to use null in a case where an object is required?',
      options: ['NullPointerException', 'IllegalArgumentException', 'ArrayIndexOutOfBoundsException', 'ClassCastException'],
      correct: 0
    },
    {
      category: 'java',
      q: 'What is the purpose of the volatile keyword in multi-threaded Java development?',
      options: ['Indicates that a variable is thread-locked', 'Ensures that changes to a variable are immediately visible to other threads from main memory', 'Compiles the variable to native machine code', 'Prevents class compilation errors'],
      correct: 1
    },
    {
      category: 'java',
      q: 'In Java, what is method overloading?',
      options: ['Defining methods with identical names but different parameter lists in the same class', 'Overriding a parent class method in a subclass', 'Adding too many annotations to a method declaration', 'Creating a method that returns multiple parameters'],
      correct: 0
    },
    {
      category: 'java',
      q: 'Which Java 8 feature provides a pipeline of functions to filter, map, and collect data structures?',
      options: ['Lambda Expressions', 'Stream API', 'Optional Class', 'Functional Interfaces'],
      correct: 1
    },

    // --- JAVASCRIPT ---
    {
      category: 'javascript',
      q: 'What is a closure in JavaScript?',
      options: ['A function that blocks scope leaks', 'A function combined with its lexical environment, allowing it to remember variables from outer scopes', 'An event handler loop terminator', 'A strict mode file compression tool'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'Which JavaScript keyword declares a block-scoped variable that cannot be reassigned?',
      options: ['var', 'let', 'const', 'static'],
      correct: 2
    },
    {
      category: 'javascript',
      q: 'What does the double equals ("==") comparison operator do compared to the triple equals ("===")?',
      options: ['Double equals compares value and type; triple equals compares value only', 'Double equals compares value only, performing type coercion; triple equals compares both value and type', 'Double equals is faster; triple equals is secure', 'Double equals is deprecated; triple equals is optional'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'In JavaScript, what primary mechanism handles asynchronous events and callback processing queues?',
      options: ['The Event Loop', 'The Thread Manager', 'The Garbage Collector', 'The Prototype Chain'],
      correct: 0
    },
    {
      category: 'javascript',
      q: 'What is the result of the expression typeof null in standard JavaScript?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correct: 2
    },
    {
      category: 'javascript',
      q: 'Which method is used to parse a JSON string into a standard JavaScript object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.objectify()', 'JSON.decode()'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'What is the purpose of the "use strict" directive in JavaScript?',
      options: ['Forces the browser to execute in sandboxed mode', 'Enforces strict syntactical rules, catching common silent errors and preventing unsafe actions', 'Speeds up mathematical calculations', 'Restricts variable names to uppercase'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'Which Promise method is executed only when the promise is rejected?',
      options: ['then()', 'catch()', 'finally()', 'resolve()'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'What is prototype inheritance in JavaScript?',
      options: ['Objects inherit properties and methods directly from prototype objects linked via a hidden chain', 'Classes are copied physically into active memory buffers', 'Variables are shared globally via global states', 'Code is compiled dynamically into native binaries'],
      correct: 0
    },
    {
      category: 'javascript',
      q: 'Which array method creates a new array filled with all elements that pass a test provided by a function?',
      options: ['map()', 'filter()', 'reduce()', 'forEach()'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'What is the difference between "undefined" and "null" in JavaScript?',
      options: ['"undefined" represents an unassigned variable; "null" represents an intentional absence of value', '"undefined" is an object; "null" is a function type', '"undefined" is faster than "null"', 'There is no difference; they are completely identical'],
      correct: 0
    },
    {
      category: 'javascript',
      q: 'What is the purpose of the "async" keyword when prefixed to a function?',
      options: ['Executes the function in a background worker thread', 'Causes the function to always return a Promise, allowing the use of "await" within it', 'Speeds up DOM rendering speeds', 'Locks global variables inside the function scope'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'Which DOM method is used to retrieve an element by its unique "id" attribute?',
      options: ['document.getElementsByClassName()', 'document.querySelector()', 'document.getElementById()', 'document.findId()'],
      correct: 2
    },
    {
      category: 'javascript',
      q: 'What will console.log(1 + "2") output in JavaScript?',
      options: ['3', '"12"', 'NaN', 'TypeError'],
      correct: 1
    },
    {
      category: 'javascript',
      q: 'Which function is used to schedule a block of code to run after a specified duration in milliseconds?',
      options: ['setInterval()', 'setTimeout()', 'delay()', 'sleep()'],
      correct: 1
    },

    // --- WEB DESIGN ---
    {
      category: 'webdesign',
      q: 'What does "responsive web design" refer to?',
      options: ['Creating web layouts that load faster on client browsers', 'Designing pages that adapt fluidly to different screen dimensions and devices using flexible grids and media queries', 'Coding pages that respond to voice controls', 'Building pages that dynamically reload without server requests'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'In web accessibility, what does the abbreviation "WCAG" represent?',
      options: ['Web Compatibility Advisory Group', 'Web Content Accessibility Guidelines', 'World Cyber Alliance Group', 'Web Components Advanced Guild'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'What is the primary function of wireframes during the web design lifecycle?',
      options: ['To host production databases', 'To map structural layout and visual hierarchies without detailed design styling', 'To bundle CSS stylesheets', 'To perform security penetration testing'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'Which design system token defines consistent, reusable color, typography, or spacing values?',
      options: ['Design Tokens', 'CSS Selectors', 'HTML Outlines', 'JavaScript Variables'],
      correct: 0
    },
    {
      category: 'webdesign',
      q: 'What is contrast ratio in UX design, and why is it important?',
      options: ['The ratio of images to text on a screen; improves visual interest', 'The luminance difference between text and its background; critical for readability and accessibility', 'The compression ratio of graphics; increases loading speed', 'The proportion of padding to margins; centers text blocks'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'Which viewport meta tag setting prevents mobile browsers from rendering at standard desktop dimensions?',
      options: ['width=device-width, initial-scale=1.0', 'viewport=fullscreen', 'scale-to-fit=true', 'user-scalable=no'],
      correct: 0
    },
    {
      category: 'webdesign',
      q: 'What is the concept of "Mobile-First Design"?',
      options: ['Designing the mobile application version before coding the website', 'Designing for the smallest screen size first and then scaling up for larger screens in style sheets', 'Restricting the web application to run only on mobile devices', 'Developing for mobile devices using native Android files'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'What does SEO stand for in web engineering?',
      options: ['System Error Optimization', 'Search Engine Optimization', 'Secure Encrypted Operations', 'Standard E-commerce Options'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'What is the standard grid baseline system typically used in UI layouts for vertical rhythm?',
      options: ['8px Grid System', '10px Grid System', '5px Grid System', '12px Grid System'],
      correct: 0
    },
    {
      category: 'webdesign',
      q: 'In web typography, what is "kerning"?',
      options: ['The vertical space between lines of text', 'The adjustment of space between individual characters', 'The selection of font weights', 'The shadow offset applied to headings'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'Which image format is modernly recommended for web graphics due to superior compression and transparency support?',
      options: ['JPEG', 'BMP', 'WebP', 'TIFF'],
      correct: 2
    },
    {
      category: 'webdesign',
      q: 'What is the purpose of a CTA in web layout design?',
      options: ['Control Thread Access; handles browser API events', 'Call to Action; a prominent interactive element driving user conversion', 'Consistent Text Alignment', 'Centralized Theme Controller'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'What does the design term "Whitespace" represent?',
      options: ['Blank pages that have failed to load styling scripts', 'The intentional empty space surrounding elements in a layout, enhancing readability and focus', 'CSS background coloring rules', 'White font styles in dark mode themes'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'What is the primary objective of UX (User Experience) design?',
      options: ['Writing optimized server code', 'Creating products that provide meaningful, intuitive, and relevant experiences to users', 'Compiling styles faster', 'Enforcing security access protocols'],
      correct: 1
    },
    {
      category: 'webdesign',
      q: 'Which HTML attribute should be included in an anchor tag linked to external sites to prevent reverse tabnabbing security vulnerabilities?',
      options: ['rel="noopener noreferrer"', 'target="_blank"', 'security="external"', 'type="secure"'],
      correct: 0
    },

    // --- C PROGRAMMING ---
    {
      category: 'c',
      q: 'Which function is used to dynamically allocate memory in C?',
      options: ['alloc()', 'malloc()', 'new()', 'create()'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What is the size of an int data type in a typical 32-bit C compiler?',
      options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
      correct: 2
    },
    {
      category: 'c',
      q: 'Which header file is required to use printf() and scanf() functions in C?',
      options: ['<stdlib.h>', '<string.h>', '<stdio.h>', '<conio.h>'],
      correct: 2
    },
    {
      category: 'c',
      q: 'What does the free() function do in C?',
      options: ['Frees the CPU from running the program', 'Deallocates previously allocated memory from the heap', 'Deletes a file from the system', 'Clears the console screen'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What is a pointer in C?',
      options: ['A variable that stores the address of another variable in memory', 'A function that points to the main method', 'A keyword to define constants', 'A data structure for sorting elements'],
      correct: 0
    },
    {
      category: 'c',
      q: 'Which keyword is used to define a constant in C?',
      options: ['constant', 'define', 'const', 'static'],
      correct: 2
    },
    {
      category: 'c',
      q: 'What is the correct syntax to declare a structure in C?',
      options: ['structure name { };', 'struct name { };', 'class name { };', 'type name { };'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What will be the output of printf("%d", sizeof(char)) in C?',
      options: ['0', '1', '2', '4'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What is the difference between calloc() and malloc() in C?',
      options: ['calloc() initializes allocated memory to zero; malloc() does not initialize', 'malloc() allocates memory for arrays; calloc() does not', 'calloc() is faster than malloc()', 'There is no difference between them'],
      correct: 0
    },
    {
      category: 'c',
      q: 'What does the & operator do when used with a variable in C?',
      options: ['Performs bitwise AND operation', 'Returns the memory address of the variable', 'Multiplies the variable by 2', 'Declares the variable as global'],
      correct: 1
    },
    {
      category: 'c',
      q: 'Which loop construct in C checks the condition after executing the loop body at least once?',
      options: ['for loop', 'while loop', 'do-while loop', 'foreach loop'],
      correct: 2
    },
    {
      category: 'c',
      q: 'What is the purpose of the typedef keyword in C?',
      options: ['To define a new variable', 'To create an alias name for an existing data type', 'To declare a function prototype', 'To include external libraries'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What is a segmentation fault in C?',
      options: ['A compiler warning about missing semicolons', 'A runtime error caused by accessing memory that the program does not have permission to access', 'A syntax error in array declaration', 'A linker error due to missing library files'],
      correct: 1
    },
    {
      category: 'c',
      q: 'What does the static keyword mean when applied to a local variable inside a function in C?',
      options: ['The variable becomes global', 'The variable retains its value between function calls', 'The variable is stored in the stack', 'The variable can only store integers'],
      correct: 1
    },
    {
      category: 'c',
      q: 'Which format specifier is used to print a float value in C?',
      options: ['%d', '%s', '%f', '%c'],
      correct: 2
    },

    // --- C++ PROGRAMMING ---
    {
      category: 'cpp',
      q: 'What is the primary difference between C and C++?',
      options: ['C++ does not support functions', 'C++ supports Object-Oriented Programming (OOP) while C is a procedural language', 'C is faster than C++ in all scenarios', 'C++ cannot use pointers'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'Which operator is used for dynamic memory allocation in C++?',
      options: ['malloc()', 'alloc()', 'new', 'create()'],
      correct: 2
    },
    {
      category: 'cpp',
      q: 'What is a constructor in C++?',
      options: ['A function that destroys objects', 'A special member function that is automatically called when an object is created to initialize it', 'A function that converts data types', 'A loop structure for iterating arrays'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is the purpose of the virtual keyword in C++?',
      options: ['To create static variables', 'To enable runtime polymorphism by allowing derived classes to override base class methods', 'To declare private member functions', 'To allocate memory on the heap'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'Which C++ feature allows defining multiple functions with the same name but different parameters?',
      options: ['Function overriding', 'Function overloading', 'Function templating', 'Function chaining'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is the Standard Template Library (STL) in C++?',
      options: ['A set of CSS templates for UI design', 'A library of template classes and functions providing general-purpose data structures and algorithms', 'A debugging tool for C++ programs', 'A compiler extension for faster builds'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is the difference between public, private, and protected access specifiers in C++?',
      options: ['Public members are accessible everywhere; private only within the class; protected within the class and its derived classes', 'They all provide the same level of access', 'Protected is the most restrictive access level', 'Private members are accessible in derived classes'],
      correct: 0
    },
    {
      category: 'cpp',
      q: 'What does the delete operator do in C++?',
      options: ['Removes a file from disk', 'Deallocates memory that was previously allocated with new', 'Deletes a class definition', 'Removes an element from an array permanently'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is inheritance in C++?',
      options: ['Creating variables inside a class', 'A mechanism where a new class acquires properties and behaviors of an existing class', 'A way to delete unused classes', 'Connecting two different programs together'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is a reference variable in C++?',
      options: ['A pointer that can be null', 'An alias (another name) for an already existing variable', 'A variable declared with the static keyword', 'A global variable accessible across files'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'Which header file is needed to use cout and cin in C++?',
      options: ['<stdio.h>', '<iostream>', '<conio.h>', '<fstream>'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is an abstract class in C++?',
      options: ['A class with no member variables', 'A class that contains at least one pure virtual function and cannot be instantiated directly', 'A class that is declared using the abstract keyword', 'A class without any constructors'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is the purpose of the this pointer in C++?',
      options: ['It points to the base class object', 'It is a pointer that holds the address of the current object calling a member function', 'It points to the next element in an array', 'It is used to create new objects dynamically'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What is a destructor in C++?',
      options: ['A function that creates copies of objects', 'A special member function that is automatically called when an object goes out of scope or is deleted, used for cleanup', 'A template function for sorting', 'A function that converts objects to strings'],
      correct: 1
    },
    {
      category: 'cpp',
      q: 'What does the scope resolution operator (::) do in C++?',
      options: ['It performs division operations', 'It is used to define the body of a member function outside the class or to access global variables', 'It creates a new namespace', 'It allocates memory for class objects'],
      correct: 1
    },

    // --- CYBERSECURITY ---
    {
      category: 'cybersecurity',
      q: 'What is SQL Injection (SQLi), and how is it mitigated?',
      options: ['An attack that deletes site assets; mitigated by style sheets', 'An attack where malicious SQL statements are inserted into inputs to manipulate a database; mitigated by using Parameterized Queries (Prepared Statements)', 'A virus that infects client CPUs; mitigated by firewalls', 'An email scam technique; mitigated by secure spam filters'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'Which cryptographic technique converts a passwords plain-text into a fixed-length string that cannot be mathematically decrypted back?',
      options: ['Symmetric Encryption', 'Asymmetric Encryption', 'Hashing', 'Obfuscation'],
      correct: 2
    },
    {
      category: 'cybersecurity',
      q: 'What does "Salting" a password represent before hashing it?',
      options: ['Encrypting the database key', 'Adding a random unique string of characters to each password to protect against rainbow table attacks', 'Compressing the file size in buffers', 'Limiting login session timers'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is Cross-Site Scripting (XSS)?',
      options: ['An access privilege escalation bug', 'A vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users', 'A server overload denial-of-service attack', 'A database connection leak'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is the primary function of a Firewall in networking security?',
      options: ['To encrypt internet protocol traffic', 'To monitor and filter incoming and outgoing network traffic based on an organization\'s previously established security policies', 'To speed up local bandwidth connection speeds', 'To prevent physical hard drive damage'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'In Cybersecurity, what represents the "Principle of Least Privilege"?',
      options: ['Giving users minimal instructions to avoid support questions', 'Ensuring that users and systems are granted only the minimum security clearance levels and access rights necessary to perform their roles', 'Encrypting database keys with small key sizes', 'Allowing anyone to login without passwords'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is multi-factor authentication (MFA)?',
      options: ['Entering a password multiple times to confirm it', 'A security system that requires multiple separate categories of credentials to verify a user\'s identity', 'Logging in from multiple separate computers at the same time', 'Using multiple antivirus software programs'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What does "HTTPS" stand for, and what primary layer does it add to HTTP?',
      options: ['Hypertext Transfer Program Secure; adds standard cookies', 'Hypertext Transfer Protocol Secure; encrypts communication using TLS/SSL', 'High Speed Transfer Protocol; speeds up asset loading', 'Hypertext Translation System; translates languages securely'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is a Phishing attack?',
      options: ['A hard drive data deletion script', 'A social engineering attack designed to steal user credentials or sensitive data by masquerading as a trustworthy entity in electronic communications', 'A database overload attack', 'A network routing intercept'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'Which security token standard is modernly used to securely transmit JSON payloads between clients and servers during authentication?',
      options: ['OAuth 1.0', 'JWT (JSON Web Token)', 'XML Cookies', 'Session ID Blocks'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is Cross-Site Request Forgery (CSRF)?',
      options: ['Stealing server log variables', 'An attack that forces an end user to execute unwanted actions on a web application in which they\'re currently authenticated', 'Creating fake domain names', 'An unauthorized data download'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What represents "Ransomware" in cybersecurity threats?',
      options: ['A spam email offering cheap software licenses', 'A type of malicious software designed to block access to a computer system or encrypt its data until a sum of money is paid', 'A diagnostic script monitoring network speeds', 'A system diagnostic diagnostic scanner'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What does the abbreviation "CIA Triad" represent in information security models?',
      options: ['Central Intelligence Agency model', 'Confidentiality, Integrity, and Availability', 'Computer Integration Alliance', 'Cyber Intrusion Alerting'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'Which attack paradigm describes an attacker positioning themselves between two communicating systems to intercept or alter their conversations?',
      options: ['Denial of Service (DoS)', 'Man-in-the-Middle (MitM) Attack', 'Brute Force Attack', 'Buffer Overflow'],
      correct: 1
    },
    {
      category: 'cybersecurity',
      q: 'What is a Zero-Day vulnerability?',
      options: ['A minor bug that was patched years ago', 'A software security flaw that is known to the software vendor but has zero days of protection because no patch exists yet', 'A database database with zero columns', 'A brand new server setup on day one'],
      correct: 1
    },

    // --- PYTHON ---
    {
      category: 'python',
      q: 'Which of the following data structures in Python is immutable?',
      options: ['List', 'Dictionary', 'Set', 'Tuple'],
      correct: 3
    },
    {
      category: 'python',
      q: 'What is the correct syntax to output the type of a variable in Python?',
      options: ['print(type(x))', 'print(typeof(x))', 'print(x.type())', 'print(x.typeof())'],
      correct: 0
    },
    {
      category: 'python',
      q: 'How do you start a comments in Python?',
      options: ['//', '/*', '#', '--'],
      correct: 2
    },
    {
      category: 'python',
      q: 'Which method is used to add an element at the end of a list in Python?',
      options: ['add()', 'append()', 'insert()', 'push()'],
      correct: 1
    },
    {
      category: 'python',
      q: 'What is the output of 3 * 1**3 in Python?',
      options: ['27', '9', '3', '1'],
      correct: 2
    },
    {
      category: 'python',
      q: 'How do you create a function in Python?',
      options: ['def myFunction():', 'create myFunction():', 'function myFunction():', 'new myFunction():'],
      correct: 0
    },
    {
      category: 'python',
      q: 'Which keyword is used to handle exceptions in Python?',
      options: ['try', 'except', 'catch', 'throw'],
      correct: 1
    },
    {
      category: 'python',
      q: 'What does the range(5) function generate in Python?',
      options: ['0 to 5 inclusive', '1 to 5 inclusive', '0 to 4 inclusive', '1 to 4 inclusive'],
      correct: 2
    },
    {
      category: 'python',
      q: 'How do you create a dictionary in Python?',
      options: ['x = []', 'x = {}', 'x = ()', 'x = set()'],
      correct: 1
    },
    {
      category: 'python',
      q: 'Which operator is used for floor division in Python?',
      options: ['/', '//', '%', '**'],
      correct: 1
    },
    {
      category: 'python',
      q: 'What does the __init__ method do in a Python class?',
      options: ['Deletes the class instance', 'Initializes the instance variables when an object is created', 'Calls the parent class methods', 'Converts the class into a string representation'],
      correct: 1
    },
    {
      category: 'python',
      q: 'Which Python library is widely used for data analysis and manipulation?',
      options: ['Django', 'Flask', 'Pandas', 'TensorFlow'],
      correct: 2
    },
    {
      category: 'python',
      q: 'What is the purpose of the \'pass\' statement in Python?',
      options: ['It acts as a placeholder for future code and does nothing when executed', 'It exits the loop immediately', 'It raises an exception', 'It returns a value from a function'],
      correct: 0
    },
    {
      category: 'python',
      q: 'What is the output of print(\'hello\'.upper())?',
      options: ['hello', 'Hello', 'HELLO', 'Error'],
      correct: 2
    },
    {
      category: 'python',
      q: 'Which of the following is NOT a built-in data type in Python?',
      options: ['list', 'tuple', 'array', 'dict'],
      correct: 2
    },

    // --- ALGORITHM ---
    {
      category: 'algorithom',
      q: 'What is the time complexity of binary search in the worst case?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correct: 2
    },
    {
      category: 'algorithom',
      q: 'Which data structure is typically used to implement Breadth-First Search (BFS)?',
      options: ['Stack', 'Queue', 'Heap', 'Binary Tree'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'What is the main advantage of Quick Sort over Merge Sort?',
      options: ['It has a better worst-case time complexity', 'It is a stable sorting algorithm', 'It requires less auxiliary space (in-place sorting)', 'It is always faster in every scenario'],
      correct: 2
    },
    {
      category: 'algorithom',
      q: 'Which algorithm design paradigm is used to solve the Fractional Knapsack problem?',
      options: ['Dynamic Programming', 'Greedy Method', 'Divide and Conquer', 'Backtracking'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'What is the time complexity to insert a node at the beginning of a singly linked list?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(1) or O(n) depending on sorted order'],
      correct: 0
    },
    {
      category: 'algorithom',
      q: 'Which data structure is used to detect cycles in a graph efficiently?',
      options: ['Disjoint Set (Union-Find)', 'Stack', 'Queue', 'Trie'],
      correct: 0
    },
    {
      category: 'algorithom',
      q: 'What is the primary characteristic of Dijkstra\'s algorithm?',
      options: ['Finds the shortest path in a graph with negative weight edges', 'Finds the shortest path in a graph with non-negative weight edges', 'Finds the minimum spanning tree of a graph', 'Finds all pairs shortest paths'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'Which sorting algorithm has a best-case time complexity of O(n) when the input array is already sorted?',
      options: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort'],
      correct: 2
    },
    {
      category: 'algorithom',
      q: 'What is the main difference between Dynamic Programming and Divide and Conquer?',
      options: ['Divide and Conquer solves overlapping subproblems, whereas Dynamic Programming does not', 'Dynamic Programming solves overlapping subproblems and uses memoization, whereas Divide and Conquer solves independent subproblems', 'Dynamic Programming is faster in all cases', 'There is no difference between them'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'What is the space complexity of Depth-First Search (DFS) in a graph with V vertices and E edges, using an adjacency list?',
      options: ['O(1)', 'O(V)', 'O(V + E)', 'O(E)'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'Which data structure represents a Min-Heap?',
      options: ['A binary tree where the parent node is greater than or equal to its children', 'A binary tree where the parent node is less than or equal to its children', 'A sorted linked list', 'A hash table with min values'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'What is a Hash Collision?',
      options: ['When two different keys generate the same hash value/index', 'When a hash function runs out of memory', 'When a key has no hash value', 'When the hash table is completely deleted'],
      correct: 0
    },
    {
      category: 'algorithom',
      q: 'Which algorithm is used to find the Minimum Spanning Tree of a graph?',
      options: ['Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm', 'Bellman-Ford Algorithm', 'Floyd-Warshall Algorithm'],
      correct: 1
    },
    {
      category: 'algorithom',
      q: 'What does it mean if an algorithm has a time complexity of O(2^n)?',
      options: ['Logarithmic time complexity', 'Polynomial time complexity', 'Exponential time complexity', 'Linear time complexity'],
      correct: 2
    },
    {
      category: 'algorithom',
      q: 'In a Binary Search Tree (BST), what traversal method visits nodes in ascending sorted order?',
      options: ['Pre-order traversal', 'In-order traversal', 'Post-order traversal', 'Level-order traversal'],
      correct: 1
    },

    // --- DATABASE ---
    {
      category: 'database',
      q: 'What does ACID stand for in Database Management Systems?',
      options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Completeness, Integrity, Directness', 'Authority, Concurrency, Indexing, Delivery', 'Atomicity, Concurrency, Integration, Durability'],
      correct: 0
    },
    {
      category: 'database',
      q: 'Which SQL statement is used to extract data from a database?',
      options: ['GET', 'OPEN', 'EXTRACT', 'SELECT'],
      correct: 3
    },
    {
      category: 'database',
      q: 'What is a Primary Key in a database table?',
      options: ['A key that allows duplicate values', 'A unique identifier for each record in a table, which cannot contain NULL values', 'A key imported from another table to establish a relationship', 'A key used to encrypt table data'],
      correct: 1
    },
    {
      category: 'database',
      q: 'What is the purpose of a Foreign Key?',
      options: ['To uniquely identify each row in the current table', 'To create a link between two tables by referencing the primary key of another table', 'To speed up SQL query searches', 'To store international character data'],
      correct: 1
    },
    {
      category: 'database',
      q: 'Which normal form deals with removing transitive dependencies?',
      options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
      correct: 2
    },
    {
      category: 'database',
      q: 'What does a JOIN clause do in SQL?',
      options: ['Combines rows from two or more tables based on a related column between them', 'Splits a table into multiple sub-tables', 'Deletes duplicate rows from a table', 'Adds new records to multiple tables simultaneously'],
      correct: 0
    },
    {
      category: 'database',
      q: 'What is the main difference between NoSQL and SQL databases?',
      options: ['SQL databases are non-relational, NoSQL databases are relational', 'SQL databases are relational and typically table-based, while NoSQL databases are non-relational and can be document-based, key-value, or graph-based', 'SQL databases cannot handle large datasets', 'NoSQL databases do not support queries'],
      correct: 1
    },
    {
      category: 'database',
      q: 'Which SQL keyword is used to sort the result-set in ascending or descending order?',
      options: ['SORT BY', 'ORDER BY', 'GROUP BY', 'ALIGN BY'],
      correct: 1
    },
    {
      category: 'database',
      q: 'What is a Database Index?',
      options: ['A backup copy of the database', 'A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage', 'The total number of columns in a table', 'A list of authorized database users'],
      correct: 1
    },
    {
      category: 'database',
      q: 'What does the SQL GROUP BY statement do?',
      options: ['Sorts records alphabetically', 'Groups rows that have the same values into summary rows', 'Combines two tables together', 'Deletes group permissions'],
      correct: 1
    },
    {
      category: 'database',
      q: 'Which command is used to remove all records from a table without deleting the table structure itself?',
      options: ['DELETE TABLE', 'DROP TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE'],
      correct: 2
    },
    {
      category: 'database',
      q: 'What is a database Transaction?',
      options: ['A financial transaction stored in a table', 'A single logical unit of work that accesses and possibly modifies the contents of a database', 'The process of transferring data between two database servers', 'An index creation process'],
      correct: 1
    },
    {
      category: 'database',
      q: 'What is the purpose of the SQL HAVING clause?',
      options: ['To filter rows before they are grouped', 'To filter groups returned by a GROUP BY clause based on a specified condition', 'To sort the output in descending order', 'To create a temporary view of the table'],
      correct: 1
    },
    {
      category: 'database',
      q: 'Which type of join returns all records when there is a match in either left or right table?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
      correct: 3
    },
    {
      category: 'database',
      q: 'What is data redundancy?',
      options: ['Data that is lost during transfer', 'The duplication of data across multiple database tables, leading to inconsistency risks', 'Optimized compression of database rows', 'Encryption of table columns'],
      correct: 1
    },

    // --- MACHINE LEARNING ---
    {
      category: 'machinelearning',
      q: 'What is the main difference between Supervised and Unsupervised Learning?',
      options: ['Supervised learning uses labeled training data, while unsupervised learning uses unlabeled data', 'Unsupervised learning is always more accurate', 'Supervised learning requires no training data', 'Unsupervised learning only works with images'],
      correct: 0
    },
    {
      category: 'machinelearning',
      q: 'Which algorithm is commonly used for classification tasks in machine learning?',
      options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'Apriori Algorithm'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What is Overfitting in machine learning?',
      options: ['When a model performs exceptionally well on both training and test datasets', 'When a model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on new data', 'When a model is too simple to learn the underlying patterns', 'When the training dataset is too small'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What is the purpose of a validation dataset in machine learning?',
      options: ['To train the model weights', 'To provide an unbiased evaluation of a model fit on the training dataset while tuning model hyperparameters', 'To test the final model after deployment', 'To clean the input dataset features'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'Which of the following is a clustering algorithm?',
      options: ['Support Vector Machine', 'Random Forest', 'K-Means', 'Gradient Boosting'],
      correct: 2
    },
    {
      category: 'machinelearning',
      q: 'What does \'Bias\' represent in a machine learning model?',
      options: ['The variance of the model predictions on new data', 'The simplifying assumptions made by a model to make the target function easier to learn', 'The training speed of the optimizer', 'The size of the neural network layers'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What is the role of an Activation Function in artificial neural networks?',
      options: ['To speed up database connections', 'To introduce non-linearity into the network, allowing it to learn complex patterns', 'To initialize the weight matrices', 'To calculate the final error loss value'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'Which technique is used to prevent overfitting by penalizing large weights in a model?',
      options: ['Data Augmentation', 'Regularization (L1/L2)', 'Batch Normalization', 'Gradient Descent'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What is the main objective of Gradient Descent?',
      options: ['To maximize the accuracy score', 'To minimize the cost/loss function by iteratively moving in the direction of steepest descent', 'To find the number of hidden layers', 'To split the dataset into training and testing sets'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'In evaluation metrics, what does Recall measure?',
      options: ['The proportion of actual positives that were identified correctly', 'The proportion of positive identifications that were actually correct', 'The overall accuracy of the model', 'The speed of prediction execution'],
      correct: 0
    },
    {
      category: 'machinelearning',
      q: 'What is a Decision Tree?',
      options: ['A flowchart-like structure where each internal node represents a test on an attribute, each branch represents the outcome of the test, and each leaf node represents a class label', 'A database index tree', 'A neural network architecture', 'A clustering diagram'],
      correct: 0
    },
    {
      category: 'machinelearning',
      q: 'Which machine learning algorithm is based on Bayes\' Theorem with an assumption of independence between predictors?',
      options: ['Support Vector Machine', 'Naive Bayes', 'K-Nearest Neighbors', 'Random Forest'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What does the term \'Epoch\' mean in training a neural network?',
      options: ['One single forward pass of one training sample', 'One complete pass of the entire training dataset through the neural network', 'The time taken to train a model', 'The learning rate of the optimizer'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'What is Reinforcement Learning?',
      options: ['Training models using labeled datasets only', 'A type of machine learning where an agent learns to make decisions by performing actions and receiving rewards or penalties', 'A clustering method based on distance metrics', 'A regression technique for time-series forecasting'],
      correct: 1
    },
    {
      category: 'machinelearning',
      q: 'Which metric is commonly used to evaluate the performance of a regression model?',
      options: ['Confusion Matrix', 'F1-Score', 'Mean Squared Error (MSE)', 'Precision'],
      correct: 2
    }
  ];


  const menuItems = document.querySelectorAll('.menu-item');
  const tabViews = document.querySelectorAll('.tab-view');
  const pageTitleHeading = document.getElementById('page-title-heading');
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  // Theme & Session controls
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const btnLogout = document.getElementById('btn-logout');

  // Student Registration Form (Landing Page)
  const formStudentInfo = document.getElementById('form-student-info');
  const inputFullname = document.getElementById('input-fullname');
  const inputSchool = document.getElementById('input-school');
  const inputDept = document.getElementById('input-dept');
  const inputEmail = document.getElementById('input-email');

  // Config Selector Elements
  const quizConfigSection = document.getElementById('quiz-config-section');
  const btnStartExam = document.getElementById('btn-start-exam');
  const selectSubjectCards = document.querySelectorAll('#config-subject-grid .select-option-card');
  const selectCountCards = document.querySelectorAll('#config-question-count-grid .select-option-card');

  // Quiz Panel Section & Sub-elements
  const quizSection = document.getElementById('quiz-section');
  const quizTimerDisplay = document.getElementById('quiz-timer-display');
  const timerBadge = document.querySelector('.timer-badge');

  // Results Screen Elements
  const resultsActiveContent = document.getElementById('results-active-content');

  const statsCorrect = document.getElementById('stats-correct');
  const statsIncorrect = document.getElementById('stats-incorrect');
  const statsUnanswered = document.getElementById('stats-unanswered');
  const statsEfficiency = document.getElementById('stats-efficiency');

  const resultsTimeTaken = document.getElementById('results-time-taken');
  const resultsDateCompleted = document.getElementById('results-date-completed');

  const btnRestartQuiz = document.getElementById('btn-restart-quiz');
  const historyRecordsContainer = document.getElementById('history-records-container');

  // Header User Avatar elements
  const headerUserAvatarPill = document.getElementById('header-user-avatar-pill');
  const headerAvatarImg = document.getElementById('header-avatar');

  // Profile Page Edit form elements
  const formEditProfile = document.getElementById('form-edit-profile');
  const editFullname = document.getElementById('edit-fullname');
  const editEmail = document.getElementById('edit-email');
  const editSchool = document.getElementById('edit-school');
  const editDept = document.getElementById('edit-dept');
  const editAddress = document.getElementById('edit-address');
  const profileImageUpload = document.getElementById('profile-image-upload');
  const profileAvatarLarge = document.getElementById('profile-avatar-large');
  const profileNameTitle = document.getElementById('profile-name-title');
  const profileDeptSubtitle = document.getElementById('profile-dept-subtitle');

  // Active configurations chosen
  let chosenSubject = 'all';
  let chosenQuestionCount = 25;

  themeToggleBtn.addEventListener('click', toggleTheme);

  // Read saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.className = 'dark-mode';
    const sunIcon = themeToggleBtn.querySelector('.active-sun');
    if (sunIcon) sunIcon.classList.remove('active-sun');
    themeToggleBtn.querySelector('.toggle-icon:nth-child(2)').classList.add('active-sun');
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Toggle active classes on icons
    const icons = themeToggleBtn.querySelectorAll('.toggle-icon');
    icons.forEach(icon => icon.classList.toggle('active-sun'));
  }


  // Subject Category selectors
  selectSubjectCards.forEach(card => {
    card.addEventListener('click', () => {
      selectSubjectCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      chosenSubject = card.getAttribute('data-subject');
    });
  });

  // Question Count selectors
  selectCountCards.forEach(card => {
    card.addEventListener('click', () => {
      selectCountCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      chosenQuestionCount = parseInt(card.getAttribute('data-count'), 10);
    });
  });


  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      // Intercept navigation for locked states
      if ((targetTab === 'results' || targetTab === 'profile' || targetTab === 'instruction') && !state.quiz.isUnlocked) {
        alert("Please provide and save your login credentials to enter the platform.");
        return;
      }

      switchTab(targetTab);

      // Close sidebar on mobile after selection
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('open');
      }
    });
  });

  function switchTab(tabId) {
    // Update menu list active highlights
    menuItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update tab visibility
    tabViews.forEach(view => {
      const viewId = view.getAttribute('id');
      if (viewId === `tab-view-${tabId}`) {
        view.style.display = 'block';
        setTimeout(() => {
          view.classList.add('active');
        }, 50);
      } else {
        view.classList.remove('active');
        view.style.display = 'none';
      }
    });

    // Update title text in top header
    let titleText = 'Dashboard';
    if (tabId === 'profile') titleText = 'My Profile';
    if (tabId === 'results') titleText = 'Session Results';
    if (tabId === 'instruction') titleText = 'Exam Instructions';
    pageTitleHeading.textContent = titleText;

    // Show welcome banner only on dashboard
    const welcomeBanner = document.getElementById('welcome-banner');
    if (welcomeBanner) {
      welcomeBanner.style.display = (tabId === 'dashboard') ? 'block' : 'none';
    }

    // Refresh displays
    if (tabId === 'profile') {
      syncProfileUI();
    }
    if (tabId === 'results') {
      refreshResultsView();
    }
  }

  // Mobile sidebar toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  formStudentInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInputVal = inputEmail.value.trim().toLowerCase();

    // Check if profile exists for this email
    let storedProfile = null;
    try {
      storedProfile = JSON.parse(localStorage.getItem('devquiz_profile_' + emailInputVal));
    } catch (e) {
      storedProfile = null;
    }

    if (storedProfile) {
      // Load stored profile details
      state.user.name = storedProfile.name || inputFullname.value.trim();
      state.user.school = storedProfile.school || inputSchool.value.trim();
      state.user.department = storedProfile.department || inputDept.value.trim();
      state.user.email = emailInputVal;
      state.user.address = storedProfile.address || '';
      state.user.avatar = storedProfile.avatar || '';
    } else {
      // Create new profile object
      state.user.name = inputFullname.value.trim();
      state.user.school = inputSchool.value.trim();
      state.user.department = inputDept.value.trim();
      state.user.email = emailInputVal;
      state.user.address = '';
      state.user.avatar = '';

      // Save it immediately
      localStorage.setItem('devquiz_profile_' + emailInputVal, JSON.stringify(state.user));
    }

    state.quiz.isUnlocked = true;

    // Switch view to dashboard using layout wrapper toggle
    document.body.classList.add('logged-in');

    // Sync profile display and avatars
    syncProfileUI();

    // Load their history in Results immediately if it exists
    loadExamHistoryRecords();

    // Navigate to dashboard
    switchTab('dashboard');
  });

  function syncProfileUI() {
    if (!state.quiz.isUnlocked) {
      if (headerUserAvatarPill) headerUserAvatarPill.style.display = 'none';
      return;
    }

    const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
    const userImg = state.user.avatar || defaultAvatar;

    // Header avatar sync
    if (headerAvatarImg) headerAvatarImg.src = userImg;
    if (headerUserAvatarPill) headerUserAvatarPill.style.display = 'flex';

    // Welcome banner name update
    const welcomeEl = document.getElementById('welcome-user-name');
    if (welcomeEl) {
      welcomeEl.innerHTML = `Welcome, <span>${escapeHTML(state.user.name)}</span>`;
    }

    // Profile page sync
    if (profileAvatarLarge) profileAvatarLarge.src = userImg;
    if (profileNameTitle) profileNameTitle.textContent = state.user.name;
    if (profileDeptSubtitle) profileDeptSubtitle.textContent = state.user.department;

    // Form inputs sync
    if (editFullname) editFullname.value = state.user.name;
    if (editEmail) editEmail.value = state.user.email;
    if (editSchool) editSchool.value = state.user.school;
    if (editDept) editDept.value = state.user.department;
    if (editAddress) editAddress.value = state.user.address;
  }

  // Handle Profile Edits Submission
  if (formEditProfile) {
    formEditProfile.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!state.quiz.isUnlocked) return;

      // Update state details
      state.user.name = editFullname.value.trim();
      state.user.school = editSchool.value.trim();
      state.user.department = editDept.value.trim();
      state.user.address = editAddress.value.trim();

      // Save to local storage
      const emailKey = state.user.email.toLowerCase();
      localStorage.setItem('devquiz_profile_' + emailKey, JSON.stringify(state.user));

      // Re-sync UI
      syncProfileUI();

      alert("Profile updated successfully!");
    });
  }

  // Handle Profile Avatar file uploads
  if (profileImageUpload) {
    profileImageUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Ensure file is an image
      if (!file.type.startsWith('image/')) {
        alert("Please upload a valid image file.");
        return;
      }

      // Check file size (limit to 1.5MB to prevent localstorage overflow)
      if (file.size > 1.5 * 1024 * 1024) {
        alert("Image is too large. Please select an image under 1.5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;

        // Update user state
        state.user.avatar = base64Data;

        // Save to local storage
        if (state.user.email) {
          const emailKey = state.user.email.toLowerCase();
          localStorage.setItem('devquiz_profile_' + emailKey, JSON.stringify(state.user));
        }

        // Sync UI
        syncProfileUI();
      };
      reader.readAsDataURL(file);
    });
  }


  function getSubjectLabel(subjectKey) {
    const map = {
      'all': 'All Subjects',
      'html': 'HTML5',
      'css': 'CSS3',
      'java': 'Java Core',
      'javascript': 'JavaScript',
      'webdesign': 'Web Design',
      'github': 'GitHub & Git',
      'cybersecurity': 'Cybersecurity',
      'python': 'Python Programming',
      'algorithom': 'Algorithms & Structures',
      'database': 'Database Systems',
      'machinelearning': 'Machine Learning'
    };
    return map[subjectKey.toLowerCase()] || subjectKey;
  }

  // Shuffles any array in-place
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Core dynamic generator mapping
  function generateExamQuestions(subject, count) {
    let pool = [];

    if (subject === 'all') {
      // Pull all static questions
      pool = [...staticQuestions];
    } else {
      // Filter specific category
      pool = staticQuestions.filter(q => q.category.toLowerCase() === subject.toLowerCase());
    }

    // Shuffle original static questions
    shuffleArray(pool);

    // --- ANTI-REPEAT: Filter out previously used questions ---
    let usedQuestions = [];
    try {
      usedQuestions = JSON.parse(localStorage.getItem('devquiz_used_questions')) || [];
    } catch (e) {
      usedQuestions = [];
    }
    pool = pool.filter(q => !usedQuestions.includes(q.q));

    // If we filtered out too many and don't have enough, reset the used list
    if (pool.length < count) {
      // Reset used questions since all have been exhausted
      localStorage.removeItem('devquiz_used_questions');
      usedQuestions = [];
      // Re-fetch pool
      if (subject === 'all') {
        pool = [...staticQuestions];
      } else {
        pool = staticQuestions.filter(q => q.category.toLowerCase() === subject.toLowerCase());
      }
      shuffleArray(pool);
    }

    // If we have enough static questions, just return them sliced
    if (pool.length >= count) {
      return pool.slice(0, count);
    }

    // Otherwise we need to generate additional dynamic questions programmatically without duplicates
    const finalQuestions = [...pool];
    const needed = count - pool.length;

    // Define rich algorithmic variations templates to pad to requested limit (e.g. 50 or 100)
    const activeSubject = (subject === 'all') ? ['html', 'css', 'java', 'javascript', 'webdesign', 'github', 'cybersecurity'] : [subject];

    // Algorithmic generator pools
    const templates = {
      html: [
        {
          tag: '<strong>',
          purpose: 'display text in bold weight with strong semantic importance',
          options: ['<strong>', '<b>', '<bold>', '<em>']
        },
        {
          tag: '<em>',
          purpose: 'display emphasized text, usually styled in italics',
          options: ['<em>', '<i>', '<italic>', '<mark>']
        },
        {
          tag: '<img>',
          purpose: 'embed a visual graphic image in a webpage',
          options: ['<img>', '<image>', '<picture>', '<src>']
        },
        {
          tag: '<a>',
          purpose: 'create a hyperlinked anchor anchor to load external pages',
          options: ['<a>', '<href>', '<link>', '<anchor>']
        },
        {
          tag: '<br>',
          purpose: 'insert a simple carriage-return line break without margins',
          options: ['<br>', '<break>', '<lb>', '<hr>']
        },
        {
          tag: '<nav>',
          purpose: 'contain major navigational links for browsing website index lists',
          options: ['<nav>', '<menu>', '<list>', '<aside>']
        },
        {
          tag: '<aside>',
          purpose: 'hold tangentially related content like sidebars or callout details',
          options: ['<aside>', '<section>', '<article>', '<aside-block>']
        },
        {
          tag: '<h1>',
          purpose: 'represent the highest priority heading on a single webpage',
          options: ['<h1>', '<head>', '<header>', '<h6h>']
        },
        {
          tag: '<ul>',
          purpose: 'define an unordered bulleted list of item nodes',
          options: ['<ul>', '<ol>', '<li>', '<list>']
        },
        {
          tag: '<ol>',
          purpose: 'define an ordered numbered list of items',
          options: ['<ol>', '<ul>', '<li>', '<list-ordered>']
        }
      ],
      css: [
        {
          prop: 'font-size',
          action: 'change the text character sizing scale',
          options: ['font-size', 'text-size', 'font-height', 'size']
        },
        {
          prop: 'background-color',
          action: 'apply a solid color behind the element content block',
          options: ['background-color', 'color-background', 'bg-color', 'fill-color']
        },
        {
          prop: 'color',
          action: 'adjust the foreground text character color',
          options: ['color', 'font-color', 'text-color', 'foreground']
        },
        {
          prop: 'font-weight',
          action: 'change the font character thickness (e.g. bold, semibold)',
          options: ['font-weight', 'font-style', 'boldness', 'weight']
        },
        {
          prop: 'padding',
          action: 'introduce empty space inside an element between content and its border boundary',
          options: ['padding', 'margin', 'border-spacing', 'spacing-internal']
        },
        {
          prop: 'margin',
          action: 'create empty spacing outside an element beyond its border outlines',
          options: ['margin', 'padding', 'outline-spacing', 'gap-external']
        },
        {
          prop: 'border-color',
          action: 'define the outline border boundary line coloring',
          options: ['border-color', 'outline-color', 'border-style', 'border-fill']
        },
        {
          prop: 'display: flex',
          action: 'convert a container block to direct flexbox layout model',
          options: ['display: flex', 'layout: flex', 'display: grid', 'float: flex']
        },
        {
          prop: 'justify-content',
          action: 'align items horizontally along the main flexbox layout axis',
          options: ['justify-content', 'align-items', 'align-content', 'flex-align']
        },
        {
          prop: 'align-items',
          action: 'align items vertically along the cross flexbox layout axis',
          options: ['align-items', 'justify-content', 'align-content', 'cross-align']
        }
      ],
      javascript: [
        {
          code: 'typeof null',
          result: '"object"',
          options: ['"object"', '"null"', '"undefined"', '"string"']
        },
        {
          code: 'typeof []',
          result: '"object"',
          options: ['"object"', '"array"', '"list"', '"undefined"']
        },
        {
          code: 'typeof undefined',
          result: '"undefined"',
          options: ['"undefined"', '"object"', '"null"', '"void"']
        },
        {
          code: 'typeof 42',
          result: '"number"',
          options: ['"number"', '"int"', '"float"', '"numeric"']
        },
        {
          code: 'typeof "hello"',
          result: '"string"',
          options: ['"string"', '"char"', '"text"', '"undefined"']
        },
        {
          code: 'typeof true',
          result: '"boolean"',
          options: ['"boolean"', '"bool"', '"binary"', '"logical"']
        },
        {
          code: 'typeof Symbol()',
          result: '"symbol"',
          options: ['"symbol"', '"object"', '"string"', '"identity"']
        },
        {
          code: '1 + "2"',
          result: '"12" (string)',
          options: ['"12" (string)', '3 (number)', 'NaN', 'TypeError']
        },
        {
          code: '"5" - 2',
          result: '3 (number)',
          options: ['3 (number)', '"52" (string)', 'NaN', '"3" (string)']
        }
      ],
      java: [
        {
          concept: 'polymorphism',
          meaning: 'ability of a single interface or class hierarchy to take multiple forms at runtime',
          options: ['polymorphism', 'inheritance', 'encapsulation', 'abstraction']
        },
        {
          concept: 'encapsulation',
          meaning: 'restricting direct access to object variables by grouping properties and methods inside private scopes',
          options: ['encapsulation', 'polymorphism', 'inheritance', 'abstraction']
        },
        {
          concept: 'inheritance',
          meaning: 'mechanism where one subclass inherits attributes and behavior from a parent class hierarchy',
          options: ['inheritance', 'encapsulation', 'polymorphism', 'overloading']
        },
        {
          concept: 'abstraction',
          meaning: 'hiding complex implementation details of class logic and displaying only clean interfaces to users',
          options: ['abstraction', 'encapsulation', 'inheritance', 'overriding']
        },
        {
          concept: 'garbage collection',
          meaning: 'automatic process of reclaiming heap memory by deleting unreferenced dynamic object spaces',
          options: ['garbage collection', 'paging', 'thread cleanup', 'exception handling']
        }
      ],
      webdesign: [
        {
          a11y: 'semantic HTML structure tags',
          value: 'screen readers',
          options: ['screen readers', 'browser compilation speeds', 'security firewall configurations', 'relational database query speeds']
        },
        {
          a11y: 'color contrast ratio ratios',
          value: 'visually impaired users',
          options: ['visually impaired users', 'mobile network loading speeds', 'local browser caching operations', 'search engine indexing crawlers']
        },
        {
          a11y: 'image "alt" tags text',
          value: 'search engines and screen reader engines',
          options: ['search engines and screen reader engines', 'CSS rendering threads', 'JavaScript variable scopes', 'relational indexes']
        }
      ],
      github: [
        {
          cmd: 'git init',
          func: 'initialize a completely new Git version control repository locally',
          options: ['git init', 'git status', 'git clone', 'git branch']
        },
        {
          cmd: 'git status',
          func: 'check the status of current directory modifications and unstaged files',
          options: ['git status', 'git log', 'git add', 'git commit']
        },
        {
          cmd: 'git log',
          func: 'view a chronological list of committed sessions and historical commits',
          options: ['git log', 'git history', 'git commits', 'git show']
        },
        {
          cmd: 'git clone',
          func: 'copy an existing remote repository down into a local workspace directory',
          options: ['git clone', 'git download', 'git pull', 'git fetch']
        },
        {
          cmd: 'git add',
          func: 'stage your local file edits from workspace to prepare for committing',
          options: ['git add', 'git stage', 'git commit', 'git save']
        },
        {
          cmd: 'git branch',
          func: 'list all local branches or create a new branch point',
          options: ['git branch', 'git checkout', 'git rebase', 'git merge']
        }
      ],
      cybersecurity: [
        {
          attack: 'SQL Injection',
          remedy: 'using Parameterized Queries (Prepared Statements)',
          options: ['using Parameterized Queries (Prepared Statements)', 'setting local cookies to secure', 'sanitizing margin styles', 'changing background passwords']
        },
        {
          attack: 'Cross-Site Scripting (XSS)',
          remedy: 'proper input sanitization and output context encoding',
          options: ['proper input sanitization and output context encoding', 'setting database sizes', 'adding secure firewalls', 'hashing database files']
        },
        {
          attack: 'Cross-Site Request Forgery (CSRF)',
          remedy: 'incorporating anti-CSRF request authorization tokens',
          options: ['incorporating anti-CSRF request authorization tokens', 'salting security databases', 'deleting unreferenced scripts', 'using HTTPS secure headers']
        },
        {
          attack: 'Brute-Force Attacks',
          remedy: 'rate limiting, account locking, and Multi-Factor Auth (MFA)',
          options: ['rate limiting, account locking, and Multi-Factor Auth (MFA)', 'obfuscating page styles', 'blocking visual images', 'sanitizing query structures']
        }
      ]
    };

    // Pad dynamically until count achieved
    let templateIndex = 0;
    while (finalQuestions.length < count) {
      const cat = activeSubject[templateIndex % activeSubject.length];
      const categoryTemplates = templates[cat];

      if (categoryTemplates && categoryTemplates.length > 0) {
        // Pick a random template item
        const t = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

        let questionObj = {};
        if (cat === 'html') {
          questionObj = {
            category: 'html',
            q: `Which HTML tag is modernly specified to ${t.purpose}?`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.tag);
        } else if (cat === 'css') {
          questionObj = {
            category: 'css',
            q: `Which CSS property should be applied to ${t.action}?`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.prop);
        } else if (cat === 'javascript') {
          questionObj = {
            category: 'javascript',
            q: `What is the return result of evaluating the JavaScript expression: \`${t.code}\`?`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.result);
        } else if (cat === 'java') {
          questionObj = {
            category: 'java',
            q: `In Object-Oriented Java development, the concept of "${t.concept}" is defined as:`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.concept);
        } else if (cat === 'webdesign') {
          questionObj = {
            category: 'webdesign',
            q: `In web design and usability standards, ${t.a11y} primarily aid:`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.value);
        } else if (cat === 'github') {
          questionObj = {
            category: 'github',
            q: `In Git version control, what is the primary role of the command: \`${t.cmd}\`?`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.cmd);
        } else if (cat === 'cybersecurity') {
          questionObj = {
            category: 'cybersecurity',
            q: `Which primary countermeasure is modernly implemented to protect applications against ${t.attack} vulnerabilities?`,
            options: shuffleArray([...t.options]),
            correct: -1
          };
          questionObj.correct = questionObj.options.indexOf(t.remedy);
        }

        // Add to list if it doesn't already exist in pool (prevent duplication)
        const isDuplicate = finalQuestions.some(item => item.q === questionObj.q);
        if (!isDuplicate && questionObj.correct !== -1) {
          finalQuestions.push(questionObj);
        }
      }

      templateIndex++;
      // Safety exit if we loop too much without progress
      if (templateIndex > 1000) {
        // Break and duplicate safely if absolutely forced to
        const fallback = { ...staticQuestions[templateIndex % staticQuestions.length] };
        fallback.q = `[Review Checkpoint] ${fallback.q}`;
        finalQuestions.push(fallback);
      }
    }

    return finalQuestions;
  }


  btnStartExam.addEventListener('click', () => {
    state.quiz.subject = chosenSubject;
    state.quiz.totalQuestions = chosenQuestionCount;

    // Assigned Timers:
    // 25 MCQ -> 18 mins (1080s)
    // 50 MCQ -> 35 mins (2100s)
    // 100 MCQ -> 60 mins (3600s)
    if (chosenQuestionCount === 25) {
      state.timer.duration = 1080;
    } else if (chosenQuestionCount === 50) {
      state.timer.duration = 2100;
    } else if (chosenQuestionCount === 75) {
      state.timer.duration = 2880; // 48 mins
    } else if (chosenQuestionCount === 100) {
      state.timer.duration = 3600; // 60 mins
    } else if (chosenQuestionCount === 150) {
      state.timer.duration = 5400; // 90 mins
    } else if (chosenQuestionCount === 200) {
      state.timer.duration = 7200; // 120 mins
    } else {
      state.timer.duration = 1800; // fallback 30 mins
    }

    state.timer.timeLeft = state.timer.duration;

    // Load dynamic questions
    state.quiz.questions = generateExamQuestions(chosenSubject, chosenQuestionCount);
    state.quiz.answers = Array(state.quiz.totalQuestions).fill(-1);
    state.quiz.isSubmitted = false;

    // Toggle layouts
    quizConfigSection.classList.add('hidden');
    quizSection.classList.remove('hidden');

    // Sticky Display values
    document.getElementById('sticky-subject-display').textContent = getSubjectLabel(chosenSubject);
    updateStickyProgress();

    // Render questions vertically
    renderQuestionsList();

    // Begin Countdown
    startGlobalTimer();
  });

  function startGlobalTimer() {
    clearInterval(state.timer.intervalId);
    state.quiz.startTime = new Date();

    updateTimerDisplay();

    state.timer.intervalId = setInterval(() => {
      state.timer.timeLeft--;

      if (state.timer.timeLeft <= 0) {
        clearInterval(state.timer.intervalId);
        state.timer.timeLeft = 0;
        updateTimerDisplay();
        alert("Time is up! Your answers are being submitted automatically.");
        submitQuiz();
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(state.timer.timeLeft / 60);
    const seconds = state.timer.timeLeft % 60;

    const displayStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    quizTimerDisplay.textContent = displayStr;

    // Visual warning when time is low (< 3 minutes / 180s)
    if (state.timer.timeLeft <= 180) {
      timerBadge.classList.add('warning');
    } else {
      timerBadge.classList.remove('warning');
    }
  }


  function renderQuestionsList() {
    const wrapper = document.getElementById('questions-list-wrapper');
    wrapper.innerHTML = '';

    state.quiz.questions.forEach((qObj, idx) => {
      const card = document.createElement('div');
      card.className = 'quiz-question-card';
      card.setAttribute('data-question-index', idx);

      const categoryLabel = getSubjectLabel(qObj.category);

      card.innerHTML = `
        <div class="question-header">
          <span class="question-badge">Question ${idx + 1}</span>
          <span class="question-category-tag">${categoryLabel}</span>
        </div>
        <h4 class="question-title">${escapeHTML(qObj.q)}</h4>
        <div class="question-options-list"></div>
      `;

      const optionsList = card.querySelector('.question-options-list');

      qObj.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'option-card-btn';
        btn.type = 'button';

        const prefix = String.fromCharCode(65 + optIdx); // A, B, C, D
        btn.innerHTML = `
          <div class="opt-radio-icon">
            <div class="opt-radio-inner"></div>
          </div>
          <span class="opt-text">${prefix}. ${escapeHTML(optText)}</span>
        `;

        // Load saved state
        if (state.quiz.answers[idx] === optIdx) {
          btn.classList.add('selected');
        }

        // Active state click binding
        if (!state.quiz.isSubmitted) {
          btn.addEventListener('click', () => {
            const siblings = optionsList.querySelectorAll('.option-card-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            btn.classList.add('selected');

            // Save choice immediately
            state.quiz.answers[idx] = optIdx;
            updateStickyProgress();
          });
        } else {
          // Submitted view: locks controls & outlines correct vs wrong selections
          btn.disabled = true;

          if (optIdx === qObj.correct) {
            // Outline correct answers in gorgeous emerald outline
            btn.style.borderColor = '#10B981';
            btn.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
            btn.style.color = '#10B981';
            btn.style.fontWeight = '600';
            btn.querySelector('.opt-radio-icon').style.borderColor = '#10B981';
            btn.querySelector('.opt-radio-inner').style.backgroundColor = '#10B981';
            btn.querySelector('.opt-radio-inner').style.opacity = '1';
            btn.querySelector('.opt-radio-inner').style.transform = 'scale(1)';
          } else if (state.quiz.answers[idx] === optIdx) {
            // Outline wrong selection in red
            btn.style.borderColor = '#EF4444';
            btn.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
            btn.style.color = '#EF4444';
            btn.style.fontWeight = '600';
            btn.querySelector('.opt-radio-icon').style.borderColor = '#EF4444';
            btn.querySelector('.opt-radio-inner').style.backgroundColor = '#EF4444';
            btn.querySelector('.opt-radio-inner').style.opacity = '1';
            btn.querySelector('.opt-radio-inner').style.transform = 'scale(1)';
          }
        }

        optionsList.appendChild(btn);
      });

      wrapper.appendChild(card);
    });
  }

  function updateStickyProgress() {
    let answeredCount = 0;
    state.quiz.answers.forEach(ans => {
      if (ans !== -1) answeredCount++;
    });

    const total = state.quiz.totalQuestions;
    document.getElementById('sticky-progress-display').textContent = `${answeredCount}/${total}`;

    const percent = total > 0 ? (answeredCount / total) * 100 : 0;
    document.getElementById('exam-progress-fill').style.width = `${percent}%`;
  }


  const handleSubmissionRequest = () => {
    if (state.quiz.isSubmitted) return;

    // Count unanswered questions
    let unanswered = 0;
    state.quiz.answers.forEach(ans => {
      if (ans === -1) unanswered++;
    });

    let confirmMsg = "Are you sure you want to finish and submit your exam now?";
    if (unanswered > 0) {
      confirmMsg = `You have ${unanswered} unanswered question(s). Are you sure you want to submit your exam?`;
    }

    if (confirm(confirmMsg)) {
      submitQuiz();
    }
  };

  // Bind Submit events
  const btnSubmitFloating = document.getElementById('btn-submit-exam-floating');
  const btnSubmitBottom = document.getElementById('btn-submit-exam-bottom');
  if (btnSubmitFloating) btnSubmitFloating.addEventListener('click', handleSubmissionRequest);
  if (btnSubmitBottom) btnSubmitBottom.addEventListener('click', handleSubmissionRequest);

  function submitQuiz() {
    state.quiz.isSubmitted = true;
    state.quiz.endTime = new Date();
    clearInterval(state.timer.intervalId);

    timerBadge.classList.remove('warning');

    // Score variables
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    state.quiz.questions.forEach((qObj, idx) => {
      const studentAnsIdx = state.quiz.answers[idx];

      if (studentAnsIdx === -1) {
        unansweredCount++;
      } else if (studentAnsIdx === qObj.correct) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const percentScore = Math.round((correctCount / state.quiz.totalQuestions) * 100);

    // Calculate time taken
    const timeSpentSeconds = Math.round((state.quiz.endTime - state.quiz.startTime) / 1000);
    const spentMinutes = Math.floor(timeSpentSeconds / 60);
    const spentSeconds = timeSpentSeconds % 60;
    const timeSpentStr = `${spentMinutes}m ${spentSeconds}s`;

    // Render static scoreboard values
    statsCorrect.textContent = correctCount;
    statsIncorrect.textContent = incorrectCount;
    statsUnanswered.textContent = unansweredCount;
    statsEfficiency.textContent = `${percentScore}%`;

    resultsTimeTaken.textContent = timeSpentStr;
    resultsDateCompleted.textContent = formatDateLuxurious(state.quiz.endTime);

    // Lock question items on page
    renderQuestionsList();

    // 1. SAVE TO LOCALSTORAGE HISTORY DATABASE
    saveExamToHistory(correctCount, incorrectCount, unansweredCount, percentScore, timeSpentStr);

    // 2. SAVE USED QUESTION TEXTS TO PREVENT REPEATS
    let usedQuestions = [];
    try {
      usedQuestions = JSON.parse(localStorage.getItem('devquiz_used_questions')) || [];
    } catch (e) {
      usedQuestions = [];
    }
    state.quiz.questions.forEach(q => {
      if (!usedQuestions.includes(q.q)) {
        usedQuestions.push(q.q);
      }
    });
    localStorage.setItem('devquiz_used_questions', JSON.stringify(usedQuestions));

    // Refresh displays and switch
    refreshResultsView();
    switchTab('results');
  }

  function refreshResultsView() {
    if (state.quiz.isSubmitted) {
      resultsActiveContent.style.display = 'block';
    } else {
      resultsActiveContent.style.display = 'none';
    }
    // Always load history from localStorage
    loadExamHistoryRecords();
  }

  function saveExamToHistory(correct, incorrect, unanswered, efficiency, timeSpent) {
    if (!state.user.email) return;

    const emailKey = state.user.email.toLowerCase();

    // Retrieve historical storage
    let database = {};
    try {
      database = JSON.parse(localStorage.getItem('devquiz_exams_history')) || {};
    } catch (e) {
      database = {};
    }

    if (!database[emailKey]) {
      database[emailKey] = [];
    }

    // Push new entry
    database[emailKey].push({
      date: formatDateLuxurious(new Date()),
      category: state.quiz.subject,
      total: state.quiz.totalQuestions,
      correct: correct,
      incorrect: incorrect,
      unanswered: unanswered,
      efficiency: efficiency,
      timeTaken: timeSpent,
      timestamp: Date.now()
    });

    // Write back
    localStorage.setItem('devquiz_exams_history', JSON.stringify(database));
  }

  function loadExamHistoryRecords() {
    if (!state.user.email) return;
    const emailKey = state.user.email.toLowerCase();

    let database = {};
    try {
      database = JSON.parse(localStorage.getItem('devquiz_exams_history')) || {};
    } catch (e) {
      database = {};
    }

    const records = database[emailKey] || [];

    if (records.length === 0) {
      historyRecordsContainer.innerHTML = `<div class="history-no-records"><i class="fa-solid fa-folder-open" style="font-size: 24px; display: block; margin-bottom: 8px; color: var(--text-muted);"></i>No past exam records found for this email address.</div>`;
      return;
    }

    records.sort((a, b) => b.timestamp - a.timestamp);

    let html = `
      <table class="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Total Qs</th>
            <th>Correct</th>
            <th>Efficiency</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
    `;

    records.forEach(r => {
      const catBadgeClass = `badge-cat-${r.category.toLowerCase()}`;
      const catLabel = getSubjectLabel(r.category);

      html += `
        <tr>
          <td style="font-size: 12px; color: var(--text-secondary);">${escapeHTML(r.date)}</td>
          <td><span class="history-badge-category ${catBadgeClass}">${catLabel}</span></td>
          <td>${r.total}</td>
          <td style="color: #10B981;">${r.correct}</td>
          <td><strong style="color: var(--blue-primary);">${r.efficiency}%</strong></td>
          <td style="font-size: 12px; color: var(--text-muted);">${escapeHTML(r.timeTaken)}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    historyRecordsContainer.innerHTML = html;
  }


  btnRestartQuiz.addEventListener('click', () => {
    const confirmRestart = confirm("This will reset the results page. Do you want to try another exam?");
    if (!confirmRestart) return;

    resetQuizSession();
  });

  btnLogout.addEventListener('click', () => {
    const confirmLogout = confirm("Do you want to log out and clear all active credentials?");
    if (!confirmLogout) return;

    // Reset user state
    state.user.name = '';
    state.user.school = '';
    state.user.department = '';
    state.user.email = '';
    state.user.address = '';
    state.user.avatar = '';

    formStudentInfo.reset();

    // Reset input fields of the edit profile form
    if (formEditProfile) formEditProfile.reset();

    // Toggle logged-in class off
    document.body.classList.remove('logged-in');

    // Sync UI to hide avatar
    syncProfileUI();

    resetQuizSession();
    switchTab('dashboard');
  });

  function resetQuizSession() {
    clearInterval(state.timer.intervalId);

    // Reset Quiz state parameters
    state.quiz.isSubmitted = false;
    state.quiz.answers = [];
    state.quiz.questions = [];
    state.timer.timeLeft = state.timer.duration;

    // Re-show config screen and hide quiz
    quizConfigSection.classList.remove('hidden');
    quizSection.classList.add('hidden');

    timerBadge.classList.remove('warning');

    refreshResultsView();
    switchTab('dashboard');
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function formatDateLuxurious(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = date.toLocaleDateString('en-US', options); // e.g. "May 27, 2026"

    // Add ordinal suffix to day
    const day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';

    return dateStr.replace(String(day), `${day}${suffix}`);
  }

});
