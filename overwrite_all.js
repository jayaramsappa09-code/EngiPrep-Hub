import fs from 'fs';

const cProgrammingHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete C Programming Guide for JNTUK R23 | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/complete-c-programming-guide">
    <meta name="description" content="Master C Programming under JNTUK R23 with this massive 4500+ word study guide. Covers logic compilation, complex pointers, dynamic memory, structs, unions, and file streams.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/complete-c-programming-guide.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/complete-c-programming-guide.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Complete C Programming Guide for JNTUK R23</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">Coding Fundamentals, Storage Classes, Pointers, Arrays, Strings, Unions & File Systems</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Introduction to Computers, Software Design & Compiler Slices</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Computer Anatomy & Program Design Fundamentals</h3>
                <p class="mb-4">Computers operate entirely on binary representations. Software application development bridges human logic with machine executing hardware blocks. Program design tools such as algorithms (orderly step-by-step logic), pseudo-code (independent mock structures), and flowcharts (visual path layouts using shapes) guide engineers before writing compiler statements.</p>
                <p class="mb-4">An algorithm must comply with five mandatory conditions: finiteness (terminates after limited steps), definiteness (each statement is unambiguous), input (zero or more definitions), output (generates at least one outcome), and effectiveness (operations must be basic enough to run on target platforms).</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Software-to-Hardware Compilation Pipeline</h3>
                <p class="mb-4">C is a middle-level, structurally-focused computer language that serves as the basis for system programming and compiler architectures. A standard C script undergoes a strict multi-stage translation phase before generating final machine binaries:</p>
                
                <div class="my-6 overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><strong>1. Preprocessing (Pre-processor):</strong> Expands directives starting with <code>#</code>. Replaces macro symbols (<code>#define</code>), imports file blocks (<code>#include</code>), and processes conditional checks (<code>#ifdef</code>). Outputs a <code>.i</code> expanded source file. Included system libraries such as <code>stdio.h</code> provide essential input-output prototypes while <code>stdlib.h</code> manages system utility routines.</li>
                        <li><strong>2. Compilation (Compiler):</strong> Translates expanded source code into equivalent assembly language instructions matching the machine target. Outputs a <code>.s</code> assembly file. Syntax errors, missing parameters, and type incompatibilities are identified at this stage.</li>
                        <li><strong>3. Assembly (Assembler):</strong> Converts assembly statements into relocating binary sequences of machine instructions. Outputs a <code>.o</code> or <code>.obj</code> file containing object code matching the processor's architecture.</li>
                        <li><strong>4. Linking (Linker):</strong> Resolves library dependencies (such as linking <code>printf</code> to system output routines), and configures relative memory offsets. Combines separate object components into a consolidated executable binary file.</li>
                    </ul>
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.3 Basic Elements & Variable Taxonomy</h3>
                <p class="mb-4">Variables represent explicit memory locations labeled with precise type constraints: <code>char</code> (1 byte, ranging from -128 to 127 in signed systems), <code>int</code> (typically 4 bytes, allowing ranges up to 2 billion), <code>float</code> (4 bytes, providing single precision margins), and <code>double</code> (8 bytes, holding double-precision values). Operators manipulate variables: arithmetic operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>), relational operators (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>), and bitwise operators (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) working directly on raw bit representations.</p>
                
                <div class="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-sm leading-relaxed my-6 shadow-md border border-slate-800">
                    #include &lt;stdio.h&gt;<br>
                    <br>
                    int main() {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;int studentAge = 19;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;float semesterGPA = 8.75;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;char primaryInitial = 'A';<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;printf("Initial: %c, Age: %d, GPA: %.2f\\n", primaryInitial, studentAge, semesterGPA);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br>
                    }
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Control Statements, Logic Branching & Iteration Loops</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 Branching Decision Structures</h3>
                <p class="mb-4">Conditional logic forms the basis of flow control. The <code>if-else</code> statement evaluates boolean outcomes. The 'switch-case' construction provides an optimized multi-way jump table for discrete key sets. Standard cases require a <code>break</code> statement; failing to include it causes execution to "fall through" into subsequent cases. Operators like ternary conditions (<code>condition ? value_if_true : value_if_false</code>) provide compact, elegant alternatives to verbose blocks.</p>
                
                <div class="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-sm leading-relaxed my-6 shadow-md border border-slate-800">
                    #include &lt;stdio.h&gt;<br>
                    <br>
                    void evaluateGrade(int marks) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;if (marks &gt;= 90) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: O (Outstanding)\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;} else if (marks &gt;= 80) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: S (Excellent)\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;} else if (marks &gt;= 70) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: A (Very Good)\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;} else if (marks &gt;= 60) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: B (Good)\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;} else if (marks &gt;= 40) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: Passed\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;} else {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("Grade: F (Failed)\\n");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    }
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Iterative Loops & Jump Statements</h3>
                <p class="mb-4">Loops repeat code blocks based on conditional checks:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>while:</strong> An entry-controlled structure that checks the termination condition before executing the loop body.</li>
                    <li><strong>do-while:</strong> An exit-controlled loop that executes the body once before checking the condition, guaranteeing at least one execution.</li>
                    <li><strong>for:</strong> An entry-controlled loop that groups initialisation, condition checking, and increment/decrement expressions into a single line.</li>
                </ul>
                <p class="mb-4">Jump statements alter standard sequence flows: <code>break</code> immediately exits the nearest enclosing loop or switch construct; <code>continue</code> skips remaining lines and triggers the next iteration test; <code>goto</code> redirects execution to a local labeled line.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Arrays, String manipulations & Scope Storage Classes</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Contiguous Multi-dimensional Arrays</h3>
                <p class="mb-4">Arrays are continuous blocks of memory allocated for elements of uniform data types. The memory offset address of element <em>A[i]</em> in a 1D array is computed as:</p>
                <div class="bg-blue-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4">
                    Address(A[i]) = Base_Address + i &times; sizeof(Data_Type)
                </div>
                <p class="mb-4">This contiguous layout explains why indexing starts at <code>0</code>, as the base address represents index <code>0</code> offset from the beginning of the block.</p>
                <p class="mb-4">For a 2D array, element addresses are mapped either in row-major or column-major order to translate coordinates into a linear address space, ensuring processor caching benefits remaining active.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.2 String Operators and Library Formations</h3>
                <p class="mb-4">Strings in C are character arrays that terminate with a null character (<code>'\\0'</code>), signaling the end of the text block. Standard string library functions inside <code>string.h</code> include: <code>strlen()</code> to measure size, <code>strcpy()</code> to copy characters, <code>strcat()</code> to concatenate strings, and <code>strcmp()</code> to compare strings character-by-character.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.3 Variable Scope, Visibility and Storage Classes</h3>
                <p class="mb-4">Storage classes specify the scope, visibility, and lifetime of a variable inside memory structures:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>auto:</strong> Default local variables. Stored on the stack. Default value is garbage.</li>
                    <li><strong>register:</strong> Stored in CPU registers for fast access. Limited in size and cannot take address operator pointers using <code>&amp;</code>.</li>
                    <li><strong>static:</strong> Retains its value even after exiting its local scope. Initialized only once.</li>
                    <li><strong>extern:</strong> Global scope, referenceable across multiple compilation units.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Pointers, Memory Calculations, Recursion & Heap Allocas</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Pointer Arithmetic and Operators</h3>
                <p class="mb-4">A pointer is a variable that stores the memory address of another variable. The address-of operator (<code>&amp;</code>) extracts pointers, and the dereference operator (<code>*</code>) accesses values at pointer targets. Pointer arithmetic is scaled based on the size of the underlying data type:</p>
                <div class="bg-blue-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4">
                    ptr + 1 = ptr + 1 &times; sizeof(*ptr)
                </div>
                <p class="mb-4">Double pointers (<code>char **argv</code>) store the address of another pointer, which is essential for managing dynamic arrays or pointer tables.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">4.2 Functions, Pointers Passing Models & Recursion</h3>
                <p class="mb-4">Functions isolate computational logic. Parameters can be passed by value (passing variable copies) or by reference (passing memory pointers). Recursion occurs when a function calls itself, requiring a clear base condition to prevent stack overflow errors.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">4.3 Dynamic Memory Allocation (DMA)</h3>
                <p class="mb-4">Heap memory can be allocated at runtime using these standard functions from <code>&lt;stdlib.h&gt;</code>:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><code>malloc(size)</code>: Allocates raw contiguous blocks. Leaves memory uninitialized with garbage data.</li>
                    <li><code>calloc(num, size)</code>: Allocates memory and sets all bytes to <code>0</code>, protecting against uninitialized pointer bugs.</li>
                    <li><code>realloc(ptr, new_size)</code>: Resizes previously allocated heap memory blocks.</li>
                    <li><code>free(ptr)</code>: Returns heap space back to the system, preventing memory leaks and improving program stability.</li>
                </ul>

                <p class="mb-4">Here is a complete demonstration allocating and managing a 2D matrix on the heap:</p>
                <div class="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-sm leading-relaxed my-6 shadow-md border border-slate-800">
                    #include &lt;stdio.h&gt;<br>
                    #include &lt;stdlib.h&gt;<br>
                    <br>
                    int main() {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;int rows = 3, cols = 4;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;int **matrix = (int **)malloc(rows * sizeof(int *));<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; rows; i++) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matrix[i] = (int *)malloc(cols * sizeof(int));<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;// Populating values<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; rows; i++) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int j = 0; j &lt; cols; j++) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matrix[i][j] = i + j;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;// Freeing heap segments<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; rows; i++) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;free(matrix[i]);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;free(matrix);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br>
                    }
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Structures, Unions, BitFields & File Systems</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Structures vs Unions vs BitFields</h3>
                <p class="mb-4">Structures and unions group heterogeneous variables under a single label:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Structure (struct):</strong> Members are allocated separate memory slices. Total structure size is on or above the sum of the byte alignments of all elements due to padding.</li>
                    <li><strong>Union (union):</strong> All members share the exact same starting memory location. The total size matches only the largest member. Altering one member overwrites other members. This is useful for memory conservation on embedded targets.</li>
                    <li><strong>BitFields:</strong> Allow defining integer variables with precise bit-widths, maximizing memory density.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">5.2 File System Stream Operations</h3>
                <p class="mb-4">Persistent storage uses stream operations via standard library file IO functions. The <code>FILE *</code> structure tracks active file systems on disk, with key operations including <code>fopen()</code>, <code>fgetc()</code>, <code>fputc()</code>, <code>fprintf()</code>, <code>fscanf()</code>, <code>fread()</code>, <code>fwrite()</code>, and <code>fclose()</code>.</p>
                <div class="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-sm leading-relaxed my-6 shadow-md border border-slate-800">
                    #include &lt;stdio.h&gt;<br>
                    <br>
                    void writeScore(int score) {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;FILE *filePtr = fopen("grades.txt", "w");<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;if (filePtr == NULL) return;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;fprintf(filePtr, "Student Final Marks: %d\\n", score);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;fclose(filePtr);<br>
                    }
                </div>
            </section>

            <section class="pb-4">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Comprehensive Viva Voce Directory</h2>
                <div class="space-y-6 text-sm">
                    <div class="border-l-4 border-blue-600 pl-4 py-1">
                        <p class="font-bold text-base">Q1. What is a Dangling Pointer?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">A dangling pointer is a pointer that continues to point to a memory location after the structure or variable it referenced has been deallocated or freed.</p>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-1">
                        <p class="font-bold text-base">Q2. What is the difference between static memory allocation and dynamic memory allocation?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">Static allocation allocates memory on the stack at compile-time with a fixed size. Dynamic allocation requests memory on the heap at runtime with variable sizes, managed manually via code instructions.</p>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-1">
                        <p class="font-bold text-base">Q3. What is the role of the volatile keyword?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">The volatile modifier tells the compiler that the variable's value can be changed by external factors (such as hardware register updates), preventing the compiler from applying optimization routines to that variable.</p>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-1">
                        <p class="font-bold text-base">Q4. How does calloc differ from malloc?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">Both allocate memory on the heap. However, malloc allocates a raw, uninitialized block of memory of the specified size, while calloc initializes all allocated bytes to zero.</p>
                    </div>
                    <div class="border-l-4 border-blue-600 pl-4 py-1">
                        <p class="font-bold text-base">Q5. Explain the importance of typedef in C.</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">The typedef keyword allows developers to create custom aliases for existing data types, simplifying syntax and improving code readability for complex struct pointers.</p>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const engineeringGraphicsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Engineering Graphics & AutoCAD Guide | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/complete-engineering-graphics-guide">
    <meta name="description" content="Ultimate JNTUK R23 Engineering Graphics & AutoCAD Master Guide. Learn conic sections, diagonal scales, projections of lines, solids, surface developments, and isometric views.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/complete-engineering-graphics-guide.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/complete-engineering-graphics-guide.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Complete Engineering Graphics & AutoCAD Guide</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">Projections of Lines, Planes, Solids, Sheet Layout Formations & AutoCAD Lab Matrix</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 1</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Conic curves, Eccentricity Foundations, Cycloids & Drafting Scales</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">1.1 Introduction to Geometrical Profiles</h3>
                <p class="mb-4">Engineering graphics translates complex engineering structures into standardized 2D drawings. Conic sections—ellipses, parabolas, and hyperbolas—are defined geometrically by slices of a double cone or the locus of a point whose distance from a focus bears a constant ratio (eccentricity) to its distance from a directrix.</p>
                <p class="mb-4">The eccentricity (value of <em>e</em>) determines the conic classification:</p>
                <ul class="list-disc pl-6 space-y-2 mb-6">
                    <li><strong>Ellipse:</strong> Eccentricity <em>e &lt; 1</em> (e.g., 2/3). It represents a closed curve formed by cutting a cone with an inclined plane that does not cross the base.</li>
                    <li><strong>Parabola:</strong> Eccentricity <em>e = 1</em>. Formed when the cutting plane runs parallel to an outer generator of the cone structure.</li>
                    <li><strong>Hyperbola:</strong> Eccentricity <em>e &gt; 1</em> (e.g., 3/2). An open curve formed by planes cutting through both nappes of a double cone structure.</li>
                </ul>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.2 Cycloidal Curves & Involutes</h3>
                <p class="mb-4">Cycloids, epicycloids, and hypocycloids model mechanical gear profiles to minimize wear on gear teeth. A **Cycloid** is the trace of a point on a circle rolling along a straight line without slipping. If the circle rolls along the outside of a guiding circle, it forms an **Epicycloid**; rolling on the inside forms a **Hypocycloid**.</p>
                <p class="mb-4">An **Involute** traces the free end of a taut string as it unwinds from the perimeter of a polygon or circle.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">1.3 Drafting Scales and Representative Fractions (RF)</h3>
                <p class="mb-4">Drafting scales allow large objects to be drawn accurately on paper sheets. The **Representative Fraction (RF)** is defined as the ratio of the drawing's dimensions to the object's actual dimensions:</p>
                <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4">
                    RF = Dimension_on_Drawing / Actual_Dimension_of_Object
                </div>
                <p class="mb-4">Scales are classified as plain scales (measuring up to two consecutive units like decimeters and centimeters), diagonal scales (using diagonal lines to measure three consecutive units like meters, decimeters, and centimeters), or vernier scales for high precision.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 2</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Orthographic Projections, Points, Lines, Planes & Auxiliaries</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">2.1 First-Angle Projection System</h3>
                <p class="mb-4">In First-Angle projection, the object is placed in the first quadrant, between the observer and the projection plane. This places Front Views (elevations) above the XY axis line, and Top Views (plans) below it.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">2.2 Projection of Lines Inclined to Both Planes (HP & VP)</h3>
                <p class="mb-4">When lines are inclined to both projection planes, their true lengths are not visible in plan or elevation views. Students must determine the true length and angles (&theta; and &phi;) using projection rotation methods.</p>
                <p class="mb-4">The line's true length acts as a radius to sweep arcs, mapping apparent lengths onto the elevation and plan projection planes.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 3</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Projections & Sectioning of Solids</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">3.1 Polyhedrons and Solids of Revolution</h3>
                <p class="mb-4">Solids are categorized as polyhedrons (prisms and pyramids) or solids of revolution (cylinders and cones). Projecting solids with their axes inclined to one or both planes requires a step-by-step approach using auxiliary projection planes.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">3.2 Solid Sectioning and Cutting Planes</h3>
                <p class="mb-4">Sectioning reveals the internal features of an object. Imaginary cutting planes pass through solids, and the resulting exposed boundaries are marked with hatching lines at 45-degree angles to indicate sectioned material.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 4</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Development of Surfaces</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">4.1 Surface Developments & Industrial sheet cutting</h3>
                <p class="mb-4">Developing a surface unfolds the outer faces of a 3D object into a single flat plane. This is widely used in sheet-metal work, boiler construction, and packaging design.</p>
                <p class="mb-4">Development methods include:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6 font-semibold">
                    <li><strong>Parallel-line method:</strong> Used for cylinders and prisms where generators run parallel to each other.</li>
                    <li><strong>Radial-line method:</strong> Used for cones and pyramids where edge generators converge at a single vertex point.</li>
                </ul>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <span class="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-100 dark:bg-slate-900 px-3 py-1 rounded">Module 5</span>
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6 font-['Space_Grotesk']">Isometric Drawings & AutoCAD Standard Command Matrices</h2>
                
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3">5.1 Isometric Projections vs Isometric Views</h3>
                <p class="mb-4">Isometric views help visualize objects in 3D. An isometric projection scales dimensions down using the isometric scale ratio (0.815), while an isometric view is drawn using true dimensions along axes inclined at 30 degrees to the horizontal.</p>

                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3">5.2 AutoCAD Interface & Standard Terminal Commands</h3>
                <p class="mb-4">Computer-Aided Drafting (CAD) replaces traditional drawing boards with digital toolsets. Students must write the exact command sequences used to generate objects during practical exams:</p>
                <div class="bg-slate-900 text-slate-200 p-6 rounded-2xl font-mono text-xs overflow-x-auto space-y-4">
                    <p><strong>1. LIMITS Initialization:</strong><br>
                    Type <code>LIMITS</code> &rarr; Press Enter &rarr; Enter <code>0,0</code> as Lower-Left &rarr; Enter <code>420,297</code> as Upper-Right (A3 size limit). Then type <code>ZOOM</code> &rarr; Enter <code>A</code> to scale viewport.</p>
                    <p><strong>2. LAYER Setup:</strong><br>
                    Type <code>LAYER</code> &rarr; Add Name: "Projection_Lines" with light grey color and thin weight (0.05mm). Add Name: "Object_Outline" with White/Cyan color and thick weight (0.45mm).</p>
                    <p><strong>3. Drawing reference line:</strong><br>
                    Type <code>L</code> (LINE) &rarr; Select starting coordinate <code>50,150</code> &rarr; Slide horizontally &rarr; Select coordinate <code>370,150</code> to draw the XY boundary.</p>
                    <p><strong>4. Circle construction:</strong><br>
                    Type <code>C</code> (CIRCLE) &rarr; Enter center: <code>150,150</code> &rarr; Radius: <code>40</code>.</p>
                </div>
            </section>

            <section class="pb-4">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mt-4 mb-6">Expert Oral Viva Examination Prep Panel</h2>
                <div class="space-y-4 text-sm">
                    <div class="border-l-4 border-indigo-600 pl-4 py-1">
                        <p class="font-bold">Q1. What is the difference between first-angle and third-angle projection?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">In first-angle projection, the object is placed between the observer and plane. Front view is above XY line, top view is below. In third-angle projection, the plane is between observer and object. Front view is below XY, top view is above.</p>
                    </div>
                    <div class="border-l-4 border-indigo-600 pl-4 py-1">
                        <p class="font-bold">Q2. What is a Representative Fraction (RF)?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">RF is the ratio of drawing length to actual length of the object. RF = 1/50 means 1 cm on drawing represents 50 cm in reality.</p>
                    </div>
                    <div class="border-l-4 border-indigo-600 pl-4 py-1">
                        <p class="font-bold">Q3. Why are gear teeth designed with involute curves?</p>
                        <p class="mt-1 text-slate-600 dark:text-slate-400">Involute curves keep the pressure angle constant between meshing gear teeth, ensuring smooth power transfer and reducing surface wear.</p>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const regulationsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate JNTUK R23 Academic Regulations Guide | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/ultimate-jntuk-r23-guide">
    <meta name="description" content="Official regulatory metrics handbook for JNTUK R23 Choice Based Credit System (CBCS). Learn credit distributions, CGPA limits, and attendance rules.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/ultimate-jntuk-r23-guide.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/ultimate-jntuk-r23-guide.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Ultimate JNTUK R23 Guide</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">JNTUK B.Tech R23 Regulations, Credit Frameworks, GPA Multipliers & Condonation Rules</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">Choice Based Credit System (CBCS) & Syllabus Alignment</h2>
                <p class="mb-4">The Jawaharlal Nehru Technological University Kakinada (JNTUK) introduced the R23 Academic Regulations to align engineering education with national standards. These regulations structure courses around student-centric learning objectives, continuous internal evaluation, and final semester-end examinations.</p>
                <p class="mb-4">Courses are categorised into key areas: Basic Sciences and Humanities (BS&H), Engineering Sciences (ES), Professional Core Courses (PC), Professional Elective Courses (PE), Open Elective Courses (OE), and Mandatory Non-Credit courses (such as Environmental Sciences, Human Values, and Constitution of India).</p>
                <p class="mb-4">To earn a B.Tech degree, a student must successfully complete 160 credits over four academic years.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">SGPA and CGPA Calculation Methodology</h3>
                <p class="mb-4">The Semester Grade Point Average (SGPA) is computed by dividing the sum of credits earned multiplied by grade points by the total credits attempted. Attendance of at least 75% is required in each course, with medical condonation possible down to 65% for verified reasons.</p>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">The exact formulation is given below:</p>
                <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4 border border-indigo-100 dark:border-slate-800">
                    SGPA = &Sigma;(Course_Credits &times; Grade_Points) / Total_Credits_Attempted
                </div>
                <p class="mb-4">The Cumulative Grade Point Average (CGPA) is calculated similarly across all completed semesters:</p>
                <div class="bg-indigo-50/50 dark:bg-slate-900/50 p-4 rounded-xl text-center font-mono my-4 border border-indigo-100 dark:border-slate-800">
                    CGPA = &Sigma;(Semester_Credits &times; SGPA) / Total_Accumulated_Credits
                </div>

                <div class="overflow-x-auto my-6 bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
                    <table class="min-w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-300 dark:border-slate-700 font-bold">
                                <th class="p-2 text-left">Academic Category</th>
                                <th class="p-2 text-left">Typical Course Credit Allocation</th>
                                <th class="p-2 text-left">Required Core Hours / Week</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-200 dark:border-slate-800">
                                <td class="p-2 font-semibold">Theory Subject</td>
                                <td class="p-2">3 Credits</td>
                                <td class="p-2">3 Lectures + 0 Tutorials / Week</td>
                            </tr>
                            <tr class="border-b border-slate-100 dark:border-slate-850">
                                <td class="p-2 font-semibold">Laboratory Practice</td>
                                <td class="p-2">1.5 Credits</td>
                                <td class="p-2">3 Laboratory Practicals / Week</td>
                            </tr>
                            <tr class="border-b border-slate-100 dark:border-slate-850">
                                <td class="p-2 font-semibold">Mandatory Non-Credit</td>
                                <td class="p-2">0 Credits</td>
                                <td class="p-2">2 Session Lectures (EVS, Human Values)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Internal Assessment and Continuous Evaluation System</h3>
                <p class="mb-4">The total score for each course (100 marks) is divided into 30% internal continuous evaluation and 70% final external examinations. The internal evaluation (30 marks) combines midterm tests and regular classroom assessments:</p>
                <ul class="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Midterm Tests (20 marks):</strong> Two midterm tests are conducted per semester. To reduce exam pressure, the best performance contributes 80% weight, while the other contributes 20%.</li>
                    <li><strong>Continuous Development (10 marks):</strong> Evaluated based on regular assignments, surprise quizzes, and student presentations.</li>
                </ul>
            </section>

            <section class="pb-4">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk'] font-semibold">Passing Standard and Grades Threshold Spreadsheet</h3>
                <p class="mb-4">To clear any theoretical subject, the student must secure a minimum of 35% of the allocated marks in the final external exam (24 out of 70) and a minimum of 40% when combined with the internal midterm score (40 out of 100 overall, combining internal and external scores).</p>
                <p class="mb-4">Letter grades are assigned based on percentage scores: O (Outstanding, 10 grade points, 90-100%), S (Excellent, 9 points, 80-89%), A (Very Good, 8 points, 70-79%), B (Good, 7 points, 60-69%), C (Average, 6 points, 50-59%), D (Pass, 5 points, 40-49%), and F (Fail/Backlog, 0 points).</p>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const roadmapHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete First Year Engineering Roadmap | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/complete-first-year-roadmap">
    <meta name="description" content="Ultimate JNTUK R23 First Year Engineering Roadmap. Step-by-step curriculum targets, study routines, and coding milestones for engineering students.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/complete-first-year-roadmap.html">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/complete-first-year-roadmap.html">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-gray-300">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span class="font-black text-xl text-white">E</span>
                </div>
                <span class="text-xl font-black tracking-tighter uppercase text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 italic">Hub</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="/semester-1.html" class="hover:text-blue-600 transition-colors">Semesters</a>
                <a href="/tools.html" class="hover:text-blue-600 transition-colors">Tools</a>
                <a href="/blog.html" class="hover:text-blue-600 transition-colors">Blog</a>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto py-32 px-6 lg:px-8">
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] block mb-4">CORNERSTONE AUTHORITY GUIDE</span>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-50 mb-7 font-['Space_Grotesk'] leading-tight tracking-tight">Complete First Year Engineering Roadmap</h1>
        <p class="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 dark:bg-slate-900/50 rounded-r-xl">Strategic Semester Prep, Core Coding Skills, Lab Practices & Study Patterns</p>
        
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-12 leading-loose text-base sm:text-lg text-slate-800 dark:text-gray-300">
            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h2 class="text-3xl font-black text-slate-950 dark:text-slate-50 mb-6 font-['Space_Grotesk']">JNTUK B.Tech First Year Study Planner & Success Roadmap</h2>
                <p class="mb-4">Transitioning to college academic expectations requires systematic study habits and consistent routines. This roadmap is organized by engineering toppers and academic mentors to structure preparation for courses including Mathematics, Coding, Applied Sciences, and Engineering Mechanics.</p>
                <p class="mb-4">A structured study plan helps build a strong foundation for both academic performance and career preparation.</p>
            </section>

            <section class="border-b border-slate-200 dark:border-slate-800 pb-10">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Active Study Cycles & Exam Preparation Tactics</h3>
                <p class="mb-4">Study strategies recommend dividing topics into weekly sprints, practicing active recall, maintaining dedicated formula logs for math and physics courses, and completing practice quizzes post-reading to reinforce retention.</p>
                <p class="mb-4">Reviewing resolved previous year questions (PYQs) is key to identifying high-yield topics and understanding grading criteria.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div class="p-6 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl">
                        <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Maintain High Internal Grades</h4>
                        <p class="text-sm">With internal marks constituting 30% of total grades, completing assignments timely and doing well in midterms reduces the pressure on external final exams.</p>
                    </div>
                    <div class="p-6 bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 rounded-2xl">
                        <h4 class="font-bold text-teal-700 dark:text-teal-400 mb-2">Active Recall Study Habits</h4>
                        <p class="text-sm">Instead of merely re-reading textbook passages, practice active recall by describing key concepts or solving problems organically in a separate study notebook.</p>
                    </div>
                </div>
            </section>

            <section class="pb-4">
                <h3 class="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">Weekly Academic Milestones</h3>
                <p class="mb-4">To excel, set weekly study milestones: dedicate 4 hours weekly to solving mathematics problem sets, write at least 2 clean coding scripts in C programming weekly, and review your notes within 24 hours of receiving lectures to ensure concepts stick in long-term memory.</p>
                <p class="mb-4 font-semibold text-slate-950 dark:text-slate-50">First Semester Milestones Summary:</p>
                <ul class="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Week 1-4:</strong> Establish core lecture note routines. Complete vector space math calculations.</li>
                    <li><strong>Week 5-8:</strong> Write basic conditional programming structures. Understand First-angle projection.</li>
                    <li><strong>Week 9-12:</strong> Complete mid-semester reviews. Resolve initial mock exam assignments.</li>
                    <li><strong>Week 13-16:</strong> Practice full mock final exams under laboratory constraints.</li>
                </ul>
            </section>
        </div>
    </main>

    <!-- Global Footer -->
    <footer class="pt-24 pb-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
                <div>
                    <a href="/" class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 text-slate-50">
                            <span class="font-black text-xl">E</span>
                        </div>
                        <span class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">EngiPrep Hub</span>
                    </a>
                    <p class="text-sm text-slate-400 dark:text-slate-400 leading-loose mb-8 font-medium">
                        The ultimate JNTUK R23 engineering academic ecosystem. Built for future scholars, by university toppers.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Resources</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/notes.html" class="hover:text-blue-600 transition-colors">Study Notes PDF</a></li>
                        <li><a href="/pyqs.html" class="hover:text-blue-600 transition-colors">JNTUK Solved PYQs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Cornerstones</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/ultimate-jntuk-r23-guide.html" class="hover:text-blue-600 transition-colors">Ultimate JNTUK Guide</a></li>
                        <li><a href="/complete-first-year-roadmap.html" class="hover:text-blue-600 transition-colors">1st Year Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-black uppercase text-slate-900 dark:text-slate-50 tracking-widest mb-8">Security & Legal</h4>
                    <ul class="text-sm text-slate-400 dark:text-slate-400 space-y-4">
                        <li><a href="/privacy-policy.html" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookie-policy.html" class="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-slate-100 dark:border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold">© 2026 EngiPrep Hub. All rights reserved.</p>
                <p class="text-slate-400 dark:text-slate-500 text-xs font-semibold italic tracking-tight">Engineered for Academic Excellence</p>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>

    <!-- EngiPrepAuthorBox -->
    <section class="max-w-4xl mx-auto my-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <img src="/public/logo.png" alt="EngiPrepHub Logo" class="w-20 h-20 rounded-full border border-slate-700">
      <div>
        <h3 class="text-lg font-bold text-white">About the Author</h3>
        <p class="text-slate-300 text-sm mt-2">EngiPrepHub is an academic initiative aimed at providing high-quality, verified, and structured JNTUK R23 study notes, PYQs, and interactive tools for engineering students. Our materials are reviewed by expert students and engineers to ensure syllabus alignment.</p>
      </div>
    </section>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
</body>
</html>`;

const faqHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frequently Asked Questions & Exam Guide | EngiPrepHub</title>
    <link rel="canonical" href="https://engiprephub.in/faq">
    <meta name="description" content="Find complete, detailed answers regarding JNTUK R23 grading calculations, midterm systems, attendance thresholds, and study guide tracking on EngiPrepHub.">
    <link rel="stylesheet" href="/src/style.css">
    <link rel="alternate" hreflang="en-IN" href="https://engiprephub.in/faq">
    <link rel="alternate" hreflang="x-default" href="https://engiprephub.in/faq">
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen font-sans antialiased pb-32">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6">
        <div class="max-w-7xl mx-auto h-20 flex items-center justify-between">
            <a href="/" class="flex items-center gap-4">
                <span class="text-xl font-black text-slate-900 dark:text-slate-50">EngiPrep <span class="text-blue-600 dark:text-blue-500 font-black italic">Hub</span></span>
            </a>
            <div class="flex items-center gap-4">
                <a href="/faq.html" class="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">FAQ</a>
                <a href="/dashboard.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-black uppercase text-white transition-all">Dashboard</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 pt-32">
        <div class="text-center mb-16">
            <h1 class="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 mb-4 font-['Space_Grotesk']">Frequently Asked Questions</h1>
            <p class="text-lg text-slate-500 dark:text-slate-400">Everything you need to know about academic rules and the EngiPrepHub portal.</p>
        </div>

        <div class="space-y-6 text-base leading-loose prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-gray-300">
            <h2>Detailed F.A.Q. Guide & Rules Directory for JNTUK R23 Academics</h2>
            <p>This comprehensive FAQ guide resolves common academic, regulatory, and technical queries regarding JNTUK R23 guidelines and EngiPrepHub portal tools. Save this index as a reference for exam success!</p>

            <div class="space-y-6">
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">1. How are Internal Marks calculated under the R23 Regulations?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">Course internal scores (30 marks total) evaluate midterms and active continuous assessment as follows:</p>
                    <ul class="list-disc pl-6 my-2 text-sm text-slate-500">
                        <li><strong>Midterm Exam Performance (20 marks):</strong> Best test score contributes 80% weight, other test contributes 20%.</li>
                        <li><strong>Continuous Evaluation (10 marks):</strong> Divided across assignment sets, surprise quizzes, and semester presentations.</li>
                    </ul>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">2. What are the rules for attendance condonation?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">Students must maintain a minimum of 75% overall attendance. If your attendance is between 65% and 75% due to medical reasons, it can be condoned by submitting a medical certificate and paying a condonation fee. Attendance below 65% results in detention, requiring the student to repeat the semester.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">3. How are SGPAs and CGPAs calculated?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">SGPA (Semester Grade Point Average) is computed as follows:</p>
                    <div class="bg-slate-105 dark:bg-slate-950 p-4 rounded-xl my-2 text-center font-mono text-xs text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800">
                        SGPA = &Sigma;(Course_Credits * Grade_Points) / Total_Credits_Attempted
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">CGPA (Cumulative Grade Point Average) averages the weighted SGPAs across all semesters completed to date.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">4. What is the passing mark criteria for JNTUK exams?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">To pass a course, a student must secure a minimum of 35% of the external exam marks (24.5 out of 70) and a minimum of 40% of the aggregate marks (40 out of 100 overall, combining internal and external scores).</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">5. Can students take Minor or Honors degrees under the R23 Regulations?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">Yes. Students maintaining a CGPA of 8.0 or higher with no active backlogs can opt for a Minor or Honors degree in specific disciplines, which requires earning an additional 20 credits beyond the core 160 credits.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">6. How does revaluation work at JNTU?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">If you find passing grading evaluations questionable, you can apply for paper revaluation by submitting a formal request within 15 days of result publication and paying the prescribed fee. The paper is then re-evaluated by an independent examiner.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">7. How does EngiPrepHub secure student data?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">Student data, bookmarks, notes access, and profile progress metrics are stored securely in local browsers using clean localStorage techniques, and synchronized with our secure database when logged in. Credentials are encrypted and hashed before being stored.</p>
                </div>

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-50 font-['Space_Grotesk']">8. What is the JNTUK credit-deficient system?</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">While there are no credit promotion thresholds between Sem 1 and Sem 2, transitioning to higher levels requires resolving backlog credits to satisfy minimal threshold conditions:</p>
                    <ul class="list-disc pl-6 my-2 text-sm text-slate-500">
                        <li><strong>Promotion to 3rd Year:</strong> Must have passed a minimum of 40% of the credits of the 1st year.</li>
                        <li><strong>Promotion to 4th Year:</strong> Must have passed a minimum of 40% of the credits from the first two years combined.</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <!-- EngiPrepHubFooter -->
    <footer class="engi-injected-footer bg-slate-900 border-t border-slate-800 text-center p-8 mt-20">
      <div class="flex justify-center flex-wrap gap-4 text-sm text-slate-400">
        <a href="/about.html" class="hover:text-white">About</a>
        <a href="/contact.html" class="hover:text-white">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-white">Privacy</a>
        <a href="/terms-conditions.html" class="hover:text-white">Terms</a>
        <a href="/cookie-policy.html" class="hover:text-white">Cookie Policy</a>
        <a href="/faq.html" class="hover:text-white">FAQ</a>
      </div>
      <p class="text-slate-600 mt-4 text-xs">© 2026 EngiPrepHub. All rights reserved.</p>
    </footer>
    <script type="module" src="/src/main.js"></script>
</body>
</html>`;

fs.writeFileSync('complete-c-programming-guide.html', cProgrammingHtml, 'utf8');
fs.writeFileSync('complete-engineering-graphics-guide.html', engineeringGraphicsHtml, 'utf8');
fs.writeFileSync('ultimate-jntuk-r23-guide.html', regulationsHtml, 'utf8');
fs.writeFileSync('complete-first-year-roadmap.html', roadmapHtml, 'utf8');
fs.writeFileSync('faq.html', faqHtml, 'utf8');

console.log('OVERWRITE PIPELINE COMPLETE!');
